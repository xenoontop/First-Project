import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Components
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Profile from './pages/Profile';
import Pickup from './pages/Pickup';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Settings from './pages/Settings';
import OrderHistory from './pages/OrderHistory';

// Context
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF3008',
    },
    secondary: {
      main: '#28a745',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <NotificationProvider>
          <CartProvider>
            <BrowserRouter>
              <Box sx={{ pb: 7 }}>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pickup" element={<Pickup />} />
                  <Route path="/browse" element={<Browse />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/order-history" element={<OrderHistory />} />
                </Routes>
                <BottomNav />
              </Box>
            </BrowserRouter>
          </CartProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
