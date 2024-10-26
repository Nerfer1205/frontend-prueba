import axios from 'axios';

// Crear instancia de axios
const api = axios.create({
  baseURL: 'http://localhost:3000', // Base de la API
});

// Interceptor de respuesta
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Si el token está vencido
      localStorage.removeItem('access_token'); // Remover el token vencido
      alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      
      // Redirigir al login
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;
