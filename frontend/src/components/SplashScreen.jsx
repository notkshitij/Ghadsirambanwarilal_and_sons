import React, { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start background fadeout slightly before full zoom completes
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1800);

    // Complete splash and trigger landing page reveal
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#0D0A08] transition-opacity duration-600 ease-out select-none pointer-events-none ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Ambient gold glow */}
      <div
        className={`absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full bg-[#C9AA6B]/12 blur-3xl transition-all duration-1000 ${
          isFadingOut ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
        }`}
      />

      {/* Rotating and Zooming Flow Logo + Text */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer zoom-in container */}
        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center animate-wheel-container">
          {/* Inner smooth wheel spin */}
          <div className="w-full h-full flex items-center justify-center animate-wheel-spin">
            <img
              src="/flow.png"
              alt="Ghadsiram emblem"
              className="w-full h-full object-contain filter drop-shadow-[0_0_18px_rgba(201,170,107,0.75)]"
              draggable="false"
            />
          </div>
        </div>

        {/* Brand Text */}
        <div className="mt-8 flex flex-col items-center text-center animate-splash-text">
          <h1 className="font-display text-2xl md:text-3xl font-medium tracking-[0.35em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#FFF6EA] via-[#C9AA6B] to-[#8C6B37] m-0 pl-[0.35em]">
            GHADSIRAM
          </h1>
          <p className="font-sans text-[0.65rem] md:text-[0.72rem] font-semibold tracking-[0.4em] uppercase text-[#C9AA6B]/80 mt-2 pl-[0.4em]">
            Banwarilal &amp; Sons
          </p>
        </div>
      </div>
    </div>
  );
}
