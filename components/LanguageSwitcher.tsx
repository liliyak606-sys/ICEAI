
import React from 'react';
import { useI18n } from '../context/i18n';

const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { locale, setLocale } = useI18n();

  const getButtonClass = (lang: string) => {
    const isActive = locale === lang;
    return `font-space-grotesk font-bold text-sm uppercase transition-colors duration-300 ${
      isActive ? 'text-cyan-400' : 'text-gray-500 hover:text-white'
    }`;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button onClick={() => setLocale('ru')} className={getButtonClass('ru')}>
        RU
      </button>
      <span className="text-gray-700">/</span>
      <button onClick={() => setLocale('en')} className={getButtonClass('en')}>
        EN
      </button>
      <span className="text-gray-700">/</span>
      <button onClick={() => setLocale('he')} className={getButtonClass('he')}>
        HE
      </button>
    </div>
  );
};

export default LanguageSwitcher;
