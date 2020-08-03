import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  BackHandler,
  Alert,
  ToastAndroid,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
var geohash = require("ngeohash");
import { GlobalContext } from "../StackNavigator/globalState";
import AsyncStorage from "@react-native-community/async-storage";

export default function App({ route, navigation }) {
  const { storeLocal } = useContext(GlobalContext);
  const { meoLatitude, meoLongitude, visitId } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  // const [userGeohash, setuserGeohash] = useState("");
  const [scanned, setScanned] = useState(false);
  const [userGeohash, setUserGeohash] = useState(null);

  useEffect(() => {
    // setuserGeohash(geohash.encode(meoLatitude, meoLongitude))
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    setUserGeohash(geohash.encode(meoLatitude, meoLongitude));
  }, []);

  useEffect(() => {
    console.log(userGeohash);
  }, [userGeohash]);

  const handleBarCodeScanned = ({ type, data }) => {
    var result = "please go to the correct venue to proceed.";
    setScanned(true);
    if (data.substring(0, 4) === userGeohash.substring(0, 4)) {
      console.log("Geohash verified successfully.!");
      storeLocal(
        {
          isEngaged: true,
          visitId: visitId,
          reportState: [],
          reviewState: [],
        },
        "isEngaged"
      );
      ToastAndroid.show("Geohash verified successfully.! ", ToastAndroid.SHORT);
      navigation.push("Facilities", {
        visitId: visitId,
      });
    } else {
      alert(
        "You are on the Wrong location . Pls check your Location & try again"
      );

      navigation.navigate("Pending Visits");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}
