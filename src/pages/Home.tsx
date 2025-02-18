import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  InputBase,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Chip,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import { 
  deals, 
  essentials, 
  popularNearby,
  recommendations 
} from '../data/deals';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import RestaurantModal from '../components/RestaurantModal';
import MapModal from '../components/MapModal';

const categories = [
  { icon: <FastfoodIcon />, label: 'Fast Food', color: '#FF9800' },
  { icon: <LocalPizzaIcon />, label: 'Pizza', color: '#F44336' },
  { icon: <RestaurantIcon />, label: 'Fine Dining', color: '#9C27B0' },
  { icon: <LocalCafeIcon />, label: 'Cafe', color: '#795548' },
];

interface DealModalProps {
  open: boolean;
  onClose: () => void;
  deal: any;
}

const DealModal = ({ open, onClose, deal }: DealModalProps) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h6">{deal.title}</Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <Box sx={{ mb: 2 }}>
        <img src={deal.image} alt={deal.title} style={{ width: '100%', borderRadius: 8 }} />
      </Box>
      <Typography variant="h6" gutterBottom>{deal.merchant}</Typography>
      <Typography variant="body1" paragraph>{deal.description}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
          ${deal.originalPrice.toFixed(2)}
        </Typography>
        <Typography variant="h6" color="primary">
          ${deal.discountedPrice.toFixed(2)}
        </Typography>
      </Box>
      {deal.code && (
        <Box sx={{ bgcolor: 'primary.light', p: 2, borderRadius: 1, mb: 2 }}>
          <Typography variant="subtitle1" color="white">Promo Code:</Typography>
          <Typography variant="h6" color="white">{deal.code}</Typography>
        </Box>
      )}
      <Typography variant="body2" color="text.secondary">
        Expires: {new Date(deal.expiryDate).toLocaleDateString()}
      </Typography>
    </DialogContent>
  </Dialog>
);

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [dealModalOpen, setDealModalOpen] = useState(false);
  const [restaurantModalOpen, setRestaurantModalOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);

  const handleDealClick = (deal: any) => {
    setSelectedDeal(deal);
    setDealModalOpen(true);
  };

  const handleRestaurantClick = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setRestaurantModalOpen(true);
  };

  const handleLocationClick = (location: any) => {
    setSelectedLocation(location);
    setMapModalOpen(true);
  };

  const handleSearch = () => {
    navigate('/browse');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2, mb: 8 }}>
      {/* Location Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 2,
          cursor: 'pointer'
        }}
        onClick={() => navigate('/settings')}
        component={motion.div}
        whileHover={{ scale: 1.02 }}
      >
        <LocationOnIcon color="primary" />
        <Typography variant="h6" sx={{ ml: 1 }}>
          Brody Is a Sigma
        </Typography>
      </Box>

      {/* Search Bar */}
      <Paper
        component={motion.div}
        whileHover={{ scale: 1.02 }}
        onClick={handleSearch}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          mb: 3,
          borderRadius: 2,
          cursor: 'pointer',
        }}
      >
        <IconButton sx={{ p: '10px' }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Search "Ice Cream"'
          onClick={(e) => e.stopPropagation()}
        />
      </Paper>

      {/* Categories Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item key={index}>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variant="outlined"
                startIcon={category.icon}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 2,
                  py: 1,
                }}
                onClick={() => navigate('/browse')}
              >
                {category.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Deals Section */}
      <Box sx={{ mb: 4 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/browse')}
        >
          <Typography variant="h6">Deals for you</Typography>
          <ChevronRightIcon />
        </Box>
        <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, pb: 1 }}>
          {deals.map((deal) => (
            <Card
              key={deal.id}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              sx={{ 
                minWidth: 280, 
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
              onClick={() => handleDealClick(deal)}
            >
              <CardMedia
                component="img"
                height="180"
                image={deal.image}
                alt={deal.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="subtitle1" color="primary" fontWeight="bold">
                  {deal.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {deal.merchant} • {deal.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    ${deal.originalPrice.toFixed(2)}
                  </Typography>
                  <Typography variant="body1" color="primary" fontWeight="bold">
                    ${deal.discountedPrice.toFixed(2)}
                  </Typography>
                  {deal.code && (
                    <Chip 
                      label={`Code: ${deal.code}`} 
                      size="small" 
                      color="primary" 
                      sx={{ ml: 'auto' }}
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Quick Essentials Section */}
      <Box sx={{ mb: 4 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/browse')}
        >
          <Typography variant="h6">Quick essentials nearby</Typography>
          <ChevronRightIcon />
        </Box>
        <Grid container spacing={2}>
          {essentials.map((store) => (
            <Grid item xs={6} key={store.id}>
              <Card
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                sx={{ 
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  cursor: 'pointer'
                }}
                onClick={() => handleLocationClick(store)}
              >
                <Box sx={{ position: 'relative', height: 120 }}>
                  <CardMedia
                    component="img"
                    height="120"
                    image={store.image}
                    alt={store.name}
                    sx={{ 
                      objectFit: 'cover'
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {store.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">⭐ {store.rating}</Typography>
                    <Typography variant="body2" color="text.secondary">•</Typography>
                    <Typography variant="body2" color="text.secondary">{store.distance}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Chip 
                      label={store.isOpen ? 'Open' : 'Closed'} 
                      size="small" 
                      color={store.isOpen ? 'success' : 'default'}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {store.openUntil}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Popular Nearby Section */}
      <Box sx={{ mb: 4 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/browse')}
        >
          <Typography variant="h6">Popular Nearby</Typography>
          <ChevronRightIcon />
        </Box>
        <Grid container spacing={2}>
          {popularNearby.map((restaurant) => (
            <Grid item xs={12} key={restaurant.id}>
              <Card
                component={motion.div}
                whileHover={{ scale: 1.02 }}
                sx={{ 
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  height: 140,
                  cursor: 'pointer'
                }}
                onClick={() => handleRestaurantClick(restaurant)}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 140, objectFit: 'cover' }}
                  image={restaurant.image}
                  alt={restaurant.name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="h6" component="div">
                      {restaurant.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2">⭐ {restaurant.rating}</Typography>
                      <Typography variant="body2" color="text.secondary">•</Typography>
                      <Typography variant="body2" color="text.secondary">${restaurant.price}</Typography>
                      <Typography variant="body2" color="text.secondary">•</Typography>
                      <Typography variant="body2" color="text.secondary">{restaurant.cuisine}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recommendations Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recommended for You
        </Typography>
        <Grid container spacing={2}>
          {/* New Restaurants */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <NewReleasesIcon color="primary" />
              <Typography variant="subtitle1">New in Your Area</Typography>
            </Box>
            <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, pb: 1 }}>
              {recommendations.newRestaurants.map((restaurant) => (
                <Card
                  key={restaurant.id}
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  sx={{ 
                    minWidth: 200, 
                    borderRadius: 2,
                    cursor: 'pointer'
                  }}
                  onClick={() => handleRestaurantClick(restaurant)}
                >
                  <CardMedia
                    component="img"
                    height="120"
                    image={restaurant.image}
                    alt={restaurant.name}
                  />
                  <CardContent>
                    <Typography variant="subtitle1">{restaurant.name}</Typography>
                    <Typography variant="body2" color="primary">
                      {restaurant.openingSoon}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Trending */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TrendingUpIcon color="primary" />
              <Typography variant="subtitle1">Trending Now</Typography>
            </Box>
            <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, pb: 1 }}>
              {recommendations.trending.map((restaurant) => (
                <Card
                  key={restaurant.id}
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  sx={{ 
                    minWidth: 200, 
                    borderRadius: 2,
                    cursor: 'pointer'
                  }}
                  onClick={() => handleRestaurantClick(restaurant)}
                >
                  <CardMedia
                    component="img"
                    height="120"
                    image={restaurant.image}
                    alt={restaurant.name}
                  />
                  <CardContent>
                    <Typography variant="subtitle1">{restaurant.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Trending: {restaurant.trendingItem}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Modals */}
      {selectedDeal && (
        <DealModal
          open={dealModalOpen}
          onClose={() => setDealModalOpen(false)}
          deal={selectedDeal}
        />
      )}
      {selectedRestaurant && (
        <RestaurantModal
          open={restaurantModalOpen}
          onClose={() => setRestaurantModalOpen(false)}
          restaurant={selectedRestaurant}
        />
      )}
      {selectedLocation && (
        <MapModal
          open={mapModalOpen}
          onClose={() => setMapModalOpen(false)}
          address={selectedLocation.address}
          name={selectedLocation.name}
        />
      )}
    </Container>
  );
};

export default Home;
