import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../StackNavigator/globalState";
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from "react-native";
const axios = require("axios");
var url = require("../assets/constants").url;

import { Card, Icon } from "native-base";

import cData from "../Components/data/cData";

export default function Facilities({ route, navigation }) {
  const { visitId } = route.params;
  const {
    isCategoryFilled,
    categories,
    setCategories,
    allFilled,
    postreport,
  } = useContext(GlobalContext);

  useEffect(() => {
    axios
      .get(url + "getcategories")
      .then((d) => {
        setCategories(d.data);
        console.log(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: "2%" }}>
      <ScrollView>
        {categories.map((item, i) => {
          const alreadyFilled = isCategoryFilled(item.categoryName);
          return (
            <TouchableOpacity
              key={item._id}
              disabled={alreadyFilled}
              style={{ opacity: alreadyFilled ? 0.5 : 1, marginBottom: 5 }}
              onPress={() => {
                navigation.push("Questions", {
                  categoryName: item.categoryName,
                });
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
                    {item.categoryName}
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={{
            width: "80%",
            height: 50,
            backgroundColor: "#96bb7c",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            alignSelf: "center",
            margin: "3%",
            padding: "2%",
          }}
          disabled={!allFilled}
          onPress={() => {
            postreport(visitId);
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
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

/*
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

*/
