import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  BackHandler,
  Image,
  Alert,
} from "react-native";
import { Thumbnail } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "native-base";
// import MapView from "react-native-maps";
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
        // console.log(allquestionsList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: "1%",
        backgroundColor: "#fff",
      }}
    >
      <Image
        style={{
          alignSelf: "center",
          flex: 1,
          marginTop: "9%",
          padding: 40,
          height: 150,
          width: 270,
        }}
        source={require("../assets/avatar_big.png")}
      />
      <View
        style={{
          flex: 1,
          // alignSelf: "center",
          alignItems: "center",
          // marginVertical: "4%",
          marginHorizontal: "2%",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", alignSelf: "center" }}>
          {schoolName}
        </Text>

        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{
            // marginLeft: "3%",
            // margin: "3%",
            fontSize: 20,
            alignSelf: "center",
            marginHorizontal: "5%",

            // marginVertical: "4%",
          }}
        >
          {schoolAddress}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: 250,
          height: 60,
          //backgroundColor: "#96bb7c",
          backgroundColor: "#8964e0",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          bottom: 50,
          justifyContent: "flex-end",
          paddingBottom: "5%",
        }}
        onPress={() => {
          navigation.push("Facilities", { visitId: visitId });
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 18,

            // alignSelf: "cent
            // marginBottom: 18,
            // textAlign: "center",
          }}
        >
          Make a Visit
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/*
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



         <View
        style={{
          flex: 1,
          alignSelf: "center",
          marginVertical: "4%",
          marginHorizontal: "2%",
        }}
      >
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
      </View>

*/
