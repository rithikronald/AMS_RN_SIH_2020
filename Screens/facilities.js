import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../StackNavigator/globalState";
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  ToastAndroid,
  Alert,
  BackHandler,
} from "react-native";
const axios = require("axios");
var url = require("../assets/constants").url;

import { Card, Icon } from "native-base";
import { Thumbnail } from "native-base";

//import cData from "../Components/data/cData";

export default function Facilities({ route, navigation }) {
  const { visitId } = route.params;
  const {
    isCategoryFilled,
    categories,
    setCategories,
    allFilled,
    postreport,
    allquestionsList,
    getLocalquestions,
    setallquestionsList,
  } = useContext(GlobalContext);
  function Toast() {
    ToastAndroid.show("Report Submitted Sucessfully ", ToastAndroid.SHORT);
  }

  useEffect(() => {
    // getLocalquestions();
    setCategories(allquestionsList);
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to Exit", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => navigation.popToTop() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
    console.log(allquestionsList);
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(url + "getcategories")
  //     .then((d) => {
  //       setCategories(d.data);
  //       console.log(categories);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: "2%", backgroundColor: "#fff" }}>
      <ScrollView>
        <Text
          style={{
            fontSize: 28,
            flex: 1,

            padding: "2%",
            marginVertical: "2%",
          }}
        >
          Academic
        </Text>
        {categories.map((item, i) => {
          const alreadyFilled = isCategoryFilled(item.categoryName);
          console.log(item.visibleForTeachers);
          return item.visibleForTeachers == true ? (
            <TouchableOpacity
              key={item._id}
              disabled={alreadyFilled}
              style={{
                opacity: 1,
                marginBottom: 5,
              }}
              onPress={() => {
                navigation.push("Questions", {
                  categoryName: item.categoryName,
                  questionsArray: item,
                  visibleForTeachers: item.visibleForTeachers,
                });
              }}
            >
              <Card
                style={{
                  padding: "3%",
                  borderRadius: 10,
                  margin: "3%",
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#DCE3E6",
                  //backgroundColor: "#dododo",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Thumbnail source={require("../assets/lg2.png")} />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      flexWrap: "wrap",
                      flex: 1,
                      marginLeft: "4%",
                      alignSelf: "center",
                    }}
                  >
                    {item.categoryName}
                  </Text>
                  {alreadyFilled == true ? (
                    <Icon
                      style={{
                        fontSize: 30,
                        color: "#8964e0",
                        alignSelf: "center",
                      }}
                      type="FontAwesome"
                      name={"check"}
                    />
                  ) : null}
                </View>
              </Card>
            </TouchableOpacity>
          ) : null;
        })}
        <Text
          style={{
            fontSize: 28,
            flex: 1,

            padding: "2%",
            marginVertical: "2%",
          }}
        >
          Others
        </Text>
        {categories.map((item, i) => {
          const alreadyFilled = isCategoryFilled(item.categoryName);
          console.log(item.visibleForTeachers);
          return item.visibleForTeachers == false ? (
            <TouchableOpacity
              key={item._id}
              disabled={alreadyFilled}
              style={{
                opacity: 1,
                marginBottom: 5,
              }}
              onPress={() => {
                navigation.push("Questions", {
                  categoryName: item.categoryName,
                  questionsArray: item,
                  visibleForTeachers: item.visibleForTeachers,
                });
              }}
            >
              <Card
                style={{
                  padding: "3%",
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#DCE3E6",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Thumbnail
                    source={require("../assets/lg3.png")}
                    style={{ padding: 8 }}
                  />

                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      flexWrap: "wrap",
                      flex: 1,
                      marginLeft: "4%",
                      alignSelf: "center",
                    }}
                  >
                    {item.categoryName}
                  </Text>
                  {alreadyFilled == true ? (
                    <Icon
                      style={{
                        fontSize: 30,
                        color: "#8964e0",
                        alignSelf: "center",
                      }}
                      type="FontAwesome"
                      name={"check"}
                    />
                  ) : null}
                </View>
              </Card>
            </TouchableOpacity>
          ) : null;
        })}
        <TouchableOpacity
          style={{
            width: "80%",
            height: 50,
            backgroundColor: "#8964e0",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            alignSelf: "center",
            margin: "3%",
            padding: "2%",
          }}
          disabled={!allFilled}
          onPress={() => {
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
            Toast();
            navigation.popToTop();
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

{
  /*
<TouchableOpacity style={{ opacity: 16 }}>
            <Card
              style={{
                padding: "3%",
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon
                  type="FontAwesome"
                  name={item.icon}
                  style={{
                    fontSize: 50,
                    color: "#000",
                    backgroundColor: "#c1c1c1",
                    padding: "2%",
                    borderRadius: 20,
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    flexWrap: "wrap",
                    flex: 1,
                    marginLeft: "4%",
                    alignSelf: "center",
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </Card>
          </TouchableOpacity>

*/
}

/*
<FlatList
        data={cData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ opacity: 16 }}
            onPress={() => {
              navigation.push("Questions");
            }}
          >
            <Card
              style={{
                padding: "3%",
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon
                  type="FontAwesome"
                  name={item.icon}
                  style={{
                    fontSize: 50,
                    color: "#4a3f35",
                    backgroundColor: "#febf63",
                    padding: "2%",
                    borderRadius: 20,
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    flexWrap: "wrap",
                    flex: 1,
                    marginLeft: "4%",
                    alignSelf: "center",
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />

*/
