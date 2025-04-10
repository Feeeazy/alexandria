import React, { useState } from 'react';
import { books } from '../../data/books';
import BookCard from '../../components/BookCard/BookCard.jsx';
import './Search.css';

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term)
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className="search">
      <div className="container">
        <h1>Buscar Livros</h1>
        <input
          type="text"
          placeholder="Buscar por título ou autor..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        
        <div className="books-grid">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}