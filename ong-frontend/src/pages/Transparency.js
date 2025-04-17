import React, { useState, useEffect } from 'react';
import './Transparency.css';

function Transparency() {
  const [transparencyItems, setTransparencyItems] = useState([]);

  // Buscar os itens de transparência
  useEffect(() => {
    const fetchTransparencyItems = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/transparency');
        const data = await response.json();
        setTransparencyItems(data);
      } catch (error) {
        console.error('Erro ao buscar itens de transparência:', error);
      }
    };
    fetchTransparencyItems();
  }, []);

  return (
    <div className="transparency-container">
      <h1>Transparência</h1>

      {/* Seções estáticas originais */}
      <section>
        <h2></h2>
        <p>A Promoart se compromete com a transparência em todas as suas atividades. 
           Aqui, você poderá encontrar relatórios anuais, informações sobre fontes de 
           financiamento e parcerias, além de um detalhamento dos investimentos realizados 
           em cada projeto. Acreditamos que a confiança e a prestação de contas são essenciais 
           para nossa missão.</p>
      </section>

      {/* Seção para itens dinâmicos de transparência */}
      <section>
        <h2>Documentos Adicionais</h2>
        {transparencyItems.length === 0 ? (
          <p>Nenhum documento adicional disponível no momento.</p>
        ) : (
          <div className="transparency-list">
            {transparencyItems.map((item) => (
              <div key={item.id} className="transparency-item">
                <h3>{item.title}</h3>
                {item.comment && <p>{item.comment}</p>}
                {item.file_path && (
                  <a href={`http://localhost:3003${item.file_path}`} target="_blank" rel="noopener noreferrer">
                    Visualizar Arquivo
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Transparency;