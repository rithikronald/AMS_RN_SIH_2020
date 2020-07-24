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
} from "react-native";
import { Card, Icon, Item, Right, Toast } from "native-base";
import questions from "../Components/data/questionData";
import { RadioButton } from "react-native-paper";
import { Button } from "native-base";
export default function Questions({ navigation }) {
  const [value, setValue] = useState("first");
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
            <View style={{ marginHorizontal: "8%" }}>
              <RadioButton.Group
                onValueChange={(value) => setValue(value)}
                value={value}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="first" />
                  <Text>Vgood</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="second" />
                  <Text>Good</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="third" />
                  <Text>Satisfied</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="forth" />
                  <Text>Bad</Text>
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
              navigation.popToTop();
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>Submitted</Text>
          </TouchableOpacity>
        </Card>
      </Modal>
    </View>
  );
}
