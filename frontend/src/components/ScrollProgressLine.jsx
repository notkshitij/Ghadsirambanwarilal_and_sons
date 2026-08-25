import React, { useState, useEffect } from 'react';

export default function ScrollProgressLine({ segmentCount = 4 }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        setScrollProgress(0);
      } else {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;
        const progress = Math.min(Math.max(currentScroll / totalScroll, 0), 1);
        setScrollProgress(progress);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div 
      className="fixed bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[650px] z-40 pointer-events-none select-none flex items-center gap-2.5 md:gap-3.5"
      aria-hidden="true"
    >
      {Array.from({ length: segmentCount }).map((_, idx) => {
        const segStart = idx / segmentCount;
        const segEnd = (idx + 1) / segmentCount;
        
        let fill = 0;
        if (scrollProgress >= segEnd) {
          fill = 1;
        } else if (scrollProgress > segStart) {
          fill = (scrollProgress - segStart) / (segEnd - segStart);
        }

        return (
          <div 
            key={idx} 
            className="flex-1 h-[2px] md:h-[2.5px] bg-[#221C17]/90 rounded-full overflow-hidden relative shadow-[0_2px_6px_rgba(0,0,0,0.8)] border border-[#C9AA6B]/15"
          >
            <div 
              className="h-full bg-gradient-to-r from-[#C9AA6B] via-[#E5C989] to-[#C9AA6B] rounded-full transition-[width] duration-500 ease-out shadow-[0_0_8px_rgba(201,170,107,0.7)]"
              style={{ width: `${fill * 100}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}
