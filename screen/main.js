import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
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
} from "../components/Style";
import PagerView from "react-native-pager-view";
import Footer from "../components/Footer";

// npm install react-native-pager-view
// expo install react-native-screens react-native-safe-area-context
// npm install is-arrayish

export default function Main({ navigation }) {
  const handleHousingListPress = () => {
    navigation.navigate("CategoryPage", { category: '주택계약' });
  };
  const handleFinanceListPress = () => {
    navigation.navigate("CategoryPage", { category: '금융' });
  };
  const handleLaborListPress = () => {
    navigation.navigate("CategoryPage", { category: '노동법' });
  };
  const handleCalculatorScreenPress = () => {
    navigation.navigate("CalculatorScreen");
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
    navigation.navigate("NewsPage", { category: '주택계약'});
  };
  const NewsScreen2 = () => {
    navigation.navigate("NewsPage", { category: '금융'});
  };
  const NewsScreen3 = () => {
    navigation.navigate("NewsPage", { category: '노동법'});
  };



  const menuItems = [
    {
      id: 1,
      title: "주택계약",
      icon: "home-outline",
      onPress: handleHousingListPress,
    },
    {
      id: 2,
      title: "금융",
      icon: "cash-outline",
      onPress: handleFinanceListPress,
    },
    {
      id: 3,
      title: "노동법",
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
    { id: 2, title: "주택 금융 용어", onPress: handleHousingPress, },
    { id: 3, title: "청년 정책 정보", onPress: handleLPolicyPress, },
  ];

  return (
    <>
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
        <Container>
          <MenuGrid>
            {menuItems.map((item) => (
              <MenuItem key={item.id} onPress={item.onPress}>
                <MenuIcon>
                  <Ionicons name={item.icon} size={24} color="#3D0F2F" />
                </MenuIcon>
                <TouchableOpacity
                  onPress={() =>
                    item.screen && navigation.navigate(item.screen)
                  }
                >
                  <MenuText>{item.title}</MenuText>
                </TouchableOpacity>
              </MenuItem>
            ))}
          </MenuGrid>

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
        <Footer />
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
});
