import React from 'react';
import { useCart } from '../../contexts/CartContext';
import './Cart.css';

export function Cart() {
  const { cart, removeFromCart, addToCart } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart">
      <div className="container">
        <h1>Carrinho de Compras</h1>
        
        {cart.length === 0 ? 
        (
          <>
              <div className="empty-cart">
                  <p>Seu carrinho está sem histórias para contar...</p>
                  <p>Adicione um livro e comece a sua próxima aventura!</p>
                  <img src="../../../public/cart_empty.png" alt="Carrinho Vazio"/>
              </div>
                    </>
        )  
        
         : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                      <div className="cart-item-image">
                          <img src={item.image} alt={item.title}  width={100}/>
                          <div className="cart-item-info">
                          <h3>{item.title}</h3>
                          <p>R$ {item.price.toFixed(2)}</p>
                          </div>
                      </div>
                    <div className="cart-item-actions">
                        <button
                            onClick={() => removeFromCart(item)}
                            className="btn-remove"
                        >
                            -
                        </button>
                        <p>{item.quantity}</p>
                        <button
                            onClick={() => addToCart(item)}
                            className="btn-add"
                        >
                            +
                        </button>
                    </div>

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