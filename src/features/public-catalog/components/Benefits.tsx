import React from 'react';
import type { Benefit } from '../../../types';
import { IconTruck, IconLeaf, IconShield } from '../../../components/icons';
import '../../../components/Benefits.css';

interface BenefitsProps {
  benefits: Benefit[];
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'truck': return <IconTruck className="benefit-icon" />;
    case 'leaf': return <IconLeaf className="benefit-icon" />;
    case 'shield': return <IconShield className="benefit-icon" />;
    default: return null;
  }
};

export const Benefits: React.FC<BenefitsProps> = ({ benefits }) => {
  return (
    <section className="benefits-section container">
      <h2 className="sr-only" style={{ display: 'none' }}>Why choose us</h2>
      <div className="benefits-grid">
        {benefits.map(benefit => (
          <div key={benefit.id} className="benefit-card soft-card">
            <div className="benefit-icon-wrapper">
              {getIcon(benefit.icon)}
            </div>
            <div className="benefit-content">
              <h4 className="benefit-title">{benefit.title}</h4>
              <p className="benefit-desc">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
