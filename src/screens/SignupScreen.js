// src/screens/SignupScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { signUp } from '@aws-amplify/auth';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models';
import { useTheme } from "../contexts/ThemeContext";

export default function SignupScreen({ navigation }) {
  const { theme, isLoading } = useTheme();

  const [role, setRole] = useState("Fan");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [isSignupLoading, setIsSignupLoading] = useState(false);

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
      Alert.alert("Email Required", "Please enter your email address to create your account.");
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      Alert.alert("Invalid Email", "Please enter a valid email address (e.g., yourname@example.com).");
      return false;
    }
    if (password.length < 8) {
      Alert.alert("Password Too Short", "Your password must be at least 8 characters long for security.");
      return false;
    }
    if (password !== confirm) {
      Alert.alert("Passwords Don't Match", "Please make sure both password fields are identical.");
      return false;
    }
    if (!username.trim()) {
      Alert.alert("Username Required", "Please choose a username for your profile.");
      return false;
    }
    if (username.length < 3) {
      Alert.alert("Username Too Short", "Your username must be at least 3 characters long.");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    
    setIsSignupLoading(true);
    
    try {
      // Step 1: Check if user already exists in DataStore
      const existingUsers = await DataStore.query(User, c => c.email.eq(email.trim().toLowerCase()));
      if (existingUsers.length > 0) {
        Alert.alert("Account Already Exists", "An account with this email already exists. Try logging in instead or use a different email address.");
        setIsSignupLoading(false);
        return;
      }

      // Step 2: Create user with Amplify Auth
      const { user } = await signUp({
        username: email.trim().toLowerCase(),
        password: password.trim(),
        options: {
          userAttributes: {
            email: email.trim().toLowerCase(),
          }
        }
      });

      // Step 3: Create user profile in DataStore
      await DataStore.save(new User({
        email: email.trim().toLowerCase(),
        username: username.trim(),
        role: role.toUpperCase(), // Convert to enum value
      }));

      Alert.alert(
        "Success!", 
        "Account created successfully! Please check your email for verification.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Home")
          }
        ]
      );

    } catch (error) {
      console.error('Signup error:', error);
      
      let errorTitle = "Signup Failed";
      let errorMessage = "We couldn't create your account. Please try again.";
      
      if (error.code === 'UsernameExistsException') {
        errorTitle = "Account Already Exists";
        errorMessage = "An account with this email already exists. Try logging in instead or use a different email address.";
      } else if (error.code === 'InvalidPasswordException') {
        errorTitle = "Password Requirements Not Met";
        errorMessage = "Your password doesn't meet our security requirements. Please ensure it has at least 8 characters with a mix of letters, numbers, and symbols.";
      } else if (error.code === 'InvalidParameterException') {
        errorTitle = "Invalid Information";
        errorMessage = "Please check that all fields are filled out correctly. Make sure your email is valid and password meets requirements.";
      } else if (error.code === 'LimitExceededException') {
        errorTitle = "Too Many Attempts";
        errorMessage = "You've made too many signup attempts. Please wait a few minutes before trying again.";
      } else if (error.code === 'NetworkError' || error.message?.includes('network')) {
        errorTitle = "Connection Problem";
        errorMessage = "Please check your internet connection and try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert(errorTitle, errorMessage);
    } finally {
      setIsSignupLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
      <Text style={[styles.title, { color: theme.text }]}>Create your account</Text>

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

      <Text style={[styles.label, { color: theme.text }]}>Username</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
        placeholder="Choose a username"
        placeholderTextColor={theme.text + '80'}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        accessibilityLabel="Username input"
        accessible={true}
        returnKeyType="next"
        textContentType="username"
        autoComplete="username-new"
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
        returnKeyType="next"
        textContentType="newPassword"
        autoComplete="password-new"
        passwordRules="minlength: 8;"
        autoCorrect={false}
        autoCapitalize="none"
      />

      <Text style={[styles.label, { color: theme.text }]}>Confirm Password</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
        placeholder="Confirm your password"
        placeholderTextColor={theme.text + '80'}
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
        accessibilityLabel="Confirm password input"
        accessible={true}
        returnKeyType="done"
        textContentType="newPassword"
        autoComplete="password-new"
        autoCorrect={false}
        autoCapitalize="none"
      />

      {/* Role selector */}
      <Text style={[styles.label, { color: theme.text }]}>I am a...</Text>
      <View style={styles.roleRow}>
        {["Fan", "Band"].map((r, idx) => (
          <TouchableOpacity
            key={r}
            onPress={() => setRole(r)}
            accessibilityLabel={`Select role ${r}`}
            accessible={true}
            accessibilityRole="button"
            style={[
              styles.roleBtn,
              { borderColor: theme.border },
              idx === 1 && { marginRight: 0 },
              role === r && styles.roleBtnActive,
            ]}
          >
            <Text style={[
              styles.roleTxt,
              { color: role === r ? "#fff" : theme.text },
              role === r && styles.roleTxtActive,
            ]}>
              {r}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.submit, { opacity: isSignupLoading ? 0.6 : 1 }]}
        onPress={handleSignup}
        disabled={isSignupLoading}
        accessibilityLabel="Sign up button"
        accessibilityHint="Completes sign up and navigates to home screen"
        accessible={true}
        accessibilityRole="button"
      >
        <Text style={styles.submitTxt}>
          {isSignupLoading ? "Creating Account..." : "Sign up"}
        </Text>
      </TouchableOpacity>

      {/* Sign in link */}
      <View style={styles.signinContainer}>
        <Text style={[styles.signinPrompt, { color: theme.text + '99' }]}>
          Already have an account?{" "}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          accessibilityLabel="Go to sign in"
          accessible={true}
          accessibilityRole="button"
        >
          <Text style={[styles.signinLink, { color: theme.primary || "#4444DD" }]}>
            Sign in
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
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 24,
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
  roleRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  roleBtnActive: {
    backgroundColor: "#6D28D9",
    borderColor: "#6D28D9",
  },
  roleTxt: {
    fontSize: 16,
  },
  roleTxtActive: {
    fontWeight: "600",
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
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signinPrompt: {
    fontSize: 16,
  },
  signinLink: {
    fontSize: 16,
    fontWeight: "600",
  },
});