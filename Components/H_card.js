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
import Feather from "react-native-vector-icons/Feather";

export default function Hcard(props) {
  const dt = Date(props.date);
  return (
    <TouchableOpacity
      style={{
        opacity: 16,
        backgroundColor: "#FBFCFF",
        //backgroundColor: "#dododo",
        marginVertical: "2%",
        padding: "1%",
        margin: "0.8%",
        elevation: 7,
        borderRadius: 10,
        shadowOffset: 8,
        shadowRadius: 7,
        shadowOpacity: 0.8,
        borderColor: "#ddd",
        borderWidth: 0.5,
        borderBottomWidth: 0,
        flexDirection: "row",
        // shadowColor: "#000",
      }}
      /* {
          backgroundColor: '#FBFCFF',
          margin: '3%',
          // minHeight: "10%",
          padding: '3%',
          borderRadius: 6,
          borderWidth: 0.5,
          borderColor: '#ddd',
          borderBottomWidth: 0,
          shadowColor: '#000',
          shadowOffset: {width: 5, height: 8},
          shadowOpacity: 0.8,
          shadowRadius: 7,
          elevation: 6,
        }*/
      onPress={props.onPress}
    >
      <Thumbnail
        style={{ alignSelf: "center", margin: "0.8%", flex: 1 }}
        large
        source={require("../assets/purple.png")}
      />
      <View style={{ flex: 3 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            flexWrap: "wrap",
            flex: 1,
            marginLeft: "4%",
          }}
        >
          {props.title}
        </Text>
        <Text style={{ fontSize: 14, marginLeft: "4%", padding: "2%" }}>
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
    </TouchableOpacity>
  );
}
