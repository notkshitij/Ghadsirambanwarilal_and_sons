import React, { useState, useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { supabase } from './lib/supabaseClient';
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
import CompleteProfilePage from './components/CompleteProfilePage';

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
    if (path === '/sons') return 'admin';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const checkProfileCompleteness = async (userId) => {
    if (!userId) return false;
    try {
      const [profileRes, addressesRes] = await Promise.all([
        supabase.from('profiles').select('phone').eq('id', userId).maybeSingle(),
        supabase.from('addresses').select('id').eq('user_id', userId).limit(1),
      ]);

      const hasPhone = Boolean(profileRes.data?.phone && profileRes.data.phone.trim().length > 0);
      const hasAddress = Boolean(addressesRes.data && addressesRes.data.length > 0);

      return hasPhone && hasAddress;
    } catch (err) {
      console.error('Error verifying profile completeness:', err);
      return false;
    }
  };

  const evaluateSession = async (session) => {
    if (session?.user) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      const complete = await checkProfileCompleteness(session.user.id);
      setIsProfileComplete(complete);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
      setIsProfileComplete(null);
    }
    setIsAuthReady(true);
    window.dispatchEvent(new CustomEvent('auth-change'));
  };

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      evaluateSession(session);
    });

    // Subscribe to auth state changes (login, logout, OAuth redirect)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      evaluateSession(session);
    });

    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    window.addEventListener('storage', checkLogin);
    window.addEventListener('auth-change', checkLogin);

    return () => {
      subscription?.unsubscribe();
      window.removeEventListener('storage', checkLogin);
      window.removeEventListener('auth-change', checkLogin);
    };
  }, []);

  const handleProfileCompleted = async () => {
    setIsProfileComplete(true);
    const redirectTarget = sessionStorage.getItem('postLoginRedirect');
    if (redirectTarget) {
      sessionStorage.removeItem('postLoginRedirect');
      handleNavigate(redirectTarget);
    } else if (currentPage === 'login' || currentPage === 'home') {
      handleNavigate('shop');
    } else {
      handleNavigate(currentPage);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setIsProfileComplete(null);
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

  useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromPath();
      setCurrentPage(page);
      setSelectedCategory(getCategoryFromPath());
      if (page !== 'home') {
        setShowSplash(false);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const PAGE_TITLES = {
    home: "Ghadsiram's | Fine Signature Jewellery",
    shop: "Shop | Ghadsiram's",
    cart: "Cart | Ghadsiram's",
    appointment: "Book Appointment | Ghadsiram's",
    privacy: "Privacy Policy | Ghadsiram's",
    terms: "Terms of Service | Ghadsiram's",
    cookies: "Cookie Policy | Ghadsiram's",
    contact: "Contact Us | Ghadsiram's",
    'care-guide': "Care Guide | Ghadsiram's",
    'size-guide': "Size Guide | Ghadsiram's",
    login: "Sign In | Ghadsiram's",
    about: "About Us | Ghadsiram's",
    profile: "My Profile | Ghadsiram's",
    admin: "Admin | Ghadsiram's",
    notFound: "Page Not Found | Ghadsiram's",
  };

  const handleNavigate = (page, category = 'All') => {
    if (page === currentPage && category === selectedCategory) return;

    triggerPageLoader(1000, () => {
      let path = '/';
      if (page === 'shop') path = '/shop';
      else if (page === 'category') {
        const slug = category.toLowerCase().replace(/\s+/g, '-');
        path = `/category/${slug}`;
      }
      else if (page === 'product') path = `/product/${category}`;
      else if (page === 'cart') path = '/cart';
      else if (page === 'appointment') path = '/appointment';
      else if (page === 'privacy') path = '/privacy';
      else if (page === 'terms') path = '/terms';
      else if (page === 'cookies') path = '/cookie-policy';
      else if (page === 'contact') path = '/contact';
      else if (page === 'care-guide') path = '/care-guide';
      else if (page === 'size-guide') path = '/size-guide';
      else if (page === 'login') path = '/login';
      else if (page === 'about') path = '/about';
      else if (page === 'profile') path = '/profile';
      else if (page === 'admin') path = '/sons';

      // Update browser tab title
      if (page === 'category') {
        document.title = `${category} | Ghadsiram's`;
      } else {
        document.title = PAGE_TITLES[page] || "Ghadsiram's | Fine Signature Jewellery";
      }

      window.history.pushState(null, '', path);
      if (page === 'category') {
        setCurrentPage('shop');
        setSelectedCategory(category);
      } else {
        setCurrentPage(page);
        if (page === 'shop') {
          setSelectedCategory(category);
        }
      }
      setShowSplash(false);
      window.scrollTo(0, 0);
    });
  };

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    
    // If not logged in, redirect to login first and remember target
    if (!isLoggedIn) {
      sessionStorage.setItem('postLoginRedirect', 'cart');
      handleNavigate('login');
      return;
    }

    if (currentPage !== 'cart') {
      handleNavigate('cart');
    }
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
        {/* Profile Completion Gate & Page Switcher */}
        {!isAuthReady ? (
          <div className="min-h-screen bg-[#0D0A08] flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
            <p className="font-cormorant italic text-sm text-[#D4AF37] tracking-wider">
              Entering the House of Ghadsiram...
            </p>
          </div>
        ) : isLoggedIn && !isProfileComplete && currentPage !== 'admin' ? (
          <CompleteProfilePage 
            onComplete={handleProfileCompleted}
            onLogout={handleLogout}
          />
        ) : currentPage === 'cart' ? (
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
