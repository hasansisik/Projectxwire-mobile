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
import { loginSchema } from "../../utils/validation";
import { login } from "../../redux/actions/userActions";
import NoticeMessage from "../../components/Reusable/NoticeMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [companyId, setCompanyId] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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
        setMessage("Giriş başarılı");
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
              uri: "https://firebasestorage.googleapis.com/v0/b/planwire-9e539.appspot.com/o/background-line.png?alt=media&token=33636fe2-271c-4ec3-bcd8-4074deaae563",
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
              text={"Şirket Girişi Sayfası"}
              family={"medium"}
              size={TEXT.small}
              color={COLORS.black}
              underline={true}
            />
          </TouchableOpacity>
          <HeightSpacer height={75} />
          {!isKeyboardVisible && (
            <View style={{ padding: 20 }}>
              {/* Header */}
              <ReusableText
                text={"Merhaba,\nTekrar Hoşgeldiniz! 👋"}
                family={"bold"}
                size={TEXT.xLarge}
                color={COLORS.orange}
              />
              {/* Description */}
              <ReusableText
                text={
                  "Giriş yaparak devam edebilirsiniz,veya bir hesap oluşturabilirsiniz."
                }
                family={"regular"}
                size={TEXT.medium}
                color={COLORS.description}
              />
            </View>
          )}
        </View>
        {/* Footer */}
        <View style={styles.context}>
          <View>
            {/*Mail Input*/}
            <ReusableInput
              label="E-mail"
              theme={{ colors: { primary: "black" } }}
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
              touched={formik.touched.email}
              error={formik.errors.email}
            />
            {/*Password Input*/}
            <ReusableInput
              label="Şifre"
              secureTextEntry={true}
              theme={{ colors: { primary: "black" } }}
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              touched={formik.touched.password}
              error={formik.errors.password}
            />
            {/* Login Button */}
            <ReusableButton
              btnText={"Giriş Yap"}
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
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <ReusableText
                text={"Şifremi Unuttum ? "}
                family={"bold"}
                size={TEXT.small}
                color={COLORS.orange}
                underline={true}
              />
            </TouchableOpacity>
            <ReusableText
              text={"Hesabınız yok mu ? "}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <ReusableText
                text={"Kayıt Olun"}
                family={"bold"}
                size={TEXT.small}
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

export default Login;
