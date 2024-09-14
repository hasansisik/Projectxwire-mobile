import { TouchableOpacity, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import styles from "../../screens/Home/home.style";
import { useSelector } from "react-redux";

const ProjectsCategory = ({ setFilter }) => {
  const { projects } = useSelector((state) => state.projects);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");

  useEffect(() => {
    const categoryCounts = projects.reduce((acc, project) => {
      acc[project.projectCategory] = (acc[project.projectCategory] || 0) + 1;
      return acc;
    }, {});

    const categoriesArray = Object.keys(categoryCounts).map((key, index) => ({
      id: index + 1,
      text: `${key} (${categoryCounts[key]})`,
    }));

    setCategories([
      { id: 0, text: `Hepsi (${projects.length})` },
      ...categoriesArray,
    ]);
  }, [projects]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setFilter(category.split(" ")[0]);
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
                  selectedCategory === category.text
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
