import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "native-base";

export default function clgDetails({ route, navigation }) {
  const { title } = route.params;
  const { address } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, padding: "2%", top: 20 }}>
      <Text style={{ fontSize: 30, fontWeight: "600" }}>{title}</Text>
      <View style={{ flex: 1, marginHorizontal: "3%", marginVertical: "15%" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Address:</Text>
        <Text style={{ marginLeft: "3%", margin: "3%", fontSize: 16 }}>
          {address}
        </Text>
        <TouchableOpacity
          style={{
            width: 200,
            height: 50,
            backgroundColor: "#96bb7c",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: "5%",
          }}
          onPress={() => {
            navigation.push("Location");
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Make a Vist</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
