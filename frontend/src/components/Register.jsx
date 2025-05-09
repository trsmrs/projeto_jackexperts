import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { Box, TextField, Button, Typography, Link, useTheme } from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const theme = useTheme();
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(name, email, password);
      setSuccess('Usuário registrado com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.error || 'Erro ao registrar usuário, este e-mail já existe');
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

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
          borderColor: '292929',
          borderRadius: '8px',
          padding: '24px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: 3,
        }}
      >
        <form onSubmit={handleRegister}>
          <Typography variant="h4" component="h1" gutterBottom>
            Registrar
          </Typography>
          <TextField
            label="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
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
          {success && (
            <Typography color="success.main" sx={{ mt: 2 }}>
              {success}
            </Typography>
          )}
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
            Registrar
          </Button>
          <Link
            href="/login"
            variant="body2"
            sx={{ display: 'block', textAlign: 'center', mt: 2 }}
          >
            Login
          </Link>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
