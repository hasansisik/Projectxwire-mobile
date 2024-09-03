import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, SIZES, TEXT } from "../../../constants/theme";
import ReusableText from "../../Reusable/ReusableText";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const PinCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri: item?.task?.taskCreator?.picture
            ? item?.task?.taskCreator?.picture
            : "https://firebasestorage.googleapis.com/v0/b/planwire-9e539.appspot.com/o/user.png?alt=media&token=dfe0ede5-7467-4e65-8752-1da262d7356b",
        }}
        style={styles.icon}
      />
      <ReusableText
        text={truncateText(item.task.taskTitle, 10)}
        family={"regular"}
        size={TEXT.small}
        color={COLORS.black}
      />
    </TouchableOpacity>
  );
};

export default PinCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.radius,
    gap: 8,
  },
  icon: {
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E7E7E7",
    borderWidth: 1,
  },
});
