import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS, TEXT } from "../../../constants/theme";
import ReusableText from "../../Reusable/ReusableText";
import { useTranslation } from "react-i18next";

const CategoryCard = ({ item, onPress }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <ReusableText
          text={item.projectName}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.black}
        />
        <View style={styles.row}>
          <View style={styles.details}>
            <ReusableText
              text={item.projectCode}
              family={"regular"}
              size={TEXT.xSmall}
              color={COLORS.description}
            />
          </View>
          <View style={styles.details}>
            <ReusableText
              text={t(item.projectCategory)}
              family={"regular"}
              size={TEXT.xSmall}
              color={COLORS.description}
            />
          </View>
          <View style={styles.details}>
            <ReusableText
              text={item.site.siteName}
              family={"regular"}
              size={TEXT.xSmall}
              color={COLORS.description}
            />
          </View>
          <View style={styles.details}>
            <ReusableText
              text={new Date(item.site.finishDate).toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
              family={"regular"}
              size={TEXT.xSmall}
              color={COLORS.description}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  row: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    flexDirection: "column",
    gap: 5,
    padding: 10,
    paddingBottom: 25,
    backgroundColor: COLORS.lightWhite,
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
  },
  details: {
    alignSelf: "flex-start",
    borderRadius: 15,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: COLORS.lightBlack,
  },
});