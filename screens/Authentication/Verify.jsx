import { View, SafeAreaView, Platform, StatusBar, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./auth.style";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import {
  AppBar,
  HeightSpacer,
  ReusableButton,
  ReusableText,
} from "../../components";
import OTPTextInput from "react-native-otp-textinput";
import { useDispatch } from "react-redux";
import { verifyEmail, againEmail } from "../../redux/actions/userActions";
import NoticeMessage from "../../components/Reusable/NoticeMessage";

const Verify = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const email = route.params.email;

  const [verificationCode, setVerificationCode] = useState("");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  const submitHandler = async () => {
    const actionResult = await dispatch(
      verifyEmail({ email, verificationCode })
    );
    if (verifyEmail.fulfilled.match(actionResult)) {
      navigation.navigate("Login");
      setStatus("success");
      setMessage("Doğrulama başarılı");
    } else if (verifyEmail.rejected.match(actionResult)) {
      const NoticeMessage = actionResult.payload;
      setStatus("error");
      setMessage(NoticeMessage);
    }
    setTimeout(() => setStatus(null), 5000);
  };

  const resendHandler = () => {
    dispatch(againEmail(email));
  };

  return (
    <SafeAreaView
      style={[
        styles.page,
        { top: Platform.OS === "ios" ? 0 : StatusBar.currentHeight },
      ]}
    >
      {/* Content */}
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/projectxwire-e951a.appspot.com/o/background-line.png?alt=media&token=6c1e4177-f00f-42f1-b76b-4bf6aa4f62b5",
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
          top={25}
          left={20}
          right={20}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
        <HeightSpacer height={75} />
        <View style={{ padding: 20 }}>
          {/* Header */}
          <ReusableText
            text={"Şifremi Unuttum"}
            family={"bold"}
            size={TEXT.xLarge}
            color={COLORS.orange}
          />
          {/* Description */}
          <ReusableText
            text={"Şifrenizi sıfırlamak için mail adresinizi girin."}
            family={"regular"}
            size={TEXT.medium}
            color={COLORS.description}
          />
          <HeightSpacer height={50} />
          <View>
            {/* OTP Input */}
            <OTPTextInput
              handleTextChange={setVerificationCode}
              inputCount={4}
              keyboardType="numeric"
              tintColor={COLORS.black} // tintColor siyah oldu
              offTintColor="#BBBCBE"
              backgroundColor={COLORS.white}
              textInputStyle={styles.OtpInput}
              containerStyle={styles.OtpContainer}
            />
            <HeightSpacer height={50} />
            {/* Login Button */}
            <ReusableButton
              btnText={"Doğrula"}
              width={SIZES.width - 40}
              height={50}
              borderRadius={SIZES.small}
              backgroundColor={COLORS.orange}
              textColor={COLORS.white}
              textFontSize={TEXT.small}
              textFontFamily={"medium"}
              onPress={submitHandler}
            />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <ReusableText
          text={"Doğrulama Kodu Gelmedi mi ? "}
          family={"regular"}
          size={TEXT.small}
          color={COLORS.description}
        />
        <TouchableOpacity onPress={resendHandler}>
          <ReusableText
            text={"Tekrar Gönder"}
            family={"bold"}
            size={TEXT.small}
            color={COLORS.lightBlack}
          />
        </TouchableOpacity>
      </View>
      {status && <NoticeMessage status={status} message={message} />}
    </SafeAreaView>
  );
};

export default Verify;
