import { Image, TouchableOpacity, View, ScrollView } from "react-native";
import React from "react";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import styles from "../../screens/Home/home.style";
import general from "../general.style";
import { useNavigation } from "@react-navigation/native";

const ProjectsCategory = ({ user }) => {
  const navigation = useNavigation();

  const categories = [
    { id: 1, text: "Hepsi (40)" },
    { id: 2, text: "Mimari (10)" },
    { id: 3, text: "Statik (10)" },
    { id: 4, text: "Elektirik (10)" },
    { id: 5, text: "Peyzaj (10)" },
  ];

  return (
    <View style={styles.category}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => navigation.navigate("Profile")}
            style={styles.projectBox}
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