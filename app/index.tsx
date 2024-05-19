import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useAssets } from "expo-asset";
import { Link } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

const Page = () => {
  const [assets] = useAssets([require("@/assets/images/phone.jpeg")]);

  return (
    <View style={styles.container}>
      {assets && (
        <ImageBackground source={{ uri: assets[0].uri }} style={styles.image}>
          <View style={{ marginTop: 80, padding: 20 }}>
            <Text style={styles.header}>Ready to change the way money</Text>
          </View>
          <View style={styles.buttons}>
            <Link
              href={"/login"}
              asChild
              style={[
                defaultStyles.pillButton,
                { flex: 1, backgroundColor: Colors.dark },
              ]}
            >
              <TouchableOpacity>
                <Text
                  style={{ color: "white", fontSize: 22, fontWeight: "500" }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </Link>
            <Link
              href={"/register"}
              asChild
              style={[
                defaultStyles.pillButton,
                { flex: 1, backgroundColor: "#fff" },
              ]}
            >
              <TouchableOpacity>
                <Text style={{ fontSize: 22, fontWeight: "500" }}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 36,
    fontWeight: "900",
    color: "white",
    textTransform: "uppercase",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
});

export default Page;
