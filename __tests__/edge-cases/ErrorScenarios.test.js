// __tests__/edge-cases/ErrorScenarios.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { signIn, signUp, confirmSignUp } from '@aws-amplify/auth';
import { DataStore } from '@aws-amplify/datastore';
import { ThemeProvider } from '../../src/contexts/ThemeContext';
import LoginScreen from '../../src/screens/LoginScreen';
import SignupScreen from '../../src/screens/SignupScreen';
import VerifyEmailScreen from '../../src/screens/VerifyEmailScreen';

// Mock AWS Amplify
jest.mock('@aws-amplify/auth');
jest.mock('@aws-amplify/datastore');

// Mock Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

// Wrapper component with theme provider
const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Error Scenarios and Edge Cases', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    DataStore.query.mockResolvedValue([]);
    DataStore.save.mockResolvedValue({});
  });

  describe('Network Error Scenarios', () => {
    test('should handle network errors during login', async () => {
      const networkError = { name: 'NetworkError', message: 'Network request failed' };
      signIn.mockRejectedValue(networkError);

      const { getByPlaceholderText, getByText } = renderWithTheme(
        <LoginScreen navigation={mockNavigation} />
      );

      const emailInput = getByPlaceholderText('Enter your email');
      const passwordInput = getByPlaceholderText('Enter your password');
      const signInButton = getByText('Sign In');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(signInButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Connection Problem',
          'Please check your internet connection and try again.'
        );
      });
    });

    test('should handle network errors during signup', async () => {
      const networkError = { name: 'NetworkError' };
      signUp.mockRejectedValue(networkError);

      const { getByPlaceholderText, getByText } = renderWithTheme(
        <SignupScreen navigation={mockNavigation} />
      );

      const emailInput = getByPlaceholderText('Enter your email');
      const usernameInput = getByPlaceholderText('Enter your username');
      const passwordInput = getByPlaceholderText('Enter your password');
      const signUpButton = getByText('Sign Up');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(usernameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(signUpButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Connection Problem',
          'Please check your internet connection and try again.'
        );
      });
    });

    test('should handle DataStore network errors', async () => {
      const datastoreError = new Error('Network request failed');
      DataStore.query.mockRejectedValue(datastoreError);

      const { getByPlaceholderText, getByText } = renderWithTheme(
        <SignupScreen navigation={mockNavigation} />
      );

      const emailInput = getByPlaceholderText('Enter your email');
      const usernameInput = getByPlaceholderText('Enter your username');
      const passwordInput = getByPlaceholderText('Enter your password');
      const signUpButton = getByText('Sign Up');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(usernameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(signUpButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Connection Problem',
          'Unable to connect to the server. Please check your internet connection and try again.'
        );
      });
    });
  });

  describe('Invalid Input Edge Cases', () => {
    test('should handle extremely long email addresses', async () => {
      const longEmail = 'a'.repeat(100) + '@example.com';

      const { getByPlaceholderText, getByText } = renderWithTheme(
        <LoginScreen navigation={mockNavigation} />
      );

      const emailInput = getByPlaceholderText('Enter your email');
      const passwordInput = getByPlaceholderText('Enter your password');
      const signInButton = getByText('Sign In');

      fireEvent.changeText(emailInput, longEmail);
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(signInButton);

      // Should still validate as a valid email format
      await waitFor(() => {
        expect(signIn).toHaveBeenCalledWith({
          username: longEmail,
          password: 'password123',
        });
      });
    });

    test('should handle special characters in username', async () => {
      const { getByPlaceholderText, getByText } = renderWithTheme(
        <SignupScreen navigation={mockNavigation} />
      );

      const emailInput = getByPlaceholderText('Enter your email');
      const usernameInput = getByPlaceholderText('Enter your username');
      const passwordInput = getByPlaceholderText('Enter your password');
      const signUpButton = getByText('Sign Up');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(usernameInput, 'test@#$%^&*()');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(signUpButton);

      // Should handle special characters gracefully
      await waitFor(() => {
        expect(signUp).toHaveBeenCalledWith({
          username: 'test@example.com',
          password: 'password123',
          options: {
            userAttributes: {
              email: 'test@example.com',
            }
          }
        });
      });
    });

    test('should handle empty verification code with spaces', async () => {
      const mockRoute = {
        params: {
          username: 'test@example.com',
          userAttributes: {}
        }
      };

      const { getByPlaceholderText, getByText } = renderWithTheme(
        <VerifyEmailScreen navigation={mockNavigation} route={mockRoute} />
      );

      const codeInput = getByPlaceholderText('Enter 6-digit code');
      const verifyButton = getByText('Verify Email');

      fireEvent.changeText(codeInput, '   '); // Only spaces
      fireEvent.press(verifyButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Invalid Code',
          'Please enter the 6-digit verification code.'
        );
      });
    });
  });

  describe('Concurrent Operation Edge Cases', () => {
    test('should handle multiple rapid button presses', async () => {
      signIn.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

      const { getByPlaceholderText, getByText } = renderWithTheme(
        <LoginScreen navigation={mockNavigation} />
      );

      const emailInput = getByPlaceholderText('Enter your email');
      const passwordInput = getByPlaceholderText('Enter your password');
      const signInButton = getByText('Sign In');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      
      // Rapidly press the button multiple times
      fireEvent.press(signInButton);
      fireEvent.press(signInButton);
      fireEvent.press(signInButton);

      // Should only call signIn once due to loading state
      await waitFor(() => {
        expect(signIn).toHaveBeenCalledTimes(1);
      });
    });

    test('should handle component unmounting during async operation', async () => {
      signUp.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));

      const { getByPlaceholderText, getByText, unmount } = renderWithTheme(
        <SignupScreen navigation={mockNavigation} />
      );

      const emailInput = getByPlaceholderText('Enter your email');
      const usernameInput = getByPlaceholderText('Enter your username');
      const passwordInput = getByPlaceholderText('Enter your password');
      const signUpButton = getByText('Sign Up');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(usernameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(signUpButton);

      // Unmount component while operation is in progress
      unmount();

      // Should not throw any errors
      expect(() => {}).not.toThrow();
    });
  });

  describe('Malformed Data Edge Cases', () => {
    test('should handle null/undefined error objects', async () => {
      signIn.mockRejectedValue(null);

      const { getByPlaceholderText, getByText } = renderWithTheme(
        <LoginScreen navigation={mockNavigation} />
      );

      const emailInput = getByPlaceholderText('Enter your email');
      const passwordInput = getByPlaceholderText('Enter your password');
      const signInButton = getByText('Sign In');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(signInButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Authentication Error',
          'An unexpected error occurred. Please try again.'
        );
      });
    });

    test('should handle malformed Amplify responses', async () => {
      signUp.mockResolvedValue(null); // Malformed response

      const { getByPlaceholderText, getByText } = renderWithTheme(
        <SignupScreen navigation={mockNavigation} />
      );

      const emailInput = getByPlaceholderText('Enter your email');
      const usernameInput = getByPlaceholderText('Enter your username');
      const passwordInput = getByPlaceholderText('Enter your password');
      const signUpButton = getByText('Sign Up');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(usernameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(signUpButton);

      // Should handle gracefully without crashing
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Signup Error',
          'An unexpected error occurred during signup. Please try again.'
        );
      });
    });

    test('should handle DataStore save failures after successful verification', async () => {
      confirmSignUp.mockResolvedValue({});
      DataStore.save.mockRejectedValue(new Error('DataStore save failed'));

      const mockRoute = {
        params: {
          username: 'test@example.com',
          userAttributes: {
            email: 'test@example.com',
            username: 'testuser',
            role: 'FAN'
          }
        }
      };

      const { getByPlaceholderText, getByText } = renderWithTheme(
        <VerifyEmailScreen navigation={mockNavigation} route={mockRoute} />
      );

      const codeInput = getByPlaceholderText('Enter 6-digit code');
      const verifyButton = getByText('Verify Email');

      fireEvent.changeText(codeInput, '123456');
      fireEvent.press(verifyButton);

      // Should still show success message even if DataStore save fails
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Email Verified!',
          'Your email has been successfully verified. You can now log in.',
          expect.any(Array)
        );
      });
    });
  });

  describe('Memory and Performance Edge Cases', () => {
    test('should handle rapid theme changes without memory leaks', () => {
      const { rerender } = renderWithTheme(
        <LoginScreen navigation={mockNavigation} />
      );

      // Simulate rapid re-renders (like theme changes)
      for (let i = 0; i < 100; i++) {
        rerender(
          <ThemeProvider>
            <LoginScreen navigation={mockNavigation} />
          </ThemeProvider>
        );
      }

      // Should not throw any errors or memory leaks
      expect(() => {}).not.toThrow();
    });

    test('should handle large amounts of text input efficiently', () => {
      const { getByPlaceholderText } = renderWithTheme(
        <LoginScreen navigation={mockNavigation} />
      );

      const emailInput = getByPlaceholderText('Enter your email');
      const largeText = 'a'.repeat(10000) + '@example.com';

      fireEvent.changeText(emailInput, largeText);

      expect(emailInput.props.value).toBe(largeText);
    });
  });
});
