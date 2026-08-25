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
        <h1 className="font-cormorant font-light text-7xl md:text-8xl tracking-widest text-[#D4AF37] m-0 mb-4 animate-fade-in drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
          404
        </h1>
        
        {/* Subtitle */}
        <h2 className="font-sans text-base md:text-lg font-normal tracking-[0.2em] text-[#FAF4EE] uppercase m-0 mb-6">
          Page Not Found
        </h2>
        
        {/* Decorative divider */}
        <div className="w-12 h-[1px] bg-[#c89b3c]/40 mx-auto mb-6" />

        {/* Informative text */}
        <p className="text-[#D9C8B4] font-light text-sm md:text-base leading-relaxed m-0 mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Back to Home Button */}
        <button
          type="button"
          onClick={handleShopClick}
          className="px-8 py-3.5 bg-[#16120F] hover:bg-[#c89b3c]/20 border border-[#c89b3c]/40 text-[#F4E3A1] font-sans text-xs tracking-[0.16em] uppercase font-semibold cursor-pointer transition-colors duration-300 shadow-md"
        >
          Return to Shop
        </button>
      </main>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
