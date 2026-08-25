import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import heroBg from '../assets/background.png';
import Footer from './Footer';
import ScrollProgressLine from './ScrollProgressLine';

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
    <div className="relative w-full min-h-screen bg-[#0D0A08] text-[#FAF4EE] font-sans flex flex-col justify-between overflow-x-hidden">
      
      {/* Top Hero Container (Background image + dark overlay) - full screen height */}
      <div
        className="relative w-full min-h-screen flex flex-col justify-between text-cream-light pb-12 overflow-hidden bg-[#0D0A08]"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-cover bg-[center_top] md:bg-[72%_30%]"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        {/* Mobile bottom gradient + Desktop left gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A08] via-[#0D0A08]/75 to-transparent md:bg-gradient-to-r md:from-[#0D0A08] md:via-[#0D0A08]/80 md:to-transparent pointer-events-none z-1" />
        
        {/* Subtle radial vignette for cinematic depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_30%,rgba(13,10,8,0.4)_70%,rgba(13,10,8,0.85)_100%)] pointer-events-none z-1" />

        {/* Header / Navigation */}
        <Navbar 
          onCartClick={onOpenCart} 
          onBookClick={onBookClick} 
          onBrandClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          onShopClick={() => onNavigate('shop')}
          onNavigate={onNavigate}
        />

        {/* Hero Area (Bottom-aligned on mobile, centered on desktop) */}
        <div className="relative z-10 flex-1 flex flex-col justify-end md:justify-center items-start text-left px-6 md:px-12 lg:px-16 pb-12 md:pb-16 pt-36 md:pt-16 max-w-[700px]">
          <section className="text-left flex flex-col items-start w-full">
            {/* Top Label */}
            <p className="font-sans text-[0.68rem] md:text-[0.75rem] font-semibold tracking-[0.28em] text-[#C9AA6B] uppercase mb-3 md:mb-5 text-left">
              Fine Jewelry — Solid Gold
            </p>

            {/* Main Editorial Headline */}
            <h1 className="font-cormorant font-light text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] tracking-tight leading-[1.06] text-[#FAF4EE] m-0 mb-4 md:mb-6 text-left">
              Shine with every<br />precious moment.
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-[0.82rem] md:text-[0.95rem] leading-[1.7] md:leading-[1.8] text-[#C2B4A3] font-light mb-7 md:mb-8 max-w-[480px] text-left">
              Discover beautiful jewelry made with care to add a touch of elegance to your everyday life and life's most precious moments.
            </p>

            {/* Pill Buttons Row */}
            <div className="flex flex-wrap items-center justify-start gap-3 w-full">
              <a 
                href="/shop" 
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('shop');
                }}
                className="px-6 md:px-8 py-3.5 rounded-full font-sans text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300 shadow-lg cursor-pointer no-underline"
                style={{ background: '#C9AA6B', color: '#0D0A08' }}
              >
                Shop the collection
              </a>

              <a 
                href="/about" 
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('about');
                }}
                className="px-6 md:px-8 py-3.5 rounded-full border border-white/20 bg-white/5 hover:border-[#C9AA6B]/60 text-[#FAF4EE] font-sans text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer no-underline backdrop-blur-sm"
              >
                Our story
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Main Content Area (Obsidian Gold background) */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center pt-20 pb-4 md:pb-8 px-[4%] w-full box-border bg-[#0D0A08] text-[#FAF4EE]">
        {/* Bestsellers Showcase section */}
        <ScrollReveal>
          <section className="w-full max-w-[1200px] mb-20 md:mb-24 scroll-mt-24" id="shop">
            {/* Centered Heading */}
            <div className="text-center mb-12">
              <p className="font-sans text-[0.68rem] font-semibold tracking-[0.28em] text-[#C9AA6B] uppercase mb-3">
                Most Loved
              </p>
              <h2 className="font-cormorant font-light text-5xl md:text-6xl text-[#FAF4EE] m-0">
                Bestsellers
              </h2>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 w-full">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onNavigate={onNavigate} 
                  badge="Bestseller"
                />
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="w-full max-w-[1200px] mb-4 md:mb-6 scroll-mt-24" id="collections">
            {/* Editorial Header Banner */}
            <div className="mb-14">
              <p className="font-sans text-[0.68rem] font-semibold tracking-[0.3em] text-[#C9AA6B] uppercase mb-5">
                ( The House of Ghadsiram )
              </p>
              
              <h2 className="font-cormorant font-light text-5xl md:text-7xl lg:text-8xl leading-[1.08] text-[#FAF4EE] m-0 mb-8 max-w-[950px]">
                Made by <span className="font-serif italic font-normal text-[#C9AA6B]">hand</span>, kept<br className="hidden sm:inline" />
                for a <span className="font-serif italic font-normal text-[#C9AA6B]">lifetime.</span>
              </h2>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 max-w-[800px]">
                <div className="w-20 h-[1px] bg-[#2A1F16] shrink-0 hidden sm:block" />
                <p className="font-sans text-sm font-light text-[#7A6A58] leading-[1.8] m-0">
                  Fine jewelry, cast in solid gold and kept close — pieces made to be worn every day and handed on.
                </p>
              </div>
            </div>

            {/* Promise Cards (4 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {/* Card 1: Certified Jewellery */}
              <div className="bg-[#16120F] border border-[#2A1F16] rounded-2xl p-8 flex flex-col items-start transition-all duration-300 hover:border-[#C9AA6B]/40 group">
                <div className="mb-6 text-[#C9AA6B]">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none stroke-[1.2]" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </div>
                <h5 className="font-cormorant text-xl font-semibold text-[#FAF4EE] m-0 mb-2 leading-tight">
                  Certified Jewellery
                </h5>
                <p className="font-sans text-xs font-light text-[#7A6A58] m-0 leading-relaxed">
                  Authenticity you can trust
                </p>
              </div>

              {/* Card 2: Free Insured Shipping */}
              <div className="bg-[#16120F] border border-[#2A1F16] rounded-2xl p-8 flex flex-col items-start transition-all duration-300 hover:border-[#C9AA6B]/40 group">
                <div className="mb-6 text-[#C9AA6B]">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none stroke-[1.2]" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16.5 8.5v6.5a1 1 0 0 1-.5.87l-5.5 3.18a1 1 0 0 1-1 0L4 15.87A1 1 0 0 1 3.5 15V8.5a1 1 0 0 1 .5-.87l5.5-3.18a1 1 0 0 1 1 0l5.5 3.18a1 1 0 0 1 .5.87z" />
                    <path d="M3.8 7.9L10 11.5l6.2-3.6" />
                    <path d="M10 11.5v7.2" />
                  </svg>
                </div>
                <h5 className="font-cormorant text-xl font-semibold text-[#FAF4EE] m-0 mb-2 leading-tight">
                  Free Insured Shipping
                </h5>
                <p className="font-sans text-xs font-light text-[#7A6A58] m-0 leading-relaxed">
                  Secure delivery, no extra cost
                </p>
              </div>

              {/* Card 3: Worldwide Shipping */}
              <div className="bg-[#16120F] border border-[#2A1F16] rounded-2xl p-8 flex flex-col items-start transition-all duration-300 hover:border-[#C9AA6B]/40 group">
                <div className="mb-6 text-[#C9AA6B]">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none stroke-[1.2]" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h5 className="font-cormorant text-xl font-semibold text-[#FAF4EE] m-0 mb-2 leading-tight">
                  Worldwide Shipping
                </h5>
                <p className="font-sans text-xs font-light text-[#7A6A58] m-0 leading-relaxed">
                  Jewels delivered globally
                </p>
              </div>

              {/* Card 4: 100000+ Units Sold */}
              <div className="bg-[#16120F] border border-[#2A1F16] rounded-2xl p-8 flex flex-col items-start transition-all duration-300 hover:border-[#C9AA6B]/40 group">
                <div className="mb-6 text-[#C9AA6B]">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none stroke-[1.2]" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 8h8v7H8z" />
                    <path d="M7 6h10v2H7z" />
                    <path d="M12 6v9" />
                  </svg>
                </div>
                <h5 className="font-cormorant text-xl font-semibold text-[#FAF4EE] m-0 mb-2 leading-tight">
                  100000+ Units Sold
                </h5>
                <p className="font-sans text-xs font-light text-[#7A6A58] m-0 leading-relaxed">
                  Trusted by thousands
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>

      {/* Brand Hero Closing Section — just above footer */}
      <section className="w-full bg-[#0D0A08] flex flex-col items-center justify-center pt-6 md:pt-10 pb-20 md:pb-28 px-4 overflow-hidden relative">

        {/* Subtitle */}
        <p className="font-sans text-[0.7rem] md:text-[0.75rem] tracking-[0.3em] text-[#5A4C3D] uppercase mb-5 text-center">
          ( From Our Hands &nbsp;·&nbsp; To Yours )
        </p>

        {/* Giant Brand Name */}
        <h2
          className="font-display font-bold uppercase text-center leading-none m-0 mb-10 select-none"
          style={{
            fontSize: 'clamp(4rem, 15vw, 13rem)',
            color: '#FAF4EE',
            letterSpacing: '-0.01em',
          }}
        >
          GHADSIRAM
        </h2>

        {/* Shop Button */}
        <a
          href="/shop"
          onClick={(e) => { e.preventDefault(); onNavigate('shop'); }}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-sans text-xs md:text-sm font-semibold tracking-wide no-underline shadow-lg hover:brightness-105 transition-all cursor-pointer"
          style={{ background: '#C9AA6B', color: '#0D0A08' }}
        >
          <span>Shop the collection</span>
          <span className="text-base leading-none">→</span>
        </a>

        {/* Darker bottom divider line */}
        <div className="w-full h-[2px] bg-[#2E231A] mt-16" />
      </section>

      {/* Styled Footer */}
      <Footer onBrandClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} onNavigate={onNavigate} noBorder={true} />
      
      {/* Fixed Segmented Scroll Progress Indicator */}
      <ScrollProgressLine />
    </div>
  );
}
