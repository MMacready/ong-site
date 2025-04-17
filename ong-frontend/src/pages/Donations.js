import React, { useState } from 'react';
import './Donations.css';

function Donations() {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    message: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validação
    if (!formData.name.trim() || !formData.amount.trim()) {
      setError('Nome e valor da doação são obrigatórios.');
      return;
    }
    if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
      setError('O valor da doação deve ser um número positivo.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3003/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Erro ao enviar a doação.');
      }

      setSuccess('Doação enviada com sucesso! Agradecemos sua contribuição.');
      setFormData({ name: '', amount: '', message: '' });
    } catch (err) {
      setError('Não foi possível enviar a doação. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <div className="container donations-container">
      <h2>Arrecadações</h2>
      <p>Contribua com a ONG Promoart e ajude a transformar vidas através da educação e cultura.</p>

      <form onSubmit={handleSubmit} className="donations-form">
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Valor da Doação (R$):</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Digite o valor"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensagem (opcional):</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Escreva uma mensagem (opcional)"
          />
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit" className="submit-button">Enviar Doação</button>
      </form>
    </div>
  );
}

export default Donations;