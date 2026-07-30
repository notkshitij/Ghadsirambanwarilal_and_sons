import React, { useEffect } from 'react';

export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 5200); // Trigger transition after animations finish
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden flex flex-col justify-center items-center bg-[url('/splashbg.png')] bg-center bg-cover bg-no-repeat font-display text-gold-light select-none">
      {/* Base leather texture overlay */}
      <div className="absolute inset-0 opacity-[0.22] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg_viewBox=\'0_0_200_200\'_xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter_id=\'noiseFilter\'%3E%3CfeTurbulence_type=\'fractalNoise\'_baseFrequency=\'0.85\'_numOctaves=\'4\'_stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect_width=\'100%25\'_height=\'100%25\'_filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')] pointer-events-none z-[1]" />
      
      {/* Background shadow overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(8,2,1,0.35)] via-[rgba(8,2,1,0.05)] to-[rgba(15,5,3,0.4)] pointer-events-none z-[2]" />

      {/* Realistic blurred leaf branch shadow overlay */}
      <svg className="absolute top-[-12%] left-[-12%] w-[85vw] h-[85vw] max-w-[760px] max-h-[760px] opacity-42 blur-[22px] pointer-events-none z-[2] rotate-[-15deg]" viewBox="0 0 500 500" fill="black">
        <path d="M -50,-50 C 50,50 150,120 220,180 C 250,210 290,260 320,310" stroke="black" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M 60,60 C 20,70 -10,95 -20,120 C -25,145 0,165 30,150 C 60,135 75,100 80,75 Z" />
        <path d="M 60,60 C 80,30 110,10 135,15 C 160,20 165,50 145,75 C 125,100 90,105 75,90 Z" />
        <path d="M 120,120 C 80,140 50,170 45,195 C 40,220 70,235 95,215 C 120,195 135,160 140,135 Z" />
        <path d="M 120,120 C 140,90 175,70 200,75 C 225,80 230,110 205,135 C 180,160 150,165 135,150 Z" />
        <path d="M 180,180 C 140,200 110,230 105,255 C 100,280 130,295 155,275 C 180,255 195,220 200,195 Z" />
        <path d="M 180,180 C 200,150 235,130 260,135 C 285,140 290,170 265,195 C 240,220 210,225 195,210 Z" />
        <path d="M 240,240 C 200,260 170,290 165,315 C 160,340 190,355 215,335 C 240,315 255,280 260,255 Z" />
        <path d="M 240,240 C 260,210 295,190 320,195 C 345,200 350,230 325,255 C 300,280 270,285 255,270 Z" />
      </svg>

      {/* Main Branding Section */}
      <div className="group flex flex-col items-center justify-center z-10 text-center p-8 max-w-[90%] max-[480px]:p-4 -translate-y-12 drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
        
        {/* Logo Container with drawing circle */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <img
            src="/flowers.png"
            alt="Ghadsiram flowers mark"
            className="w-[clamp(115px,15vw,190px)] h-auto object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.55)] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 animate-logo-fade-in z-2 group-hover:scale-[1.03] group-hover:-translate-y-0.5"
            draggable="false"
          />
          <svg className="absolute w-[145%] h-[145%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 pointer-events-none z-1" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="goldCircleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff6ea" />
                <stop offset="35%" stopColor="#e0bf93" />
                <stop offset="55%" stopColor="#c6a076" />
                <stop offset="100%" stopColor="#9a7550" />
              </linearGradient>
              <mask id="circleMask">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="600"
                  strokeDashoffset="600"
                  className="animate-draw-circle-mask"
                />
              </mask>
            </defs>
            {/* Dashed circle styled with mask */}
            <circle
              cx="100"
              cy="100"
              r="90"
              className="fill-none stroke-[url(#goldCircleGradient)] stroke-[1.8] stroke-linecap-round opacity-85 animate-circle-glow"
              mask="url(#circleMask)"
              strokeDasharray="120 20"
            />
            {/* Elegant 4-point sparkle star at the top (center: 100, 10) */}
            <path
              d="M 100,0 Q 100,10 110,10 Q 100,10 100,20 Q 100,10 90,10 Q 100,10 100,0"
              className="fill-[url(#goldCircleGradient)] origin-[100px_10px] scale-0 opacity-0 animate-star-reveal"
            />
          </svg>
        </div>

        {/* Brand Name */}
        <h1 className="text-[clamp(2rem,3.6vw,3.4rem)] font-medium tracking-[0.32em] m-0 pl-[0.32em] uppercase font-display opacity-0 animate-brand-reveal bg-gradient-to-b from-[#fff6ea] via-[#c6a076] to-[#4a301d] bg-clip-text text-transparent">
          GHADSIRAM
        </h1>

        {/* Tagline Separator & Text */}
        <div className="flex items-center justify-center w-full max-w-[650px] mt-1.5 mb-4 opacity-0 animate-tagline-reveal">
          <div className="flex items-center flex-1 gap-1.5">
            <span className="text-[#c6a076] text-[0.45rem] opacity-85 leading-none">◄</span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#c6a076]/15 to-[#c6a076]/85"></div>
          </div>
          <span className="font-display text-[clamp(0.75rem,1.25vw,1.05rem)] font-semibold tracking-[0.38em] max-[480px]:tracking-[0.25em] uppercase text-[#c6a076] px-4 max-[480px]:px-2.5 whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            Banwarilal &amp; Sons
          </span>
          <div className="flex items-center flex-1 gap-1.5">
            <div className="flex-1 h-[1px] bg-gradient-to-l from-[#c6a076]/15 to-[#c6a076]/85"></div>
            <span className="text-[#c6a076] text-[0.45rem] opacity-85 leading-none">►</span>
          </div>
        </div>

        {/* Bottom Decorative Separator */}
        <div className="flex items-center w-[clamp(160px,22vw,320px)] mt-2.5 opacity-0 animate-separator-reveal">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#c6a076]/5 to-[#c6a076]/85"></div>
          <div className="flex items-center gap-1 px-1 flex-shrink-0">
            <div className="w-1 h-1 rounded-full bg-[#c6a076] opacity-75"></div>
            <div className="w-2 h-2 bg-[#c6a076] rotate-45 opacity-95"></div>
            <div className="w-1 h-1 rounded-full bg-[#c6a076] opacity-75"></div>
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-[#c6a076]/5 to-[#c6a076]/85"></div>
        </div>
      </div>
    </div>
  );
}
