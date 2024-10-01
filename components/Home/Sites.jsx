import { FlatList, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, TEXT } from "../../constants/theme.js";
import styles from "../../screens/Home/home.style.js";
import general from "../general.style.js";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import SiteCard from "../Tiles/Cards/SiteCard.jsx";
import { useNavigation } from "@react-navigation/native";
import ModalSite from "../Modals/ModalSite.jsx";
import ReusableText from "../Reusable/ReusableText.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSites } from "../../redux/actions/siteActions.js";
import SitesCategory from "./SitesCategory.jsx";
import { useTranslation } from "react-i18next";

const Sites = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [filteredSites, setFilteredSites] = useState([]);
  const [filter, setFilter] = useState("all");
  const { sites } = useSelector((state) => state.sites);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCompanyId = async () => {
      const storedCompanyId = await AsyncStorage.getItem("companyId");
      setCompanyId(storedCompanyId);
    };
    fetchCompanyId();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getSites(companyId));
    }, [dispatch, companyId])
  );

  useEffect(() => {
    if (filter === "all" || filter === t("all").toLowerCase()) {
      setFilteredSites(sites);
    } else if (filter === "inprogress" || filter === t("inProgress").toLowerCase()) {
      setFilteredSites(sites.filter((site) => site.status === true));
    } else if (filter === "completed" || filter === t("completed").toLowerCase()) {
      setFilteredSites(sites.filter((site) => site.status === false));
    }
  }, [filter, sites, t]);

  return (
    <View style={{ height: "100%", paddingBottom: 20 }}>
      <View style={[general.row("space-between"), { paddingBottom: 25 }]}>
        <View style={general.row("space-between")}>
          <AntDesign name="appstore1" size={18} color="black" />
          <ReusableText
            text={t("sites")}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.lightBlack}
          />
        </View>
        <TouchableOpacity
          style={styles.box2}
          onPress={() => setShowModal(true)}
        >
          <Ionicons name="add-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View style={[general.row("space-between"), { paddingBottom: 10 }]}>
        <SitesCategory setFilter={setFilter} sites={sites} />
      </View>
      <FlatList
        data={filteredSites}
        vertical
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ gap: SIZES.medium, paddingBottom: 25 }}
        renderItem={({ item }) => (
          <SiteCard
            item={item}
            onPress={() => navigation.navigate("Projects", item._id)}
          />
        )}
        style={{ flexGrow: 1 }}
      />
      {/* ModalSite */}
      <ModalSite
        showFilters={showModal}
        setShowFilters={setShowModal}
        onProjectCreated={() => dispatch(getSites(companyId))}
      />
    </View>
  );
};

export default Sites;