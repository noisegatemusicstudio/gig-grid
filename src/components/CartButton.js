import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../store/CartStore";
import styles from "../styles";

export default function CartButton() {
  const navigation = useNavigation();
  const cartCount = useCart((s) => s.count());
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Cart")}
      style={{ marginRight: 16 }}
    >
      <Ionicons name="cart" size={24} color="#000" />
      {cartCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeTxt}>{cartCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}