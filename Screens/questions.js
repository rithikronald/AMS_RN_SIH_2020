import React, { useState, useEffect, useContext, useRef } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Modal,
  ToastAndroid,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Card, Icon, Item, Right, Toast } from "native-base";
import questions from "../Components/data/questionData";
import axios from "axios";
import { url } from "../assets/constants";
import { RadioButton } from "react-native-paper";
import { GlobalContext } from "../StackNavigator/globalState";
import AsyncStorage from "@react-native-community/async-storage";

export default function Questions({ route, navigation }) {
  const { visitId } = route.params;

  const {
    finalReport,
    setFinalReport,
    finalReview,
    setFinalReview,
    mergeIsengaged,
    allquestionsList,
    setallquestionsList,
  } = useContext(GlobalContext);

  const { categoryName, questionsArray, visibleForTeachers } = route.params;
  const [review, setReview] = useState();

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    var ans = answersState.filter((p) => {
      p.answer === null;
    });
    console.log("IUEYEYGFE", ans.length);
    if (ans.length === 0) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [answersState]);

  const [Questions, setQuestions] = useState([]);
  const getQuestions = () => {
    axios
      .get(url + "getquestions/?categoryName=" + categoryName)
      .then((res) => {
        console.log(res.data);
        setAnswersState([
          ...res.data.questions
            .sort((a, b) => b.qType > a.qType)
            .map((q) =>
              Object.assign({
                answer: null,
                question: q.question,
                qType: q.qType,
              })
            ),
        ]);
        setQuestions(res.data.questions.sort((a, b) => b.qType > a.qType));
        console.log(Questions);
      });
  };

  // const mergeIsengaged = async (obj) => {
  //   try {
  //     await AsyncStorage.mergeItem("@isEngaged", JSON.stringify(obj));

  //     // read merged item
  //     const currentStatus = await AsyncStorage.getItem("@isEngaged");

  //     console.log(currentStatus);
  //   } catch (error) {
  //     console.log("Error merging ");
  //     console.log(error);
  //   }
  // };

  const [answersState, setAnswersState] = useState([]);

  const [modal, setModal] = useState(false);
  const answersRef = useRef([]);
  useEffect(() => {
    setAnswersState([
      ...questionsArray.questions
        .sort((a, b) => b.qType > a.qType)
        .map((q) =>
          Object.assign({
            answer: null,
            question: q.question,
            qType: q.qType,
          })
        ),
    ]);
    setQuestions(questionsArray.questions.sort((a, b) => b.qType > a.qType));

    // getQuestionsv2();
    // console.log(Questions);
    // console.log(answersState);
  }, []);

  useEffect(() => {
    // console.log(finalReview);
    mergeIsengaged({
      visitId: visitId,
      reviewState: finalReview,
    });
  }, [finalReview]);

  useEffect(() => {
    // console.log(finalReport);
    mergeIsengaged({
      visitId: visitId,
      reportState: finalReport,
    });
  }, [finalReport]);

  function Toast() {
    ToastAndroid.show("Report Submitted Sucessfully ", ToastAndroid.SHORT);
  }

  function allChecked() {
    setFinalReport((prev) => [
      ...prev,
      {
        visibleForTeachers,
        categoryName: categoryName,
        fieldData: answersState,
      },
    ]);
    setModal(true);
  }

  return (
    <View style={{ flex: 1, padding: "2%", backgroundColor: "#fff" }}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "700",
          margin: "2%",
        }}
      >
        {categoryName}
      </Text>
      <FlatList
        data={[...Questions]}
        keyExtractor={(item) => item.question}
        renderItem={({ item, index }) => (
          <Card
            style={{
              flex: 1,
              margin: "3%",
              padding: "3%",
              backgroundColor: "#DCE3E6",
              borderRadius: 20,
            }}
            key={item.key}
          >
            <Text style={{ fontSize: 20, margin: "1%" }}>{item.question}</Text>
            <View
              style={{
                marginHorizontal: "4%",
                flexDirection: "row",
                marginVertical: "2%",
              }}
            >
              {item.qType == 0 ? (
                <RadioButton.Group
                  onValueChange={(value) => {
                    setAnswersState((prev) => {
                      return [
                        ...prev.map((p, ind) =>
                          ind === index
                            ? Object.assign(p, {
                                answer: value,
                              })
                            : p
                        ),
                      ];
                    });
                  }}
                  value={answersState[index].answer}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: "2%",
                    }}
                  >
                    <RadioButton value={1} />
                    <Text>1</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: "2%",
                    }}
                  >
                    <RadioButton value={2} />
                    <Text>2</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: "2%",
                    }}
                  >
                    <RadioButton value={3} />
                    <Text>3</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: "2%",
                    }}
                  >
                    <RadioButton value={4} />
                    <Text>4</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: "2%",
                    }}
                  >
                    <RadioButton value={5} />
                    <Text>5</Text>
                  </View>
                </RadioButton.Group>
              ) : item.qType == 1 ? (
                <TextInput
                  style={{
                    flex: 1,
                    backgroundColor: "#ebecf1",
                    borderWidth: 2,
                    borderRadius: 10,
                    fontSize: 18,
                    padding: "3%",
                    borderColor: "#c1c1c1",
                  }}
                  value={answersState[index].answer}
                  multiline={true}
                  // defaultValue={answersState[index].answer}
                  onChangeText={(text) => {
                    setAnswersState((prev) => {
                      return [
                        ...prev.map((p, ind) =>
                          ind === index ? Object.assign(p, { answer: text }) : p
                        ),
                      ];
                    });
                  }}
                />
              ) : (
                <RadioButton.Group
                  onValueChange={(value) => {
                    setAnswersState((prev) => {
                      return [
                        ...prev.map((p, ind) =>
                          ind === index
                            ? Object.assign(p, {
                                answer: value,
                              })
                            : p
                        ),
                      ];
                    });
                  }}
                  value={answersState[index].answer}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: "2%",
                    }}
                  >
                    <RadioButton value={3} />
                    <Text>Yes</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: "2%",
                    }}
                  >
                    <RadioButton value={1} />
                    <Text>No</Text>
                  </View>
                </RadioButton.Group>
              )}
            </View>
          </Card>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={{
              width: "60%",
              height: 50,
              // backgroundColor: "#96bb7c",
              backgroundColor: "#8964e0",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              alignSelf: "center",
              margin: "3%",
            }}
            onPress={allChecked}
            disabled={
              answersState.filter((p) => {
                return p.answer === null;
              }).length > 0
            }
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>Next</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        style={{
          alignSelf: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Card
          style={{
            alignSelf: "center",
            justifyContent: "center",
            padding: "3%",
            borderRadius: 10,
            top: 120,
            backgroundColor: "#DCE3E6",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", margin: "2%" }}>
            Feedback
          </Text>
          <TextInput
            style={{
              height: 200,
              width: 300,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 22,
              fontSize: 18,
              padding: "2%",
              backgroundColor: "#fff",
            }}
            editable={true}
            multiline={true}
            onChangeText={(text) => {
              setReview(text);
            }}
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                width: "30%",
                height: 50,
                backgroundColor: "#8964e0",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                alignSelf: "center",
                margin: "3%",
                padding: "2%",
              }}
              onPress={() => {
                setFinalReview((prev) => [
                  ...prev,
                  {
                    categoryName: categoryName,
                    message: review,
                  },
                ]);
                navigation.pop();
                //setModal(false);
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20 }}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "30%",
                height: 50,
                backgroundColor: "#ff5f40",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                alignSelf: "center",
                margin: "3%",
                padding: "2%",
              }}
              onPress={() => {
                setModal(false);
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </Modal>
    </View>
  );
}
