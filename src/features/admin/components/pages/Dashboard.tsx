import React from 'react';
import { 
  IconMenu, 
  IconPlus, 
  IconEye, 
  IconChevronRight, 
  IconTrendingUp, 
  IconPackage, 
  IconEdit, 
  IconCopy 
} from '../../../../components/icons';
import { MOCK_STATS, MOCK_PRODUCTS } from './Dashboard.data';
import type { StatsCardProps, ActionCardProps, ProductListItemProps } from './Dashboard.types';
import './Dashboard.css';

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
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <>
      <header style={{ backgroundColor: 'var(--color-bg)', position: 'sticky', top: 0, zIndex: 40, borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
          <button className="dash-header-btn" aria-label="Menu">
            <IconMenu />
          </button>
          <div style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-text)' }}>
            Vendor Dashboard
          </div>
          <div className="dash-avatar">
            JS
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
