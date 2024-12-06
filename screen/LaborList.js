import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { DetailListView, NewsCard, NewsTitle } from "../components/Style";
// import Images from "../assets/images";

export default function LaborList({ navigation }) {
  const newsItems = [
    {
      id: 1,
      title: "청년층을 위한 새로운 주택정책 발표",
      image: "",
      content: "청년층을 위한 주택정책의 상세한 내용을 설명합니다...",
      url: "https://example.com/housing-policy",
    },
    {
      id: 2,
      title: "2024년 달라지는 세금 제도 정리",
      image: "",
      content: "2024년에 변경되는 세금 제도에 대한 상세 설명...",
      url: "https://example.com/tax-changes",
    },
    {
      id: 3,
      title: "알바생이 꼭 알아야 할 노동권",
      image: "",
      content: "아르바이트 근로자들이 알아야 할 중요한 노동권 정보...",
      url: "https://example.com/labor-rights",
    },
  ];

  const handleDetailListPress = (item) => {
    console.log("Selected Item:", item);

    if (navigation && item) {
      navigation.navigate("Detail", {
        selectedItem: item,
      });
    }
  };

  return (
    // 클릭 시 Detail 이동이 원활하게 이루어지지 않음
    <ScrollView style={{ width: "100%" }}>
      <DetailListView>
        {newsItems.map((item) => (
          <NewsCard key={item.id} onPress={() => handleDetailListPress(item)}>
            <NewsTitle>{item.title}</NewsTitle>
          </NewsCard>
        ))}
      </DetailListView>
    </ScrollView>
  );
}
