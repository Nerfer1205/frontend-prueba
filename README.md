# Proyecto Frontend en React

Este proyecto es una aplicación frontend desarrollada con React que se conecta a una API backend.

## Prerrequisitos

Asegúrate de tener instaladas las siguientes herramientas antes de comenzar:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (generalmente incluido con Node.js)

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Nerfer1205/frontend-prueba.git
cd frontend-prueba
```
## 2. Instalar dependencias
```bash
npm install
```
## 3. Configurar la URL del backend en axios.config.js
Dentro de la carpeta src/utils, encontrarás un archivo llamado axios.config.js. Abre este archivo y configura la URL base del backend que conectará la aplicación frontend. La estructura del archivo debería ser similar a esta:

```javascript
// src/utils/axios.config.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Reemplaza con la URL de tu backend
});

export default instance;

```
## Ejecución del Frontend
Para iniciar la aplicación en modo de desarrollo:
```bash
npm start

```
