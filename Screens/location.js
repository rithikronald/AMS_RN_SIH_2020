import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  BackHandler,
  Alert,
  ToastAndroid,
} from "react-native";
import * as Location from "expo-location";

export default function CurrLocation({ route, navigation }) {
  const { visitId } = route.params;
  const [location, setLocation] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [userLatitude, setLatitude] = useState(0);
  // const [userLongitude, setLongitude] = useState(0);
  var userLatitude;
  var userLongitude;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErr("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // setLatitude(location.coords.latitude);
      // setLongitude(location.coords.longitude);
      userLatitude = location.coords.latitude;
      userLongitude = location.coords.longitude;
      setLoading(false);

      ToastAndroid.show("Location Detected Sucessfully ", ToastAndroid.SHORT);

      navigation.push("Scanner", {
        meoLatitude: userLatitude,
        meoLongitude: userLongitude,
        visitId: visitId,
      });
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

  let text = "Getting your location ...";
  if (err) {
    text = err;
  } else if (location) {
    text = JSON.stringify(location.coords);
    console.log(location.coords.latitude);
    console.log(location.coords.longitude);
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" animating={loading} color="#0000ff" />
      <Text style={{ fontSize: 20, alignSelf: "center", marginVertical: "3%" }}>
        Please wait until your is detected !!
      </Text>
    </View>
  );
}
