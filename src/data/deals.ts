export interface Deal {
  id: number;
  title: string;
  merchant: string;
  image: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  expiryDate: string;
  code?: string;
}

export interface Essential {
  id: number;
  name: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  image: string;
  logo: string;
  type: string;
  isOpen: boolean;
  openUntil: string;
}

export interface PopularItem {
  id: number;
  name: string;
  restaurant: string;
  image: string;
  rating: number;
  price: number;
  cuisine: string;
  deliveryTime: string;
  deliveryFee: string;
  distance: string;
}

export const deals: Deal[] = [
  {
    id: 1,
    title: "2 for 1 Whoppers",
    merchant: "Hungry Jack's",
    image: "/mcdonalds.jpg",
    description: "Buy one Whopper, get one free",
    originalPrice: 9.95,
    discountedPrice: 4.98,
    expiryDate: "2025-02-25",
    code: "WHOPPER241"
  },
  {
    id: 2,
    title: "30% Off First Order",
    merchant: "Grill'd",
    image: "/mcdonalds.jpg",
    description: "Healthy burgers delivered to your door",
    originalPrice: 25.00,
    discountedPrice: 17.50,
    expiryDate: "2025-03-01"
  },
  {
    id: 3,
    title: "$10 Off Orders Over $30",
    merchant: "Nando's",
    image: "/mcdonalds.jpg",
    description: "PERi-PERi goodness for less",
    originalPrice: 30.00,
    discountedPrice: 20.00,
    expiryDate: "2025-02-28",
    code: "NANDOS10"
  },
  {
    id: 4,
    title: "Free Delivery",
    merchant: "Domino's",
    image: "/mcdonalds.jpg",
    description: "Free delivery on orders over $25",
    originalPrice: 5.99,
    discountedPrice: 0,
    expiryDate: "2025-02-24"
  },
  {
    id: 5,
    title: "Buy 1 Get 1 Free",
    merchant: "Boost Juice",
    image: "/mcdonalds.jpg",
    description: "All smoothies and juices",
    originalPrice: 8.95,
    discountedPrice: 4.48,
    expiryDate: "2025-02-23",
    code: "BOOST241"
  }
];

export const essentials: Essential[] = [
  {
    id: 1,
    name: "Woolworths Metro",
    rating: 4.7,
    deliveryTime: "15-25 min",
    distance: "0.3 mi",
    image: "/safeway.jpg",
    logo: "/safeway.jpg",
    type: "Grocery",
    isOpen: true,
    openUntil: "11:00 PM"
  },
  {
    id: 2,
    name: "7-Eleven",
    rating: 4.3,
    deliveryTime: "10-20 min",
    distance: "0.5 mi",
    image: "/safeway.jpg",
    logo: "/safeway.jpg",
    type: "Convenience",
    isOpen: true,
    openUntil: "24 hours"
  },
  {
    id: 3,
    name: "Chemist Warehouse",
    rating: 4.8,
    deliveryTime: "20-30 min",
    distance: "0.7 mi",
    image: "/safeway.jpg",
    logo: "/safeway.jpg",
    type: "Pharmacy",
    isOpen: true,
    openUntil: "9:00 PM"
  }
];

export const popularNearby: PopularItem[] = [
  {
    id: 1,
    name: "Betty's Burgers",
    restaurant: "Betty's Burgers",
    image: "/mcdonalds.jpg",
    rating: 4.8,
    price: 15.99,
    cuisine: "Burgers",
    deliveryTime: "20-30 min",
    deliveryFee: "Free Delivery",
    distance: "0.8 mi"
  },
  {
    id: 2,
    name: "Guzman y Gomez",
    restaurant: "Guzman y Gomez",
    image: "/mcdonalds.jpg",
    rating: 4.6,
    price: 16.99,
    cuisine: "Mexican",
    deliveryTime: "25-35 min",
    deliveryFee: "$2.99",
    distance: "1.2 mi"
  },
  {
    id: 3,
    name: "PappaRich",
    restaurant: "PappaRich",
    image: "/mcdonalds.jpg",
    rating: 4.7,
    price: 18.99,
    cuisine: "Malaysian",
    deliveryTime: "30-40 min",
    deliveryFee: "$3.99",
    distance: "1.5 mi"
  }
];

export const recommendations = {
  newRestaurants: [
    {
      id: 1,
      name: "Five Guys",
      image: "/mcdonalds.jpg",
      cuisine: "Burgers",
      rating: 4.9,
      openingSoon: "Opening Next Week"
    },
    {
      id: 2,
      name: "Shake Shack",
      image: "/mcdonalds.jpg",
      cuisine: "Burgers",
      rating: 4.8,
      openingSoon: "Coming Soon"
    }
  ],
  trending: [
    {
      id: 1,
      name: "Belle's Hot Chicken",
      image: "/mcdonalds.jpg",
      cuisine: "Fried Chicken",
      rating: 4.7,
      trendingItem: "Hot Wings"
    },
    {
      id: 2,
      name: "8bit",
      image: "/mcdonalds.jpg",
      cuisine: "Burgers",
      rating: 4.6,
      trendingItem: "Double Dragon Burger"
    }
  ],
  seasonal: [
    {
      id: 1,
      name: "San Churro",
      image: "/mcdonalds.jpg",
      cuisine: "Desserts",
      rating: 4.5,
      seasonalItem: "Winter Hot Chocolate"
    },
    {
      id: 2,
      name: "Chatime",
      image: "/mcdonalds.jpg",
      cuisine: "Bubble Tea",
      rating: 4.4,
      seasonalItem: "Summer Fruit Tea"
    }
  ]
};

export const pickupLocations = [
  {
    id: 1,
    name: "McDonald's",
    image: "/mcdonalds.jpg",
    rating: 4.2,
    address: "123 Elizabeth St, Melbourne VIC 3000",
    distance: "0.3 miles",
    preparationTime: "5-10 min",
    isOpen: true,
    openUntil: "24 hours",
    popularItems: [
      { name: "Big Mac", price: 6.99 },
      { name: "Quarter Pounder", price: 7.49 }
    ]
  },
  {
    id: 2,
    name: "KFC",
    image: "/mcdonalds.jpg",
    rating: 4.0,
    address: "456 Swanston St, Melbourne VIC 3000",
    distance: "0.5 miles",
    preparationTime: "7-12 min",
    isOpen: true,
    openUntil: "11:00 PM",
    popularItems: [
      { name: "Original Recipe Chicken", price: 8.99 },
      { name: "Zinger Burger", price: 7.99 }
    ]
  },
  {
    id: 3,
    name: "Subway",
    image: "/mcdonalds.jpg",
    rating: 4.3,
    address: "789 Bourke St, Melbourne VIC 3000",
    distance: "0.4 miles",
    preparationTime: "5-8 min",
    isOpen: true,
    openUntil: "10:00 PM",
    popularItems: [
      { name: "Italian B.M.T.", price: 9.99 },
      { name: "Chicken & Bacon Ranch", price: 10.99 }
    ]
  }
];
