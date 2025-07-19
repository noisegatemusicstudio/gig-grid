// __tests__/integration/AuthenticationFlow.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { signUp, confirmSignUp, signIn } from '@aws-amplify/auth';
import { DataStore } from '@aws-amplify/datastore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

const Stack = createNativeStackNavigator();

// Test app component
const TestApp = ({ initialRouteName = 'Login' }) => (
  <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </ThemeProvider>
);

describe('Authentication Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    DataStore.query.mockResolvedValue([]); // No existing users
    DataStore.save.mockResolvedValue({});
  });

  describe('Complete Signup Flow', () => {
    test('should complete full signup → verify → login flow', async () => {
      // Mock successful signup requiring confirmation
      signUp.mockResolvedValue({
        nextStep: { signUpStep: 'CONFIRM_SIGN_UP' }
      });
      
      // Mock successful email confirmation
      confirmSignUp.mockResolvedValue({});
      
      // Mock successful login
      signIn.mockResolvedValue({ isSignedIn: true });

      const { getByPlaceholderText, getByText } = render(<TestApp initialRouteName="Signup" />);

      // Step 1: Fill out signup form
      const emailInput = getByPlaceholderText('Enter your email');
      const usernameInput = getByPlaceholderText('Enter your username');
      const passwordInput = getByPlaceholderText('Enter your password');
      const signUpButton = getByText('Sign Up');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(usernameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(signUpButton);

      // Step 2: Verify signup was called correctly
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

      // Step 3: Verify email verification alert is shown
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Check Your Email',
          'We\'ve sent a verification code to your email address. Please enter it on the next screen.',
          expect.any(Array)
        );
      });
    });

    test('should handle signup with existing user error', async () => {
      // Mock existing user in DataStore
      DataStore.query.mockResolvedValue([{ email: 'existing@example.com' }]);

      const { getByPlaceholderText, getByText } = render(<TestApp initialRouteName="Signup" />);

      const emailInput = getByPlaceholderText('Enter your email');
      const usernameInput = getByPlaceholderText('Enter your username');
      const passwordInput = getByPlaceholderText('Enter your password');
      const signUpButton = getByText('Sign Up');

      fireEvent.changeText(emailInput, 'existing@example.com');
      fireEvent.changeText(usernameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(signUpButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Account Already Exists',
          'An account with this email already exists. Try logging in instead or use a different email address.'
        );
      });
    });
  });

  describe('Email Verification Flow', () => {
    test('should handle successful email verification', async () => {
      confirmSignUp.mockResolvedValue({});

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

      const { getByPlaceholderText, getByText } = render(
        <ThemeProvider>
          <VerifyEmailScreen route={mockRoute} navigation={{ navigate: jest.fn() }} />
        </ThemeProvider>
      );

      const codeInput = getByPlaceholderText('Enter 6-digit code');
      const verifyButton = getByText('Verify Email');

      fireEvent.changeText(codeInput, '123456');
      fireEvent.press(verifyButton);

      await waitFor(() => {
        expect(confirmSignUp).toHaveBeenCalledWith({
          username: 'test@example.com',
          confirmationCode: '123456'
        });
      });

      await waitFor(() => {
        expect(DataStore.save).toHaveBeenCalled();
      });
    });

    test('should handle verification code errors', async () => {
      const verifyError = { name: 'CodeMismatchException' };
      confirmSignUp.mockRejectedValue(verifyError);

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

      const { getByPlaceholderText, getByText } = render(
        <ThemeProvider>
          <VerifyEmailScreen route={mockRoute} navigation={{ navigate: jest.fn() }} />
        </ThemeProvider>
      );

      const codeInput = getByPlaceholderText('Enter 6-digit code');
      const verifyButton = getByText('Verify Email');

      fireEvent.changeText(codeInput, '123456');
      fireEvent.press(verifyButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Invalid Code',
          'The verification code you entered is incorrect. Please try again.'
        );
      });
    });
  });

  describe('Login Flow', () => {
    test('should handle successful login', async () => {
      signIn.mockResolvedValue({ isSignedIn: true });

      const { getByPlaceholderText, getByText } = render(<TestApp />);

      const emailInput = getByPlaceholderText('Enter your email');
      const passwordInput = getByPlaceholderText('Enter your password');
      const signInButton = getByText('Sign In');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(signInButton);

      await waitFor(() => {
        expect(signIn).toHaveBeenCalledWith({
          username: 'test@example.com',
          password: 'password123',
        });
      });
    });

    test('should handle login with unverified email', async () => {
      const authError = { name: 'UserNotConfirmedException' };
      signIn.mockRejectedValue(authError);

      const { getByPlaceholderText, getByText } = render(<TestApp />);

      const emailInput = getByPlaceholderText('Enter your email');
      const passwordInput = getByPlaceholderText('Enter your password');
      const signInButton = getByText('Sign In');

      fireEvent.changeText(emailInput, 'unverified@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(signInButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Email Verification Required',
          'Please verify your email address by clicking the link we sent you.'
        );
      });
    });

    test('should handle invalid credentials', async () => {
      const authError = { name: 'NotAuthorizedException' };
      signIn.mockRejectedValue(authError);

      const { getByPlaceholderText, getByText } = render(<TestApp />);

      const emailInput = getByPlaceholderText('Enter your email');
      const passwordInput = getByPlaceholderText('Enter your password');
      const signInButton = getByText('Sign In');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'wrongpassword');
      fireEvent.press(signInButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Invalid Credentials',
          'Invalid email or password. Please try again.'
        );
      });
    });
  });

  describe('Navigation Flow', () => {
    test('should navigate from login to signup', () => {
      const { getByText } = render(<TestApp />);

      const createAccountButton = getByText('Create Account');
      fireEvent.press(createAccountButton);

      // Should now show signup screen elements
      expect(getByText('Create your account')).toBeTruthy();
    });

    test('should navigate from signup to login', () => {
      const { getByText } = render(<TestApp initialRouteName="Signup" />);

      const signInLink = getByText('Already have an account? Sign In');
      fireEvent.press(signInLink);

      // Should now show login screen elements
      expect(getByText('Welcome back')).toBeTruthy();
    });
  });
});
