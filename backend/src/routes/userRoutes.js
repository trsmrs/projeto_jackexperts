const express = require('express');
const userRouter = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate'); // middleware para autenticação

// Rota para obter informações do usuário [neste caso, email]
userRouter.get('/me', authenticate, authController.getUserInfo);

module.exports = userRouter;