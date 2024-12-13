import React, { useMemo, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";
import Simulation01 from "../assets/images/simulation01.png";
import Simulation02 from "../assets/images/simulation02.png";
import Simulation03 from "../assets/images/simulation03.png";

const windowWidth = Dimensions.get("window").width;
const margin = 8;

const cardSize = { width: windowWidth - 24 * 2.5, height: 120 };

export default function Carousel() {
  const data = useMemo(
    () => [
      { mainImageUrl: Simulation01 },
      { mainImageUrl: Simulation02 },
      { mainImageUrl: Simulation03 },
    ],
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>추천 시뮬레이션</Text>
      <FlatList
        data={data}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ marginRight: margin }}>
            <ImageBackground style={cardSize} source={item.mainImageUrl} />
          </TouchableOpacity>
        )}
        keyExtractor={(_, index) => String(index)}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "MangoDdobak",
  },
});
