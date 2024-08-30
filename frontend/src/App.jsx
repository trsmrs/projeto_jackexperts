import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Register from './components/Register';
import CreateTask from './components/CreateTask';
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { history } from './useNavigate';

import { ThemeProvider } from '@mui/material/styles';
import DarkTheme from './components/DarkTheme'; 
import { lightTheme, darkTheme } from './themes/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles, Box } from '@mui/material';

function App() {
  // salvar o thema selecionado
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const handleThemeChange = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('isDarkMode', JSON.stringify(newTheme)); // salva o tema no localStorage
    console.log('Dark Mode:', newTheme);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme => theme.palette.background.default,
            color: theme => theme.palette.text.primary,
            margin: 0,
            padding: 0,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      />
      <Box 
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <DarkTheme onChange={handleThemeChange} checked={isDarkMode} />
        <AuthProvider>
          <Router history={history}>
            <Routes>
              <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/register" element={<Register />} />
              <Route path="/create-task" element={<PrivateRoute><CreateTask /></PrivateRoute>} />
            </Routes>
          </Router>
        </AuthProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
