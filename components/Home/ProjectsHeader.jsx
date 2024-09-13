import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import styles from "../../screens/Home/home.style";
import general from "../general.style";
import { useNavigation } from "@react-navigation/native";

const ProjectsHeader = ({ user }) => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        general.row("space-between"),
        { paddingBottom: 20, marginTop: 10, alignItems: "center" },
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
    </View>
  );
};

export default ProjectsHeader;
