import React, { useState } from 'react';

export default function Footer({ onBrandClick, noBorder, style, onNavigate }) {
  const [email, setEmail] = useState('');

  const handleBrandClick = () => {
    if (onBrandClick) {
      onBrandClick();
    } else if (onNavigate) {
      onNavigate('home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNav = (e, page) => {
    e.preventDefault();
    if (onNavigate) onNavigate(page);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer
      className={`w-full bg-[#0D0A08] text-[#FAF4EE] px-6 md:px-12 lg:px-20 pt-10 pb-0 box-border ${noBorder ? '' : 'border-t border-[#c89b3c]/20'}`}
      style={style}
    >
      {/* Main Grid */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pt-2 pb-12">

        {/* Col 1: Brand */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleBrandClick}
            className="bg-transparent border-none cursor-pointer p-0 text-left outline-none focus:outline-none w-fit"
          >
            <span
              className="font-display font-semibold text-xl tracking-[0.18em] uppercase"
              style={{ color: '#C9AA6B' }}
            >
              GHADSIRAM
            </span>
          </button>
          <p className="text-[0.83rem] font-light leading-[1.7] text-[#A69280] m-0 max-w-[200px]">
            Fine jewelry, crafted with care and kept for a lifetime.
          </p>
        </div>

        {/* Col 2: Shop */}
        <div className="flex flex-col gap-3">
          <h4 className="font-sans text-[0.72rem] font-semibold tracking-[0.22em] text-[#C9AA6B] uppercase m-0">
            Shop
          </h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
            {[
              { label: 'Necklaces & Pendants', page: 'shop' },
              { label: 'Pounchi & Bracelets', page: 'shop' },
              { label: 'Polki & Kundan Chokers', page: 'shop' },
              { label: 'The Collection', page: 'shop' },
              { label: 'Size Guide', page: 'size-guide' },
              { label: 'Care Guide', page: 'care-guide' },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={`/${item.page}`}
                  onClick={(e) => handleNav(e, item.page)}
                  className="text-[0.84rem] font-light text-[#D9C8B4] hover:text-[#C9AA6B] transition-colors no-underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Company */}
        <div className="flex flex-col gap-3">
          <h4 className="font-sans text-[0.72rem] font-semibold tracking-[0.22em] text-[#C9AA6B] uppercase m-0">
            Company
          </h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
            {[
              { label: 'Heritage & Craft', page: 'about' },
              { label: 'Private Appointment', page: 'appointment' },
              { label: 'Studio & Contact', page: 'contact' },
              { label: 'Cookie Policy', page: 'cookies' },
              { label: 'Privacy Policy', page: 'privacy' },
              { label: 'Terms of Service', page: 'terms' },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={`/${item.page}`}
                  onClick={(e) => handleNav(e, item.page)}
                  className="text-[0.84rem] font-light text-[#D9C8B4] hover:text-[#C9AA6B] transition-colors no-underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: The List (Newsletter) */}
        <div className="flex flex-col gap-3">
          <h4 className="font-sans text-[0.72rem] font-semibold tracking-[0.22em] text-[#C9AA6B] uppercase m-0">
            The List
          </h4>
          <form onSubmit={handleEmailSubmit} className="flex items-center rounded-full border border-[#3A2E24] bg-[#16120F] mt-1 p-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 bg-transparent border-none outline-none text-[0.82rem] text-[#D9C8B4] placeholder-[#5A4C3D] px-3 py-2 font-light min-w-0"
              required
            />
            <button
              type="submit"
              className="px-5 py-2 text-[0.78rem] font-semibold tracking-[0.14em] uppercase rounded-full cursor-pointer border-none shrink-0"
              style={{ background: '#C9AA6B', color: '#0D0A08' }}
            >
              Join
            </button>
          </form>
          <p className="text-[0.75rem] font-light text-[#5A4C3D] m-0 leading-[1.6]">
            Subscribe for new arrivals and exclusive offers.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://www.instagram.com/ghadsirambanwarilal_and_sons?igsh=MWxqcjJkajl5amUxOA=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5A4C3D] no-underline text-[0.78rem] font-light"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/share/1Fkzhfq39T/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5A4C3D] no-underline text-[0.78rem] font-light"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1200px] mx-auto border-t border-[#1E1812] flex flex-col sm:flex-row items-center justify-between gap-2 py-4 pb-10">
        <span className="text-[0.72rem] font-light text-[#5A4C3D] tracking-[0.1em]">
          © Ghadsiram Banwarilal &amp; Sons 2026 — All rights reserved.
        </span>
        <div className="flex items-center gap-5">
          <a
            href="/privacy"
            onClick={(e) => handleNav(e, 'privacy')}
            className="text-[0.72rem] font-light text-[#5A4C3D] hover:text-[#C9AA6B] transition-colors no-underline"
          >
            Privacy
          </a>
          <a
            href="/terms"
            onClick={(e) => handleNav(e, 'terms')}
            className="text-[0.72rem] font-light text-[#5A4C3D] hover:text-[#C9AA6B] transition-colors no-underline"
          >
            Terms
          </a>
          <a
            href="/cookies"
            onClick={(e) => handleNav(e, 'cookies')}
            className="text-[0.72rem] font-light text-[#5A4C3D] hover:text-[#C9AA6B] transition-colors no-underline"
          >
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
}
