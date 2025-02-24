import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translateText } from "../utils/translate";
import { uploadImage } from "../utils/uploadImage";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

const categories = ["Новости", "Награды", "Галерея"];

const AdminPanel = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [news, setNews] = useState([]);
  const [awards, setAwards] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (!selectedCategory) return;

    const unsubscribe = onSnapshot(collection(db, selectedCategory.toLowerCase()), (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      if (selectedCategory === "Новости") {
        setNews(updatedData);
      } else if (selectedCategory === "Награды") {
        setAwards(updatedData);
      } else if (selectedCategory === "Галерея") {
        setGallery(updatedData);
      }
    });

    return () => unsubscribe();
  }, [selectedCategory]);

  const addItem = async () => {
    if (!imageFile) {
      alert("Выберите изображение!");
      return;
    }

    setIsUploading(true);
    const uploadedImageUrl = await uploadImage(imageFile);
    if (!uploadedImageUrl) {
      alert("Ошибка загрузки изображения!");
      setIsUploading(false);
      return;
    }

    let newItem;
    if (selectedCategory === "Галерея") {
      newItem = { image: uploadedImageUrl };
    } else {
      if (!title || !description) {
        alert("Заполните все поля!");
        setIsUploading(false);
        return;
      }

      const titleUz = await translateText(title, "uz");
      const titleEn = await translateText(title, "en");
      const descriptionUz = await translateText(description, "uz");
      const descriptionEn = await translateText(description, "en");

      newItem = {
        title: { ru: title, uz: titleUz || "", en: titleEn || "" },
        description: { ru: description, uz: descriptionUz || "", en: descriptionEn || "" },
        image: uploadedImageUrl,
        date: new Date().toISOString().split("T")[0],
      };
    }

    const docRef = await addDoc(collection(db, selectedCategory.toLowerCase()), newItem);
    newItem.id = docRef.id;

    setTitle("");
    setDescription("");
    setImageFile(null);
    setPreviewURL(null);
    setIsUploading(false);
    alert(`${selectedCategory} добавлено!`);
  };

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, selectedCategory.toLowerCase(), id));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={`p-4 max-w-2xl mx-auto pt-24 pb-20 ${theme === "dark" ? "text-white" : "text-black"} transition-colors duration-300`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Админ-панель</h2>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg">Выйти</button>
      </div>

      {!selectedCategory ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">Выберите категорию</h3>
          {categories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)} className="block w-full p-2 my-2 text-center bg-blue-500 text-white rounded-lg">
              {category}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedCategory(null)} className="mb-4 p-2 bg-gray-300 dark:bg-gray-700 rounded-lg">Назад</button>

          {selectedCategory !== "Галерея" && (
            <>
              <input type="text" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full rounded-lg mb-2 dark:bg-gray-800 dark:text-white" />
              <input type="text" placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full rounded-lg mb-2 dark:bg-gray-800 dark:text-white" />
            </>
          )}

          <input type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImageFile(file);
              setPreviewURL(URL.createObjectURL(file));
            }
          }} className="border p-2 w-full rounded-lg mb-2 dark:bg-gray-800 dark:text-white" />

          {previewURL && <img src={previewURL} alt="Предпросмотр" className="w-full h-48 object-cover mb-2 rounded-lg" />}

          <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded-lg" disabled={isUploading}>
            {isUploading ? "Загрузка..." : "Добавить"}
          </button>

          <h3 className="text-lg font-semibold mt-6 mb-2">Список {selectedCategory}</h3>
          {(selectedCategory === "Новости" ? news : selectedCategory === "Награды" ? awards : gallery).map((item) => (
            <div key={item.id} className="border p-2 rounded-lg mb-2 flex items-center justify-between">
              {item.image && <img src={item.image} alt="Фото" className="w-16 h-16 object-cover rounded-lg" />}
              <button onClick={() => deleteItem(item.id)} className="text-red-500">Удалить</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
