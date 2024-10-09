import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, StatusBar, Platform, SafeAreaView } from "react-native";
import { COLORS } from "../../constants/theme";

const NoticeMessage = ({ message, status, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  const getBackgroundColor = () => {
    switch (status) {
      case 'error':
        return COLORS.red;
      case 'success':
        return COLORS.green;
      default:
        return COLORS.red;
    }
  };

  useEffect(() => {
    setVisible(true);

    if (duration) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, status, duration]);

  if (!visible) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.errorContainer, { backgroundColor: getBackgroundColor() }]}>
        <Text style={styles.errorText}>{message}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    position: "absolute",
    top: Platform.OS === 'ios' ? 35 : 0,
    width: Dimensions.get("window").width,
  },
  errorContainer: {
    width: "100%",
    padding: 4,
  },
  errorText: {
    color: "white",
    textAlign: "center",
  },
});

export default NoticeMessage;