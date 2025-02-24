import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Hero from '../components/Hero';
import News from '../components/News';
import Awards from '../components/Awards';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import ImageCarousel from "../components/ImageCarousel";

const HomePage: React.FC = () => {
  const { language } = useLanguage();
    const t = translations[language];

  return (
    <PageTransition>
      <Hero />
      
      {/* Новости */}
      <News limit={3} />
      <div className="text-center mb-20">
        <Link
          to="/news"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {t.nav.newss}
        </Link>
      </div>

      {/* Награды */}
      <Awards limit={3} />
      <div className="text-center mb-20">
        <Link
          to="/awards"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {t.nav.awardss}
        </Link>
      </div>
      <ImageCarousel />

      {/* Блок "Готовы подать заявку?" */}
      <div className="bg-blue-400 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center md:text-left max-w-2xl">
            {t.apply.title}
          </h2>
          <Link
            to="/contacts"
            className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition mt-6 md:mt-0"
          >
            {t.apply.button}
          </Link>
        </div>
      </div>

      {/* Секция "Как подать заявку" */}
      <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">{t.apply.howTo}</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold">{t.apply.step1.title}</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{t.apply.step1.text}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">{t.apply.step2.title}</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{t.apply.step2.text}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">{t.apply.step3.title}</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{t.apply.step3.text}</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default HomePage;
