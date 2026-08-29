import React, { useEffect, useState } from 'react';

export default function PageLoader({ isVisible }) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let removeTimer;

    if (isVisible) {
      setShouldRender(true);
      setIsFadingOut(false);
    } else {
      setIsFadingOut(true);
      removeTimer = setTimeout(() => {
        setShouldRender(false);
        setIsFadingOut(false);
      }, 350);
    }

    return () => {
      if (removeTimer) clearTimeout(removeTimer);
    };
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0D0A08] transition-opacity duration-350 ease-out select-none pointer-events-auto ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden={!isVisible}
    >
      {/* Subtle radial background glow */}
      <div className="absolute w-72 h-72 rounded-full bg-[#C9AA6B]/10 blur-3xl pointer-events-none" />

      {/* Main Logo Container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Subtle breathing ambient halo */}
        <div className="absolute -inset-4 rounded-full bg-[#C9AA6B]/15 blur-lg animate-pulse" />

        {/* Small Flow Logo */}
        <div className="relative z-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center animate-flow-pulse">
          <img
            src="/flow.png"
            alt="Ghadsiram emblem"
            className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(201,170,107,0.55)]"
            draggable="false"
          />
        </div>

        {/* Brand Text */}
        <div className="mt-4 flex flex-col items-center">
          <span className="font-sans text-[0.62rem] md:text-[0.68rem] font-medium tracking-[0.32em] text-[#C9AA6B] uppercase opacity-90">
            GHADSIRAM
          </span>
          
          {/* Elegant Loading Shimmer Bar */}
          <div className="w-16 h-[1.5px] bg-[#2E231A] rounded-full overflow-hidden mt-2.5 relative">
            <div className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-[#C9AA6B] to-transparent animate-shimmer-slide rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
