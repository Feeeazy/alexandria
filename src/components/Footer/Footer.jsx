// src/components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Livraria Virtual</h3>
          <p>Sua livraria online favorita</p>
        </div>
        <div className="footer-section">
          <h4>Contato</h4>
          <p>Email: contato@livrariavirtual.com</p>
          <p>Telefone: (11) 1234-5678</p>
        </div>
        <div className="footer-section">
          <h4>Links Úteis</h4>
          <ul>
            <li><a href="/sobre">Sobre Nós</a></li>
            <li><a href="/politica-privacidade">Política de Privacidade</a></li>
            <li><a href="/termos">Termos de Uso</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Livraria Virtual. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;