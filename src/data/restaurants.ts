export interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: string;
  cuisine: string;
  deliveryTime: string;
  deliveryFee: string;
  address: string;
  featured: boolean;
  mustTry: string;
  location: 'Melbourne' | 'Australia-wide' | 'Sydney';
  reviews: Array<{
    id: number;
    user: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Hunky Dory",
    image: '/mcdonalds.jpg', // Using placeholder image
    rating: 4.7,
    price: "$$",
    cuisine: "Seafood",
    deliveryTime: "25-35 min",
    deliveryFee: "$5.99",
    address: "Melbourne, VIC",
    featured: true,
    mustTry: "Beer-Battered Flathead",
    location: "Melbourne",
    reviews: [
      {
        id: 1,
        user: "Foodie123",
        avatar: '/mcdonalds.jpg',
        rating: 5,
        comment: "Best fish and chips in Melbourne!",
        date: "2 days ago"
      }
    ]
  },
  {
    id: 2,
    name: "Lord of the Fries",
    image: '/mcdonalds.jpg',
    rating: 4.5,
    price: "$",
    cuisine: "Vegan Fast Food",
    deliveryTime: "20-30 min",
    deliveryFee: "$3.99",
    address: "Melbourne, VIC",
    featured: true,
    mustTry: "Vegan Poutine",
    location: "Melbourne",
    reviews: []
  },
  {
    id: 3,
    name: "Belle's Hot Chicken",
    image: '/mcdonalds.jpg',
    rating: 4.8,
    price: "$$",
    cuisine: "Fried Chicken",
    deliveryTime: "25-35 min",
    deliveryFee: "$4.99",
    address: "Melbourne, VIC",
    featured: true,
    mustTry: "Spicy Fried Chicken Sandwich",
    location: "Melbourne",
    reviews: []
  },
  {
    id: 4,
    name: "8bit",
    image: '/mcdonalds.jpg',
    rating: 4.6,
    price: "$$",
    cuisine: "Burgers",
    deliveryTime: "20-30 min",
    deliveryFee: "$4.99",
    address: "Melbourne, VIC",
    featured: true,
    mustTry: "Double Dragon Burger",
    location: "Melbourne",
    reviews: []
  },
  // Add more restaurants here...
];

export const categories = [
  { id: 1, name: "Burgers", count: 15 },
  { id: 2, name: "Chicken", count: 12 },
  { id: 3, name: "Pizza", count: 8 },
  { id: 4, name: "Asian", count: 10 },
  { id: 5, name: "Mexican", count: 6 },
  { id: 6, name: "Vegan", count: 5 },
  { id: 7, name: "Seafood", count: 4 },
  { id: 8, name: "Desserts", count: 7 },
  { id: 9, name: "Drinks", count: 4 },
  { id: 10, name: "Fast Food", count: 20 },
];

export const cuisineTypes = [
  "Australian",
  "American",
  "Asian",
  "Mexican",
  "Italian",
  "Thai",
  "Vietnamese",
  "Japanese",
  "Chinese",
  "Indian",
  "Mediterranean",
  "Vegan",
  "Fast Food",
  "Desserts",
  "Beverages"
];

export const popularDishes = [
  {
    id: 1,
    name: "Big Mac",
    restaurant: "McDonald's",
    price: 6.99,
    image: '/mcdonalds.jpg',
    rating: 4.5,
  },
  {
    id: 2,
    name: "Whopper",
    restaurant: "Hungry Jack's",
    price: 7.99,
    image: '/mcdonalds.jpg',
    rating: 4.3,
  },
  {
    id: 3,
    name: "PERi-PERi Chicken",
    restaurant: "Nando's",
    price: 12.99,
    image: '/mcdonalds.jpg',
    rating: 4.6,
  },
  // Add more popular dishes...
];

// Helper function to filter restaurants by category
export const getRestaurantsByCategory = (category: string) => {
  return restaurants.filter(restaurant => 
    restaurant.cuisine.toLowerCase().includes(category.toLowerCase())
  );
};

// Helper function to filter restaurants by location
export const getRestaurantsByLocation = (location: string) => {
  return restaurants.filter(restaurant => 
    restaurant.location === location || restaurant.location === 'Australia-wide'
  );
};

// Helper function to get featured restaurants
export const getFeaturedRestaurants = () => {
  return restaurants.filter(restaurant => restaurant.featured);
};

// Helper function to search restaurants
export const searchRestaurants = (query: string) => {
  const searchTerm = query.toLowerCase();
  return restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchTerm) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm) ||
    restaurant.mustTry.toLowerCase().includes(searchTerm)
  );
};
