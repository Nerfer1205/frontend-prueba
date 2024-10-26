import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" gutterBottom>
        Bienvenido a nuestra Aplicación
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/login" style={{ marginRight: '10px' }}>
        Iniciar Sesión
      </Button>
      <Button variant="outlined" color="secondary" component={Link} to="/register">
        Registrarse
      </Button>
    </Container>
  );
};

export default Welcome;
