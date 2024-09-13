import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { COLORS, TEXT } from "../../../constants/theme";
import ReusableText from "../../Reusable/ReusableText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProjectCard = ({ item, onPress }) => {
  const backgroundColor = item.status ? COLORS.projectActive : COLORS.projectDeactive;

  const formatDate = (date) => {
    if (!date) return "Belirtilmedi";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("tr-TR", options);
  };

  const calculateRemainingTime = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;

    let remainingTime = '';
    if (years > 0) remainingTime += `${years} Yıl `;
    if (months > 0) remainingTime += `${months} Ay `;
    if (days > 0) remainingTime += `${days} Gün `;
    return remainingTime.trim() === '' ? 'Süre Doldu' : remainingTime;
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}></View>
          <View style={[styles.headerBottom, { backgroundColor }]}></View>
          <View style={[styles.headerTab, { backgroundColor }]}>
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
        <View style={[styles.content, { backgroundColor }]}>
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
                text={calculateRemainingTime(item.createdAt, item.finishDate)}
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
                  text={formatDate(item.createdAt)}
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
                  text={formatDate(item.finishDate)}
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

export default ProjectCard;

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
    left: "45%",
    width: "4%",
    height: "28%",
    borderTopRightRadius: 20,
  },
  headerTab: {
    width: "45%",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
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