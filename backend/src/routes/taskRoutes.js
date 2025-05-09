const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticate = require('../middleware/authenticate');

// Rotas de tarefas
router.post('/', authenticate, taskController.createTask);
router.put('/:id', authenticate, taskController.updateTask);
router.delete('/:id', authenticate, taskController.deleteTask);
router.get('/', authenticate, taskController.getTasks);



// Adicionar rota para marcar uma tarefa como concluída
// foi implementada depois de tudo pronto, não li com muita atenção os requs
router.put('/:id/complete', authenticate, taskController.updateTaskStatus);

module.exports = router;
