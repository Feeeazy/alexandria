import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { books } from '../../data/books';
import './ProductDetails.css';

export function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const book = books.find(book => book.id === parseInt(id));

  if (!book) {
    return <div>Livro não encontrado</div>;
  }

  return (
    <div className="product-details">
      <div className="container">
        <div className="product-description">
          <div className="product-image">
            <img src={book.image} alt={book.title} width={200} height={300} />
          </div>
          <div className="product-info">
            <div className='product-item'>
              <div className='product-text'>

                <div>
                  <h1>{book.title}</h1>
                </div>

                <div>
                  <p className="author">por {book.author}</p>
                  <p className="description">{book.description}</p>
                </div>

              </div>
            </div>
            <div className='product-price'>
                <p className="price">R$ {book.price.toFixed(2)}</p>
                <button onClick={() => addToCart(book)} className="btn">
                  Adicionar ao Carrinho
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}