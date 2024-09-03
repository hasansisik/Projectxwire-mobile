import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import styles from "../../screens/Home/home.style";
import general from "../general.style";
import { useNavigation } from "@react-navigation/native";

const WelcomeHeader = ({ user }) => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        general.row("space-between"),
        { paddingBottom: 20, marginTop: 10, alignItems: "center" },
      ]}
    >
      <ReusableText
        text={user?.name ? `Merhaba ${user?.name} 👋` : "Hoşgeldiniz 👋"}
        family={"medium"}
        size={TEXT.large}
        color={COLORS.black}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Image
          source={{
            uri: user?.picture
              ? user?.picture
              : "https://firebasestorage.googleapis.com/v0/b/planwire-9e539.appspot.com/o/user.png?alt=media&token=dfe0ede5-7467-4e65-8752-1da262d7356b",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeHeader;
