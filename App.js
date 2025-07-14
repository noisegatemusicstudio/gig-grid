import React from "react";
import { SafeAreaView, FlatList, Text, View, StyleSheet } from "react-native";

/**
 * A minimal starter screen for the Band Merchandise mobile app.
 * --------------------------------------------------------------
 * What it shows now:
 *   • A hard‑coded list of 2 bands with one merch item each.
 *   • FlatList for efficient, scrollable rendering.
 *
 * Next steps (once you see this running):
 *   1. Replace the static DATA array with a call to a backend API or Firebase.
 *   2. Add React Navigation and create separate screens (Home, Band, Cart, Checkout).
 *   3. Introduce Context or Zustand for global state (e.g. cart).
 *   4. Style with NativeWind or custom Tailwind classes.
 */

const DATA = [
  { id: "1", band: "The Rolling Codes", item: "T‑Shirt", price: 20 },
  { id: "2", band: "Null Pointers", item: "Hoodie", price: 35 },
];

export default function App() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.band}>{item.band}</Text>
      <Text style={styles.item}>{`${item.item} — $${item.price}`}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={<Text style={styles.title}>Band Merch Store</Text>}
        contentContainerStyle={styles.listPadding}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listPadding: {
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  card: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  band: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  item: {
    fontSize: 16,
  },
});
