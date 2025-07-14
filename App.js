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
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

import { DataStore } from "@aws-amplify/datastore";
import { Band } from "./src/models";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const [bands, setBands] = useState(null);

  /**
   * Single observeQuery subscription + client‑side de‑duplication.
   * --------------------------------------------------------------
   * If you still have legacy duplicates from early dev builds,
   * run `DataStore.clear(); DataStore.start();` **once** in a
   * separate helper (or uninstall / reinstall Expo Go) and then
   * remove that helper. Keeping clear() in render will prevent
   * real‑time updates because it wipes the cache on every mount.
   */
  useEffect(() => {
    const sub = DataStore.observeQuery(Band).subscribe(({ items }) => {
      // 🔄 Remove duplicates locally (same id)
      const uniq = [];
      const seen = new Set();
      for (const it of items) {
        if (!seen.has(it.id)) {
          seen.add(it.id);
          uniq.push(it);
        }
      }
      console.log("📡 observeQuery fired. Rows (deduped):", uniq.length);
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
        <Text>No bands yet – add one from the AppSync console.</Text>
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

function BandScreen({ route }) {
  const { band } = route.params;
  return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.band}>{band.band}</Text>
      <Text style={styles.item}>{band.item}</Text>
      <Text>Price: ${band.price}</Text>
      {band.desc && <Text>{band.desc}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  card: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
  },
  band: { fontSize: 18, fontWeight: "600" },
  item: { fontSize: 14, color: "#555" },
});
