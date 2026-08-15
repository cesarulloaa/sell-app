import React from 'react';
import './StartPage.css';
import { featuresData } from './StartPage.data';
import type { FeatureItem } from './StartPage.types';

// Reusing existing icons from the design system
import { IconTrendingUp, IconPackage } from '../../../components/icons';

// Component: HeroSection
const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <h1 className="hero-title">
        Your Catalog, on <span className="highlight-text">WhatsApp.</span>
      </h1>
      <p className="hero-subtitle">
        Create your catalog in seconds and sell directly to customers with mobile-ready showcases.
      </p>
      
      <div className="hero-actions">
        {/* Navigation is visually mocked with window.location, should be replaced with React Router Link in the real app if used */}
        <button 
          className="cta-main"
          onClick={() => window.location.href = '/auth/register'}
        >
          Start Now
        </button>
        <button 
          className="cta-secondary"
          onClick={() => window.location.href = '/auth/login'}
        >
          Already have an account? <span>Log In</span>
        </button>
      </div>
    </section>
  );
};

// Component: HighlightCard (Value Proposition)
const HighlightCard: React.FC = () => {
  return (
    <section className="value-card">
      <span className="badge-growth">Growth Engine</span>
      <h2 className="value-title">Escalate your business</h2>
      <p className="value-desc">
        Acquire more customers, close sales faster, and manage all your orders directly from the platform everyone already uses.
      </p>
    </section>
  );
};

// Component: FeatureCard
const FeatureCard: React.FC<{ feature: FeatureItem }> = ({ feature }) => {
  // Mapping the icons based on the data.ts "icon" string definition
  const getIcon = () => {
    switch (feature.icon) {
      case 'instant':
        return <IconTrendingUp width={24} height={24} strokeWidth={2.5} />;
      case 'direct':
        return <IconPackage width={24} height={24} strokeWidth={2.5} />;
      default:
        return <IconTrendingUp width={24} height={24} />;
    }
  };

  return (
    <div className="feature-card">
      <div className="feature-icon-box">
        {getIcon()}
      </div>
      <div className="feature-content">
        <h3 className="feature-title">{feature.title}</h3>
        <p className="feature-desc">{feature.description}</p>
      </div>
    </div>
  );
};

// Main Component: StartPage
export const StartPage: React.FC = () => {
  return (
    <main className="start-page">
      {/* 1. Header / Brand */}
      <header className="start-header">
        <div className="brand-text">Emerald Orbit</div>
      </header>

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Value Proposition Card */}
      <HighlightCard />

      {/* 4. Features Section */}
      <section className="features-grid">
        {featuresData.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </section>
    </main>
  );
};

export default StartPage;
