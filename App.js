import "react-native-get-random-values";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartButton from "./src/components/CartButton";
import HomeScreen from "./src/screens/HomeScreen";
import BandScreen from "./src/screens/BandScreen";
import CartScreen from "./src/screens/CartScreen";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerRight: () => <CartButton /> }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Gig‑Grid Merch" }}
        />
        <Stack.Screen
          name="Band"
          component={BandScreen}
          options={({ route }) => ({ title: route.params.band.band })}
        />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
