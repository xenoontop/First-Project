import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Divider,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';
import PaymentIcon from '@mui/icons-material/Payment';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { currentUser } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    locationServices: true,
    darkMode: false,
    language: 'English',
    savedAddresses: [
      '123 Main St, San Francisco, CA 94105',
      '456 Market St, San Francisco, CA 94105',
    ],
    savedPayments: [
      { type: 'Visa', last4: '4242' },
      { type: 'Mastercard', last4: '5555' },
    ],
  });
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof settings],
    }));
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2, mb: 8 }}>
      {showSaveSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Notifications
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Email Notifications"
              secondary="Receive order updates and promotions"
            />
            <Switch
              edge="end"
              checked={settings.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Push Notifications"
              secondary="Receive real-time updates"
            />
            <Switch
              edge="end"
              checked={settings.pushNotifications}
              onChange={() => handleToggle('pushNotifications')}
            />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Location & Language
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText
              primary="Location Services"
              secondary="Allow access to your location"
            />
            <Switch
              edge="end"
              checked={settings.locationServices}
              onChange={() => handleToggle('locationServices')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText
              primary="Language"
              secondary={settings.language}
            />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Payment Methods
        </Typography>
        <List>
          {settings.savedPayments.map((payment, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${payment.type} ending in ${payment.last4}`}
                secondary="Added on Jan 1, 2025"
              />
              <Button color="error">Remove</Button>
            </ListItem>
          ))}
          <ListItem>
            <Button
              variant="outlined"
              fullWidth
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add New Payment Method
            </Button>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Saved Addresses
        </Typography>
        <List>
          {settings.savedAddresses.map((address, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText
                primary={address}
                secondary={index === 0 ? 'Default Address' : ''}
              />
              <Button color="error">Remove</Button>
            </ListItem>
          ))}
          <ListItem>
            <Button
              variant="outlined"
              fullWidth
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add New Address
            </Button>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Security
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText
              primary="Change Password"
              secondary="Last changed 30 days ago"
            />
            <Button color="primary">Change</Button>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default Settings;
