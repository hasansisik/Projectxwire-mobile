import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import * as Device from "expo-device";

export async function registerForPushNotifications() {
  let expoPushToken;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Bildirim izinleri verilmedi!");
      return;
    }

    expoPushToken = (await Notifications.getExpoPushTokenAsync()).data;
    await AsyncStorage.setItem("expoPushToken", expoPushToken);
  } else {
    alert("Bildirimler yalnızca fiziksel cihazlarda çalışır!");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return expoPushToken;
}