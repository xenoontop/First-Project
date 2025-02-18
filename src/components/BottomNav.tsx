import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid #eee',
      }}
      elevation={3}
    >
      <BottomNavigation
        value={location.pathname}
        onChange={(_, newValue) => {
          navigate(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Pickup"
          value="/pickup"
          icon={<LocalMallIcon />}
        />
        <BottomNavigationAction
          label="Browse"
          value="/browse"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="Me"
          value="/profile"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
