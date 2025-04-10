import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './BookCard.css';

const BookCard = ({ book }) => {
  const { id, title, author, price, image } = book;
  const { addToCart } = useCart();

  return (
    <div className="book-card">
      <div className="book-image">
        <img src={image} alt={title} width={50}/>
      </div>
      <div className="book-info">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">{author}</p>
        <p className="book-price">R$ {price.toFixed(2)}</p>
        <div className="book-actions">
          <Link to={`/book/${id}`} className="details-button">
            Ver Detalhes
          </Link>
            <button
                onClick={() => addToCart(book)}
                className="btn"
            >
                Adicionar ao Carrinho
            </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;