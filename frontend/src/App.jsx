import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import LandingPage from './components/LandingPage';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

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

  const handleSplashComplete = () => {
    setIsFadingOut(true);
    // Unmount splash screen after the slow zoom-in transition completes (1500ms)
    setTimeout(() => {
      setShowSplash(false);
      localStorage.setItem('visited_ghadsiram', 'true');
    }, 1500);
  };

  return (
    <div className="w-full h-full min-h-screen relative">
      {/* Base Landing Page is always loaded underneath */}
      <LandingPage />

      {/* Overlay Splash Screen */}
      {showSplash && (
        <div className={`fixed inset-0 w-full h-screen z-[9999] transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <SplashScreen isFadingOut={isFadingOut} onComplete={handleSplashComplete} />
        </div>
      )}
    </div>
  );
}
