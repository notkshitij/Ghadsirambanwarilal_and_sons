import React, { useState, useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
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
import ShopPage from './components/ShopPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import SizeGuidePage from './components/SizeGuidePage';
import CookiePolicyPage from './components/CookiePolicyPage';
import AdminPage from './components/AdminPage';
import PageLoader from './components/PageLoader';
import SplashScreen from './components/SplashScreen';


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
    if (path === '/' || path === '') return 'home';
    if (path === '/shop' || path.startsWith('/category/')) return 'shop';
    if (path.startsWith('/product/')) return 'product';
    if (path === '/cart') return 'cart';
    if (path === '/appointment') return 'appointment';
    if (path === '/privacy') return 'privacy';
    if (path === '/terms') return 'terms';
    if (path === '/cookies' || path === '/cookie-policy') return 'cookies';
    if (path === '/contact') return 'contact';
    if (path === '/care-guide') return 'care-guide';
    if (path === '/size-guide') return 'size-guide';
    if (path === '/login') return 'login';
    if (path === '/about') return 'about';
    if (path === '/profile') return 'profile';
    if (path === '/adminpage') return 'admin';
    return 'notFound';
  };

  const getCategoryFromPath = () => {
    const path = window.location.pathname;
    if (path.startsWith('/category/')) {
      const slug = path.replace('/category/', '').toLowerCase();
      if (slug === 'necklaces' || slug === 'necklace') return 'Necklaces';
      if (slug === 'bracelets' || slug === 'bracelet') return 'Bracelets';
      if (slug === 'hair-clips' || slug === 'hairclips' || slug === 'hair_clips') return 'Hair Clips';
    }
    return 'All';
  };

  const [selectedCategory, setSelectedCategory] = useState(getCategoryFromPath);

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
    handleNavigate('home');
  };

  const [showSplash, setShowSplash] = useState(() => {
    return getPageFromPath() === 'home';
  });
  const [currentPage, setCurrentPage] = useState(getPageFromPath);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const isDesktop = useDesktopCart();
  const lenisRef = useRef(null);
  const loadingTimerRef = useRef(null);

  const triggerPageLoader = (duration = 1200, callback = null) => {
    setIsPageLoading(true);
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
    }
    loadingTimerRef.current = setTimeout(() => {
      setIsPageLoading(false);
      if (callback) callback();
    }, duration);
  };

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    triggerPageLoader(1300, () => {
      if (localStorage.getItem('isLoggedIn') === 'true') {
        alert('Proceeding to checkout! Thank you for choosing Ghadsiram.');
      } else {
        sessionStorage.setItem('postLoginRedirect', 'cart');
        handleNavigate('login');
      }
    });
  };

  // Synchronize state with history back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const targetPage = getPageFromPath();
      setCurrentPage(targetPage);
      setSelectedCategory(getCategoryFromPath());
      if (['product', 'about', 'contact'].includes(targetPage)) {
        triggerPageLoader(1200);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page, param = null) => {
    let path;
    if (page === 'home') {
      path = '/';
      setSelectedCategory('All');
    } else if (page === 'product' && param) {
      path = `/product/${param}`;
    } else if (page === 'category' && param) {
      if (param === 'All') {
        path = '/shop';
        setSelectedCategory('All');
      } else {
        const slug = param.toLowerCase().replace(/\s+/g, '-');
        path = `/category/${slug}`;
        setSelectedCategory(param);
      }
      page = 'shop';
    } else if (page === 'shop') {
      if (param && param !== 'All') {
        const slug = param.toLowerCase().replace(/\s+/g, '-');
        path = `/category/${slug}`;
        setSelectedCategory(param);
      } else {
        path = '/shop';
        setSelectedCategory('All');
      }
    } else {
      path = `/${page}`;
    }
    window.history.pushState(null, '', path);
    setCurrentPage(page);

    // Only show loader for Checkout, Product details, About Us, and Contact Us
    if (['product', 'about', 'contact'].includes(page)) {
      triggerPageLoader(1200);
    }

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

  // Dynamically update document title based on current page
  useEffect(() => {
    const shopTitle = selectedCategory && selectedCategory !== 'All' 
      ? `${selectedCategory} | Ghadsiram's` 
      : "The Collection | Ghadsiram's";

    const titles = {
      home: "Ghadsiram's | Fine Signature Jewellery Jaipur",
      shop: shopTitle,
      cart: "Shopping Bag | Ghadsiram's",
      contact: "Studio & Contact | Ghadsiram's",
      about: "About Us | Ghadsiram's",
      appointment: "Private Appointment | Ghadsiram's",
      'care-guide': "Jewellery Care Guide | Ghadsiram's",
      'size-guide': "Size Guide | Ghadsiram's",
      login: "Sign In & Account | Ghadsiram's",
      profile: "Client Profile | Ghadsiram's",
      privacy: "Privacy Policy | Ghadsiram's",
      terms: "Terms & Conditions | Ghadsiram's",
      cookies: "Cookie Policy | Ghadsiram's",
      admin: "Admin Panel | Ghadsiram's",
      notFound: "404 Page Not Found | Ghadsiram's",
    };

    if (currentPage !== 'product') {
      document.title = titles[currentPage] || "Ghadsiram's | Fine Signature Jewellery";
    }
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    if (!isDesktop) {
      setIsCartDrawerOpen(false);
    }
  }, [isDesktop]);

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
            onBackToHome={() => handleNavigate('home')}
            onBookClick={() => handleNavigate('appointment')} 
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
            onCheckout={handleCheckout}
          />
        ) : currentPage === 'shop' ? (
          <ShopPage 
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
            initialCategory={selectedCategory}
            onSelectCategory={(cat) => handleNavigate(cat === 'All' ? 'shop' : 'category', cat)}
          />
        ) : currentPage === 'product' ? (
          <ProductDetailsPage 
            productId={window.location.pathname.substring(9)}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : currentPage === 'appointment' ? (
          <AppointmentPage 
            onBackToShop={() => handleNavigate('shop')} 
            onBackToHome={() => handleNavigate('home')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : currentPage === 'privacy' ? (
          <PrivacyPolicyPage 
            onBackToShop={() => handleNavigate('shop')}
            onBackToHome={() => handleNavigate('home')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : currentPage === 'terms' ? (
          <TermsOfServicePage 
            onBackToShop={() => handleNavigate('shop')}
            onBackToHome={() => handleNavigate('home')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : currentPage === 'cookies' ? (
          <CookiePolicyPage 
            onBackToShop={() => handleNavigate('shop')}
            onBackToHome={() => handleNavigate('home')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : currentPage === 'contact' ? (
          <ContactPage 
            onBackToShop={() => handleNavigate('shop')}
            onBackToHome={() => handleNavigate('home')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : currentPage === 'care-guide' ? (
          <CareGuidePage 
            onBackToShop={() => handleNavigate('shop')}
            onBackToHome={() => handleNavigate('home')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : currentPage === 'size-guide' ? (
          <SizeGuidePage 
            onBackToShop={() => handleNavigate('shop')}
            onBackToHome={() => handleNavigate('home')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : currentPage === 'login' ? (
          <LoginPage 
            onBackToShop={() => handleNavigate('shop')}
            onBackToHome={() => handleNavigate('home')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : currentPage === 'about' ? (
          <AboutUsPage 
            onBackToShop={() => handleNavigate('shop')}
            onBackToHome={() => handleNavigate('home')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : currentPage === 'profile' ? (
          <ProfilePage 
            onBackToShop={() => handleNavigate('shop')}
            onBackToHome={() => handleNavigate('home')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
            onLogout={handleLogout}
          />
        ) : currentPage === 'admin' ? (
          <AdminPage 
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'notFound' ? (
          <NotFoundPage 
            onBackToShop={() => handleNavigate('shop')}
            onBackToHome={() => handleNavigate('home')}
            onNavigate={handleNavigate}
            onCartClick={handleCartClick}
          />
        ) : (
          <LandingPage 
            onOpenCart={handleCartClick} 
            onBookClick={() => handleNavigate('appointment')} 
            onNavigate={handleNavigate}
            isSplashActive={showSplash}
          />
        )}

        {/* Render CartDrawer globally so it can slide open smoothly from any page layout */}
        <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} onCheckout={handleCheckout} />

        <CartToast />

        {/* Global Page Transition Loader with small flow logo */}
        <PageLoader isVisible={isPageLoading} />

        {/* First-time / initial landing intro animation (rotating & zooming flow logo) */}
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </div>
    </ReactLenis>
  );
}
