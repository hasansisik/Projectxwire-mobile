import { Image, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import styles from "../../screens/Home/home.style";
import general from "../general.style";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ModalProject from "../Modals/ModalProject";
import { getProjects } from "../../redux/actions/projectActions";
import { useDispatch } from "react-redux";

const ProjectsHeader = ({ user, siteId, companyId }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  return (
    <View
      style={[
        general.row("space-between"),
        { paddingBottom: 20, marginTop: 20, alignItems: "center" },
      ]}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        style={styles.headerBox}
      >
        <Image
          source={{
            uri: user?.picture
              ? user?.picture
              : "https://firebasestorage.googleapis.com/v0/b/projectxwire-e951a.appspot.com/o/user.png?alt=media&token=1beeeb68-a4c5-4a9c-b0e1-b3bd437a37fc",
          }}
          style={styles.image2}
        />
        <ReusableText
          text={user?.name ? `${user?.name}` : "Misafir"}
          family={"regular"}
          size={TEXT.xSmall}
          color={COLORS.black}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.box2} onPress={() => setShowModal(true)}>
        <Ionicons name="add-outline" size={20} color={COLORS.white}/>
      </TouchableOpacity>
      {/* ModalProject */}
      <ModalProject
        showFilters={showModal}
        setShowFilters={setShowModal}
        siteId={siteId}
        onProjectCreated={() => dispatch(getProjects({ companyId, siteId }))}
      />
    </View>
  );
};

export default ProjectsHeader;
