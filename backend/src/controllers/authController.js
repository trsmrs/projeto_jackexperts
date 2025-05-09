const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../utils/database');

// Função para gerar um token JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, name: user.name }, process.env.SECRET_KEY, { expiresIn: '7d' });
};


// Controlador para obter informações do usuário logado
const getUserInfo = (req, res) => {
  const userId = req.userId;

  db.get('SELECT id, name, email FROM users WHERE id = ?', [userId], (err, user) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar informações do usuário' });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.json(user);
  });
};

// Controlador para registro de usuário
const register = (req, res) => {
  const { name, email, password } = req.body;

  // Hash da senha
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao registrar usuário' });
      }

      res.status(201).json({ message: 'Usuário registrado com sucesso' });
    }
  );
};

// Controlador para login de usuário
const login = (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar usuário' });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = generateToken(user);
    res.json({ token });
  });
};

module.exports = { register, login, getUserInfo };


