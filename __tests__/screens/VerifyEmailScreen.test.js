// __tests__/screens/VerifyEmailScreen.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { confirmSignUp, resendSignUpCode } from '@aws-amplify/auth';
import { DataStore } from '@aws-amplify/datastore';
import VerifyEmailScreen from '../../src/screens/VerifyEmailScreen';
import { ThemeProvider } from '../../src/contexts/ThemeContext';

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
};

// Mock route params
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

describe('VerifyEmailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    DataStore.save.mockResolvedValue({});
  });

  test('should render verification form elements', () => {
    const { getByPlaceholderText, getByText } = renderWithTheme(
      <VerifyEmailScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('Verify Your Email')).toBeTruthy();
    expect(getByPlaceholderText('Enter 6-digit code')).toBeTruthy();
    expect(getByText('Verify Email')).toBeTruthy();
    expect(getByText('Resend Code')).toBeTruthy();
  });

  test('should display user email', () => {
    const { getByText } = renderWithTheme(
      <VerifyEmailScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('test@example.com')).toBeTruthy();
  });

  test('should update confirmation code input', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <VerifyEmailScreen navigation={mockNavigation} route={mockRoute} />
    );

    const codeInput = getByPlaceholderText('Enter 6-digit code');
    fireEvent.changeText(codeInput, '123456');

    expect(codeInput.props.value).toBe('123456');
  });

  test('should limit code input to 6 characters', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <VerifyEmailScreen navigation={mockNavigation} route={mockRoute} />
    );

    const codeInput = getByPlaceholderText('Enter 6-digit code');
    expect(codeInput.props.maxLength).toBe(6);
  });

  test('should show validation error for invalid code length', async () => {
    const { getByPlaceholderText, getByText } = renderWithTheme(
      <VerifyEmailScreen navigation={mockNavigation} route={mockRoute} />
    );

    const codeInput = getByPlaceholderText('Enter 6-digit code');
    const verifyButton = getByText('Verify Email');

    fireEvent.changeText(codeInput, '123'); // Too short
    fireEvent.press(verifyButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Invalid Code',
        'Please enter the 6-digit verification code.'
      );
    });
  });

  test('should call confirmSignUp with correct parameters', async () => {
    confirmSignUp.mockResolvedValue({});

    const { getByPlaceholderText, getByText } = renderWithTheme(
      <VerifyEmailScreen navigation={mockNavigation} route={mockRoute} />
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
  });

  test('should create user profile in DataStore after successful verification', async () => {
    confirmSignUp.mockResolvedValue({});

    const { getByPlaceholderText, getByText } = renderWithTheme(
      <VerifyEmailScreen navigation={mockNavigation} route={mockRoute} />
    );

    const codeInput = getByPlaceholderText('Enter 6-digit code');
    const verifyButton = getByText('Verify Email');

    fireEvent.changeText(codeInput, '123456');
    fireEvent.press(verifyButton);

    await waitFor(() => {
      expect(DataStore.save).toHaveBeenCalled();
    });
  });

  test('should navigate to Login after successful verification', async () => {
    confirmSignUp.mockResolvedValue({});

    const { getByPlaceholderText, getByText } = renderWithTheme(
      <VerifyEmailScreen navigation={mockNavigation} route={mockRoute} />
    );

    const codeInput = getByPlaceholderText('Enter 6-digit code');
    const verifyButton = getByText('Verify Email');

    fireEvent.changeText(codeInput, '123456');
    fireEvent.press(verifyButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Email Verified!',
        'Your email has been successfully verified. You can now log in.',
        expect.any(Array)
      );
    });
  });

  test('should handle verification errors', async () => {
    const verifyError = { name: 'CodeMismatchException' };
    confirmSignUp.mockRejectedValue(verifyError);

    const { getByPlaceholderText, getByText } = renderWithTheme(
      <VerifyEmailScreen navigation={mockNavigation} route={mockRoute} />
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

  test('should handle resend code functionality', async () => {
    resendSignUpCode.mockResolvedValue({});

    const { getByText } = renderWithTheme(
      <VerifyEmailScreen navigation={mockNavigation} route={mockRoute} />
    );

    const resendButton = getByText('Resend Code');
    fireEvent.press(resendButton);

    await waitFor(() => {
      expect(resendSignUpCode).toHaveBeenCalledWith({
        username: 'test@example.com'
      });
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Code Resent',
        'A new verification code has been sent to your email address.'
      );
    });
  });

  test('should handle resend code errors', async () => {
    const resendError = { name: 'NetworkError' };
    resendSignUpCode.mockRejectedValue(resendError);

    const { getByText } = renderWithTheme(
      <VerifyEmailScreen navigation={mockNavigation} route={mockRoute} />
    );

    const resendButton = getByText('Resend Code');
    fireEvent.press(resendButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Connection Problem',
        'Please check your internet connection and try again.'
      );
    });
  });

  test('should show loading state during verification', async () => {
    // Mock a delayed response
    confirmSignUp.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    const { getByPlaceholderText, getByText } = renderWithTheme(
      <VerifyEmailScreen navigation={mockNavigation} route={mockRoute} />
    );

    const codeInput = getByPlaceholderText('Enter 6-digit code');
    const verifyButton = getByText('Verifying...');

    fireEvent.changeText(codeInput, '123456');
    fireEvent.press(verifyButton);

    // Button should show loading state
    expect(getByText('Verifying...')).toBeTruthy();
  });

  test('should show loading state during resend', async () => {
    // Mock a delayed response
    resendSignUpCode.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    const { getByText } = renderWithTheme(
      <VerifyEmailScreen navigation={mockNavigation} route={mockRoute} />
    );

    const resendButton = getByText('Resending...');
    fireEvent.press(resendButton);

    // Button should show loading state
    expect(getByText('Resending...')).toBeTruthy();
  });

  test('should handle go back confirmation', async () => {
    const { getByText } = renderWithTheme(
      <VerifyEmailScreen navigation={mockNavigation} route={mockRoute} />
    );

    const goBackButton = getByText('Go Back to Sign Up');
    fireEvent.press(goBackButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Cancel Verification',
        'Are you sure you want to go back? You\'ll need to verify your email to complete account creation.',
        expect.any(Array)
      );
    });
  });

  test('should handle missing username gracefully', () => {
    const routeWithoutUsername = { params: {} };
    
    const { getByText } = renderWithTheme(
      <VerifyEmailScreen navigation={mockNavigation} route={routeWithoutUsername} />
    );

    const resendButton = getByText('Resend Code');
    fireEvent.press(resendButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Unable to resend code. Please try signing up again.'
    );
  });

  test('should continue to login even if DataStore save fails', async () => {
    confirmSignUp.mockResolvedValue({});
    DataStore.save.mockRejectedValue(new Error('DataStore error'));

    const { getByPlaceholderText, getByText } = renderWithTheme(
      <VerifyEmailScreen navigation={mockNavigation} route={mockRoute} />
    );

    const codeInput = getByPlaceholderText('Enter 6-digit code');
    const verifyButton = getByText('Verify Email');

    fireEvent.changeText(codeInput, '123456');
    fireEvent.press(verifyButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Email Verified!',
        'Your email has been successfully verified. You can now log in.',
        expect.any(Array)
      );
    });
  });
});
