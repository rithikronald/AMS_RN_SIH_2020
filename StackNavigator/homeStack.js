import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/home";
import SchoolDetails from "../Screens/SchoolDetails";
import Location from "../Screens/location";
import Scanner from "../Screens/scanner";
import Camera from "../Screens/camera";
import Facilities from "../Screens/facilities";
import Questions from "../Screens/questions";
import Storage from "../Screens/asyncStorage";
import Login from "../Screens/loginScreen";

const Stack = createStackNavigator();

export default function homeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LOGIN"
        options={{
          headerStyle: {
            backgroundColor: "#8964e0",
            height: 100,

            borderBottomEndRadius: 50,
            borderBottomStartRadius: 50,
          },
          headerTitleStyle: { color: "#fff", fontSize: 23 },
          headerTitleAlign: "center",
          headerTitleAllowFontScaling: true,
        }}
      >
        <Stack.Screen
          name="Pending Visits"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: "#8964e0",
              height: 100,

              borderBottomEndRadius: 50,
              borderBottomStartRadius: 50,
            },
            headerTitleStyle: { color: "#fff", fontSize: 23 },
            headerTitleAlign: "center",
            headerTitleAllowFontScaling: true,
          }}
        />
        <Stack.Screen
          name="School Details"
          component={SchoolDetails}
          options={{
            headerStyle: {
              backgroundColor: "#8964e0",
              height: 100,

              borderBottomEndRadius: 50,
              borderBottomStartRadius: 50,
            },
            headerTitleStyle: { color: "#fff", fontSize: 23 },
            headerTitleAlign: "center",
            headerTitleAllowFontScaling: true,
          }}
        />
        <Stack.Screen
          name="Location"
          component={Location}
          options={{
            headerStyle: {
              backgroundColor: "#8964e0",
              height: 100,

              borderBottomEndRadius: 50,
              borderBottomStartRadius: 50,
            },
            headerTitleStyle: { color: "#fff", fontSize: 23 },
            headerTitleAlign: "center",
            headerTitleAllowFontScaling: true,
          }}
        />
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{
            headerStyle: {
              backgroundColor: "#8964e0",
              height: 100,

              // borderBottomEndRadius: 50,
              // borderBottomStartRadius: 50,
            },
            headerTitleStyle: { color: "#fff", fontSize: 23 },
            headerTitleAlign: "center",
            headerTitleAllowFontScaling: true,
          }}
        />

        <Stack.Screen
          name="Facilities"
          component={Facilities}
          options={{
            headerStyle: {
              backgroundColor: "#8964e0",
              height: 100,

              borderBottomEndRadius: 50,
              borderBottomStartRadius: 50,
            },
            headerTitleStyle: { color: "#fff", fontSize: 23 },
            headerTitleAlign: "center",
            headerTitleAllowFontScaling: true,
          }}
        />
        <Stack.Screen
          name="Questions"
          component={Questions}
          options={{
            headerStyle: {
              backgroundColor: "#8964e0",
              height: 100,

              borderBottomEndRadius: 50,
              borderBottomStartRadius: 50,
            },
            headerTitleStyle: { color: "#fff", fontSize: 23 },
            headerTitleAlign: "center",
            headerTitleAllowFontScaling: true,
          }}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{
            headerStyle: {
              backgroundColor: "#8964e0",
              height: 100,

              borderBottomEndRadius: 50,
              borderBottomStartRadius: 50,
            },
            headerTitleStyle: { color: "#fff", fontSize: 23 },
            headerTitleAlign: "center",
            headerTitleAllowFontScaling: true,
          }}
        />
        <Stack.Screen
          name="LOGIN"
          component={Login}
          options={{
            headerStyle: {
              backgroundColor: "#8964e0",
              height: 100,

              borderBottomEndRadius: 50,
              borderBottomStartRadius: 50,
            },
            headerTitleStyle: { color: "#fff", fontSize: 23 },
            headerTitleAlign: "center",
            headerTitleAllowFontScaling: true,
          }}
        />
        {/*</Stack.Navigator> <Stack.Screen 
        //   name="Storage"
        //   component={Storage}
        //   options={{
        //     headerStyle: {
        //       backgroundColor: "#222831",
        //       height: 100,
        //       borderBottomEndRadius: 50,
        //     },
        //     headerTitleStyle: { color: "#fff", fontSize: 25 },
        //   }}
        // />
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
