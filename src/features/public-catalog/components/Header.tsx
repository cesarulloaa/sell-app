import React from 'react';
import { IconMenu, IconUser } from '../../../components/icons';
import '../../../components/Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container container">
        <button className="header__icon-btn" aria-label="Menu">
          <IconMenu />
        </button>
        
        <div className="header__logo">
          <span className="header__logo-text">Fresh</span>
          <span className="header__logo-dot">.</span>
        </div>
        
        <button className="header__icon-btn" aria-label="Profile">
          <IconUser />
        </button>
      </div>
    </header>
  );
};
