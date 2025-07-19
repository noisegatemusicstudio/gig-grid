import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themePreference, setThemePreference] = useState('system'); // 'system', 'light', 'dark'
  const [isLoading, setIsLoading] = useState(true);

  // Determine the actual theme based on preference
  const isDark = themePreference === 'system' 
    ? systemColorScheme === 'dark'
    : themePreference === 'dark';

  // Load theme preference from storage
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('themePreference');
        if (savedTheme && ['system', 'light', 'dark'].includes(savedTheme)) {
          setThemePreference(savedTheme);
        }
      } catch (error) {
        console.log('Error loading theme preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, []);

  // Save theme preference to storage
  const setTheme = async (newTheme) => {
    try {
      await AsyncStorage.setItem('themePreference', newTheme);
      setThemePreference(newTheme);
    } catch (error) {
      console.log('Error saving theme preference:', error);
    }
  };

  const value = {
    isDark,
    themePreference,
    setTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
