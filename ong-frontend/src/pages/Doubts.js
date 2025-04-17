import React, { useState } from 'react';
import './Doubts.css';

function Doubts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    doubt: '',
    rating: 0,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Permitir apenas números no campo telefone
    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, ''); // Remove qualquer caractere que não seja número
      setFormData({ ...formData, phone: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRating = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validação
    if (!formData.doubt.trim()) {
      setError('O campo de dúvida é obrigatório.');
      return;
    }
    if (formData.rating === 0) {
      setError('Por favor, selecione uma avaliação.');
      return;
    }
    if (formData.phone && !/^[0-9]+$/.test(formData.phone)) {
      setError('O campo telefone deve conter apenas números.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3003/api/doubts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Erro ao enviar a dúvida.');
      }

      setSuccess('Dúvida enviada com sucesso!');
      setFormData({ name: '', email: '', phone: '', doubt: '', rating: 0 });
    } catch (err) {
      setError('Não foi possível enviar a dúvida. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <div className="container doubts-container">
      <h2>Dúvidas Frequentes</h2>
      <p>Aqui você pode enviar suas dúvidas sobre a Promoart ONG.</p>

      <form onSubmit={handleSubmit} className="doubts-form">
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu e-mail"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Telefone (apenas números):</label>
          <input
            type="text" // Alterado de type="tel" para type="text" para maior controle
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Digite seu telefone"
          />
        </div>

        <div className="form-group">
          <label htmlFor="doubt">Dúvida (obrigatório):</label>
          <textarea
            id="doubt"
            name="doubt"
            value={formData.doubt}
            onChange={handleChange}
            placeholder="Escreva sua dúvida aqui"
            required
          />
        </div>

        <div className="form-group">
          <label>Avaliação:</label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${formData.rating >= star ? 'filled' : ''}`}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit" className="submit-button">
          Enviar Dúvida
        </button>
      </form>
    </div>
  );
}

export default Doubts;