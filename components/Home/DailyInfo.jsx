import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import styles from "../../screens/Home/home.style";
import general from "../general.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { useTranslation } from "react-i18next";

const DailyInfo = () => {
  const { t } = useTranslation();

  const [dateInfo, setDateInfo] = useState({
    day: "",
    month: "",
    weekday: "",
  });
  const [weatherInfo, setWeatherInfo] = useState({
    temp: "",
    condition: "",
  });

  useEffect(() => {
    const today = new Date();
    const days = [
      t("monday"),
      t("tuesday"),
      t("wednesday"),
      t("thursday"),
      t("friday"),
      t("saturday"),
      t("sunday"),
    ];
    const months = [
      t("january"),
      t("february"),
      t("march"),
      t("april"),
      t("may"),
      t("june"),
      t("july"),
      t("august"),
      t("september"),
      t("october"),
      t("november"),
      t("december"),
    ];

    setDateInfo({
      day: today.getDate(),
      month: months[today.getMonth()],
      weekday: days[today.getDay()],
      year: today.getFullYear(),
    });

    const apiKey = "baad69bbb07b855c625780ef8b555fc5";
    const city = "Istanbul";

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
      .then((response) => {
        const weatherData = response.data;
        setWeatherInfo({
          temp: Math.round(weatherData.main.temp),
          condition: weatherData.weather[0].main,
        });
      })
      .catch((error) => {
        console.error("Hava durumu verisi alınırken bir hata oluştu:", error);
      });
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return "weather-sunny";
      case "Clouds":
        return "weather-cloudy";
      case "Rain":
        return "weather-rainy";
      case "Snow":
        return "weather-snowy";
      case "Drizzle":
        return "weather-hail";
      case "Thunderstorm":
        return "weather-lightning";
      default:
        return "weather-cloudy";
    }
  };

  return (
    <View style={[general.row(""), { paddingBottom: 30 }]}>
      <View style={styles.box}>
        <MaterialCommunityIcons name="calendar-month" size={20} color="black" />
        <ReusableText
          text={`${dateInfo.day} ${dateInfo.month} ${dateInfo.weekday}`}
          family={"regular"}
          size={TEXT.xSmall}
          color={COLORS.black}
        />
      </View>
      <View style={styles.box}>
        <MaterialCommunityIcons
          name={getWeatherIcon(weatherInfo.condition)}
          size={20}
          color="black"
        />
        <ReusableText
          text={`${weatherInfo.temp} °C`}
          family={"regular"}
          size={TEXT.xSmall}
          color={COLORS.black}
        />
      </View>
    </View>
  );
};

export default DailyInfo;
