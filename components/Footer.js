// Footer.js

import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TabBar, TabButton, TabIcon } from "../components/Style";

export default function Foter() {
  const [selectedTab, setSelectedTab] = useState("home");

  <TabBar>
    <TabButton
      active={selectedTab === "home"}
      onPress={() => setSelectedTab("home")}
    >
      <TabIcon>
        <Ionicons
          name="home"
          size={24}
          color={selectedTab === "home" ? "#3D0F2F" : "#BFBFBF"}
        />
      </TabIcon>
    </TabButton>
    <TabButton
      active={selectedTab === "search"}
      onPress={() => setSelectedTab("search")}
    >
      <TabIcon>
        <Ionicons
          name="search"
          size={24}
          color={selectedTab === "search" ? "#3D0F2F" : "#BFBFBF"}
        />
      </TabIcon>
    </TabButton>
    <TabButton
      active={selectedTab === "profile"}
      onPress={() => setSelectedTab("profile")}
    >
      <TabIcon>
        <Ionicons
          name="person"
          size={24}
          color={selectedTab === "profile" ? "#3D0F2F" : "#BFBFBF"}
        />
      </TabIcon>
    </TabButton>
  </TabBar>;
}
