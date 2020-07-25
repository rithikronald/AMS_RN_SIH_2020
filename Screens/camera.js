import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Modal,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { Icon } from "native-base";
import { TouchableRipple } from "react-native-paper";
export default function App() {
  const camRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function takePicture() {
    const data = await camRef.current.takePictureAsync();
    setPhoto(data.uri);
    setModal(true);
    console.log(data);
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={camRef}>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            flex: 1,
            justifyContent: "flex-end",
            bottom: 40,
          }}
          onPress={takePicture}
        >
          <Icon
            type="FontAwesome"
            name="circle"
            style={{
              fontSize: 90,
              color: "#fff",
            }}
          />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modal}
          style={{
            alignSelf: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <View
            style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 30, margin: "3%" }}>Preview</Text>
            <Image
              source={{ uri: photo }}
              style={{ width: 300, height: 400 }}
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
                padding: "4%",
              }}
              onPress={() => {
                setModal(false);
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
                Okay
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Camera>
    </View>
  );
}
