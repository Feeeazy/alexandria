import React, { useState, useEffect } from 'react';
import BookCard from '../../components/BookCard/BookCard.jsx';
import './Home.css';

export function Home() {
  const [produtosDestaque, setProdutosDestaque] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarProdutosDestaque = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/produtos/destaque');
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        const data = await response.json();
        setProdutosDestaque(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro:', error);
        setErro('Ocorreu um erro ao carregar os produtos em destaque.');
        setLoading(false);
      }
    };

    buscarProdutosDestaque();
  }, []);


  return (
    <div className="home">
      <div className="container">
        <h1>Bem-vindo à Libris</h1>
        
        <section className="featured">
          <h2>Livros em Destaque</h2>
          <div className="books-grid">
            {produtosDestaque.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}