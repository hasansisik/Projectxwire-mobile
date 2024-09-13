import { FlatList, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import styles from "../../screens/Home/home.style";
import general from "../general.style";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ProjectCard from "../Tiles/Cards/ProjectCard";
import { useNavigation } from "@react-navigation/native";
import ModalProject from "../Modals/ModalProject";
import ReusableText from "../Reusable/ReusableText";
import { getProjects } from "../../redux/actions/projectActions";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendPushNotification } from "../../redux/actions/userActions.js";
import * as Notifications from "expo-notifications";

const Projects = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [filter, setFilter] = useState("all");
  const { user } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.projects);

  useEffect(() => {
    const fetchCompanyId = async () => {
      const storedCompanyId = await AsyncStorage.getItem("companyId");
      setCompanyId(storedCompanyId);
    };
    fetchCompanyId();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getProjects(companyId));
    }, [dispatch, companyId])
  );

  // Push notification
  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      if (!user.expoPushToken || user.expoPushToken !== token) {
        console.log(user.expoPushToken);
        dispatch(
          sendPushNotification({ userId: user._id, expoPushToken: token })
        );
      }
    };

    registerForPushNotificationsAsync();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }, [dispatch, user]);

  const filteredProjects = projects.filter((project) => {
    if (filter === "active") return project.status === true;
    if (filter === "inactive") return project.status === false;
    return true;
  });

  return (
    <View style={{ height :"100%" , paddingBottom:20}}>
      <View style={[general.row("space-between"), { paddingBottom: 25 }]}>
        <View style={general.row("space-between")}>
          <AntDesign name="appstore1" size={18} color="black" />
          <ReusableText
            text={"Projeler"}
            family={"medium"}
            size={TEXT.large}
            color={COLORS.black}
          />
        </View>
        <TouchableOpacity style={styles.box} onPress={() => setShowModal(true)}>
          <Ionicons name="add-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={general.row("space-between")}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor: filter === "all" ? COLORS.orange : COLORS.white,
            },
          ]}
          onPress={() => setFilter("all")}
        >
          <ReusableText
            text={"Hepsi (" + projects.length + ")"}
            family={"regular"}
            size={TEXT.xSmall}
            color={filter === "all" ? "white" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor:
                filter === "active" ? COLORS.orange : COLORS.white,
            },
          ]}
          onPress={() => setFilter("active")}
        >
          <ReusableText
            text={
              "Aktif Projeler (" +
              projects.filter((p) => p.status === true).length +
              ")"
            }
            family={"regular"}
            size={TEXT.xSmall}
            color={filter === "active" ? "white" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor:
                filter === "inactive" ? COLORS.orange : COLORS.white,
            },
          ]}
          onPress={() => setFilter("inactive")}
        >
          <ReusableText
            text={
              "Pasif Projeler (" +
              projects.filter((p) => p.status === false).length +
              ")"
            }
            family={"regular"}
            size={TEXT.xSmall}
            color={filter === "inactive" ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredProjects}
        vertical
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ gap: SIZES.medium, paddingBottom: 25 }}
        renderItem={({ item }) => (
          <ProjectCard
            item={item}
            onPress={() => navigation.navigate("BottomTabNavigation", item._id)}
          />
        )}
        style={{ flexGrow: 1 }}
      />
      {/* ModalProject */}
      <ModalProject
        showFilters={showModal}
        setShowFilters={setShowModal}
        onProjectCreated={() => dispatch(getProjects(companyId))}
      />
    </View>
  );
};

export default Projects;
