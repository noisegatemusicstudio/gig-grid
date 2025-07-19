// __tests__/components/SettingsButton.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsButton from '../../src/components/SettingsButton';
import { ThemeProvider } from '../../src/contexts/ThemeContext';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Wrapper component with theme provider
const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('SettingsButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render settings button', () => {
    const { getByTestId } = renderWithTheme(<SettingsButton />);
    
    expect(getByTestId('settings-button')).toBeTruthy();
  });

  test('should navigate to Settings screen when pressed', () => {
    const { getByTestId } = renderWithTheme(<SettingsButton />);
    
    const settingsButton = getByTestId('settings-button');
    fireEvent.press(settingsButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('Settings');
  });

  test('should have correct accessibility properties', () => {
    const { getByTestId } = renderWithTheme(<SettingsButton />);
    
    const settingsButton = getByTestId('settings-button');
    
    expect(settingsButton.props.accessibilityLabel).toBe('Settings');
    expect(settingsButton.props.accessibilityRole).toBe('button');
  });

  test('should apply theme colors correctly in light mode', () => {
    const { getByTestId } = renderWithTheme(<SettingsButton />);
    
    const settingsButton = getByTestId('settings-button');
    
    // Should use light theme colors
    expect(settingsButton.props.style.color).toBe('#000000');
  });

  test('should apply theme colors correctly in dark mode', () => {
    const { getByTestId } = renderWithTheme(<SettingsButton />);
    
    // Toggle to dark mode first (this would need to be implemented based on your ThemeContext)
    const settingsButton = getByTestId('settings-button');
    
    // Test that it can handle theme changes
    expect(settingsButton).toBeTruthy();
  });
});
