import React, { createContext, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";

import Main from "./screen/Main";
import HousingList from "./screen/HousingList";
import FinanceList from "./screen/FinanceList";
import LaborList from "./screen/LaborList";
import Detail from "./screen/Detail";
import CalculatorScreen from "./screen/CalculatorScreen";
import ResultScreen from "./screen/ResultScreen";
import Simulation from "./screen/Simulation";
import SimulationList from "./screen/SimulationList";

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
          name="HousingList"
          component={HousingList}
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
          name="FinanceList"
          component={FinanceList}
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
          name="LaborList"
          component={LaborList}
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
        <Stack.Screen
          name="CalculatorScreen"
          component={CalculatorScreen}
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
          name="ResultScreen"
          component={ResultScreen}
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
          name="Simulation"
          component={Simulation}
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
          name="SimulationList"
          component={SimulationList}
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
