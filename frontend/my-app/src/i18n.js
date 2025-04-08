import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en.json";
import translationKR from "./locales/kr.json";

// available translations
const resources = {
  en: { translation: translationEN },
  kr: { translation: translationKR },
};

i18n
  .use(LanguageDetector) // detect browser language
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
