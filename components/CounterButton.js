import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CounterButton = ({ count, onChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
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
    width: 30,
    height: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 15,
  },
  text: {
    color: '#FFF',
    fontSize: 20,
  },
  count: {
    fontSize: 20,
  },
});

export default CounterButton;
