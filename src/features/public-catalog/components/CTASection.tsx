import React from 'react';
import '../../../components/CTASection.css'

export const CTASection: React.FC = () => {
  return (
    <section className="cta-section container">
      <div className="cta-content soft-card">
        <h2 className="cta-title">Ready to eat fresh?</h2>
        <p className="cta-subtitle">Explore our full catalog and enjoy organic products delivered directly to your door.</p>
        <button className="pill-button pill-button--active cta-btn">Explore Catalog</button>
      </div>
    </section>
  );
};
