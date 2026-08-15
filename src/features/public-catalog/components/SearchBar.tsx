import React from 'react';
import { IconSearch } from '../../../components/icons';
import '../../../components/SearchBar.css';

interface SearchBarProps {
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search for fresh products..." }) => {
  return (
    <div className="search-container container">
      <div className="search-bar soft-card">
        <IconSearch className="search-icon" />
        <input 
          type="text" 
          className="search-input" 
          placeholder={placeholder} 
        />
      </div>
    </div>
  );
};
