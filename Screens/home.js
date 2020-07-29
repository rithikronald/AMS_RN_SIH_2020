import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView } from "react-native";
import Hcard from "../Components/H_card";
import Clg from "../Components/data/data";
var url = require("../assets/constants").url;
const axios = require("axios");
export default function home({ navigation }) {
  const [schoolsList, setSchools] = useState([]);

  useEffect(() => {
    axios
      .get(url + "visitlist/da4a679b-4416-43a1-925f-c94a74b16c1b")
      .then((d) => {
        setSchools(d.data);
        console.log(schoolsList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: "2%", top: 20 }}>
      {schoolsList.map((item, i) => {
        return (
          <Hcard
            key={item.schoolId}
            title={item.schoolName}
            onPress={() => {
              navigation.push("ClgDetails", {
                schoolName: item.schoolName,
                schoolId: item.schoolId,
                visitId: item.visitId,
              });
            }}
          />
        );
      })}
    </SafeAreaView>
  );
}
/*
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
*/
