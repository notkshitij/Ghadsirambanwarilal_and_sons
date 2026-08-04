import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext();
const CART_STORAGE_KEY = 'ghadsiram_cart';

function getStoredCart() {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getStoredCart);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (!notification) {
      return undefined;
    }

    const timeoutId = setTimeout(() => setNotification(''), 2500);
    return () => clearTimeout(timeoutId);
  }, [notification]);

  const addItem = (product, quantityToAdd = 1, selectedSize = '') => {
    const qty = Number(quantityToAdd) || 1;
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id && item.selectedSize === selectedSize);

      if (existingItem) {
        return items.map((item) => (
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + qty }
            : item
        ));
      }

      return [...items, { ...product, quantity: qty, selectedSize }];
    });
    setNotification(`${product.name}${selectedSize ? ` (${selectedSize})` : ''} added to your cart`);
  };

  const removeItem = (productId, selectedSize = '') => {
    setCartItems((items) => items.filter((item) => !(item.id === productId && item.selectedSize === selectedSize)));
  };

  const updateQuantity = (productId, quantity, selectedSize = '') => {
    const nextQuantity = Number(quantity);

    if (!Number.isFinite(nextQuantity) || nextQuantity < 1) {
      removeItem(productId, selectedSize);
      return;
    }

    setCartItems((items) => items.map((item) => (
      item.id === productId && item.selectedSize === selectedSize
        ? { ...item, quantity: Math.floor(nextQuantity) }
        : item
    )));
  };

  const clearCart = () => setCartItems([]);

  const itemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
    [cartItems],
  );

  const value = {
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    totalPrice,
    notification,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
