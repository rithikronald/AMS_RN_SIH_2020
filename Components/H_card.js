import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Right, ScrollView } from "react-native";
import {
  Card,
  Thumbnail,
  Left,
  Body,
  CardItem,
  Content,
  List,
  ListItem,
  Icon,
} from "native-base";

export default function Hcard(props) {
  const dt = Date(props.date);
  return (
    <TouchableOpacity
      style={{
        opacity: 16,
        backgroundColor: "#fff",
        marginVertical: "1%",
        padding: "2%",
      }}
      onPress={props.onPress}
    >
      <View style={{ flexDirection: "row", padding: "2%" }}>
        <Thumbnail
          large
          source={{
            uri:
              "https://freepikpsd.com/wp-content/uploads/2019/10/elementary-school-png-6-Transparent-Images.png",
          }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              flexWrap: "wrap",
              flex: 1,
              marginLeft: "3%",
            }}
          >
            {props.title}
          </Text>
          <Text style={{ fontSize: 14, marginLeft: "7%", padding: "2%" }}>
            {props.Address}
          </Text>
          <Text
            style={{
              alignSelf: "flex-end",
              marginVertical: "1%",
              marginLeft: "4%",
              fontSize: 9,
            }}
          >
            {dt.toString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
