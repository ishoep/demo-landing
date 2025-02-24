import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

interface AwardItem {
  id: string;
  title: { en: string; ru: string; uz: string };
  description: { en: string; ru: string; uz: string };
  image?: string;
}

const Awards: React.FC = () => {
  const { language } = useLanguage();
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "награды")); // <-- Загружаем награды
        const awardsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as AwardItem[];

        setAwards(awardsData);
        console.log("Награды из Firestore:", awardsData);
      } catch (error) {
        console.error("Ошибка загрузки наград:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Загрузка...</p>;
  }

  return (
    <section id="awards" className="py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {translations[language].nav.awards}
          </h2>
        </div>

        {awards.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            {language === "ru" ? "Наград пока нет." : language === "uz" ? "Hali mukofotlar yo'q." : "No awards yet."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awards.map((award) => (
              <div
                key={award.id}
                className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
              >
                {award.image ? (
                  <div className="md:w-1/3">
                    <img src={award.image} alt={award.title[language]} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="md:w-1/3 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
                    ❌ Нет изображения
                  </div>
                )}
                <div className="p-6 md:w-2/3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {award.title[language] || award.title.ru}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {award.description[language] || award.description.ru}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Awards;
