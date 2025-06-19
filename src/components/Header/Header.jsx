import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

export function Header() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Libris
        </Link>
        <nav>
          <Link to="/search">Buscar</Link>
          <Link to="/cart">
            Carrinho ({cart.reduce((acc, item) => acc + item.quantity, 0)})
          </Link>
          {user ? (
              <div className="user-section">
                <span className="user-name">{user.nome}</span>
                <button onClick={logout} className="logout-btn">
                  Sair
                </button>
              </div>
          ) : (
              <Link to="/login">Login</Link>
          )}

        </nav>
      </div>
    </header>
  );
}