import 'intl-pluralrules'; // Polyfill'i dahil edin

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import trTranslation from "./tr/translation.json";
import enTranslation from "./en/translation.json";
import frTranslation from "./fr/translation.json";
import deTranslation from "./de/translation.json";
import ruTranslation from "./ru/translation.json";

const getSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem("language");
    return savedLanguage || Localization.locale.split('-')[0]; // Cihaz dilini kullan
  } catch (error) {
    return Localization.locale.split('-')[0]; // Hata durumunda cihaz dilini kullan
  }
};

getSavedLanguage().then((lng) => {
  i18n.use(initReactI18next).init({
    resources: {
      tr: { translation: trTranslation },
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
      de: { translation: deTranslation },
      ru: { translation: ruTranslation },
    },
    lng,
    fallbackLng: "tr", // Dil bulunamazsa Türkçe kullan
    interpolation: {
      escapeValue: false,
    },
  });
});

export default i18n;