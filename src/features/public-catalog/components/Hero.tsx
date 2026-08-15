import React from 'react';
import '../../../components/Hero.css';

export const Hero: React.FC = () => {
  return (
    <section className="hero container">
      <div className="hero__content soft-card">
        <h1 className="hero__title">Fresh groceries,<br />delivered fast</h1>
        <p className="hero__subtitle">Organically grown, hand-picked straight from the farm to your door.</p>
        <button className="pill-button pill-button--primary hero__btn">Shop Now</button>
      </div>
    </section>
  );
};
