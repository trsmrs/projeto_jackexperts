const db = require('../utils/database');
//controladores de tarefas


// Cria nova tarefa
const createTask = (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId; // Obtém o ID do usuário da requisição

  if (!title) return res.status(400).json({ error: 'Título é necessário' });

  db.run(
    'INSERT INTO tasks (title, description, user_id, completed) VALUES (?, ?, ?, ?)',
    [title, description, userId, 0], // O valor default para completed é 0 (não concluído)
    function(err) {
      if (err) return res.status(500).json({ error: 'Erro ao criar tarefa' });
      res.status(201).json({ id: this.lastID });
    }
  );
};

// Atualiza uma tarefa existente
const updateTask = (req, res) => {
  const { title, description } = req.body;
  const taskId = req.params.id;
  const userId = req.userId;

  db.run(
    'UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?',
    [title, description, taskId, userId],
    function(err) {
      if (err) return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
      if (this.changes === 0) return res.status(404).json({ error: 'Tarefa não encontrada' });
      res.json({ message: 'Tarefa atualizada' });
    }
  );
};

// Atualiza o status da tarefa, se concluída ou nao
const updateTaskStatus = (req, res) => {
  const { id } = req.params;

  db.get('SELECT completed FROM tasks WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar status da tarefa' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    const newStatus = row.completed ? 0 : 1;

    db.run('UPDATE tasks SET completed = ? WHERE id = ?', [newStatus, id], function (err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar status da tarefa' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      res.status(200).json({ message: `Tarefa marcada como ${newStatus ? 'concluída' : 'não concluída'}` });
    });
  });
};

// Apagar a tarefa
const deleteTask = (req, res) => {
  const taskId = req.params.id;
  const userId = req.userId;

  db.run(
    'DELETE FROM tasks WHERE id = ? AND user_id = ?',
    [taskId, userId],
    function(err) {
      if (err) return res.status(500).json({ error: 'Erro ao deletar tarefa' });
      if (this.changes === 0) return res.status(404).json({ error: 'Tarefa não encontrada' });
      res.json({ message: 'Tarefa deletada' });
    }
  );
};

// Pegar as tarefas do banco
const getTasks = (req, res) => {
  const userId = req.userId;

  db.all(
    'SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC',
    [userId],
    (err, tasks) => {
      if (err) return res.status(500).json({ error: 'Erro ao buscar tarefas' });
      res.json(tasks);
    }
  );
};

module.exports = { createTask, updateTask, deleteTask, getTasks, updateTaskStatus };
