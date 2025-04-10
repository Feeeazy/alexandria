import React from 'react';
import { Link } from 'react-router-dom';
import { books } from '../../data/books';
import BookCard from '../../components/BookCard/BookCard.jsx';
import './Home.css';

export function Home() {
  const featuredBooks = books.slice(0, 4);

  return (
    <div className="home">
      <div className="container">
        <h1>Bem-vindo à Livraria Virtual</h1>
        
        <section className="featured">
          <h2>Livros em Destaque</h2>
          <div className="books-grid">
            {featuredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}