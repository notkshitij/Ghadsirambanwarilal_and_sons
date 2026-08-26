import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar({ 
  onCartClick, 
  onBrandClick, 
  onBookClick, 
  onShopClick, 
  onNavigate,
  alwaysShowBg = true, 
  isLoggedIn = false, 
  onProfileClick, 
  isDark = true, 
  bgColorClass = '' 
}) {
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    setIsMobileMenuOpen(false);
    if (onProfileClick) {
      onProfileClick();
    } else if (onNavigate) {
      onNavigate('profile');
    } else {
      window.history.pushState(null, '', '/profile');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBrandClick = () => {
    if (onBrandClick) {
      onBrandClick();
    } else if (onNavigate) {
      onNavigate('home');
    } else {
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleNavClick = (page) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.history.pushState(null, '', `/${page === 'home' ? '' : page}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleShop = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (onShopClick) {
      onShopClick();
    } else if (onNavigate) {
      onNavigate('shop');
    } else {
      window.history.pushState(null, '', '/shop');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 animate-navbar-entrance py-4 md:py-5 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0D0A08]/55 backdrop-blur-xl border-b border-[#2E231A]' 
          : 'bg-[#0D0A08] border-b border-transparent'
      } ${bgColorClass || ''}`}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 flex justify-between items-center">
        
        {/* Brand Logo & Name (Left Corner) */}
        <button
          type="button"
          onClick={handleBrandClick}
          className="flex items-center gap-2 md:gap-2.5 bg-transparent border-none cursor-pointer p-0 text-left outline-none focus:outline-none group"
        >
          <img
            src="/flow.png"
            alt="Ghadsiram Emblem"
            className="w-5 h-5 md:w-6 md:h-6 object-contain transition-transform duration-300 group-hover:scale-105"
            style={{
              filter: 'drop-shadow(0 1px 4px rgba(201, 170, 107, 0.45))'
            }}
          />
          <span 
            className="font-display font-semibold md:font-bold text-lg md:text-xl tracking-[0.14em] md:tracking-[0.18em] uppercase select-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
            style={{ color: '#C9AA6B' }}
          >
            GHADSIRAM'S
          </span>
        </button>

        {/* Desktop Navigation Links (Right Corner) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <a
            href="/shop"
            onClick={handleShop}
            className="font-sans text-[0.82rem] font-light tracking-[0.14em] uppercase text-[#EADCC9] no-underline cursor-pointer select-none"
          >
            Shop
          </a>


          <button
            type="button"
            onClick={() => handleNavClick('about')}
            className="font-sans text-[0.82rem] font-light tracking-[0.14em] uppercase text-[#EADCC9] bg-transparent border-none p-0 cursor-pointer select-none"
          >
            About
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="font-sans text-[0.82rem] font-light tracking-[0.14em] uppercase text-[#EADCC9] bg-transparent border-none p-0 cursor-pointer select-none"
          >
            Contact
          </button>

          {/* Cart Pill Button */}
          <button
            type="button"
            onClick={onCartClick}
            className="border border-[#C9AA6B] text-[#FAF4EE] px-4 py-1.5 rounded-full text-[0.78rem] font-sans font-light tracking-[0.12em] uppercase flex items-center gap-1.5 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.3)] select-none"
            title="Cart"
          >
            <span>Cart</span>
            <span className="font-normal text-[#C9AA6B]">({itemCount})</span>
          </button>

          {/* User / Profile Icon Only */}
          <button
            type="button"
            onClick={isLoggedIn || isLoggedInState ? handleProfileClick : () => handleNavClick('login')}
            className="bg-transparent border-none cursor-pointer p-1.5 flex items-center justify-center text-[#C9AA6B] outline-none focus:outline-none"
            title={isLoggedIn || isLoggedInState ? "Profile" : "Login"}
            aria-label={isLoggedIn || isLoggedInState ? "Profile" : "Login"}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </nav>

        {/* Mobile Action Controls */}
        <div className="flex md:hidden items-center gap-3">
          {/* Cart Pill Button for Mobile */}
          <button
            type="button"
            onClick={onCartClick}
            className="border border-[#C9AA6B] text-[#FAF4EE] px-3.5 py-1.5 rounded-full text-[0.74rem] font-sans font-light tracking-[0.1em] uppercase flex items-center gap-1.5 bg-black/40 backdrop-blur-sm cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
          >
            <span>Cart</span>
            <span className="font-normal text-[#C9AA6B]">({itemCount})</span>
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#FAF4EE] p-1 bg-transparent border-none cursor-pointer flex items-center justify-center outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-[1.8]">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-[1.8]">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Full-Screen Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 w-full h-[100dvh] bg-[#0D0A08] z-[100] flex flex-col justify-between px-6 py-6 animate-fade-in overflow-y-auto">
          {/* Top Bar */}
          <div className="w-full flex justify-between items-center pb-4">
            <button
              type="button"
              onClick={handleBrandClick}
              className="flex items-center gap-2 bg-transparent border-none cursor-pointer p-0 text-left outline-none"
            >
              <img
                src="/flow.png"
                alt="Ghadsiram Emblem"
                className="w-5 h-5 object-contain"
                style={{
                  filter: 'drop-shadow(0 1px 4px rgba(201, 170, 107, 0.45))'
                }}
              />
              <span 
                className="font-display font-semibold text-lg tracking-[0.18em] uppercase select-none"
                style={{ color: '#C9AA6B' }}
              >
                GHADSIRAM'S
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#FAF4EE] p-1 bg-transparent border-none cursor-pointer flex items-center justify-center outline-none"
              aria-label="Close menu"
            >
              <span className="text-2xl font-light leading-none">×</span>
            </button>
          </div>

          {/* Links Section */}
          <div className="flex flex-col gap-0 my-auto py-6">
            <a
              href="/shop"
              onClick={handleShop}
              className="font-cormorant text-3xl font-normal text-[#FAF4EE] py-4 border-b border-[#2E231A] no-underline block"
            >
              Shop
            </a>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className="text-left font-cormorant text-3xl font-normal text-[#FAF4EE] py-4 border-b border-[#2E231A] bg-transparent border-none cursor-pointer w-full"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="text-left font-cormorant text-3xl font-normal text-[#FAF4EE] py-4 border-b border-[#2E231A] bg-transparent border-none cursor-pointer w-full"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => {
                if (isLoggedIn || isLoggedInState) {
                  handleProfileClick();
                } else {
                  handleNavClick('login');
                }
              }}
              className="text-left font-cormorant text-3xl font-normal text-[#FAF4EE] py-4 border-b border-[#2E231A] bg-transparent border-none cursor-pointer w-full"
            >
              {isLoggedIn || isLoggedInState ? 'Profile' : 'Sign In'}
            </button>
          </div>

          {/* Bottom Action Button */}
          <div className="w-full pt-4">
            <button
              type="button"
              onClick={handleShop}
              className="w-full py-4 rounded-xl font-sans text-xs font-semibold tracking-[0.2em] uppercase border-none cursor-pointer shadow-lg"
              style={{ background: '#C9AA6B', color: '#0D0A08' }}
            >
              Shop the collection
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
