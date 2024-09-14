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
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 15,
    gap: 10,
    backgroundColor: COLORS.lightInput,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  box2: {
    borderRadius: 20,
    padding: 5,
    gap: 10,
    backgroundColor: COLORS.orange,
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
  category: {
    height: 40,
    paddingHorizontal: 5,
    borderRadius: 30,
    backgroundColor: COLORS.lightInput,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  projectBox: {
    height: 30,
    borderRadius: 30,
    flexDirection: "row",
    marginRight: 10,
    paddingHorizontal: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightWhite,
  },
});

export default styles;
