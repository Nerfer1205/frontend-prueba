import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Toolbar, Typography, Divider } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School'; // Icono para crear curso

const Sidebar = () => {
  const location = useLocation();

  // Definir los elementos del menú con las nuevas rutas
  const menuItems = [
    { text: 'Crear Curso', icon: <SchoolIcon />, path: '/dashboard/crear-curso' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#1E1E2F',
          color: '#FFF',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ color: '#FFF', fontWeight: 'bold' }}>
          Dashboard
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.text}
            style={{
              textDecoration: 'none',
              color: location.pathname === item.path ? '#4CAF50' : '#FFF',
            }}
          >
            <ListItem button selected={location.pathname === item.path}>
              <ListItemIcon sx={{ color: location.pathname === item.path ? '#4CAF50' : '#FFF' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
