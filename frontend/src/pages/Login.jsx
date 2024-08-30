import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from '../services/api';
import { Box, TextField, Button, Typography, Link, useTheme } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken } = useAuth(); 
  const theme = useTheme()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token); 
      setToken(data.token); 
      navigate('/home');
    } catch (error) {
      setError('Erro ao fazer login');
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.mode === 'dark' ? '#292929' : 'background.paper',
          border: '1px solid',
          borderColor: '#292929',
          borderRadius: '8px',
          padding: '24px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: 12,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" component="h2" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Entrar
          </Button>
          <Link
            href="/register"
            variant="body2"
            sx={{ display: 'block', textAlign: 'center', mt: 2 }}
          >
            Registrar
          </Link>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
