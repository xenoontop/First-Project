import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface MapModalProps {
  open: boolean;
  onClose: () => void;
  address: string;
  name: string;
}

const MapModal = ({ open, onClose, address, name }: MapModalProps) => {
  // Generate Google Maps embed URL
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
    address
  )}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">{name}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: '100%', height: '400px', position: 'relative' }}>
          <iframe
            title="location-map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={mapSrc}
          />
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {address}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;
