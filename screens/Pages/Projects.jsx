import { View, Text, StatusBar, SafeAreaView, Platform } from "react-native";
import general from "../../components/general.style.js";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../constants/theme.js";
import { useSelector } from "react-redux";
import ProjectsHeader from "../../components/Home/ProjectsHeader.jsx";
import ProjectsCategory from "../../components/Home/ProjectsCategory.jsx";
import ProjectsContent from "../../components/Home/ProjectsContent.jsx";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Projects = () => {
  const { user } = useSelector((state) => state.user);
  const route = useRoute();
  const siteId = route.params;
  const [companyId, setCompanyId] = useState("");
  
  useEffect(() => {
    const fetchCompanyId = async () => {
      const storedCompanyId = await AsyncStorage.getItem("companyId");
      setCompanyId(storedCompanyId);
    };
    fetchCompanyId();
  }, []);
  
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
        <ProjectsCategory />
        <ProjectsContent siteId={siteId} companyId={companyId} />
      </View>
    </SafeAreaView>
  );
};

export default Projects;
