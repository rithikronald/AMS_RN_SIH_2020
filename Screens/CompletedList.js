import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Hcard from "../Components/H_card";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";
import { GlobalContext } from "../StackNavigator/globalState";
import Feather from "react-native-vector-icons/Feather";

export default function home({ navigation }) {
  const { completedList } = useContext(GlobalContext);

  useEffect(() => {
    // NetInfo.fetch().then((state) => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
    //   console.log("Is internet available?", state.isInternetReachable);
    //   isInternetavailable(state.isInternetReachable);
    // });
    // checkInitialactivity();
    // getAllKeys();
    // getCompletedlist();
    // getPendinglist();
    // getAllquestions();
    // console.log(pendingList);
    // console.log(completedList);
    // console.log(Questions);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: "3%", backgroundColor: "#fff" }}>
      <ScrollView>
        {completedList.map((item, i) => {
          return (
            <Hcard
              key={item.visitId}
              title={item.schoolName}
              Address={item.schoolAddress}
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
        <TouchableOpacity
          style={{
            backgroundColor: "#8964e0",
            width: 58,
            height: 58,
            borderRadius: 150 / 2,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "flex-end",
          }}
          onPress={() => {
            navigation.pop();
          }}
        >
          <Feather name="arrow-right" size={30} color="#FBFCFF" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
