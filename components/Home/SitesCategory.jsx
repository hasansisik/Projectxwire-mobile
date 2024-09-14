import { TouchableOpacity, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import styles from "../../screens/Home/home.style";

const SitesCategory = ({ setFilter, sites }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");

  useEffect(() => {
    const categoryCounts = sites.reduce((acc, site) => {
      acc[site.status ? "Aktif" : "Pasif"] = (acc[site.status ? "Aktif" : "Pasif"] || 0) + 1;
      return acc;
    }, {});

    if (!categoryCounts["Pasif"]) {
      categoryCounts["Pasif"] = 0;
    }

    const categoriesArray = Object.keys(categoryCounts).map((key, index) => ({
      id: index + 1,
      text: `${key} Şantiyeler (${categoryCounts[key]})`,
    }));

    setCategories([
      { id: 0, text: `Hepsi (${sites.length})` },
      ...categoriesArray,
    ]);

    setSelectedCategory("Hepsi");
    setFilter("hepsi");
  }, [sites]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setFilter(category.split(" ")[0].toLowerCase());
  };

  return (
    <View style={styles.category}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleCategoryPress(category.text)}
            style={[
              styles.projectBox,
              {
                backgroundColor:
                  selectedCategory === category.text || (selectedCategory === "Hepsi" && category.text.startsWith("Hepsi"))
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