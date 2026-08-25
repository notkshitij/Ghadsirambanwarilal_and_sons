import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductCard from './ProductCard';
import { products } from '../data/products';

// Assign badges to first few products
const badges = ['Bestseller', 'New', null, null, null];

export default function ShopPage({ onNavigate, onCartClick }) {
  const handleBrandClick = () => {
    if (onNavigate) onNavigate('home');
  };

  const handleShopClick = () => {
    if (onNavigate) onNavigate('shop');
  };

  return (
    <div className="min-h-screen bg-[#0D0A08] text-[#FAF4EE] flex flex-col justify-between font-sans">
      <Navbar
        onCartClick={onCartClick}
        onBookClick={() => { if (onNavigate) onNavigate('appointment'); }}
        onShopClick={handleShopClick}
        onBrandClick={handleBrandClick}
        onNavigate={onNavigate}
        alwaysShowBg={true}
      />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 md:px-12 pt-36 pb-24">

        {/* Page Header */}
        <div className="mb-12">
          <p className="font-sans text-[0.68rem] font-semibold tracking-[0.28em] text-[#C9AA6B] uppercase mb-4">
            The Collection
          </p>
          <h1 className="font-cormorant font-light text-6xl md:text-7xl text-[#FAF4EE] m-0 mb-5 leading-[1]">
            Shop
          </h1>
          <p className="font-sans text-sm font-light text-[#7A6A58] leading-[1.7] m-0 max-w-[480px]">
            A quiet catalogue of fine jewellery — crafted with care and kept for a lifetime.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12 w-full">
          {products.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
              badge={badges[idx] || null}
            />
          ))}
        </div>
      </main>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
