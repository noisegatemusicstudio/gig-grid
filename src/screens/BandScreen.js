import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { Band } from "../../models";
import { useCart } from "../store/CartStore";
import { useTheme } from "../contexts/ThemeContext";
import styles from "../styles";

export default function BandScreen({ route }) {
  const { name } = route.params;
  const [items, setItems] = useState(null);
  const add = useCart((s) => s.add);
  const { isDark } = useTheme();

  useEffect(() => {
    DataStore.query(Band, (b) => b.band("eq", name)).then(setItems);
  }, [name]);

  if (items === null)
    return <ActivityIndicator style={[styles.centerDark, { backgroundColor: isDark ? "#121212" : "#fff" }]} size="large" />;
  return (
    <SafeAreaView style={[styles.containerDark, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
      <Text style={[styles.titleDark, { color: isDark ? "#0ff" : "#007acc" }]}>{name} Portfolio</Text>
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <View style={[styles.cardDark, { backgroundColor: isDark ? "#1e1e1e" : "#f5f5f5" }]}>
            <Text style={[styles.bandDark, { color: isDark ? "#fff" : "#000" }]}>{item.item}</Text>
            <Text style={[styles.itemDark, { color: isDark ? "#bbb" : "#666" }]}>${item.price}</Text>
            <Button title="Buy" color="#f0f" onPress={() => add(item)} />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: isDark ? "#333" : "#e0e0e0" }]} />}
      />
    </SafeAreaView>
  );
}
