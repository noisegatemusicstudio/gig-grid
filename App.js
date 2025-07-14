import React from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/**
 * Milestone 2: Add Navigation & Detail Screen
 * ------------------------------------------
 * Changes from the starter:
 *   • Integrated React Navigation (native‑stack).
 *   • HomeScreen lists bands; tapping a card navigates to BandScreen.
 *   • BandScreen shows simple detail content (placeholder).
 *
 * Next steps (once this works):
 *   1. Replace the static DATA with a backend call (Firestore / Supabase).
 *   2. Add Cart & Checkout screens plus global cart state (Context/Zustand).
 *   3. Introduce NativeWind or Tailwind RN for styling.
 */

const DATA = [
  { id: "1", band: "The Rolling Codes", item: "T‑Shirt", price: 20 },
  { id: "2", band: "Null Pointers", item: "Hoodie", price: 35 },
];

function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Band", { band: item })}
    >
      <View style={styles.card}>
        <Text style={styles.band}>{item.band}</Text>
        <Text style={styles.item}>{`${item.item} — $${item.price}`}</Text>
      </View>
    </TouchableOpacity>
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

function BandScreen({ route }) {
  const { band } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailCard}>
        <Text style={styles.band}>{band.band}</Text>
        <Text style={styles.item}>{`${band.item} — $${band.price}`}</Text>
        <Text style={styles.desc}>
          {/* Placeholder; replace with real product description */}
          High‑quality cotton apparel. Worldwide shipping.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Band Merch Store" }}
        />
        <Stack.Screen
          name="Band"
          component={BandScreen}
          options={({ route }) => ({ title: route.params.band.band })}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
  detailCard: {
    margin: 16,
    padding: 24,
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
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
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: "#666",
  },
});
