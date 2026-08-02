import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onCartClick, onBrandClick, onBookClick, onShopClick, alwaysShowBg = false, isLoggedIn = false, onProfileClick }) {
  const { itemCount } = useCart();
  const [isSpinning, setIsSpinning] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedInState, setIsLoggedInState] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedInState(localStorage.getItem('isLoggedIn') === 'true');
    };
    checkLogin();
    window.addEventListener('storage', checkLogin);
    window.addEventListener('auth-change', checkLogin);
    return () => {
      window.removeEventListener('storage', checkLogin);
      window.removeEventListener('auth-change', checkLogin);
    };
  }, []);

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      window.history.pushState(null, '', '/profile');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  useEffect(() => {
    if (alwaysShowBg) return;

    const handleScroll = () => {
      // Scroll past hero section (min-h-screen minus navbar height)
      if (window.scrollY > window.innerHeight - 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [alwaysShowBg]);

  const showBg = alwaysShowBg || isScrolled;

  const handleBrandClick = () => {
    setIsSpinning(true);
    if (onBrandClick) {
      onBrandClick();
    }
  };

  const handleShopClick = (e) => {
    e.preventDefault();
    if (onShopClick) {
      onShopClick();
    } else {
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-8 transition-all duration-300 animate-navbar-entrance ${
      showBg 
        ? 'py-3 bg-white/95 backdrop-blur-md' 
        : 'py-5 bg-transparent border-b border-transparent'
    }`}>
      <button
        type="button"
        onClick={handleBrandClick}
        className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer p-0 text-left outline-none focus:outline-none"
      >
        {/* Decoupled logo: Removed circle background & border */}
        <img
          src="/flowers.png"
          alt="Ghadsiram Mark"
          className={`w-10 h-10 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] ${
            isSpinning
              ? 'animate-logo-spin-once'
              : 'transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:rotate-[360deg]'
          }`}
          onAnimationEnd={() => setIsSpinning(false)}
        />
        <span className={`font-sans font-light text-xl tracking-[0.25em] transition-colors duration-300 ${
          showBg ? 'text-mahogany-dark' : 'text-cream-light'
        }`}>
          GHADSIRAM
        </span>
      </button>
      <div className="flex items-center gap-[1.8rem]">
        <a
          href="#shop"
          onClick={handleShopClick}
          className={`font-sans text-[0.75rem] font-light tracking-[0.08em] transition-colors duration-300 ${
            showBg ? 'text-mahogany-dark hover:text-gold-dark' : 'text-cream-light'
          }`}
        >
          Shop
        </a>

        <button
          onClick={onBookClick}
          className={`font-sans text-[0.75rem] font-light tracking-[0.08em] bg-transparent border-none cursor-pointer p-0 transition-colors duration-300 ${
            showBg ? 'text-mahogany-dark hover:text-gold-dark' : 'text-cream-light'
          }`}
        >
          Book an Appointment
        </button>

        <button
          onClick={onCartClick}
          className="relative bg-transparent border-none cursor-pointer p-1.5 flex items-center justify-center"
          title="Cart"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#c6a076] hover:scale-110 hover:rotate-12 transition-all duration-300">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full text-[0.55rem] font-bold flex items-center justify-center bg-gold-primary text-mahogany-dark">
              {itemCount}
            </span>
          )}
        </button>

        {(isLoggedIn || isLoggedInState) && (
          <button
            onClick={handleProfileClick}
            className="bg-transparent border-none cursor-pointer p-1.5 flex items-center justify-center text-[#c6a076] hover:scale-110 transition-all duration-300 outline-none focus:outline-none"
            title="Profile"
          >
            <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 fill-none stroke-current stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}
