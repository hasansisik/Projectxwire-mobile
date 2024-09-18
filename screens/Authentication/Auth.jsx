import {
  View,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "./auth.style";
import general from "../../components/general.style";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { HeightSpacer, ReusableText, ReusableButton } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const Auth = ({ navigation }) => {
  const { t } = useTranslation();

  const CompanyLogin = async () => {
    await AsyncStorage.removeItem("companyId");
    navigation.navigate("CompanyLoginAgain");
  };
  return (
    <SafeAreaView
      style={[
        general.container,
        { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
      ]}
    >
      <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/projectxwire-e951a.appspot.com/o/authBuild.png?alt=media&token=33f5398b-9c53-41d1-8322-8ff7a44e3a9f",
        }}
        style={{
          width: Dimensions.get("window").width - 40,
          height: Dimensions.get("window").height / 2.2,
          marginBottom: 25,
          alignContent: "center",
          margin: 20,
        }}
        resizeMode="contain"
      />
      <View style={styles.context}>
        <ReusableText
          text={t("welcome")}
          family={"bold"}
          size={TEXT.xLarge}
          color={COLORS.black}
        />
        <HeightSpacer height={15} />
        <ReusableText
          text={t("authDescription")}
          family={"regular"}
          size={TEXT.small}
          color={COLORS.description}
          align={"center"}
        />
      </View>
      <View style={styles.context}>
        <ReusableButton
          btnText={t("loginButton")}
          width={SIZES.width - 40}
          height={40}
          borderRadius={SIZES.small}
          backgroundColor={COLORS.orange}
          textColor={COLORS.white}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
          onPress={() => navigation.navigate("Login")}
        />
        <HeightSpacer height={10} />
        <ReusableButton
          btnText={t("registerButton")}
          width={SIZES.width - 40}
          height={45}
          borderRadius={SIZES.small}
          textColor={COLORS.black}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
          onPress={() => navigation.navigate("Register")}
        />
        <HeightSpacer height={20} />
        <TouchableOpacity onPress={CompanyLogin}>
          <ReusableText
            text={t("companyLoginPage")}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.description}
            underline={true}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Auth;
