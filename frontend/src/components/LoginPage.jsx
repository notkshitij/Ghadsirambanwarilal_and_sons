import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LoginPage({ onBackToShop, onNavigate, onCartClick }) {
  const [success, setSuccess] = useState(false);

  const handleGoogleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    window.dispatchEvent(new CustomEvent('auth-change'));
    setSuccess(true);

    const redirectTarget = sessionStorage.getItem('postLoginRedirect');
    sessionStorage.removeItem('postLoginRedirect');

    setTimeout(() => {
      if (redirectTarget) {
        if (onNavigate) {
          onNavigate(redirectTarget);
        } else {
          window.history.pushState(null, '', `/${redirectTarget}`);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      } else {
        onBackToShop();
      }
    }, 1500);
  };

  const handleBrandClick = () => {
    if (onNavigate) {
      onNavigate('shop');
    } else {
      onBackToShop();
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between text-[#150305]">
      <Navbar 
        onCartClick={onCartClick} 
        onBookClick={() => {
          if (onNavigate) onNavigate('appointment');
        }} 
        onShopClick={handleBrandClick} 
        onBrandClick={handleBrandClick} 
        alwaysShowBg={true} 
      />

      {/* Login Main Content Area */}
      <main className="flex-1 flex items-center justify-center pt-36 pb-24 px-4 relative overflow-hidden">
        {/* Decorative corner graphics */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 md:w-72 h-auto opacity-[0.03] pointer-events-none select-none z-0">
          <svg viewBox="0 0 200 400" className="w-full h-full fill-[#c89b3c]">
            <path d="M 0 400 C 50 350, 80 280, 40 220 C 10 160, 90 120, 120 200 C 150 280, 100 320, 0 400 M 0 250 C 30 200, 60 150, 40 100 C 20 50, 70 30, 90 80 C 110 130, 80 170, 0 250" />
          </svg>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 md:w-72 h-auto opacity-[0.03] pointer-events-none select-none z-0 scale-x-[-1]">
          <svg viewBox="0 0 200 400" className="w-full h-full fill-[#c89b3c]">
            <path d="M 0 400 C 50 350, 80 280, 40 220 C 10 160, 90 120, 120 200 C 150 280, 100 320, 0 400 M 0 250 C 30 200, 60 150, 40 100 C 20 50, 70 30, 90 80 C 110 130, 80 170, 0 250" />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-[460px] flex flex-col items-center px-6 py-4">
          
          {/* Lotus / Logo Icon */}
          <div className="mb-6">
            <img
              src="/flowers.png"
              alt="Ghadsiram Logo"
              className="w-12 h-12 object-contain"
              style={{ filter: 'invert(75%) sepia(85%) saturate(600%) hue-rotate(3deg) brightness(90%) contrast(90%)' }}
            />
          </div>

          <h1 className="font-display font-light text-3xl md:text-4xl text-[#150305] tracking-[0.08em] text-center mb-2.5 uppercase">
            Enter the World
          </h1>
          <h2 className="font-sans text-[0.8rem] font-light tracking-[0.28em] text-[#A67C1E] uppercase text-center mb-10">
            Of Ghadsiram Banwarilal &amp; Sons
          </h2>

          <div className="w-full flex flex-col gap-8 items-center">
            
            {success && (
              <div className="w-full bg-emerald-50 border-l-2 border-emerald-500 text-emerald-700 text-xs px-4 py-3 font-sans text-center">
                Success! Accessing your collection...
              </div>
            )}

            {/* Premium Gold Loop Divider above the button */}
            <div className="flex justify-center w-full opacity-65">
              <svg viewBox="0 0 100 20" className="w-14 h-4 fill-none stroke-[#c89b3c]" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 25 10 C 35 5, 42 15, 50 10 C 58 5, 65 15, 75 10 M 35 10 Q 50 15, 65 10" />
              </svg>
            </div>

            {/* Premium Minimalist Google Sign-In Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-4 bg-[#150305] hover:bg-[#3D0C11] text-[#FAF4EE] hover:text-white font-sans text-[0.82rem] font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_6px_20px_rgba(21,3,5,0.12)] hover:shadow-[0_8px_25px_rgba(21,3,5,0.22)] flex items-center justify-center gap-4 focus:outline-none active:scale-[0.98] cursor-pointer"
            >
              {/* Luxury Styled SVG Google Icon with a light theme */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#ffffff"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#ffffff"
                  fillOpacity="0.85"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#ffffff"
                  fillOpacity="0.85"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#ffffff"
                  fillOpacity="0.9"
                />
              </svg>
              Continue with Google
            </button>

            <p className="font-cormorant italic text-[0.95rem] text-neutral-400 text-center max-w-[320px] m-0">
              By signing in, you agree to our{' '}
              <button
                type="button"
                onClick={() => { if (onNavigate) onNavigate('terms'); }}
                className="text-neutral-700 underline bg-transparent border-none cursor-pointer p-0 font-cormorant italic text-[0.95rem] outline-none"
              >
                Terms of Service
              </button>{' '}
              &amp;{' '}
              <button
                type="button"
                onClick={() => { if (onNavigate) onNavigate('privacy'); }}
                className="text-neutral-700 underline bg-transparent border-none cursor-pointer p-0 font-cormorant italic text-[0.95rem] outline-none"
              >
                Privacy Policy
              </button>
              .
            </p>
          </div>
        </div>
      </main>

      {/* Styled Footer */}
      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
