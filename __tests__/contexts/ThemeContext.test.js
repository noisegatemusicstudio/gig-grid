// __tests__/contexts/ThemeContext.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text, TouchableOpacity } from 'react-native';
import { ThemeProvider, useTheme } from '../../src/contexts/ThemeContext';

// Test component that uses the theme context
const TestComponent = () => {
  const { theme, isDarkMode, toggleTheme, isLoading } = useTheme();

  return (
    <>
      <Text testID="theme-background">{theme.background}</Text>
      <Text testID="theme-text">{theme.text}</Text>
      <Text testID="theme-primary">{theme.primary}</Text>
      <Text testID="is-dark-mode">{isDarkMode.toString()}</Text>
      <Text testID="is-loading">{isLoading.toString()}</Text>
      <TouchableOpacity testID="toggle-theme" onPress={toggleTheme}>
        <Text>Toggle Theme</Text>
      </TouchableOpacity>
    </>
  );
};

describe('ThemeContext', () => {
  test('should provide default light theme', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByTestId('theme-background').children[0]).toBe('#ffffff');
    expect(getByTestId('theme-text').children[0]).toBe('#000000');
    expect(getByTestId('is-dark-mode').children[0]).toBe('false');
  });

  test('should toggle theme when toggleTheme is called', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = getByTestId('toggle-theme');
    
    // Initially light theme
    expect(getByTestId('is-dark-mode').children[0]).toBe('false');
    expect(getByTestId('theme-background').children[0]).toBe('#ffffff');

    // Toggle to dark theme
    fireEvent.press(toggleButton);
    
    expect(getByTestId('is-dark-mode').children[0]).toBe('true');
    expect(getByTestId('theme-background').children[0]).toBe('#1a1a1a');

    // Toggle back to light theme
    fireEvent.press(toggleButton);
    
    expect(getByTestId('is-dark-mode').children[0]).toBe('false');
    expect(getByTestId('theme-background').children[0]).toBe('#ffffff');
  });

  test('should provide all theme properties', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Check that primary color is provided
    expect(getByTestId('theme-primary').children[0]).toBe('#007AFF');
  });

  test('should handle loading state', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Initially not loading
    expect(getByTestId('is-loading').children[0]).toBe('false');
  });

  test('should throw error when useTheme is used outside ThemeProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');

    consoleSpy.mockRestore();
  });

  test('should provide correct dark theme colors', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = getByTestId('toggle-theme');
    
    // Switch to dark theme
    fireEvent.press(toggleButton);
    
    expect(getByTestId('theme-background').children[0]).toBe('#1a1a1a');
    expect(getByTestId('theme-text').children[0]).toBe('#ffffff');
    expect(getByTestId('theme-primary').children[0]).toBe('#007AFF');
  });
});
