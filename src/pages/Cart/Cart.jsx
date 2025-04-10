import React from 'react';
import { useCart } from '../../contexts/CartContext';
import './Cart.css';

export function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart">
      <div className="container">
        <h1>Carrinho de Compras</h1>
        
        {cart.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title}  width={100}/>
                  <div>
                    <h3>{item.title}</h3>
                    <p>R$ {item.price.toFixed(2)}</p>
                    <p>Quantidade: {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn-remove"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-total">
              <h3>Total: R$ {total.toFixed(2)}</h3>
              <button className="btn">Finalizar Compra</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}