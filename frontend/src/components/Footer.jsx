import React from 'react';

export default function Footer({ onBrandClick, noBorder, style, onNavigate }) {
  const handleBrandClick = () => {
    if (onBrandClick) {
      onBrandClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLinkClick = (e, href) => {
    if (href.startsWith('/')) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate(href.substring(1)); // e.g. '/privacy' -> 'privacy'
      } else {
        window.history.pushState(null, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  };

  const menuLinks = [
    { label: 'Shop', href: '#shop' },
    { label: 'Minimalist Elegance', href: '#collections' },
    { label: 'Bridal Bliss', href: '#collections' },
    { label: 'Timeless Classics', href: '#collections' },
  ];

  const usefulLinks = [
    { label: 'Contact', href: '/appointment' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms and Conditions', href: '/terms' },
    { label: 'Delivery and Return', href: '#shipping' },
  ];

  return (
    <footer 
      className={`relative w-full min-h-screen bg-white text-neutral-800 px-4 md:px-8 pt-12 pb-4 box-border flex flex-col justify-between overflow-hidden ${noBorder ? '' : 'border-t border-neutral-100'}`}
      style={style}
    >
      
      {/* Decorative Faded Damask Floral Graphics in Corners */}
      <div className="absolute left-0 bottom-0 w-52 md:w-80 h-auto opacity-[0.04] pointer-events-none select-none z-0">
        <svg viewBox="0 0 200 400" className="w-full h-full fill-[#c89b3c]">
          <path d="M 0 400 C 50 350, 80 280, 40 220 C 10 160, 90 120, 120 200 C 150 280, 100 320, 0 400 M 0 250 C 30 200, 60 150, 40 100 C 20 50, 70 30, 90 80 C 110 130, 80 170, 0 250" />
        </svg>
      </div>
      <div className="absolute right-0 bottom-0 w-52 md:w-80 h-auto opacity-[0.04] pointer-events-none select-none z-0">
        <svg viewBox="0 0 200 400" className="w-full h-full fill-[#c89b3c] scale-x-[-1]">
          <path d="M 0 400 C 50 350, 80 280, 40 220 C 10 160, 90 120, 120 200 C 150 280, 100 320, 0 400 M 0 250 C 30 200, 60 150, 40 100 C 20 50, 70 30, 90 80 C 110 130, 80 170, 0 250" />
        </svg>
      </div>

      <div className="relative z-10 w-full flex-1 flex flex-col justify-between items-center">
        
        {/* Top Header Section with Logo & Brand Details */}
        <div className="w-full flex flex-col items-center">
          {/* Top gold filigree line divider spanning full width */}
          <div className="w-full flex items-center justify-center relative mb-10 pt-6">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#c89b3c]/40 to-[#c89b3c]" />
            <div className="px-4 flex items-center justify-center">
              <svg viewBox="0 0 100 30" className="w-20 h-6 fill-none stroke-[#c89b3c]" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 50 7 L 53 13 L 50 15 L 47 13 Z" fill="#c89b3c" />
                <path d="M 50 15 C 47 20, 45 25, 50 25 C 55 25, 53 20, 50 15 Z" />
                <path d="M 47 15 C 40 10, 32 8, 24 15 C 16 22, 8 16, 0 15 C 8 16, 16 17, 21 15 C 28 11, 36 15, 44 20" />
                <path d="M 53 15 C 60 10, 68 8, 76 15 C 84 22, 92 16, 100 15 C 92 16, 84 17, 79 15 C 72 11, 64 15, 56 20" />
                <circle cx="34" cy="20" r="1.2" fill="#c89b3c" />
                <circle cx="66" cy="20" r="1.2" fill="#c89b3c" />
              </svg>
            </div>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#c89b3c]/40 to-[#c89b3c]" />
          </div>

          {/* Brand Icon (Center Top) */}
          <button
            type="button"
            onClick={handleBrandClick}
            className="bg-transparent border-none cursor-pointer p-0 mb-3 outline-none focus:outline-none flex flex-col items-center"
          >
            {/* Gold floral logo icon */}
            <div className="mb-3">
              <img
                src="/flowers.png"
                alt="Ghadsiram Icon"
                className="w-12 h-12 md:w-14 md:h-14 object-contain hover:rotate-[360deg] transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ filter: 'invert(75%) sepia(85%) saturate(600%) hue-rotate(3deg) brightness(90%) contrast(90%)' }}
              />
            </div>
            {/* Giant spaced brand name */}
            <h2 className="font-sans font-light text-2xl md:text-3xl tracking-[0.45em] text-neutral-800 m-0 mb-2 uppercase leading-none">
              G H A D S I R A M
            </h2>
          </button>

          {/* Subtitle with gold side lines */}
          <div className="flex items-center justify-center gap-5 mb-3 w-full max-w-[500px]">
            <div className="flex-1 h-[1px] bg-[#c89b3c]/45" />
            <h3 className="font-sans text-[0.72rem] md:text-[0.8rem] font-light tracking-[0.26em] text-[#c89b3c] uppercase m-0 whitespace-nowrap">
              Banwarilal &amp; Sons
            </h3>
            <div className="flex-1 h-[1px] bg-[#c89b3c]/45" />
          </div>

          {/* Tiny gold loops divider */}
          <div className="flex justify-center mb-3">
            <svg viewBox="0 0 100 20" className="w-12 h-3 fill-none stroke-[#c89b3c]" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 25 10 C 35 5, 42 15, 50 10 C 58 5, 65 15, 75 10 M 35 10 Q 50 15, 65 10" />
            </svg>
          </div>

          {/* Tagline */}
          <p className="font-cormorant italic font-light text-[1.1rem] md:text-[1.3rem] text-neutral-500 m-0 mb-6 text-center max-w-[600px] px-4 leading-relaxed">
            Jewelry is not worn. It is remembered.
          </p>
        </div>

        {/* Four columns links section (Centered vertically in the remaining space) */}
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 my-6">
          
          {/* CONTACT COLUMN */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col items-center md:items-start mb-4">
              <h4 className="font-sans text-[0.8rem] font-semibold tracking-[0.24em] text-neutral-700 uppercase m-0 mb-1">Contact</h4>
              <svg viewBox="0 0 100 10" className="w-10 h-2 fill-[#c89b3c]/70">
                <polygon points="50,1 54,5 50,9 46,5" />
                <line x1="0" y1="5" x2="42" y2="5" stroke="#c89b3c" strokeWidth="0.5" strokeOpacity="0.4" />
                <line x1="58" y1="5" x2="100" y2="5" stroke="#c89b3c" strokeWidth="0.5" strokeOpacity="0.4" />
              </svg>
            </div>
            
            <div className="flex flex-col gap-5 w-full">
              {/* Address */}
              <div className="flex items-start justify-center md:justify-start gap-3">
                <div className="w-7.5 h-7.5 rounded-full border border-[#c89b3c]/35 flex items-center justify-center shrink-0 text-[#c89b3c]">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.5]">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="font-sans text-[0.84rem] font-light leading-[1.5] text-neutral-600 mt-0.5">
                  306, Shree Shiv Nagar, Nayla Road, Jaisinghpura Khor, Jaipur - 302027
                </span>
              </div>
              
              {/* Email */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-7.5 h-7.5 rounded-full border border-[#c89b3c]/35 flex items-center justify-center shrink-0 text-[#c89b3c]">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.5]">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </div>
                <a 
                  href="mailto:ghadsirambanwarilalandsons@gmail.com" 
                  className="font-sans text-[0.86rem] font-light text-neutral-600 hover:text-gold-dark transition-colors duration-200 no-underline break-all"
                  style={{ wordBreak: 'break-all' }}
                >
                  ghadsirambanwarilalandsons@gmail.com
                </a>
              </div>
              
              {/* Phone */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-7.5 h-7.5 rounded-full border border-[#c89b3c]/35 flex items-center justify-center shrink-0 text-[#c89b3c]">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.5]">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <span className="font-sans text-[0.86rem] font-light text-neutral-600">
                  +91 9521466069
                </span>
              </div>
            </div>
          </div>

          {/* MENU COLUMN */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col items-center md:items-start mb-4">
              <h4 className="font-sans text-[0.8rem] font-semibold tracking-[0.24em] text-neutral-700 uppercase m-0 mb-1">Menu</h4>
              <svg viewBox="0 0 100 10" className="w-10 h-2 fill-[#c89b3c]/70">
                <polygon points="50,1 54,5 50,9 46,5" />
                <line x1="0" y1="5" x2="42" y2="5" stroke="#c89b3c" strokeWidth="0.5" strokeOpacity="0.4" />
                <line x1="58" y1="5" x2="100" y2="5" stroke="#c89b3c" strokeWidth="0.5" strokeOpacity="0.4" />
              </svg>
            </div>
            
            <ul className="list-none p-0 m-0 flex flex-col gap-3.5 w-full items-center md:items-start">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="font-sans text-[0.86rem] font-light text-neutral-600 hover:text-gold-dark transition-colors duration-200 no-underline flex items-center gap-2 group">
                    <span className="text-[#c89b3c] font-medium text-[0.68rem] transition-transform duration-200 group-hover:translate-x-1">&gt;</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* USEFUL COLUMN */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col items-center md:items-start mb-4">
              <h4 className="font-sans text-[0.8rem] font-semibold tracking-[0.24em] text-neutral-700 uppercase m-0 mb-1">Useful</h4>
              <svg viewBox="0 0 100 10" className="w-10 h-2 fill-[#c89b3c]/70">
                <polygon points="50,1 54,5 50,9 46,5" />
                <line x1="0" y1="5" x2="42" y2="5" stroke="#c89b3c" strokeWidth="0.5" strokeOpacity="0.4" />
                <line x1="58" y1="5" x2="100" y2="5" stroke="#c89b3c" strokeWidth="0.5" strokeOpacity="0.4" />
              </svg>
            </div>
            
             <ul className="list-none p-0 m-0 flex flex-col gap-3.5 w-full items-center md:items-start">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="font-sans text-[0.86rem] font-light text-neutral-600 hover:text-gold-dark transition-colors duration-200 no-underline flex items-center gap-2 group"
                  >
                    <span className="text-[#c89b3c] font-medium text-[0.68rem] transition-transform duration-200 group-hover:translate-x-1">&gt;</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* FOLLOW US COLUMN */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col items-center md:items-start mb-4">
              <h4 className="font-sans text-[0.8rem] font-semibold tracking-[0.24em] text-neutral-700 uppercase m-0 mb-1">Follow Us</h4>
              <svg viewBox="0 0 100 10" className="w-10 h-2 fill-[#c89b3c]/70">
                <polygon points="50,1 54,5 50,9 46,5" />
                <line x1="0" y1="5" x2="42" y2="5" stroke="#c89b3c" strokeWidth="0.5" strokeOpacity="0.4" />
                <line x1="58" y1="5" x2="100" y2="5" stroke="#c89b3c" strokeWidth="0.5" strokeOpacity="0.4" />
              </svg>
            </div>
            
            <div className="flex flex-col gap-3.5 w-full">
              {/* Instagram */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-7.5 h-7.5 rounded-full border border-[#c89b3c]/35 flex items-center justify-center shrink-0 text-[#c89b3c]">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.5]">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <a
                  href="https://www.instagram.com/ghadsirambanwarilal_and_sons?igsh=MWxqcjJkajl5amUxOA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[0.86rem] font-light text-neutral-600 hover:text-gold-dark transition-colors duration-200 no-underline"
                >
                  Instagram
                </a>
              </div>
              
              {/* Facebook */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-7.5 h-7.5 rounded-full border border-[#c89b3c]/35 flex items-center justify-center shrink-0 text-[#c89b3c]">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.5]">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </div>
                <a
                  href="https://www.facebook.com/share/1Fkzhfq39T/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[0.86rem] font-light text-neutral-600 hover:text-gold-dark transition-colors duration-200 no-underline"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & lotus block */}
        <div className="w-full flex flex-col items-center">
          {/* Footer Bottom copyright (Centered Lotus line) */}
          <div className="w-full flex items-center justify-center relative mb-4">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#c89b3c]/25 to-transparent" />
            <div className="px-4 text-[#c89b3c]/65 flex items-center justify-center">
              <svg viewBox="0 0 100 30" className="w-12 h-6 fill-none stroke-current" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 50 25 C 45 25, 40 20, 50 10 C 60 20, 55 25, 50 25 Z" fill="#c89b3c" fillOpacity="0.08" />
                <path d="M 50 25 C 47 25, 42 22, 42 16 C 42 16, 46 16, 50 18" />
                <path d="M 50 25 C 53 25, 58 22, 58 16 C 58 16, 54 16, 50 18" />
                <path d="M 38 22 C 34 22, 36 18, 44 16 M 62 22 C 66 22, 64 18, 56 16" />
                <circle cx="50" cy="27" r="1" fill="#c89b3c" />
                <circle cx="43" cy="26" r="0.8" fill="#c89b3c" />
                <circle cx="57" cy="26" r="0.8" fill="#c89b3c" />
              </svg>
            </div>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#c89b3c]/25 to-transparent" />
          </div>

          {/* Copyright Text Row */}
          <div className="text-center font-sans text-[0.72rem] font-light tracking-[0.16em] text-neutral-500 pb-3 flex flex-col sm:flex-row justify-center items-center gap-3 w-full">
            <span>&copy; 2026 Ghadsiram Banwarilal &amp; Sons</span>
            <span className="hidden sm:inline text-[#c89b3c]/50">&bull;</span>
            <span>Crafted with love in Jaipur</span>
            <span className="hidden sm:inline text-[#c89b3c]/50">&bull;</span>
            <span>All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
