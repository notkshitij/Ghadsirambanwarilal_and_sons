import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import heroBg from '../assets/background.png';
import Footer from './Footer';

function ScrollReveal({ children, className = "", id }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05,
        rootMargin: "-10% 0px -25% 0px"
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.25,1,0.5,1)] transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16 pointer-events-none'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function LandingPage({ onOpenCart, onBookClick, onNavigate }) {
  return (
    <div className="relative w-full min-h-screen bg-white text-mahogany-dark font-sans flex flex-col justify-between overflow-x-hidden">
      
      {/* Top Hero Container (Background image + dark overlay) - full screen height */}
      <div
        className="relative w-full min-h-screen flex flex-col justify-between text-cream-light pb-12 overflow-hidden bg-[#150305]"
      >
        {/* Adjusted Background Image position to cover full height/width without cutting head */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-[85%_12%] bg-cover"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        {/* Dark vignette overlay for contrast - lighter to make background image clearly visible */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(21,3,5,0.1)_0%,rgba(21,3,5,0.4)_70%,rgba(21,3,5,0.65)_100%)] pointer-events-none z-1" />

        {/* Elegant Header / Navigation */}
        <Navbar 
          onCartClick={onOpenCart} 
          onBookClick={onBookClick} 
          onBrandClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          onShopClick={() => onNavigate('shop')}
        />

        {/* Hero Area - centered vertically, shifted to the left on desktop (1.5% margin) */}
        <div className="relative z-10 flex-1 flex flex-col items-center md:items-start justify-center px-[4%] md:pl-[4%] md:pr-[8%] text-center md:text-left max-w-[650px] mx-auto md:ml-[1.5%] md:mr-auto py-12">
          <section className="text-center md:text-left">
            {/* Top Ornamental Gold Filigree Divider */}
            <div className="w-full flex justify-center md:justify-start mb-8">
              <div className="hero-top-divider-container animate-line-expand">
                <div className="hero-top-line-left" />
                <div className="hero-top-icon">
                  <svg viewBox="0 0 100 30" className="w-full h-full fill-none stroke-[#c89b3c]" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    {/* Central loop and arrow */}
                    <path d="M 50 7 L 53 13 L 50 15 L 47 13 Z" fill="#c89b3c" />
                    <path d="M 50 15 C 47 20, 45 25, 50 25 C 55 25, 53 20, 50 15 Z" />
                    
                    {/* Left wing swirl */}
                    <path d="M 47 15 C 40 10, 32 8, 24 15 C 16 22, 8 16, 0 15 C 8 16, 16 17, 21 15 C 28 11, 36 15, 44 20" />
                    {/* Right wing swirl */}
                    <path d="M 53 15 C 60 10, 68 8, 76 15 C 84 22, 92 16, 100 15 C 92 16, 84 17, 79 15 C 72 11, 64 15, 56 20" />
                    
                    {/* Dots */}
                    <circle cx="34" cy="20" r="1.2" fill="#c89b3c" />
                    <circle cx="66" cy="20" r="1.2" fill="#c89b3c" />
                  </svg>
                </div>
                <div className="hero-top-line-right" />
              </div>
            </div>

            <h1 className="font-cormorant font-normal text-3xl md:text-5xl tracking-[0.05em] uppercase leading-[1.2] m-0 mb-4">
              <span className="block whitespace-nowrap mb-1">
                {Array.from("Shine with every").map((char, idx) => (
                  <span
                    key={idx}
                    className={`inline-block ${char === ' ' ? '' : 'opacity-0 animate-hero-word-in gold-glow-text'}`}
                    style={{ animationDelay: `${0.8 + idx * 0.03}s` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
              <span className="block whitespace-nowrap">
                {Array.from("precious moment").map((char, idx) => (
                  <span
                    key={idx}
                    className={`inline-block ${char === ' ' ? '' : 'opacity-0 animate-hero-word-in gold-glow-text'}`}
                    style={{ animationDelay: `${0.8 + (idx + 16) * 0.03}s` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            </h1>
            <p className="text-[0.8rem] md:text-[0.95rem] leading-[1.8] text-cream-dark mb-6 opacity-0 animate-hero-fade-in-up-3">
              Discover beautiful jewelry made with care to add a touch of elegance
              <br className="hidden md:inline" /> to your everyday life and life's most precious moments.
            </p>



            {/* Luxury Gold Flourish Divider */}
            <div className="w-full flex justify-center md:justify-start my-5 opacity-0 animate-hero-fade-in-up-3">
              <div className="luxury-divider">
                <div className="luxury-divider-line-left" />
                <div className="luxury-divider-icon">
                  <svg viewBox="0 0 100 30" className="w-full h-full fill-none stroke-[#c89b3c]" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    {/* Central loop and arrow */}
                    <path d="M 50 7 L 53 13 L 50 15 L 47 13 Z" fill="#c89b3c" />
                    <path d="M 50 15 C 47 20, 45 25, 50 25 C 55 25, 53 20, 50 15 Z" />
                    
                    {/* Left wing swirl */}
                    <path d="M 47 15 C 40 10, 32 8, 24 15 C 16 22, 8 16, 0 15 C 8 16, 16 17, 21 15 C 28 11, 36 15, 44 20" />
                    {/* Right wing swirl */}
                    <path d="M 53 15 C 60 10, 68 8, 76 15 C 84 22, 92 16, 100 15 C 92 16, 84 17, 79 15 C 72 11, 64 15, 56 20" />
                    
                    {/* Dots */}
                    <circle cx="34" cy="20" r="1.2" fill="#c89b3c" />
                    <circle cx="66" cy="20" r="1.2" fill="#c89b3c" />
                  </svg>
                </div>
                <div className="luxury-divider-line-right" />
              </div>
            </div>

            <div className="flex justify-center md:justify-start opacity-0 animate-hero-fade-in-up-4 items-center w-full">
              <a 
                href="/shop" 
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('shop');
                }}
                className="shop-now-btn group"
              >
                Shop Now
                <span className="inline-block ml-2.5 transform transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[1.3rem]">
                  &rarr;
                </span>
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Main Content Area (White background) */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center py-20 px-[4%] w-full box-border bg-white text-mahogany-dark">
        {/* Categories / Showcase section */}
        <ScrollReveal>
          <section className="w-full max-w-[1200px] mb-20 scroll-mt-24" id="shop">
            <div className="flex items-center justify-center gap-5 mb-12">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#c6a076]/40 to-transparent"></div>
              <h4 className="font-display text-[1rem] md:text-[1.35rem] font-medium tracking-[0.28em] uppercase text-gold-dark m-0">Featured Pieces</h4>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#c6a076]/40 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[2.2rem] w-full">
              {products.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} onNavigate={onNavigate} />)}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="w-full max-w-[1200px] mb-12 scroll-mt-24" id="collections">
            <div className="flex items-center justify-center gap-5 mb-12">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#c6a076]/40 to-transparent"></div>
              <h4 className="font-display text-[1rem] md:text-[1.35rem] font-medium tracking-[0.28em] uppercase text-gold-dark m-0">Our Promise</h4>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#c6a076]/40 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2.2rem] w-full">
              {/* Card 1: Certified Jewellery */}
              <div className="relative bg-[#fcfbfa] hover:bg-white border border-[#c6a076]/25 rounded-sm py-12 px-8 text-center overflow-hidden hover:translate-y-[-8px] hover:border-gold-primary/70 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06),0_0_15px_rgba(212,175,55,0.1)] transition-all duration-500 box-border group">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/5 to-transparent pointer-events-none transition-opacity duration-500" />
                <div className="relative z-2 flex flex-col items-center">
                  <div className="mb-4 text-gold-dark transition-transform duration-500 group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-current fill-none stroke-[1.2]" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                  <h5 className="font-display text-[1.15rem] font-medium tracking-[0.1em] text-mahogany-dark m-0 mb-2 group-hover:text-gold-dark transition-colors duration-400">Certified Jewellery</h5>
                  <p className="text-[0.85rem] leading-[1.6] text-neutral-500 font-light m-0">
                    Authenticity you can trust
                  </p>
                </div>
              </div>

              {/* Card 2: Free Insured Shipping */}
              <div className="relative bg-[#fcfbfa] hover:bg-white border border-[#c6a076]/25 rounded-sm py-12 px-8 text-center overflow-hidden hover:translate-y-[-8px] hover:border-gold-primary/70 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06),0_0_15px_rgba(212,175,55,0.1)] transition-all duration-500 box-border group">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/5 to-transparent pointer-events-none transition-opacity duration-500" />
                <div className="relative z-2 flex flex-col items-center">
                  <div className="mb-4 text-gold-dark transition-transform duration-500 group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-current fill-none stroke-[1.2]" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16.5 8.5v6.5a1 1 0 0 1-.5.87l-5.5 3.18a1 1 0 0 1-1 0L4 15.87A1 1 0 0 1 3.5 15V8.5a1 1 0 0 1 .5-.87l5.5-3.18a1 1 0 0 1 1 0l5.5 3.18a1 1 0 0 1 .5.87z" />
                      <path d="M3.8 7.9L10 11.5l6.2-3.6" />
                      <path d="M10 11.5v7.2" />
                      <path d="M15 15.5c0-1.5 3-2.5 3-2.5s3 1 3 2.5c0 2.5-3 4.5-3 4.5s-3-2-3-4.5z" />
                      <path d="M16.8 15.3l.8.8 1.6-1.6" />
                    </svg>
                  </div>
                  <h5 className="font-display text-[1.15rem] font-medium tracking-[0.1em] text-mahogany-dark m-0 mb-2 group-hover:text-gold-dark transition-colors duration-400">Free Insured Shipping</h5>
                  <p className="text-[0.85rem] leading-[1.6] text-neutral-500 font-light m-0">
                    Secure delivery, no extra cost
                  </p>
                </div>
              </div>

              {/* Card 3: Worldwide Shipping */}
              <div className="relative bg-[#fcfbfa] hover:bg-white border border-[#c6a076]/25 rounded-sm py-12 px-8 text-center overflow-hidden hover:translate-y-[-8px] hover:border-gold-primary/70 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06),0_0_15px_rgba(212,175,55,0.1)] transition-all duration-500 box-border group">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/5 to-transparent pointer-events-none transition-opacity duration-500" />
                <div className="relative z-2 flex flex-col items-center">
                  <div className="mb-4 text-gold-dark transition-transform duration-500 group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-current fill-none stroke-[1.2]" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      <path d="M16 8l4 4-4 4" />
                    </svg>
                  </div>
                  <h5 className="font-display text-[1.15rem] font-medium tracking-[0.1em] text-mahogany-dark m-0 mb-2 group-hover:text-gold-dark transition-colors duration-400">Worldwide Shipping</h5>
                  <p className="text-[0.85rem] leading-[1.6] text-neutral-500 font-light m-0">
                    Jewels delivered globally
                  </p>
                </div>
              </div>

              {/* Card 4: 100000+ Units Sold */}
              <div className="relative bg-[#fcfbfa] hover:bg-white border border-[#c6a076]/25 rounded-sm py-12 px-8 text-center overflow-hidden hover:translate-y-[-8px] hover:border-gold-primary/70 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06),0_0_15px_rgba(212,175,55,0.1)] transition-all duration-500 box-border group">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/5 to-transparent pointer-events-none transition-opacity duration-500" />
                <div className="relative z-2 flex flex-col items-center">
                  <div className="mb-4 text-gold-dark transition-transform duration-500 group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-current fill-none stroke-[1.2]" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 8h8v7H8z" />
                      <path d="M7 6h10v2H7z" />
                      <path d="M12 6v9" />
                      <path d="M9 4.5a1.5 1.5 0 0 1 3 0 1.5 1.5 0 0 1 3 0" />
                      <path d="M3 20h12a2 2 0 0 0 2-1.5l1.5-5.5" />
                      <path d="M7 16h6" />
                    </svg>
                  </div>
                  <h5 className="font-display text-[1.15rem] font-medium tracking-[0.1em] text-mahogany-dark m-0 mb-2 group-hover:text-gold-dark transition-colors duration-400">100000+ Units Sold</h5>
                  <p className="text-[0.85rem] leading-[1.6] text-neutral-500 font-light m-0">
                    Trusted by thousands
                  </p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>

      {/* New styled Footer */}
      <Footer onBrandClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} onNavigate={onNavigate} noBorder={true} />
    </div>
  );
}
