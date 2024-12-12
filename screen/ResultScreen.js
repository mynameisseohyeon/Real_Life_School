import React from "react";
import { View, Text, StyleSheet, Button, Alert, ScrollView, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";

const ResultScreen = ({ route, navigation }) => {
  const { result } = route.params;

  // 결과를 텍스트 형식으로 포맷
  const resultText = `
월 예상 실수령액: ${result.netSalary} 원
공제액 목록:
국민연금: ${result.nationalPension} 원
건강보험: ${result.healthInsurance} 원
장기요양: ${result.longTermCare} 원
고용보험: ${result.employmentInsurance} 원
소득세: ${result.incomeTax} 원
지방소득세: ${result.localIncomeTax} 원
공제액 합계: ${result.totalDeductions} 원
`;

  // 클립보드에 복사하는 함수
  const handleCopyToClipboard = () => {
    Clipboard.setString(resultText);
    Alert.alert("결과 복사", "결과가 클립보드에 복사되었습니다!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>계산 결과</Text>

      {/* 카드 스타일로 감싸기 */}
      <View style={styles.card}>
        <Text style={styles.netSalary}>월 예상 실수령액</Text>
        <Text style={styles.amount}>{result.netSalary} 원</Text>

        <Text style={styles.subtitle}>공제액 목록:</Text>
        <View style={styles.deductions}>
          <Text style={styles.deductionItem}>
            국민연금: <Text style={styles.amount}>{result.nationalPension} 원</Text>
          </Text>
          <Text style={styles.deductionItem}>
            건강보험: <Text style={styles.amount}>{result.healthInsurance} 원</Text>
          </Text>
          <Text style={styles.deductionItem}>
            장기요양: <Text style={styles.amount}>{result.longTermCare} 원</Text>
          </Text>
          <Text style={styles.deductionItem}>
            고용보험: <Text style={styles.amount}>{result.employmentInsurance} 원</Text>
          </Text>
          <Text style={styles.deductionItem}>
            소득세: <Text style={styles.amount}>{result.incomeTax} 원</Text>
          </Text>
          <Text style={styles.deductionItem}>
            지방소득세:{" "}
            <Text style={styles.amount}>{result.localIncomeTax} 원</Text>
          </Text>
        </View>

        <Text style={styles.totalDeductions}>
          공제액 합계: <Text style={styles.amount}>{result.totalDeductions} 원</Text>
        </Text>
      </View>

      {/* 결과 복사 및 다시 계산하기 버튼 */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.copyButton]} onPress={handleCopyToClipboard}>
          <Text style={styles.buttonText}>결과 복사</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>다시 계산하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "stretch",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#2E3A59",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  netSalary: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#63B8E2",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginVertical: 12,
  },
  deductions: {
    marginBottom: 10,
  },
  deductionItem: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  totalDeductions: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    marginBottom: 12,
  },
  copyButton: {
    backgroundColor: "#63B8E2",
  },
  resetButton: {
    backgroundColor: "#A9B6C4",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default ResultScreen;
