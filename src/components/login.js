import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, password };

        try {
            const response = await fetch(`http://localhost:3000/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            console.log(response)

            if (!response.ok) {
                throw new Error('Error en el inicio de sesión');
            }

            const data = await response.json();
            console.log('Inicio de sesión exitoso', data);

            // Almacenar el token de acceso
            localStorage.setItem('access_token', data.access_token); // Token
            localStorage.setItem('role', data.role);

            // Redirigir o cambiar el estado para mostrar la vista correspondiente
            navigate('/dashboard');

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Nombre de usuario o contraseña incorrectos'); // Mostrar un mensaje de error al usuario
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '50px' }}>
            <Typography variant="h5" gutterBottom>
                Iniciar Sesión
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    label="Nombre de usuario"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    variant="outlined"
                    label="Contraseña"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <Typography color="error">{error}</Typography>} {/* Mensaje de error */}
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Iniciar Sesión
                </Button>
            </form>
        </Container>
    );
};

export default Login;
