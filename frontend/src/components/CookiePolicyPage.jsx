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
              Cookie Policy
            </h1>
            <p className="text-xs sm:text-sm font-light text-[#8A7968] mt-3">
              Last Updated: <span className="text-[#C2B4A3]">August 29, 2026</span> • Effective Date: <span className="text-[#C2B4A3]">January 1, 2026</span>
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
                  Your Privacy Choices &amp; Cookie Preferences
                </h2>
                <p className="text-xs md:text-sm text-[#C2B4A3] font-light mt-1.5 max-w-[620px]">
                  Control which cookies Ghadsiram Banwarilal &amp; Sons is permitted to store on your device. You can modify these settings anytime.
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
                  Reject Non-Essential
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
                    Required for cart persistence, login security, checkout processing, and CSRF protection.
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
                    Remembers your currency selection, size guides, and personalized jewellery preferences.
                  </p>
                </div>
              </div>

              {/* Analytics */}
              <div className="p-4 rounded-xl bg-[#0D0A08]/60 border border-[#261E17] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#FAF4EE] tracking-wide uppercase">Analytics</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4.5 bg-[#2E231A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#C9AA6B]"></div>
                    </label>
                  </div>
                  <p className="text-[0.75rem] text-[#A69584] font-light leading-snug">
                    Allows us to measure traffic, popular jewellery designs, page performance, and site speed.
                  </p>
                </div>
              </div>

              {/* Marketing */}
              <div className="p-4 rounded-xl bg-[#0D0A08]/60 border border-[#261E17] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#FAF4EE] tracking-wide uppercase">Marketing</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4.5 bg-[#2E231A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#C9AA6B]"></div>
                    </label>
                  </div>
                  <p className="text-[0.75rem] text-[#A69584] font-light leading-snug">
                    Helps deliver relevant jewellery showcase announcements and exclusive heritage offers.
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
                  Introduction &amp; What Are Cookies
                </h2>
              </div>
              <span className={`text-[#C9AA6B] transform transition-transform duration-300 ${expandedSection === 'intro' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedSection === 'intro' && (
              <div className="px-6 md:px-8 pb-8 pt-2 text-sm text-[#C2B4A3] flex flex-col gap-4 border-t border-[#2E231A]/60 font-light">
                <p>
                  At <strong>Ghadsiram Banwarilal &amp; Sons</strong> ("we," "us," or "our"), crafting fine signature gold, diamond, and silver jewellery has been our heritage for generations. As with our handmade creations, our digital storefront strives to provide a seamless, secure, and personalized experience.
                </p>
                <p>
                  This Cookie Policy explains what cookies and similar tracking technologies (such as web beacons, pixels, and local storage) are, why we use them, and how you have complete control over their deployment while exploring <a href="https://www.ghadsirambanwarilalandsons.com" className="text-[#C9AA6B] hover:underline no-underline font-normal">www.ghadsirambanwarilalandsons.com</a>.
                </p>
                <div className="p-4 rounded-xl bg-[#0D0A08]/50 border border-[#2E231A]">
                  <h3 className="text-xs font-semibold text-[#FAF4EE] uppercase tracking-wider mb-1.5">
                    What is a Cookie?
                  </h3>
                  <p className="text-xs leading-relaxed text-[#A69584] m-0">
                    A cookie is a small text file containing a string of characters that is placed on your browser or device when you visit a website. Cookies allow the website to recognize your browser, remember your preferences (such as your shopping bag or currency), and deliver a faster, more secure browsing journey.
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Section 2: Types of Cookies We Use (.expandable-section) */}
          <section className="expandable-section border border-[#2E231A] rounded-2xl bg-[#16120F]/60 overflow-hidden transition-all duration-300">
            <button
              type="button"
              onClick={() => toggleSection('types')}
              className="section-toggle-btn w-full px-6 md:px-8 py-5 flex items-center justify-between text-left bg-transparent border-none cursor-pointer outline-none group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#C9AA6B] tracking-widest uppercase">02</span>
                <h2 className="text-base md:text-lg font-medium text-[#FAF4EE] group-hover:text-[#C9AA6B] transition-colors m-0">
                  Types of Cookies We Use
                </h2>
              </div>
              <span className={`text-[#C9AA6B] transform transition-transform duration-300 ${expandedSection === 'types' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedSection === 'types' && (
              <div className="px-6 md:px-8 pb-8 pt-2 text-sm text-[#C2B4A3] flex flex-col gap-6 border-t border-[#2E231A]/60 font-light">
                <p>
                  We categorize the cookies operating across our platform into four fundamental classifications:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Essential */}
                  <div className="p-5 rounded-xl bg-[#0D0A08]/50 border border-[#2E231A]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#C9AA6B]" />
                      <h3 className="text-sm font-semibold text-[#FAF4EE] uppercase tracking-wider m-0">
                        1. Essential Cookies (Strictly Necessary)
                      </h3>
                    </div>
                    <p className="text-xs text-[#A69584] leading-relaxed m-0">
                      These cookies are indispensable for our boutique website to function securely and reliably. They maintain your shopping cart across page navigation, secure your account authentication, process payments through encrypted gateways, and safeguard against fraudulent activities.
                    </p>
                  </div>

                  {/* Performance */}
                  <div className="p-5 rounded-xl bg-[#0D0A08]/50 border border-[#2E231A]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#A67C1E]" />
                      <h3 className="text-sm font-semibold text-[#FAF4EE] uppercase tracking-wider m-0">
                        2. Performance &amp; Analytics Cookies
                      </h3>
                    </div>
                    <p className="text-xs text-[#A69584] leading-relaxed m-0">
                      These cookies collect aggregate, anonymous statistics about how connoisseurs navigate our boutique—such as which jewellery collections are most revered, average session times, and error occurrences. This helps us optimize site performance and loading speeds.
                    </p>
                  </div>

                  {/* Functional */}
                  <div className="p-5 rounded-xl bg-[#0D0A08]/50 border border-[#2E231A]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      <h3 className="text-sm font-semibold text-[#FAF4EE] uppercase tracking-wider m-0">
                        3. Functional &amp; Preference Cookies
                      </h3>
                    </div>
                    <p className="text-xs text-[#A69584] leading-relaxed m-0">
                      Functional cookies enable enhanced customization. They remember choices you make (such as preferred currency, recently viewed jewellery items, ring/bangle size selections, and appointment booking drafts) so you do not have to re-enter them on return visits.
                    </p>
                  </div>

                  {/* Marketing */}
                  <div className="p-5 rounded-xl bg-[#0D0A08]/50 border border-[#2E231A]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#C89B3C]" />
                      <h3 className="text-sm font-semibold text-[#FAF4EE] uppercase tracking-wider m-0">
                        4. Marketing &amp; Retargeting Cookies
                      </h3>
                    </div>
                    <p className="text-xs text-[#A69584] leading-relaxed m-0">
                      Used to deliver bespoke advertisements and showcase curated collections tailored to your aesthetic interests across third-party networks (such as Instagram or Google). They also limit ad frequency and help measure campaign efficacy.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Section 3: Detailed Cookie Inventory Table (.expandable-section & .cookies-table) */}
          <section className="expandable-section border border-[#2E231A] rounded-2xl bg-[#16120F]/60 overflow-hidden transition-all duration-300">
            <button
              type="button"
              onClick={() => toggleSection('table')}
              className="section-toggle-btn w-full px-6 md:px-8 py-5 flex items-center justify-between text-left bg-transparent border-none cursor-pointer outline-none group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#C9AA6B] tracking-widest uppercase">03</span>
                <h2 className="text-base md:text-lg font-medium text-[#FAF4EE] group-hover:text-[#C9AA6B] transition-colors m-0">
                  Cookie Details &amp; Inventory Table
                </h2>
              </div>
              <span className={`text-[#C9AA6B] transform transition-transform duration-300 ${expandedSection === 'table' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedSection === 'table' && (
              <div className="px-6 md:px-8 pb-8 pt-2 text-sm text-[#C2B4A3] flex flex-col gap-4 border-t border-[#2E231A]/60 font-light">
                <p>
                  The following table details the primary cookies utilized across our e-commerce platform:
                </p>

                {/* Table Container (.cookies-table) */}
                <div className="overflow-x-auto rounded-xl border border-[#2E231A] bg-[#0D0A08]/80">
                  <table className="cookies-table w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#2E231A] bg-[#16120F] text-[#FAF4EE]">
                        <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[0.7rem] text-[#C9AA6B]">Cookie Name</th>
                        <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[0.7rem] text-[#C9AA6B]">Category / Type</th>
                        <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[0.7rem] text-[#C9AA6B]">Purpose &amp; Description</th>
                        <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[0.7rem] text-[#C9AA6B]">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2E231A]/60 text-[#D9C8B4]">
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 font-mono text-[#FAF4EE] font-medium">_ghad_cart_bag</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-[#C9AA6B]/15 text-[#C9AA6B] text-[0.65rem] font-semibold uppercase">Essential</span></td>
                        <td className="py-3 px-4">Retains selected jewellery pieces, sizes, and quantities in the shopping bag.</td>
                        <td className="py-3 px-4 text-[#A69584]">30 Days</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 font-mono text-[#FAF4EE] font-medium">isLoggedIn / auth_token</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-[#C9AA6B]/15 text-[#C9AA6B] text-[0.65rem] font-semibold uppercase">Essential</span></td>
                        <td className="py-3 px-4">Authenticates client session and protects private account details.</td>
                        <td className="py-3 px-4 text-[#A69584]">Session / 14 Days</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 font-mono text-[#FAF4EE] font-medium">cookie_preferences</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-[#C9AA6B]/15 text-[#C9AA6B] text-[0.65rem] font-semibold uppercase">Essential</span></td>
                        <td className="py-3 px-4">Stores your consent choices and opt-in/opt-out status.</td>
                        <td className="py-3 px-4 text-[#A69584]">1 Year</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 font-mono text-[#FAF4EE] font-medium">_rzp_checkout_id</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-[#C9AA6B]/15 text-[#C9AA6B] text-[0.65rem] font-semibold uppercase">Essential</span></td>
                        <td className="py-3 px-4">Secure payment gateway token provided by Razorpay to verify transactions safely.</td>
                        <td className="py-3 px-4 text-[#A69584]">Session</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 font-mono text-[#FAF4EE] font-medium">_ga / _gid</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] text-[0.65rem] font-semibold uppercase">Analytics</span></td>
                        <td className="py-3 px-4">Google Analytics tokens to compute anonymous visitor metrics and bounce rates.</td>
                        <td className="py-3 px-4 text-[#A69584]">2 Years / 24 Hours</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 font-mono text-[#FAF4EE] font-medium">user_currency_pref</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-[#A67C1E]/15 text-[#A67C1E] text-[0.65rem] font-semibold uppercase">Functional</span></td>
                        <td className="py-3 px-4">Stores preferred currency display (INR, USD, EUR, GBP) for jewellery prices.</td>
                        <td className="py-3 px-4 text-[#A69584]">6 Months</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 font-mono text-[#FAF4EE] font-medium">_fbp / _pin_unauth</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-[#C89B3C]/15 text-[#C89B3C] text-[0.65rem] font-semibold uppercase">Marketing</span></td>
                        <td className="py-3 px-4">Meta and Pinterest conversion pixels to deliver curated collection advertisements.</td>
                        <td className="py-3 px-4 text-[#A69584]">90 Days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          {/* Section 4: Third-Party Cookies (.expandable-section) */}
          <section className="expandable-section border border-[#2E231A] rounded-2xl bg-[#16120F]/60 overflow-hidden transition-all duration-300">
            <button
              type="button"
              onClick={() => toggleSection('thirdParty')}
              className="section-toggle-btn w-full px-6 md:px-8 py-5 flex items-center justify-between text-left bg-transparent border-none cursor-pointer outline-none group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#C9AA6B] tracking-widest uppercase">04</span>
                <h2 className="text-base md:text-lg font-medium text-[#FAF4EE] group-hover:text-[#C9AA6B] transition-colors m-0">
                  Third-Party Cookies &amp; Partners
                </h2>
              </div>
              <span className={`text-[#C9AA6B] transform transition-transform duration-300 ${expandedSection === 'thirdParty' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedSection === 'thirdParty' && (
              <div className="px-6 md:px-8 pb-8 pt-2 text-sm text-[#C2B4A3] flex flex-col gap-5 border-t border-[#2E231A]/60 font-light">
                <p>
                  Certain services on our platform are powered by trusted third-party partners who may set their own cookies on your browser:
                </p>

                <ul className="list-none p-0 m-0 flex flex-col gap-3.5 pl-2">
                  <li className="relative pl-5 text-xs sm:text-sm text-[#D9C8B4]">
                    <span className="absolute left-0 text-[#C9AA6B] font-bold">◆</span>
                    <strong className="text-[#FAF4EE] font-normal">Payment Gateways (Razorpay / Stripe / UPI):</strong> Essential for PCI-DSS compliant checkout, tokenizing payment credentials securely without storing sensitive card details on our servers.
                  </li>
                  <li className="relative pl-5 text-xs sm:text-sm text-[#D9C8B4]">
                    <span className="absolute left-0 text-[#C9AA6B] font-bold">◆</span>
                    <strong className="text-[#FAF4EE] font-normal">Google Analytics 4 &amp; Fonts:</strong> Provides aggregated performance telemetry and serves elegant typography (such as <em>Cormorant Garamond</em> and <em>Playfair Display</em>).
                  </li>
                  <li className="relative pl-5 text-xs sm:text-sm text-[#D9C8B4]">
                    <span className="absolute left-0 text-[#C9AA6B] font-bold">◆</span>
                    <strong className="text-[#FAF4EE] font-normal">Social Media Integrations:</strong> Enables sharing jewellery items and viewing our verified Instagram gallery directly on our website.
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
                  User Control &amp; Disabling Cookies in Browser
                </h2>
              </div>
              <span className={`text-[#C9AA6B] transform transition-transform duration-300 ${expandedSection === 'userControl' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedSection === 'userControl' && (
              <div className="px-6 md:px-8 pb-8 pt-2 text-sm text-[#C2B4A3] flex flex-col gap-5 border-t border-[#2E231A]/60 font-light">
                <p>
                  You have the absolute right to decide whether to accept or reject non-essential cookies. You can exercise your preferences directly using our <a href="#privacy-controller" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 120, behavior: 'smooth' }); }} className="text-[#C9AA6B] underline font-normal">Cookie Preferences Controller</a> above, or by configuring your web browser settings.
                </p>

                <div className="p-4 rounded-xl bg-[#0D0A08]/50 border border-[#2E231A]">
                  <h3 className="text-xs font-semibold text-[#FAF4EE] uppercase tracking-wider mb-2">
                    Browser-Specific Instructions:
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
                  <strong>Note on Disabling Essential Cookies:</strong> If you choose to block all cookies via browser settings, some features of our website (such as retaining items in your shopping bag, logging into your bespoke profile, or completing checkout) may not function properly.
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
                      Studio &amp; Flagship Atelier
                    </h3>
                    <p className="text-xs text-[#A69584] m-0">
                      Jaipur, Rajasthan, India
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
