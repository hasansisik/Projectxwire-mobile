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
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { createTask } from "../../redux/actions/taskActions";
import { Dropdown } from "react-native-element-dropdown";
import { getAllUsers } from "../../redux/actions/userActions";
import NoticeMessage from "../Reusable/NoticeMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

export default function ModalTaskPlan({
  showFilters,
  setShowFilters,
  projectId,
  onTaskCreated,
  planId,
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const { users } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUsers = async () => {
      const companyId = await AsyncStorage.getItem("companyId");
      if (companyId) {
        dispatch(getAllUsers(companyId));
      }
    };
    fetchUsers();
  }, [dispatch]);

  const dropdownUser = users.map((person) => ({
    userId: person._id,
    userName: person.name,
  }));

  const formik = useFormik({
    initialValues: { taskCategory: "", taskTitle: "", taskDesc: "" },
    onSubmit: async (values) => {
      const taskData = {
        taskTitle: values.taskTitle,
        taskCategory: values.taskCategory,
        taskDesc: values.taskDesc,
        persons: selectedUserId,
        plan: planId,
        taskCreator: user._id,
      };
      const actionResult = await dispatch(
        createTask({
          projectId,
          ...taskData,
        })
      );
      if (createTask.fulfilled.match(actionResult)) {
        setStatus("success");
        setMessage(t("pinCreatedSuccessfully"));
        const taskId = actionResult.payload._id;
        setTaskId(taskId);
        onTaskCreated && onTaskCreated(taskId);
        setTimeout(() => {
          setShowFilters(false);
          navigation.navigate("TaskDetails", {
            item: actionResult.payload,
          });
        }, 1500);
      } else if (createTask.rejected.match(actionResult)) {
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
        <HeightSpacer height={15} />
        <View>
          <ReusableText
            text={t("createPin")}
            family={"medium"}
            size={TEXT.medium}
            color={COLORS.black}
          />
          <ReusableText
            text={t("createPinPrompt")}
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
        </View>
        {/* Task Topic Input */}
        <HeightSpacer height={15} />
        <View style={{ gap: 5 }}>
          <ReusableText
            text={t("taskSubject")}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label={t("taskSubject")}
            theme={{ colors: { primary: "black" } }}
            value={formik.values.taskDesc}
            onChangeText={formik.handleChange("taskDesc")}
            touched={formik.touched.taskDesc}
            error={formik.errors.taskDesc}
          />
        </View>
        {/* Task Category Input */}
        <View style={{ gap: 5 }}>
          <ReusableText
            text={t("taskCategory")}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label={t("taskCategory")}
            theme={{ colors: { primary: "black" } }}
            value={formik.values.taskCategory}
            onChangeText={formik.handleChange("taskCategory")}
            touched={formik.touched.taskCategory}
            error={formik.errors.taskCategory}
          />
        </View>
        {/* Task Title Input */}
        <View style={{ gap: 5 }}>
          <ReusableText
            text={t("taskTitle")}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label={t("taskTitle")}
            theme={{ colors: { primary: "black" } }}
            value={formik.values.taskTitle}
            onChangeText={formik.handleChange("taskTitle")}
            touched={formik.touched.taskTitle}
            error={formik.errors.taskTitle}
          />
        </View>
        {/* User Selected */}
        <HeightSpacer height={10} />
        <View style={{ gap: 5 }}>
          <ReusableText
            text={t("selectPerson")}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View
            style={{
              borderBottomColor: "#E5E5E5",
              borderBottomWidth: 1,
              paddingVertical: 5,
            }}
          >
            <Dropdown
              data={dropdownUser}
              labelField="userName"
              valueField="userId"
              value={selectedUserId}
              onChange={(item) => {
                setSelectedUserId(item.userId);
              }}
              placeholder={t("selectPerson")}
            />
          </View>
        </View>
        <HeightSpacer height={25} />
        <ReusableButton
          btnText={t("createPin")}
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
