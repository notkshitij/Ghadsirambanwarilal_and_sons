import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import ProductCard from './ProductCard';
import { useProductsStore } from '../data/products';
import heroBg from '../assets/background.png';
import heroBgMobile from '../assets/background-mobile.png';
import necklaceCategoryImg from '../assets/Product Image/diff product 2/diff_product_4.png';
import braceletCategoryImg from '../assets/Product Image/diff product 7/diff_product_1.png';
import hairClipsCategoryImg from '../assets/Product Image/diff product 9/diff_product_1.png';
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

// Strictly fixed 5 Bestseller products
const FIXED_BESTSELLER_IDS = [
  'mayur-meenakari-polki-pendant',
  'budroom-hair-clips',
  'shahi-nakshi-hair-clips',
  'padma-meenakari-ruby-pendant',
  'turquoise-pounchi-bracelet',
];

export default function LandingPage({ onOpenCart, onBookClick, onNavigate, isSplashActive = false }) {
  const { products } = useProductsStore();
  const [heroAnimated, setHeroAnimated] = useState(!isSplashActive);

  useEffect(() => {
    if (isSplashActive) {
      // Trigger animation smoothly as the initial splash screen completes its zoom & reveal
      const timer = setTimeout(() => {
        setHeroAnimated(true);
      }, 1900);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setHeroAnimated(true);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isSplashActive]);

  return (
    <div className="relative w-full min-h-screen bg-[#0D0A08] text-[#FAF4EE] font-sans flex flex-col justify-between overflow-x-hidden">
      
      {/* Top Hero Container (Background image + dark overlay) - full screen height */}
      <div
        className="relative w-full min-h-screen flex flex-col justify-between text-cream-light pb-12 overflow-hidden bg-[#0D0A08]"
      >
        {/* Mobile Background Image */}
        <div 
          className={`block md:hidden absolute inset-0 bg-no-repeat bg-cover bg-[35%_center] ${heroAnimated ? 'animate-hero-bg' : ''}`}
          style={{ backgroundImage: `url(${heroBgMobile})` }}
        />

        {/* Desktop / Tablet Background Image */}
        <div 
          className={`hidden md:block absolute inset-0 bg-no-repeat bg-cover md:bg-[72%_30%] ${heroAnimated ? 'animate-hero-bg' : ''}`}
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
            <p className={`font-sans text-[0.68rem] md:text-[0.75rem] font-semibold tracking-[0.28em] text-[#C9AA6B] uppercase mb-3 md:mb-5 text-left transition-opacity duration-300 ${heroAnimated ? 'animate-hero-badge' : 'opacity-0'}`}>
              Fine Signature Jewellery
            </p>

            {/* Main Editorial Headline */}
            <h1 className="font-cormorant font-light text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] tracking-tight leading-[1.06] text-[#FAF4EE] m-0 mb-4 md:mb-6 text-left">
              <span className="block overflow-hidden pb-1">
                <span className={`inline-block transition-opacity duration-300 ${heroAnimated ? 'animate-hero-headline-1' : 'opacity-0'}`}>
                  Shine with every
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className={`inline-block transition-opacity duration-300 ${heroAnimated ? 'animate-hero-headline-2' : 'opacity-0'}`}>
                  precious moment.
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`font-sans text-[0.82rem] md:text-[0.95rem] leading-[1.7] md:leading-[1.8] text-[#C2B4A3] font-light mb-7 md:mb-8 max-w-[480px] text-left transition-opacity duration-300 ${heroAnimated ? 'animate-hero-subtitle' : 'opacity-0'}`}>
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
                className={`px-6 md:px-8 py-3.5 rounded-full font-sans text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300 shadow-lg cursor-pointer no-underline ${heroAnimated ? 'animate-hero-btn-1' : 'opacity-0'}`}
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
                className={`px-6 md:px-8 py-3.5 rounded-full border border-white/20 bg-white/5 hover:border-[#C9AA6B]/60 text-[#FAF4EE] font-sans text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer no-underline backdrop-blur-sm ${heroAnimated ? 'animate-hero-btn-2' : 'opacity-0'}`}
              >
                Our story
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* House Editorial — full-width left-aligned, directly below hero */}
      <div className="w-full bg-[#0D0A08] px-6 md:px-10 lg:px-16 pt-16 md:pt-24 pb-10 md:pb-14">

        {/* Label — top left */}
        <p className="font-sans text-[0.65rem] font-semibold tracking-[0.28em] text-[#C9AA6B] uppercase mb-6 md:mb-8 ml-8 md:ml-24 lg:ml-32">
          ( The House of Ghadsiram )
        </p>

        {/* Giant left-aligned headline */}
        <h2
          className="font-cormorant font-normal text-[#FAF4EE] m-0 leading-[1.05] w-full ml-8 md:ml-24 lg:ml-32"
          style={{ fontSize: 'clamp(3rem, 8.5vw, 7.5rem)' }}
        >
          Made by <span className="italic text-[#C9AA6B]">hand</span>, kept<br />
          for a <span className="italic text-[#C9AA6B]">lifetime.</span>
        </h2>

        {/* Divider + Subtitle — side by side */}
        <div className="flex items-start gap-5 mt-8 md:mt-10 ml-8 md:ml-24 lg:ml-32">
          <div className="w-20 md:w-28 h-[1px] bg-[#3A2E24] shrink-0 mt-[0.55em]" />
          <p className="font-sans text-xs md:text-sm font-light text-[#8A7968] leading-[1.85] m-0 max-w-[440px]">
            Fine jewelry, crafted by hand and kept close — pieces made to be worn every day and handed on.
          </p>
        </div>
      </div>

      {/* Trust Badges Strip */}
      <div className="w-full bg-[#0D0A08] px-6 md:px-10 lg:px-16 pb-14 md:pb-16">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full">

          {/* Badge 1 */}
          <div className="flex flex-col gap-2 bg-[#0F0C0A] border border-[#2A1F16] border-l-[3px] border-l-[#C9AA6B] rounded-xl px-5 py-5 hover:border-l-[#C9AA6B] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(201,170,107,0.08)]">
            <span className="text-[#C9AA6B] text-lg mb-1">✦</span>
            <h3 className="font-sans font-semibold text-sm md:text-[0.92rem] text-[#FAF4EE] m-0 leading-snug">Certified Jewellery</h3>
            <p className="font-sans text-[0.72rem] font-light text-[#6B5E52] m-0 leading-relaxed">Authenticity you can trust</p>
          </div>

          {/* Badge 2 */}
          <div className="flex flex-col gap-2 bg-[#0F0C0A] border border-[#2A1F16] border-l-[3px] border-l-[#C9AA6B] rounded-xl px-5 py-5 hover:border-l-[#C9AA6B] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(201,170,107,0.08)]">
            <span className="text-[#C9AA6B] text-lg mb-1">⬡</span>
            <h3 className="font-sans font-semibold text-sm md:text-[0.92rem] text-[#FAF4EE] m-0 leading-snug">Free Insured Shipping</h3>
            <p className="font-sans text-[0.72rem] font-light text-[#6B5E52] m-0 leading-relaxed">Secure delivery, no extra cost</p>
          </div>

          {/* Badge 3 */}
          <div className="flex flex-col gap-2 bg-[#0F0C0A] border border-[#2A1F16] border-l-[3px] border-l-[#C9AA6B] rounded-xl px-5 py-5 hover:border-l-[#C9AA6B] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(201,170,107,0.08)]">
            <span className="text-[#C9AA6B] text-lg mb-1">◈</span>
            <h3 className="font-sans font-semibold text-sm md:text-[0.92rem] text-[#FAF4EE] m-0 leading-snug">Worldwide Shipping</h3>
            <p className="font-sans text-[0.72rem] font-light text-[#6B5E52] m-0 leading-relaxed">Jewels delivered globally</p>
          </div>

          {/* Badge 4 */}
          <div className="flex flex-col gap-2 bg-[#0F0C0A] border border-[#2A1F16] border-l-[3px] border-l-[#C9AA6B] rounded-xl px-5 py-5 hover:border-l-[#C9AA6B] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(201,170,107,0.08)]">
            <span className="text-[#C9AA6B] text-lg mb-1">◉</span>
            <h3 className="font-sans font-semibold text-sm md:text-[0.92rem] text-[#FAF4EE] m-0 leading-snug">100,000+ Units Sold</h3>
            <p className="font-sans text-[0.72rem] font-light text-[#6B5E52] m-0 leading-relaxed">Trusted by thousands</p>
          </div>

        </div>
      </div>

      {/* Main Content Area (Obsidian Gold background) */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center pt-16 pb-4 md:pb-8 w-full box-border bg-[#0D0A08] text-[#FAF4EE]">
        {/* Shop by Category Section */}
        <ScrollReveal className="w-full">
          <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 mb-20 md:mb-28 scroll-mt-24" id="categories">
            {/* Centered Heading */}
            <div className="text-center mb-10 sm:mb-14">
              <p className="font-sans text-[0.68rem] font-semibold tracking-[0.28em] text-[#C9AA6B] uppercase mb-3">
                Find Your Piece
              </p>
              <h2 className="font-cormorant font-light text-5xl md:text-6xl text-[#FAF4EE] m-0">
                Shop by category
              </h2>
            </div>

            {/* 2x2 Matrix on Mobile / 3 Columns on Desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-[380px] sm:max-w-[800px] md:max-w-[860px] lg:max-w-[940px] mx-auto w-full px-4 sm:px-0">
              {/* Necklaces Card */}
              <div
                onClick={() => onNavigate && onNavigate('category', 'Necklaces')}
                className="group relative w-full rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border border-[#2A1F16] bg-[#16120F] transition-all duration-500 hover:border-[#C9AA6B]/50 hover:shadow-[0_8px_30px_rgba(201,170,107,0.12)]"
                style={{ aspectRatio: '3/4' }}
              >
                <img
                  src={necklaceCategoryImg}
                  alt="Necklaces"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Dark Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                {/* Bottom Bar: Title + Arrow */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-5 sm:right-5 flex items-center justify-between z-10">
                  <h3 className="font-cormorant text-base sm:text-lg md:text-xl font-light text-[#FAF4EE] m-0 tracking-wide group-hover:text-[#C9AA6B] transition-colors leading-tight">
                    Necklaces
                  </h3>
                  <span className="font-sans text-[0.7rem] sm:text-sm md:text-base text-[#C9AA6B] transform transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>

              {/* Bracelets Card */}
              <div
                onClick={() => onNavigate && onNavigate('category', 'Bracelets')}
                className="group relative w-full rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border border-[#2A1F16] bg-[#16120F] transition-all duration-500 hover:border-[#C9AA6B]/50 hover:shadow-[0_8px_30px_rgba(201,170,107,0.12)]"
                style={{ aspectRatio: '3/4' }}
              >
                <img
                  src={braceletCategoryImg}
                  alt="Bracelets"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Dark Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                {/* Bottom Bar: Title + Arrow */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-5 sm:right-5 flex items-center justify-between z-10">
                  <h3 className="font-cormorant text-base sm:text-lg md:text-xl font-light text-[#FAF4EE] m-0 tracking-wide group-hover:text-[#C9AA6B] transition-colors leading-tight">
                    Bracelets
                  </h3>
                  <span className="font-sans text-[0.7rem] sm:text-sm md:text-base text-[#C9AA6B] transform transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>

              {/* Hair Clips Card */}
              <div
                onClick={() => onNavigate && onNavigate('category', 'Hair Clips')}
                className="group relative w-full rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border border-[#2A1F16] bg-[#16120F] transition-all duration-500 hover:border-[#C9AA6B]/50 hover:shadow-[0_8px_30px_rgba(201,170,107,0.12)]"
                style={{ aspectRatio: '3/4' }}
              >
                <img
                  src={hairClipsCategoryImg}
                  alt="Hair Clips"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Dark Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                {/* Bottom Bar: Title + Arrow */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-5 sm:right-5 flex items-center justify-between z-10">
                  <h3 className="font-cormorant text-base sm:text-lg md:text-xl font-light text-[#FAF4EE] m-0 tracking-wide group-hover:text-[#C9AA6B] transition-colors leading-tight">
                    Hair Clips
                  </h3>
                  <span className="font-sans text-[0.7rem] sm:text-sm md:text-base text-[#C9AA6B] transform transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Bestsellers Showcase section (Continuous Horizontal Scrolling Animation) */}
        <ScrollReveal className="w-full">
          <section className="w-full mx-auto mb-20 md:mb-28 scroll-mt-24 overflow-hidden relative" id="shop">
            {/* Centered Heading */}
            <div className="text-center mb-10 sm:mb-12 max-w-[1380px] mx-auto px-4">
              <p className="font-sans text-[0.68rem] font-semibold tracking-[0.28em] text-[#C9AA6B] uppercase mb-3">
                Most Loved
              </p>
              <h2 className="font-cormorant font-light text-5xl md:text-6xl text-[#FAF4EE] m-0">
                Bestsellers
              </h2>
            </div>

            {/* Desktop / Laptop: 4 Columns Grid (4 top, 1 bottom) */}
            <div className="hidden md:grid grid-cols-4 gap-4 md:gap-5 lg:gap-6 max-w-[960px] lg:max-w-[1240px] mx-auto px-4 sm:px-6 md:px-0 w-full">
              {FIXED_BESTSELLER_IDS
                .map((id) => products.find((p) => p.id === id))
                .filter(Boolean)
                .map((product) => (
                  <ProductCard 
                    key={`bestseller-desktop-${product.id}`} 
                    product={product} 
                    onNavigate={onNavigate} 
                    badge="Bestseller"
                  />
                ))}
            </div>

            {/* Mobile Phones Only: Continuous Horizontal Marquee Carousel */}
            <div className="block md:hidden relative w-full overflow-hidden group py-2">
              {/* Left Edge Dark Vignette */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0D0A08] to-transparent z-10 pointer-events-none" />
              {/* Right Edge Dark Vignette */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0D0A08] to-transparent z-10 pointer-events-none" />

              {/* Infinite Moving Row on Mobile */}
              <div className="animate-marquee-infinite flex gap-3.5 items-stretch">
                {/* Set 1 */}
                {FIXED_BESTSELLER_IDS
                  .map((id) => products.find((p) => p.id === id))
                  .filter(Boolean)
                  .map((product, idx) => (
                    <div key={`bestseller-mob-1-${product.id}-${idx}`} className="w-[190px] shrink-0">
                      <ProductCard 
                        product={product} 
                        onNavigate={onNavigate} 
                        badge="Bestseller"
                      />
                    </div>
                  ))}

                {/* Set 2 (Seamless Repeat) */}
                {FIXED_BESTSELLER_IDS
                  .map((id) => products.find((p) => p.id === id))
                  .filter(Boolean)
                  .map((product, idx) => (
                    <div key={`bestseller-mob-2-${product.id}-${idx}`} className="w-[190px] shrink-0">
                      <ProductCard 
                        product={product} 
                        onNavigate={onNavigate} 
                        badge="Bestseller"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </ScrollReveal>


        {/* The Making Section */}
        <ScrollReveal>
          <section className="w-full max-w-[860px] mx-auto pt-10 md:pt-16 mb-24 md:mb-36 px-4 sm:px-6">
            {/* Centered Heading */}
            <div className="text-center mb-10 sm:mb-14">
              <p className="font-sans text-[0.65rem] font-semibold tracking-[0.3em] text-[#C9AA6B] uppercase mb-4 text-center">
                The Making
              </p>
              <h2 className="font-cormorant font-normal text-4xl sm:text-5xl md:text-6xl text-[#FAF4EE] m-0 text-center leading-tight">
                Four hands, one piece
              </h2>
            </div>

            {/* Step Cards Stack */}
            <div className="flex flex-col gap-5 w-full">
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
                  className="bg-[#120E0B] border border-[#2A1F16] rounded-2xl p-7 sm:p-9 flex items-center gap-7 sm:gap-10 transition-all duration-300 hover:border-[#C9AA6B]/40 group"
                >
                  <span className="font-cormorant font-normal text-4xl sm:text-[2.75rem] text-[#C9AA6B] shrink-0 select-none w-14 sm:w-16 text-center">
                    {step.num}
                  </span>
                  <div className="flex flex-col text-left">
                    <h4 className="font-cormorant font-bold text-2xl sm:text-[1.7rem] text-[#FAF4EE] m-0 mb-1.5 leading-tight transition-colors">
                      {step.title}
                    </h4>
                    <p className="font-sans text-[0.8rem] sm:text-[0.9rem] font-light text-[#8A7968] m-0 leading-[1.6]">
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
      <ScrollReveal className="w-full">
        <section className="w-full bg-[#0D0A08] flex flex-col items-center justify-center pt-8 md:pt-14 pb-20 md:pb-28 px-4 overflow-hidden relative">

          {/* Subtitle */}
          <p className="font-sans text-[0.7rem] md:text-[0.75rem] tracking-[0.3em] text-[#C9AA6B]/80 uppercase mb-6 text-center">
            ( From Our Hands &nbsp;·&nbsp; To Yours )
          </p>

          {/* Full Brand Signature Display */}
          <div className="flex flex-col items-center justify-center text-center select-none mb-10 max-w-[1200px] w-full px-4">
            <h2
              className="font-signature font-normal text-center leading-[1.15] m-0 text-[#C9AA6B] tracking-normal drop-shadow-[0_4px_30px_rgba(201,170,107,0.35)] transition-all duration-700 hover:scale-[1.02]"
              style={{
                fontSize: 'clamp(2.8rem, 7.5vw, 6.2rem)',
                fontFamily: "'Alex Brush', 'Allura', 'Great Vibes', cursive",
              }}
            >
              Ghadsiram Banwarilal
            </h2>
            <div className="flex items-center justify-center gap-4 mt-1 md:mt-2 w-full max-w-[420px]">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9AA6B]/60 to-[#C9AA6B]" />
              <span
                className="font-signature font-normal text-center text-[#FAF4EE] tracking-wide"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                  fontFamily: "'Alex Brush', 'Allura', 'Great Vibes', cursive",
                }}
              >
                &amp; Sons
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C9AA6B]/60 to-[#C9AA6B]" />
            </div>
          </div>

          {/* Shop Button */}
          <a
            href="/shop"
            onClick={(e) => { e.preventDefault(); onNavigate('shop'); }}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-sans text-xs md:text-sm font-semibold tracking-wide no-underline shadow-lg hover:brightness-105 hover:scale-105 transition-all cursor-pointer"
            style={{ background: '#C9AA6B', color: '#0D0A08' }}
          >
            <span>Shop the collection</span>
            <span className="text-base leading-none">→</span>
          </a>

          {/* Darker bottom divider line */}
          <div className="w-full h-[2px] bg-[#2E231A] mt-16" />
        </section>
      </ScrollReveal>

      {/* Styled Footer */}
      <Footer onBrandClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} onNavigate={onNavigate} noBorder={true} />
      
      {/* Fixed Segmented Scroll Progress Indicator */}
      <ScrollProgressLine />
    </div>
  );
}
