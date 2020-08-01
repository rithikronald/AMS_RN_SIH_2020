// import React, { useState, useEffect } from "react";
// import {
//   FlatList,
//   SafeAreaView,
//   Text,
//   AsyncStorage,
//   TouchableOpacity,
//   View,
// } from "react-native";
// var url = require("../assets/constants").url;
// const axios = require("axios");

// export default function home({ navigation }) {
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     axios
//       .get(url + "visitlistv2/da4a679b-4416-43a1-925f-c94a74b16c1b")
//       .then((d) => {
//         AsyncStorage.setItem("schoolDetails", JSON.stringify(d.data));
//         console.log("data stored succesfully in the async storage");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   // const save = async () => {
//   //   try {
//   //     await AsyncStorage.setItem("categoryDetails", JSON.stringify(list));
//   //     console.log("data stored succesfully in the async storage");
//   //   } catch (err) {
//   //     console.log("error");
//   //   }
//   // };

//   const load = async () => {
//     try {
//       let ret = await AsyncStorage.getItem("schoolDetails");
//       if (ret != null) {
//         setList(JSON.parse(ret));
//         console.log("data retrived successfully");
//       }
//     } catch (err) {
//       console.log("data not retrived");
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   return (
//     <View style={{ flex: 1, alignItems: "center", padding: "3%" }}>
//       <TouchableOpacity
//         style={{
//           width: 250,
//           height: 60,
//           backgroundColor: "#96bb7c",
//           alignSelf: "center",
//           alignItems: "center",
//           justifyContent: "center",
//           marginVertical: "5%",
//           borderRadius: 16,
//         }}
//         onPress={load}
//       >
//         <Text style={{ color: "#fff", fontSize: 18 }}>Load data</Text>
//       </TouchableOpacity>
//       <Text style={{ fontSize: 16 }}>
//         {list != null ? JSON.stringify(list) : "waiting for data"}
//       </Text>
//     </View>
//   );
// }
