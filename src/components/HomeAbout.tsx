import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import PageTransition from '../components/PageTransition';

const HomeAbout: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <PageTransition>
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.about.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t.about.description}
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default HomeAbout;
