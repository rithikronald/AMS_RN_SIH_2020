import React, { useState, useEffect, useContext } from "react";
import { FlatList, SafeAreaView, Text, AsyncStorage } from "react-native";
import Hcard from "../Components/H_card";
import Clg from "../Components/data/data";
var url = require("../assets/constants").url;
import { GlobalContext } from "../StackNavigator/globalState";
const axios = require("axios");
export default function home({ navigation }) {
  const { SetAllQuestions, schoolData, SetSchoolData } = useContext(
    GlobalContext
  );

  useEffect(() => {
    axios
      .get(url + "visitlistv2/da4a679b-4416-43a1-925f-c94a74b16c1b")
      .then((d) => {
        AsyncStorage.setItem("schoolDetails", JSON.stringify(d.data));
        console.log("school data stored succesfully in the async storage");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(url + "getallquestionsv2")
      .then((d) => {
        AsyncStorage.setItem("AllQuestions", JSON.stringify(d.data));
        console.log("questions data stored succesfully in the async storage");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const loadSchoolData = async () => {
    try {
      let details = await AsyncStorage.getItem("schoolDetails");
      if (details != null) {
        SetSchoolData(JSON.parse(details));
        console.log("School data retrived successfully");
      }
    } catch (err) {
      console.log("error");
    }
  };

  const loadQuestionData = async () => {
    try {
      let questionData = await AsyncStorage.getItem("AllQuestions");
      if (questionData != null) {
        SetAllQuestions(JSON.parse(questionData));
        console.log("questionData retrived successfully");
        console.log(questionData);
      }
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    loadSchoolData();
    loadQuestionData();
  }, []);

  // clearAll = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log("Done.");
  //   } catch (e) {
  //     // clear error
  //   }
  // };

  return (
    <SafeAreaView
      style={{ flex: 1, padding: "2%", backgroundColor: "#ebecf1" }}
    >
      <Text style={{ fontWeight: "600", fontSize: 30, marginVertical: "4%" }}>
        Pending Schoools
      </Text>
      {schoolData.map((item, i) => {
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
