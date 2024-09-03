import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React from "react";
import reusable from "./reusable.style";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import ReusableText from "./ReusableText";
import { COLORS, TEXT } from "../../constants/theme";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const AppBar = ({
  color,
  title,
  color1,
  icon,
  onPress,
  onPress1,
  top,
  left,
  right,
  text1,
  onDeletePress,
  showDeleteIcon,
  onCloseDeleteIcon,
}) => {
  return (
    <View style={styles.overlay(top, left, right, showDeleteIcon)}>
      <View style={reusable.rowWithSpace("space-between")}>
        <TouchableOpacity
          style={styles.box(showDeleteIcon ? COLORS.red : color)}
          onPress={showDeleteIcon ? onCloseDeleteIcon : onPress}
        >
          <AntDesign
            name={showDeleteIcon ? "back" : "arrowleft"}
            size={25}
            color={showDeleteIcon ? COLORS.white : COLORS.black}
          />
        </TouchableOpacity>

        {!showDeleteIcon && (
          <ReusableText
            text={truncateText(title, 30)}
            family={"medium"}
            size={TEXT.large}
            color={showDeleteIcon ? COLORS.white : COLORS.black}
          />
        )}

        <View style={styles.rightContainer}>
          {!showDeleteIcon && (
            <TouchableOpacity style={styles.box1(color1)} onPress={onPress1}>
              <AntDesign name={icon} size={25} />
              <Text>{text1}</Text>
            </TouchableOpacity>
          )}
          {showDeleteIcon && (
            <TouchableOpacity style={styles.deleteIcon} onPress={onDeletePress}>
              <MaterialIcons name="delete" size={24} color={COLORS.white} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  overlay: (top, left, right, showDeleteIcon) => ({
    position: "absolute",
    top: top,
    left: left,
    right: right,
    justifyContent: "center",
    backgroundColor: showDeleteIcon ? COLORS.red : "transparent",
  }),
  box: (color) => ({
    backgroundColor: color,
    width: 35,
    height: 35,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  }),
  box1: (color1) => ({
    backgroundColor: color1,
    width: 35,
    height: 35,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  }),
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteIcon: {
    marginLeft: 10,
  },
});
