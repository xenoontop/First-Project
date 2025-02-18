import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Box,
  Avatar,
  Button,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import CartModal from './CartModal';
import NotificationsModal from './NotificationsModal';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  restaurant: string;
}

interface Notification {
  id: number;
  type: 'order' | 'offer' | 'delivery';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// Sample data
const sampleCartItems: CartItem[] = [
  {
    id: 1,
    name: "Big Mac Burger",
    price: 5.99,
    quantity: 2,
    restaurant: "McDonald's"
  },
  {
    id: 2,
    name: "Wicked Frappuccino",
    price: 4.99,
    quantity: 1,
    restaurant: "Starbucks"
  }
];

const sampleNotifications: Notification[] = [
  {
    id: 1,
    type: 'order',
    title: 'Order Confirmed',
    message: 'Your order from McDonald\'s has been confirmed',
    time: '2 minutes ago',
    read: false
  },
  {
    id: 2,
    type: 'offer',
    title: 'New Deal Available',
    message: 'Get 20% off your next order at Starbucks',
    time: '1 hour ago',
    read: false
  },
  {
    id: 3,
    type: 'delivery',
    title: 'Order Delivered',
    message: 'Your order from Shake Shack has been delivered',
    time: '2 hours ago',
    read: true
  }
];

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(sampleCartItems);
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid #eee',
        backgroundColor: 'white',
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        {currentUser ? (
          <>
            <IconButton 
              size="large" 
              color="inherit"
              onClick={() => setNotificationsOpen(true)}
            >
              <Badge badgeContent={unreadCount} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton 
              size="large" 
              color="inherit"
              onClick={() => setCartOpen(true)}
            >
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </>
        ) : (
          <Button
            color="primary"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
        )}
      </Toolbar>

      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <NotificationsModal
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
      />
    </AppBar>
  );
};

export default Navbar;
