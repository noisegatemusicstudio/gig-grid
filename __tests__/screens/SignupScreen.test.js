// __tests__/screens/SignupScreen.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { signUp } from '@aws-amplify/auth';
import { DataStore } from '@aws-amplify/datastore';
import SignupScreen from '../../src/screens/SignupScreen';
import { ThemeProvider } from '../../src/contexts/ThemeContext';

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
};

// Mock AWS Amplify
jest.mock('@aws-amplify/auth');
jest.mock('@aws-amplify/datastore');

// Mock Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

// Wrapper component with theme provider
const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('SignupScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    DataStore.query.mockResolvedValue([]); // No existing users
  });

  test('should render signup form elements', () => {
    const { getByPlaceholderText, getByText } = renderWithTheme(
      <SignupScreen navigation={mockNavigation} />
    );

    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your username')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('Already have an account? Sign In')).toBeTruthy();
  });

  test('should update form field values', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <SignupScreen navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText('Enter your email');
    const usernameInput = getByPlaceholderText('Enter your username');
    const passwordInput = getByPlaceholderText('Enter your password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(usernameInput.props.value).toBe('testuser');
    expect(passwordInput.props.value).toBe('password123');
  });

  test('should show validation errors for empty fields', async () => {
    const { getByText } = renderWithTheme(
      <SignupScreen navigation={mockNavigation} />
    );

    const signUpButton = getByText('Sign Up');
    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Missing Information',
        'Please fill in all fields.'
      );
    });
  });

  test('should validate email format', async () => {
    const { getByPlaceholderText, getByText } = renderWithTheme(
      <SignupScreen navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText('Enter your email');
    const usernameInput = getByPlaceholderText('Enter your username');
    const passwordInput = getByPlaceholderText('Enter your password');
    const signUpButton = getByText('Sign Up');

    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Invalid Email',
        'Please enter a valid email address.'
      );
    });
  });

  test('should validate password length', async () => {
    const { getByPlaceholderText, getByText } = renderWithTheme(
      <SignupScreen navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText('Enter your email');
    const usernameInput = getByPlaceholderText('Enter your username');
    const passwordInput = getByPlaceholderText('Enter your password');
    const signUpButton = getByText('Sign Up');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, '123'); // Too short
    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Password Too Short',
        'Your password must be at least 8 characters long.'
      );
    });
  });

  test('should validate username length', async () => {
    const { getByPlaceholderText, getByText } = renderWithTheme(
      <SignupScreen navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText('Enter your email');
    const usernameInput = getByPlaceholderText('Enter your username');
    const passwordInput = getByPlaceholderText('Enter your password');
    const signUpButton = getByText('Sign Up');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(usernameInput, 'ab'); // Too short
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Username Too Short',
        'Your username must be at least 3 characters long.'
      );
    });
  });

  test('should handle existing user check', async () => {
    // Mock existing user
    DataStore.query.mockResolvedValue([{ email: 'test@example.com' }]);

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
        'Account Already Exists',
        'An account with this email already exists. Try logging in instead or use a different email address.'
      );
    });
  });

  test('should call signUp with correct parameters', async () => {
    signUp.mockResolvedValue({
      nextStep: { signUpStep: 'CONFIRM_SIGN_UP' }
    });

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

  test('should navigate to VerifyEmail when confirmation is needed', async () => {
    signUp.mockResolvedValue({
      nextStep: { signUpStep: 'CONFIRM_SIGN_UP' }
    });

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
        'Check Your Email',
        'We\'ve sent a verification code to your email address. Please enter it on the next screen.',
        expect.any(Array)
      );
    });
  });

  test('should handle signup errors', async () => {
    const signupError = { name: 'UsernameExistsException' };
    signUp.mockRejectedValue(signupError);

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
        'Account Already Exists',
        'An account with this email already exists. Please use a different email or try logging in.'
      );
    });
  });

  test('should navigate to login when sign in link is pressed', () => {
    const { getByText } = renderWithTheme(
      <SignupScreen navigation={mockNavigation} />
    );

    const signInLink = getByText('Already have an account? Sign In');
    fireEvent.press(signInLink);

    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  test('should show loading state during signup', async () => {
    // Mock a delayed response
    signUp.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    const { getByPlaceholderText, getByText } = renderWithTheme(
      <SignupScreen navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText('Enter your email');
    const usernameInput = getByPlaceholderText('Enter your username');
    const passwordInput = getByPlaceholderText('Enter your password');
    const signUpButton = getByText('Signing Up...');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(signUpButton);

    // Button should show loading state
    expect(getByText('Signing Up...')).toBeTruthy();
  });
});
