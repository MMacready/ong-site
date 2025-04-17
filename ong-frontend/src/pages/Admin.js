import React, { useState, useEffect } from 'react';
import './Admin.css';

function Admin() {
  const [aboutContent, setAboutContent] = useState('');
  const [aboutImage, setAboutImage] = useState(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectImage, setProjectImage] = useState(null);
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookSynopsis, setBookSynopsis] = useState('');
  const [bookImage, setBookImage] = useState(null);
  const [projectImageFile, setProjectImageFile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [books, setBooks] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [transparencyTitle, setTransparencyTitle] = useState('');
  const [transparencyComment, setTransparencyComment] = useState('');
  const [transparencyFile, setTransparencyFile] = useState(null);
  const [transparencyItems, setTransparencyItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  // Estado para verificar a conectividade com o backend
  const [backendStatus, setBackendStatus] = useState('Verificando conexão com o backend...');

  // Função para limpar mensagem de erro após 5 segundos
  const clearErrorMessage = () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  // Função para verificar a conectividade com o backend
  const checkBackendStatus = async () => {
    try {
      const res = await fetch('http://localhost:3003/api/health');
      if (!res.ok) throw new Error('Backend não está respondendo');
      const data = await res.json();
      setBackendStatus(data.status);
    } catch (err) {
      setBackendStatus('Erro: Não foi possível conectar ao backend. Verifique se o servidor está rodando na porta 3003.');
      console.error('Erro ao verificar backend:', err);
    }
  };

  // Buscar dados ao carregar a página
  useEffect(() => {
    // Verificar a conectividade com o backend ao carregar a página
    checkBackendStatus();

    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:3003/api/projects');
        if (!res.ok) throw new Error('Erro na requisição ao buscar projetos');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setErrorMessage('Erro ao buscar projetos: ' + err.message);
        clearErrorMessage();
        console.error('Erro ao buscar projetos:', err);
      }
    };

    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:3003/api/books');
        if (!res.ok) throw new Error('Erro na requisição ao buscar livros');
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        setErrorMessage('Erro ao buscar livros: ' + err.message);
        clearErrorMessage();
        console.error('Erro ao buscar livros:', err);
      }
    };

    const fetchCarouselImages = async () => {
      try {
        const res = await fetch('http://localhost:3003/api/project-images');
        if (!res.ok) throw new Error('Erro na requisição ao buscar imagens do carrossel');
        const data = await res.json();
        setCarouselImages(data);
      } catch (err) {
        setErrorMessage('Erro ao buscar imagens do carrossel: ' + err.message);
        clearErrorMessage();
        console.error('Erro ao buscar imagens do carrossel:', err);
      }
    };

    const fetchTransparencyItems = async () => {
      try {
        const res = await fetch('http://localhost:3003/api/transparency');
        if (!res.ok) throw new Error('Erro na requisição ao buscar itens de transparência');
        const data = await res.json();
        setTransparencyItems(data);
      } catch (err) {
        setErrorMessage('Erro ao buscar itens de transparência: ' + err.message);
        clearErrorMessage();
        console.error('Erro ao buscar itens de transparência:', err);
      }
    };

    fetchProjects();
    fetchBooks();
    fetchCarouselImages();
    fetchTransparencyItems();
  }, []);

  const handleAboutSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const formData = new FormData();
    formData.append('content', aboutContent);
    if (aboutImage) formData.append('image', aboutImage);

    try {
      const res = await fetch('http://localhost:3003/api/about', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erro na requisição');
      }
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      setErrorMessage('Erro ao atualizar Sobre Nós: ' + err.message);
      clearErrorMessage();
      console.error('Erro ao atualizar Sobre Nós:', err);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const formData = new FormData();
    formData.append('title', projectTitle);
    formData.append('description', projectDescription);
    if (projectImage) formData.append('image', projectImage);

    try {
      const res = await fetch('http://localhost:3003/api/projects', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erro na requisição');
      }
      const data = await res.json();
      alert(data.message);
      setProjectTitle('');
      setProjectDescription('');
      setProjectImage(null);
      const updatedProjects = await fetch('http://localhost:3003/api/projects').then((res) => {
        if (!res.ok) throw new Error('Erro ao atualizar lista de projetos');
        return res.json();
      });
      setProjects(updatedProjects);
    } catch (err) {
      setErrorMessage('Erro ao adicionar projeto: ' + err.message);
      clearErrorMessage();
      console.error('Erro ao adicionar projeto:', err);
    }
  };

  const handleDeleteProject = async (id) => {
    setErrorMessage('');
    try {
      const res = await fetch(`http://localhost:3003/api/projects/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erro na requisição');
      }
      const data = await res.json();
      alert(data.message);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (err) {
      setErrorMessage('Erro ao excluir projeto: ' + err.message);
      clearErrorMessage();
      console.error('Erro ao excluir projeto:', err);
    }
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const formData = new FormData();
    formData.append('title', bookTitle);
    formData.append('author', bookAuthor);
    formData.append('synopsis', bookSynopsis);
    if (bookImage) formData.append('image', bookImage);

    try {
      const res = await fetch('http://localhost:3003/api/books', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erro na requisição');
      }
      const data = await res.json();
      alert(data.message);
      setBookTitle('');
      setBookAuthor('');
      setBookSynopsis('');
      setBookImage(null);
      const updatedBooks = await fetch('http://localhost:3003/api/books').then((res) => {
        if (!res.ok) throw new Error('Erro ao atualizar lista de livros');
        return res.json();
      });
      setBooks(updatedBooks);
    } catch (err) {
      setErrorMessage('Erro ao adicionar livro: ' + err.message);
      clearErrorMessage();
      console.error('Erro ao adicionar livro:', err);
    }
  };

  const handleDeleteBook = async (id) => {
    setErrorMessage('');
    try {
      const res = await fetch(`http://localhost:3003/api/books/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erro na requisição');
      }
      const data = await res.json();
      alert(data.message);
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      setErrorMessage('Erro ao excluir livro: ' + err.message);
      clearErrorMessage();
      console.error('Erro ao excluir livro:', err);
    }
  };

  const handleProjectImageSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!projectImageFile) {
      setErrorMessage('Por favor, selecione uma imagem antes de enviar.');
      clearErrorMessage();
      return;
    }

    const formData = new FormData();
    formData.append('image', projectImageFile);

    try {
      console.log('Enviando imagem para o carrossel...');
      const res = await fetch('http://localhost:3003/api/project-images', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erro na requisição');
      }
      const data = await res.json();
      console.log('Resposta do backend:', data);
      alert(data.message);
      setProjectImageFile(null);
      const updatedImages = await fetch('http://localhost:3003/api/project-images').then((res) => {
        if (!res.ok) throw new Error('Erro ao atualizar lista de imagens do carrossel');
        return res.json();
      });
      setCarouselImages(updatedImages);
    } catch (err) {
      setErrorMessage('Erro ao adicionar imagem do carrossel: ' + err.message);
      clearErrorMessage();
      console.error('Erro ao adicionar imagem do carrossel no frontend:', err);
    }
  };

  const handleDeleteProjectImage = async (id) => {
    setErrorMessage('');
    try {
      const res = await fetch(`http://localhost:3003/api/project-images/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erro na requisição');
      }
      const data = await res.json();
      alert(data.message);
      setCarouselImages(carouselImages.filter((image) => image.id !== id));
    } catch (err) {
      setErrorMessage('Erro ao excluir imagem do carrossel: ' + err.message);
      clearErrorMessage();
      console.error('Erro ao excluir imagem do carrossel:', err);
    }
  };

  const handleTransparencySubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const formData = new FormData();
    formData.append('title', transparencyTitle);
    formData.append('comment', transparencyComment);
    if (transparencyFile) formData.append('file', transparencyFile);

    try {
      const res = await fetch('http://localhost:3003/api/transparency', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erro na requisição');
      }
      const data = await res.json();
      alert(data.message);
      setTransparencyTitle('');
      setTransparencyComment('');
      setTransparencyFile(null);
      const updatedTransparencyItems = await fetch('http://localhost:3003/api/transparency').then((res) => {
        if (!res.ok) throw new Error('Erro ao atualizar lista de itens de transparência');
        return res.json();
      });
      setTransparencyItems(updatedTransparencyItems);
    } catch (err) {
      setErrorMessage('Erro ao adicionar item de transparência: ' + err.message);
      clearErrorMessage();
      console.error('Erro ao adicionar item de transparência:', err);
    }
  };

  const handleDeleteTransparency = async (id) => {
    setErrorMessage('');
    try {
      const res = await fetch(`http://localhost:3003/api/transparency/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erro na requisição');
      }
      const data = await res.json();
      alert(data.message);
      setTransparencyItems(transparencyItems.filter((item) => item.id !== id));
    } catch (err) {
      setErrorMessage('Erro ao excluir item de transparência: ' + err.message);
      clearErrorMessage();
      console.error('Erro ao excluir item de transparência:', err);
    }
  };

  return (
    <div className="admin-container">
      <h2>Painel de Administração</h2>

      {/* Exibir status do backend */}
      <div className="backend-status">
        {backendStatus}
      </div>

      {/* Exibir mensagem de erro, se houver */}
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      {/* Formulário para Sobre Nós */}
      <div className="admin-section">
        <h3>Atualizar Sobre Nós</h3>
        <form onSubmit={handleAboutSubmit}>
          <label>
            Conteúdo:
            <textarea
              value={aboutContent}
              onChange={(e) => setAboutContent(e.target.value)}
              required
            />
          </label>
          <label>
            Imagem:
            <input
              type="file"
              onChange={(e) => setAboutImage(e.target.files[0])}
            />
          </label>
          <button type="submit">Atualizar</button>
        </form>
      </div>

      {/* Formulário e Lista de Projetos */}
      <div className="admin-section">
        <h3>Adicionar Projeto</h3>
        <form onSubmit={handleProjectSubmit}>
          <label>
            Título:
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Descrição:
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Imagem:
            <input
              type="file"
              onChange={(e) => setProjectImage(e.target.files[0])}
            />
          </label>
          <button type="submit">Adicionar</button>
        </form>

        <h3>Projetos Adicionados</h3>
        {projects.length > 0 ? (
          <ul className="admin-list">
            {projects.map((project) => (
              <li key={project.id}>
                <span>{project.title}</span>
                <button onClick={() => handleDeleteProject(project.id)} className="delete-button">
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum projeto adicionado.</p>
        )}
      </div>

      {/* Formulário e Lista de Livros */}
      <div className="admin-section">
        <h3>Adicionar Livro</h3>
        <form onSubmit={handleBookSubmit}>
          <label>
            Título:
            <input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Autor:
            <input
              type="text"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
              required
            />
          </label>
          <label>
            Sinopse:
            <textarea
              value={bookSynopsis}
              onChange={(e) => setBookSynopsis(e.target.value)}
              required
            />
          </label>
          <label>
            Imagem:
            <input
              type="file"
              onChange={(e) => setBookImage(e.target.files[0])}
            />
          </label>
          <button type="submit">Adicionar</button>
        </form>

        <h3>Livros Adicionados</h3>
        {books.length > 0 ? (
          <ul className="admin-list">
            {books.map((book) => (
              <li key={book.id}>
                <div className="book-info">
                  <span>{book.title} - {book.author}</span>
                  {book.synopsis && <p className="synopsis">{book.synopsis}</p>}
                </div>
                <button onClick={() => handleDeleteBook(book.id)} className="delete-button">
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum livro adicionado.</p>
        )}
      </div>

      {/* Formulário e Lista de Imagens do Carrossel */}
      <div className="admin-section">
        <h3>Adicionar Imagem ao Carrossel de Projetos</h3>
        <form onSubmit={handleProjectImageSubmit}>
          <label>
            Imagem:
            <input
              type="file"
              onChange={(e) => setProjectImageFile(e.target.files[0])}
              required
            />
          </label>
          <button type="submit">Adicionar Imagem</button>
        </form>

        <h3>Imagens do Carrossel</h3>
        {carouselImages.length > 0 ? (
          <ul className="admin-list">
            {carouselImages.map((image) => (
              <li key={image.id}>
                <img src={`http://localhost:3003${image.path}`} alt="Carrossel" className="thumbnail" />
                <button onClick={() => handleDeleteProjectImage(image.id)} className="delete-button">
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma imagem adicionada.</p>
        )}
      </div>

      {/* Formulário e Lista de Itens de Transparência */}
      <div className="admin-section">
        <h3>Adicionar Item de Transparência</h3>
        <form onSubmit={handleTransparencySubmit}>
          <label>
            Título:
            <input
              type="text"
              value={transparencyTitle}
              onChange={(e) => setTransparencyTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Comentário (opcional):
            <textarea
              value={transparencyComment}
              onChange={(e) => setTransparencyComment(e.target.value)}
            />
          </label>
          <label>
            Arquivo (PDF ou Imagem, opcional):
            <input
              type="file"
              accept="application/pdf,image/jpeg,image/png"
              onChange={(e) => setTransparencyFile(e.target.files[0])}
            />
          </label>
          <button type="submit">Adicionar</button>
        </form>

        <h3>Itens de Transparência Adicionados</h3>
        {transparencyItems.length > 0 ? (
          <ul className="admin-list">
            {transparencyItems.map((item) => (
              <li key={item.id}>
                <div className="transparency-info">
                  <span>{item.title}</span>
                  {item.comment && <p className="comment">{item.comment}</p>}
                  {item.file_path && (
                    <a href={`http://localhost:3003${item.file_path}`} target="_blank" rel="noopener noreferrer">
                      Visualizar Arquivo
                    </a>
                  )}
                </div>
                <button onClick={() => handleDeleteTransparency(item.id)} className="delete-button">
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum item de transparência adicionado.</p>
        )}
      </div>
    </div>
  );
}

export default Admin;