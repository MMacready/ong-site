import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Promoart ONG</h3>
          <p>Promovendo a educação e a cultura através da leitura, voluntariado e projetos sociais.</p>
        </div>
        <div className="footer-section">
          <h3>Links Úteis</h3>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/about">Sobre Nós</Link></li>
            <li><Link to="/projects">Projetos</Link></li>
            <li><Link to="/books">Livros</Link></li>
            <li><Link to="/doubts">Dúvidas</Link></li>
            <li><Link to="/donations">Arrecadações</Link></li>
            <li><Link to="/transparency">Transparência</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contato</h3>
          <p>Email: <a href="mailto:contato@promoart.org.br">contato@promoart.org.br</a></p>
          <p>Telefone: (11) 1234-5678</p>
        </div>
        <div className="footer-section">
          <h3>Siga-nos</h3>
          <div className="social-links">
            <a href="https://facebook.com/promoartong" target="_blank" rel="noopener noreferrer">
              <span className="social-icon">📘</span>
            </a>
            <a href="https://twitter.com/promoartong" target="_blank" rel="noopener noreferrer">
              <span className="social-icon">🐦</span>
            </a>
            <a href="https://instagram.com/promoartong" target="_blank" rel="noopener noreferrer">
              <span className="social-icon">📸</span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Promoart ONG Dev. Moises Macready. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;