import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './en';
import { es } from './es';

// Определяем язык пользователя
const getDefaultLanguage = (): string => {
  // 1. Проверяем localStorage
  const savedLang = localStorage.getItem('kt-tikotoys-language');
  if (savedLang && ['es', 'en'].includes(savedLang)) {
    return savedLang;
  }
  
  // 2. Проверяем язык браузера
  const browserLang = navigator.language.split('-')[0];
  if (['es', 'en'].includes(browserLang)) {
    return browserLang;
  }
  
  // 3. По умолчанию - испанский (целевой рынок)
  return 'es';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: getDefaultLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React уже экранирует
    },
    react: {
      useSuspense: false, // Отключаем Suspense для SSR совместимости
    },
  });

// Сохраняем выбор языка
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('kt-tikotoys-language', lng);
  document.documentElement.lang = lng;
});

// Устанавливаем начальный lang атрибут
document.documentElement.lang = i18n.language;

export default i18n;
