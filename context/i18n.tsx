import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Locale = 'en' | 'ru' | 'he';

// A helper function to get nested values from an object using a dot-notation string
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: <T = string>(key: string, options?: { [key: string]: string | number }) => T;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('ru');
  const [translations, setTranslations] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    // Detect browser language on initial load
    const browserLang = navigator.language.split(/[-_]/)[0];
    if (browserLang === 'en') {
      setLocale('en');
    } else if (browserLang === 'he') {
      setLocale('he');
    }

    // Fetch translation files dynamically
    const fetchTranslations = async () => {
      try {
        const [enResponse, ruResponse, heResponse] = await Promise.all([
          fetch('./locales/en.json'),
          fetch('./locales/ru.json'),
          fetch('./locales/he.json')
        ]);

        const enData = enResponse.ok ? await enResponse.json() : {};
        const ruData = ruResponse.ok ? await ruResponse.json() : {};
        const heData = heResponse.ok ? await heResponse.json() : {};

        setTranslations({ en: enData, ru: ruData, he: heData });
      } catch (error) {
        console.error("Could not load translations:", error);
        // Set empty objects on failure to prevent the app from crashing
        setTranslations({ en: {}, ru: {}, he: {} });
      }
    };

    fetchTranslations();
  }, []);

  // Handle document direction and language attributes
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'he' ? 'rtl' : 'ltr';
  }, [locale]);

  const t = <T,>(key: string, options?: { [key: string]: string | number }): T => {
    // Return key if translations are not yet loaded
    if (!translations) {
      return key as unknown as T;
    }

    let text = getNestedValue(translations[locale], key);
    
    if (text === undefined) {
      console.warn(`Translation key "${key}" not found for locale "${locale}". Falling back to 'en'.`);
      // Fallback to English if key not found in current locale
      text = getNestedValue(translations['en'], key);
      if (text === undefined) {
        return key as unknown as T;
      }
    }

    // Handle string interpolation
    if (typeof text === 'string' && options) {
      Object.keys(options).forEach(optKey => {
        text = text.replace(`{${optKey}}`, String(options[optKey]));
      });
    }

    return text as T;
  };

  const value = {
    locale,
    setLocale,
    t,
  };

  // Render children only after translations have been loaded to avoid UI flicker
  // with missing text. A proper loading component could be returned here as well.
  if (!translations) {
    return null;
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};