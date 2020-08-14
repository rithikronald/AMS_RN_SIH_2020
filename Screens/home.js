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

var url = require("../assets/constants").url;
const axios = require("axios");
const mId = "da4a679b-4416-43a1-925f-c94a74b16c1b";
export default function home({ navigation }) {
  const {
    getLocalallquestionsList,
    allquestionsList,
    setallquestionsList,
    storeLocal,
    finalReport,
    setFinalReport,
    finalReview,
    setFinalReview,
    completedList,
    setCompletedlist,
  } = useContext(GlobalContext);
  const getCompletedlist = () => {
    axios
      .get(url + "completedschoolsv2/" + mId)
      .then((res) => {
        // console.log(res.data);

        setCompletedlist(res.data);
        console.log(setCompletedlist);
        console.log("setting state from api call");
        storeLocal(res.data, "completedList");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPendinglist = () => {
    axios
      .get(url + "visitlistv2/" + mId)
      .then((res) => {
        // console.log(res.data);

        setPendinglist(res.data);
        console.log(pendingList);
        console.log("setting state from api call");
        storeLocal(res.data, "pendingList");
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
        storeLocal(res.data, "allquestionsList");

        setallquestionsList(res.data);
        // console.log(allquestionsList);
        console.log("setting state from api call");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLocalpendinglist = async () => {
    try {
      const localPendinglist = await AsyncStorage.getItem("@pendingList");
      if (localPendinglist !== null) {
        console.log(JSON.parse(localPendinglist));
        setPendinglist(JSON.parse(localPendinglist));
        console.log("retriving data from localPendinglist");
      } else console.log("nothing is there in localPending list");
    } catch (error) {
      console.log("Error retrieving Localpendinglist");
      console.log(error);
    }
  };

  const getLocalcompletedlist = async () => {
    try {
      const localcompletedList = await AsyncStorage.getItem("@completedList");
      if (localcompletedList !== null) {
        console.log(JSON.parse(localcompletedList));
        setCompletedlist(JSON.parse(localcompletedList));
        console.log("retriving data from localcompletedList");
      } else console.log("nothing is there in localcompletedList");
    } catch (error) {
      console.log("Error retrieving localcompletedList");
      console.log(error);
    }
  };

  const isInternetavailable = (isInternetavailable) => {
    if (isInternetavailable) {
      getCompletedlist();
      getPendinglist();
      getAllquestions();
    } else {
      getLocalpendinglist();
      getLocalcompletedlist();
      getLocalallquestionsList();
      // getLocalquestions();
    }
  };

  const checkInitialactivity = async () => {
    try {
      const Data = await AsyncStorage.getItem("@isEngaged");
      const obj = JSON.parse(Data);
      if (Data !== null) {
        console.log(obj);
        setFinalReport(obj.reportState);
        setFinalReview(obj.reviewState);
      } else console.log("visitor is not engaged");
    } catch (error) {
      console.log("Error retrieving odjData");
      console.log(error);
    }
  };
  const [pendingList, setPendinglist] = useState([]);

  const getAllKeys = async () => {
    let keys = [];
    try {
      await AsyncStorage.removeItem("@isEngaged");

      keys = await AsyncStorage.getAllKeys();
      console.log(keys);
    } catch (e) {
      // read key error
    }
  };

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      // console.log("Is internet available?", state.isInternetReachable);
      isInternetavailable(state.isInternetReachable);
    });
    checkInitialactivity();
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
      {/*
      <Text
      style={{
        fontWeight: "bold",
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: "4%",
      }}
    >
      Pending Schools
    </Text>*/}
      <ScrollView>
        {pendingList.map((item, i) => {
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
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: "#8964e0",
          width: 58,
          height: 58,
          borderRadius: 150 / 2,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "flex-end",
          // marginTop: "10%"
        }}
        onPress={() => {
          navigation.push("Completed Visits");
        }}
      >
        <Feather name="arrow-right" size={30} color="#FBFCFF" />
      </TouchableOpacity>
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
