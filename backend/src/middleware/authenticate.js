const jwt = require('jsonwebtoken');
//middleware de autenticação do usuario
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });

    req.userId = decoded.id;
    next();
  });
};

module.exports = authenticate;
