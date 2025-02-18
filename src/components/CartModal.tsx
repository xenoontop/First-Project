import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { motion } from 'framer-motion';
import PaymentModal from './PaymentModal';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  restaurant: string;
}

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, newQuantity: number) => void;
}

const CartModal = ({ open, onClose, items, onUpdateQuantity }: CartModalProps) => {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentModalOpen(false);
    onClose();
    // Here you would typically clear the cart and show a success message
  };

  return (
    <>
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
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {items.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Your cart is empty
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={onClose}
              >
                Browse Restaurants
              </Button>
            </Box>
          ) : (
            <>
              <List>
                {items.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem>
                      <ListItemText
                        primary={item.name}
                        secondary={item.restaurant}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <AddIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, minWidth: 60 }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal</Typography>
                  <Typography>${total.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Delivery Fee</Typography>
                  <Typography>$2.99</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">${(total + 2.99).toFixed(2)}</Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  component={motion.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>

      <PaymentModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        total={total}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default CartModal;
