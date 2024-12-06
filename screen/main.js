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
import { useNavigation } from '@react-navigation/native'; // 네비게이션 훅 추가

export default function Main() {
  const navigation = useNavigation(); // 네비게이션 객체 생성

  const menuItems = [
    { id: 1, title: "주택계약", icon: "home-outline" },
    { id: 2, title: "금융", icon: "cash-outline" },
    { id: 3, title: "노동법", icon: "briefcase-outline" },
    { id: 4, title: "실수령액 계산기", icon: "wallet-outline", screen: "CalculatorScreen" }, // 화면 이름 추가
  ];

  const newsItems = [
    { id: 1, title: "청년층을 위한 새로운 주택정책 발표" },
    { id: 2, title: "2024년 달라지는 세금 제도 정리" },
    { id: 3, title: "알바생이 꼭 알아야 할 노동권" },
  ];

  return (
    <>
      <View style={{ height: 250, marginVertical: 10 }}>
        <PagerView style={{ flex: 1 }} initialPage={0}>
          <View style={styles.page} key="1">
            <Text>First page</Text>
            <Text>Swipe ➡️</Text>
          </View>
          <View style={styles.page} key="2">
            <Text>Second page</Text>
          </View>
          <View style={styles.page} key="3">
            <Text>Third page</Text>
          </View>
        </PagerView>
      </View>

      <ScrollView style={{ width: "100%" }}>
        <Container>
          <MenuGrid>
            {menuItems.map((item) => (
              <MenuItem key={item.id}>
                <MenuIcon>
                  <Ionicons name={item.icon} size={24} color="#3D0F2F" />
                </MenuIcon>
                <TouchableOpacity onPress={() => item.screen && navigation.navigate(item.screen)}>
                  <MenuText>{item.title}</MenuText>
                </TouchableOpacity>
              </MenuItem>
            ))}
          </MenuGrid>

          <NewsSection>
            {newsItems.map((item) => (
              <NewsCard key={item.id}>
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
  container: {
    flex: 1,
    height: 200,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    height: "100%",
  },
});
