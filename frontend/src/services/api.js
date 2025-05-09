import axios from 'axios';
import { history } from '../useNavigate';

const API_URL = process.env.REACT_APP_API_URL; // URL do backend


const api = axios.create({
  baseURL: API_URL,
});

// Interceptador de requisições para adicionar o token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptador de respostas para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        console.log('Token expirado ou sem permissão, redirecionando...');
        localStorage.removeItem('token');
        history.replace('/login');
        window.location.assign('/login'); 
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// registra usuário
export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post(`${API_URL}/auth/register`, { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fazer login
export const loginUser = async (email, password) => {
  try {
    const response = await api.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Falha ao fazer login');
  }
};

// Criar tarefa
export const createTask = async (task) => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.post(`${API_URL}/tasks`, task, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // incluir o token no header
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar tarefa');
  }
};

// Obter tarefas
export const getTasks = async () => {
  const token = localStorage.getItem('token'); // se o token estiver no localstorage
  try {
    const response = await api.get(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data || [];
  } catch (error) {
    console.error('Erro ao consultar tarefas:', error.response.data);
    
    return [];
  }
};

// Editar tarefa
export const updateTask = async (taskId, title, description) => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.put(
      `${API_URL}/tasks/${taskId}`,
      { title, description },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Deletar tarefa
export const deleteTask = async (taskId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.delete(`${API_URL}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Marcar uma tarefa como concluída
export const updateTaskStatus = async (taskId) => {
  const token = localStorage.getItem('token');
  try {
    console.log(`Tentando atualizar a tarefa com ID: ${taskId}`);
    
    const response = await api.put(`${API_URL}/tasks/${taskId}/complete`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });
    
    console.log('Resposta da API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao marcar a tarefa como concluída:', error.response ? error.response.data : error.message);
    throw new Error('Erro ao marcar a tarefa como concluída');
  }
};


