import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Page = () => {
  const [countryCode, setCountryCode] = useState("+234");
  const [phoneNumber, setPhoneNumber] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();

  const onSignIn = async (type: SignInType) => {
    // if (type === SignInType.Email) {
    //   console.log("Email");
    // }

    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    try {
      setTimeout(() => {
        router.push({
          pathname: "/verify/[phone]",
          params: { phone: fullPhoneNumber },
        });
      }, 2000);
    } catch (error) {
      console.log("Error SignIn Up", error);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome Back</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone associated with your account.
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder=""
            style={styles.input}
            placeholderTextColor={Colors.gray}
            value={countryCode}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile number"
            keyboardType="numeric"
            placeholderTextColor={Colors.gray}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== "" ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={() => onSignIn(SignInType.Phone)}
        >
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
            }}
          />
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
            }}
          />
        </View>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
          onPress={() => onSignIn(SignInType.Email)}
        >
          <Ionicons name="mail" size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
          onPress={() => onSignIn(SignInType.Google)}
        >
          <Ionicons name="logo-google" size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
          onPress={() => onSignIn(SignInType.Apple)}
        >
          <Ionicons name="logo-apple" size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with email
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    fontSize: 20,
    marginRight: 10,
    borderRadius: 16,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});

export default Page;
