import { View, SafeAreaView, Platform, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  HeightSpacer,
  ReusableButton,
  ReusableText,
} from "../../../components";
import { COLORS, SIZES, TEXT } from "../../../constants/theme";
import general from "../../../components/general.style";
import { useDispatch } from "react-redux";
import NoticeMessage from "../../../components/Reusable/NoticeMessage";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import i18n from "../../../locales/i18n"; // i18n import edildi

const ProjectLocales = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [language, setLanguage] = useState(null);
  const { t } = useTranslation();

  const languages = [
    { label: "Türkçe", value: "tr" },
    { label: "İngilizce", value: "en" },
    { label: "Fransızca", value: "fr" },
    { label: "Rusça", value: "ru" },
  ];

  useEffect(() => {
    const fetchLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        setLanguage(savedLanguage);
        i18n.changeLanguage(savedLanguage); // Dil değişikliği uygulandı
      }
    };
    fetchLanguage();
  }, []);

  const handleLanguageChange = async (item) => {
    try {
      await AsyncStorage.setItem("language", item.value);
      setLanguage(item.value);
      i18n.changeLanguage(item.value); // Dil değişikliği uygulandı
      setStatus("success");
      setMessage("Dil başarıyla güncellendi");
    } catch (error) {
      setStatus("error");
      setMessage("Dil güncellenirken bir hata oluştu");
    }
  };

  return (
    <SafeAreaView
      style={[
        general.container,
        { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
      ]}
    >
      <View style={general.page}>
        <AppBar
          top={20}
          left={20}
          right={20}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
        <HeightSpacer height={50} />
        <View style={{ paddingBottom: 15 }}>
          <ReusableText
            text={t("language")}
            family={"regular"}
            size={TEXT.large}
            color={COLORS.description}
          />
          <ReusableText
            text={t("update")}
            family={"medium"}
            size={TEXT.xxLarge}
            color={COLORS.black}
          />
        </View>
        <Dropdown
          style={general.dropdown}
          data={languages}
          labelField="label"
          valueField="value"
          placeholder="Dil Seçiniz"
          value={language}
          onChange={handleLanguageChange}
        />
        <HeightSpacer height={50} />
        <ReusableButton
          btnText={t("update")}
          width={SIZES.width - 40}
          height={40}
          borderRadius={SIZES.small}
          backgroundColor={COLORS.orange}
          textColor={COLORS.white}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
          onPress={() => handleLanguageChange({ value: language })}
        />
      </View>
      {status && <NoticeMessage status={status} message={message} />}
    </SafeAreaView>
  );
};

export default ProjectLocales;