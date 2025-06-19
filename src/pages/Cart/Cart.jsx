import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import './Cart.css';


export function Cart() {
    const { cart, removeFromCart, addToCart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const total = cart.reduce((sum, item) => sum + (item.preco * item.quantity), 0);
    const handleFinalizarCompra = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const itens = cart.map(item => ({
                produtoId: item.id,
                quantidade: item.quantity
            }));

            const pedidoData = {
                clienteId: localStorage.getItem('userId'),
                itens: itens
            };

            const response = await fetch('http://localhost:8080/api/carrinho/finalizar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pedidoData)
            });

            if (!response.ok) {
                throw new Error('Erro ao finalizar a compra');
            }

            const pedido = await response.json();
            clearCart();
            alert('Compra finalizada com sucesso!');
            navigate('/');
        } catch (error) {
            setError('Erro ao finalizar a compra. Por favor, tente novamente.');
        }
    };

    return (
        <div className="cart">
            <div className="container">
                <h1>Carrinho de Compras</h1>

                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <p>Seu carrinho está sem histórias para contar...</p>
                        <p>Adicione um livro e comece a sua próxima aventura!</p>
                        <Link to="/search" className="btn-ver-livros">Buscar uma nova história!</Link>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cart.map(item => (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-image">
                                        <img src={item.urlImagem} alt={item.titulo} width={100}/>
                                        <div className="cart-item-info">
                                            <h3>{item.titulo}</h3>
                                            <p>R$ {item.preco.toFixed(2)}</p>
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
                            {error && <div className="error-message">{error}</div>}
                            <h3>Total: R$ {total.toFixed(2)}</h3>
                            <button onClick={handleFinalizarCompra} className="btn">
                                Finalizar Compra
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

}