import "react-native-get-random-values";
import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Amplify } from 'aws-amplify';
import awsconfig from './amplifyconfiguration.json';
import { ThemeProvider } from "./src/contexts/ThemeContext";
import CartButton from "./src/components/CartButton";
import SettingsButton from "./src/components/SettingsButton";
import HomeScreen from "./src/screens/HomeScreen";
import BandScreen from "./src/screens/BandScreen";
import CartScreen from "./src/screens/CartScreen";
import SignupScreen from "./src/screens/SignupScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

Amplify.configure(awsconfig);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Signup"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f8f9fa',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          {/* Signup */}
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerTitle: "Signup" }}
          />

          {/* Home */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: "Bands",
              headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <SettingsButton />
                  <CartButton />
                </View>
              ),
            }}
          />

          {/* Band portfolio */}
          <Stack.Screen
            name="Band"
            component={BandScreen}
            options={{
              headerTitle: "Portfolio",
              headerRight: () => <CartButton />,
            }}
          />

          {/* Cart */}
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{
              headerTitle: "Your Cart",
              headerRight: () => null,
            }}
          />

          {/* Settings */}
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerTitle: "Settings",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
