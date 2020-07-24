import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView } from "react-native";
import Hcard from "../Components/H_card";
import Clg from "../Components/data/data";

export default function home({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, padding: "2%", top: 20 }}>
      <FlatList
        data={Clg}
        renderItem={({ item }) => (
          <Hcard
            title={item.title}
            logo={item.photo}
            onPress={() => {
              navigation.push("ClgDetails", {
                title: item.title,
                address: item.address,
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}
