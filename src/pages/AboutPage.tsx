import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import PageTransition from '../components/PageTransition';
import { Building, Award, Users, Target } from 'lucide-react';

const AboutPage: React.FC = () => {
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300">
              <Building className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t.about.mission}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.about.missionText}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300">
              <Target className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t.about.vision}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.about.visionText}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Award className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.about.quality}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.about.qualityText}
                </p>
              </div>

              <div className="text-center">
                <Users className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.about.community}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.about.communityText}
                </p>
              </div>

              <div className="text-center">
                <Target className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.about.innovation}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.about.innovationText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutPage;