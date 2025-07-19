import "react-native-get-random-values";
import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { ThemeProvider } from "./src/contexts/ThemeContext";
import ErrorBoundary from "./src/components/ErrorBoundary";
import CartButton from "./src/components/CartButton";
import SettingsButton from "./src/components/SettingsButton";
import HomeScreen from "./src/screens/HomeScreen";
import BandScreen from "./src/screens/BandScreen";
import CartScreen from "./src/screens/CartScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import VerifyEmailScreen from "./src/screens/VerifyEmailScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

Amplify.configure(awsconfig);

// Debug: Check if Amplify is configured correctly
console.log('Amplify configuration loaded:', {
  region: awsconfig.aws_project_region,
  userPoolId: awsconfig.aws_user_pools_id,
  clientId: awsconfig.aws_user_pools_web_client_id,
  hasConfig: !!awsconfig
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
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
          {/* Login */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerTitle: "Sign In" }}
          />

          {/* Signup */}
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerTitle: "Sign Up" }}
          />

          {/* Email Verification */}
          <Stack.Screen
            name="VerifyEmail"
            component={VerifyEmailScreen}
            options={{ 
              headerTitle: "Verify Email",
              headerBackVisible: false, // Prevent going back without verification
            }}
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
    </ErrorBoundary>
  );
}
