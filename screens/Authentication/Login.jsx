import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import styles from "./auth.style";
import general from "../../components/general.style";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import {
  AppBar,
  HeightSpacer,
  ReusableButton,
  ReusableInput,
  ReusableText,
} from "../../components";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { loginSchema } from "../../utils/validation";
import { login } from "../../redux/actions/userActions";
import NoticeMessage from "../../components/Reusable/NoticeMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [companyId, setCompanyId] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { t } = useTranslation();
  const inputAnimation = useRef(new Animated.Value(0)).current;
  const textAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fetchCompanyId = async () => {
      const storedCompanyId = await AsyncStorage.getItem("companyId");
      setCompanyId(storedCompanyId);
    };
    fetchCompanyId();

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

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const actionResult = await dispatch(
        login({
          ...values,
          companyId,
        })
      );
      if (login.fulfilled.match(actionResult)) {
        navigation.navigate("Home");
        setStatus("success");
        setMessage(t("loginSuccessful"));
      } else if (login.rejected.match(actionResult)) {
        const NoticeMessage = actionResult.payload;
        setStatus("error");
        setMessage(NoticeMessage);
      }
      setTimeout(() => setStatus(null), 5000);
    },
  });

  const CompanyLogin = async () => {
    await AsyncStorage.removeItem("companyId");
    navigation.navigate("CompanyLoginAgain");
  };

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
        {/* Content */}
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
          <AppBar
            top={15}
            left={20}
            right={20}
            color={COLORS.white}
            onPress={() => navigation.goBack()}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 20,
              top: 30,
            }}
            onPress={CompanyLogin}
          >
            <ReusableText
              text={t("companyLoginPage")}
              family={"medium"}
              size={TEXT.xSmall}
              color={COLORS.black}
              underline={true}
            />
          </TouchableOpacity>
          <HeightSpacer height={75} />
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
            {!isKeyboardVisible && (
              <View>
                {/* Header */}
                <ReusableText
                  text={t("welcomeBack")}
                  family={"bold"}
                  size={TEXT.xLarge}
                  color={COLORS.orange}
                />
                {/* Description */}
                <ReusableText
                  text={t("loginPrompt")}
                  family={"regular"}
                  size={TEXT.small}
                  color={COLORS.description}
                />
              </View>
            )}
          </Animated.View>
        </View>
        {/* Footer */}
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
            {/*Mail Input*/}
            <ReusableInput
              label={t("email")}
              theme={{ colors: { primary: "black" } }}
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
              touched={formik.touched.email}
              error={formik.errors.email}
              allowSpaces={false}
            />
            {/*Password Input*/}
            <ReusableInput
              label={t("password")}
              secureTextEntry={true}
              theme={{ colors: { primary: "black" } }}
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              touched={formik.touched.password}
              error={formik.errors.password}
            />
            {/* Login Button */}
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
          {/* Footer */}
          {!isKeyboardVisible && (
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <ReusableText
                  text={t("forgotPassword")}
                  family={"bold"}
                  size={TEXT.xxSmall}
                  color={COLORS.orange}
                  underline={true}
                />
              </TouchableOpacity>
              <ReusableText
                text={t("noAccount")}
                family={"regular"}
                size={TEXT.xxSmall}
                color={COLORS.description}
              />
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <ReusableText
                  text={t("registerButton")}
                  family={"bold"}
                  size={TEXT.xxSmall}
                  color={COLORS.orange}
                  underline={true}
                />
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
        {status && <NoticeMessage status={status} message={message} />}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;
