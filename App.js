import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";

import Main from "./screen/Main";
import DetailList from "./screen/DetailList";
import Detail from "./screen/Detail";

// npm install @react-navigation/native
// npm install @react-navigation/stack

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailList"
          component={DetailList}
          options={({ navigation }) => ({
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.goBack()}
                tintColor="#888"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={({ navigation }) => ({
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.goBack()}
                tintColor="#888"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
