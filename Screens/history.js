import React, { useState, useEffect } from "react";
import { View, Text, BackHandler, Alert, ToastAndroid } from "react-native";
import Hcard from "../Components/H_card";

export default function CurrLocation({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Hcard title={"Don Bosco"} onPress={() => {}} />
    </View>
  );
}
