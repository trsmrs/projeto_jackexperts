const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');

// Rota para registro de usuário
authRouter.post('/register', authController.register);

// Rota para login de usuário
authRouter.post('/login', authController.login);

module.exports = authRouter;
