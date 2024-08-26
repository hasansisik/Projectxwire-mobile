import * as Notifications from "expo-notifications";

const sendNotification = async (expoPushToken, message) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Yeni Görev",
        body: message,
        sound: true,
      },
      trigger: null,
    });
    console.log("Bildirim başarıyla gönderildi.");
  } catch (error) {
    console.error("Bildirim gönderilemedi:", error);
  }
};

module.exports = sendNotification;
