import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import LandingPage from './components/LandingPage';
import CartPage from './components/CartPage';
import CartToast from './components/CartToast';
import CartDrawer from './components/CartDrawer';

function useDesktopCart() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const updateScreenSize = () => setIsDesktop(mediaQuery.matches);

    updateScreenSize();
    mediaQuery.addEventListener('change', updateScreenSize);
    return () => mediaQuery.removeEventListener('change', updateScreenSize);
  }, []);

  return isDesktop;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [currentPage, setCurrentPage] = useState('shop');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const isDesktop = useDesktopCart();

  useEffect(() => {
    // Check if the user has visited the site in this session
    const hasVisited = localStorage.getItem('visited_ghadsiram');
    if (hasVisited === 'true') {
      setShowSplash(false);
    }
  }, []);

  // Dynamically lock/unlock scrolling depending on splash screen visibility
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSplash]);

  useEffect(() => {
    if (!isDesktop) {
      setIsCartDrawerOpen(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    if (!isCartDrawerOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isCartDrawerOpen]);

  const handleSplashComplete = () => {
    setIsFadingOut(true);
    // Unmount splash screen after the slow zoom-in transition completes (1500ms)
    setTimeout(() => {
      setShowSplash(false);
      localStorage.setItem('visited_ghadsiram', 'true');
    }, 1500);
  };

  const handleCartClick = () => {
    if (isDesktop) {
      setIsCartDrawerOpen((isOpen) => !isOpen);
      return;
    }

    setCurrentPage('cart');
  };

  return (
    <div className="w-full h-full min-h-screen relative">
      {/* Base Landing Page is always loaded underneath */}
      {currentPage === 'cart' ? (
        <CartPage onContinueShopping={() => setCurrentPage('shop')} />
      ) : (
        <LandingPage onOpenCart={handleCartClick} />
      )}

      {currentPage === 'shop' && <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />}

      {/* Overlay Splash Screen */}
      {showSplash && currentPage === 'shop' && (
        <div className={`fixed inset-0 w-full h-screen z-[9999] transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <SplashScreen isFadingOut={isFadingOut} onComplete={handleSplashComplete} />
        </div>
      )}
      <CartToast />
    </div>
  );
}
