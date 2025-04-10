import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './Header.css';

export function Header() {
  const { cart } = useCart();

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Livraria Virtual
        </Link>
        <nav>
          <Link to="/search">Buscar</Link>
          <Link to="/cart">
            Carrinho ({cart.reduce((acc, item) => acc + item.quantity, 0)})
          </Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}