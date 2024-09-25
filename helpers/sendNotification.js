import axios from "axios";

const sendNotification = async (userIds, message) => {
  try {
    const response = await axios.post('https://onesignal.com/api/v1/notifications', {
      app_id: "5fa9d477-0bd0-4199-9960-406c4928b218",
      include_external_user_ids: userIds,
      headings: { "en": "Yeni Görev" },
      contents: { "en": message },
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic MWZiZmMzMTMtNmMzYi00ZDUxLTk5NjgtYzg3ODczZDQ1Yzlh`
      }
    });

    console.log("Bildirim başarıyla gönderildi:", response.data);
  } catch (error) {
    console.error("Bildirim gönderilemedi:", error);
  }
};

export default sendNotification;