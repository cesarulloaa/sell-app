import type { ProductItem } from './Dashboard.types';

export const MOCK_STATS = {
  orders: 156,
  ordersGrowth: 12.5,
  views: 1234,
  viewsGrowth: 5.2,
};

export const MOCK_PRODUCTS: ProductItem[] = [
  { 
    id: '1', 
    name: 'Organic Bananas', 
    price: 4.99, 
    status: 'In Stock', 
    imageUrl: 'https://images.unsplash.com/photo-1603833662082-9cb773531b46?w=200&q=80' 
  },
  { 
    id: '2', 
    name: 'Fresh Strawberries', 
    price: 6.50, 
    status: 'In Stock', 
    imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&q=80' 
  },
  { 
    id: '3', 
    name: 'Green Avocados', 
    price: 8.99, 
    status: 'Low Stock', 
    imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&q=80' 
  }
];
