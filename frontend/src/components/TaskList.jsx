import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask, updateTaskStatus, createTask } from '../services/api';
import styles from '../styles/TaskList.module.css';
import { Box, Typography, Button, TextField, Checkbox, FormControlLabel, useTheme, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [error, setError] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response);
      } catch (error) {
        setError('Erro ao buscar tarefas');
        console.error('Erro ao buscar tarefas', error);
      }
    };
    fetchTasks();
  }, []);

  const handleComplete = async (taskId) => {
    try {
      const taskExists = tasks.some(task => task.id === taskId);
      if (!taskExists) {
        throw new Error('Tarefa não encontrada');
      }

      await updateTaskStatus(taskId);
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
    } catch (error) {
      setError(error.message || 'Erro ao atualizar status da tarefa');
      console.error('Erro ao atualizar status da tarefa:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const taskExists = tasks.some(task => task.id === taskId);
      if (!taskExists) {
        throw new Error('Tarefa não encontrada para exclusão');
      }

      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      setError('Erro ao deletar tarefa');
      console.error('Erro ao deletar tarefa', error);
    }
  };

  const handleEdit = (task) => {
    setEditTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      await updateTask(editTaskId, editTitle, editDescription, token);
      setTasks(tasks.map(task =>
        task.id === editTaskId ? { ...task, title: editTitle, description: editDescription } : task
      ));
      setEditTaskId(null);
      setEditTitle('');
      setEditDescription('');
      const response = await getTasks();
      setTasks(response);
    } catch (error) {
      setError('Erro ao atualizar tarefa');
      console.error('Erro ao atualizar tarefa', error);
    }
  };

  const handleAddTask = async () => {
    try {
      await createTask({ title: newTaskTitle, description: newTaskDescription });
      const response = await getTasks();
      setTasks(response);
      setNewTaskTitle('');
      setNewTaskDescription('');
    } catch (error) {
      setError('Erro ao adicionar tarefa');
      console.error('Erro ao adicionar tarefa', error);
    }
  };

  const handleOpenDialog = (taskId) => {
    setTaskToDelete(taskId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTaskToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await handleDelete(taskToDelete);
      handleCloseDialog();
    }
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
      <Box
        sx={{
          width: '100%',
          maxWidth: '700px',
          bgcolor: theme.palette.mode === 'dark' ? '#292929' : 'background.paper',
          borderRadius: 1,
          boxShadow: 7,
          padding: '16px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Minhas Tarefas
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Título da tarefa"
            variant="outlined"
            fullWidth
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Descrição da tarefa"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleAddTask}>
            Adicionar Tarefa
          </Button>
        </Box>

        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {tasks.length === 0 ? (
            <Typography>Nenhuma tarefa encontrada</Typography>
          ) : (
            tasks.map(task => (
              <li key={task.id} className={task.completed ? styles.completed : styles.taskItem}>
                {editTaskId === task.id ? (
                  <>
                    <TextField
                      label="Título"
                      variant="outlined"
                      fullWidth
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      label="Descrição"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleUpdate}>
                      Atualizar
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography>{task.description}</Typography>
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Button variant="contained" onClick={() => handleEdit(task)}>
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleOpenDialog(task.id)}
                      >
                        Excluir
                      </Button>
                    </Box>
                    <Box sx={{ mt: 2, mb: 2 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={task.completed}
                            onChange={() => handleComplete(task.id)}
                          />
                        }
                        label="Concluída?"
                      />
                    </Box>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Excluir Tarefa</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Tem certeza de que deseja excluir esta tarefa?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskList;
