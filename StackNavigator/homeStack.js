import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/home";
import ClgDetails from "../Screens/clgDetails";
import Location from "../Screens/location";
import Scanner from "../Screens/scanner";
import Camera from "../Screens/camera";
import Facilities from "../Screens/facilities";
import Questions from "../Screens/questions";

const Stack = createStackNavigator();

export default function homeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: { backgroundColor: "#222831" },
            headerTitleStyle: { color: "#fff" },
          }}
        />
        <Stack.Screen
          name="ClgDetails"
          component={ClgDetails}
          options={{
            headerStyle: { backgroundColor: "#222831" },
            headerTitleStyle: { color: "#fff" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Location"
          component={Location}
          options={{
            headerStyle: { backgroundColor: "#222831" },
            headerTitleStyle: { color: "#fff" },
            headerTintColor: "#fff",
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{
            headerStyle: { backgroundColor: "#222831" },
            headerTitleStyle: { color: "#fff" },
            headerTintColor: "#fff",
            headerLeft: null,
          }}
        />

        <Stack.Screen
          name="Facilities"
          component={Facilities}
          options={{
            headerStyle: { backgroundColor: "#222831" },
            headerTitleStyle: { color: "#fff" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Questions"
          component={Questions}
          options={{
            headerStyle: { backgroundColor: "#222831" },
            headerTitleStyle: { color: "#fff" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{
            headerStyle: { backgroundColor: "#222831" },
            headerTitleStyle: { color: "#fff" },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
