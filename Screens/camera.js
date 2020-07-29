import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Modal,
  ImageBackground,
  Button,
  Platform,
} from "react-native";
import ViewShort, { captureRef } from "react-native-view-shot";
import { Camera } from "expo-camera";
import { Icon } from "native-base";
import { TouchableRipple } from "react-native-paper";

export default function App({ navigation }) {
  const camRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const shortRef = useRef(null);
  const [screenShort, setScreenShort] = useState(null);
  const [date, setDate] = useState(null);
  const format = Platform.OS === "android" ? "raw" : "png";
  const result = Platform.OS === "android" ? "zip-base64" : "base64";

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
    setDate(Date());
    console.log(data);
  }

  async function takeScreenShot() {
    /*
    //   captureRef(shortRef, { result, format }).then((data) => {
    //   // expected pattern 'width:height|', example: '1080:1731|'
    //   const resolution = /^(\d+):(\d+)\|/g.exec(data);
    //   const width = (resolution || ["", 0, 0])[1];
    //   const height = (resolution || ["", 0, 0])[2];
    //   const base64 = data.substr((resolution || [""])[0].length || 0);

    //   // // convert from base64 to Buffer
    //   const buffer = Buffer.from(base64, "base64");
    //   URL.createObjectURL(uri);
      

      
    //   // // un-compress data
    //   // const inflated = zlib.inflateSync(buffer);
    //   // // compose PNG
    //   // const png = new PNG({ width, height });
    //   // png.data = inflated;
    //   // const pngData = PNG.sync.write(png);
    //   // // save composed PNG
    //   // fs.writeFileSync(output, pngData);
    // });
    // return;
    */
    await shortRef.current.capture().then((uri) => {
      setScreenShort(uri);
      setModal(false);
      setModal1(true);
      fetch(uri)
        .then((res) => res.blob())
        .then((res) => {
          // Send res to upload API
        })
        .catch((err) => console.error(err));
      console.log("do something with ", uri);
    });
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
            style={{
              flex: 1,
              alignSelf: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <ViewShort
              ref={shortRef}
              options={{ format: "jpg", quality: 0.9 }}
              style={{ flex: 1 }}
            >
              <ImageBackground source={{ uri: photo }} style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: "red",
                    top: 40,
                    marginHorizontal: "2%",
                  }}
                >
                  {date}
                </Text>
              </ImageBackground>
            </ViewShort>
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
              onPress={takeScreenShot}
            >
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
                Okay
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modal1}
          style={{
            alignSelf: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <ImageBackground
            style={{ flex: 1, width: "100%" }}
            source={{ uri: screenShort }}
          />
          <Button
            title="Back"
            onPress={() => {
              setModal1(false);
            }}
          />
        </Modal>
      </Camera>
    </View>
  );
}
