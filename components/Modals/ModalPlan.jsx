import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
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

export default function ModalPlan({ showFilters, setShowFilters, projectId }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [planImage, setPlanImage] = useState(null);

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
        setMessage("Plan başarıyla oluşturuldu.");
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
      <View style={styles.modalView}>
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
          <AntDesign name="close" size={22} />
        </TouchableOpacity>
        <HeightSpacer height={25} />
        <View>
          <ReusableText
            text={"Plan Oluştur"}
            family={"medium"}
            size={TEXT.medium}
            color={COLORS.black}
          />
          <ReusableText
            text={"Plan oluşturmak için aşağıdaki alanları doldurunuz."}
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
        </View>
        <HeightSpacer height={15} />
        <View style={{ gap: 5 }}>
          <ReusableText
            text={"Plan İsmi :"}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label="Plan Adı"
            theme={{ colors: { primary: "black" } }}
            value={formik.values.planName}
            onChangeText={formik.handleChange("planName")}
            touched={formik.touched.planName}
            error={formik.errors.planName}
          />
        </View>
        <View style={{ gap: 5 }}>
          <ReusableText
            text={"Plan Kodu :"}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label="Plan Kodu"
            theme={{ colors: { primary: "black" } }}
            value={formik.values.planCode}
            onChangeText={formik.handleChange("planCode")}
            touched={formik.touched.planCode}
            error={formik.errors.planCode}
          />
        </View>
        <View style={{ gap: 5 }}>
          <ReusableText
            text={"Plan Kategorisi :"}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label="Plan Kategorisi"
            theme={{ colors: { primary: "black" } }}
            value={formik.values.planCategory}
            onChangeText={formik.handleChange("planCategory")}
            touched={formik.touched.planCategory}
            error={formik.errors.planCategory}
          />
        </View>
        <ReusableText
          text={"Plan Görselleri :"}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.black}
        />
        <PlanImageUpload onUpload={setPlanImage} />
        <ReusableButton
          btnText={"Plan Oluştur"}
          width={SIZES.width - 60}
          height={45}
          borderRadius={SIZES.small}
          backgroundColor={COLORS.orange}
          textColor={COLORS.white}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
          onPress={formik.handleSubmit}
        />
      </View>
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
