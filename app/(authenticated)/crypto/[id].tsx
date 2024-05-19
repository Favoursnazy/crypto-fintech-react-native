import {
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import { format } from "date-fns";
import * as Haptics from "expo-haptics";
import Animated, {
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";
Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
}
const categories = ["Overview", "News", "Orders", "Transactions"];

const Page = () => {
  const headerHeight = useHeaderHeight();
  const { id } = useLocalSearchParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });
  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"), 12);

  const { data, isLoading } = useQuery({
    queryKey: ["info", id],
    queryFn: async () => {
      const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json());
      return info[+id];
    },
  });

  const { data: tickers } = useQuery({
    queryKey: ["tickers", id],
    queryFn: async (): Promise<any[]> =>
      await fetch(`/api/tickers`).then((res) => res.json()),
  });

  const animatedText = useAnimatedProps(() => {
    return {
      text: `₦ ${state.y.price.value.value.toFixed(2)}`,
      defaultValue: "",
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);
    return {
      text: `${date.toLocaleDateString()}`,
      defaultValue: "",
    };
  });

  useEffect(() => {
    console.log(isActive);
    if (isActive) Haptics.selectionAsync();
  }, [isActive]);

  return (
    <>
      <Stack.Screen options={{ title: data?.name }} />
      <SectionList
        keyExtractor={(i) => i.title}
        renderSectionHeader={() => (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingBottom: 8,
              backgroundColor: Colors.background,
              borderBlockColor: Colors.lightGray,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={
                  activeIndex === index
                    ? styles.categoriesBtnActive
                    : styles.categoriesBtn
                }
                onPress={() => setActiveIndex(index)}
              >
                <Text
                  style={
                    activeIndex === index
                      ? styles.categoryTextActive
                      : styles.categoryText
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        ListHeaderComponent={() => (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 16,
              }}
            >
              <Text style={styles.subtitle}>{data?.symbol}</Text>

              {data && (
                <Image
                  source={{ uri: data.logo }}
                  style={{ width: 60, height: 60 }}
                />
              )}
            </View>
            <View style={{ flexDirection: "row", gap: 10, margin: 12 }}>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primary,
                    flexDirection: "row",
                    gap: 16,
                  },
                ]}
              >
                <Ionicons name="add" color={"#fff"} size={24} />
                <Text style={[defaultStyles.buttonText, { color: "#fff" }]}>
                  Buy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primaryMuted,
                    flexDirection: "row",
                    gap: 16,
                  },
                ]}
              >
                <Ionicons name="arrow-back" color={Colors.primary} size={24} />
                <Text
                  style={[defaultStyles.buttonText, { color: Colors.primary }]}
                >
                  Recieve
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        sections={[{ data: [{ title: "Chart" }] }]}
        renderItem={({ item }) => (
          <>
            {}
            {tickers && (
              <View style={[defaultStyles.block, { height: 500 }]}>
                {!isActive && (
                  <View>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        color: Colors.dark,
                      }}
                    >
                      ₦ {tickers[tickers.length - 1].price.toFixed(2)}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: Colors.gray,
                      }}
                    >
                      Today
                    </Text>
                  </View>
                )}
                {isActive && (
                  <View>
                    <AnimatedTextInput
                      animatedProps={animatedText}
                      style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        color: Colors.dark,
                      }}
                      editable={false}
                      underlineColorAndroid={"transparent"}
                    ></AnimatedTextInput>
                    <AnimatedTextInput
                      animatedProps={animatedDateText}
                      style={{
                        fontSize: 18,

                        color: Colors.dark,
                      }}
                      editable={false}
                      underlineColorAndroid={"transparent"}
                    ></AnimatedTextInput>
                  </View>
                )}
                <CartesianChart
                  chartPressState={state}
                  axisOptions={{
                    font,
                    tickCount: 5,
                    labelOffset: { x: -2, y: 0 },
                    labelColor: Colors.gray,
                    formatXLabel: (v) => `${v} ₦`,
                    formatYLabel: (ms) => format(new Date(ms), "MM/yy"),
                  }}
                  data={tickers}
                  xKey="timestamp"
                  yKeys={["price"]}
                >
                  {({ points }) => (
                    <>
                      <Line
                        points={points.price}
                        color={Colors.primary}
                        strokeWidth={3}
                      />
                      {isActive && (
                        <ToolTip
                          x={state.x.position}
                          y={state.y.price.position}
                        />
                      )}
                    </>
                  )}
                </CartesianChart>
              </View>
            )}
            <View style={[defaultStyles.block, { marginTop: 20 }]}>
              <Text style={styles.subtitle}>OverView</Text>
              <Text style={{ color: Colors.gray }}>
                Bitcoin is a decentralized digital currency, without a central
                bank or single administrator, that can be sent from user to user
                on the peer-to-peer bitcoin network without the need for
                intermediaries. Transactions are verified by network nodes
                through cryptography and recorded in a public distributed ledger
                called a blockchain.
              </Text>
            </View>
          </>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.gray,
  },
  categoryText: {
    fontSize: 14,
    color: "#000",
  },
  categoryTextActive: {
    fontSize: 14,
    color: "#000",
  },
  categoriesBtn: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});

export default Page;
