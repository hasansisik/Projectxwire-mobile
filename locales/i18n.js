import "intl-pluralrules"; 
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./en/translation.json";
import frTranslation from "./fr/translation.json";
import trTranslation from "./tr/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    fr: { translation: frTranslation },
    tr: { translation: trTranslation },
  },
  lng: "en",
  fallbackLng: "tr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
