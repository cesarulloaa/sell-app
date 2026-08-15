import React from 'react';
import type { Product } from '../../../types';
import { IconPlus } from '../../../components/icons';
import '../../../components/ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card soft-card">
      <div className="product-card__image-container">
        <img src={product.imageUrl} alt={product.name} className="product-card__image" />
        {product.status !== 'Available' && (
          <span className="product-card__badge">{product.status}</span>
        )}
      </div>
      <div className="product-card__content">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__title">{product.name}</h3>
        <div className="product-card__footer">
          <span className="product-card__price">${product.price.toFixed(2)}</span>
          <button className="product-card__add-btn" aria-label="Add to cart">
            <IconPlus width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
