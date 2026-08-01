import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function NotFoundPage({ onBackToShop, onNavigate, onCartClick }) {
  const handleBrandClick = () => {
    if (onNavigate) {
      onNavigate('shop');
    } else {
      onBackToShop();
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between font-sans">
      <Navbar 
        onCartClick={onCartClick} 
        onBookClick={() => {
          if (onNavigate) onNavigate('appointment');
        }} 
        onShopClick={handleBrandClick} 
        onBrandClick={handleBrandClick} 
        alwaysShowBg={true} 
      />

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-36 pb-24 text-center max-w-[500px] mx-auto">
        {/* Large Luxury Serif Header */}
        <h1 className="font-cormorant font-light text-7xl md:text-8xl tracking-widest text-[#c89b3c] m-0 mb-4 animate-fade-in">
          404
        </h1>
        
        {/* Subtitle */}
        <h2 className="font-sans text-base md:text-lg font-normal tracking-[0.2em] text-neutral-800 uppercase m-0 mb-6">
          Page Not Found
        </h2>
        
        {/* Decorative divider */}
        <div className="w-12 h-[1px] bg-neutral-300 mx-auto mb-6" />

        {/* Informative text */}
        <p className="text-neutral-500 font-light text-sm md:text-base leading-relaxed m-0 mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Back to Home Button */}
        <button
          type="button"
          onClick={handleBrandClick}
          className="px-8 py-3.5 bg-[#1a1a1a] hover:bg-[#c89b3c] text-white font-sans text-xs tracking-[0.16em] uppercase font-semibold border-none cursor-pointer transition-colors duration-300 shadow-sm"
        >
          Return to Shop
        </button>
      </main>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
