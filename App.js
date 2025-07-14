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
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 🟣 AWS Amplify – configure **before** DataStore import
import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";
Amplify.configure(awsconfig);

import { DataStore } from "@aws-amplify/datastore";
import { Band } from "./src/models";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DataStore.start();
    const sub = DataStore.observeQuery(Band).subscribe(({ items }) => {
      setBands(items);
      setLoading(false);
    });
    return () => sub.unsubscribe();
  }, []);

  const addDemoRow = () => {
    DataStore.save(
      new Band({
        band: "Live Local",
        item: "Sticker Pack",
        price: 5,
        desc: "Inserted from device",
      })
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.center, { flex: 1 }]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Band", { band: item })}
    >
      <Text style={styles.title}>{item.band}</Text>
      <Text>
        {item.item} — ${item.price}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={bands}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

function BandScreen({ route }) {
  const { band } = route.params;
  return (
    <SafeAreaView style={styles.detail}>
      <Text style={styles.title}>{band.band}</Text>
      <Text style={styles.subtitle}>{band.item}</Text>
      <Text style={styles.price}>${band.price}</Text>
      {band.desc ? <Text style={styles.desc}>{band.desc}</Text> : null}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Gig‑Grid Merch" }}
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
  card: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
  },
  title: { fontSize: 18, fontWeight: "600" },
  subtitle: { fontSize: 16, marginTop: 8 },
  price: { fontSize: 20, marginTop: 12, fontWeight: "bold" },
  desc: { marginTop: 12, fontSize: 14, color: "#555" },
  detail: { flex: 1, padding: 16 },
  center: { justifyContent: "center", alignItems: "center" },
});
