import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

interface NewsItem {
  id: string;
  title: { en: string; ru: string; uz: string };
  description: { en: string; ru: string; uz: string };
  image: string;
  date: string;
}

interface NewsProps {
  limit?: number;
}

const News: React.FC<NewsProps> = ({ limit }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "новости"));
  
        console.log("querySnapshot.docs:", querySnapshot.docs);
  
        const newsData = querySnapshot.docs.map(doc => {
          console.log("Документ из Firestore:", doc.id, doc.data()); // <-- Важно!
  
          return {
            id: doc.id,
            ...doc.data()
          };
        }) as NewsItem[];
  
        console.log("Новости из Firestore:", newsData);
        setNews(newsData);
      } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchNews();
  }, []);
  
  if (loading) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Загрузка...</p>;
  }

  if (news.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Новостей пока нет.</p>;
  }

  const displayedNews = limit ? news.slice(0, limit) : news;

  return (
    <section id="news" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t.nav.news}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedNews.map((item) => (
            <div key={item.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg">
              <img
                src={item.image}
                alt={item.title[language] || item.title.ru}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                  <span className="text-sm">{item.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {item.title[language] || item.title.ru}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {item.description[language] || item.description.ru}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
