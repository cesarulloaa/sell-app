import React, { useState } from 'react';
import { IconHome, IconSearch, IconHeart, IconUser } from '../../../components/icons';
import '../../../components/BottomNav.css';



export const BottomNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', icon: <IconHome />, label: 'Home' },
    { id: 'search', icon: <IconSearch />, label: 'Search' },
    { id: 'favorites', icon: <IconHeart />, label: 'Favorites' },
    { id: 'profile', icon: <IconUser />, label: 'Profile' }
  ];

  return (
    <nav className="bottom-nav">
      <ul className="bottom-nav-list container">
        {navItems.map(item => (
          <li key={item.id} className="bottom-nav-item">
            <button 
              className={`bottom-nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <div className="bottom-nav-icon">{item.icon}</div>
              <span className="bottom-nav-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
