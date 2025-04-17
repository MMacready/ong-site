import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const [projectImages, setProjectImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProjectImages = async () => {
      try {
        const res = await fetch('http://localhost:3003/api/project-images');
        const data = await res.json();
        setProjectImages(data);
      } catch (err) {
        console.error('Erro ao buscar imagens do carrossel:', err);
      }
    };

    fetchProjectImages();
  }, []);

  useEffect(() => {
    if (projectImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % projectImages.length);
      }, 3000); // Muda a cada 3 segundos

      return () => clearInterval(interval);
    }
  }, [projectImages]);

  return (
    <div className="home-container">
      {/* Seção de Banner e Mensagem */}
      <div className="intro-section">
        <div className="banner-section">
          <img
            src="/banners/banner-1.png"
            alt="Banner"
            className="banner-image"
          />
        </div>
        <div className="intro-message">
          <h2>Associação Cultural Promoart</h2>
          <p>
            A Associação Cultural Promoart é uma entidade privada, sem fins lucrativos, dedicada a transformar vidas por meio da arte, da educação e do esporte. Desde a nossa fundação em 2006, promovemos inclusão social, ampliamos o acesso à educação artística e incentivamos o desenvolvimento cultural. Nossa missão é resgatar a cidadania e capacitar profissionais, criando oportunidades e fortalecendo a comunidade.
          </p>
        </div>
      </div>

      {/* Seção de Projetos */}
      <div className="projects-section">
        <div className="projects-content">
          <div className="projects-list">
            <h2>Projetos</h2>
            <ul>
              <li><a href="https://instagram.com/ceudasartesbonanca">CEU das Artes Bonança – Yolanda A. A. Ribeiro</a></li>
              <li><a href="https://instagram.com/ceudasartes1demaio">CEU das Artes 1º de Maio – Camila da Silva Rossafa</a></li>
              <li><a href="https://instagram.com/orquestrajovemdeararaquara">Orquestra Jovem de Araraquara</a></li>
              <li><a href="https://instagram.com/projetoharmonia">Projeto Harmonia – Orquestra Infantojuvenil</a></li>
              <li><a href="https://instagram.com/recreionasferias">Recreio nas Férias</a></li>
              <li><a href="https://instagram.com/projetoluznaescuridao">Projeto Luz na Escuridão</a></li>
              <li><a href="https://instagram.com/projetoveredas">Projeto Veredas</a></li>
            </ul>
          </div>
          <div className="projects-carousel">
            {projectImages.length > 0 ? (
              <img
                src={`http://localhost:3003${projectImages[currentImage].path}`}
                alt="Imagem do Carrossel"
                className="carousel-image"
              />
            ) : (
              <p>Sem imagens no carrossel</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;