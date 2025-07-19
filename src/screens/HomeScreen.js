import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import { Band } from "../../models";
import { DataStore } from "@aws-amplify/datastore";
import { useTheme } from "../contexts/ThemeContext";
import styles from "../styles";

export default function HomeScreen({ navigation }) {
  const [bands, setBands] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const sub = DataStore.observeQuery(Band).subscribe(({ items }) => {
      const map = new Map();
      items.forEach((it) => {
        if (!map.has(it.band)) map.set(it.band, []);
        map.get(it.band).push(it);
      });
      setBands(Array.from(map.keys()));
    });
    return () => sub.unsubscribe();
  }, []);

  if (bands === null)
    return <ActivityIndicator style={[styles.centerDark, { backgroundColor: isDark ? "#121212" : "#fff" }]} size="large" />;
  return (
    <SafeAreaView style={[styles.containerDark, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
      <FlatList
        data={bands}
        keyExtractor={(name) => name}
        renderItem={({ item }) => (
          <View style={[styles.cardDark, { backgroundColor: isDark ? "#1e1e1e" : "#f5f5f5" }]}>
            <Text style={[styles.bandDark, { color: isDark ? "#fff" : "#000" }]}>{item}</Text>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <Button
                title="Portfolio"
                color="#0ff"
                onPress={() => navigation.navigate("Band", { name: item })}
              />
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: isDark ? "#333" : "#e0e0e0" }]} />}
      />
    </SafeAreaView>
  );
}
