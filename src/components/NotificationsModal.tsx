import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

interface Notification {
  id: number;
  type: 'order' | 'offer' | 'delivery';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsModalProps {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'order':
      return <FastfoodIcon />;
    case 'offer':
      return <LocalOfferIcon />;
    case 'delivery':
      return <DeliveryDiningIcon />;
    default:
      return <FastfoodIcon />;
  }
};

const NotificationsModal = ({
  open,
  onClose,
  notifications,
  onMarkAsRead,
}: NotificationsModalProps) => {
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
        <Typography variant="h6">Notifications</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {notifications.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No notifications yet
            </Typography>
          </Box>
        ) : (
          <List>
            {notifications.map((notification) => (
              <ListItem
                key={notification.id}
                sx={{
                  bgcolor: notification.read ? 'transparent' : 'action.hover',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <ListItemAvatar>
                  <Badge
                    color="primary"
                    variant="dot"
                    invisible={notification.read}
                  >
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {getIcon(notification.type)}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={notification.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {notification.message}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mt: 0.5 }}
                      >
                        {notification.time}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsModal;
