import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Currency } from "@/interfaces/crypto";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const headerHeight = useHeaderHeight();
  const currencies = useQuery({
    queryKey: ["listings"],
    queryFn: () => fetch("/api/listings").then((response) => response.json()),
  });

  const ids = currencies.data
    ?.map((currency: Currency) => currency.id)
    .join(",");

  const { data } = useQuery({
    queryKey: ["info", ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  });

  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <Text style={defaultStyles.sectionHeader}>Lastest Crypto</Text>
      <View style={defaultStyles.block}>
        {currencies.data?.map((currency: Currency) => (
          <Link asChild href={`/crypto/${currency.id}`} key={currency.id}>
            <TouchableOpacity
              style={{ flexDirection: "row", gap: 14, alignItems: "center" }}
            >
              {data && (
                <Image
                  source={{ uri: data?.[currency.id].logo }}
                  style={{ height: 40, width: 40 }}
                />
              )}
              <View style={{ flex: 1, gap: 10 }}>
                <Text style={{ fontWeight: "600", color: Colors.dark }}>
                  {currency.name}
                </Text>
                <Text style={{ color: Colors.gray }}>{currency.symbol}</Text>
              </View>
              <View style={{ gap: 6, alignItems: "flex-end" }}>
                <Text style={{}}>{currency.quote.EUR.price.toFixed(2)} ₦</Text>
                <View style={{ flexDirection: "row", gap: 4 }}>
                  <Ionicons
                    name={
                      currency.quote.EUR.percent_change_1h > 0
                        ? "caret-up"
                        : "caret-down"
                    }
                    size={16}
                    color={
                      currency.quote.EUR.percent_change_1h > 0 ? "green" : "red"
                    }
                  />
                  <Text
                    style={{
                      color:
                        currency.quote.EUR.percent_change_1h > 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {currency.quote.EUR.percent_change_1h.toFixed(2)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({});
