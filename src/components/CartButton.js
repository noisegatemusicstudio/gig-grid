import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../store/CartStore";
import { useTheme } from "../contexts/ThemeContext";

export default function CartButton() {
  const navigation = useNavigation();
  const { isDark } = useTheme();
  const count = useCart((s) =>
    Object.values(s.items).reduce((n, i) => n + i.qty, 0)
  );
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Cart")}
      style={{ marginRight: 16 }}
    >
      <Ionicons name="cart-outline" size={24} color={isDark ? "#0ff" : "#007acc"} />
      {count > 0 && (
        <View
          style={{
            position: "absolute",
            right: -6,
            top: -6,
            backgroundColor: "#f0f",
            borderRadius: 8,
            paddingHorizontal: 4,
            minWidth: 16,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 10, fontWeight: "600" }}>
            {count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
