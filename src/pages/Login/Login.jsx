import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementar lógica de login aqui
    console.log('Login:', { email, password });
  };

  return (
    <div className="login">
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn">Entrar</button>
          
          <p>
            Não tem uma conta? <Link to="/register">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
}