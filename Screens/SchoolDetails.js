import React, { useState, useEffect, useContext } from "react";
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
import MapView from "react-native-maps";
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
        console.log(allquestionsList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: "2%",
        backgroundColor: "#f7f7f7",
      }}
    >
      <View style={{ flex: 1, marginVertical: "4%", marginHorizontal: "2%" }}>
        <Text style={{ fontSize: 30, fontWeight: "600", marginVertical: "4%" }}>
          {schoolName}
        </Text>
        <Text
          style={{ fontSize: 20, fontWeight: "bold", marginVertical: "4%" }}
        >
          Address:
        </Text>
        <Text
          style={{
            marginLeft: "3%",
            margin: "3%",
            fontSize: 20,
            marginVertical: "4%",
          }}
        >
          {schoolAddress}
        </Text>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{
            width: "90%",
            height: "40%",
            alignSelf: "center",
            margin: "4%",
            borderRadius: 20,
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          width: 250,
          height: 60,
          //backgroundColor: "#96bb7c",
          backgroundColor: "#ffbe00",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: "5%",
          borderRadius: 16,
          bottom: 50,
        }}
        onPress={() => {
          navigation.push("Facilities", { visitId: visitId });
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Make a Vist</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
