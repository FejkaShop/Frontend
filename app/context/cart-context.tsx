'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Type definition for a CartItem
export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

// Define the CartProvider props type
interface CartProviderProps {
  children: ReactNode; // Define the children prop here
}

// Initialize CartContext with default values
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider Component to wrap the app and provide cart state
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  // Function to add item to cart
  const addToCart = (item: CartItem) => {
    console.log('Adding to cart:', item); // This should log once per click
    setCart((prevCart) => {
      console.log('Previous cart:', prevCart); // Log to verify
      const updatedCart = [...prevCart];
      const existingItemIndex = prevCart.findIndex((i) => i.id === item.id);
      if (existingItemIndex >= 0) {
        console.log(item.id, item.quantity); // Check here
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        updatedCart.push({ ...item, quantity: 1 });
      }
      return updatedCart;
    });
  };
  

  // Function to remove item from cart
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Function to update item quantity in cart
  const updateQuantity = (id: number, quantity: number) => {
    console.log(id, quantity);
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  // Function to clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
