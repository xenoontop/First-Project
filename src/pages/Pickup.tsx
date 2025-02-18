import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Paper,
  InputBase,
  IconButton,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import MapModal from '../components/MapModal';
import { pickupLocations } from '../data/deals';
import { useCart } from '../contexts/CartContext';
import { useNotifications } from '../contexts/NotificationContext';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  location: any;
}

const OrderModal = ({ open, onClose, location }: OrderModalProps) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>(
    location.popularItems.map((item: any) => ({
      ...item,
      id: Math.random(),
      quantity: 0,
    }))
  );
  const { addToCart } = useCart();
  const { addNotification } = useNotifications();

  const handleUpdateQuantity = (id: number, delta: number) => {
    setOrderItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const handleAddToCart = () => {
    const itemsToAdd = orderItems.filter(item => item.quantity > 0);
    itemsToAdd.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        restaurant: location.name,
      });
    });

    addNotification({
      type: 'order',
      title: 'Items Added to Cart',
      message: `Added ${itemsToAdd.length} items from ${location.name} to your cart`,
    });

    onClose();
  };

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{location.name}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <img
            src={location.image}
            alt={location.name}
            style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8 }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Rating value={location.rating} precision={0.1} readOnly />
          <Typography>({location.rating})</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph>
          {location.address}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Popular Items
        </Typography>
        <List>
          {orderItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price.toFixed(2)}`}
                />
                <ListItemSecondaryAction>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleUpdateQuantity(item.id, -1)}
                      disabled={item.quantity === 0}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
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
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'column', p: 2 }}>
        <Box sx={{ width: '100%', mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Subtotal:</Typography>
            <Typography>${total.toFixed(2)}</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Estimated pickup time: {location.preparationTime}
          </Typography>
        </Box>
        <Button
          variant="contained"
          fullWidth
          disabled={total === 0}
          onClick={handleAddToCart}
          component={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add to Cart • ${total.toFixed(2)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Pickup = () => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleShowMap = (location: any) => {
    setSelectedLocation(location);
    setMapModalOpen(true);
  };

  const handleOrder = (location: any) => {
    setSelectedLocation(location);
    setOrderModalOpen(true);
  };

  const filteredLocations = pickupLocations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 2, mb: 8 }}>
      {/* Search Bar */}
      <Paper
        component={motion.div}
        whileHover={{ scale: 1.02 }}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          mb: 3,
          borderRadius: 2,
        }}
      >
        <IconButton sx={{ p: '10px' }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search pickup locations"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Paper>

      {/* Pickup Locations */}
      <Grid container spacing={2}>
        {filteredLocations.map((location) => (
          <Grid item xs={12} key={location.id}>
            <Card
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              sx={{ borderRadius: 2 }}
            >
              <Box sx={{ display: 'flex', height: 140 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 140 }}
                  image={location.image}
                  alt={location.name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h6" component="div">
                          {location.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Rating value={location.rating} precision={0.1} size="small" readOnly />
                          <Typography variant="body2" color="text.secondary">
                            ({location.rating})
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={location.isOpen ? 'Open' : 'Closed'}
                        color={location.isOpen ? 'success' : 'default'}
                        size="small"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                      <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {location.distance} away
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Ready in {location.preparationTime}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Box sx={{ display: 'flex', p: 1, pt: 0, gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth
                      disabled={!location.isOpen}
                      onClick={() => handleOrder(location)}
                      component={motion.button}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Order Pickup
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DirectionsIcon />}
                      onClick={() => handleShowMap(location)}
                      component={motion.button}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Directions
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Map Modal */}
      {selectedLocation && (
        <>
          <MapModal
            open={mapModalOpen}
            onClose={() => setMapModalOpen(false)}
            address={selectedLocation.address}
            name={selectedLocation.name}
          />
          <OrderModal
            open={orderModalOpen}
            onClose={() => setOrderModalOpen(false)}
            location={selectedLocation}
          />
        </>
      )}
    </Container>
  );
};

export default Pickup;