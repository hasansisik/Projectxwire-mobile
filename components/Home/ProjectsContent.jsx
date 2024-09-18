import { FlatList, View } from "react-native";
import React from "react";
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
          marginTop: 20,
          paddingVertical: 2,
          alignItems: "center",
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
      />
    </View>
  );
};

export default ProjectsContent;
