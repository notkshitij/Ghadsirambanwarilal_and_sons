import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function AppointmentPage({ onNavigate, onCartClick }) {
  const handleBrandClick = () => {
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden font-sans text-[#FAF4EE] bg-[#0D0A08]">
      {/* Navbar with default dark header */}
      <Navbar 
        onCartClick={onCartClick} 
        onShopClick={() => onNavigate ? onNavigate('shop') : (window.location.href = '/shop')} 
        onBrandClick={handleBrandClick} 
        onNavigate={onNavigate}
        alwaysShowBg={true} 
      />

      {/* Main Coming Soon Area - Clean, No Background Image */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-32 md:py-40 text-center z-10">
        <div className="max-w-md w-full mx-auto flex flex-col items-center">
          {/* Subtle Icon */}
          <div className="w-16 h-16 rounded-full border border-[#C9AA6B]/30 flex items-center justify-center mb-6 bg-[#C9AA6B]/5">
            <svg 
              viewBox="0 0 24 24" 
              className="w-7 h-7 stroke-[#C9AA6B] fill-none" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>

          <p className="font-sans text-[0.68rem] font-semibold tracking-[0.28em] text-[#C9AA6B] uppercase mb-3">
            Private Atelier
          </p>

          <h1 className="font-cormorant font-light text-3xl md:text-5xl text-[#FAF4EE] mb-4 tracking-wide">
            Coming Soon
          </h1>

          <div className="w-12 h-px bg-[#C9AA6B]/40 my-3" />

          <p className="font-sans text-[0.85rem] font-light text-[#A69280] leading-relaxed max-w-sm mb-8">
            Our private appointment scheduling service is currently being curated. Please check back soon or connect with our concierge directly.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('contact') : (window.location.href = '/contact')}
              className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F4E3A1] to-[#C89B3C] hover:brightness-110 text-[#0D0A08] font-sans text-xs tracking-[0.16em] uppercase py-3.5 px-6 font-semibold transition-all cursor-pointer border-none shadow-md"
            >
              Contact Us
            </button>
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('home') : (window.location.href = '/')}
              className="w-full bg-transparent hover:bg-[#FAF4EE]/5 border border-[#C9AA6B]/40 text-[#C9AA6B] hover:text-[#FAF4EE] font-sans text-xs tracking-[0.16em] uppercase py-3.5 px-6 font-medium transition-all cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
