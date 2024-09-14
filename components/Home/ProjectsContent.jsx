import { FlatList, View } from "react-native";
import React, {  useState } from "react";
import { COLORS } from "../../constants/theme";
import general from "../general.style";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CategoryCard from "../Tiles/Cards/CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../redux/actions/projectActions";

const ProjectsContent = ({ siteId,companyId }) => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const [filter, setFilter] = useState("all");

  const filteredProjects = projects.filter((project) => {
    if (filter === "active") return project.status === true;
    if (filter === "inactive") return project.status === false;
    return true;
  });

  const navigation = useNavigation();

   useFocusEffect(
     React.useCallback(() => {
       if (companyId && siteId) {
         dispatch(getProjects({ companyId, siteId }));
       }
     }, [dispatch, companyId, siteId])
   );

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
