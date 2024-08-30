const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Config para o caminho do banco de dados
const dbPath = path.resolve(__dirname, '../data/database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Criar tabelas
function createTables() {
  db.serialize(() => {
    // Cria a tabela de usuários se não existir
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.error('Erro ao criar tabela de usuários:', err.message);
      }
    });

    // Cria a tabela de tarefas se não existir
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      user_id INTEGER,
      completed BOOLEAN DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`, (err) => {
      if (err) {
        console.error('Erro ao criar tabela de tarefas:', err.message);
      }
    });
  });
}

// Executar a função criar tabelas
createTables();

// Fecha o banco de dados quando o processo é encerrado
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar o banco de dados:', err.message);
    } else {
      console.log('Banco de dados fechado.');
    }
    process.exit(0);
  });
});

module.exports = db;
