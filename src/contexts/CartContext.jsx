import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === book.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (book) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item.id === book.id);
      console.log(item);
      if (item.quantity === 1) {
        return prevCart.filter(item => item.id !== book.id);
      }
      return prevCart.map(item =>
        item.id === book.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    })
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);