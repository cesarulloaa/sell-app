import React, { useState } from 'react';
import type { Category } from '../../../types';
import '../../../components/CategoryChips.css';

interface CategoryChipsProps {
  categories: Category[];
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({ categories }) => {
  const [activeId, setActiveId] = useState<string>(categories[0]?.id || '');

  return (
    <div className="categories-wrapper">
      <ul className="categories-list container">
        {categories.map(category => (
          <li key={category.id} className="category-item">
            <button 
              className={`pill-button ${activeId === category.id ? 'pill-button--active' : 'pill-button--inactive'}`}
              onClick={() => setActiveId(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
