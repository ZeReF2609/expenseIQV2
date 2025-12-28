'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import en from '@/lib/i18n/locales/en.json';
import es from '@/lib/i18n/locales/es.json';
import pt from '@/lib/i18n/locales/pt.json';

export type Language = 'en' | 'es' | 'pt';

const translations = { en, es, pt };

type TranslationContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: { [key: string]: string }) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

function getNestedValue(obj: any, key: string): string | undefined {
  return key.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'es', 'pt'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      const browserLanguage = navigator.language.split('-')[0] as Language;
      if (['en', 'es', 'pt'].includes(browserLanguage)) {
        setLanguageState(browserLanguage);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = useCallback((key: string, replacements?: { [key: string]: string }) => {
    let translation = getNestedValue(translations[language], key);

    if (!translation) {
      // Fallback to English if translation is not found
      translation = getNestedValue(translations.en, key);
    }

    if (!translation) {
      console.warn(`Translation not found for key: ${key}`);
      return key;
    }

    if (replacements) {
        Object.keys(replacements).forEach(placeholder => {
          translation = translation!.replace(`{{${placeholder}}}`, replacements[placeholder]);
        });
      }

    return translation;
  }, [language]);


  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
