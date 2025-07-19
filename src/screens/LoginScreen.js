// src/screens/LoginScreen.js
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { signIn } from "@aws-amplify/auth";
import { useTheme } from "../contexts/ThemeContext";
import { getAuthErrorMessage } from "../utils/errorHandler";

export default function LoginScreen({ navigation }) {
  const { theme, isLoading } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Show loading screen while theme is loading
  if (isLoading || !theme) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const validateForm = () => {
    if (!email.trim()) {
      Alert.alert("Email Required", "Please enter your email address to continue.");
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      Alert.alert("Invalid Email", "Please enter a valid email address (e.g., yourname@example.com).");
      return false;
    }
    if (!password.trim()) {
      Alert.alert("Password Required", "Please enter your password to sign in.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsLoginLoading(true);
    
    try {
      // Sign in with Amplify Auth
      const { user } = await signIn({
        username: email.trim().toLowerCase(),
        password: password.trim(),
      });

      console.log('Login successful:', user);

      Alert.alert(
        "Success!", 
        "Welcome back!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Home")
          }
        ]
      );

    } catch (error) {
      const { title, message } = getAuthErrorMessage(error);
      
      Alert.alert(title, message, [
        {
          text: "OK",
          style: "default"
        },
        ...(error.code === 'UserNotFoundException' ? [
          {
            text: "Create Account",
            style: "default",
            onPress: () => navigation.navigate("Signup")
          }
        ] : [])
      ]);
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    Alert.alert(
      "Forgot Password",
      "Password reset functionality will be implemented soon.",
      [{ text: "OK" }]
    );
  };

  const navigateToSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: theme.text }]}>Welcome back</Text>
        <Text style={[styles.subtitle, { color: theme.text + '99' }]}>
          Sign in to your account
        </Text>

        <Text style={[styles.label, { color: theme.text }]}>Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
          placeholder="Enter your email"
          placeholderTextColor={theme.text + '80'}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          accessibilityLabel="Email input"
          accessible={true}
          returnKeyType="next"
          textContentType="emailAddress"
          autoComplete="email"
          autoCorrect={false}
        />

        <Text style={[styles.label, { color: theme.text }]}>Password</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
          placeholder="Enter your password"
          placeholderTextColor={theme.text + '80'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          accessibilityLabel="Password input"
          accessible={true}
          returnKeyType="done"
          textContentType="password"
          autoComplete="password"
          autoCorrect={false}
          autoCapitalize="none"
          onSubmitEditing={handleLogin}
        />

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={handleForgotPassword}
          accessibilityLabel="Forgot password link"
          accessible={true}
          accessibilityRole="button"
        >
          <Text style={[styles.forgotPasswordText, { color: theme.primary || "#4444DD" }]}>
            Forgot your password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.submit, { opacity: isLoginLoading ? 0.6 : 1 }]}
          onPress={handleLogin}
          disabled={isLoginLoading}
          accessibilityLabel="Sign in button"
          accessibilityHint="Signs in and navigates to home screen"
          accessible={true}
          accessibilityRole="button"
        >
          <Text style={styles.submitTxt}>
            {isLoginLoading ? "Signing in..." : "Sign in"}
          </Text>
        </TouchableOpacity>

        {/* Sign up link */}
        <View style={styles.signupContainer}>
          <Text style={[styles.signupPrompt, { color: theme.text + '99' }]}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={navigateToSignup}
            accessibilityLabel="Go to sign up"
            accessible={true}
            accessibilityRole="button"
          >
            <Text style={[styles.signupLink, { color: theme.primary || "#4444DD" }]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
    justifyContent: 'center',
    minHeight: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: 4,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
  },
  submit: {
    backgroundColor: "#4444DD",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  submitTxt: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signupPrompt: {
    fontSize: 16,
  },
  signupLink: {
    fontSize: 16,
    fontWeight: "600",
  },
});
