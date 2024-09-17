import { TouchableOpacity, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import styles from "../../screens/Home/home.style";
import { useTranslation } from "react-i18next";

const SitesCategory = ({ setFilter, sites }) => {
  const { t } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    const categoryCounts = sites.reduce((acc, site) => {
      acc[site.status ? "inProgress" : "completed"] = (acc[site.status ? "inProgress" : "completed"] || 0) + 1;
      return acc;
    }, {});

    if (!categoryCounts["completed"]) {
      categoryCounts["completed"] = 0;
    }

    const categoriesArray = Object.keys(categoryCounts).map((key, index) => ({
      id: index + 1,
      text: `${t(key)} (${categoryCounts[key]})`,
      filter: key.toLowerCase(),
    }));

    setCategories([
      { id: 0, text: `${t("all")} (${sites.length})`, filter: "all" },
      ...categoriesArray,
    ]);

    setSelectedCategory(0);
    setFilter("all");
  }, [sites, t]);

  const handleCategoryPress = (categoryId, filter) => {
    setSelectedCategory(categoryId);
    setFilter(filter);
  };

  return (
    <View style={styles.category}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleCategoryPress(category.id, category.filter)}
            style={[
              styles.projectBox,
              {
                backgroundColor:
                  selectedCategory === category.id
                    ? COLORS.lightWhite
                    : COLORS.lightInput,
              },
            ]}
          >
            <ReusableText
              text={category.text}
              family={"regular"}
              size={TEXT.xSmall}
              color={COLORS.black}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SitesCategory;