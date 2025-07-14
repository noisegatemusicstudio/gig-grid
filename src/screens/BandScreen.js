import React from "react";
import { SafeAreaView, Text, Button } from "react-native";
import { useCart } from "../store/CartStore";
import styles from "../styles";

export default function BandScreen({ route }) {
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