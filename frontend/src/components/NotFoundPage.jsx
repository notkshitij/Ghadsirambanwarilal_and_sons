import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function NotFoundPage({ onBackToShop, onBackToHome, onNavigate, onCartClick }) {
  const handleBrandClick = () => {
    if (onBackToHome) {
      onBackToHome();
    } else if (onNavigate) {
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
      if (onBackToShop) onBackToShop();
      else if (onNavigate) onNavigate('shop');
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0A08] text-[#FAF4EE] flex flex-col justify-between font-sans">
      <Navbar 
        onCartClick={onCartClick} 
        onBookClick={() => {
          if (onNavigate) onNavigate('appointment');
        }} 
        onShopClick={handleShopClick} 
        onBrandClick={handleBrandClick} 
        onNavigate={onNavigate}
        alwaysShowBg={true} 
      />

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-36 pb-24 text-center max-w-[500px] mx-auto">
        {/* Large Luxury Serif Header */}
        <h1 className="font-cormorant font-light text-7xl md:text-8xl tracking-widest text-[#C9AA6B] m-0 mb-4 animate-fade-in drop-shadow-[0_0_20px_rgba(201,170,107,0.25)]" style={{ color: '#C9AA6B' }}>
          404
        </h1>
        
        {/* Subtitle */}
        <h2 className="font-sans text-base md:text-lg font-normal tracking-[0.2em] text-[#FAF4EE] uppercase m-0 mb-6">
          Page Not Found
        </h2>
        
        {/* Decorative divider */}
        <div className="w-12 h-[1px] bg-[#C9AA6B]/40 mx-auto mb-6" />

        {/* Informative text */}
        <p className="text-[#D9C8B4] font-light text-sm md:text-base leading-relaxed m-0 mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Back to Home / Shop Button */}
        <button
          type="button"
          onClick={handleShopClick}
          className="px-8 py-3.5 rounded-lg bg-[#16120F] hover:bg-[#C9AA6B]/15 border border-[#C9AA6B]/40 hover:border-[#C9AA6B] text-[#FAF4EE] hover:text-[#C9AA6B] font-sans text-xs tracking-[0.16em] uppercase font-semibold cursor-pointer transition-all duration-300 shadow-md"
        >
          Return to Shop
        </button>
      </main>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
