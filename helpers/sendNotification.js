import axios from "axios";
import { oneSignalApiKey } from "../config"; 

const sendNotification = async (userIds, message) => {
  if (!Array.isArray(userIds)) {
    userIds = [userIds];
  }

  try {
    const response = await axios.post(
      "https://onesignal.com/api/v1/notifications",
      {
        app_id: "5fa9d477-0bd0-4199-9960-406c4928b218",
        include_external_user_ids: userIds,
        headings: { en: "Yeni Görev" },
        contents: { en: message },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${oneSignalApiKey}`,
        },
      }
    );

    console.log("Bildirim başarıyla gönderildi:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Bildirim gönderilemedi:", error.response.data);
    } else {
      console.error("Bildirim gönderilemedi:", error.message);
    }
  }
};

export default sendNotification;