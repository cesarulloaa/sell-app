import type { Product, Category, Benefit } from '../../../types';

export const categories: Category[] = [
  { id: '1', name: 'All' },
  { id: '2', name: 'Fruits' },
  { id: '3', name: 'Vegetables' },
  { id: '4', name: 'Dairy' },
  { id: '5', name: 'Organic' },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Fresh Avocados',
    price: 4.99,
    imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=300&q=80',
    status: 'Available',
    category: 'Vegetables',
  },
  {
    id: 'p2',
    name: 'Organic Bananas',
    price: 2.49,
    imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=300&q=80',
    status: 'Available',
    category: 'Fruits',
  },
  {
    id: 'p3',
    name: 'Almond Milk',
    price: 3.99,
    imageUrl: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=300&q=80',
    status: 'Low Stock',
    category: 'Dairy',
  },
  {
    id: 'p4',
    name: 'Green Apples',
    price: 5.20,
    imageUrl: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=300&q=80',
    status: 'Available',
    category: 'Fruits',
  },
];

export const benefits: Benefit[] = [
  {
    id: 'b1',
    title: 'Free Shipping',
    description: 'On orders over $50',
    icon: 'truck',
  },
  {
    id: 'b2',
    title: 'Fresh Quality',
    description: '100% organic products',
    icon: 'leaf',
  },
  {
    id: 'b3',
    title: 'Secure Payment',
    description: '100% secure checkout',
    icon: 'shield',
  }
];
