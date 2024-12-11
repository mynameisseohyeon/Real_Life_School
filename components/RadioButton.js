import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton = ({ selected, onChange, options }) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.option, selected === option && styles.selectedOption]}
          onPress={() => onChange(option)}
        >
          <Text style={[styles.text, selected === option && styles.selectedText]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  option: {
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f2f2f2', // 기본 배경 색상
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치
    shadowOpacity: 0.3, // 그림자 불투명도
    shadowRadius: 4, // 그림자 반경
    elevation: 5, // Android에서 그림자 효과를 위한 속성
  },
  selectedOption: {
    backgroundColor: '#A9B6C4', // 선택 시 배경 색상
  },
  text: {
    color: '#000', // 기본 텍스트 색상
  },
  selectedText: {
    color: '#fff', // 선택 시 텍스트 색상
  },
});

export default RadioButton;
