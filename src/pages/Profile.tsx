import React from 'react';
import { Container, Typography, Box, Avatar, Button, Paper, Divider } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  if (!currentUser) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Sign in to view your profile
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/login')}
          sx={{ mt: 2 }}
        >
          Sign In
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{ width: 80, height: 80, mr: 2 }}
            src={currentUser.photoURL || undefined}
          />
          <Box>
            <Typography variant="h6">
              {currentUser.displayName || currentUser.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUser.metadata?.creationTime 
                ? `Member since ${new Date(currentUser.metadata.creationTime).toLocaleDateString()}`
                : 'Welcome!'}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ mb: 2 }}>
        <Button
          fullWidth
          sx={{ justifyContent: 'flex-start', py: 2 }}
          startIcon={<FavoriteIcon />}
        >
          Favorites
        </Button>
        <Divider />
        <Button
          fullWidth
          sx={{ justifyContent: 'flex-start', py: 2 }}
          startIcon={<HistoryIcon />}
        >
          Order History
        </Button>
        <Divider />
        <Button
          fullWidth
          sx={{ justifyContent: 'flex-start', py: 2 }}
          startIcon={<SettingsIcon />}
        >
          Settings
        </Button>
      </Paper>

      <Button
        variant="outlined"
        color="error"
        fullWidth
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={{ mt: 2 }}
      >
        Sign Out
      </Button>
    </Container>
  );
};

export default Profile;