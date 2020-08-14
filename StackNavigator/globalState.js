import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from "@react-native-community/netinfo";
const url = require("../assets/constants").url;
const axios = require("axios");
export const GlobalContext = createContext();

export const GlobalState = (props) => {
  const [finalReport, setFinalReport] = useState([]);
  const [finalReview, setFinalReview] = useState([]);
  const [schoolData, SetSchoolData] = useState([]);
  const [allquestionsList, setallquestionsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [completedList, setCompletedlist] = useState([]);

  function postreport(visitId) {
    axios
      .post(url + "postreport/" + visitId, {
        reportData: finalReport,
        remarks: finalReview,
      })
      .then((d) => {
        console.log(d);
        setFinalReport([]);
        setFinalReview([]);
        deleteLocal();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const deleteLocal = async () => {
    let keys = [];
    try {
      await AsyncStorage.removeItem("@isEngaged");

      keys = await AsyncStorage.getAllKeys();
      console.log(keys);
    } catch (e) {
      // read key error
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

  const mergeIsengaged = async (obj) => {
    try {
      await AsyncStorage.mergeItem("@isEngaged", JSON.stringify(obj));

      // read merged item
      const currentStatus = await AsyncStorage.getItem("@isEngaged");

      console.log(currentStatus);
    } catch (error) {
      console.log("Error merging ");
      console.log(error);
    }
  };
  const unsubscribe = NetInfo.addEventListener((state) => {
    console.log("Connection type", state.type);
    // console.log("Is connected?", state.isConnected);
    console.log("Is connected?", state.isInternetReachable);
    if (state.isInternetReachable) {
    }
  });

  const categoryFilled = finalReport.map(({ categoryName }) => categoryName);

  const [allFilled, setAllFilled] = useState(false);

  useEffect(() => {
    setAllFilled(categoryFilled.length === categories.length);
  }, [categoryFilled]);

  useEffect(() => {
    unsubscribe();
  });

  const isCategoryFilled = (category) => {
    return categoryFilled.includes(category);
  };
  return (
    <GlobalContext.Provider
      value={{
        finalReport,
        setFinalReport,
        finalReview,
        setFinalReview,
        isCategoryFilled,
        categories,
        setCategories,
        allFilled,
        postreport,
        getLocalallquestionsList,
        allquestionsList,
        setallquestionsList,
        deleteLocal,
        storeLocal,
        schoolData,
        SetSchoolData,
        completedList,
        setCompletedlist,
        mergeIsengaged,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

/*
 Alert.alert(
              "No Internet Connection Found!",
              "Data will be uploaded when the internet connection is found",
              [
                {
                  text: "Cancel",
                  onPress: () => null,
                  style: "cancel",
                },
                {
                  text: "YES",
                  onPress: () => {
                    setTimeout(() => {
                      postreport(visitId);
                      alert("ReportData has been uploaded successfully!");
                    }, 20000);
                  },
                },
              ]
            );
*/
