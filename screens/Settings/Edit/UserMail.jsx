import { View, SafeAreaView, Platform, StatusBar } from "react-native";
import React, { useState } from "react";
import {
  AppBar,
  HeightSpacer,
  ReusableButton,
  ReusableInput,
  ReusableText,
} from "../../../components";
import { COLORS, SIZES, TEXT } from "../../../constants/theme";
import general from "../../../components/general.style";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { editProfile } from "../../../redux/actions/userActions";
import NoticeMessage from "../../../components/Reusable/NoticeMessage";
import { emailUpdateSchema } from "../../../utils/validation";
import { useTranslation } from "react-i18next";

const UserMail = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailUpdateSchema,
    onSubmit: async (values) => {
      const actionResult = await dispatch(editProfile({ email: values.email }));
      if (editProfile.fulfilled.match(actionResult)) {
        setStatus("success");
        setMessage(t("verificationEmailSent"));
        setTimeout(() => {
          navigation.navigate("MailVerify", { email: values.email });
        }, 3000);
      } else if (editProfile.rejected.match(actionResult)) {
        const NoticeMessage = actionResult.payload;
        setStatus("error");
        setMessage(NoticeMessage);
        setTimeout(() => setStatus(null), 3000);
      }
    },
  });

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

        <View style={{ paddingBottom: 25 }}>
          <ReusableText
            text={t("email")}
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
        <ReusableInput
          label={t("email")}
          theme={{ colors: { primary: "black" } }}
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          touched={formik.touched.email}
          error={formik.errors.email}
        />
        <HeightSpacer height={25} />
        <ReusableButton
          btnText={t("update")}
          width={SIZES.width - 40}
          height={40}
          borderRadius={SIZES.small}
          backgroundColor={COLORS.orange}
          textColor={COLORS.white}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
          onPress={formik.handleSubmit}
        />
      </View>
      {status && <NoticeMessage status={status} message={message} />}
    </SafeAreaView>
  );
};

export default UserMail;
