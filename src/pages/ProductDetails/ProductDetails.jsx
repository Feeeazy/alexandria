import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './ProductDetails.css';

export function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarProduto = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/produtos/${id}`);

        if (!response.ok) {
          throw new Error('Produto não encontrado');
        }

        const data = await response.json();
        setProduto(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        setErro('Não foi possível carregar os detalhes do produto.');
        setLoading(false);
      }
    };

    buscarProduto();
  }, [id]);

  if (loading) {
    return <div className="loading">Carregando detalhes do produto...</div>;
  }

  if (erro) {
    return <div className="erro">{erro}</div>;
  }

  if (!produto) {
    return <div className="erro">Produto não encontrado</div>;
  }


  return (
    <div className="product-details">
      <div className="container">
        <div className="product-description">
          <div className="product-image">
            <img src={produto.urlImagem} alt={produto.titulo} width={200} height={300} />
          </div>
          <div className="product-info">
            <div className='product-item'>
              <div className='product-text'>

                <div>
                  <h1>{produto.titulo}</h1>
                </div>

                <div>
                  <p className="author">por {produto.autor}</p>
                  <p className="description">{produto.descricao}</p>
                </div>

              </div>
            </div>
            <div className='product-price'>
                <p className="price">R$ {produto.preco.toFixed(2)}</p>
                <button onClick={() => addToCart(produto)} className="btn">
                  Adicionar ao Carrinho
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}