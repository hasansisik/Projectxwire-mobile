import { View, Platform, StatusBar, SafeAreaView } from "react-native";
import React from "react";
import { AppBar, HeightSpacer, ReusableText } from "../../../components";
import styles from "../../Pages/pages.style";
import ReusableSettings from "../../../components/Reusable/ReusableSettings";
import { COLORS, TEXT } from "../../../constants/theme";
import { PrivacyPolicy, TermsPolicy, CookiePolicy } from "../../Data/index";
import { useTranslation } from "react-i18next";

const Politicy = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView
      style={[
        { flex: 1, backgroundColor: COLORS.white },
        { top: Platform.OS === "ios" ? 0 : StatusBar.currentHeight },
      ]}
    >
      <View style={styles.header}>
        <AppBar
          top={20}
          left={20}
          right={20}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReusableText
          text={t("appPolicies")}
          family={"regular"}
          size={TEXT.medium}
          color={COLORS.description}
        />
        <ReusableText
          text={t("ourPolicies")}
          family={"medium"}
          size={TEXT.xLarge}
          color={COLORS.black}
        />
      </View>

      <HeightSpacer height={50} />
      <View style={{ paddingHorizontal: 20, paddingBottom: 5 }}>
        <ReusableText
          text={t("appPolicies")}
          family={"regular"}
          size={TEXT.small}
          color={COLORS.description}
        />
      </View>
      <View style={styles.settingsBox}>
        <ReusableSettings
          icon={"document-lock-outline"}
          title={t("privacyPolicy")}
          onPress={() => {
            navigation.navigate("PoliticyPage", {
              header: t("ourPolicies"),
              title: t("privacyPolicy"),
              text: PrivacyPolicy,
            });
          }}
        />
        <View style={{ borderTopWidth: 1, borderColor: COLORS.lightBorder }} />
        <ReusableSettings
          icon={"document-text-outline"}
          title={t("termsOfUse")}
          onPress={() => {
            navigation.navigate("PoliticyPage", {
              header: t("ourPolicies"),
              title: t("termsOfUse"),
              text: TermsPolicy,
            });
          }}
        />
        <View style={{ borderTopWidth: 1, borderColor: COLORS.lightBorder }} />
        <ReusableSettings
          icon={"documents-outline"}
          title={t("cookiePolicy")}
          onPress={() => {
            navigation.navigate("PoliticyPage", {
              header: t("ourPolicies"),
              title: t("cookiePolicy"),
              text: CookiePolicy,
            });
          }}
        />
      </View>
      <HeightSpacer height={30} />
    </SafeAreaView>
  );
};

export default Politicy;
