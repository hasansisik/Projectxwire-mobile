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
 
});

export default styles;
