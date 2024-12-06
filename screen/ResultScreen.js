// ResultScreen.js
import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import * as Clipboard from "expo-clipboard";

// expo install expo-clipboard

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

      <View style={styles.resultContainer}>
        <Text style={styles.netSalary}>월 예상 실수령액</Text>
        <Text style={styles.amount}>{result.netSalary} 원</Text>

        <Text style={styles.subtitle}>공제액 목록:</Text>
        <View style={styles.deductions}>
          <Text>
            국민연금:{" "}
            <Text style={styles.amount}>{result.nationalPension} 원</Text>
          </Text>
          <Text>
            건강보험:{" "}
            <Text style={styles.amount}>{result.healthInsurance} 원</Text>
          </Text>
          <Text>
            장기요양:{" "}
            <Text style={styles.amount}>{result.longTermCare} 원</Text>
          </Text>
          <Text>
            고용보험:{" "}
            <Text style={styles.amount}>{result.employmentInsurance} 원</Text>
          </Text>
          <Text>
            소득세: <Text style={styles.amount}>{result.incomeTax} 원</Text>
          </Text>
          <Text>
            지방소득세:{" "}
            <Text style={styles.amount}>{result.localIncomeTax} 원</Text>
          </Text>
        </View>

        <Text style={styles.totalDeductions}>
          공제액 합계:{" "}
          <Text style={styles.amount}>{result.totalDeductions} 원</Text>
        </Text>
      </View>

      {/* 결과 복사 버튼 */}
      <View style={styles.buttonContainer}>
        <Button
          title="결과 복사"
          onPress={handleCopyToClipboard}
          color="#00509E"
        />
      </View>

      {/* 다시 계산하기 버튼 */}
      <View style={styles.buttonContainer}>
        <Button
          title="다시 계산하기"
          onPress={() => navigation.goBack()}
          color="#D9534F"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#00509E",
    marginBottom: 20,
  },
  resultContainer: {
    width: "100%",
    backgroundColor: "#F8F9FA",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  netSalary: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00509E",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginVertical: 10,
  },
  deductions: {
    marginBottom: 10,
  },
  totalDeductions: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 15,
  },
  buttonContainer: {
    width: "100%",
    marginVertical: 10,
  },
});

export default ResultScreen;
