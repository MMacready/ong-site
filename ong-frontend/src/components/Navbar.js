import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaBook, FaInfoCircle, FaFileAlt, FaQuestionCircle, FaDonate, FaComment, FaArrowLeft } from 'react-icons/fa';
import Home from './pages/Home';
import About from './pages/About';
import Books from './pages/Books';
import Doubts from './pages/Doubts';
import Donations from './pages/Donations';
import Projects from './pages/Projects';
import Feedback from './pages/Feedback';
import Transparency from './pages/Transparency';
import Admin from './pages/Admin';
import './App.css';

function Header() {
  return null; // Removido o Header, já que o logo será movido para o Navbar
}

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="Promoart ONG" className="logo-image" />
          </Link>
        </div>
        <ul className="navbar-list">
          <li>
            <button onClick={() => navigate(-1)} className="nav-link">
              <FaArrowLeft className="nav-icon" /> Voltar
            </button>
          </li>
          <li>
            <Link to="/">
              <FaHome className="nav-icon" /> Início
            </Link>
          </li>
          <li>
            <Link to="/projects">
              <FaProjectDiagram className="nav-icon" /> Projetos
            </Link>
          </li>
          <li>
            <Link to="/books">
              <FaBook className="nav-icon" /> Livros
            </Link>
          </li>
          <li>
            <Link to="/about">
              <FaInfoCircle className="nav-icon" /> Sobre Nós
            </Link>
          </li>
          <li>
            <Link to="/transparency">
              <FaFileAlt className="nav-icon" /> Transparência
            </Link>
          </li>
          <li>
            <Link to="/doubts">
              <FaQuestionCircle className="nav-icon" /> Dúvidas
            </Link>
          </li>
          <li>
            <Link to="/donations">
              <FaDonate className="nav-icon" /> Arrecadações
            </Link>
          </li>
          <li>
            <Link to="/feedback">
              <FaComment className="nav-icon" /> Feedback
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<Books />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/doubts" element={<Doubts />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/transparency" element={<Transparency />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;