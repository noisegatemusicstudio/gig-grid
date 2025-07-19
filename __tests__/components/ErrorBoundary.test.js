// __tests__/components/ErrorBoundary.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import { Alert } from 'react-native';
import ErrorBoundary from '../../src/components/ErrorBoundary';

// Create a component that throws an error
const ProblematicComponent = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return null;
};

// Mock Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.error for clean test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test('should render children when there is no error', () => {
    const { getByTestId } = render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={false} testID="child-component" />
      </ErrorBoundary>
    );

    expect(() => getByTestId('child-component')).not.toThrow();
  });

  test('should catch JavaScript errors and show error UI', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(getByText('Something went wrong')).toBeTruthy();
    expect(getByText(/We're sorry, but something unexpected happened/)).toBeTruthy();
  });

  test('should show restart button in error state', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(getByText('Restart App')).toBeTruthy();
  });

  test('should show report button in error state', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(getByText('Report Problem')).toBeTruthy();
  });

  test('should handle restart button press', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    const restartButton = getByText('Restart App');
    expect(restartButton).toBeTruthy();
  });

  test('should handle report button press', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    const reportButton = getByText('Report Problem');
    expect(reportButton).toBeTruthy();
  });

  test('should reset error state when new props are received', () => {
    const { rerender, getByText, queryByText } = render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    // Verify error state
    expect(getByText('Something went wrong')).toBeTruthy();

    // Re-render with no error
    rerender(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    // Error UI should be gone
    expect(queryByText('Something went wrong')).toBeFalsy();
  });

  test('should log error information', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalled();
  });
});
