import { Check, Delete, Edit } from '@mui/icons-material';
import { Alert, Box, Button, Container, IconButton, Snackbar, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editableTaskNames, setEditableTaskNames] = useState<Record<number, string>>({});
  const [notification, setNotification] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);
  const [newTaskName, setNewTaskName] = useState('');

  const handleFetchTasks = async () => {
  const fetchedTasks: Task[] = await api.get('/tasks');
  setTasks(fetchedTasks);

  const namesMap: Record<number, string> = {};
  fetchedTasks.forEach((task: Task) => {
    namesMap[task.id] = task.name;
  });
  setEditableTaskNames(namesMap);
  console.log('Tâches récupérées:', fetchedTasks);
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
        category: 'default',
      });
      setNotification({ message: `La tâche "${newTaskName.trim()}" a bien été créée`, severity: 'success' });
      setNewTaskName('');
      await handleFetchTasks();
    } catch {
      setNotification({ message: 'Erreur lors de la création de la tâche', severity: 'error' });
    }
  };

  const handleEditChange = (id: number, value: string) => {
    setEditableTaskNames((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleUpdate = async (id: number) => {
    const newName = editableTaskNames[id]?.trim();
    if (!newName) {
      setNotification({ message: 'Le nom de la tâche ne peut pas être vide', severity: 'error' });
      return;
    }

    try {
      await api.patch(`/tasks/${id}`, {
        name: newName,
        category: 'default', // Adapt si tu as besoin
      });
      setNotification({ message: `La tâche a été mise à jour`, severity: 'success' });
      await handleFetchTasks();
    } catch {
      setNotification({ message: 'Erreur lors de la mise à jour', severity: 'error' });
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

      <Box mt={5} display="flex" gap={2} justifyContent="center" alignItems="center">
        <TextField
          label="Nouvelle tâche"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          sx={{ maxWidth: 350 }}
          size="small"
        />
        <Button variant="outlined" onClick={handleSave}>
          Ajouter une tâche
        </Button>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column" display="flex" gap={2}>
        {tasks.map((task) => {
          const editedName = editableTaskNames[task.id] ?? task.name;
          const isModified = editedName.trim() !== task.name;

          return (
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
                value={editedName}
                fullWidth
                sx={{ maxWidth: 350 }}
                onChange={(e) => handleEditChange(task.id, e.target.value)}
              />
              <Box>
                <IconButton
                  color="success"
                  disabled={!isModified}
                  onClick={() => handleUpdate(task.id)}
                  title={isModified ? 'Modifier la tâche' : 'Nom inchangé'}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(task.id)}
                  title="Supprimer la tâche"
                >
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Box>

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
