import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

type RoundBtnProps = {
  text: string;
  icon: typeof Ionicons.defaultProps;
  onPress?: () => void;
};

const RoundButton = ({ text, icon, onPress }: RoundBtnProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatar}>
        <Ionicons name={icon} size={40} color={Colors.dark} />
      </View>
      <Text style={styles.label}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.dark,
  },
});

export default RoundButton;
