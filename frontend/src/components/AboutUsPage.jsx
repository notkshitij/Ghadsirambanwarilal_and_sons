import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function AboutUsPage({ onBackToShop, onBackToHome, onNavigate, onCartClick }) {
  const handleBrandClick = () => {
    if (onBackToHome) {
      onBackToHome();
    } else if (onNavigate) {
      onNavigate('home');
    } else {
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleShopClick = () => {
    if (onNavigate) {
      onNavigate('shop');
    } else {
      if (onBackToShop) onBackToShop();
      else if (onNavigate) onNavigate('shop');
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0A08] text-[#FAF4EE] flex flex-col justify-between font-sans">
      <Navbar 
        onCartClick={onCartClick} 
        onBookClick={() => {
          if (onNavigate) onNavigate('appointment');
        }} 
        onShopClick={handleShopClick} 
        onBrandClick={handleBrandClick} 
        onNavigate={onNavigate}
        alwaysShowBg={true} 
      />

      <main className="flex-1 w-full max-w-[760px] mx-auto px-6 sm:px-8 pt-36 pb-20 flex flex-col items-center text-center">
        {/* Logo Icon */}
        <div className="mb-6">
          <img
            src="/flowers.png"
            alt="Ghadsiram Logo"
            className="w-12 h-12 object-contain drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]"
          />
        </div>

        <h1 className="font-cormorant font-light text-4xl sm:text-5xl md:text-6xl text-[#FAF4EE] tracking-tight m-0 mb-8">
          About Us
        </h1>

        {/* Content Paragraphs */}
        <div className="flex flex-col gap-6 text-left text-sm sm:text-base font-light text-[#D9C8B4] leading-[1.9]">
          <p className="m-0">
            Ghadsiram Banwarilal &amp; Sons by Ramchandra Sigar and Rajat Sigar have a legacy of over 100 years, with the roots of the brand in 1920. Their endeavours have come a long way and the duo has been keeping their traditions alive being the fifth generation in the business.
          </p>

          <p className="m-0">
            We hail from the Taranagar area of the old Churu district; our ancestors were highly skilled in the art of gold craftsmanship, and this is our ancestral trade.
          </p>

          <p className="m-0">
            We have mastered the art of giving the traditional Jadau pattern a lightweight makeover—a style famously known as &apos;Thappa jewellery&apos;. But our designs and collection are very different from market.
          </p>
        </div>
      </main>

      {/* Ornamental Divider */}
      <div className="w-full flex items-center gap-0 px-0">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#2E231A] to-[#3A2A1E]" />
        <span className="text-[#C9AA6B] text-xs px-4 select-none opacity-80">◆</span>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#2E231A] to-[#3A2A1E]" />
      </div>

      {/* Call To Action Banner — Find the one you keep */}
      <section className="w-full bg-[#0D0A08] py-20 md:py-28 px-4 flex flex-col items-center justify-center text-center">
        <h2 className="font-cormorant font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FAF4EE] m-0 mb-8 leading-[1.05]">
          Find the one<br />
          you keep.
        </h2>
        <button
          onClick={handleShopClick}
          className="bg-[#C9AA6B] hover:bg-[#D4B879] text-[#14100C] font-sans text-[0.72rem] md:text-xs font-semibold tracking-[0.22em] uppercase px-8 py-3.5 rounded transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border-none cursor-pointer"
        >
          Shop The Collection
        </button>
      </section>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
