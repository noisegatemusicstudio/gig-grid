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
import styles from "../styles";

export default function CartScreen() {
  const itemsObj = useCart((s) => s.items);
  const items = React.useMemo(() => Object.values(itemsObj), [itemsObj]);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const total = React.useMemo(
    () => items.reduce((t, i) => t + i.subtotal, 0),
    [items]
  );

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Your cart is empty.</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.band}>{item.band}</Text>
            <Text>
              {item.item} — {item.qty} × ${item.price} = ${item.subtotal}
            </Text>
            <TouchableOpacity onPress={() => remove(item.id)}>
              <Text style={{ color: "tomato" }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.card}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              Total: ${total}
            </Text>
            <Button title="Clear cart" onPress={clear} />
          </View>
        }
      />
    </SafeAreaView>
  );
}