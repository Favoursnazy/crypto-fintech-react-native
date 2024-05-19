import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";

const Page = () => {
  const user = "Favoursnazy";
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(6).fill(0);
  const router = useRouter();

  const onNumberPress = (number: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode([...code, number]);
  };
  const numberBackSpace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode(code.slice(0, -1));
  };

  useEffect(() => {
    if (code.length === 6) {
      if (code.join("") === "123456") {
        router.replace("/(authenticated)/(tabs)/home");
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setCode([]);
      }
    }
  }, [code]);

  const onBioMetricpress = async () => {
    const { success } = await LocalAuthentication.authenticateAsync();

    if (success) {
      router.replace("/(authenticated)/(tabs)/home");
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.greeting}>Welcome back, {user}</Text>
      <View style={[styles.codeView]}>
        {codeLength.map((_, index) => (
          <View
            key={index}
            style={[
              styles.codeEmpty,
              {
                backgroundColor: code[index] ? Colors.primary : "lightgray",
              },
            ]}
          />
        ))}
      </View>
      <View style={styles.numberView}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {[1, 2, 3].map((number) => (
            <TouchableOpacity
              style={{
                width: 50,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={number}
              onPress={() => onNumberPress(number)}
            >
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[4, 5, 6].map((number) => (
            <TouchableOpacity
              style={{
                width: 50,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={number}
              onPress={() => onNumberPress(number)}
            >
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[7, 8, 9].map((number) => (
            <TouchableOpacity
              style={{
                width: 50,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={number}
              onPress={() => onNumberPress(number)}
            >
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={onBioMetricpress}>
            {Platform.OS === "android" ? (
              <Entypo name="fingerprint" size={26} color="black" />
            ) : (
              <MaterialCommunityIcons
                name="face-recognition"
                size={26}
                color="black"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNumberPress(0)}>
            <Text style={styles.number}>0</Text>
          </TouchableOpacity>
          <View style={{ minWidth: 30 }}>
            {code.length > 0 && (
              <TouchableOpacity onPress={numberBackSpace}>
                <MaterialCommunityIcons
                  name="backspace-outline"
                  size={26}
                  color="black"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text
          style={{
            alignSelf: "center",
            color: Colors.primary,
            fontWeight: "500",
            fontSize: 18,
          }}
        >
          Fogot your passcode?
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 80,
    alignSelf: "center",
  },
  codeView: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginVertical: 100,
    alignItems: "center",
  },
  codeEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  numberView: {
    marginHorizontal: 50,
    gap: 50,
  },
  number: {
    fontSize: 32,
  },
});

export default Page;
