import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES, TEXT } from '../../../constants/theme'
import ReusableText from '../../Reusable/ReusableText';
import { MaterialIcons } from '@expo/vector-icons';

const PinCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.icon, { backgroundColor: COLORS.lightInput }]}>
        <MaterialIcons name="person-pin" size={24} color="black" />
      </View>
      <ReusableText
        text={"item.task"}
        family={"medium"}
        size={TEXT.small}
        color={COLORS.black}
      />
    </TouchableOpacity>
  );
};

export default PinCard

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.radius,
    gap: 8,
  },
  icon: {
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E7E7E7",
    borderWidth: 1,
  },
});