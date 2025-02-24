import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { Language } from '../types';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'ru', label: 'РУ' },
    { code: 'uz', label: 'UZ' },
    { code: 'en', label: 'EN' }
  ];

  const navItems = [
    { path: '/about', key: 'about' },
    { path: '/news', key: 'news' },
    { path: '/history', key: 'history' },
    { path: '/courses', key: 'courses' },
    { path: '/awards', key: 'awards' },
    { path: '/contacts', key: 'contacts' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
        <NavLink 
            to="/"
            className="flex-shrink-0 text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300 
                      max-w-[200px] sm:max-w-none overflow-hidden text-ellipsis whitespace-nowrap"
          >
            Logo
        </NavLink>


          {/* Десктопное меню */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(({ path, key }) => (
              <NavLink
                key={key}
                to={path}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-colors duration-300
                  ${isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`
                }
              >
                {translations[language].nav[key]}
              </NavLink>
            ))}
          </div>

          {/* Иконки справа */}
          <div className="flex items-center space-x-4">
            {/* Смена языка (для десктопа) */}
            <div className="hidden md:flex items-center space-x-2 border-r pr-4 dark:border-gray-700">
              <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={`relative px-2 py-1 rounded text-sm transition-colors duration-300 ${
                    language === code
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-600" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-400" />
                )}
              </motion.div>
            </motion.button>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map(({ path, key }) => (
                  <NavLink
                    key={key}
                    to={path}
                    onClick={toggleMobileMenu}
                    className={({ isActive }) =>
                      `relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300
                      ${isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                      }`
                    }
                  >
                    {translations[language].nav[key]}
                  </NavLink>
                ))}
              </div>

              {/* Смена языка в мобильном меню */}
              <div className="flex items-center justify-center space-x-4 mt-4 border-t pt-4 dark:border-gray-700">
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                {languages.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLanguage(code);
                      toggleMobileMenu(); // Закрыть меню после выбора языка
                    }}
                    className={`relative px-3 py-1 rounded text-sm transition-colors duration-300 ${
                      language === code
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
