// __tests__/components/CartButton.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CartButton from '../../src/components/CartButton';
import { ThemeProvider } from '../../src/contexts/ThemeContext';
import { useCartStore } from '../../src/store/CartStore';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock the cart store
jest.mock('../../src/store/CartStore');

// Wrapper component with theme provider
const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('CartButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render cart button', () => {
    useCartStore.mockReturnValue({ itemCount: 0 });
    
    const { getByTestId } = renderWithTheme(<CartButton />);
    
    expect(getByTestId('cart-button')).toBeTruthy();
  });

  test('should navigate to Cart screen when pressed', () => {
    useCartStore.mockReturnValue({ itemCount: 0 });
    
    const { getByTestId } = renderWithTheme(<CartButton />);
    
    const cartButton = getByTestId('cart-button');
    fireEvent.press(cartButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('Cart');
  });

  test('should not show badge when cart is empty', () => {
    useCartStore.mockReturnValue({ itemCount: 0 });
    
    const { queryByTestId } = renderWithTheme(<CartButton />);
    
    expect(queryByTestId('cart-badge')).toBeFalsy();
  });

  test('should show badge with correct count when cart has items', () => {
    useCartStore.mockReturnValue({ itemCount: 3 });
    
    const { getByTestId, getByText } = renderWithTheme(<CartButton />);
    
    expect(getByTestId('cart-badge')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });

  test('should show 99+ when cart has more than 99 items', () => {
    useCartStore.mockReturnValue({ itemCount: 150 });
    
    const { getByText } = renderWithTheme(<CartButton />);
    
    expect(getByText('99+')).toBeTruthy();
  });

  test('should update badge when cart count changes', () => {
    const { rerender, getByText, queryByTestId } = renderWithTheme(<CartButton />);
    
    // Initially empty cart
    useCartStore.mockReturnValue({ itemCount: 0 });
    rerender(
      <ThemeProvider>
        <CartButton />
      </ThemeProvider>
    );
    expect(queryByTestId('cart-badge')).toBeFalsy();
    
    // Cart with items
    useCartStore.mockReturnValue({ itemCount: 5 });
    rerender(
      <ThemeProvider>
        <CartButton />
      </ThemeProvider>
    );
    expect(getByText('5')).toBeTruthy();
  });

  test('should handle undefined itemCount gracefully', () => {
    useCartStore.mockReturnValue({ itemCount: undefined });
    
    const { queryByTestId } = renderWithTheme(<CartButton />);
    
    expect(queryByTestId('cart-badge')).toBeFalsy();
  });
});
