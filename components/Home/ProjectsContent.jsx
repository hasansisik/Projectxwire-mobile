import { FlatList, View } from "react-native";
import React from "react";
import { COLORS } from "../../constants/theme";
import general from "../general.style";
import { useNavigation } from "@react-navigation/native";
import CategoryCard from "../Tiles/Cards/CategoryCard";
import { useSelector } from "react-redux";

const ProjectsContent = ({ filter }) => {
  const navigation = useNavigation();
  const { projects } = useSelector((state) => state.projects);

  const filteredProjects = projects.filter((project) => {
    if (filter === "Hepsi") return true;
    return project.projectCategory === filter;
  });

  return (
    <View
      style={[
        general.row("space-between"),
        {
          marginTop: 25,
          paddingVertical: 2,
          alignItems: "center",
          backgroundColor: COLORS.lightInput,
        },
      ]}
    >
      <FlatList
        data={filteredProjects}
        vertical
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ gap: 2 }}
        renderItem={({ item }) => (
          <CategoryCard
            item={item}
            onPress={() => navigation.navigate("BottomTabNavigation", item._id)}
          />
        )}
        style={{ flexGrow: 1 }}
      />
    </View>
  );
};

export default ProjectsContent;
