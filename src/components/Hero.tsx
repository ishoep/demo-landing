import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { GraduationCap, Clock, Users, Award } from 'lucide-react';
import HomeAbout from '../components/HomeAbout';
import { NavLink } from 'react-router-dom';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const stats = [
    { icon: <GraduationCap className="w-8 h-8" />, value: '10000+', label: t.hero.students },
    { icon: <Clock className="w-8 h-8" />, value: '16', label: t.hero.years },
    { icon: <Users className="w-8 h-8" />, value: '№1', label: t.hero.teachers },
    { icon: <Award className="w-8 h-8" />, value: '100%', label: t.hero.success }
  ];

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>
      
      <div className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              {t.hero.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              {t.hero.subtitle}
            </p>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold 
                hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 
                ${isActive ? 'ring-2 ring-blue-400' : ''}`
              }
            >
              {t.nav.courses}
            </NavLink>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-delay">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/90 dark:bg-gray-800/90 rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <HomeAbout />
        </div>
      </div>
    </div>
  );
};

export default Hero