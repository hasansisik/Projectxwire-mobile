import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Platform, Modal, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS, SIZES, TEXT } from "../../../constants/theme";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import Svg, { Polyline } from "react-native-svg";
import ReusableText from "../../Reusable/ReusableText";
import ViewShot from "react-native-view-shot";
import { useTranslation } from "react-i18next";

export default function MessagesFile({ onImageSelected, onImageSend }) {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [drawings, setDrawings] = useState([]);
  const [currentDrawing, setCurrentDrawing] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const viewShotRef = useRef(null);
  const { t } = useTranslation();

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (result && !result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      setModalVisible(true);
    }
  };

  const handleImageSelected = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      onImageSelected(uri);
      setModalVisible(false);
      onImageSend(uri);
      setDrawings([]); 
    } catch (error) {
      console.error("Görüntü kaydedilemedi:", error);
    }
  };

  const handleClose = () => {
    setImage(null);
    setModalVisible(false);
  };

  const handleUndo = () => {
    setImage(null);
    pickImage();
  };

  const handleDrawStart = (e) => {
    if (!isDrawing) return;
    const { locationX, locationY } = e.nativeEvent;
    setCurrentDrawing([{ x: locationX, y: locationY }]);
  };

  const handleDrawMove = (e) => {
    if (!isDrawing) return;
    const { locationX, locationY } = e.nativeEvent;
    setCurrentDrawing((prev) => [...prev, { x: locationX, y: locationY }]);
  };

  const handleDrawEnd = () => {
    if (!isDrawing) return;
    setDrawings((prev) => [...prev, currentDrawing]);
    setCurrentDrawing([]);
  };

  const handleClearDrawings = () => {
    setDrawings([]);
  };

  const toggleDrawing = () => {
    setIsDrawing(!isDrawing);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={pickImage}
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 35,
        }}
      >
        <Ionicons name="image" size={24} color={COLORS.orange} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, backgroundColor: COLORS.black }}>
          {/* Photo View*/}
          <ViewShot
            ref={viewShotRef}
            style={{ flex: 1, alignItems: "center" }}
            options={{ format: "jpg", quality: 1.0 }}
          >
            <Image
              source={{ uri: image }}
              style={{ width: SIZES.width, height: SIZES.height / 1.0 }}
            />
            <Svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "transparent",
              }}
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponder={() => true}
              onResponderGrant={handleDrawStart}
              onResponderMove={handleDrawMove}
              onResponderRelease={handleDrawEnd}
            >
              {drawings.map((drawing, index) => (
                <Polyline
                  key={index}
                  points={drawing.map((p) => `${p.x},${p.y}`).join(" ")}
                  stroke={COLORS.orange}
                  strokeWidth="4"
                  fill="none"
                />
              ))}
              {currentDrawing.length > 0 && (
                <Polyline
                  points={currentDrawing.map((p) => `${p.x},${p.y}`).join(" ")}
                  stroke={COLORS.orange}
                  strokeWidth="4"
                  fill="none"
                />
              )}
            </Svg>
          </ViewShot>

          <TouchableOpacity
            style={{
              backgroundColor: COLORS.orange,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              borderRadius: 0,
              gap: 10,
            }}
            onPress={handleImageSelected}
          >
            <ReusableText
              text={t("sendSelectedPhoto")}
              family={"medium"}
              size={TEXT.xSmall}
              color={COLORS.white}
            />
            <Feather name="send" size={20} color={COLORS.white} />
          </TouchableOpacity>
          <View
            style={{
              position: "absolute",
              top: 40,
              left: 20,
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              width: SIZES.width - 30,
            }}
          >
            {/* Undo Button */}
            <TouchableOpacity
              onPress={handleUndo}
              style={{
                backgroundColor: COLORS.orange,
                padding: 10,
                borderRadius: 20,
                width: 40,
              }}
            >
              <AntDesign name="back" size={20} color={COLORS.white} />
            </TouchableOpacity>
            {/* Draw Button */}
            <TouchableOpacity
              onPress={toggleDrawing}
              style={{
                backgroundColor: isDrawing ? COLORS.green : COLORS.orange,
                padding: 10,
                borderRadius: 20,
                width: 40,
              }}
            >
              <AntDesign name="edit" size={20} color={COLORS.white} />
            </TouchableOpacity>
            {/* Clear Button */}
            <TouchableOpacity
              onPress={handleClearDrawings}
              style={{
                backgroundColor: COLORS.orange,
                padding: 10,
                borderRadius: 20,
                width: 40,
              }}
            >
              <AntDesign name="delete" size={20} color={COLORS.white} />
            </TouchableOpacity>
            {/* Close Button */}
            <TouchableOpacity
              onPress={handleClose}
              style={{
                backgroundColor: COLORS.orange,
                padding: 10,
                borderRadius: 20,
                width: 40,
              }}
            >
              <AntDesign name="close" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
