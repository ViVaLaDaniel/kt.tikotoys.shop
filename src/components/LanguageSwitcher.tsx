import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '', compact = false }) => {
  const { i18n } = useTranslation();
  
  const languages = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];
  
  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];
  
  const handleChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };
  
  if (compact) {
    // Компактная версия - просто флаги
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            className={`text-xl p-1 rounded-md transition-all duration-200 ${
              i18n.language === lang.code 
                ? 'bg-pink-500/20 scale-110' 
                : 'opacity-60 hover:opacity-100 hover:bg-gray-700/50'
            }`}
            aria-label={`Switch to ${lang.label}`}
            title={lang.label}
          >
            {lang.flag}
          </button>
        ))}
      </div>
    );
  }
  
  // Полная версия - dropdown
  return (
    <div className={`relative group ${className}`}>
      <button 
        className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700/80 text-white px-3 py-2 rounded-lg border border-gray-700 hover:border-pink-500/50 transition-all duration-300"
        aria-label="Select language"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-sm font-medium hidden sm:inline">{currentLang.label}</span>
        <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Dropdown menu */}
      <div className="absolute right-0 top-full mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[140px] z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors first:rounded-t-lg last:rounded-b-lg ${
              i18n.language === lang.code 
                ? 'bg-pink-500/20 text-pink-400' 
                : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="text-sm font-medium">{lang.label}</span>
            {i18n.language === lang.code && (
              <svg className="w-4 h-4 ml-auto text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
