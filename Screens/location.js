import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, BackHandler } from "react-native";
import * as Location from "expo-location";

export default function CurrLocation({ navigation }) {
  const [location, setLocation] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErr("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoading(false);
      navigation.push("Camera");
    })();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.popToTop();
    });
  }, []);

  let text = "Getting your location .....";
  if (err) {
    text = err;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" animating={loading} color="#0000ff" />
      <Text style={{ fontSize: 18 }}>{text}</Text>
    </View>
  );
}
