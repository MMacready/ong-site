import React from 'react';
import './About.css'; // Assumindo que existe um arquivo About.css

function About() {
  return (
    <div className="about-container">
      <h1>Sobre Nós</h1>
      <div className="about-content">
        <p>
          A Promoart ONG é uma organização sem fins lucrativos fundada em 2010, com a missão de transformar vidas por meio da educação e da cultura. Atuamos em comunidades vulneráveis, promovendo o acesso à leitura, à arte e à música, e incentivando o desenvolvimento pessoal e coletivo.
        </p>
        <p>
          Nosso principal objetivo é empoderar indivíduos e fortalecer laços comunitários através de projetos sociais que impactem diretamente a vida de crianças, jovens e adultos. Já realizamos mais de 50 projetos, beneficiando milhares de pessoas em parceria com escolas, bibliotecas e centros culturais.
        </p>
        <p>
          Além disso, contamos com a colaboração de voluntários dedicados e doadores que acreditam no poder da educação como ferramenta de mudança social. Junte-se a nós e faça parte dessa transformação!
        </p>
      </div>
    </div>
  );
}

export default About;