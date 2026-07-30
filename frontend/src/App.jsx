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
    // Unmount splash screen after the blur fade-out animation completes (800ms)
    setTimeout(() => {
      setShowSplash(false);
      localStorage.setItem('visited_ghadsiram', 'true');
    }, 800);
  };

  return (
    <div className="w-full h-full min-h-screen">
      <SplashScreen />
    </div>
  );
}
