import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  IconMenu, 
  IconPlus, 
  IconEye, 
  IconChevronRight, 
  IconTrendingUp, 
  IconPackage, 
  IconEdit, 
  IconCopy,
  IconX,
  IconSettings,
  IconLogOut,
  IconHome,
  IconUser,
  IconTruck
} from '../../../../components/icons';
import { MOCK_STATS, MOCK_PRODUCTS } from './Dashboard.data';
import type { StatsCardProps, ActionCardProps, ProductListItemProps } from './Dashboard.types';
import './Dashboard.css';
import { useAuth } from '../../../../contexts/AuthContext';

const StatsCard: React.FC<StatsCardProps> = ({ title, value, growth, icon: Icon }) => {
  const isPositive = growth >= 0;
  return (
    <div className="soft-card dash-stat-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ color: 'var(--color-text-light)', fontSize: '0.875rem', fontWeight: 500 }}>{title}</span>
        <div style={{ color: 'var(--color-text-light)' }}>
          <Icon width={20} height={20} />
        </div>
      </div>
      <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text)' }}>
        {value}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem' }}>
        <IconTrendingUp width={16} height={16} style={{ color: isPositive ? 'var(--color-primary)' : 'var(--color-text-light)' }} />
        <span style={{ color: isPositive ? 'var(--color-primary)' : 'var(--color-text-light)', fontWeight: 600 }}>
          {isPositive ? '+' : ''}{growth}%
        </span>
      </div>
    </div>
  );
};

const ActionCard: React.FC<ActionCardProps> = ({ title, icon: Icon, primary = false }) => {
  const className = `soft-card dash-action-card ${primary ? 'dash-action-card--primary' : 'dash-action-card--secondary'}`;
  return (
    <div className={className}>
      <Icon width={primary ? 28 : 24} height={primary ? 28 : 24} style={{ color: primary ? 'inherit' : 'var(--color-text-light)' }} />
      <span style={{ fontWeight: 600, fontSize: primary ? '1rem' : '0.875rem' }}>{title}</span>
    </div>
  );
};

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const inStock = product.status === 'In Stock';
  
  return (
    <div className="soft-card dash-product-item">
      <img src={product.imageUrl} alt={product.name} className="dash-product-img" />
      <div className="dash-product-info">
        <span style={{ fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {product.name}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="dash-product-price">${product.price.toFixed(2)}</span>
          <span className="dash-product-badge" style={{
            backgroundColor: inStock ? 'var(--color-primary-light)' : 'var(--color-bg-secondary)',
            color: inStock ? 'var(--color-primary-dark)' : 'var(--color-text-light)'
          }}>
            {product.status}
          </span>
        </div>
      </div>
      <button className="dash-header-btn" aria-label="Edit product">
        <IconEdit width={20} height={20} style={{ color: 'var(--color-text-light)' }} />
      </button>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, logout } = useAuth();

  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false);
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: IconHome },
    { label: 'Products', path: '/dashboard/products', icon: IconPackage },
    { label: 'Orders', path: '/dashboard/orders', icon: IconTruck },
    { label: 'Catalog', path: '/dashboard/catalog', icon: IconEye },
    { label: 'Settings', path: '/dashboard/settings', icon: IconSettings },
    { label: 'Profile', path: '/dashboard/profile', icon: IconUser },
  ];

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <div 
        className={`dash-overlay ${isSidebarOpen ? 'open' : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />
      
      <aside className={`dash-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="dash-sidebar-header">
          <div style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-primary)' }}>
            Vendor Center
          </div>
          <button className="dash-header-btn" onClick={() => setIsSidebarOpen(false)} aria-label="Close menu">
            <IconX width={20} height={20} />
          </button>
        </div>
        <nav className="dash-sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`dash-sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => {
                navigate(item.path);
                setIsSidebarOpen(false);
              }}
            >
              <item.icon width={20} height={20} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <header style={{ backgroundColor: 'var(--color-bg)', position: 'sticky', top: 0, zIndex: 40, borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
          <button className="dash-header-btn" onClick={() => setIsSidebarOpen(true)} aria-label="Open menu">
            <IconMenu />
          </button>
          <div style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-text)' }}>
            Vendor Dashboard
          </div>
          
          <div className="dash-avatar-wrapper" ref={userMenuRef}>
            <div 
              className="dash-avatar" 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                   setIsUserMenuOpen(!isUserMenuOpen);
                   e.preventDefault();
                }
              }}
              aria-label="User menu"
              aria-expanded={isUserMenuOpen}
            >
              {getInitials(userData?.businessName)}
            </div>
            
            <div className={`dash-dropdown ${isUserMenuOpen ? 'open' : ''}`}>
              <div style={{ padding: '8px 16px', marginBottom: '4px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{userData?.businessName || 'Vendor User'}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', wordBreak: 'break-all' }}>{userData?.email}</div>
              </div>
              <div className="dash-dropdown-divider" />
              <button 
                className="dash-dropdown-item" 
                onClick={() => { setIsUserMenuOpen(false); navigate('/dashboard/profile'); }}
              >
                <IconUser width={16} height={16} /> Profile
              </button>
              <button 
                className="dash-dropdown-item" 
                onClick={() => { setIsUserMenuOpen(false); navigate('/dashboard/settings'); }}
              >
                <IconSettings width={16} height={16} /> Settings
              </button>
              <div className="dash-dropdown-divider" />
              <button 
                className="dash-dropdown-item" 
                onClick={handleLogout}
                style={{ color: '#ef4444' }}
              >
                <IconLogOut width={16} height={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container dash-layout" style={{ paddingTop: '24px' }}>
        
        <section>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', marginBottom: '4px', fontWeight: 500 }}>
            {today}
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
            Welcome back,<br />
            <span style={{ color: 'var(--color-primary)' }}>Fresh Store</span>
          </h1>
        </section>

        <section>
          <div className="soft-card dash-customer-view">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: 'var(--color-primary)', display: 'flex' }}>
                <IconEye width={24} height={24} />
              </div>
              <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>View as Customer</span>
            </div>
            <div style={{ color: 'var(--color-text-light)', display: 'flex' }}>
              <IconChevronRight width={20} height={20} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="dash-section-title">Overview</h2>
          <div className="dash-stats-grid">
            <StatsCard 
              title="Orders" 
              value={MOCK_STATS.orders} 
              growth={MOCK_STATS.ordersGrowth} 
              icon={IconPackage} 
            />
            <StatsCard 
              title="Page Views" 
              value={MOCK_STATS.views.toLocaleString()} 
              growth={MOCK_STATS.viewsGrowth} 
              icon={IconEye} 
            />
          </div>
        </section>

        <section>
          <h2 className="dash-section-title">Quick Actions</h2>
          <div className="dash-actions-grid">
            <ActionCard 
              title="Add New Product" 
              icon={IconPlus} 
              primary 
            />
            <ActionCard 
              title="Copy Catalog Link" 
              icon={IconCopy} 
            />
          </div>
        </section>

        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 className="dash-section-title" style={{ margin: 0 }}>Recent Products</h2>
            <button style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', padding: '4px 8px', borderRadius: '4px' }}>
              View All
            </button>
          </div>
          <div className="dash-product-list">
            {MOCK_PRODUCTS.map(product => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        </section>

      </main>
    </>
  );
};

export default Dashboard;
