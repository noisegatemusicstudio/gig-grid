import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';

export default function SettingsButton() {
  const navigation = useNavigation();
  const { isDark } = useTheme();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Settings')}
      accessibilityLabel="Settings"
      accessibilityRole="button"
    >
      <Text style={[styles.icon, { color: isDark ? '#fff' : '#000' }]}>⚙️</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  icon: {
    fontSize: 20,
  },
});
