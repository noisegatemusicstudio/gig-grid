// src/screens/SignupScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export default function SignupScreen({ navigation }) {
  const { isDark } = useTheme();

  const [role, setRole] = useState("Fan");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = () => {
    // TODO: validation / call your backend
    navigation.navigate("Home"); // temp - jump to home after “sign-up”
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? "#000" : "#fff" }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Create your account</Text>

      <TextInput
        accessibilityLabel="Email input"
        accessible={true}
        returnKeyType="next"
        textContentType="emailAddress"
        value={email}
        onChangeText={setEmail}
        placeholder="Email (e.g. fan@example.com)"
        placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
        autoCapitalize="none"
        keyboardType="email-address"
        style={[
          styles.input,
          { 
            backgroundColor: isDark ? "#1F1F1F" : "#F2F2F2",
            color: isDark ? "#fff" : "#000"
          },
        ]}
      />

      <TextInput
        accessibilityLabel="Password input"
        accessible={true}
        returnKeyType="next"
        textContentType="password"
        value={password}
        onChangeText={setPassword}
        placeholder="Password (min 8 chars)"
        placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
        secureTextEntry
        style={[
          styles.input,
          { 
            backgroundColor: isDark ? "#1F1F1F" : "#F2F2F2",
            color: isDark ? "#fff" : "#000"
          },
        ]}
      />

      <TextInput
        accessibilityLabel="Confirm password input"
        accessible={true}
        returnKeyType="done"
        textContentType="password"
        value={confirm}
        onChangeText={setConfirm}
        placeholder="Confirm password"
        placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
        secureTextEntry
        style={[
          styles.input,
          { 
            backgroundColor: isDark ? "#1F1F1F" : "#F2F2F2",
            color: isDark ? "#fff" : "#000"
          },
        ]}
      />

      {/* Role selector ---------------------------------------------------- */}
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
              idx === 1 && { marginRight: 0 }, // remove extra gap on last
              role === r && styles.roleBtnActive,
            ]}
          >
            <Text style={[
              styles.roleTxt, 
              role === r && styles.roleTxtActive,
              { color: role === r ? "#fff" : (isDark ? "#ddd" : "#374151") }
            ]}>
              {r}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.submit}
        onPress={handleSignup}
        accessibilityLabel="Sign up button"
        accessibilityHint="Completes sign up and navigates to home screen"
        accessible={true}
        accessibilityRole="button"
      >
        <Text style={styles.submitTxt}>Sign up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* --------------------------------------------------------------------- */

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
    marginBottom: 16,
  },

  input: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 12,
  },

  /* Role selector */
  roleRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  roleBtnActive: {
    backgroundColor: "#6D28D9", // Violet-600
    borderColor: "#6D28D9",
  },
  roleTxt: {
    fontSize: 16,
  },
  roleTxtActive: {
    fontWeight: "600",
  },

  /* Submit */
  submit: {
    backgroundColor: "#4444DD",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  submitTxt: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
