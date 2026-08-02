import React, { useState, useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import SplashScreen from './components/SplashScreen';
import LandingPage from './components/LandingPage';
import CartPage from './components/CartPage';
import CartToast from './components/CartToast';
import CartDrawer from './components/CartDrawer';
import AppointmentPage from './components/AppointmentPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import NotFoundPage from './components/NotFoundPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import ContactPage from './components/ContactPage';
import CareGuidePage from './components/CareGuidePage';
import LoginPage from './components/LoginPage';
import AboutUsPage from './components/AboutUsPage';
import ProfilePage from './components/ProfilePage';


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
  const getPageFromPath = () => {
    const path = window.location.pathname;
    if (path === '/' || path === '') return 'shop';
    if (path === '/cart') return 'cart';
    if (path === '/appointment') return 'appointment';
    if (path === '/privacy') return 'privacy';
    if (path === '/terms') return 'terms';
    if (path === '/contact') return 'contact';
    if (path === '/care-guide') return 'care-guide';
    if (path === '/login') return 'login';
    if (path === '/about') return 'about';
    if (path === '/profile') return 'profile';
    return 'notFound';
  };

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    checkLogin();
    window.addEventListener('storage', checkLogin);
    window.addEventListener('auth-change', checkLogin);
    return () => {
      window.removeEventListener('storage', checkLogin);
      window.removeEventListener('auth-change', checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new CustomEvent('auth-change'));
    handleNavigate('shop');
  };

  const handleCheckout = () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      alert('Proceeding to checkout! Thank you for choosing Ghadsiram.');
    } else {
      sessionStorage.setItem('postLoginRedirect', 'cart');
      handleNavigate('login');
    }
  };

  const [showSplash, setShowSplash] = useState(() => {
    return getPageFromPath() === 'shop';
  });
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [currentPage, setCurrentPage] = useState(getPageFromPath);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const isDesktop = useDesktopCart();
  const lenisRef = useRef(null);

  // Synchronize state with history back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page) => {
    const path = page === 'shop' ? '/' : `/${page}`;
    window.history.pushState(null, '', path);
    setCurrentPage(page);

    // Scroll to top immediately on navigation
    window.scrollTo(0, 0);
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });

    setTimeout(() => {
      window.scrollTo(0, 0);
      lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
    }, 50);
  };

  useEffect(() => {
    // Scroll past header/hero smoothly when routing triggers on history pop state
    window.scrollTo(0, 0);
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
    }, 50);

    return () => clearTimeout(timer);
  }, [currentPage]);

  // Dynamically lock/unlock scrolling depending on splash screen visibility (Lenis-only scroll-lock to prevent layout shifting)
  useEffect(() => {
    const currentLenis = lenisRef.current;
    if (showSplash) {
      currentLenis?.lenis?.stop();
    } else {
      currentLenis?.lenis?.start();
    }
    return () => {
      currentLenis?.lenis?.start();
    };
  }, [showSplash]);

  useEffect(() => {
    if (!isDesktop) {
      setIsCartDrawerOpen(false);
    }
  }, [isDesktop]);

  // Dynamically lock/unlock scrolling depending on cart drawer visibility (Lenis-only scroll-lock to prevent layout shifting)
  useEffect(() => {
    if (!isCartDrawerOpen) {
      return undefined;
    }

    const currentLenis = lenisRef.current;
    currentLenis?.lenis?.stop();

    return () => {
      currentLenis?.lenis?.start();
    };
  }, [isCartDrawerOpen]);

  const handleSplashComplete = () => {
    setIsFadingOut(true);
    // Unmount splash screen after the slow zoom-in transition completes (1500ms)
    setTimeout(() => {
      setShowSplash(false);
    }, 1500);
  };

  const handleCartClick = () => {
    if (isDesktop) {
      setIsCartDrawerOpen((isOpen) => !isOpen);
      return;
    }

    handleNavigate('cart');
  };

  return (
    <ReactLenis root ref={lenisRef} options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <div className="w-full h-full min-h-screen relative">
        {/* Page Switcher */}
        {currentPage === 'cart' ? (
          <CartPage 
            onContinueShopping={() => handleNavigate('shop')} 
            onBookClick={() => handleNavigate('appointment')} 
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
            onCheckout={handleCheckout}
          />
        ) : currentPage === 'appointment' ? (
          <AppointmentPage 
            onBackToShop={() => handleNavigate('shop')} 
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : currentPage === 'privacy' ? (
          <PrivacyPolicyPage 
            onBackToShop={() => handleNavigate('shop')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : currentPage === 'terms' ? (
          <TermsOfServicePage 
            onBackToShop={() => handleNavigate('shop')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : currentPage === 'contact' ? (
          <ContactPage 
            onBackToShop={() => handleNavigate('shop')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : currentPage === 'care-guide' ? (
          <CareGuidePage 
            onBackToShop={() => handleNavigate('shop')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : currentPage === 'login' ? (
          <LoginPage 
            onBackToShop={() => handleNavigate('shop')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : currentPage === 'about' ? (
          <AboutUsPage 
            onBackToShop={() => handleNavigate('shop')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : currentPage === 'profile' ? (
          <ProfilePage 
            onBackToShop={() => handleNavigate('shop')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
            onLogout={handleLogout}
          />
        ) : currentPage === 'notFound' ? (
          <NotFoundPage 
            onBackToShop={() => handleNavigate('shop')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : (
          <LandingPage 
            onOpenCart={handleCartClick} 
            onBookClick={() => handleNavigate('appointment')} 
            onNavigate={handleNavigate}
          />
        )}

        {/* Render CartDrawer globally so it can slide open smoothly from any page layout */}
        <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} onCheckout={handleCheckout} />

        {/* Overlay Splash Screen */}
        {showSplash && currentPage === 'shop' && (
          <div className={`fixed inset-0 w-full h-screen z-[9999] transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <SplashScreen isFadingOut={isFadingOut} onComplete={handleSplashComplete} />
          </div>
        )}
        <CartToast />
      </div>
    </ReactLenis>
  );
}
