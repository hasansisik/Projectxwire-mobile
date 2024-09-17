import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import styles from "../../screens/Home/home.style";
import general from "../general.style";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const WelcomeHeader = ({ user }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View
      style={[
        general.row("space-between"),
        { paddingBottom: 20, marginTop: 10, alignItems: "center" },
      ]}
    >
      <ReusableText
        text={
          user?.name ? `${t("hello")}, ${user?.name} 👋` : `${t("welcome")} 👋`
        }
        family={"medium"}
        size={TEXT.medium}
        color={COLORS.black}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Image
          source={{
            uri: user?.picture
              ? user?.picture
              : "https://firebasestorage.googleapis.com/v0/b/projectxwire-e951a.appspot.com/o/user.png?alt=media&token=1beeeb68-a4c5-4a9c-b0e1-b3bd437a37fc",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeHeader;
