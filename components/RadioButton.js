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
          <Text style={styles.text}>{option}</Text>
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
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: '#007BFF',
  },
  text: {
    color: '#000',
  },
});

export default RadioButton;
