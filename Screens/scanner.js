import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, BackHandler } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
var geohash = require("ngeohash");
export default function App({ route, navigation }) {
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

  {
    /* useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate("Home");
    });

  }, []);*/
  }
  useEffect(() => {
    setUserGeohash(geohash.encode(meoLatitude, meoLongitude));
  }, []);

  useEffect(() => {
    console.log(userGeohash);
  }, [userGeohash]);

  const handleBarCodeScanned = ({ type, data }) => {
    var result = "please go to the correct venue to proceed.";

    data.substring(0, 4) == userGeohash.substring(0, 4)
      ? navigation.navigate("Facilities")
      : navigation.navigate("Home");
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
