import "intl-pluralrules"; 
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import trTranslation from "./tr/translation.json";
import enTranslation from "./en/translation.json";
import frTranslation from "./fr/translation.json";
import deTranslation from "./de/translation.json";
import ruTranslation from "./ru/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    tr: { translation: trTranslation },
    en: { translation: enTranslation },
    fr: { translation: frTranslation },
    de: { translation: deTranslation },
    ru: { translation: ruTranslation },
  },
  lng: "tr",
  fallbackLng: "tr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
