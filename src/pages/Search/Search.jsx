import React, { useState, useEffect } from 'react';
import BookCard from '../../components/BookCard/BookCard.jsx';
import './Search.css';

export function Search() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const buscarTodosProdutos = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/produtos');
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        const data = await response.json();
        setProdutos(data);
        setFilteredBooks(data);

      } catch (error) {
        console.error('Erro:', error);
      }
    };

    buscarTodosProdutos();
  }, []);


  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(produtos);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = produtos.filter(book =>
      book.titulo.toLowerCase().includes(term) ||
      book.autor.toLowerCase().includes(term)
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
          {filteredBooks.map(produtos => (
            <BookCard key={produtos.id} book={produtos} />
          ))}
        </div>
      </div>
    </div>
  );
}