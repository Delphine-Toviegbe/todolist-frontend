import { Check, Delete } from '@mui/icons-material';
import { Alert, Box, Button, Container, IconButton, Snackbar, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [notification, setNotification] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  const handleFetchTasks = async () => {
    const fetchedTasks = await api.get('/tasks');
    setTasks(fetchedTasks);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setNotification({ message: 'Tâche supprimée avec succès', severity: 'success' });
      await handleFetchTasks();
    } catch {
      setNotification({ message: 'Erreur lors de la suppression', severity: 'error' });
    }
  };

  const handleSave = async () => {
    if (!newTaskName.trim()) {
      setNotification({ message: 'Le nom de la tâche est obligatoire', severity: 'error' });
      return;
    }

    try {
      await api.post('/tasks', {
        name: newTaskName.trim(),
        description: newTaskDescription.trim(),
        category: 'default', // adapte si nécessaire
      });
      setNotification({ message: `La tâche "${newTaskName.trim()}" a bien été créée`, severity: 'success' });
      setNewTaskName('');
      setNewTaskDescription('');
      await handleFetchTasks();
    } catch {
      setNotification({ message: 'Erreur lors de la création de la tâche', severity: 'error' });
    }
  };

  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      {/* Formulaire création tâche */}
      <Box
        mt={5}
        display="flex"
        flexDirection="column"
        gap={2}
        maxWidth={400}
        mx="auto"
      >
        <TextField
          label="Nom de la nouvelle tâche"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          size="small"
          fullWidth
        />
        <TextField
          label="Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          size="small"
          multiline
          rows={3}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ alignSelf: 'flex-end' }}>
          Ajouter
        </Button>
      </Box>

      {/* Liste des tâches */}
      <Box justifyContent="center" mt={5} flexDirection="column" display="flex" gap={2}>
        {tasks.map((task) => (
          <Box
            key={task.id}
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
            width="100%"
          >
            <TextField
              size="small"
              value={task.name}
              fullWidth
              sx={{ maxWidth: 350 }}
              disabled
            />
            <Box>
              <IconButton color="success" disabled>
                <Check />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Notification */}
      {notification && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={() => setNotification(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            severity={notification.severity}
            onClose={() => setNotification(null)}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default TodoPage;
