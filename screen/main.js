import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  HeaderText,
  MenuGrid,
  MenuItem,
  MenuIcon,
  MenuText,
  NewsSection,
  NewsCard,
  NewsTitle,
} from "../components/Style";
import PagerView from "react-native-pager-view";
import { StyleSheet } from "react-native";
import Footer from "../components/Footer";

// npm install react-native-pager-view
// expo install react-native-screens react-native-safe-area-context
// npm install is-arrayish

export default function Main({ navigation }) {
  const handleDetailListPress = () => {
    navigation.navigate("DetailList");
  };

  const menuItems = [
    {
      id: 1,
      title: "주택계약",
      icon: "home-outline",
      onPress: handleDetailListPress,
    },
    {
      id: 2,
      title: "금융",
      icon: "cash-outline",
      onPress: handleDetailListPress,
    },
    {
      id: 3,
      title: "노동법",
      icon: "briefcase-outline",
      onPress: handleDetailListPress,
    },
    {
      id: 4,
      title: "실수령액 계산기",
      icon: "wallet-outline",
      onPress: handleDetailListPress,
    },
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
          {/* <Header>
            <HeaderText>Real Life School</HeaderText>
          </Header> */}

          <MenuGrid>
            {menuItems.map((item) => (
              <MenuItem key={item.id} onPress={item.onPress}>
                <MenuIcon>
                  <Ionicons name={item.icon} size={24} color="#3D0F2F" />
                </MenuIcon>
                <MenuText>{item.title}</MenuText>
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
  webFallback: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    backgroundColor: "#f1f1f1",
  },
});
