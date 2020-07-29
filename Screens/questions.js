import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Modal,
  ToastAndroid,
  TextInput,
} from "react-native";
import { Card, Icon, Item, Right, Toast } from "native-base";
import questions from "../Components/data/questionData";
import { RadioButton } from "react-native-paper";
import { GlobalContext } from "../StackNavigator/globalState";

export default function Questions({ route, navigation }) {
  const {
    finalReport,
    setFinalReport,
    finalReview,
    setFinalReview,
  } = useContext(GlobalContext);
  const { categoryName } = route.params;
  const [review, setReview] = useState();

  const [answersState, setAnswersState] = useState([
    ...questions.map((q) =>
      Object.assign({
        answer: null,
        question: q.question,
        qType: q.qType,
      })
    ),
  ]);

  const [modal, setModal] = useState(false);

  function Toast() {
    ToastAndroid.show("Report Submitted Sucessfully ", ToastAndroid.SHORT);
  }
  function allChecked() {
    // setReport((prev) => {
    //   prev.fieldData.push(answersState);
    // });
    //  setReport({
    //   categoryName: categoryName,
    //   fieldData: answersState,
    // });
    setFinalReport((prev) => [
      ...prev,
      {
        categoryName: categoryName,
        fieldData: answersState,
      },
    ]);
    setModal(true);
  }
  useEffect(() => {
    console.log(finalReport);

    //console.log(answersState);
  }, [finalReport]);
  useEffect(() => {
    console.log(finalReview);

    //console.log(answersState);
  }, [finalReview]);

  useEffect(() => {
    //console.log(answersState);
  }, [answersState]);
  return (
    <View style={{ flex: 1, padding: "2%" }}>
      <FlatList
        data={[...questions]}
        renderItem={({ item, index }) => (
          <Card
            style={{ flex: 1, margin: "3%", borderRadius: 16, padding: "3%" }}
          >
            <Text style={{ fontSize: 24 }}>{item.question}</Text>
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
              ) : (
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
                  multiline={true}
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
              )}
            </View>
          </Card>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={{
              width: "60%",
              height: 50,
              backgroundColor: "#96bb7c",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              alignSelf: "center",
              margin: "3%",
            }}
            onPress={allChecked}
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
            top: 200,
            backgroundColor: "#ebecf1",
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
          <TouchableOpacity
            style={{
              width: "60%",
              height: 50,
              backgroundColor: "#96bb7c",
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
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>Done</Text>
          </TouchableOpacity>
        </Card>
      </Modal>
    </View>
  );
}
