import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaBook, FaInfoCircle, FaFileAlt, FaQuestionCircle, FaDonate, FaComment } from 'react-icons/fa';
import Home from './pages/Home';
import About from './pages/About';
import Books from './pages/Books';
import Doubts from './pages/Doubts';
import Donations from './pages/Donations';
import Projects from './pages/Projects';
import Feedback from './pages/Feedback';
import Transparency from './pages/Transparency';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import SidebarDecoration from './components/SidebarDecoration';
import './App.css';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Voltar
      </button>
      <div className="logo">
        <Link to="/">
          <img src="/logo.png" alt="Promoart ONG" className="logo-image" />
        </Link>
      </div>
    </header>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
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
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <SidebarDecoration /> {/* Adicionado aqui */}
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;