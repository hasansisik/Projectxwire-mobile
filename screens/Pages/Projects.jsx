import { View, Text, StatusBar, SafeAreaView, Platform } from 'react-native'
import general from "../../components/general.style.js";
import React from 'react'
import { COLORS } from '../../constants/theme.js';
import { useSelector } from 'react-redux';
import ProjectsHeader from '../../components/Home/ProjectsHeader.jsx';

const Projects = () => {
    const { user } = useSelector((state) => state.user);
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
             paddingTop:
               Platform.OS === "android" ? StatusBar.currentHeight : 0,
           },
         ]}
       >
         <ProjectsHeader user={user} />
       </View>
     </SafeAreaView>
   );
}

export default Projects