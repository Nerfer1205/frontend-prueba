import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './sidebar'; // Asegúrate de que la ruta sea correcta
import CrearCurso from './crearCurso'; // Asegúrate de que la ruta sea correcta

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Dashboard</h1>
        {/* Mensaje de bienvenida */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Bienvenido al Dashboard
            </Typography>
            <Typography variant="body2">
              Aquí puedes gestionar tus cursos, crear nuevos cursos y mucho más.
            </Typography>
          </CardContent>
        </Card>

        <Routes>
          <Route path="crear-curso" element={<CrearCurso />} /> {/* Ruta para crear curso */}
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
