import React, { useState, useEffect, useContext } from "react";
import { FlatList, SafeAreaView, Text } from "react-native";
import Hcard from "../Components/H_card";
// import Clg from "../Components/data/data";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";
import { GlobalContext } from "../StackNavigator/globalState";

var url = require("../assets/constants").url;
const axios = require("axios");
const visitId = "da4a679b-4416-43a1-925f-c94a74b16c1b";
export default function home({ navigation }) {
  const { allquestionsList, setallquestionsList } = useContext(GlobalContext);
  const getCompletedlist = () => {
    axios
      .get(url + "completedschoolsv2/" + visitId)
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
      .get(url + "visitlistv2/" + visitId)
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

        setallquestionsList(res.data);
        console.log(allquestionsList);
        console.log("setting state from api call");
        storeLocal(res.data, "allquestionsList");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const storeLocal = async (value, name) => {
    try {
      await AsyncStorage.setItem("@" + name, JSON.stringify(value)).then(
        console.log("storing local" + name)
      );
    } catch (e) {
      // saving error
      console.log("error in storing local" + name);
      console.log(e);
    }
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
  const getLocalallquestionsList = async () => {
    try {
      const allquestionsList = await AsyncStorage.getItem("@allquestionsList");
      if (allquestionsList !== null) {
        console.log(JSON.parse(allquestionsList));
        setallquestionsList(JSON.parse(allquestionsList));
        console.log("retriving data from localallquestionsList");
      } else console.log("nothing is there in localallquestionsList");
    } catch (error) {
      console.log("Error retrieving localallquestionsList");
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
    }
  };

  const [pendingList, setPendinglist] = useState([]);
  const [completedList, setCompletedlist] = useState([]);
  // const [allquestionsList, setallquestionsList] = useState([]);

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      console.log("Is internet available?", state.isInternetReachable);

      isInternetavailable(state.isInternetReachable);
    });
    // getCompletedlist();
    // getPendinglist();
    // getAllquestions();
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
      {completedList.map((item, i) => {
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
