import React from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

export default function SettingsScreen() {
  const { isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
          Settings
        </Text>
        
        <ThemeToggle />
        
        {/* Add more settings here in the future */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 24,
  },
});
