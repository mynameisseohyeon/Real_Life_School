import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Container, SimulationItem } from "../components/Style";

export default function Simulation({ route }) {
  // 안전한 데이터 추출
  const { selectedItem } = route.params || {};
  const [selectedChoice, setSelectedChoice] = useState(null);

  if (!selectedItem) {
    return (
      <ScrollView style={{ width: "100%" }}>
        <Text>선택된 항목이 없습니다.</Text>
      </ScrollView>
    );
  }

  const handleChoicePress = (choiceIndex) => {
    setSelectedChoice(choiceIndex);
  };

  return (
    <ScrollView style={styles.container}>
      {/* 시나리오 제목 */}
      <Text style={styles.title}>{selectedItem.title}</Text>

      {/* 시나리오 설명 */}
      <Text style={styles.description}>{selectedItem.scenarioDescription}</Text>

      {/* 이미지 */}
      {selectedItem.image && (
        <Image
          source={
            typeof selectedItem.image === "string"
              ? { uri: selectedItem.image }
              : selectedItem.image
          }
          style={styles.image}
          resizeMode="cover"
        />
      )}

      {/* 선택지 섹션 */}
      <Text style={styles.sectionTitle}>선택지</Text>
      {selectedItem.choices.map((choice, index) => (
        <SimulationItem
          key={index}
          onPress={() => handleChoicePress(index)}
          style={[
            styles.choiceItem,
            selectedChoice === index && styles.selectedChoiceItem,
          ]}
        >
          <Text
            style={[
              styles.choiceText,
              selectedChoice === index && styles.selectedChoiceText,
            ]}
          >
            {choice}
          </Text>
        </SimulationItem>
      ))}

      {/* 결과 섹션 (선택지 선택 후 표시) */}
      {selectedChoice !== null && (
        <>
          <Text style={styles.sectionTitle}>결과</Text>
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>결과 설명</Text>
            <Text style={styles.resultText}>
              {selectedItem.consequences[selectedChoice]}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>핵심 학습</Text>
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>배운 점</Text>
            <Text style={styles.resultText}>
              {selectedItem.keyLearnings[selectedChoice]}
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    color: "#666",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "#333",
  },
  choiceItem: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  selectedChoiceItem: {
    backgroundColor: "#e6f2ff",
    borderColor: "#007bff",
  },
  choiceText: {
    fontSize: 16,
    color: "#333",
  },
  selectedChoiceText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  resultContainer: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  resultText: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },
});
