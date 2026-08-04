import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function SizeGuidePage({ onBackToShop, onBackToHome, onNavigate, onCartClick }) {
  const [activeCategory, setActiveCategory] = useState('Ring');

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
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="font-sans font-light text-3xl md:text-[2.2rem] tracking-[0.16em] m-0 mb-4 text-neutral-900 uppercase">
            Size Guide
          </h1>
          <div className="w-24 h-[1px] bg-[#c89b3c]" />
        </div>

        {/* Intro */}
        <div className="text-sm md:text-[0.92rem] font-light text-neutral-600 mb-12 text-center max-w-[700px] mx-auto">
          <p>
            Finding the perfect fit ensures that your luxury jewellery sits comfortably and looks exquisite. Use our sizing charts and measuring instructions below to discover your size.
          </p>
        </div>

        {/* Tab Buttons for Categories */}
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center border-b border-neutral-100 pb-6 mb-8 select-none">
          {['Ring', 'Bangle', 'Bracelet', 'Necklace'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 font-sans text-xs md:text-sm tracking-[0.15em] uppercase border transition-all duration-300 font-medium cursor-pointer ${
                activeCategory === cat
                  ? 'border-neutral-900 bg-neutral-950 text-white font-semibold shadow-sm'
                  : 'border-neutral-200 bg-transparent text-neutral-500 hover:border-neutral-400 hover:text-neutral-900'
              }`}
            >
              {cat} Guide
            </button>
          ))}
        </div>

        {/* Main Guide Box (Symetree Styled Frame) */}
        <div className="relative bg-[#fbf6ee] border-4 border-[#382319] p-1.5 shadow-xl rounded-sm max-w-2xl mx-auto">
          {/* Double Border Frame */}
          <div className="border border-[#c6a076]/45 p-6 md:p-10 bg-[#fbf6ee] text-neutral-800">
            {/* Guide Header */}
            <div className="text-center border-b border-[#c6a076]/30 pb-4 mb-6 select-none">
              <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#c89b3c] block mb-1">
                Symetree Style Guide
              </span>
              <h3 className="font-cormorant text-2xl font-light tracking-[0.08em] uppercase text-neutral-900 m-0">
                Know Your Size ({activeCategory})
              </h3>
            </div>

            {/* Guide Content */}
            <div className="flex flex-col gap-6">
              {activeCategory === 'Ring' && <RingSizeChart />}
              {activeCategory === 'Bangle' && <BangleSizeChart />}
              {activeCategory === 'Bracelet' && <BraceletSizeChart />}
              {activeCategory === 'Necklace' && <NecklaceSizeChart />}
            </div>

            {/* Measurement Tip Box */}
            <div className="mt-8 border-t border-[#c6a076]/25 pt-6 flex flex-col gap-4 select-none">
              <h4 className="font-sans text-xs font-semibold tracking-wider text-neutral-900 uppercase">
                How to Measure At Home:
              </h4>
              <ol className="list-decimal pl-4 m-0 font-sans text-xs md:text-[0.8rem] font-light text-neutral-500 flex flex-col gap-2">
                <li>Wrap a piece of non-stretchable string or thin strip of paper around the finger, wrist, or hand (at the widest point for bangles).</li>
                <li>Mark the exact spot where the paper or string overlaps to form a complete circle.</li>
                <li>Measure the length of the string or paper from the start to the mark using a ruler in centimeters.</li>
                <li>Match your measurement with the circumference values listed in the charts above.</li>
              </ol>
            </div>

          </div>
        </div>
      </main>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}

/* Helper Charts Components */
function RingSizeChart() {
  const data = [
    { india: '8', usa: '4 ½', cm: '4.6' },
    { india: '9', usa: '5', cm: '4.8' },
    { india: '10', usa: '5 ½', cm: '4.9' },
    { india: '11', usa: '6', cm: '5.0' },
    { india: '12', usa: '6 ¼', cm: '5.2' },
    { india: '13', usa: '6 ½', cm: '5.3' },
    { india: '14', usa: '7', cm: '5.4' },
    { india: '15', usa: '7 ½', cm: '5.8' },
    { india: '16', usa: '8', cm: '5.9' },
    { india: '17', usa: '8 ½', cm: '7.35' },
    { india: '18', usa: '9', cm: '5.9' },
    { india: '19', usa: '9 ½', cm: '6.1' },
    { india: '20', usa: '10', cm: '6.2' },
  ];

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#c6a076]/30 text-neutral-400 font-light tracking-wider uppercase text-[0.65rem]">
              <th className="py-2.5 font-normal">India Size</th>
              <th className="py-2.5 font-normal">USA Size</th>
              <th className="py-2.5 font-normal">Circumference (cm)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c6a076]/10 text-neutral-700 font-light">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#c6a076]/5">
                <td className="py-3 font-normal">{row.india}</td>
                <td className="py-3">{row.usa}</td>
                <td className="py-3 font-normal">{row.cm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center border-t border-[#c6a076]/20 pt-6">
        <svg viewBox="0 0 100 45" className="w-48 h-auto stroke-[#c6a076] fill-none stroke-[0.8]" strokeLinecap="round">
          <path d="M10 40c5-5 12-8 18-8s10 2 13 5" />
          <path d="M28 32V10c0-1.5 1-2.5 2-2.5s2 1 2 2.5v12" />
          <path d="M32 22V8c0-1.5 1-2.5 2-2.5s2 1 2 2.5v14" />
          <path d="M36 22V12c0-1.5 1-2.5 2-2.5s2 1 2 2.5v12" />
          <path d="M40 24V18c0-1.5 1-2.5 2-2.5s2 1 2 2.5v15" />
          <circle cx="34" cy="14" r="2.5" className="stroke-[#c89b3c] stroke-[1.2]" />
        </svg>
      </div>
    </div>
  );
}

function BangleSizeChart() {
  const [bangleTab, setBangleTab] = useState('circumference');

  const circData = [
    { size: '2-2', cm: '17' },
    { size: '2-4', cm: '18' },
    { size: '2-6', cm: '19' },
    { size: '2-8', cm: '20' },
    { size: '2-10', cm: '21' },
    { size: '2-12', cm: '22' },
    { size: '2-14', cm: '23' },
    { size: '3', cm: '24' },
  ];

  const diaData = [
    { size: '2-2', cm: '5.4' },
    { size: '2-4', cm: '5.7' },
    { size: '2-6', cm: '6.0' },
    { size: '2-8', cm: '6.3' },
    { size: '2-10', cm: '6.7' },
    { size: '2-12', cm: '7.0' },
    { size: '2-14', cm: '7.3' },
    { size: '3', cm: '7.6' },
  ];

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div className="flex border-b border-[#c6a076]/20">
        <button
          type="button"
          onClick={() => setBangleTab('circumference')}
          className={`flex-1 py-2 text-center text-xs tracking-wider uppercase transition-all border-b-2 font-medium cursor-pointer ${
            bangleTab === 'circumference'
              ? 'border-[#c89b3c] text-neutral-900 font-semibold'
              : 'border-transparent text-neutral-400 hover:text-neutral-600'
          }`}
        >
          Circumference
        </button>
        <button
          type="button"
          onClick={() => setBangleTab('diameter')}
          className={`flex-1 py-2 text-center text-xs tracking-wider uppercase transition-all border-b-2 font-medium cursor-pointer ${
            bangleTab === 'diameter'
              ? 'border-[#c89b3c] text-neutral-900 font-semibold'
              : 'border-transparent text-neutral-400 hover:text-neutral-600'
          }`}
        >
          Inner Diameter
        </button>
      </div>

      <div className="overflow-x-auto">
        {bangleTab === 'circumference' ? (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#c6a076]/30 text-neutral-400 font-light tracking-wider uppercase text-[0.65rem]">
                <th className="py-2.5 font-normal">Bangle Size</th>
                <th className="py-2.5 font-normal">Circumference (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c6a076]/10 text-neutral-700 font-light">
              {circData.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#c6a076]/5">
                  <td className="py-3 font-normal">{row.size}</td>
                  <td className="py-3 font-normal">{row.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#c6a076]/30 text-neutral-400 font-light tracking-wider uppercase text-[0.65rem]">
                <th className="py-2.5 font-normal">Bangle Size</th>
                <th className="py-2.5 font-normal">Inner Diameter (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c6a076]/10 text-neutral-700 font-light">
              {diaData.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#c6a076]/5">
                  <td className="py-3 font-normal">{row.size}</td>
                  <td className="py-3 font-normal">{row.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-center border-t border-[#c6a076]/20 pt-6">
        <svg viewBox="0 0 100 45" className="w-36 h-auto stroke-[#c6a076] fill-none stroke-[0.8]">
          <circle cx="50" cy="22" r="16" />
          <circle cx="50" cy="22" r="14.5" className="stroke-[#c89b3c] stroke-[0.5]" strokeDasharray="2 2" />
          <line x1="34" y1="22" x2="66" y2="22" className="stroke-[#c89b3c] stroke-[0.7]" />
        </svg>
      </div>
    </div>
  );
}

function BraceletSizeChart() {
  const data = [
    { size: '6.0', cm: '16.5' },
    { size: '6.5', cm: '17.7' },
    { size: '7.0', cm: '19.0' },
    { size: '7.5', cm: '20.3' },
    { size: '8.0', cm: '21.5' },
  ];

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#c6a076]/30 text-neutral-400 font-light tracking-wider uppercase text-[0.65rem]">
              <th className="py-2.5 font-normal">Bracelet Size (Inches)</th>
              <th className="py-2.5 font-normal">Circumference (cm)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c6a076]/10 text-neutral-700 font-light">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#c6a076]/5">
                <td className="py-3 font-normal">{row.size}</td>
                <td className="py-3 font-normal">{row.cm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center border-t border-[#c6a076]/20 pt-6">
        <svg viewBox="0 0 100 45" className="w-36 h-auto stroke-[#c6a076] fill-none stroke-[0.8]">
          <path d="M20 22c0-8 15-10 30-10s30 2 30 10-15 10-30 10-30-2-30-10z" />
          <path d="M47 32l3 3 5-5" className="stroke-[#c89b3c]" />
        </svg>
      </div>
    </div>
  );
}

function NecklaceSizeChart() {
  const data = [
    { size: '14"', label: 'Choker', position: 'Rests tightly around the base of the throat.' },
    { size: '16"', label: 'Collar', position: 'Sits exactly at the collarbone.' },
    { size: '18"', label: 'Princess', position: 'Hangs elegantly just below the collarbone.' },
    { size: '20"', label: 'Matinee', position: 'Rests gracefully at the top of the bust.' },
  ];

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#c6a076]/30 text-neutral-400 font-light tracking-wider uppercase text-[0.65rem]">
              <th className="py-2.5 font-normal">Length</th>
              <th className="py-2.5 font-normal">Style</th>
              <th className="py-2.5 font-normal">Fit Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c6a076]/10 text-neutral-700 font-light">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#c6a076]/5">
                <td className="py-3 font-normal">{row.size}</td>
                <td className="py-3 font-medium text-neutral-800">{row.label}</td>
                <td className="py-3 text-neutral-500 leading-normal">{row.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center border-t border-[#c6a076]/20 pt-6">
        <svg viewBox="0 0 100 45" className="w-32 h-auto stroke-[#c6a076] fill-none stroke-[0.8]">
          <path d="M50 8c12 0 22 10 22 22 0 6-3 10-6 12L50 48 34 42c-3-2-6-6-6-12 0-12 10-22 22-22z" />
          <path d="M50 8c8 0 15 8 15 18 0 5-2 8-4 10L50 42l-11-6c-2-2-4-5-4-10 0-10 7-18 15-18z" className="stroke-[#c89b3c] stroke-[0.5]" />
        </svg>
      </div>
    </div>
  );
}
