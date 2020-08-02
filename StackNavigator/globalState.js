import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";

// import Axios from "axios";
const url = require("../assets/constants").url;
const axios = require("axios");
export const GlobalContext = createContext();

export const GlobalState = (props) => {
  const [finalReport, setFinalReport] = useState([]);
  const [finalReview, setFinalReview] = useState([]);
  const [schoolData, SetSchoolData] = useState([]);
  const [allquestionsList, setallquestionsList] = useState([]);
  const [categories, setCategories] = useState([]);

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
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  const categoryFilled = finalReport.map(({ categoryName }) => categoryName);

  const [allFilled, setAllFilled] = useState(false);

  useEffect(() => {
    setAllFilled(categoryFilled.length === categories.length);
  }, [categoryFilled]);

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
        storeLocal,
        schoolData,
        SetSchoolData,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
