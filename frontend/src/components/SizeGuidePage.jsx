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

      <main className="flex-1 w-full max-w-[960px] mx-auto px-6 md:px-12 pt-36 pb-24 text-[#FAF4EE] leading-relaxed">
        {/* Page Title */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="font-sans text-[0.72rem] tracking-[0.2em] uppercase text-[#D4AF37] block mb-2">
            Perfect Sizing
          </span>
          <h1 className="font-display font-light text-3xl md:text-[2.2rem] tracking-[0.16em] m-0 mb-4 text-[#FAF4EE] uppercase">
            Size Guide
          </h1>
          <div className="w-24 h-[1px] bg-[#D4AF37]" />
        </div>

        {/* Intro */}
        <div className="text-sm md:text-[0.92rem] font-light text-[#D9C8B4] mb-12 text-center max-w-[700px] mx-auto">
          <p>
            Finding the perfect fit ensures that your luxury jewellery sits comfortably and looks exquisite. Use our sizing charts and measuring instructions below to discover your size.
          </p>
        </div>

        {/* Tab Buttons for Categories */}
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center border-b border-[#c89b3c]/20 pb-6 mb-8 select-none">
          {['Ring', 'Bangle', 'Bracelet', 'Necklace'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 font-sans text-xs md:text-sm tracking-[0.15em] uppercase border transition-all duration-300 font-medium cursor-pointer ${
                activeCategory === cat
                  ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#F4E3A1] font-semibold shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'border-[#c89b3c]/25 bg-[#16120F] text-[#D9C8B4] hover:border-[#c89b3c]/60 hover:text-[#FAF4EE]'
              }`}
            >
              {cat} Guide
            </button>
          ))}
        </div>

        {/* Main Guide Box */}
        <div className="relative bg-[#16120F] border-2 border-[#D4AF37]/40 p-1.5 shadow-2xl rounded-sm max-w-2xl mx-auto">
          {/* Double Border Frame */}
          <div className="border border-[#c6a076]/45 p-6 md:p-10 bg-[#16120F] text-[#FAF4EE]">
            {/* Guide Header */}
            <div className="text-center border-b border-[#c6a076]/30 pb-4 mb-6 select-none">
              <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#D4AF37] block mb-1">
                Ghadsiram Style Guide
              </span>
              <h3 className="font-cormorant text-2xl font-light tracking-[0.08em] uppercase text-[#FAF4EE] m-0">
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
              <h4 className="font-sans text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
                How to Measure At Home:
              </h4>
              <ol className="list-decimal pl-4 m-0 font-sans text-xs md:text-[0.8rem] font-light text-[#D9C8B4] flex flex-col gap-2">
                <li>Wrap a piece of non-stretchable string or thin strip of paper around the finger, wrist, or hand (at the widest point for bangles).</li>
                <li>Mark the exact spot where the paper or string overlaps to form a complete circle.</li>
                <li>Measure the length of the string or paper from the start to the mark using a ruler in centimeters.</li>
                <li>Match your measurement with the circumference values listed in the charts above.</li>
              </ol>
            </div>

          </div>
        </div>
      </main>

      {/* Ornamental Divider */}
      <div className="w-full flex items-center gap-0 px-0">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#2E231A] to-[#3A2A1E]" />
        <span className="text-[#C9AA6B] text-xs px-4 select-none opacity-80">◆</span>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#2E231A] to-[#3A2A1E]" />
      </div>

      {/* CTA — Find the one you keep */}
      <section className="w-full bg-[#0D0A08] py-20 md:py-28 px-4 flex flex-col items-center justify-center text-center">
        <h2 className="font-cormorant font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FAF4EE] m-0 mb-8 leading-[1.05]">
          Find the one<br />you keep.
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
            <tr className="border-b border-[#c6a076]/30 text-[#D4AF37] font-light tracking-wider uppercase text-[0.65rem]">
              <th className="py-2.5 font-normal">India Size</th>
              <th className="py-2.5 font-normal">USA Size</th>
              <th className="py-2.5 font-normal">Circumference (cm)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c6a076]/10 text-[#D9C8B4] font-light">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#c6a076]/10">
                <td className="py-3 font-normal text-[#FAF4EE]">{row.india}</td>
                <td className="py-3">{row.usa}</td>
                <td className="py-3 font-normal text-[#FAF4EE]">{row.cm}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
              ? 'border-[#D4AF37] text-[#F4E3A1] font-semibold'
              : 'border-transparent text-[#A69280] hover:text-[#D9C8B4]'
          }`}
        >
          Circumference
        </button>
        <button
          type="button"
          onClick={() => setBangleTab('diameter')}
          className={`flex-1 py-2 text-center text-xs tracking-wider uppercase transition-all border-b-2 font-medium cursor-pointer ${
            bangleTab === 'diameter'
              ? 'border-[#D4AF37] text-[#F4E3A1] font-semibold'
              : 'border-transparent text-[#A69280] hover:text-[#D9C8B4]'
          }`}
        >
          Inner Diameter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#c6a076]/30 text-[#D4AF37] font-light tracking-wider uppercase text-[0.65rem]">
              <th className="py-2.5 font-normal">Bangle Size</th>
              <th className="py-2.5 font-normal">{bangleTab === 'circumference' ? 'Circumference (cm)' : 'Inner Diameter (cm)'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c6a076]/10 text-[#D9C8B4] font-light">
            {(bangleTab === 'circumference' ? circData : diaData).map((row, idx) => (
              <tr key={idx} className="hover:bg-[#c6a076]/10">
                <td className="py-3 font-normal text-[#FAF4EE]">{row.size}</td>
                <td className="py-3 font-normal text-[#FAF4EE]">{row.cm}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
            <tr className="border-b border-[#c6a076]/30 text-[#D4AF37] font-light tracking-wider uppercase text-[0.65rem]">
              <th className="py-2.5 font-normal">Bracelet Size (Inches)</th>
              <th className="py-2.5 font-normal">Circumference (cm)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c6a076]/10 text-[#D9C8B4] font-light">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#c6a076]/10">
                <td className="py-3 font-normal text-[#FAF4EE]">{row.size}</td>
                <td className="py-3 font-normal text-[#FAF4EE]">{row.cm}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
            <tr className="border-b border-[#c6a076]/30 text-[#D4AF37] font-light tracking-wider uppercase text-[0.65rem]">
              <th className="py-2.5 font-normal">Length</th>
              <th className="py-2.5 font-normal">Style</th>
              <th className="py-2.5 font-normal">Fit Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c6a076]/10 text-[#D9C8B4] font-light">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#c6a076]/10">
                <td className="py-3 font-normal text-[#FAF4EE]">{row.size}</td>
                <td className="py-3 font-medium text-[#F4E3A1]">{row.label}</td>
                <td className="py-3 text-[#A69280] leading-normal">{row.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
