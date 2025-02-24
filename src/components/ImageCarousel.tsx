import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; 

const ImageCarousel: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "галерея"), // <-- Убедись, что в Firestore коллекция названа именно так
      (snapshot) => {
        const imageList = snapshot.docs.map((doc) => doc.data().image).filter(Boolean); // Фильтруем пустые
        setImages(imageList);
        setLoading(false);
      },
      (error) => {
        console.error("Ошибка загрузки изображений:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Загрузка галереи...</p>;
  }

  if (images.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Галерея пуста.</p>;
  }

  return (
    <div className="relative max-w-6xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        {t.gallery.title}
      </h2>

      <div className="relative">
        {/* Кнопка "Назад" */}
        <div className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
          <button className="swiper-button-prev-custom p-3 text-gray-900 dark:text-white rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition">
            <ChevronLeft size={24} />
          </button>
        </div>

        {/* Слайдер */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="rounded-lg shadow-lg"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Кнопка "Вперед" */}
        <div className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
          <button className="swiper-button-next-custom p-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="swiper-pagination-custom mt-6 flex justify-center"></div>
    </div>
  );
};

export default ImageCarousel;
