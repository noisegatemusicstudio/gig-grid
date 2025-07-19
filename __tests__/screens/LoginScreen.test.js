// __tests__/screens/LoginScreen.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { signIn } from '@aws-amplify/auth';
import LoginScreen from '../../src/screens/LoginScreen';
import { ThemeProvider } from '../../src/contexts/ThemeContext';

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
};

// Mock AWS Amplify Auth
jest.mock('@aws-amplify/auth');

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

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render login form elements', () => {
    const { getByPlaceholderText, getByText } = renderWithTheme(
      <LoginScreen navigation={mockNavigation} />
    );

    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText('Create Account')).toBeTruthy();
  });

  test('should update email input value', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <LoginScreen navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText('Enter your email');
    fireEvent.changeText(emailInput, 'test@example.com');

    expect(emailInput.props.value).toBe('test@example.com');
  });

  test('should update password input value', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <LoginScreen navigation={mockNavigation} />
    );

    const passwordInput = getByPlaceholderText('Enter your password');
    fireEvent.changeText(passwordInput, 'password123');

    expect(passwordInput.props.value).toBe('password123');
  });

  test('should show validation errors for empty fields', async () => {
    const { getByText } = renderWithTheme(
      <LoginScreen navigation={mockNavigation} />
    );

    const signInButton = getByText('Sign In');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Missing Information',
        'Please enter both email and password.'
      );
    });
  });

  test('should show validation error for invalid email format', async () => {
    const { getByPlaceholderText, getByText } = renderWithTheme(
      <LoginScreen navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const signInButton = getByText('Sign In');

    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Invalid Email',
        'Please enter a valid email address.'
      );
    });
  });

  test('should call signIn with correct parameters on valid input', async () => {
    signIn.mockResolvedValue({ isSignedIn: true });

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
      expect(signIn).toHaveBeenCalledWith({
        username: 'test@example.com',
        password: 'password123',
      });
    });
  });

  test('should navigate to Home on successful login', async () => {
    signIn.mockResolvedValue({ isSignedIn: true });

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
      expect(mockNavigate).toHaveBeenCalledWith('Home');
    });
  });

  test('should handle authentication errors', async () => {
    const authError = { name: 'NotAuthorizedException' };
    signIn.mockRejectedValue(authError);

    const { getByPlaceholderText, getByText } = renderWithTheme(
      <LoginScreen navigation={mockNavigation} />
    );

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

  test('should navigate to signup screen when create account is pressed', () => {
    const { getByText } = renderWithTheme(
      <LoginScreen navigation={mockNavigation} />
    );

    const createAccountButton = getByText('Create Account');
    fireEvent.press(createAccountButton);

    expect(mockNavigate).toHaveBeenCalledWith('Signup');
  });

  test('should disable sign in button while loading', async () => {
    // Mock a delayed response
    signIn.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    const { getByPlaceholderText, getByText } = renderWithTheme(
      <LoginScreen navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const signInButton = getByText('Signing In...');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(signInButton);

    // Button should show loading state
    expect(getByText('Signing In...')).toBeTruthy();
  });

  test('should handle UserNotConfirmedException', async () => {
    const authError = { name: 'UserNotConfirmedException' };
    signIn.mockRejectedValue(authError);

    const { getByPlaceholderText, getByText } = renderWithTheme(
      <LoginScreen navigation={mockNavigation} />
    );

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
});
