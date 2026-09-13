import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function CookiePolicyPage({ onBackToShop, onBackToHome, onNavigate, onCartClick }) {
  // Accordion state: single active expanded section or null (defaults to 'intro' or allows multiple/toggle)
  const [expandedSection, setExpandedSection] = useState('intro');

  // Cookie Preference Manager State
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem('cookie_preferences');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback default
      }
    }
    return {
      essential: true, // Always required
      functional: true,
      analytics: true,
      marketing: false,
    };
  });

  const [savedNotification, setSavedNotification] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleSection = (sectionKey) => {
    setExpandedSection((prev) => (prev === sectionKey ? null : sectionKey));
  };

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
    } else if (onBackToShop) {
      onBackToShop();
    }
  };

  const handleNav = (e, page) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.history.pushState(null, '', `/${page === 'home' ? '' : page}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleAcceptAll = () => {
    const updated = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(updated);
    localStorage.setItem('cookie_preferences', JSON.stringify(updated));
    showToast();
  };

  const handleRejectNonEssential = () => {
    const updated = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(updated);
    localStorage.setItem('cookie_preferences', JSON.stringify(updated));
    showToast();
  };

  const handleSaveCustomPreferences = () => {
    localStorage.setItem('cookie_preferences', JSON.stringify(preferences));
    showToast();
  };

  const showToast = () => {
    setSavedNotification(true);
    setTimeout(() => {
      setSavedNotification(false);
    }, 3200);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => {
      setCopiedLink(false);
    }, 2400);
  };

  return (
    <div className="cookie-policy-page min-h-screen bg-[#0D0A08] text-[#FAF4EE] flex flex-col justify-between font-sans selection:bg-[#C9AA6B]/30 selection:text-[#FAF4EE]">
      {/* Top Navigation */}
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

      <div className="w-full max-w-[1020px] mx-auto px-5 sm:px-8 md:px-12 pt-32 sm:pt-36 pb-24 text-[#D9C8B4] leading-relaxed">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-light text-[#8A7968]">
          <a href="/" onClick={(e) => handleNav(e, 'home')} className="hover:text-[#C9AA6B] transition-colors no-underline text-inherit">
            Home
          </a>
          <span>/</span>
          <span className="text-[#C9AA6B]">Cookie Policy</span>
        </nav>

        {/* 1. Header Section (.policy-header) */}
        <header className="policy-header border-b border-[#2E231A] pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#C9AA6B]" />
              <span className="text-[0.7rem] uppercase tracking-[0.24em] text-[#C9AA6B] font-medium">
                Transparency &amp; Privacy
              </span>
            </div>
            <h1 className="font-sans font-light text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#FAF4EE] m-0">
              Cookie &amp; Storage Policy
            </h1>
            <p className="text-xs sm:text-sm font-light text-[#8A7968] mt-3">
              Last Updated: <span className="text-[#C2B4A3]">September 12, 2026</span> • Effective Date: <span className="text-[#C2B4A3]">January 1, 2026</span>
            </p>
          </div>

          {/* Action Button: Copy / Share Policy Link */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#3A2E24] bg-[#16120F] hover:border-[#C9AA6B]/60 text-xs text-[#FAF4EE] font-medium tracking-wider transition-all duration-300 cursor-pointer shadow-sm"
              title="Copy link to clipboard"
            >
              <svg className="w-3.5 h-3.5 text-[#C9AA6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>{copiedLink ? 'Link Copied!' : 'Share Policy'}</span>
            </button>
          </div>
        </header>

        {/* 2. Main Content Area (.policy-content) */}
        <main className="policy-content flex flex-col gap-6">

          {/* Quick Consent Management Card with .policy-actions */}
          <div id="privacy-controller" className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#1C1714] to-[#140F0C] border border-[#2E231A] shadow-xl mb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg md:text-xl font-normal text-[#FAF4EE] m-0 tracking-wide">
                  Your Privacy Choices &amp; Data Storage
                </h2>
                <p className="text-xs md:text-sm text-[#C2B4A3] font-light mt-1.5 max-w-[620px]">
                  Ghadsiram Banwarilal &amp; Sons uses browser localStorage for essential shopping cart and login functionality. We do not use third-party advertising or analytics cookies.
                </p>
              </div>
              
              {/* Action Buttons (.policy-actions) */}
              <div className="policy-actions flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-5 py-2.5 rounded-full bg-[#C9AA6B] hover:bg-[#d8bc7e] text-[#0D0A08] text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-5 py-2.5 rounded-full border border-[#3A2E24] bg-transparent hover:bg-white/5 text-[#FAF4EE] text-xs font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer"
                >
                  Essential Only
                </button>
              </div>
            </div>

            {/* Toggle Controls Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#2E231A]">
              
              {/* Essential */}
              <div className="p-4 rounded-xl bg-[#0D0A08]/60 border border-[#261E17] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#FAF4EE] tracking-wide uppercase">Essential</span>
                    <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-[#C9AA6B]/20 text-[#C9AA6B] font-semibold">Always Active</span>
                  </div>
                  <p className="text-[0.75rem] text-[#A69584] font-light leading-snug">
                    Required for cart persistence (`ghadsiram_cart`), authentication state, and customer security.
                  </p>
                </div>
              </div>

              {/* Functional */}
              <div className="p-4 rounded-xl bg-[#0D0A08]/60 border border-[#261E17] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#FAF4EE] tracking-wide uppercase">Functional</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4.5 bg-[#2E231A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#C9AA6B]"></div>
                    </label>
                  </div>
                  <p className="text-[0.75rem] text-[#A69584] font-light leading-snug">
                    Saves your privacy choices and custom interface preferences locally on your device.
                  </p>
                </div>
              </div>

              {/* Analytics */}
              <div className="p-4 rounded-xl bg-[#0D0A08]/60 border border-[#261E17] flex flex-col justify-between opacity-80">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#FAF4EE] tracking-wide uppercase">Analytics</span>
                    <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-white/10 text-[#8A7968] font-semibold">Not In Use</span>
                  </div>
                  <p className="text-[0.75rem] text-[#8A7968] font-light leading-snug">
                    Currently inactive. No Google Analytics or third-party telemetry scripts are installed on this site.
                  </p>
                </div>
              </div>

              {/* Marketing */}
              <div className="p-4 rounded-xl bg-[#0D0A08]/60 border border-[#261E17] flex flex-col justify-between opacity-80">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#FAF4EE] tracking-wide uppercase">Marketing</span>
                    <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-white/10 text-[#8A7968] font-semibold">Not In Use</span>
                  </div>
                  <p className="text-[0.75rem] text-[#8A7968] font-light leading-snug">
                    Currently inactive. No advertising pixels, tracking cookies, or retargeting networks are active.
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={handleSaveCustomPreferences}
                className="text-xs text-[#C9AA6B] hover:text-[#FAF4EE] font-medium tracking-wider uppercase underline underline-offset-4 cursor-pointer bg-transparent border-none p-0"
              >
                Save Custom Preferences →
              </button>
            </div>
          </div>

          {/* Section 1: Introduction (.expandable-section) */}
          <section className="expandable-section border border-[#2E231A] rounded-2xl bg-[#16120F]/60 overflow-hidden transition-all duration-300">
            <button
              type="button"
              onClick={() => toggleSection('intro')}
              className="section-toggle-btn w-full px-6 md:px-8 py-5 flex items-center justify-between text-left bg-transparent border-none cursor-pointer outline-none group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#C9AA6B] tracking-widest uppercase">01</span>
                <h2 className="text-base md:text-lg font-medium text-[#FAF4EE] group-hover:text-[#C9AA6B] transition-colors m-0">
                  Introduction &amp; Local Storage Usage
                </h2>
              </div>
              <span className={`text-[#C9AA6B] transform transition-transform duration-300 ${expandedSection === 'intro' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedSection === 'intro' && (
              <div className="px-6 md:px-8 pb-8 pt-2 text-sm text-[#C2B4A3] flex flex-col gap-4 border-t border-[#2E231A]/60 font-light">
                <p>
                  At <strong>Ghadsiram Banwarilal &amp; Sons</strong> ("we," "us," or "our"), crafting fine jewellery has been our heritage for generations. In our digital storefront, we prioritize transparency, security, and customer privacy.
                </p>
                <p>
                  Our application does <strong>not</strong> use traditional browser tracking cookies. Instead, we use modern client-side browser <code>localStorage</code> to deliver a fast, private, and reliable shopping experience when you explore our boutique.
                </p>
                <div className="p-4 rounded-xl bg-[#0D0A08]/50 border border-[#2E231A]">
                  <h3 className="text-xs font-semibold text-[#FAF4EE] uppercase tracking-wider mb-1.5">
                    What is Local Storage?
                  </h3>
                  <p className="text-xs leading-relaxed text-[#A69584] m-0">
                    Local storage is a secure browser feature that allows a website to store small pieces of data locally on your device (such as your shopping cart items or login status). Unlike third-party tracking cookies, this data stays in your browser, is not transmitted across third-party advertisers, and remains under your direct control.
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Section 2: Types of Storage We Use (.expandable-section) */}
          <section className="expandable-section border border-[#2E231A] rounded-2xl bg-[#16120F]/60 overflow-hidden transition-all duration-300">
            <button
              type="button"
              onClick={() => toggleSection('types')}
              className="section-toggle-btn w-full px-6 md:px-8 py-5 flex items-center justify-between text-left bg-transparent border-none cursor-pointer outline-none group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#C9AA6B] tracking-widest uppercase">02</span>
                <h2 className="text-base md:text-lg font-medium text-[#FAF4EE] group-hover:text-[#C9AA6B] transition-colors m-0">
                  Storage Categories &amp; Status
                </h2>
              </div>
              <span className={`text-[#C9AA6B] transform transition-transform duration-300 ${expandedSection === 'types' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedSection === 'types' && (
              <div className="px-6 md:px-8 pb-8 pt-2 text-sm text-[#C2B4A3] flex flex-col gap-6 border-t border-[#2E231A]/60 font-light">
                <p>
                  Here is an accurate overview of data storage categories and their active status on our storefront:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Essential */}
                  <div className="p-5 rounded-xl bg-[#0D0A08]/50 border border-[#2E231A]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#C9AA6B]" />
                      <h3 className="text-sm font-semibold text-[#FAF4EE] uppercase tracking-wider m-0">
                        1. Essential Local Storage (Active)
                      </h3>
                    </div>
                    <p className="text-xs text-[#A69584] leading-relaxed m-0">
                      Indispensable for boutique functionality. Maintains your shopping cart (<code>ghadsiram_cart</code>) across navigation and securely retains Supabase authentication tokens so you stay signed in seamlessly.
                    </p>
                  </div>

                  {/* Functional */}
                  <div className="p-5 rounded-xl bg-[#0D0A08]/50 border border-[#2E231A]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      <h3 className="text-sm font-semibold text-[#FAF4EE] uppercase tracking-wider m-0">
                        2. Functional Preferences (Active)
                      </h3>
                    </div>
                    <p className="text-xs text-[#A69584] leading-relaxed m-0">
                      Stores your custom cookie/privacy preferences (<code>cookie_preferences</code>) so you do not have to reconfigure consent banners on return visits.
                    </p>
                  </div>

                  {/* Performance */}
                  <div className="p-5 rounded-xl bg-[#0D0A08]/50 border border-[#2E231A]/50 opacity-75">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#7A6A58]" />
                      <h3 className="text-sm font-semibold text-[#FAF4EE] uppercase tracking-wider m-0">
                        3. Analytics &amp; Telemetry (Not In Use)
                      </h3>
                    </div>
                    <p className="text-xs text-[#7A6A58] leading-relaxed m-0">
                      Not currently active. We do not embed Google Analytics, heatmaps, or third-party behavioral trackers. Reserved for future privacy-friendly analytics if introduced.
                    </p>
                  </div>

                  {/* Marketing */}
                  <div className="p-5 rounded-xl bg-[#0D0A08]/50 border border-[#2E231A]/50 opacity-75">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#7A6A58]" />
                      <h3 className="text-sm font-semibold text-[#FAF4EE] uppercase tracking-wider m-0">
                        4. Marketing &amp; Retargeting (Not In Use)
                      </h3>
                    </div>
                    <p className="text-xs text-[#7A6A58] leading-relaxed m-0">
                      Not currently active. We do not use third-party advertising pixels, Meta/Pinterest trackers, or commercial retargeting cookies.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Section 3: Detailed Local Storage Inventory Table (.expandable-section & .cookies-table) */}
          <section className="expandable-section border border-[#2E231A] rounded-2xl bg-[#16120F]/60 overflow-hidden transition-all duration-300">
            <button
              type="button"
              onClick={() => toggleSection('table')}
              className="section-toggle-btn w-full px-6 md:px-8 py-5 flex items-center justify-between text-left bg-transparent border-none cursor-pointer outline-none group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#C9AA6B] tracking-widest uppercase">03</span>
                <h2 className="text-base md:text-lg font-medium text-[#FAF4EE] group-hover:text-[#C9AA6B] transition-colors m-0">
                  Data Storage Inventory Table
                </h2>
              </div>
              <span className={`text-[#C9AA6B] transform transition-transform duration-300 ${expandedSection === 'table' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedSection === 'table' && (
              <div className="px-6 md:px-8 pb-8 pt-2 text-sm text-[#C2B4A3] flex flex-col gap-4 border-t border-[#2E231A]/60 font-light">
                <p>
                  The following table details the actual client-side storage keys utilized across our e-commerce platform:
                </p>

                {/* Table Container (.cookies-table) */}
                <div className="overflow-x-auto rounded-xl border border-[#2E231A] bg-[#0D0A08]/80">
                  <table className="cookies-table w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#2E231A] bg-[#16120F] text-[#FAF4EE]">
                        <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[0.7rem] text-[#C9AA6B]">Storage Key</th>
                        <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[0.7rem] text-[#C9AA6B]">Category / Type</th>
                        <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[0.7rem] text-[#C9AA6B]">Purpose &amp; Description</th>
                        <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[0.7rem] text-[#C9AA6B]">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2E231A]/60 text-[#D9C8B4]">
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 font-mono text-[#FAF4EE] font-medium">ghadsiram_cart</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-[#C9AA6B]/15 text-[#C9AA6B] text-[0.65rem] font-semibold uppercase">Essential (Local Storage)</span></td>
                        <td className="py-3 px-4">Retains selected jewelry pieces, sizes, and quantities in your shopping bag.</td>
                        <td className="py-3 px-4 text-[#A69584]">Persistent (until cleared)</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 font-mono text-[#FAF4EE] font-medium">isLoggedIn</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-[#C9AA6B]/15 text-[#C9AA6B] text-[0.65rem] font-semibold uppercase">Essential (Local Storage)</span></td>
                        <td className="py-3 px-4">Stores client authentication login status locally for smooth page transitions.</td>
                        <td className="py-3 px-4 text-[#A69584]">Persistent (cleared on logout)</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 font-mono text-[#FAF4EE] font-medium">cookie_preferences</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-[#C9AA6B]/15 text-[#C9AA6B] text-[0.65rem] font-semibold uppercase">Essential (Local Storage)</span></td>
                        <td className="py-3 px-4">Stores your privacy choices and custom consent selections made on this page.</td>
                        <td className="py-3 px-4 text-[#A69584]">Persistent</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 font-mono text-[#FAF4EE] font-medium">sb-*-auth-token</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-[#C9AA6B]/15 text-[#C9AA6B] text-[0.65rem] font-semibold uppercase">Essential (Local Storage)</span></td>
                        <td className="py-3 px-4">Supabase Auth session token securely stored to maintain verified account login.</td>
                        <td className="py-3 px-4 text-[#A69584]">Session / Supabase Managed</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          {/* Section 4: Third-Party Services (.expandable-section) */}
          <section className="expandable-section border border-[#2E231A] rounded-2xl bg-[#16120F]/60 overflow-hidden transition-all duration-300">
            <button
              type="button"
              onClick={() => toggleSection('thirdParty')}
              className="section-toggle-btn w-full px-6 md:px-8 py-5 flex items-center justify-between text-left bg-transparent border-none cursor-pointer outline-none group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#C9AA6B] tracking-widest uppercase">04</span>
                <h2 className="text-base md:text-lg font-medium text-[#FAF4EE] group-hover:text-[#C9AA6B] transition-colors m-0">
                  Third-Party Services &amp; Infrastructure
                </h2>
              </div>
              <span className={`text-[#C9AA6B] transform transition-transform duration-300 ${expandedSection === 'thirdParty' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedSection === 'thirdParty' && (
              <div className="px-6 md:px-8 pb-8 pt-2 text-sm text-[#C2B4A3] flex flex-col gap-5 border-t border-[#2E231A]/60 font-light">
                <p>
                  We strive to keep our technology stack minimal, private, and focused solely on delivering jewellery craftsmanship:
                </p>

                <ul className="list-none p-0 m-0 flex flex-col gap-3.5 pl-2">
                  <li className="relative pl-5 text-xs sm:text-sm text-[#D9C8B4]">
                    <span className="absolute left-0 text-[#C9AA6B] font-bold">◆</span>
                    <strong className="text-[#FAF4EE] font-normal">Supabase Backend &amp; Auth:</strong> Used for secure cloud database operations, Google OAuth customer login, and profile storage. Supabase manages authenticated sessions on the client device without commercial ad tracking.
                  </li>
                  <li className="relative pl-5 text-xs sm:text-sm text-[#D9C8B4]">
                    <span className="absolute left-0 text-[#C9AA6B] font-bold">◆</span>
                    <strong className="text-[#FAF4EE] font-normal">No Analytics or Ad Trackers:</strong> We do not load Google Analytics, Meta Pixel, Pinterest tags, or any third-party marketing beacons on this website.
                  </li>
                  <li className="relative pl-5 text-xs sm:text-sm text-[#D9C8B4]">
                    <span className="absolute left-0 text-[#C9AA6B] font-bold">◆</span>
                    <strong className="text-[#FAF4EE] font-normal">Typography &amp; Static Assets:</strong> Fonts and assets are packaged within the application bundle without third-party tracking cookies.
                  </li>
                </ul>
              </div>
            )}
          </section>

          {/* Section 5: User Control & How to Manage (.expandable-section) */}
          <section className="expandable-section border border-[#2E231A] rounded-2xl bg-[#16120F]/60 overflow-hidden transition-all duration-300">
            <button
              type="button"
              onClick={() => toggleSection('userControl')}
              className="section-toggle-btn w-full px-6 md:px-8 py-5 flex items-center justify-between text-left bg-transparent border-none cursor-pointer outline-none group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#C9AA6B] tracking-widest uppercase">05</span>
                <h2 className="text-base md:text-lg font-medium text-[#FAF4EE] group-hover:text-[#C9AA6B] transition-colors m-0">
                  User Control &amp; Managing Local Storage
                </h2>
              </div>
              <span className={`text-[#C9AA6B] transform transition-transform duration-300 ${expandedSection === 'userControl' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedSection === 'userControl' && (
              <div className="px-6 md:px-8 pb-8 pt-2 text-sm text-[#C2B4A3] flex flex-col gap-5 border-t border-[#2E231A]/60 font-light">
                <p>
                  You have full control over data stored in your browser. You can manage your preferences directly using our <a href="#privacy-controller" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 120, behavior: 'smooth' }); }} className="text-[#C9AA6B] underline font-normal">Data &amp; Privacy Controller</a> above, or clear your browser's site data and local storage at any time.
                </p>

                <div className="p-4 rounded-xl bg-[#0D0A08]/50 border border-[#2E231A]">
                  <h3 className="text-xs font-semibold text-[#FAF4EE] uppercase tracking-wider mb-2">
                    Browser Data Management Guides:
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-[#16120F] border border-[#2E231A] hover:border-[#C9AA6B]/50 text-[#D9C8B4] hover:text-[#FAF4EE] transition-all no-underline text-center">
                      Google Chrome ↗
                    </a>
                    <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-[#16120F] border border-[#2E231A] hover:border-[#C9AA6B]/50 text-[#D9C8B4] hover:text-[#FAF4EE] transition-all no-underline text-center">
                      Apple Safari ↗
                    </a>
                    <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-[#16120F] border border-[#2E231A] hover:border-[#C9AA6B]/50 text-[#D9C8B4] hover:text-[#FAF4EE] transition-all no-underline text-center">
                      Mozilla Firefox ↗
                    </a>
                    <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-[#16120F] border border-[#2E231A] hover:border-[#C9AA6B]/50 text-[#D9C8B4] hover:text-[#FAF4EE] transition-all no-underline text-center">
                      Microsoft Edge ↗
                    </a>
                  </div>
                </div>

                <div className="text-xs text-[#A69584] leading-relaxed p-3.5 rounded-lg bg-[#2E231A]/30 border-l-2 border-[#C9AA6B]">
                  <strong>Note on Clearing Local Storage:</strong> Clearing local storage will empty your active shopping bag items and log you out of your session on this browser.
                </div>
              </div>
            )}
          </section>

          {/* Section 6: Data Protection & User Rights (.expandable-section) */}
          <section className="expandable-section border border-[#2E231A] rounded-2xl bg-[#16120F]/60 overflow-hidden transition-all duration-300">
            <button
              type="button"
              onClick={() => toggleSection('dataProtection')}
              className="section-toggle-btn w-full px-6 md:px-8 py-5 flex items-center justify-between text-left bg-transparent border-none cursor-pointer outline-none group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#C9AA6B] tracking-widest uppercase">06</span>
                <h2 className="text-base md:text-lg font-medium text-[#FAF4EE] group-hover:text-[#C9AA6B] transition-colors m-0">
                  Data Protection, GDPR &amp; Global Compliance
                </h2>
              </div>
              <span className={`text-[#C9AA6B] transform transition-transform duration-300 ${expandedSection === 'dataProtection' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedSection === 'dataProtection' && (
              <div className="px-6 md:px-8 pb-8 pt-2 text-sm text-[#C2B4A3] flex flex-col gap-4 border-t border-[#2E231A]/60 font-light">
                <p>
                  We are dedicated to safeguarding client privacy in adherence to the <strong>General Data Protection Regulation (GDPR)</strong>, the <strong>ePrivacy Directive</strong>, the <strong>Digital Personal Data Protection Act (DPDP Act, India)</strong>, and the <strong>California Consumer Privacy Act (CCPA)</strong>.
                </p>
                <ul className="list-none p-0 m-0 flex flex-col gap-2.5 pl-2">
                  <li className="relative pl-5 text-xs sm:text-sm text-[#D9C8B4]">
                    <span className="absolute left-0 text-[#C9AA6B]">✦</span>
                    <strong>Right to Access &amp; Portability:</strong> Request details regarding any personal data associated with cookies stored during your visits.
                  </li>
                  <li className="relative pl-5 text-xs sm:text-sm text-[#D9C8B4]">
                    <span className="absolute left-0 text-[#C9AA6B]">✦</span>
                    <strong>Right to Withdraw Consent:</strong> Update your consent choices anytime without penalty or loss of basic browsing access.
                  </li>
                  <li className="relative pl-5 text-xs sm:text-sm text-[#D9C8B4]">
                    <span className="absolute left-0 text-[#C9AA6B]">✦</span>
                    <strong>Right to Erasure (Right to be Forgotten):</strong> Request the permanent purge of your client telemetry or account identifiers.
                  </li>
                </ul>
              </div>
            )}
          </section>

          {/* Section 7: Contact Us & Privacy Desk (.expandable-section) */}
          <section className="expandable-section border border-[#2E231A] rounded-2xl bg-[#16120F]/60 overflow-hidden transition-all duration-300">
            <button
              type="button"
              onClick={() => toggleSection('contact')}
              className="section-toggle-btn w-full px-6 md:px-8 py-5 flex items-center justify-between text-left bg-transparent border-none cursor-pointer outline-none group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#C9AA6B] tracking-widest uppercase">07</span>
                <h2 className="text-base md:text-lg font-medium text-[#FAF4EE] group-hover:text-[#C9AA6B] transition-colors m-0">
                  Contact Us &amp; Privacy Desk
                </h2>
              </div>
              <span className={`text-[#C9AA6B] transform transition-transform duration-300 ${expandedSection === 'contact' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedSection === 'contact' && (
              <div className="px-6 md:px-8 pb-8 pt-2 text-sm text-[#C2B4A3] flex flex-col gap-5 border-t border-[#2E231A]/60 font-light">
                <p>
                  If you have questions, feedback, or wish to exercise your data rights concerning our cookie deployment, our dedicated Client Concierge and Privacy Desk are at your service:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#0D0A08]/50 border border-[#2E231A]">
                    <h3 className="text-xs font-semibold text-[#C9AA6B] uppercase tracking-wider mb-1">
                      Email Privacy Desk
                    </h3>
                    <a href="mailto:privacy@ghadsirambanwarilalandsons.com" className="text-xs text-[#FAF4EE] hover:underline font-mono">
                      privacy@ghadsirambanwarilalandsons.com
                    </a>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0D0A08]/50 border border-[#2E231A]">
                    <h3 className="text-xs font-semibold text-[#C9AA6B] uppercase tracking-wider mb-1">
                      Studio &amp; Flagship Store
                    </h3>
                    <p className="text-xs text-[#A69584] m-0">
                      306, Shree Shiv Nagar, Nayla Road, Jaisinghpura Khor, Jaipur – 302027
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <a
                    href="/contact"
                    onClick={(e) => handleNav(e, 'contact')}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C9AA6B] hover:bg-[#d8bc7e] text-[#0D0A08] text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer no-underline shadow-md"
                  >
                    <span>Contact Concierge</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            )}
          </section>

        </main>

        {/* 3. Policy Footer (.policy-footer) */}
        <footer className="policy-footer mt-16 pt-8 border-t border-[#2E231A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-[#8A7968]">
          <div className="flex items-center gap-2">
            <span>© 2026 Ghadsiram Banwarilal &amp; Sons.</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              onClick={(e) => handleNav(e, 'privacy')}
              className="text-[#C9AA6B] hover:text-[#FAF4EE] transition-colors no-underline"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              onClick={(e) => handleNav(e, 'terms')}
              className="text-[#C9AA6B] hover:text-[#FAF4EE] transition-colors no-underline"
            >
              Terms of Service
            </a>
            <a
              href="/contact"
              onClick={(e) => handleNav(e, 'contact')}
              className="text-[#C9AA6B] hover:text-[#FAF4EE] transition-colors no-underline"
            >
              Contact Us
            </a>
          </div>
        </footer>

        {/* Floating Save Notification Toast */}
        {savedNotification && (
          <div className="fixed bottom-8 right-8 z-50 px-5 py-3 rounded-xl bg-[#1C1714] border border-[#C9AA6B]/50 text-[#FAF4EE] text-xs font-medium shadow-2xl flex items-center gap-3 animate-fade-in-up">
            <svg className="w-4 h-4 text-[#C9AA6B]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Your cookie preferences have been successfully updated.</span>
          </div>
        )}
      </div>

      {/* Global Site Footer */}
      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
