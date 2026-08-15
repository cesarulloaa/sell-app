export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  status: 'Available' | 'Out of Stock' | 'Low Stock';
  category: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}
