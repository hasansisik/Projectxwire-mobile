import { View, Text, StatusBar, SafeAreaView, Platform } from "react-native";
import general from "../../components/general.style.js";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../constants/theme.js";
import { useDispatch, useSelector } from "react-redux";
import ProjectsHeader from "../../components/Home/ProjectsHeader.jsx";
import ProjectsCategory from "../../components/Home/ProjectsCategory.jsx";
import ProjectsContent from "../../components/Home/ProjectsContent.jsx";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearProjects, getProjects } from "../../redux/actions/projectActions.js";

const Projects = () => {
  const route = useRoute();
  const siteId = route.params;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [companyId, setCompanyId] = useState("");
  const [filter, setFilter] = useState("Hepsi");

  useEffect(() => {
    const fetchCompanyId = async () => {
      const storedCompanyId = await AsyncStorage.getItem("companyId");
      setCompanyId(storedCompanyId);
    };
    fetchCompanyId();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (companyId && siteId) {
        dispatch(getProjects({ companyId, siteId }));
      }
    }, [dispatch, companyId, siteId])
  );

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: COLORS.lightWhite }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.lightWhite}
        translucent={true}
      />
      <View
        style={[
          general.page,
          {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
        ]}
      >
        <ProjectsHeader user={user} siteId={siteId} companyId={companyId} />
        <ProjectsCategory setFilter={setFilter} />
        <ProjectsContent filter={filter} />
      </View>
    </SafeAreaView>
  );
};

export default Projects;
