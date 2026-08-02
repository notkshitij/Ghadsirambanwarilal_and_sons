import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function AboutUsPage({ onBackToShop, onNavigate, onCartClick }) {
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

      <main className="flex-1 flex flex-col items-center justify-center pt-36 pb-24 px-4 text-center">
        {/* Lotus / Logo Icon */}
        <div className="mb-6">
          <img
            src="/flowers.png"
            alt="Ghadsiram Logo"
            className="w-12 h-12 object-contain"
            style={{ filter: 'invert(75%) sepia(85%) saturate(600%) hue-rotate(3deg) brightness(90%) contrast(90%)' }}
          />
        </div>

        <h1 className="font-display font-light text-3xl md:text-4xl text-[#150305] tracking-[0.08em] uppercase mb-4">
          About Us
        </h1>
        
        {/* Gold Divider */}
        <div className="flex justify-center mb-6">
          <svg viewBox="0 0 100 20" className="w-16 h-4 fill-none stroke-[#c89b3c]" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 25 10 C 35 5, 42 15, 50 10 C 58 5, 65 15, 75 10 M 35 10 Q 50 15, 65 10" />
          </svg>
        </div>

        <p className="font-cormorant italic text-lg md:text-xl text-[#A67C1E] tracking-wide max-w-[400px]">
          Coming Soon
        </p>
      </main>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
