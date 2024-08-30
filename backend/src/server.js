require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const authenticate = require('./middleware/authenticate');

// config do cors
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

//
app.use(cors(corsOptions));
app.use(express.json());

// rotas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticate, taskRoutes);
app.use('/api/users', authenticate, userRoutes);

const port = 3001;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
