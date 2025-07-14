import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { Band } from "../models";
import styles from "../styles";

export default function HomeScreen({ navigation }) {
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