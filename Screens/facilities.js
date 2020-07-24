import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { Card, Icon } from "native-base";

import cData from "../Components/data/cData";

export default function Facilities({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, padding: "2%", top: 20 }}>
      <FlatList
        data={cData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ opacity: 16 }}
            onPress={() => {
              navigation.push("Questions");
            }}
          >
            <Card
              style={{
                padding: "3%",
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon
                  type="FontAwesome"
                  name={item.icon}
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
                  {item.name}
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

{
  /*
<TouchableOpacity style={{ opacity: 16 }}>
            <Card
              style={{
                padding: "3%",
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon
                  type="FontAwesome"
                  name={item.icon}
                  style={{
                    fontSize: 50,
                    color: "#000",
                    backgroundColor: "#c1c1c1",
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
                  {item.name}
                </Text>
              </View>
            </Card>
          </TouchableOpacity>

*/
}
