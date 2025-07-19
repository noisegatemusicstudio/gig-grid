// __tests__/utils/errorHandler.test.js
import { 
  getAuthErrorMessage, 
  getSignupErrorMessage, 
  getDataStoreErrorMessage 
} from '../../src/utils/errorHandler';

describe('errorHandler utility functions', () => {
  describe('getAuthErrorMessage', () => {
    test('should return correct message for UserNotConfirmedException', () => {
      const error = { name: 'UserNotConfirmedException' };
      const result = getAuthErrorMessage(error);
      
      expect(result.title).toBe('Email Verification Required');
      expect(result.message).toBe('Please verify your email address by clicking the link we sent you.');
    });

    test('should return correct message for NotAuthorizedException', () => {
      const error = { name: 'NotAuthorizedException' };
      const result = getAuthErrorMessage(error);
      
      expect(result.title).toBe('Invalid Credentials');
      expect(result.message).toBe('Invalid email or password. Please try again.');
    });

    test('should return correct message for UserNotFoundException', () => {
      const error = { name: 'UserNotFoundException' };
      const result = getAuthErrorMessage(error);
      
      expect(result.title).toBe('Account Not Found');
      expect(result.message).toBe('No account found with this email address. Please check your email or sign up.');
    });

    test('should return correct message for CodeMismatchException', () => {
      const error = { name: 'CodeMismatchException' };
      const result = getAuthErrorMessage(error);
      
      expect(result.title).toBe('Invalid Code');
      expect(result.message).toBe('The verification code you entered is incorrect. Please try again.');
    });

    test('should return correct message for ExpiredCodeException', () => {
      const error = { name: 'ExpiredCodeException' };
      const result = getAuthErrorMessage(error);
      
      expect(result.title).toBe('Code Expired');
      expect(result.message).toBe('The verification code has expired. Please request a new code.');
    });

    test('should return correct message for NetworkError', () => {
      const error = { name: 'NetworkError' };
      const result = getAuthErrorMessage(error);
      
      expect(result.title).toBe('Connection Problem');
      expect(result.message).toBe('Please check your internet connection and try again.');
    });

    test('should handle errors with message property', () => {
      const error = { 
        name: 'CustomError',
        message: 'Custom error message' 
      };
      const result = getAuthErrorMessage(error);
      
      expect(result.title).toBe('Authentication Error');
      expect(result.message).toBe('Custom error message');
    });

    test('should handle null/undefined errors gracefully', () => {
      expect(() => getAuthErrorMessage(null)).not.toThrow();
      expect(() => getAuthErrorMessage(undefined)).not.toThrow();
      
      const result = getAuthErrorMessage(null);
      expect(result.title).toBe('Authentication Error');
      expect(result.message).toBe('An unexpected error occurred. Please try again.');
    });

    test('should handle unknown error types', () => {
      const error = { name: 'UnknownError' };
      const result = getAuthErrorMessage(error);
      
      expect(result.title).toBe('Authentication Error');
      expect(result.message).toBe('An unexpected error occurred. Please try again.');
    });
  });

  describe('getSignupErrorMessage', () => {
    test('should return correct message for UsernameExistsException', () => {
      const error = { name: 'UsernameExistsException' };
      const result = getSignupErrorMessage(error);
      
      expect(result.title).toBe('Account Already Exists');
      expect(result.message).toBe('An account with this email already exists. Please use a different email or try logging in.');
    });

    test('should return correct message for InvalidPasswordException', () => {
      const error = { name: 'InvalidPasswordException' };
      const result = getSignupErrorMessage(error);
      
      expect(result.title).toBe('Invalid Password');
      expect(result.message).toBe('Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.');
    });

    test('should return correct message for InvalidParameterException', () => {
      const error = { name: 'InvalidParameterException' };
      const result = getSignupErrorMessage(error);
      
      expect(result.title).toBe('Invalid Information');
      expect(result.message).toBe('Please check your information and try again.');
    });

    test('should handle network errors', () => {
      const error = { name: 'NetworkError' };
      const result = getSignupErrorMessage(error);
      
      expect(result.title).toBe('Connection Problem');
      expect(result.message).toBe('Please check your internet connection and try again.');
    });

    test('should handle null errors gracefully', () => {
      const result = getSignupErrorMessage(null);
      expect(result.title).toBe('Signup Error');
      expect(result.message).toBe('An unexpected error occurred during signup. Please try again.');
    });
  });

  describe('getDataStoreErrorMessage', () => {
    test('should return correct message for network errors', () => {
      const error = { message: 'Network request failed' };
      const result = getDataStoreErrorMessage(error);
      
      expect(result.title).toBe('Connection Problem');
      expect(result.message).toBe('Unable to connect to the server. Please check your internet connection and try again.');
    });

    test('should return correct message for authentication errors', () => {
      const error = { message: 'Not authenticated' };
      const result = getDataStoreErrorMessage(error);
      
      expect(result.title).toBe('Authentication Required');
      expect(result.message).toBe('Please sign in again to continue.');
    });

    test('should return correct message for configuration errors', () => {
      const error = { message: 'Configuration error' };
      const result = getDataStoreErrorMessage(error);
      
      expect(result.title).toBe('Configuration Error');
      expect(result.message).toBe('There was a problem with the app configuration. Please restart the app.');
    });

    test('should handle unknown DataStore errors', () => {
      const error = { message: 'Unknown DataStore error' };
      const result = getDataStoreErrorMessage(error);
      
      expect(result.title).toBe('Data Error');
      expect(result.message).toBe('There was a problem loading data. Please try again.');
    });

    test('should handle null errors gracefully', () => {
      const result = getDataStoreErrorMessage(null);
      expect(result.title).toBe('Data Error');
      expect(result.message).toBe('There was a problem loading data. Please try again.');
    });
  });
});
