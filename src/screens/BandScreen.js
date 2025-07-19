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
import { PortfolioItem } from "../../models";
import { DataStore } from "@aws-amplify/datastore";
import { useCartStore } from "../store/CartStore";
import { useTheme } from "../contexts/ThemeContext";
import { getDataStoreErrorMessage } from "../utils/errorHandler";
import styles from "../styles";

export default function BandScreen({ route }) {
  const { name } = route.params;
  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const add = useCart((s) => s.add);
  const { isDark } = useTheme();

  useEffect(() => {
    let timeoutId;
    
    const loadBandItems = async () => {
      try {
        console.log('Loading items for band:', name);
        
        // Set a timeout to prevent infinite loading
        timeoutId = setTimeout(() => {
          console.log('DataStore timeout for band items');
          setItems([]);
          setIsLoading(false);
        }, 10000); // 10 second timeout

        // Updated syntax for DataStore query
        const bandItems = await DataStore.query(Band, c => c.band.eq(name));
        
        clearTimeout(timeoutId);
        console.log('Band items loaded:', bandItems.length);
        setItems(bandItems);
        setIsLoading(false);
        
      } catch (err) {
        clearTimeout(timeoutId);
        const errorMessage = getDataStoreErrorMessage(err, `loading ${name}'s portfolio`);
        setError(errorMessage);
        setItems([]);
        setIsLoading(false);
      }
    };

    loadBandItems();
    
    return () => clearTimeout(timeoutId);
  }, [name]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.containerDark, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
        <Text style={[styles.titleDark, { color: isDark ? "#0ff" : "#007acc" }]}>{name} Portfolio</Text>
        <View style={[styles.centerDark, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={isDark ? "#fff" : "#000"} />
          <Text style={{ color: isDark ? "#fff" : "#000", marginTop: 16 }}>
            Loading portfolio...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.containerDark, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
        <Text style={[styles.titleDark, { color: isDark ? "#0ff" : "#007acc" }]}>{name} Portfolio</Text>
        <View style={[styles.centerDark, { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
          <Text style={{ color: isDark ? "#fff" : "#000", fontSize: 18, textAlign: 'center', marginBottom: 16 }}>
            Unable to load portfolio
          </Text>
          <Text style={{ color: isDark ? "#aaa" : "#666", textAlign: 'center', marginBottom: 20 }}>
            {error}
          </Text>
          <Button 
            title="Try Again" 
            onPress={() => {
              setError(null);
              setIsLoading(true);
              setItems(null);
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (!items || items.length === 0) {
    return (
      <SafeAreaView style={[styles.containerDark, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
        <Text style={[styles.titleDark, { color: isDark ? "#0ff" : "#007acc" }]}>{name} Portfolio</Text>
        <View style={[styles.centerDark, { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
          <Text style={{ color: isDark ? "#fff" : "#000", fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
            No items in portfolio
          </Text>
          <Text style={{ color: isDark ? "#aaa" : "#666", textAlign: 'center', marginBottom: 20 }}>
            {name} hasn't added any items to their portfolio yet.
          </Text>
          <Button 
            title="Refresh" 
            onPress={() => {
              setIsLoading(true);
              setItems(null);
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
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
