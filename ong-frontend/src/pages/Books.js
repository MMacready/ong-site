import React, { useState, useEffect } from 'react';
import './Books.css';

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:3003/api/books');
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error('Erro ao buscar livros:', err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="books-container">
      <h2>Livros</h2>
      {books.length > 0 ? (
        <div className="books-list">
          {books.map((book) => (
            <div key={book.id} className="book-item">
              {book.image && (
                <img src={`http://localhost:3003${book.image}`} alt={book.title} className="book-image" />
              )}
              <div className="book-details">
                <h3>{book.title}</h3>
                <p><strong>Autor:</strong> {book.author}</p>
                {book.synopsis && <p><strong>Sinopse:</strong> {book.synopsis}</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum livro disponível no momento.</p>
      )}
    </div>
  );
}

export default Books;