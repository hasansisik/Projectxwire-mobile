import React from "react";
import { StyleSheet, Text, View, TouchableOpacity ,Image} from "react-native";
import { COLORS, TEXT } from "../../../constants/theme";
import ReusableText from "../../Reusable/ReusableText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FolderCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}></View>
          <View style={styles.headerBottom}></View>
          <View style={styles.headerTab}>
            <View style={styles.circle}>
              <MaterialCommunityIcons
                name="information-variant"
                size={20}
                color={COLORS.white}
              />
              <ReusableText
                text={item.projectCode}
                family={"medium"}
                size={TEXT.xxSmall}
                color={COLORS.white}
              />
            </View>
          </View>
          <View style={styles.headerTab2}>
            <ReusableText
              text={item.projectName}
              family={"medium"}
              size={TEXT.xxSmall}
              color={COLORS.lightBlack}
            />
          </View>
        </View>
        {/* İçerik kısmı */}
        <View style={styles.content}>
          <Image
            source={{ uri: item.logo }}
            resizeMode="contain"
            style={styles.image}
          />
          <View style={styles.row}>
            <View>
              <ReusableText
                text={"Kalan Süre"}
                family={"regular"}
                size={TEXT.xxSmall}
                color={COLORS.white}
              />
              <ReusableText
                text={"10.10.2024"}
                family={"regular"}
                size={TEXT.xxSmall}
                color={COLORS.white}
              />
            </View>
            <View style={styles.separator} />
            <View>
              <ReusableText
                text={"Başlangıç T."}
                family={"regular"}
                size={TEXT.xxSmall}
                color={COLORS.white}
              />
              <View style={styles.row}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={18}
                  color={COLORS.white}
                />
                <ReusableText
                  text={"10.10.2024"}
                  family={"regular"}
                  size={TEXT.xxSmall}
                  color={COLORS.white}
                />
              </View>
            </View>
            <View style={styles.separator} />
            <View>
              <ReusableText
                text={"Teslim T."}
                family={"regular"}
                size={TEXT.xxSmall}
                color={COLORS.white}
              />
              <View style={styles.row}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={18}
                  color={COLORS.white}
                />
                <ReusableText
                  text={"10.10.2024"}
                  family={"regular"}
                  size={TEXT.xxSmall}
                  color={COLORS.white}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FolderCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 20,
  },
  header: {
    width: "100%",
    height: 40,
    flexDirection: "row",
  },
  headerTop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "50%",
    backgroundColor: COLORS.nagivationPrimary,
  },
  headerBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "50%",
    backgroundColor: COLORS.projectActive,
  },
  headerTab: {
    width: "45%",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: COLORS.projectActive,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  headerTab2: {
    width: "55%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: COLORS.nagivationPrimary,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  content: {
    flex: 1,
    padding: 15,
    flexDirection: "row",
    backgroundColor: COLORS.projectActive,
  },
  row: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    flexDirection: "row",
    width: 100,
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: COLORS.white,
  },
  separator: {
    width: 0.5,
    height: "75%",
    backgroundColor: COLORS.white,
    marginHorizontal: 5,
  },
});
