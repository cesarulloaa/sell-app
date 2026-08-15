import React from 'react';
import type { Product } from '../../../types';
import { ProductCard } from './ProductCard';
import '../../../components/ProductGrid.css';

interface ProductGridProps {
  products: Product[];
  title: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  return (
    <section className="product-grid-section container">
      <div className="product-grid-header">
        <h2 className="product-grid-title">{title}</h2>
        <button className="product-grid-view-all">View All</button>
      </div>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
