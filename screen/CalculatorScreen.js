import React, { useState, useLayoutEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RadioButton from "../components/RadioButton";
import CounterButton from "../components/CounterButton";
import { calculateSalary } from "../utils/salaryCalculator";
import { HeaderBackButton } from "@react-navigation/elements";

const CalculatorScreen = () => {
  const [salaryType, setSalaryType] = useState(""); // 연봉 / 월급 선택
  const [severanceIncluded, setSeveranceIncluded] = useState(true); // 퇴직금 포함 여부
  const [salary, setSalary] = useState(""); // 연봉/월급 입력
  const [nonTaxableIncome, setNonTaxableIncome] = useState(""); // 비과세액 입력
  const [dependents, setDependents] = useState(1); // 부양가족수
  const [children, setChildren] = useState(0); // 20세 이하 자녀 수
  const navigation = useNavigation();

  // 임시로 화면의 헤더에 뒤로가기 버튼을 추가
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.navigate("Main")} />
      ),
    });
  }, [navigation]);

  // 계산 버튼 클릭 시 처리
  const handleCalculate = () => {
    if (!salary || !nonTaxableIncome) {
      Alert.alert("입력 오류", "급여와 비과세액을 모두 입력하세요.");
      return;
    }

    const calculationResult = calculateSalary(
      salaryType,
      severanceIncluded,
      salary,
      nonTaxableIncome,
      dependents,
      children
    );
    navigation.navigate("ResultScreen", { result: calculationResult });
  };

  // 초기화 버튼 클릭 시 처리
  const handleReset = () => {
    setSalary("");
    setNonTaxableIncome("");
    setDependents(1);
    setChildren(0);
    setSalaryType("");
    setSeveranceIncluded(true);
  };

  return (
    <View style={styles.container}>
      
    <Text style={styles.title}>실수령액 계산기</Text>
      {/* 카드 스타일로 감싸기 */}
      <View style={styles.card}>
        
        {/* 연봉/월급 선택 및 퇴직금 포함 여부를 가로로 배치 */}
        <View style={styles.row}>
          <View style={styles.radioContainer}>
            <Text style={styles.label}>연봉/월급 선택</Text>
            <RadioButton
              selected={salaryType}
              onChange={setSalaryType}
              options={["연봉", "월급"]}
            />
          </View>

          {salaryType === "연봉" && (
            <View style={styles.radioContainer}>
              <Text style={styles.label}>퇴직금 포함 여부</Text>
              <RadioButton
                selected={severanceIncluded}
                onChange={setSeveranceIncluded}
                options={["포함", "별도"]}
              />
            </View>
          )}
        </View>

        {/* 급여 입력 */}
        <Text style={styles.label}>급여 입력</Text>
        <TextInput
          style={styles.input}
          value={salary}
          onChangeText={setSalary}
          keyboardType="numeric"
          placeholder="연봉 또는 월급을 입력하세요"
        />

        {/* 비과세액 입력 */}
        <Text style={styles.label}>비과세액 입력</Text>
        <TextInput
          style={styles.input}
          value={nonTaxableIncome}
          onChangeText={setNonTaxableIncome}
          keyboardType="numeric"
          placeholder="비과세액을 입력하세요"
        />

        {/* 부양가족수 입력 */}
        <Text style={styles.label}>부양가족수 (본인 포함)</Text>
        <CounterButton count={dependents} onChange={setDependents} />

        {/* 20세 이하 자녀 수 입력 */}
        <Text style={styles.label}>20세 이하 자녀 수</Text>
        <CounterButton count={children} onChange={setChildren} />
      </View>

      {/* 계산하기 버튼 및 초기화 버튼 */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.calculateButton]} onPress={handleCalculate}>
          <Text style={styles.buttonText}>계산하기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
          <Text style={styles.buttonText}>초기화</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginBottom: 30,
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
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#4A4A4A",
  },
  input: {
    height: 45,
    borderColor: "#B0C4DE",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 12,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  radioContainer: {
    flex: 1,
    marginRight: 15,
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
  calculateButton: {
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

export default CalculatorScreen;
