import { TouchableOpacity, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import styles from "../../screens/Home/home.style";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ProjectsCategory = ({ setFilter }) => {
  const { projects } = useSelector((state) => state.projects);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");
  const { t } = useTranslation();

  useEffect(() => {
    const predefinedCategories = [
      { id: 0, text: `${t("all")} (${projects.length})`, filter: "Hepsi" },
      {
        id: 1,
        text: `${t("architecture")} (${projects.filter((p) => p.projectCategory === "architecture").length})`,
        filter: "architecture",
      },
      {
        id: 2,
        text: `${t("electrical")} (${projects.filter((p) => p.projectCategory === "electrical").length})`,
        filter: "electrical",
      },
      {
        id: 3,
        text: `${t("statics")} (${projects.filter((p) => p.projectCategory === "statics").length})`,
        filter: "statics",
      },
      {
        id: 4,
        text: `${t("landscape")} (${projects.filter((p) => p.projectCategory === "landscape").length})`,
        filter: "landscape",
      },
      {
        id: 5,
        text: `${t("mechanical")} (${projects.filter((p) => p.projectCategory === "mechanical").length})`,
        filter: "mechanical",
      },
      {
        id: 6,
        text: `${t("infrastructure")} (${projects.filter((p) => p.projectCategory === "infrastructure").length})`,
        filter: "infrastructure",
      },
    ];

    const additionalCategories = projects
      .map((project) => project.projectCategory)
      .filter(
        (category, index, self) =>
          !predefinedCategories.some((predefined) => predefined.filter === category) &&
          self.indexOf(category) === index 
      )
      .map((category, index) => ({
        id: predefinedCategories.length + index,
        text: `${t(category)} (${projects.filter((p) => p.projectCategory === category).length})`,
        filter: category,
      }));

    setCategories([...predefinedCategories, ...additionalCategories]);
  }, [projects, t]);

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

export default ProjectsCategory;