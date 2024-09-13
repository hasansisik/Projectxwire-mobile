import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderColor: COLORS.lightGrey,
  },
  box: {
    height: 35,
    borderRadius: 30,
    paddingHorizontal: 10,
    gap: 10,
    backgroundColor: COLORS.lightInput,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  filterButton: {
    height: 30,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 7,
    borderColor: COLORS.lightBorder,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  headerBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    backgroundColor: COLORS.lightInput,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 30,
  },
  image2: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: COLORS.lightGrey,
  },
});

export default styles;
