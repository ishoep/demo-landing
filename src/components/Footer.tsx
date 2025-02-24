import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { MapPin, Phone, Mail, Instagram, Send as Telegram } from 'lucide-react';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Logo</h3>
            <p className="text-gray-400">{t.footer.description}</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-4">{t.footer.contact}</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                <span className="text-gray-400">{t.footer.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-blue-400" />
                <a href="tel:+998901234567" className="text-gray-400 hover:text-white transition-colors">
                  +998 12 345 6789
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-400" />
                <a href="mailto:info@name.uz" className="text-gray-400 hover:text-white transition-colors">
                  info@name.uz
                </a>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-4">{t.footer.followUs}</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/rszxkv/" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://t.me/qdweb" className="text-gray-400 hover:text-white transition-colors">
                <Telegram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2025 SSV. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer