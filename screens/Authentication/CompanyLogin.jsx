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
  Text,
  Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
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
  const inputAnimation = useRef(new Animated.Value(0)).current;
  const textAnimation = useRef(new Animated.Value(1)).current;

  const formik = useFormik({
    initialValues: { CompanyCode: "", password: "" },
    onSubmit: async (values) => {
      const actionResult = await dispatch(companyLogin(values));
      if (companyLogin.fulfilled.match(actionResult)) {
        navigation.navigate("Auth");
        setStatus("success");
        setMessage(t("loginSuccessful"));
      } else if (actionResult.type === companyLogin.rejected.type) {
        const NoticeMessage = actionResult.payload;
        setStatus("error");
        setMessage(NoticeMessage);
      }
      setTimeout(() => setStatus(null), 5000);
    },
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        Animated.timing(inputAnimation, {
          toValue: 50,
          duration: 500,
          useNativeDriver: true,
        }).start();
        Animated.timing(textAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        Animated.timing(inputAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
        Animated.timing(textAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [inputAnimation, textAnimation]);

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
          <Animated.View
            style={{
              padding: 20,
              opacity: textAnimation,
              transform: [
                {
                  translateY: textAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
              ],
            }}
          >
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
          </Animated.View>
        </View>
        <Animated.View
          style={[
            styles.context,
            {
              transform: [
                {
                  translateY: inputAnimation,
                },
              ],
            },
          ]}
        >
          <View>
          <ReusableInput
            label={t("companyCode")}
            theme={{ colors: { primary: "black" } }}
            value={formik.values.CompanyCode}
            onChangeText={formik.handleChange("CompanyCode")}
            touched={formik.touched.CompanyCode}
            error={formik.errors.CompanyCode}
            allowSpaces={false}
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
        </Animated.View>
        {status && <NoticeMessage status={status} message={message} />}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CompanyLogin;