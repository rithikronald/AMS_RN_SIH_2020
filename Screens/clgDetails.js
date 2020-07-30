import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  BackHandler,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "native-base";
import { url } from "../assets/constants";
const axios = require("axios");

export default function clgDetails({ route, navigation }) {
  const { schoolName, schoolId, visitId } = route.params;

  const [schoolAddress, setSchoolAddress] = useState([]);

  useEffect(() => {
    axios
      .get(url + "getaddress/" + schoolId)
      .then((d) => {
        setSchoolAddress(d.data.schoolAddress);
        console.log(schoolAddress);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, padding: "2%", top: 20 }}>
      <Text style={{ fontSize: 30, fontWeight: "600" }}>{schoolName}</Text>
      <View style={{ flex: 1, marginHorizontal: "3%", marginVertical: "15%" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Address:</Text>
        <Text style={{ marginLeft: "3%", margin: "3%", fontSize: 16 }}>
          {schoolAddress}
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
            navigation.push("Location", { visitId: visitId });
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Make a Vist</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
