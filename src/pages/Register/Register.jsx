import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função para formatar CPF
  const formatCPF = (value) => {
    // Remove tudo que não é dígito
    const cleanValue = value.replace(/\D/g, '');
    
    // Aplica a máscara
    if (cleanValue.length <= 11) {
      return cleanValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2');
    }
    
    return cleanValue.slice(0, 11)
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Função para validar CPF
  const isValidCPF = (cpf) => {
    const cleanCPF = cpf.replace(/\D/g, '');
    
    if (cleanCPF.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
    
    // Validação do algoritmo do CPF
    let sum = 0;
    let remainder;
    
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;
    
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      const formattedCPF = formatCPF(value);
      setFormData({
        ...formData,
        [name]: formattedCPF
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validações
    if (!formData.nome.trim()) {
      setError('Nome é obrigatório');
      setIsLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('Email é obrigatório');
      setIsLoading(false);
      return;
    }

    if (!formData.cpf.trim()) {
      setError('CPF é obrigatório');
      setIsLoading(false);
      return;
    }

    if (!isValidCPF(formData.cpf)) {
      setError('CPF inválido');
      setIsLoading(false);
      return;
    }

    if (formData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    if (formData.senha !== formData.confirmPassword) {
      setError('As senhas não conferem');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome.trim(),
          email: formData.email.trim().toLowerCase(),
          cpf: formData.cpf.replace(/\D/g, ''), // Envia apenas os números
          senha: formData.senha
        })
      });

      if (!response.ok) {
        let errorMessage = 'Erro no cadastro';
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || 'Email ou CPF já cadastrado no sistema';
        } catch {
          if (response.status === 409 || response.status === 400) {
            errorMessage = 'Email ou CPF já cadastrado no sistema';
          }
        }
        
        throw new Error(errorMessage);
      }

      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (err) {
      console.error('Erro no cadastro:', err);
      setError(err.message || 'Erro interno do servidor. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="container">
        <h1>Cadastro</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="register-form">
          <div>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          
          <div>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              maxLength="14"
              disabled={isLoading}
              required
            />
          </div>
          
          <div>
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              disabled={isLoading}
              minLength="6"
              required
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword">Confirmar Senha:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
          
          <p>
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}