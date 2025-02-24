import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import PageTransition from '../components/PageTransition';
import { History } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const timeline = [
    {
      year: '2010',
      title: t.history.founding,
      description: t.history.foundingText
    },
    {
      year: '2015',
      title: t.history.expansion,
      description: t.history.expansionText
    },
    {
      year: '2020',
      title: t.history.innovation,
      description: t.history.innovationText
    },
    {
      year: '2025',
      title: t.history.present,
      description: t.history.presentText
    }
  ];

  return (
    <PageTransition>
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <History className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {t.history.title}
            </h1>
          </div>

          <div className="relative">
            {/* Центральная линия на десктопе */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-600 dark:bg-blue-400 h-full hidden sm:block" />

            <div className="space-y-12 sm:space-y-16">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col sm:flex-row items-center sm:items-start ${
                    index % 2 === 0 ? 'sm:justify-start' : 'sm:justify-end'
                  }`}
                >
                  {/* Точка на линии */}
                  <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full" />

                  <div
                    className={`w-full sm:w-1/2 px-6 sm:px-8 ${
                      index % 2 === 0 ? 'sm:pr-8 text-left' : 'sm:pl-8 text-left sm:text-right'
                    }`}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
                      <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default HistoryPage;
