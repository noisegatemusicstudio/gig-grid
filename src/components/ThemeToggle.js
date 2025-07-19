import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDark, themePreference, setTheme } = useTheme();

  const themes = [
    { key: 'system', label: 'System', icon: '⚙️' },
    { key: 'light', label: 'Light', icon: '☀️' },
    { key: 'dark', label: 'Dark', icon: '🌙' },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
        Theme
      </Text>
      <View style={styles.toggleRow}>
        {themes.map((theme) => (
          <TouchableOpacity
            key={theme.key}
            onPress={() => setTheme(theme.key)}
            style={[
              styles.themeBtn,
              {
                backgroundColor: themePreference === theme.key 
                  ? (isDark ? '#6D28D9' : '#8B5CF6') 
                  : (isDark ? '#1F1F1F' : '#F2F2F2'),
                borderColor: themePreference === theme.key 
                  ? (isDark ? '#6D28D9' : '#8B5CF6') 
                  : (isDark ? '#444' : '#D1D5DB'),
              }
            ]}
            accessibilityLabel={`Select ${theme.label} theme`}
            accessibilityRole="button"
          >
            <Text style={styles.icon}>{theme.icon}</Text>
            <Text style={[
              styles.themeText,
              { 
                color: themePreference === theme.key 
                  ? '#fff' 
                  : (isDark ? '#ddd' : '#374151')
              }
            ]}>
              {theme.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 8,
  },
  themeBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  themeText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});
