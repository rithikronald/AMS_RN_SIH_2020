import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Modal,
  ToastAndroid,
  TextInput,
  Animated,
} from "react-native";
import { Card, Icon, Item, Right, Toast } from "native-base";
import questions from "../Components/data/questionData";
import { RadioButton } from "react-native-paper";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Button } from "native-base";

export default function Questions({ navigation }) {
  const [q1, setQ1] = useState("first");
  const [q2, setQ2] = useState("first");
  const [q3, setQ3] = useState("first");
  const [q4, setQ4] = useState("first");
  const [q5, setQ5] = useState("first");
  const [modal, setModal] = useState(false);

  function Toast() {
    ToastAndroid.show("Report Submitted Sucessfully ", ToastAndroid.SHORT);
  }
  return (
    <View style={{ flex: 1, padding: "2%" }}>
      <FlatList
        data={questions}
        renderItem={({ item }) => (
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
              <RadioButton.Group
                onValueChange={(value) => {
                  if (item.Key == 1) {
                    setQ1(value);
                  } else if (item.key == 2) {
                    setQ2(value);
                  } else if (item.key == 3) {
                    setQ3(value);
                  } else if (item.key == 4) {
                    setQ4(value);
                  } else if (item.key == 5) {
                    setQ5(value);
                  }
                }}
                value={q1}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: "2%",
                  }}
                >
                  <RadioButton value="first" />
                  <Text>1</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: "2%",
                  }}
                >
                  <RadioButton value="second" />
                  <Text>2</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: "2%",
                  }}
                >
                  <RadioButton value="third" />
                  <Text>3</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: "2%",
                  }}
                >
                  <RadioButton value="forth" />
                  <Text>4</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: "2%",
                  }}
                >
                  <RadioButton value="forth" />
                  <Text>5</Text>
                </View>
              </RadioButton.Group>
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
            onPress={() => {
              setModal(true);
            }}
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
              Toast();
              setModal(false);
              navigation.pop();
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>Submitted</Text>
          </TouchableOpacity>
        </Card>
      </Modal>
    </View>
  );
}
