import React from 'react';

export default function Navbar() {
  return (
    <header className="relative z-10 flex justify-between items-center py-6 px-4 md:px-8 bg-gradient-to-b from-[rgba(5,0,1,0.9)] to-transparent animate-navbar-entrance">
      <div className="flex items-center gap-3">
        {/* Decoupled logo: Removed circle background & border */}
        <img
          src="/flowers.png"
          alt="Ghadsiram Mark"
          className="w-10 h-10 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:rotate-[360deg]"
        />
        <span className="font-display font-semibold text-xl tracking-[0.22em] bg-gradient-to-r from-[#fff6ea] to-[#c6a076] bg-clip-text text-transparent">
          GHADSIRAM
        </span>
      </div>
      <div className="flex items-center gap-[1.8rem]">
        <a
          href="#shop"
          className="font-display text-[0.85rem] font-medium tracking-[0.18em] text-[#d9bd93] hover:text-[#fff6ea] uppercase transition-colors duration-300"
        >
          Shop
        </a>

        <button
          className="font-display text-[0.85rem] font-medium tracking-[0.18em] text-[#d9bd93] hover:text-[#fff6ea] uppercase bg-transparent border-none cursor-pointer p-0 transition-colors duration-300"
        >
          Book an Appointment
        </button>

        <button
          className="bg-transparent border-none cursor-pointer p-1.5 flex items-center justify-center"
          title="Cart"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#c6a076] hover:fill-[#fff6ea] hover:scale-110 hover:rotate-12 transition-all duration-300">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
