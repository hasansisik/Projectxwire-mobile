import {
  View,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "./auth.style";
import general from "../../components/general.style";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { HeightSpacer, ReusableText, ReusableButton } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Auth = ({ navigation }) => {
    const CompanyLogin = async () => {
      await AsyncStorage.removeItem("companyId");
      navigation.navigate("CompanyLoginAgain");
    };
  return (
    <SafeAreaView
      style={[
        general.container,
        { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
      ]}
    >
      <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/projectxwire-e951a.appspot.com/o/welcomeAuth.png?alt=media&token=05390942-e8a0-49f4-977b-62707ba6da84",
        }}
        style={{
          width: Dimensions.get("window").width - 40,
          height: Dimensions.get("window").height / 1.8,
          marginBottom: 25,
          alignContent: "center",
          margin: 20,
        }}
        resizeMode="contain"
      />
      <View style={styles.context}>
        <ReusableText
          text={"Hoşgeldiniz"}
          family={"bold"}
          size={TEXT.xLarge}
          color={COLORS.black}
        />
        <HeightSpacer height={15} />
        <ReusableText
          text={
            "Projectxwire denemek veya kullanmak için kayıt ol veya giriş yapmayı dene"
          }
          family={"regular"}
          size={TEXT.medium}
          color={COLORS.description}
          align={"center"}
        />
      </View>
      <View style={styles.context}>
        <ReusableButton
          btnText={"Giriş Yap"}
          width={SIZES.width - 40}
          height={45}
          borderRadius={SIZES.small}
          backgroundColor={COLORS.orange}
          textColor={COLORS.white}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
          onPress={() => navigation.navigate("Login")}
        />
        <HeightSpacer height={20} />
        <ReusableButton
          btnText={"Kayıt Ol"}
          width={SIZES.width - 40}
          height={45}
          borderRadius={SIZES.small}
          textColor={COLORS.black}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
          onPress={() => navigation.navigate("Register")}
        />
        <HeightSpacer height={35} />

        <TouchableOpacity onPress={CompanyLogin}>
          <ReusableText
            text={"Şirket Girişi Sayfası"}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.description}
            underline={true}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Auth;
