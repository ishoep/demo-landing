import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { courses } from '../data';
import { translations } from '../translations';

const Courses: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="courses" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {translations[language].nav.courses}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title[language]}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {course.title[language]}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {course.description[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;