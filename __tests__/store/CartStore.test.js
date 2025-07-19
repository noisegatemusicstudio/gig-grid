// __tests__/store/CartStore.test.js
import { renderHook, act } from '@testing-library/react-native';
import { useCartStore } from '../../src/store/CartStore';

// Mock item for testing
const mockItem = {
  id: '1',
  name: 'Test Item',
  price: 29.99,
  image: 'https://example.com/image.jpg'
};

const mockItem2 = {
  id: '2',
  name: 'Another Item',
  price: 19.99,
  image: 'https://example.com/image2.jpg'
};

describe('CartStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    const { result } = renderHook(() => useCartStore());
    act(() => {
      result.current.clearCart();
    });
  });

  test('should have initial empty state', () => {
    const { result } = renderHook(() => useCartStore());
    
    expect(result.current.items).toEqual([]);
    expect(result.current.total).toBe(0);
    expect(result.current.itemCount).toBe(0);
  });

  test('should add item to cart', () => {
    const { result } = renderHook(() => useCartStore());
    
    act(() => {
      result.current.addItem(mockItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({
      ...mockItem,
      quantity: 1
    });
    expect(result.current.itemCount).toBe(1);
    expect(result.current.total).toBe(29.99);
  });

  test('should increase quantity when adding existing item', () => {
    const { result } = renderHook(() => useCartStore());
    
    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.itemCount).toBe(2);
    expect(result.current.total).toBe(59.98);
  });

  test('should add multiple different items', () => {
    const { result } = renderHook(() => useCartStore());
    
    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem2);
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.itemCount).toBe(2);
    expect(result.current.total).toBe(49.98);
  });

  test('should remove item from cart', () => {
    const { result } = renderHook(() => useCartStore());
    
    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem2);
      result.current.removeItem('1');
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe('2');
    expect(result.current.itemCount).toBe(1);
    expect(result.current.total).toBe(19.99);
  });

  test('should decrease quantity when removing item with quantity > 1', () => {
    const { result } = renderHook(() => useCartStore());
    
    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem); // quantity becomes 2
      result.current.removeItem('1');
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.itemCount).toBe(1);
    expect(result.current.total).toBe(29.99);
  });

  test('should update item quantity', () => {
    const { result } = renderHook(() => useCartStore());
    
    act(() => {
      result.current.addItem(mockItem);
      result.current.updateQuantity('1', 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.itemCount).toBe(5);
    expect(result.current.total).toBe(149.95);
  });

  test('should remove item when quantity is set to 0', () => {
    const { result } = renderHook(() => useCartStore());
    
    act(() => {
      result.current.addItem(mockItem);
      result.current.updateQuantity('1', 0);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.total).toBe(0);
  });

  test('should not update quantity to negative values', () => {
    const { result } = renderHook(() => useCartStore());
    
    act(() => {
      result.current.addItem(mockItem);
      result.current.updateQuantity('1', -1);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.total).toBe(0);
  });

  test('should clear entire cart', () => {
    const { result } = renderHook(() => useCartStore());
    
    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem2);
      result.current.clearCart();
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.total).toBe(0);
  });

  test('should calculate total correctly with decimal prices', () => {
    const { result } = renderHook(() => useCartStore());
    
    const itemWithDecimal = {
      id: '3',
      name: 'Decimal Item',
      price: 15.99,
      image: 'test.jpg'
    };
    
    act(() => {
      result.current.addItem(itemWithDecimal);
      result.current.updateQuantity('3', 3);
    });

    expect(result.current.total).toBe(47.97);
  });

  test('should handle invalid item gracefully', () => {
    const { result } = renderHook(() => useCartStore());
    
    act(() => {
      result.current.addItem(null);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.total).toBe(0);
  });

  test('should handle updating non-existent item', () => {
    const { result } = renderHook(() => useCartStore());
    
    act(() => {
      result.current.updateQuantity('nonexistent', 5);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.total).toBe(0);
  });

  test('should handle removing non-existent item', () => {
    const { result } = renderHook(() => useCartStore());
    
    act(() => {
      result.current.addItem(mockItem);
      result.current.removeItem('nonexistent');
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.itemCount).toBe(1);
    expect(result.current.total).toBe(29.99);
  });

  test('should maintain immutability', () => {
    const { result } = renderHook(() => useCartStore());
    
    act(() => {
      result.current.addItem(mockItem);
    });

    const firstItems = result.current.items;
    
    act(() => {
      result.current.addItem(mockItem2);
    });

    const secondItems = result.current.items;
    
    expect(firstItems).not.toBe(secondItems);
    expect(firstItems).toHaveLength(1);
    expect(secondItems).toHaveLength(2);
  });
});
