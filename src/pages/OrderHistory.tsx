import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  Rating,
  TextField,
} from '@mui/material';
import { motion } from 'framer-motion';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  restaurant: string;
  date: string;
  status: 'delivered' | 'cancelled' | 'in-progress';
  total: number;
  items: OrderItem[];
  rating?: number;
}

const sampleOrders: Order[] = [
  {
    id: 'ORD-001',
    restaurant: "McDonald's",
    date: '2025-02-17',
    status: 'delivered',
    total: 25.98,
    items: [
      { name: 'Big Mac', quantity: 2, price: 5.99 },
      { name: 'French Fries', quantity: 2, price: 2.99 },
      { name: 'Coca Cola', quantity: 2, price: 1.99 },
    ],
    rating: 4,
  },
  {
    id: 'ORD-002',
    restaurant: 'Starbucks',
    date: '2025-02-16',
    status: 'delivered',
    total: 15.97,
    items: [
      { name: 'Caramel Frappuccino', quantity: 1, price: 5.99 },
      { name: 'Croissant', quantity: 2, price: 3.99 },
    ],
  },
  {
    id: 'ORD-003',
    restaurant: 'Pizza Hut',
    date: '2025-02-15',
    status: 'cancelled',
    total: 35.99,
    items: [
      { name: 'Large Pepperoni Pizza', quantity: 1, price: 20.99 },
      { name: 'Garlic Bread', quantity: 2, price: 4.99 },
      { name: 'Buffalo Wings', quantity: 1, price: 9.99 },
    ],
  },
];

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState('');

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setOrderDetailsOpen(true);
  };

  const handleRateOrder = (order: Order) => {
    setSelectedOrder(order);
    setRating(order.rating || null);
    setReview('');
    setRatingOpen(true);
  };

  const handleSubmitRating = () => {
    if (selectedOrder && rating) {
      setOrders(orders.map(order =>
        order.id === selectedOrder.id
          ? { ...order, rating }
          : order
      ));
      setRatingOpen(false);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'in-progress':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2, mb: 8 }}>
      <Typography variant="h5" gutterBottom>
        Order History
      </Typography>

      {orders.map((order) => (
        <Card
          key={order.id}
          component={motion.div}
          whileHover={{ scale: 1.02 }}
          sx={{ mb: 2, borderRadius: 2 }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="h6">{order.restaurant}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Order ID: {order.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(order.date).toLocaleDateString()}
                </Typography>
              </Box>
              <Chip
                label={order.status}
                color={getStatusColor(order.status)}
                size="small"
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="body1">
                Total: ${order.total.toFixed(2)}
              </Typography>
              {order.rating && (
                <Rating value={order.rating} size="small" readOnly />
              )}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleViewOrder(order)}
                component={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Details
              </Button>
              {order.status === 'delivered' && !order.rating && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleRateOrder(order)}
                  component={motion.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Rate Order
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* Order Details Dialog */}
      <Dialog
        open={orderDetailsOpen}
        onClose={() => setOrderDetailsOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <>
              <Typography variant="h6" gutterBottom>
                {selectedOrder.restaurant}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Order ID: {selectedOrder.id}
                <br />
                Date: {new Date(selectedOrder.date).toLocaleDateString()}
                <br />
                Status: {selectedOrder.status}
              </Typography>
              <List>
                {selectedOrder.items.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={item.name}
                        secondary={`Quantity: ${item.quantity}`}
                      />
                      <Typography>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
                <ListItem>
                  <ListItemText primary="Total" />
                  <Typography variant="h6">
                    ${selectedOrder.total.toFixed(2)}
                  </Typography>
                </ListItem>
              </List>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDetailsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Rating Dialog */}
      <Dialog
        open={ratingOpen}
        onClose={() => setRatingOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Rate Your Order</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              size="large"
            />
            <TextField
              label="Write a review (optional)"
              multiline
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRatingOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSubmitRating}
            variant="contained"
            disabled={!rating}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderHistory;
