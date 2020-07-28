import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, BackHandler } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
var geohash = require("ngeohash");
export default function App({ route, navigation }) {
  const { meoLatitude, meoLongitude, visitId } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  // const [userGeohash, setuserGeohash] = useState("");
  const [scanned, setScanned] = useState(false);
  var userGeohash;
  function strcmp(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  useEffect(() => {
    // setuserGeohash(geohash.encode(meoLatitude, meoLongitude));
    userGeohash = geohash.encode(meoLatitude, meoLongitude).substring(0, 4);
    console.log(geohash.encode(meoLatitude, meoLongitude));

    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate("Home");
    });
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    var result = "please go to the correct venue to proceed.";
    setScanned(true);
    if (strcmp(data.substring(0, 4), userGeohash) == 0) {
      console.log("Geohash verified successfully.!");
      navigation.push("Questions", {
        visitId: visitId,
      });
    }
    navigation.navigate("Home");
    alert(data);
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

      {scanned && navigation.push("Facilities")}
    </View>
  );
}
