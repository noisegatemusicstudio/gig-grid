import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

import { DataStore } from "@aws-amplify/datastore";
import { Band } from "./src/models";

// Zustand cart store
import { create } from "zustand";
export const useCart = create((set, get) => ({
  items: {},
  add(band) {
    set((s) => {
      const existing = s.items[band.id] ?? { ...band, qty: 0, subtotal: 0 };
      const updated = {
        ...existing,
        qty: existing.qty + 1,
        subtotal: (existing.qty + 1) * band.price,
      };
      return { items: { ...s.items, [band.id]: updated } };
    });
  },
  remove(id) {
    set((s) => {
      const { [id]: _, ...rest } = s.items;
      return { items: rest };
    });
  },
  clear() {
    set({ items: {} });
  },
  count: () => Object.values(get().items).reduce((n, i) => n + i.qty, 0),
}));

// Cart button with badge
function CartButton() {
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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerRight: () => <CartButton /> }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Gig‑Grid Merch" }}
        />
        <Stack.Screen
          name="Band"
          component={BandScreen}
          options={({ route }) => ({ title: route.params.band.band })}
        />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Home screen listing bands
function HomeScreen({ navigation }) {
  const [bands, setBands] = useState(null);
  useEffect(() => {
    const sub = DataStore.observeQuery(Band).subscribe(({ items }) => {
      const uniq = [];
      const seen = new Set();
      for (const it of items) {
        if (!seen.has(it.id)) {
          seen.add(it.id);
          uniq.push(it);
        }
      }
      setBands(uniq);
    });
    return () => sub.unsubscribe();
  }, []);

  if (bands === null) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  if (bands.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>No bands yet – add one from the console.</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={bands}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Band", { band: item })}
          >
            <Text style={styles.band}>{item.band}</Text>
            <Text style={styles.item}>
              {item.item} — ${item.price}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

// Detail screen with Add to Cart
function BandScreen({ route }) {
  const { band } = route.params;
  const add = useCart((s) => s.add);
  return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.band}>{band.band}</Text>
      <Text style={styles.item}>{band.item}</Text>
      <Text>Price: ${band.price}</Text>
      {band.desc && <Text>{band.desc}</Text>}
      <Button title="Add to cart" onPress={() => add(band)} />
    </SafeAreaView>
  );
}

// Cart screen showing items, total, remove/clear
function CartScreen() {
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

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  card: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
  },
  band: { fontSize: 18, fontWeight: "600", color: "#000" },
  item: { fontSize: 14, color: "#333" },
  badge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "tomato",
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    alignItems: "center",
  },
  badgeTxt: { color: "#fff", fontSize: 10, fontWeight: "600" },
});
