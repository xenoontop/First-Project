import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import AppleIcon from '@mui/icons-material/Apple';
import { useNotifications } from '../contexts/NotificationContext';
import { useCart } from '../contexts/CartContext';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  total: number;
  onSuccess: () => void;
}

const steps = ['Delivery Address', 'Payment Method', 'Confirm Order'];

const PaymentModal = ({ open, onClose, total, onSuccess }: PaymentModalProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { addNotification } = useNotifications();
  const { clearCart } = useCart();
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Process payment and create order notification
      addNotification({
        type: 'order',
        title: 'Order Confirmed!',
        message: `Your order for $${total.toFixed(2)} has been confirmed and is being prepared.`,
      });
      clearCart();
      onSuccess();
      onClose();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePayPalCheckout = () => {
    // Simulate PayPal payment process
    setTimeout(() => {
      addNotification({
        type: 'order',
        title: 'PayPal Order Confirmed!',
        message: `Your PayPal payment for $${total.toFixed(2)} has been processed successfully.`,
      });
      clearCart();
      onSuccess();
      onClose();
    }, 1500);
  };

  const handleApplePayCheckout = () => {
    // Simulate Apple Pay payment process
    setTimeout(() => {
      addNotification({
        type: 'order',
        title: 'Apple Pay Order Confirmed!',
        message: `Your Apple Pay payment for $${total.toFixed(2)} has been processed successfully.`,
      });
      clearCart();
      onSuccess();
      onClose();
    }, 1500);
  };

  const renderPaymentMethod = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Card Number"
              fullWidth
              margin="normal"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Expiry Date"
                fullWidth
                margin="normal"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
              />
              <TextField
                label="CVV"
                fullWidth
                margin="normal"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
              />
            </Box>
            <TextField
              label="Name on Card"
              fullWidth
              margin="normal"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
            />
          </Box>
        );
      case 'paypal':
        return (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                bgcolor: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <img
                src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
                alt="PayPal"
                style={{ height: 50 }}
              />
              <Typography variant="body1">
                You will be redirected to PayPal to complete your payment.
              </Typography>
              <Button
                variant="contained"
                sx={{ bgcolor: '#0070ba', '&:hover': { bgcolor: '#003087' } }}
                onClick={handlePayPalCheckout}
              >
                Pay with PayPal
              </Button>
            </Paper>
          </Box>
        );
      case 'apple':
        return (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                bgcolor: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <AppleIcon sx={{ fontSize: 40 }} />
              <Typography variant="body1">
                Complete your purchase with Apple Pay.
              </Typography>
              <Button
                variant="contained"
                sx={{ bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}
                startIcon={<AppleIcon />}
                onClick={handleApplePayCheckout}
              >
                Pay with Apple Pay
              </Button>
            </Paper>
          </Box>
        );
      default:
        return null;
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Street Address"
              fullWidth
              margin="normal"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
            />
            <TextField
              label="City"
              fullWidth
              margin="normal"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="State"
                fullWidth
                margin="normal"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
              />
              <TextField
                label="ZIP Code"
                fullWidth
                margin="normal"
                value={address.zip}
                onChange={(e) => setAddress({ ...address, zip: e.target.value })}
              />
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Credit/Debit Card"
              />
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label="PayPal"
              />
              <FormControlLabel
                value="apple"
                control={<Radio />}
                label="Apple Pay"
              />
            </RadioGroup>
            {renderPaymentMethod()}
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              Please review your order details before confirming.
            </Alert>
            <Typography variant="subtitle1" gutterBottom>
              Delivery Address:
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {address.street}, {address.city}, {address.state} {address.zip}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Payment Method:
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {paymentMethod === 'card'
                ? `Card ending in ${cardDetails.number.slice(-4)}`
                : paymentMethod === 'paypal'
                ? 'PayPal'
                : 'Apple Pay'}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Subtotal:</Typography>
              <Typography>${total.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Delivery Fee:</Typography>
              <Typography>$2.99</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Tax:</Typography>
              <Typography>${(total * 0.08).toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">
                ${(total + 2.99 + total * 0.08).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

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
        <Typography variant="h6">Checkout</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            component={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
