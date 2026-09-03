import React, { useState, useEffect, useRef } from 'react';

export default function ScrollProgressLine({ segmentCount = 4 }) {
  const [currentProgress, setCurrentProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const reqIdRef = useRef(null);

  useEffect(() => {
    const computeTargetProgress = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = window.innerHeight || document.documentElement.clientHeight;
      const totalScroll = scrollHeight - clientHeight;

      if (totalScroll <= 0) {
        targetProgressRef.current = 0;
      } else {
        targetProgressRef.current = Math.min(Math.max(scrollY / totalScroll, 0), 1);
      }
    };

    // Smooth 60fps / 120fps GPU Lerp Loop
    const tick = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.12;
        setCurrentProgress(currentProgressRef.current);
      } else if (currentProgressRef.current !== targetProgressRef.current) {
        currentProgressRef.current = targetProgressRef.current;
        setCurrentProgress(targetProgressRef.current);
      }
      reqIdRef.current = requestAnimationFrame(tick);
    };

    computeTargetProgress();
    currentProgressRef.current = targetProgressRef.current;
    setCurrentProgress(targetProgressRef.current);

    reqIdRef.current = requestAnimationFrame(tick);

    window.addEventListener('scroll', computeTargetProgress, { passive: true });
    window.addEventListener('resize', computeTargetProgress, { passive: true });

    return () => {
      if (reqIdRef.current) {
        cancelAnimationFrame(reqIdRef.current);
      }
      window.removeEventListener('scroll', computeTargetProgress);
      window.removeEventListener('resize', computeTargetProgress);
    };
  }, []);

  return (
    <div 
      className="fixed bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[620px] z-40 pointer-events-none select-none flex items-center gap-2 md:gap-3"
      aria-hidden="true"
    >
      {Array.from({ length: segmentCount }).map((_, idx) => {
        const segStart = idx / segmentCount;
        const segEnd = (idx + 1) / segmentCount;
        
        let fill = 0;
        if (currentProgress >= segEnd) {
          fill = 1;
        } else if (currentProgress > segStart) {
          fill = (currentProgress - segStart) / (segEnd - segStart);
        }

        const isCurrentActive = currentProgress > segStart && currentProgress < segEnd;

        return (
          <div 
            key={idx} 
            className="flex-1 h-[2px] md:h-[2.5px] bg-[#1C1611]/90 rounded-full overflow-hidden relative border border-[#C9AA6B]/15 backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            {/* GPU Accelerated Smooth ScaleX Fill */}
            <div 
              className={`h-full w-full bg-gradient-to-r from-[#C9AA6B] via-[#EADBBA] to-[#C9AA6B] rounded-full origin-left will-change-transform ${
                isCurrentActive ? 'shadow-[0_0_10px_rgba(201,170,107,0.8)]' : ''
              }`}
              style={{ 
                transform: `scaleX(${fill})`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
