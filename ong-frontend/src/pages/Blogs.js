import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Blogs.css';

function Blogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/blogs')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar posts:', error);
        setError('Erro ao buscar posts: ' + error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="blogs-container">
      <h2>Blog da Promoart ONG</h2>
      {loading && <p>Carregando posts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && posts.length === 0 && !error && <p>Nenhum post disponível.</p>}
      <div className="blog-posts">
        {posts.map(post => (
          <div key={post.id} className="blog-post">
            {post.image_url && <img src={post.image_url} alt={post.title} className="blog-image" />}
            <h3>{post.title}</h3>
            <p className="blog-meta">Por {post.author} | {new Date(post.created_at).toLocaleDateString()}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;