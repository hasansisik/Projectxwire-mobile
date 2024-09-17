import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View, Platform } from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import ReusableText from "../Reusable/ReusableText";
import HeightSpacer from "../Reusable/HeightSpacer";
import ReusableInput from "../Inputs/ReusableInput";
import ReusableButton from "../Buttons/ReusableButton";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { siteCreateSchema } from "../../utils/validation";
import NoticeMessage from "../Reusable/NoticeMessage";
import ProjectLogoUpload from "../Tiles/Upload/ProjectLogoUpload";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSite } from "../../redux/actions/siteActions";

export default function ModalSite({
  showFilters,
  setShowFilters,
  onProjectCreated,
}) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [uploadFunction, setUploadFunction] = useState(null);
  const [companyId, setCompanyId] = useState("");
  const [finishDate, setFinishDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchCompanyId = async () => {
      const storedCompanyId = await AsyncStorage.getItem("companyId");
      setCompanyId(storedCompanyId);
    };
    fetchCompanyId();
  }, []);

  const handleUploadComplete = (url) => {
    formik.setFieldValue("logo", url);
    formik.handleSubmit();
  };

  const formik = useFormik({
    initialValues: { siteName: "", siteCode: "", finishDate: new Date() },
    validationSchema: siteCreateSchema,
    onSubmit: async (values) => {
      const actionResult = await dispatch(
        createSite({
          siteName: values.siteName,
          siteCode: values.siteCode,
          logo: values.logo,
          companyId,
          finishDate: values.finishDate,
        })
      );
      if (createSite.fulfilled.match(actionResult)) {
        setStatus("success");
        setMessage("Şantiye başarıyla oluşturuldu.");
        onProjectCreated();
        setTimeout(() => {
          setShowFilters(false);
        }, 1500);
      } else if (createSite.rejected.match(actionResult)) {
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

  const handleSubmit = async () => {
    if (uploadFunction) {
      const url = await uploadFunction();
      if (!url) {
        formik.handleSubmit();
        return;
      }
    } else {
      formik.handleSubmit();
    }
  };

  const formatDate = (date) => {
    if (!date) return "Teslim Tarihi Seçin";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("tr-TR", options);
  };

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
        <HeightSpacer height={10} />
        <View>
          <ReusableText
            text={"Şantiye Oluştur"}
            family={"medium"}
            size={TEXT.medium}
            color={COLORS.black}
          />
          <ReusableText
            text={"Şantiye oluşturmak için aşağıdaki alanları doldurunuz."}
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
        </View>
        <HeightSpacer height={5} />
        <View style={{ gap: 5 }}>
          <ReusableText
            text={"Şantiye Adı:"}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label="Şantiye Adı"
            theme={{ colors: { primary: "black" } }}
            value={formik.values.siteName}
            onChangeText={formik.handleChange("siteName")}
            touched={formik.touched.siteName}
            error={formik.errors.siteName}
          />
        </View>
        <View style={{ gap: 5 }}>
          <ReusableText
            text={"Şantiye Kodu:"}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label="Şantiye Kodu"
            theme={{ colors: { primary: "black" } }}
            value={formik.values.siteCode}
            onChangeText={formik.handleChange("siteCode")}
            touched={formik.touched.siteCode}
            error={formik.errors.siteCode}
          />
        </View>
        <View style={{ gap: 5 }}>
          <ReusableText
            text={"Teslim Tarihi:"}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <TouchableOpacity
            style={styles.dateSelect}
            onPress={() => setShowDatePicker(true)}
          >
            <ReusableText
              text={formatDate(finishDate)}
              family={"regular"}
              size={TEXT.xSmall}
              color={COLORS.description}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={finishDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || finishDate;
                setShowDatePicker(Platform.OS === "ios");
                setFinishDate(currentDate);
                formik.setFieldValue("finishDate", currentDate);
              }}
            />
          )}
        </View>
        <HeightSpacer height={5} />
        <ReusableText
          text={"Şantiye Logo :"}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.black}
        />
        <ProjectLogoUpload
          onUploadComplete={handleUploadComplete}
          setUploadFunction={setUploadFunction}
        />
        <HeightSpacer height={10} />
        <ReusableButton
          btnText={"Şantiye Oluştur"}
          width={SIZES.width - 60}
          height={45}
          borderRadius={SIZES.small}
          backgroundColor={COLORS.orange}
          textColor={COLORS.white}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
          onPress={handleSubmit}
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
  dateSelect: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCFCFC",
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
  },
});
