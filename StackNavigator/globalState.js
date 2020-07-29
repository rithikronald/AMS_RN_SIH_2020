import React, { useState, createContext } from "react";
import Axios from "axios";
const url = require("../assets/constants").url;

export const GlobalContext = createContext();

export const GlobalState = (props) => {
  const [finalReport, setFinalReport] = useState([]);
  const [finalReview, setFinalReview] = useState([]);
  function postreport(finalReport, finalReview, visitId) {
    axios
      .post(url + "postreport/" + visitId, {
        reportData: finalReport,
        remarks: finalReview,
      })
      .then((d) => {
        console.log(d);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <GlobalContext.Provider
      value={{ finalReport, setFinalReport, finalReview, setFinalReview }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
