import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS, TEXT } from "../../../constants/theme";
import { storage } from "../../../config";
import { useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReusableText from "../../Reusable/ReusableText";

export default function ProjectLogoUpload({
  onUploadComplete,
  setUploadFunction,
}) {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("Galeriden Seçmek İçin Tıkla");
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setUploadFunction(() => () => uploadImage(image, user));
  }, [image, user, setUploadFunction]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Üzgünüz, galeri erişim izni gerekiyor!");
        }
      }
    })();
  }, []);

  const uploadImage = async (uri, user) => {
    if (!uri) {
      return null;
    }
    const response = await fetch(uri);
    const blob = await response.blob();
    const date = new Date();
    const formattedDate = date.toISOString().split(".")[0].replace("T", "-");
    const filename = `${user.name}-${formattedDate}.jpg`;
    const storageRef = ref(storage, `ProjectxwireProject/${filename}`);
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);
    onUploadComplete(url);
    return url;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (result && !result.canceled) {
      const uri = result.assets[0].uri;
      const name = result.assets[0].fileName || "Seçilen Görsel";
      setImage(uri);
      setImageName(name);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={pickImage}
        style={{
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 20,
          marginTop: 5,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FCFCFC",
          borderColor: COLORS.lightGrey,
          borderWidth: 1,
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ReusableText
            text={imageName}
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}