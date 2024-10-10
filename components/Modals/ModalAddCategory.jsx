import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import ReusableButton from "../Buttons/ReusableButton";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { useTranslation } from "react-i18next";

const ModalAddCategory = ({ isVisible, onClose, onAddCategory }) => {
  const [categoryName, setCategoryName] = useState("");
  const { t } = useTranslation();

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      onAddCategory(categoryName.trim());
      setCategoryName("");
      onClose();
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      coverScreen={true}
      backdropOpacity={0.7}
      style={styles.modal}
    >
      <View style={styles.modalView}>
        <TextInput
          style={styles.input}
          placeholder={t("enterCategoryName")}
          value={categoryName}
          onChangeText={setCategoryName}
        />
        <ReusableButton
          btnText={t("addCategory")}
          width={SIZES.width - 60}
          height={45}
          borderRadius={SIZES.small}
          backgroundColor={COLORS.orange}
          textColor={COLORS.white}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
          onPress={handleAddCategory}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "90%",
  },
  input: {
    width: "100%",
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
});

export default ModalAddCategory;