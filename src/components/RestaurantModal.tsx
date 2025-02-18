import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  Rating,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Chip,
  Tab,
  Tabs,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useNotifications } from '../contexts/NotificationContext';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  popular?: boolean;
}

const defaultMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "Big Mac",
    description: "Two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun",
    price: 5.99,
    category: "Burgers",
    popular: true
  },
  {
    id: 2,
    name: "Quarter Pounder",
    description: "Fresh beef burger with cheese, onions, pickles, and condiments",
    price: 6.49,
    category: "Burgers"
  },
  {
    id: 3,
    name: "French Fries",
    description: "Golden crispy fries served hot and fresh",
    price: 3.99,
    category: "Sides",
    popular: true
  },
  {
    id: 4,
    name: "Chicken McNuggets",
    description: "Tender, juicy chicken nuggets with your choice of sauce",
    price: 4.99,
    category: "Chicken",
    popular: true
  },
  {
    id: 5,
    name: "McFlurry",
    description: "Soft serve ice cream with your favorite mix-ins",
    price: 3.49,
    category: "Desserts"
  }
];

interface RestaurantModalProps {
  open: boolean;
  onClose: () => void;
  restaurant: {
    name: string;
    image: string;
    rating: number;
    cuisine: string;
    deliveryTime: string;
    deliveryFee: string;
    address: string;
    price: string;
    reviews?: Array<{
      id: number;
      user: string;
      avatar: string;
      rating: number;
      comment: string;
      date: string;
    }>;
  };
}

const RestaurantModal = ({ open, onClose, restaurant }: RestaurantModalProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [menuItems, setMenuItems] = useState<{ [key: string]: number }>({});
  const { addToCart } = useCart();
  const { addNotification } = useNotifications();

  const categories = ["Popular", "Burgers", "Chicken", "Sides", "Desserts"];
  const filteredItems = selectedTab === 0
    ? defaultMenuItems.filter(item => item.popular)
    : defaultMenuItems.filter(item => item.category === categories[selectedTab]);

  const handleUpdateQuantity = (itemId: number, delta: number) => {
    setMenuItems(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + delta)
    }));
  };

  const handleAddToCart = () => {
    const itemsToAdd = Object.entries(menuItems)
      .filter(([_, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => {
        const item = defaultMenuItems.find(item => item.id === Number(itemId));
        return {
          id: Number(itemId),
          name: item?.name || '',
          price: item?.price || 0,
          quantity,
          restaurant: restaurant.name
        };
      });

    itemsToAdd.forEach(item => {
      addToCart(item);
    });

    addNotification({
      type: 'order',
      title: 'Items Added to Cart',
      message: `Added ${itemsToAdd.length} items from ${restaurant.name} to your cart`,
    });

    setMenuItems({});
    onClose();
  };

  const total = Object.entries(menuItems).reduce((sum, [itemId, quantity]) => {
    const item = defaultMenuItems.find(item => item.id === Number(itemId));
    return sum + (item?.price || 0) * quantity;
  }, 0);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">{restaurant.name}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <img
            src={restaurant.image}
            alt={restaurant.name}
            style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8 }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Rating value={restaurant.rating} precision={0.1} readOnly />
          <Typography>({restaurant.rating})</Typography>
          <Chip label={restaurant.price} size="small" />
          <Chip label={restaurant.cuisine} size="small" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {restaurant.address}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {restaurant.deliveryTime}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <DeliveryDiningIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {restaurant.deliveryFee}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Tabs
            value={selectedTab}
            onChange={(_, newValue) => setSelectedTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {categories.map((category, index) => (
              <Tab key={category} label={category} />
            ))}
          </Tabs>
        </Box>

        <List>
          {filteredItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        ${item.price.toFixed(2)}
                      </Typography>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleUpdateQuantity(item.id, -1)}
                      disabled={!menuItems[item.id]}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{menuItems[item.id] || 0}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleUpdateQuantity(item.id, 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>

        {restaurant.reviews && restaurant.reviews.length > 0 && (
          <>
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Reviews
            </Typography>
            <List>
              {restaurant.reviews.map((review) => (
                <React.Fragment key={review.id}>
                  <ListItem alignItems="flex-start">
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <img
                          src={review.avatar}
                          alt={review.user}
                          style={{ width: 40, height: 40, borderRadius: '50%' }}
                        />
                        <Box>
                          <Typography variant="subtitle2">{review.user}</Typography>
                          <Rating value={review.rating} size="small" readOnly />
                        </Box>
                      </Box>
                      <Typography variant="body2">{review.comment}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                        {review.date}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </>
        )}
      </DialogContent>

      {total > 0 && (
        <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddToCart}
            component={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add to Cart • ${total.toFixed(2)}
          </Button>
        </Box>
      )}
    </Dialog>
  );
};

export default RestaurantModal;
