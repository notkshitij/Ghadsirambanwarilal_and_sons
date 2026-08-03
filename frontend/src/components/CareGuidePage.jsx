import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function CareGuidePage({ onBackToShop, onBackToHome, onNavigate, onCartClick }) {
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
      onBackToShop();
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between font-sans">
      <Navbar 
        onCartClick={onCartClick} 
        onBookClick={() => {
          if (onNavigate) onNavigate('appointment');
        }} 
        onShopClick={handleShopClick} 
        onBrandClick={handleBrandClick} 
        alwaysShowBg={true} 
      />

      <main className="flex-1 w-full max-w-[960px] mx-auto px-6 md:px-12 pt-36 pb-24 text-neutral-800 leading-relaxed">
        {/* Page Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="font-sans font-light text-3xl md:text-[2.2rem] tracking-[0.16em] m-0 mb-4 text-neutral-900 uppercase">
            Jewellery Care Guide
          </h1>
          <div className="w-24 h-[1px] bg-[#c89b3c]" />
        </div>

        {/* Intro */}
        <div className="text-sm md:text-[0.92rem] font-light text-neutral-600 mb-12 text-center max-w-[700px] mx-auto">
          <p>
            Fine jewellery is an investment and an heirloom. With proper care, it will retain its beauty for generations. Follow our comprehensive guide to preserve the brilliance of your precious pieces.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="flex flex-col gap-16 text-sm md:text-[0.92rem] font-light text-neutral-700">
          
          {/* Daily Care & Storage Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-neutral-50/50 border border-neutral-100 rounded-xl p-6 md:p-8 flex flex-col gap-4">
              <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c89b3c]" /> Daily Care
              </h2>
              <ul className="list-none p-0 m-0 flex flex-col gap-3 pl-2">
                <li className="relative pl-5 text-neutral-600">
                  <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                  Wear your jewellery after applying perfume, lotion, hairspray, or makeup.
                </li>
                <li className="relative pl-5 text-neutral-600">
                  <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                  Remove jewellery before exercising, swimming, cooking, or cleaning.
                </li>
                <li className="relative pl-5 text-neutral-600">
                  <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                  Handle pieces with clean, dry hands.
                </li>
                <li className="relative pl-5 text-neutral-600">
                  <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                  Wipe gently with a soft microfiber or muslin cloth after every use.
                </li>
              </ul>
            </section>

            <section className="bg-neutral-50/50 border border-neutral-100 rounded-xl p-6 md:p-8 flex flex-col gap-4">
              <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c89b3c]" /> Storage Tips
              </h2>
              <ul className="list-none p-0 m-0 flex flex-col gap-3 pl-2">
                <li className="relative pl-5 text-neutral-600">
                  <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                  Store each piece separately to avoid scratches.
                </li>
                <li className="relative pl-5 text-neutral-600">
                  <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                  Keep jewellery in a soft pouch or lined jewellery box.
                </li>
                <li className="relative pl-5 text-neutral-600">
                  <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                  Store in a cool, dry place away from moisture and direct sunlight.
                </li>
                <li className="relative pl-5 text-neutral-600">
                  <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                  Use anti-tarnish strips for silver jewellery if possible.
                </li>
              </ul>
            </section>
          </div>

          {/* Care by Jewellery Type */}
          <section className="flex flex-col gap-6">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0 uppercase text-center mb-2">
              Care by Jewellery Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Jadau & Kundan */}
              <div className="border border-neutral-100 rounded-xl p-6 flex flex-col gap-3">
                <h3 className="font-sans text-sm md:text-[0.95rem] font-semibold text-neutral-800 m-0 border-b border-neutral-100 pb-2">
                  Jadau &amp; Kundan
                </h3>
                <ul className="list-none p-0 m-0 flex flex-col gap-2 pl-2">
                  <li className="relative pl-4 text-neutral-600 text-[0.88rem]">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    Keep away from water, heat, and chemicals.
                  </li>
                  <li className="relative pl-4 text-neutral-600 text-[0.88rem]">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    Clean only with a soft dry cloth.
                  </li>
                  <li className="relative pl-4 text-neutral-600 text-[0.88rem]">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    If a stone becomes loose, get it repaired by a professional.
                  </li>
                </ul>
              </div>

              {/* Diamond & Precious */}
              <div className="border border-neutral-100 rounded-xl p-6 flex flex-col gap-3">
                <h3 className="font-sans text-sm md:text-[0.95rem] font-semibold text-neutral-800 m-0 border-b border-neutral-100 pb-2">
                  Diamond &amp; Precious Stone
                </h3>
                <ul className="list-none p-0 m-0 flex flex-col gap-2 pl-2">
                  <li className="relative pl-4 text-neutral-600 text-[0.88rem]">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    Clean diamonds occasionally with mild soap and lukewarm water.
                  </li>
                  <li className="relative pl-4 text-neutral-600 text-[0.88rem]">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    Avoid harsh chemicals on emeralds, pearls, and other delicate gemstones.
                  </li>
                  <li className="relative pl-4 text-neutral-600 text-[0.88rem]">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    Wipe pearls after every wear and store them separately.
                  </li>
                </ul>
              </div>

              {/* Silver Jewellery */}
              <div className="border border-neutral-100 rounded-xl p-6 flex flex-col gap-3">
                <h3 className="font-sans text-sm md:text-[0.95rem] font-semibold text-neutral-800 m-0 border-b border-neutral-100 pb-2">
                  Silver Jewellery
                </h3>
                <ul className="list-none p-0 m-0 flex flex-col gap-2 pl-2">
                  <li className="relative pl-4 text-neutral-600 text-[0.88rem]">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    Store in a dry, airtight pouch to reduce tarnishing.
                  </li>
                  <li className="relative pl-4 text-neutral-600 text-[0.88rem]">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    Use a silver polishing cloth for plain silver only.
                  </li>
                  <li className="relative pl-4 text-neutral-600 text-[0.88rem]">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    Do not polish oxidised silver jewellery.
                  </li>
                </ul>
              </div>

            </div>
          </section>

          {/* Cleaning Guidelines */}
          <section className="flex flex-col gap-6">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0 uppercase text-center mb-2">
              Cleaning Guidelines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Safe */}
              <div className="bg-emerald-50/30 border border-emerald-100/50 rounded-xl p-6 md:p-8 flex flex-col gap-4">
                <h3 className="font-sans text-base font-semibold text-emerald-800 m-0 flex items-center gap-2">
                  <svg viewBox="0 0 20 20" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Recommended &amp; Safe
                </h3>
                <ul className="list-none p-0 m-0 flex flex-col gap-3 pl-2">
                  <li className="relative pl-5 text-neutral-600">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    Soft microfiber or muslin cloth
                  </li>
                  <li className="relative pl-5 text-neutral-600">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    Mild soap and water (plain gold &amp; diamonds only)
                  </li>
                  <li className="relative pl-5 text-neutral-600">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    Soft baby toothbrush for plain metal jewellery
                  </li>
                </ul>
              </div>

              {/* Avoid */}
              <div className="bg-red-50/30 border border-red-100/50 rounded-xl p-6 md:p-8 flex flex-col gap-4">
                <h3 className="font-sans text-base font-semibold text-red-800 m-0 flex items-center gap-2">
                  <svg viewBox="0 0 20 20" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                  </svg>
                  Avoid Completely
                </h3>
                <ul className="list-none p-0 m-0 flex flex-col gap-3 pl-2">
                  <li className="relative pl-5 text-neutral-600">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    Ultrasonic or steam cleaners
                  </li>
                  <li className="relative pl-5 text-neutral-600">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    Toothpaste or baking soda
                  </li>
                  <li className="relative pl-5 text-neutral-600">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    Chlorine, bleach, and ammonia-based cleaners
                  </li>
                  <li className="relative pl-5 text-neutral-600">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    Silver dips on oxidised jewellery
                  </li>
                </ul>
              </div>

            </div>
          </section>

          {/* Best Practices & Professional Care */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <section className="bg-neutral-50/50 border border-neutral-100 rounded-xl p-6 md:p-8 flex flex-col gap-4">
              <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c89b3c]" /> Best Practices
              </h2>
              <ul className="list-none p-0 m-0 flex flex-col gap-3 pl-2">
                <li className="relative pl-5 text-neutral-600">
                  <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                  Remove jewellery before sleeping or swimming.
                </li>
                <li className="relative pl-5 text-neutral-600">
                  <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                  Avoid exposing jewellery to excessive heat or humidity.
                </li>
                <li className="relative pl-5 text-neutral-600">
                  <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                  Keep different jewellery pieces stored separately.
                </li>
                <li className="relative pl-5 text-neutral-600">
                  <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                  Make it a habit to wipe and store your jewellery after every use.
                </li>
              </ul>
            </section>

            <section className="bg-neutral-50/50 border border-neutral-100 rounded-xl p-6 md:p-8 flex flex-col gap-4">
              <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c89b3c]" /> Professional Care
              </h2>
              <ul className="list-none p-0 m-0 flex flex-col gap-3 pl-2">
                <li className="relative pl-5 text-neutral-600">
                  <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                  Get valuable jewellery inspected once a year.
                </li>
                <li className="relative pl-5 text-neutral-600">
                  <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                  Repair loose stones or damaged clasps immediately.
                </li>
                <li className="relative pl-5 text-neutral-600">
                  <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                  Professional polishing helps restore the original finish.
                </li>
              </ul>
            </section>

          </div>

        </div>

        {/* Final Note Quote */}
        <div className="mt-20 border-t border-neutral-100 pt-10 text-center">
          <p className="font-cormorant italic font-light text-xl md:text-2xl text-[#c89b3c] max-w-[650px] mx-auto leading-relaxed">
            &ldquo;Fine jewellery is an investment and an heirloom. With proper care, it will retain its beauty for generations.&rdquo;
          </p>
        </div>

      </main>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
