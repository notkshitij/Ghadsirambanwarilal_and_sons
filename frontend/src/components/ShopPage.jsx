import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function ShopPage({ onNavigate, onCartClick }) {
  const handleBrandClick = () => {
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleShopClick = () => {
    if (onNavigate) {
      onNavigate('shop');
    } else {
      window.history.pushState(null, '', '/shop');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between font-sans">
      <Navbar 
        onCartClick={onCartClick} 
        onBookClick={() => {
          if (onNavigate) onNavigate('appointment');
        }} 
        onShopClick={handleShopClick} 
        onBrandClick={handleBrandClick} 
        alwaysShowBg={true} 
      />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 md:px-12 pt-36 pb-24 text-neutral-800 leading-relaxed">
        {/* Header section with Title and View Icons */}
        <div className="flex flex-row items-center justify-between border-b border-neutral-200/60 pb-5 mb-12 select-none">
          <h1 className="font-sans font-light text-2xl md:text-[1.8rem] tracking-[0.12em] text-neutral-900 m-0 uppercase">
            Shop All Items
          </h1>
          
          {/* Right Icons container */}
          <div className="flex items-center gap-4 text-neutral-400">
            {/* Search Icon */}
            <button type="button" aria-label="Search" className="p-1 hover:text-neutral-800 transition-colors bg-transparent border-none cursor-pointer">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            
            {/* Grid 4 Icon */}
            <button type="button" aria-label="Grid View" className="p-1 text-neutral-800 hover:text-neutral-800 transition-colors bg-transparent border-none cursor-pointer">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>

            {/* List Icon */}
            <button type="button" aria-label="List View" className="p-1 hover:text-neutral-800 transition-colors bg-transparent border-none cursor-pointer">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2.2rem] w-full">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
