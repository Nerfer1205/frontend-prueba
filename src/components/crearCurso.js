import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import api from '../utils/axiosConfig'; // Asegúrate de que la ruta sea correcta

const CrearCurso = () => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [modalityId, setModalityId] = useState('');
  const [duration, setDuration] = useState('');
  const [fee, setFee] = useState(0);
  const [categories, setCategories] = useState([]);
  const [modalities, setModalities] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await api.get('/categories', {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar el token en el encabezado
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchModalities = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await api.get('/modalities', {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar el token en el encabezado
          },
        });
        setModalities(response.data);
      } catch (error) {
        console.error('Error fetching modalities:', error);
      }
    };

    fetchCategories();
    fetchModalities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener el token y el rol desde localStorage
    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('role');

    // Verificar si el rol es admin o coordinador
    if (role !== 'Admin' && role !== 'Coordinador') {
      alert('Debes ser Admin o Coodinador para crear un curso.');
      return;
    }

    const newCourse = {
      name,
      categoryId: parseInt(categoryId),
      modalityId: parseInt(modalityId),
      duration,
      fee: parseFloat(fee),
    };

    try {
      // Hacer la solicitud con el token en los encabezados
      await api.post('/courses', newCourse, {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar el token en el encabezado
        },
      });
      alert('Curso creado exitosamente');
      setName('');
      setCategoryId('');
      setModalityId('');
      setDuration('');
      setFee(0);
    } catch (error) {
      console.error('Error creating course:', error);
      if (error.response && error.response.status === 401) {
        alert('Debes ser admin o coordinador para crear un curso.');
      } else {
        alert('Error al crear el curso');
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Crear Curso
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del Curso"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          select
          label="Categoría"
          variant="outlined"
          fullWidth
          margin="normal"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name} {/* Asegúrate de que `name` exista en tu modelo de categorías */}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Modalidad"
          variant="outlined"
          fullWidth
          margin="normal"
          value={modalityId}
          onChange={(e) => setModalityId(e.target.value)}
          required
        >
          {modalities.map((modality) => (
            <MenuItem key={modality.id} value={modality.id}>
              {modality.name} {/* Asegúrate de que `name` exista en tu modelo de modalidades */}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Duración"
          variant="outlined"
          fullWidth
          margin="normal"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        <TextField
          label="Tarifa"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Crear Curso
        </Button>
      </form>
    </Box>
  );
};

export default CrearCurso;
