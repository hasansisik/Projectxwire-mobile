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
import NoticeMessage from "../../../components/Reusable/NoticeMessage";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { editProfile } from "../../../redux/actions/userActions";
import { passwordUpdateSchema } from "../../../utils/validation";
import { useTranslation } from "react-i18next";

const UserPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: passwordUpdateSchema,
    onSubmit: async (values) => {
      const actionResult = await dispatch(
        editProfile({ password: values.password })
      );
      if (editProfile.fulfilled.match(actionResult)) {
        setStatus("success");
        setMessage(t("passwordUpdateSuccessful"));
        setTimeout(() => {
          navigation.navigate("ProfileEdit");
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
            text={t("password")}
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
          label={t("password")}
          theme={{ colors: { primary: "black" } }}
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          touched={formik.touched.password}
          error={formik.errors.password}
        />
        <ReusableInput
          label={t("repeatPassword")}
          theme={{ colors: { primary: "black" } }}
          value={formik.values.confirmPassword}
          onChangeText={formik.handleChange("confirmPassword")}
          touched={formik.touched.confirmPassword}
          error={formik.errors.confirmPassword}
        />
        <HeightSpacer height={15} />
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

export default UserPassword;
