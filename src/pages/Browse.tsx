import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  InputBase,
  Paper,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { motion } from 'framer-motion';
import RestaurantModal from '../components/RestaurantModal';
import MapModal from '../components/MapModal';
import { 
  restaurants,
  categories,
  cuisineTypes,
  getRestaurantsByCategory,
  searchRestaurants,
} from '../data/restaurants';
import { useCart } from '../contexts/CartContext';

const Browse = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [restaurantModalOpen, setRestaurantModalOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const { addToCart } = useCart();

  useEffect(() => {
    let result = searchQuery 
      ? searchRestaurants(searchQuery)
      : restaurants;

    if (selectedCategory > 0) {
      result = getRestaurantsByCategory(categories[selectedCategory - 1].name);
    }

    if (selectedCuisine) {
      result = result.filter(r => r.cuisine === selectedCuisine);
    }

    setFilteredRestaurants(result);
  }, [searchQuery, selectedCategory, selectedCuisine]);

  const handleRestaurantClick = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setRestaurantModalOpen(true);
  };

  const handleShowMap = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setMapModalOpen(true);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleCuisineSelect = (cuisine: string) => {
    setSelectedCuisine(cuisine);
    handleFilterClose();
  };

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
          placeholder="Search restaurants or cuisines"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IconButton sx={{ p: '10px' }} onClick={handleFilterClick}>
          <FilterListIcon />
        </IconButton>
      </Paper>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        <MenuItem onClick={() => handleCuisineSelect('')}>
          All Cuisines
        </MenuItem>
        {cuisineTypes.map((cuisine) => (
          <MenuItem 
            key={cuisine} 
            onClick={() => handleCuisineSelect(cuisine)}
            selected={selectedCuisine === cuisine}
          >
            {cuisine}
          </MenuItem>
        ))}
      </Menu>

      {/* Categories */}
      <Box sx={{ mb: 4 }}>
        <Tabs
          value={selectedCategory}
          onChange={(_, newValue) => setSelectedCategory(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 2 }}
        >
          <Tab label="All" />
          {categories.map((category, index) => (
            <Tab
              key={category.id}
              label={`${category.name} (${category.count})`}
              sx={{
                minWidth: 'auto',
                px: 3,
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Restaurants Grid */}
      <Grid container spacing={2}>
        {filteredRestaurants.map((restaurant) => (
          <Grid item xs={12} key={restaurant.id}>
            <Card
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              sx={{ 
                borderRadius: 2,
                cursor: 'pointer',
                overflow: 'hidden',
              }}
              onClick={() => handleRestaurantClick(restaurant)}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={restaurant.image}
                  alt={restaurant.name}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    p: 1,
                  }}
                >
                  <Typography variant="h6">{restaurant.name}</Typography>
                </Box>
              </Box>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip label={`⭐ ${restaurant.rating}`} size="small" />
                  <Chip label={restaurant.price} size="small" />
                  <Chip label={restaurant.cuisine} size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Must try: {restaurant.mustTry}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.deliveryTime} • {restaurant.deliveryFee}
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowMap(restaurant);
                    }}
                  >
                    View Map
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modals */}
      {selectedRestaurant && (
        <>
          <RestaurantModal
            open={restaurantModalOpen}
            onClose={() => setRestaurantModalOpen(false)}
            restaurant={selectedRestaurant}
          />
          <MapModal
            open={mapModalOpen}
            onClose={() => setMapModalOpen(false)}
            address={selectedRestaurant.address}
            name={selectedRestaurant.name}
          />
        </>
      )}
    </Container>
  );
};

export default Browse;