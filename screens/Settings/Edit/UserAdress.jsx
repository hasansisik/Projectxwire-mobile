import { View, SafeAreaView, Platform, StatusBar, KeyboardAvoidingView } from "react-native";
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
import { addressUpdateSchema } from "../../../utils/validation";
import { useTranslation } from "react-i18next";

const UserAdress = ({ navigation }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      province: "",
      city: "",
      street: "",
      avenue: "",
      no: "",
    },
    validationSchema: addressUpdateSchema,
    onSubmit: async (values) => {
      const address = `${values.street} ${values.avenue} No:${values.no},${values.city}/${values.province}`;
      const actionResult = await dispatch(editProfile({ address }));
      if (editProfile.fulfilled.match(actionResult)) {
        setStatus("success");
        setMessage(t("addressUpdateSuccessful"));
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
              text={t("address")}
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
            label={t("city")}
            theme={{ colors: { primary: "black" } }}
            value={formik.values.province}
            onChangeText={formik.handleChange("province")}
            touched={formik.touched.province}
            error={formik.errors.province}
          />
          <ReusableInput
            label={t("district")}
            theme={{ colors: { primary: "black" } }}
            value={formik.values.city}
            onChangeText={formik.handleChange("city")}
            touched={formik.touched.city}
            error={formik.errors.city}
          />
          <ReusableInput
            label={t("neighborhood")}
            theme={{ colors: { primary: "black" } }}
            value={formik.values.street}
            onChangeText={formik.handleChange("street")}
            touched={formik.touched.street}
            error={formik.errors.street}
          />
          <ReusableInput
            label={t("street")}
            theme={{ colors: { primary: "black" } }}
            value={formik.values.avenue}
            onChangeText={formik.handleChange("avenue")}
            touched={formik.touched.avenue}
            error={formik.errors.avenue}
          />
          <ReusableInput
            label={t("no")}
            theme={{ colors: { primary: "black" } }}
            value={formik.values.no}
            onChangeText={formik.handleChange("no")}
            touched={formik.touched.no}
            error={formik.errors.no}
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
    </KeyboardAvoidingView>
  );
};

export default UserAdress;
