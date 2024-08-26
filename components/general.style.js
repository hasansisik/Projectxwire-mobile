import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.lightWhite,
  },
  page: {
    flex: 1,
    padding: 20,
    paddingBottom: 110,
    backgroundColor: COLORS.lightWhite,
  },
  row: (justifyContent, alignItems = "center") => ({
    flexDirection: "row",
    alignItems: alignItems,
    gap: 10,
    justifyContent: justifyContent,
  }),
  column: (justifyContent) => ({
    gap: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: justifyContent,
  }),
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
  },
  splashImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default styles;
