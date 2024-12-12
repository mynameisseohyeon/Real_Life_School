import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CounterButton = ({ count, onChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, count <= 1 && styles.disabledButton]}
        onPress={() => onChange(count - 1)}
        disabled={count <= 1}
      >
        <Text style={styles.text}>-</Text>
      </TouchableOpacity>
      <Text style={styles.count}>{count}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onChange(count + 1)}
      >
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: '#3498db', // 차분한 파란색 배경
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    borderRadius: 20, // 둥근 버튼
    elevation: 2, // 부드러운 그림자
  },
  disabledButton: {
    backgroundColor: '#BDC3C7', // 비활성화 상태일 때 버튼 색
  },
  text: {
    color: '#FFF',
    fontSize: 22, // 적당한 크기의 글씨
    fontWeight: 'bold', // 강조된 텍스트
  },
  count: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 10, // 버튼 간의 간격 유지
  },
});

export default CounterButton;
