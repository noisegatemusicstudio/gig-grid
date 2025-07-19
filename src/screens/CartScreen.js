import React from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { useCart } from "../store/CartStore";
import { useTheme } from "../contexts/ThemeContext";
import styles from "../styles";

export default function CartScreen() {
  const itemsObj = useCart((s) => s.items);
  const items = React.useMemo(() => Object.values(itemsObj), [itemsObj]);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const { isDark } = useTheme();
  const total = React.useMemo(
    () => items.reduce((t, i) => t + i.subtotal, 0),
    [items]
  );

  if (items.length === 0) {
    return (
      <SafeAreaView style={[styles.centerDark, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
        <Text style={[styles.itemDark, { color: isDark ? "#bbb" : "#666" }]}>Your cart is empty.</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={[styles.containerDark, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={[styles.cardDark, { backgroundColor: isDark ? "#1e1e1e" : "#f5f5f5" }]}>
            <Text style={[styles.bandDark, { color: isDark ? "#fff" : "#000" }]}>{item.band}</Text>
            <Text style={[styles.itemDark, { color: isDark ? "#bbb" : "#666" }]}>
              {item.item} — {item.qty} × ${item.price} = ${item.subtotal}
            </Text>
            <TouchableOpacity onPress={() => remove(item.id)}>
              <Text style={{ color: "#f00" }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <View style={[styles.cardDark, { backgroundColor: isDark ? "#1e1e1e" : "#f5f5f5" }]}>
            <Text
              style={[styles.itemDark, { fontWeight: "600", fontSize: 16, color: isDark ? "#bbb" : "#666" }]}
            >
              Total: ${total}
            </Text>
            <Button title="Clear cart" color="#f00" onPress={clear} />
          </View>
        }
      />
    </SafeAreaView>
  );
}
