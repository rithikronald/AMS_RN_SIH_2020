import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, AsyncStorage } from "react-native";
import { Camera } from "expo-camera";
import { Icon } from "native-base";
export default function App() {
  const camRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function takePicture() {
    const data = await camRef.current.takePictureAsync();
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
          style={{ alignSelf: "center", bottom: 40, flex: 1 }}
          onPress={takePicture}
        >
          <Icon
            type="FontAwesome"
            name="circle-o"
            style={{
              fontSize: 70,
              color: "#fff",
            }}
          />
        </TouchableOpacity>
      </Camera>
    </View>
  );
}
