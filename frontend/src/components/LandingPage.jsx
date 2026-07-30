import React from 'react';
import Navbar from './Navbar';

export default function LandingPage() {
  return (
    <div className="relative w-full min-h-screen bg-white text-mahogany-dark font-sans flex flex-col justify-between overflow-x-hidden">
      
      {/* Top Hero Container (Background image + dark overlay) - full screen height */}
      <div className="relative w-full min-h-screen flex flex-col justify-between bg-[url('/background.jpeg')] bg-no-repeat bg-center bg-cover text-cream-light pb-12">
        {/* Dark vignette overlay for contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(21,3,5,0.72)_0%,rgba(12,2,3,0.92)_85%,#050001_100%)] pointer-events-none z-1" />

        {/* Elegant Header / Navigation */}
        <Navbar />

        {/* Hero Area - centered vertically */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-[4%] text-center max-w-[800px] mx-auto py-12">
          <section className="text-center">
            <h3 className="font-serif italic text-xl md:text-3xl font-normal tracking-[0.1em] text-[#c6a076] m-0 mb-7 opacity-0 animate-hero-fade-in-up-2">
              Curating Eternal Masterpieces
            </h3>
            <p className="text-[0.85rem] md:text-[1.05rem] leading-[1.8] text-cream-dark mb-9 opacity-0 animate-hero-fade-in-up-3">
              Indulge in our exquisite collection of hand-crafted gold and polki ornaments, where century-old Indian heritage meets the finest contemporary design.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6 opacity-0 animate-hero-fade-in-up-4 items-center">
              <button className="font-display text-[0.8rem] font-semibold tracking-[0.18em] uppercase text-mahogany-dark bg-gradient-to-br from-[#fbe8d0] via-gold-primary to-[#9a7550] border-none py-3.5 px-9 rounded-[2px] cursor-pointer hover:translate-y-[-2px] hover:brightness-108 hover:shadow-[0_6px_25px_rgba(212,175,55,0.3)] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">Explore Collections</button>
              <button className="font-display text-[0.8rem] font-medium tracking-[0.18em] uppercase text-[#fff6ea] bg-white/3 border border-white/20 backdrop-blur-[8px] py-3.5 px-9 rounded-[2px] cursor-pointer hover:bg-white/8 hover:border-[#c6a076] hover:translate-y-[-2px] transition-all duration-400">Heritage Story</button>
            </div>
          </section>
        </div>
      </div>

      {/* Main Content Area (White background) */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center py-20 px-[4%] w-full box-border bg-white text-mahogany-dark">
        {/* Categories / Showcase section */}
        <section className="w-full max-w-[1200px] mb-12 opacity-0 animate-hero-fade-in-up-5" id="collections">
          <div className="flex items-center justify-center gap-5 mb-12">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#c6a076]/40 to-transparent"></div>
            <h4 className="font-display text-[1rem] md:text-[1.35rem] font-medium tracking-[0.28em] uppercase text-gold-dark m-0">Signature Collections</h4>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#c6a076]/40 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2.2rem] w-full">
            {/* Card 1 */}
            <div className="relative bg-[#fcfbfa] hover:bg-white border border-[#c6a076]/25 rounded-sm py-12 px-9 overflow-hidden hover:translate-y-[-8px] hover:border-gold-primary/70 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08),0_0_15px_rgba(212,175,55,0.15)] transition-all duration-600 box-border group">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/5 to-transparent pointer-events-none transition-opacity duration-600" />
              <div className="relative z-2">
                <span className="font-display text-[0.7rem] font-semibold tracking-[0.26em] text-[#c6a076] block mb-3.5 uppercase">POLKI &amp; KUNDAN</span>
                <h5 className="font-display text-[1.3rem] font-medium tracking-[0.12em] text-mahogany-dark m-0 mb-4 group-hover:text-gold-dark transition-colors duration-400">Imperial Treasures</h5>
                <p className="text-[0.88rem] leading-[1.7] text-neutral-600 mb-8">
                  Ornate traditional bridal jewelry set in pure gold with uncut diamonds and precious gemstones.
                </p>
                <a href="#kundan" className="font-display text-[0.78rem] font-semibold tracking-[0.12em] text-gold-dark hover:text-[#fff6ea] hover:tracking-[0.16em] uppercase no-underline transition-all duration-300">Explore Collection ➔</a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative bg-[#fcfbfa] hover:bg-white border border-[#c6a076]/25 rounded-sm py-12 px-9 overflow-hidden hover:translate-y-[-8px] hover:border-gold-primary/70 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08),0_0_15px_rgba(212,175,55,0.15)] transition-all duration-600 box-border group">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/5 to-transparent pointer-events-none transition-opacity duration-600" />
              <div className="relative z-2">
                <span className="font-display text-[0.7rem] font-semibold tracking-[0.26em] text-[#c6a076] block mb-3.5 uppercase">ANTIQUE GOLD</span>
                <h5 className="font-display text-[1.3rem] font-medium tracking-[0.12em] text-mahogany-dark m-0 mb-4 group-hover:text-gold-dark transition-colors duration-400">Heritage Classics</h5>
                <p className="text-[0.88rem] leading-[1.7] text-neutral-600 mb-8">
                  Intricately detailed designs reviving the royal aesthetics of the Indian princely heritage era.
                </p>
                <a href="#antique" className="font-display text-[0.78rem] font-semibold tracking-[0.12em] text-gold-dark hover:text-[#fff6ea] hover:tracking-[0.16em] uppercase no-underline transition-all duration-300">Explore Collection ➔</a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative bg-[#fcfbfa] hover:bg-white border border-[#c6a076]/25 rounded-sm py-12 px-9 overflow-hidden hover:translate-y-[-8px] hover:border-gold-primary/70 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08),0_0_15px_rgba(212,175,55,0.15)] transition-all duration-600 box-border group">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/5 to-transparent pointer-events-none transition-opacity duration-600" />
              <div className="relative z-2">
                <span className="font-display text-[0.7rem] font-semibold tracking-[0.26em] text-[#c6a076] block mb-3.5 uppercase">FINE DIAMONDS</span>
                <h5 className="font-display text-[1.3rem] font-medium tracking-[0.12em] text-mahogany-dark m-0 mb-4 group-hover:text-gold-dark transition-colors duration-400">Modern Royal Splendour</h5>
                <p className="text-[0.88rem] leading-[1.7] text-neutral-600 mb-8">
                  Exquisite diamond collections reflecting brilliant craftsmanship and timeless luxury elegance.
                </p>
                <a href="#diamonds" className="font-display text-[0.78rem] font-semibold tracking-[0.12em] text-gold-dark hover:text-[#fff6ea] hover:tracking-[0.16em] uppercase no-underline transition-all duration-300">Explore Collection ➔</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (White background) */}
      <footer className="relative z-10 px-[4%] pb-12 w-full box-border text-center bg-white text-mahogany-dark">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c6a076]/30 to-transparent mb-9" />
        <div className="flex flex-col items-center gap-3">
          <div className="font-display text-[0.85rem] font-semibold tracking-[0.36em] text-[#c6a076]">GHADSIRAM BANWARILAL &amp; SONS</div>
          <div className="text-[0.78rem] tracking-[0.12em] text-neutral-600">Delhi &bull; Mumbai &bull; Jaipur &bull; London</div>
          <div className="text-[0.7rem] tracking-[0.08em] text-neutral-400">
            &copy; 2026 Ghadsiram Banwarilal &amp; Sons. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
