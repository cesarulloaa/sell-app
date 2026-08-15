import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { SearchBar } from '../components/SearchBar';
import { CategoryChips } from '../components/CategoryChips';
import { ProductGrid } from '../components/ProductGrid';
import { Benefits } from '../components/Benefits';
import { CTASection } from '../components/CTASection';
import { BottomNav } from '../components/BottomNav';

import { categories, products, benefits } from '../data/mock';

export const Home: React.FC = () => {
  return (
    <div className="app-container">
      <Header />

      <main>
        <Hero />
        <SearchBar />
        <CategoryChips categories={categories} />

        <ProductGrid title="Trending Now" products={products} />

        <Benefits benefits={benefits} />

        <CTASection />
      </main>

      <BottomNav />
    </div>
  );
};
