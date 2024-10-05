import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  header: {
    width: SIZES.width,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    width: 65,
    height: 65,
    borderRadius: 35,
  },
  profile: {
    gap: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  settingsBox: {
    backgroundColor: COLORS.lightInput,
    borderRadius: 10,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
  },
  settingsBoxDelete: {
    backgroundColor: COLORS.red,
    borderRadius: 10,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
  },
  editIcon: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: COLORS.nagivationPrimary,
    borderRadius: 15,
    padding: 5,
  },
});

export default styles;
