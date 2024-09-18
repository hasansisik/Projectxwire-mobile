import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import {
  HeightSpacer,
  ReusableButton,
  ReusableInput,
  ReusableText,
} from "../index";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { planCreateSchema } from "../../utils/validation";
import { createPlan } from "../../redux/actions/planActions";
import PlanImageUpload from "../Tiles/Upload/PlanImageUpload";
import NoticeMessage from "../Reusable/NoticeMessage";
import { useTranslation } from "react-i18next";

export default function ModalPlan({ showFilters, setShowFilters, projectId }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [planImage, setPlanImage] = useState(null);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { planName: "", planCode: "", planCategory: "" },
    validationSchema: planCreateSchema,
    onSubmit: async (values) => {
      const actionResult = await dispatch(
        createPlan({
          projectId,
          planName: values.planName,
          planCode: values.planCode,
          planCategory: values.planCategory,
          planImages: planImage,
        })
      );
      if (createPlan.fulfilled.match(actionResult)) {
        setStatus("success");
        setMessage(t("planCreatedSuccessfully"));
        setTimeout(() => {
          setShowFilters(false);
        }, 1500);
      } else if (createPlan.rejected.match(actionResult)) {
        const errorMessage = actionResult.payload;
        setStatus("error");
        setMessage(errorMessage);
        setTimeout(() => setStatus(null), 2000);
      }
    },
  });

  useEffect(() => {
    if (!showFilters) {
      setStatus(null);
      formik.resetForm();
    }
  }, [showFilters]);

  return (
    <Modal
      isVisible={showFilters}
      onSwipeComplete={() => setShowFilters(false)}
      swipeDirection="down"
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <KeyboardAvoidingView
        style={styles.modalView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
          <AntDesign name="close" size={22} />
        </TouchableOpacity>
        <HeightSpacer height={25} />
        <View>
          <ReusableText
            text={t("createPlan")}
            family={"medium"}
            size={TEXT.medium}
            color={COLORS.black}
          />
          <ReusableText
            text={t("createPlanPrompt")}
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
        </View>
        <HeightSpacer height={15} />
        <View style={{ gap: 5 }}>
          <ReusableText
            text={t("planName")}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label={t("planName")}
            theme={{ colors: { primary: "black" } }}
            value={formik.values.planName}
            onChangeText={formik.handleChange("planName")}
            touched={formik.touched.planName}
            error={formik.errors.planName}
          />
        </View>
        <View style={{ gap: 5 }}>
          <ReusableText
            text={t("planCode")}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label={t("planCode")}
            theme={{ colors: { primary: "black" } }}
            value={formik.values.planCode}
            onChangeText={formik.handleChange("planCode")}
            touched={formik.touched.planCode}
            error={formik.errors.planCode}
          />
        </View>
        <View style={{ gap: 5 }}>
          <ReusableText
            text={t("planCategory")}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label={t("planCategory")}
            theme={{ colors: { primary: "black" } }}
            value={formik.values.planCategory}
            onChangeText={formik.handleChange("planCategory")}
            touched={formik.touched.planCategory}
            error={formik.errors.planCategory}
          />
        </View>
        <ReusableText
          text={t("planImages")}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.black}
        />
        <PlanImageUpload onUpload={setPlanImage} />
        <ReusableButton
          btnText={t("createPlan")}
          width={SIZES.width - 60}
          height={45}
          borderRadius={SIZES.small}
          backgroundColor={COLORS.orange}
          textColor={COLORS.white}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
          onPress={formik.handleSubmit}
        />
        {Platform.OS === "ios" && <HeightSpacer height={25} />}
      </KeyboardAvoidingView>
      {status && <NoticeMessage status={status} message={message} />}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 30,
    paddingBottom: 20,
  },
});
