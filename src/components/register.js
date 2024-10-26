import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Cambia a useNavigate

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); // Usa useNavigate

  const onSubmit = async (data) => {
    try {
      // Primero, crea el usuario
      const userResponse = await axios.post('http://localhost:3000/users', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        roleId: data.roleId,
      });

      const userId = userResponse.data.id; // Obtiene el ID del usuario creado

      // Luego, crea la credencial usando el ID del usuario
      await axios.post('http://localhost:3000/credentials', {
        alias: data.alias,
        password: data.password,
        userId: userId,
      });

      console.log('Registro exitoso');
      // Redirige a la página de inicio de sesión
      navigate('/login'); // Usa navigate para redirigir
    } catch (error) {
      console.error('Error al registrarse:', error.response.data);
      // Manejo del error, como mostrar un mensaje al usuario
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Registro
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Alias"
              fullWidth
              {...register('alias', { required: true })}
              error={!!errors.alias}
              helperText={errors.alias ? 'Este campo es requerido' : ''}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              {...register('password', { required: true, minLength: 6 })}
              error={!!errors.password}
              helperText={errors.password ? 'La contraseña debe tener al menos 6 caracteres' : ''}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Nombre"
              fullWidth
              {...register('firstName', { required: true })}
              error={!!errors.firstName}
              helperText={errors.firstName ? 'Este campo es requerido' : ''}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Apellido"
              fullWidth
              {...register('lastName', { required: true })}
              error={!!errors.lastName}
              helperText={errors.lastName ? 'Este campo es requerido' : ''}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register('email', { required: true })}
              error={!!errors.email}
              helperText={errors.email ? 'Este campo es requerido' : ''}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Teléfono"
              fullWidth
              {...register('phone', { required: true })}
              error={!!errors.phone}
              helperText={errors.phone ? 'Este campo es requerido' : ''}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.roleId}>
              <InputLabel id="role-label">Rol</InputLabel>
              <Select
                labelId="role-label"
                {...register('roleId', { required: true })}
                defaultValue=""
              >
                <MenuItem value="">
                  <em>Selecciona un rol</em>
                </MenuItem>
                <MenuItem value={1}>Coordinador</MenuItem>
                <MenuItem value={2}>Admin</MenuItem>
                <MenuItem value={3}>Docente</MenuItem>
                <MenuItem value={4}>Estudiante</MenuItem>
              </Select>
              {errors.roleId && <span style={{ color: 'red' }}>Este campo es requerido</span>}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Registrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default RegisterPage;
