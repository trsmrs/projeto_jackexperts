import React, { useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dados da tarefa a serem enviados
    const taskData = {
      title,
      description
    };


    try {
      const token = localStorage.getItem('token'); // Recupera o token do localStorage

      const response = await axios.get(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Tarefa criada:', data);
        // Limpar campos após sucesso
        setTitle('');
        setDescription('');
      } else {
        console.error('Erro ao criar tarefa:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div>
      <h2>Criar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Criar Tarefa</button>
      </form>
    </div>
  );
};

export default CreateTask;
