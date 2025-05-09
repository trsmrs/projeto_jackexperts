import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import { Box, Button } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100vh',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
      }}
    >
      <header style={{ width: '100%', textAlign: 'end' }}>
        <UserInfo />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          sx={{ marginTop: '16px' }}
        >
          Logout
        </Button>
      </header>
      <section style={{ width: '100%', marginTop: '32px' }}>
        <TaskList />
      </section>
    </Box>
  );
};

export default Home;
