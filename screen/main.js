import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  MenuGrid,
  MenuItem,
  MenuIcon,
  MenuText,
  NewsSection,
  NewsCard,
  NewsTitle,
  SimulationItem,
} from "../components/Style";
import PagerView from "react-native-pager-view";
import Carousel from "../components/Carousel";

// npm install react-native-pager-view
// expo install react-native-screens react-native-safe-area-context
// npm install is-arrayish
// npm install react-native-xml2js
// npm install react-native-dotenv
// npm install expo-modules-core
// npm install expo-asset
// npm install supports-color
// npx expo install expo-constants
// npm install react-native-svg-transformer --save-dev

export default function Main({ navigation }) {
  const handleHousingListPress = () => {
    navigation.navigate("CategoryPage", { category: "주택계약" });
  };
  const handleFinanceListPress = () => {
    navigation.navigate("CategoryPage", { category: "금융" });
  };
  const handleLaborListPress = () => {
    navigation.navigate("CategoryPage", { category: "노동법" });
  };
  const handleCalculatorScreenPress = () => {
    navigation.navigate("CalculatorScreen");
  };
  const handleSimulationListPress = () => {
    navigation.navigate("SimulationList");
  };
  const handleDictionaryPress = () => {
    navigation.navigate("DictionaryScreen");
  };
  const handleHousingPress = () => {
    navigation.navigate("HousingDictionaryScreen");
  };
  const handleLPolicyPress = () => {
    navigation.navigate("PolicyListPage");
  };
  const NewsScreen1 = () => {
    navigation.navigate("NewsPage", { category: "주택계약" });
  };
  const NewsScreen2 = () => {
    navigation.navigate("NewsPage", { category: "금융" });
  };
  const NewsScreen3 = () => {
    navigation.navigate("NewsPage", { category: "노동법" });
  };

  const menuItems = [
    {
      id: 1,
      title: "주택 용어 사전",
      icon: "home-outline",
      onPress: handleHousingListPress,
    },
    {
      id: 2,
      title: "금융 용어 사전",
      icon: "cash-outline",
      onPress: handleFinanceListPress,
    },
    {
      id: 3,
      title: "청년 정책",
      icon: "briefcase-outline",
      onPress: handleLaborListPress,
    },
    {
      id: 4,
      title: "실수령액 계산기",
      icon: "wallet-outline",
      onPress: handleCalculatorScreenPress,
    },
  ];

  const newsItems = [
    { id: 1, title: "금융 관련 용어", onPress: handleDictionaryPress },
    { id: 2, title: "주택 금융 용어", onPress: handleHousingPress },
    { id: 3, title: "청년 정책 정보", onPress: handleLPolicyPress },
  ];

  return (
    <>
      {/* 캐러셀 - 인기 정보 캐러셀 */}
      <View style={{ height: 250, marginVertical: 10 }}>
        <PagerView style={{ flex: 1 }} initialPage={0}>
          <TouchableOpacity onPress={NewsScreen1}>
            <View style={styles.page} key="1">
              <Text>주택계약 뉴스</Text>
              <Text>Swipe ➡️</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={NewsScreen2}>
            <View style={styles.page} key="2">
              <Text>금융 뉴스</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={NewsScreen3}>
            <View style={styles.page} key="3">
              <Text>노동법 뉴스</Text>
            </View>
          </TouchableOpacity>
        </PagerView>
      </View>

      <ScrollView style={{ width: "100%" }}>
        {/* 카테고리 선택 */}
        <MenuGrid>
          {menuItems.map((item) => (
            <MenuItem key={item.id} onPress={item.onPress}>
              <MenuIcon>
                <Ionicons name={item.icon} size={24} color="#3D0F2F" />
              </MenuIcon>
              <TouchableOpacity
                onPress={() => item.screen && navigation.navigate(item.screen)}
              >
                <MenuText>{item.title}</MenuText>
              </TouchableOpacity>
            </MenuItem>
          ))}
        </MenuGrid>

        {/* 시뮬레이션 추천 캐러셀 */}
        <Carousel />
        <View style={styles.simulationButtonContainer}>
          <MenuGrid>
            {[
              {
                title: "시뮬레이션",
                icon: "game-controller-outline",
                onPress: handleSimulationListPress,
              },
            ].map((simulationItem, index) => (
              <SimulationItem key={index} onPress={simulationItem.onPress}>
                <MenuIcon>
                  <Ionicons
                    name={simulationItem.icon}
                    size={24}
                    color="#3D0F2F"
                  />
                </MenuIcon>
                <TouchableOpacity onPress={simulationItem.onPress}>
                  <MenuText>{simulationItem.title}</MenuText>
                </TouchableOpacity>
              </SimulationItem>
            ))}
          </MenuGrid>
        </View>
        <Container>
          {/* 주목해야 할 정보 */}
          <NewsSection>
            {newsItems.map((item) => (
              <NewsCard key={item.id} onPress={item.onPress}>
                <TouchableOpacity
                  onPress={() =>
                    item.screen && navigation.navigate(item.screen)
                  }
                ></TouchableOpacity>
                <NewsTitle>{item.title}</NewsTitle>
              </NewsCard>
            ))}
          </NewsSection>
        </Container>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    height: "100%",
  },
  simulationButtonContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
});
