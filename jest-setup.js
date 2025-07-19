// jest-setup.js
// Setup file for Jest tests

// Mock react-native-get-random-values
jest.mock('react-native-get-random-values', () => {
  return {
    getRandomValues: jest.fn(),
  };
});

// Mock @aws-amplify/auth
jest.mock('@aws-amplify/auth', () => ({
  signIn: jest.fn(),
  signUp: jest.fn(),
  signOut: jest.fn(),
  confirmSignUp: jest.fn(),
  resendSignUpCode: jest.fn(),
  getCurrentUser: jest.fn(),
}));

// Mock @aws-amplify/datastore
jest.mock('@aws-amplify/datastore', () => ({
  DataStore: {
    query: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    clear: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
  },
  Predicates: {
    ALL: 'ALL',
  },
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  NavigationContainer: ({ children }) => children,
}));

// Mock Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

// Mock Keyboard
jest.mock('react-native/Libraries/Components/Keyboard/Keyboard', () => ({
  dismiss: jest.fn(),
}));

// Silence console warnings in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
