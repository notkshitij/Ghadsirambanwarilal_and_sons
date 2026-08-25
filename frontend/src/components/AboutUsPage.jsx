import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function AboutUsPage({ onBackToShop, onBackToHome, onNavigate, onCartClick }) {
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

      <main className="flex-1 flex flex-col items-center justify-center pt-36 pb-24 px-4 text-center">
        {/* Lotus / Logo Icon */}
        <div className="mb-6">
          <img
            src="/flowers.png"
            alt="Ghadsiram Logo"
            className="w-14 h-14 object-contain drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]"
          />
        </div>

        <span className="font-sans text-[0.72rem] tracking-[0.2em] uppercase text-[#D4AF37] block mb-2">
          Legacy &amp; Heritage
        </span>
        <h1 className="font-display font-light text-3xl md:text-5xl text-[#FAF4EE] tracking-[0.08em] uppercase mb-4">
          About Us
        </h1>
        
        {/* Gold Divider */}
        <div className="flex justify-center mb-6">
          <svg viewBox="0 0 100 20" className="w-16 h-4 fill-none stroke-[#c89b3c]" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 25 10 C 35 5, 42 15, 50 10 C 58 5, 65 15, 75 10 M 35 10 Q 50 15, 65 10" />
          </svg>
        </div>

        <p className="font-cormorant italic text-lg md:text-2xl text-[#D9C8B4] tracking-wide max-w-[550px] leading-relaxed">
          Crafting Jaipur&apos;s timeless royal fine jewelry traditions since generations.
        </p>

        <button
          type="button"
          onClick={handleShopClick}
          className="mt-8 px-8 py-3.5 bg-[#16120F] border border-[#c89b3c]/40 text-[#F4E3A1] hover:bg-[#c89b3c]/20 font-sans text-xs tracking-[0.16em] uppercase font-semibold cursor-pointer transition-all duration-300 shadow-md"
        >
          Explore Collection
        </button>
      </main>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
