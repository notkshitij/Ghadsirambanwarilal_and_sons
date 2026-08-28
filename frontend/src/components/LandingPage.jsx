import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import heroBg from '../assets/background.png';
import heroBgMobile from '../assets/background-mobile.png';
import bannerImg from '../assets/banner.png';
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
        {/* Mobile Background Image */}
        <div 
          className="block md:hidden absolute inset-0 bg-no-repeat bg-cover bg-[35%_center] animate-hero-bg"
          style={{ backgroundImage: `url(${heroBgMobile})` }}
        />

        {/* Desktop / Tablet Background Image */}
        <div 
          className="hidden md:block absolute inset-0 bg-no-repeat bg-cover md:bg-[72%_30%] animate-hero-bg"
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
            <p className="font-sans text-[0.68rem] md:text-[0.75rem] font-semibold tracking-[0.28em] text-[#C9AA6B] uppercase mb-3 md:mb-5 text-left animate-hero-badge">
              Fine Signature Jewellery
            </p>

            {/* Main Editorial Headline */}
            <h1 className="font-cormorant font-light text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] tracking-tight leading-[1.06] text-[#FAF4EE] m-0 mb-4 md:mb-6 text-left">
              <span className="block overflow-hidden pb-1">
                <span className="animate-hero-headline-1">Shine with every</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="animate-hero-headline-2">precious moment.</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-[0.82rem] md:text-[0.95rem] leading-[1.7] md:leading-[1.8] text-[#C2B4A3] font-light mb-7 md:mb-8 max-w-[480px] text-left animate-hero-subtitle">
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
                className="px-6 md:px-8 py-3.5 rounded-full font-sans text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300 shadow-lg cursor-pointer no-underline animate-hero-btn-1"
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
                className="px-6 md:px-8 py-3.5 rounded-full border border-white/20 bg-white/5 hover:border-[#C9AA6B]/60 text-[#FAF4EE] font-sans text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer no-underline backdrop-blur-sm animate-hero-btn-2"
              >
                Our story
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Main Content Area (Obsidian Gold background) */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center pt-20 pb-4 md:pb-8 w-full box-border bg-[#0D0A08] text-[#FAF4EE]">
        {/* Bestsellers Showcase section */}
        <ScrollReveal className="w-full">
          <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 mb-20 md:mb-24 scroll-mt-24" id="shop">
            {/* Centered Heading */}
            <div className="text-center mb-12 sm:mb-14">
              <p className="font-sans text-[0.68rem] font-semibold tracking-[0.28em] text-[#C9AA6B] uppercase mb-3">
                Most Loved
              </p>
              <h2 className="font-cormorant font-light text-5xl md:text-6xl text-[#FAF4EE] m-0">
                Bestsellers
              </h2>
            </div>

            {/* Products Grid (4 columns - Extra Large Visual Display) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 lg:gap-8 w-full">
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

        {/* Editorial Cinematic Jewelry Banner (100% Full-Bleed Edge-to-Edge) */}
        <ScrollReveal className="w-full mb-20 md:mb-28">
          <div className="relative w-full h-[190px] sm:h-[250px] md:h-[320px] lg:h-[360px] overflow-hidden bg-[#0D0A08]">
            <img
              src={bannerImg}
              alt="Fine Luxury Jewellery Showcase"
              className="w-full h-full object-cover object-center block brightness-[0.78] contrast-[1.05]"
            />
            {/* Ambient Dark Bottom Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/15 pointer-events-none" />

            {/* Bottom Tagline */}
            <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-12 lg:left-20 z-10">
              <span className="font-sans text-[0.65rem] sm:text-[0.75rem] tracking-[0.28em] text-[#C9AA6B] uppercase font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] select-none">
                Fine Signature Jewellery
              </span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="w-full">
          <section className="w-full max-w-[1240px] mx-auto px-6 md:px-12 mb-16 md:mb-24 scroll-mt-24" id="collections">
            {/* Centered Editorial Header */}
            <div className="text-center mb-14 md:mb-16">
              <p className="font-sans text-[0.68rem] font-semibold tracking-[0.3em] text-[#C9AA6B] uppercase mb-4 text-center">
                ( The House of Ghadsiram )
              </p>
              
              <h2 className="font-cormorant font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FAF4EE] m-0 text-center leading-[1.1] max-w-[900px] mx-auto mb-4">
                Made by <span className="italic text-[#C9AA6B]">hand</span>, kept<br className="hidden sm:inline" />
                for a <span className="italic text-[#C9AA6B]">lifetime.</span>
              </h2>

              <p className="font-sans text-sm font-light text-[#A69280] leading-[1.8] m-0 max-w-[650px] mx-auto text-center">
                Fine jewelry, cast in solid gold and kept close — pieces made to be worn every day and handed on.
              </p>
            </div>

            {/* 4 Clean Minimal Value Columns with Top Border Divider */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 w-full">
              {/* Col 1: Certified Jewellery */}
              <div className="flex flex-col pt-6 border-t border-[#2A1F16]">
                <h3 className="font-serif font-bold text-xl md:text-[1.35rem] text-[#FAF4EE] m-0 mb-2 leading-tight">
                  Certified Jewellery
                </h3>
                <p className="font-sans text-xs md:text-sm font-light text-[#8C7A6B] m-0 leading-relaxed">
                  Authenticity you can trust
                </p>
              </div>

              {/* Col 2: Free Insured Shipping */}
              <div className="flex flex-col pt-6 border-t border-[#2A1F16]">
                <h3 className="font-serif font-bold text-xl md:text-[1.35rem] text-[#FAF4EE] m-0 mb-2 leading-tight">
                  Free Insured Shipping
                </h3>
                <p className="font-sans text-xs md:text-sm font-light text-[#8C7A6B] m-0 leading-relaxed">
                  Secure delivery, no extra cost
                </p>
              </div>

              {/* Col 3: Worldwide Shipping */}
              <div className="flex flex-col pt-6 border-t border-[#2A1F16]">
                <h3 className="font-serif font-bold text-xl md:text-[1.35rem] text-[#FAF4EE] m-0 mb-2 leading-tight">
                  Worldwide Shipping
                </h3>
                <p className="font-sans text-xs md:text-sm font-light text-[#8C7A6B] m-0 leading-relaxed">
                  Jewels delivered globally
                </p>
              </div>

              {/* Col 4: 100000+ Units Sold */}
              <div className="flex flex-col pt-6 border-t border-[#2A1F16]">
                <h3 className="font-serif font-bold text-xl md:text-[1.35rem] text-[#FAF4EE] m-0 mb-2 leading-tight">
                  100000+ Units Sold
                </h3>
                <p className="font-sans text-xs md:text-sm font-light text-[#8C7A6B] m-0 leading-relaxed">
                  Trusted by thousands
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* The Making Section */}
        <ScrollReveal>
          <section className="w-full max-w-[840px] mx-auto pt-10 md:pt-16 mb-24 md:mb-36 px-4 sm:px-6">
            {/* Centered Heading */}
            <div className="text-center mb-10 sm:mb-12">
              <p className="font-sans text-[0.68rem] font-semibold tracking-[0.3em] text-[#C9AA6B] uppercase mb-3 text-center">
                The Making
              </p>
              <h2 className="font-cormorant font-normal text-4xl sm:text-5xl md:text-6xl text-[#FAF4EE] m-0 text-center leading-tight">
                Four hands, one piece
              </h2>
            </div>

            {/* Step Cards Stack */}
            <div className="flex flex-col gap-4 w-full">
              {[
                {
                  num: '01',
                  title: 'Design',
                  desc: 'Every piece starts as a sketch, then a wax model carved by hand.',
                },
                {
                  num: '02',
                  title: 'Craft',
                  desc: 'Gold is melted, crafted, and prepared for setting.',
                },
                {
                  num: '03',
                  title: 'Set',
                  desc: 'Each stone is set by hand under magnification for a flush fit.',
                },
                {
                  num: '04',
                  title: 'Finish',
                  desc: 'Filing, sanding and polishing bring the final light.',
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="bg-[#14100D] border border-[#2A1F16] rounded-2xl p-6 sm:p-7 flex items-center gap-6 sm:gap-8 transition-all duration-300 hover:border-[#C9AA6B]/35 group"
                >
                  <span className="font-cormorant italic font-normal text-3xl sm:text-4xl text-[#C9AA6B] shrink-0 select-none w-10 sm:w-12">
                    {step.num}
                  </span>
                  <div className="flex flex-col text-left">
                    <h4 className="font-cormorant font-bold text-xl sm:text-2xl text-[#FAF4EE] m-0 mb-1 leading-tight group-hover:text-[#FAF4EE] transition-colors">
                      {step.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-[0.84rem] font-light text-[#8C7A6B] m-0 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
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

        {/* Full Brand Name Display */}
        <div className="flex flex-col items-center justify-center text-center select-none mb-10 max-w-[1200px] w-full px-4">
          <h2
            className="font-display font-medium uppercase text-center leading-[1.15] m-0 tracking-[0.12em] md:tracking-[0.22em] text-[#C9AA6B]"
            style={{
              fontSize: 'clamp(1.6rem, 4.8vw, 4rem)',
            }}
          >
            Ghadsiram Banwarilal
          </h2>
          <div className="flex items-center justify-center gap-4 mt-3 md:mt-4 w-full max-w-[420px]">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C9AA6B]/50" />
            <span
              className="font-display font-normal text-center text-[#FAF4EE] tracking-[0.28em] md:tracking-[0.38em] uppercase"
              style={{
                fontSize: 'clamp(0.85rem, 1.8vw, 1.3rem)',
              }}
            >
              &amp; Sons
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C9AA6B]/50" />
          </div>
        </div>

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
