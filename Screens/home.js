import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, Text } from "react-native";
import Hcard from "../Components/H_card";
import Clg from "../Components/data/data";
var url = require("../assets/constants").url;
const axios = require("axios");
const visitId = "da4a679b-4416-43a1-925f-c94a74b16c1b";
export default function home({ navigation }) {
  const getCompletedlist = () => {
    axios
      .get(url + "completedschoolsv2/" + visitId)
      .then((res) => {
        // console.log(res.data);

        setCompletedlist(res.data);
        console.log(setCompletedlist);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPendinglist = () => {
    axios
      .get(url + "visitlistv2/" + visitId)
      .then((res) => {
        // console.log(res.data);

        setPendinglist(res.data);
        console.log(pendingList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllquestions = () => {
    axios
      .get(url + "getallquestionsv2/")
      .then((res) => {
        // console.log(res.data);

        setAllquestions(res.data);
        console.log(Questions);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [pendingList, setPendinglist] = useState([]);
  const [completedList, setCompletedlist] = useState([]);
  const [Questions, setAllquestions] = useState([]);

  useEffect(() => {
    getCompletedlist();
    getPendinglist();
    getAllquestions();
    // console.log(pendingList);
    // console.log(completedList);
    // console.log(Questions);
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, padding: "2%", backgroundColor: "#ebecf1" }}
    >
      <Text style={{ fontWeight: "600", fontSize: 30, marginVertical: "4%" }}>
        Pending Schoools
      </Text>
      {pendingList.map((item, i) => {
        return (
          <Hcard
            key={item.visitId}
            title={item.schoolName}
            onPress={() => {
              navigation.push("School Details", {
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
