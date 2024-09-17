import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  Linking,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./auth.style";
import general from "../../components/general.style";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import {
  HeightSpacer,
  ReusableButton,
  ReusableInput,
  ReusableText,
} from "../../components";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import NoticeMessage from "../../components/Reusable/NoticeMessage";
import { companyLogin } from "../../redux/actions/companyActions";
import { useTranslation } from "react-i18next";

const CompanyLogin = ({ navigation }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { CompanyCode: "", password: "" },
    onSubmit: async (values) => {
      const actionResult = await dispatch(companyLogin(values));
      if (companyLogin.fulfilled.match(actionResult)) {
        navigation.navigate("Auth");
        setStatus("success");
        setMessage("Giriş başarılı");
      } else if (actionResult.type === companyLogin.rejected.type) {
        const NoticeMessage = actionResult.payload;
        setStatus("error");
        setMessage(NoticeMessage);
      }
      setTimeout(() => setStatus(null), 5000);
    },
  });

  const handleForgotInfoPress = () => {
    Linking.openURL(
      "mailto:destek@Projectxwire.com?subject=Bilgilerimi Unuttum&body=Merhaba, bilgilerimi unuttum, yardımcı olabilir misiniz?"
    );
  };
  const handleApplyPress = () => {
    Linking.openURL(
      "mailto:basvur@Projectxwire.com?subject=Başvuru&body=Merhaba, şirket kodu başvurusunda bulunmak istiyorum."
    );
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={[
          general.container,
          { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
        ]}
      >
        <View style={styles.container}>
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/projectxwire-e951a.appspot.com/o/background-line.png?alt=media&token=a6b97028-2aa0-46fb-b2ae-6a67d374fe8d",
            }}
            style={{
              position: "absolute",
              width: SIZES.width,
              height: SIZES.height,
              opacity: 0.5,
            }}
            resizeMode="contain"
          />
          {!isKeyboardVisible && (
            <View style={{ padding: 20 }}>
              <ReusableText
                text={t("welcomeMessage")}
                family={"bold"}
                size={TEXT.xLarge}
                color={COLORS.orange}
              />
              <ReusableText
                text={t("companyInfo")}
                family={"regular"}
                size={TEXT.small}
                color={COLORS.description}
              />
            </View>
          )}
        </View>
        <View style={styles.context}>
          <View>
            <ReusableInput
              label={t("companyCode")}
              theme={{ colors: { primary: "black" } }}
              value={formik.values.CompanyCode}
              onChangeText={formik.handleChange("CompanyCode")}
              touched={formik.touched.CompanyCode}
              error={formik.errors.CompanyCode}
            />
            <ReusableInput
              label={t("password")}
              secureTextEntry={true}
              theme={{ colors: { primary: "black" } }}
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              touched={formik.touched.password}
              error={formik.errors.password}
            />
            <ReusableButton
              btnText={t("loginButton")}
              width={SIZES.width - 40}
              height={50}
              borderRadius={SIZES.small}
              backgroundColor={COLORS.orange}
              textColor={COLORS.white}
              textFontSize={TEXT.small}
              textFontFamily={"medium"}
              onPress={formik.handleSubmit}
            />
          </View>
          <HeightSpacer height={50} />
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleForgotInfoPress}>
              <ReusableText
                text={t("forgotInfo")}
                family={"bold"}
                size={TEXT.xxSmall}
                color={COLORS.orange}
                underline={true}
              />
            </TouchableOpacity>
            <ReusableText
              text={t("noCompanyCode")}
              family={"regular"}
              size={TEXT.xxSmall}
              color={COLORS.description}
              underline={true}
            />
            <TouchableOpacity onPress={handleApplyPress}>
              <ReusableText
                text={t("applyNow")}
                family={"bold"}
                size={TEXT.xxSmall}
                color={COLORS.orange}
                underline={true}
              />
            </TouchableOpacity>
          </View>
        </View>
        {status && <NoticeMessage status={status} message={message} />}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CompanyLogin;
