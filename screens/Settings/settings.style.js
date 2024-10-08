import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const settings = StyleSheet.create({
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    paddingVertical: 20,
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
  },
  bottom: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    paddingHorizontal: 10,
    bottom: 30,
    width: SIZES.width,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.lightInput,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    backgroundColor: COLORS.lightWhite,
  },
  dropdown: {
    width: 100,
    alignSelf: "flex-end", 
  },
});

export default settings;
