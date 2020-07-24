import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import {
  Card,
  Thumbnail,
  Left,
  Body,
  CardItem,
  Content,
  List,
  ListItem,
} from "native-base";

export default function Hcard(props) {
  return (
    <TouchableOpacity style={{ opacity: 16 }} onPress={props.onPress}>
      <Card
        style={{
          padding: "3%",
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Thumbnail source={{ uri: props.logo }} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              flexWrap: "wrap",
              flex: 1,
              marginLeft: "4%",
              alignSelf: "center",
            }}
          >
            {props.title}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
