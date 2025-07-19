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
import { getDataStoreErrorMessage } from "../utils/errorHandler";
import styles from "../styles";

export default function HomeScreen({ navigation }) {
  const [bands, setBands] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    let timeoutId;
    
    const loadBands = async () => {
      try {
        // Set a timeout to prevent infinite loading
        timeoutId = setTimeout(() => {
          console.log('DataStore timeout - setting empty bands array');
          setBands([]);
          setIsLoading(false);
        }, 10000); // 10 second timeout

        const sub = DataStore.observeQuery(Band).subscribe({
          next: ({ items }) => {
            clearTimeout(timeoutId);
            console.log('Bands loaded:', items.length);
            
            if (items.length === 0) {
              setBands([]);
            } else {
              const map = new Map();
              items.forEach((it) => {
                if (!map.has(it.band)) map.set(it.band, []);
                map.get(it.band).push(it);
              });
              setBands(Array.from(map.keys()));
            }
            setIsLoading(false);
          },
          error: (err) => {
            clearTimeout(timeoutId);
            const errorMessage = getDataStoreErrorMessage(err, 'loading bands');
            setError(errorMessage);
            setBands([]);
            setIsLoading(false);
          }
        });

        return () => {
          clearTimeout(timeoutId);
          sub.unsubscribe();
        };
      } catch (err) {
        clearTimeout(timeoutId);
        const errorMessage = getDataStoreErrorMessage(err, 'connecting to database');
        setError(errorMessage);
        setBands([]);
        setIsLoading(false);
      }
    };

    loadBands();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.containerDark, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
        <View style={[styles.centerDark, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={isDark ? "#fff" : "#000"} />
          <Text style={{ color: isDark ? "#fff" : "#000", marginTop: 16 }}>
            Loading bands...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.containerDark, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
        <View style={[styles.centerDark, { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
          <Text style={{ color: isDark ? "#fff" : "#000", fontSize: 18, textAlign: 'center', marginBottom: 16 }}>
            Unable to load bands
          </Text>
          <Text style={{ color: isDark ? "#aaa" : "#666", textAlign: 'center', marginBottom: 20 }}>
            {error}
          </Text>
          <Button 
            title="Try Again" 
            onPress={() => {
              setError(null);
              setIsLoading(true);
              setBands(null);
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (!bands || bands.length === 0) {
    return (
      <SafeAreaView style={[styles.containerDark, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
        <View style={[styles.centerDark, { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
          <Text style={{ color: isDark ? "#fff" : "#000", fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
            Welcome to Gig Grid!
          </Text>
          <Text style={{ color: isDark ? "#aaa" : "#666", textAlign: 'center', marginBottom: 20 }}>
            No bands found. Bands will appear here once they create profiles.
          </Text>
          <Button 
            title="Refresh" 
            onPress={() => {
              setIsLoading(true);
              setBands(null);
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
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
