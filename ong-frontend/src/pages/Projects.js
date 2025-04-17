import React, { useState, useEffect } from 'react';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:3003/api/projects');
        if (!res.ok) {
          throw new Error('Erro ao buscar projetos.');
        }
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error('Erro ao carregar projetos:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container projects-container">
      <h2>Projetos</h2>
      {projects.length === 0 ? (
        <p>Nenhum projeto disponível no momento.</p>
      ) : (
        <div className="projects-list">
          {projects.map((project) => (
            <div key={project.id} className="project-item">
              {project.image && (
                <img
                  src={`http://localhost:3003${project.image}`} // Incluí a URL completa
                  alt={project.title}
                  className="project-image"
                  onError={(e) => console.log(`Erro ao carregar imagem: ${project.image}`)}
                />
              )}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;