import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { registerSchema } from "../../utils/validation";
import { register } from "../../redux/actions/userActions";
import NoticeMessage from "../../components/Reusable/NoticeMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [companyId, setCompanyId] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { t } = useTranslation();

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

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const actionResult = await dispatch(
        register({
          name: values.name,
          email: values.email,
          password: values.password,
          companyId,
        })
      );
      if (register.fulfilled.match(actionResult)) {
        navigation.navigate("Verify", { email: values.email });
        setStatus("success");
        setMessage(t("registrationSuccessful"));
      } else if (register.rejected.match(actionResult)) {
        const NoticeMessage = actionResult.payload;
        setStatus("error");
        setMessage(NoticeMessage);
      }
      setTimeout(() => setStatus(null), 5000);
    },
  });

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
          <HeightSpacer height={50} />
          {!isKeyboardVisible && (
            <View style={{ padding: 20 }}>
              {/* Header */}
              <ReusableText
                text={t("joinUs")}
                family={"bold"}
                size={TEXT.xLarge}
                color={COLORS.orange}
              />
              {/* Description */}
              <ReusableText
                text={t("registerPrompt")}
                family={"regular"}
                size={TEXT.small}
                color={COLORS.description}
              />
            </View>
          )}
        </View>
        {/* Footer */}
        <View style={styles.context}>
          {/* Inputs */}
          <View>
            {/* Username Input */}
            <ReusableInput
              label={t("fullName")}
              theme={{ colors: { primary: "black" } }}
              value={formik.values.name}
              onChangeText={formik.handleChange("name")}
              touched={formik.touched.name}
              error={formik.errors.name}
            />
            {/* Email Input */}
            <ReusableInput
              label={t("email")}
              theme={{ colors: { primary: "black" } }}
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
              touched={formik.touched.email}
              error={formik.errors.email}
              allowSpaces={false}
            />
            {/* Password Input */}
            <ReusableInput
              label={t("password")}
              theme={{ colors: { primary: "black" } }}
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              touched={formik.touched.password}
              error={formik.errors.password}
            />
            {/* Confirm Password Input */}
            <ReusableInput
              label={t("repeatPassword")}
              theme={{ colors: { primary: "black" } }}
              value={formik.values.confirmPassword}
              onChangeText={formik.handleChange("confirmPassword")}
              touched={formik.touched.confirmPassword}
              error={formik.errors.confirmPassword}
            />
            {/* Register Button */}
            <ReusableButton
              btnText={t("registerButton")}
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
          <View style={styles.footer}>
            <ReusableText
              text={t("alreadyHaveAccount")}
              family={"regular"}
              size={TEXT.xSmall}
              color={COLORS.description}
              underline={true}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <ReusableText
                text={t("loginButton")}
                family={"bold"}
                size={TEXT.xSmall}
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

export default Register;
