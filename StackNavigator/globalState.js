import React, { useState, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalState = (props) => {
  const [finalReport, setFinalReport] = useState([]);
  const [finalReview, setFinalReview] = useState([]);

  return (
    <GlobalContext.Provider
      value={{ finalReport, setFinalReport, finalReview, setFinalReview }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
