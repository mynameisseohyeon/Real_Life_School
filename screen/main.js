// Main.js
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
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

// npm install react-native-snap-carousel

export default function Main() {
  const [activeSlide, setActiveSlide] = useState(0);

  const renderCarouselItem = ({ item }) => (
    <CarouselImageContainer>
      <CarouselImage source={item.image} resizeMode="cover" />
    </CarouselImageContainer>
  );

  const menuItems = [
    { id: 1, title: "주택계약", icon: "home-outline" },
    { id: 2, title: "세금", icon: "cash-outline" },
    { id: 3, title: "노동법", icon: "briefcase-outline" },
    { id: 4, title: "금융관리", icon: "wallet-outline" },
  ];

  const newsItems = [
    { id: 1, title: "청년층을 위한 새로운 주택정책 발표" },
    { id: 2, title: "2024년 달라지는 세금 제도 정리" },
    { id: 3, title: "알바생이 꼭 알아야 할 노동권" },
  ];

  return (
    <Container>
      <Header>
        <HeaderText>Real Life School</HeaderText>
      </Header>

      <ScrollView style={{ width: "100%" }}>
        <MenuGrid>
          {menuItems.map((item) => (
            <MenuItem key={item.id}>
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
      </ScrollView>
    </Container>
  );
}
