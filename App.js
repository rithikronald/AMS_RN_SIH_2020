import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView } from "react-native";
import Stack from "./StackNavigator/homeStack";
import { GlobalState } from "./StackNavigator/globalState";

export default function App() {
  return (
    <GlobalState>
      <Stack />
    </GlobalState>
  );
}
