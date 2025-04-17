import React, { useState } from 'react';
import './Feedback.css';

function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    feedback: '',
    rating: 0,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRating = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validação
    if (!formData.feedback.trim()) {
      setError('O campo de feedback é obrigatório.');
      return;
    }
    if (formData.rating === 0) {
      setError('Por favor, selecione uma avaliação.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3003/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Erro ao enviar o feedback.');
      }

      setSuccess('Feedback enviado com sucesso!');
      setFormData({ name: '', email: '', phone: '', feedback: '', rating: 0 });
    } catch (err) {
      setError('Não foi possível enviar o feedback. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <div className="container feedback-container">
      <h2>Feedback</h2>
      <p>Deixe seu feedback sobre a Promoart ONG. Sua opinião é muito importante para nós!</p>

      <form onSubmit={handleSubmit} className="feedback-form">
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
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Digite seu telefone"
            pattern="[0-9]*"
          />
        </div>

        <div className="form-group">
          <label htmlFor="feedback">Feedback (obrigatório):</label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Escreva seu feedback aqui"
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
          Enviar Feedback
        </button>
      </form>
    </div>
  );
}

export default Feedback;