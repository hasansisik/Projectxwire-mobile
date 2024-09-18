import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, TEXT } from "../../../constants/theme";
import { AppBar, HeightSpacer, ReusableText } from "../../../components";
import styles from "../settings.style";
import general from "../../../components/general.style";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import NoticeMessage from "../../../components/Reusable/NoticeMessage";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../../locales/i18n"; // i18n import edildi

const ProjectEdit = ({ navigation }) => {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const { projects } = useSelector((state) => state.projects);
  const { t } = useTranslation();

  const dropdownData = projects.map((project) => ({
    projectId: project._id,
    projectName: project.projectName,
    projectCode: project.projectCode,
    address: project.address,
  }));

  const [value, setValue] = useState(null);
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [selectedProjectCode, setSelectedProjectCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  const languages = [
    { label: t("turkish"), value: "tr" },
    { label: t("english"), value: "en" },
    { label: t("french"), value: "fr" },
    { label: t("german"), value: "de" },
    { label: t("russian"), value: "ru" },
  ];

  const [language, setLanguage] = useState(null);

  useEffect(() => {
    const fetchLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        setLanguage(savedLanguage);
        i18n.changeLanguage(savedLanguage);
      }
    };
    fetchLanguage();
  }, []);

  const handleLanguageChange = async (item) => {
    try {
      await AsyncStorage.setItem("language", item.value);
      setLanguage(item.value);
      i18n.changeLanguage(item.value);
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
          top={25}
          left={20}
          right={20}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
        <HeightSpacer height={75} />
        <ReusableText
          text={t("selectProject")}
          family={"medium"}
          size={TEXT.medium}
          color={COLORS.black}
        />
        <View
          style={{
            borderBottomColor: "#E5E5E5",
            borderBottomWidth: 1,
            paddingVertical: 20,
          }}
        >
          <Dropdown
            data={dropdownData}
            labelField="projectName"
            valueField="projectId"
            value={value}
            onChange={(item) => {
              setValue(item.projectId);
              setSelectedProjectName(item.projectName);
              setSelectedProjectCode(item.projectCode);
              setSelectedAddress(item.address);
            }}
            placeholder={t("selectProject")}
            touchableWrapperProps={{
              activeOpacity: 1,
            }}
          />
        </View>
        <HeightSpacer height={50} />
        <ReusableText
          text={t("projectInfo")}
          family={"medium"}
          size={TEXT.medium}
          color={COLORS.black}
        />
        {/* ProjectName */}
        <TouchableOpacity
          onPress={() => {
            if (selectedProjectName) {
              navigation.navigate("ProjectName", {
                projectId: value,
              });
            } else {
              setStatus("error");
              setMessage("Lütfen Proje Seçin");
              setTimeout(() => setStatus(null), 3000);
            }
          }}
          style={styles.info}
        >
          <ReusableText
            text={t("projectName")}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View style={general.row("")}>
            <ReusableText
              text={selectedProjectName || t("projectNotSelected")}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <Feather name="chevron-right" size={20} />
          </View>
        </TouchableOpacity>
        {/* ProjectCode */}
        <TouchableOpacity
          onPress={() => {
            if (selectedProjectCode) {
              navigation.navigate("ProjectCode", { projectId: value });
            } else {
              setStatus("error");
              setMessage("Lütfen Proje Seçin");
              setTimeout(() => setStatus(null), 3000);
            }
          }}
          style={styles.info}
        >
          <ReusableText
            text={t("projectCode")}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View style={general.row("")}>
            <ReusableText
              text={selectedProjectCode || t("projectNotSelected")}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <Feather name="chevron-right" size={20} />
          </View>
        </TouchableOpacity>
        {/* ProjectAddress */}
        <TouchableOpacity
          onPress={() => {
            if (selectedAddress) {
              navigation.navigate("ProjectAdress", {
                projectId: value,
              });
            } else {
              setStatus("error");
              setMessage("Lütfen Proje Seçin");
              setTimeout(() => setStatus(null), 3000);
            }
          }}
          style={styles.info}
        >
          <ReusableText
            text={t("address")}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View style={general.row("")}>
            <ReusableText
              text={selectedAddress || t("projectNotSelected")}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <Feather name="chevron-right" size={20} />
          </View>
        </TouchableOpacity>
        <HeightSpacer height={50} />
        <ReusableText
          text={t("units")}
          family={"medium"}
          size={TEXT.medium}
          color={COLORS.black}
        />
        <View style={styles.info}>
          <ReusableText
            text={t("timeZone")}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View style={general.row("")}>
            <ReusableText
              text={"GMT+3:00 Türkiye Saati"}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <Feather name="chevron-right" size={20} />
          </View>
        </View>
        <View style={styles.info}>
          <ReusableText
            text={t("theme")}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View style={general.row("")}>
            <ReusableText
              text={t("light")}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <Feather name="chevron-right" size={20} />
          </View>
        </View>
          <View style={styles.info}>
            <ReusableText
              text={t("language")}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.black}
            />
            <Dropdown
              style={styles.dropdown}
              data={languages}
              labelField="label"
              valueField="value"
              placeholder="Dil Seçiniz"
              value={language}
              onChange={handleLanguageChange}
            />
          </View>
      </View>
      {status && <NoticeMessage status={status} message={message} />}
    </SafeAreaView>
  );
};

export default ProjectEdit;
