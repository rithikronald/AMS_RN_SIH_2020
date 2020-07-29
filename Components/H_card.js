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
  Icon,
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
          <Icon
            type="FontAwesome"
            name={"home"}
            style={{
              fontSize: 50,
              color: "#4a3f35",
              backgroundColor: "#febf63",
              padding: "2%",
              borderRadius: 20,
            }}
          />
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
