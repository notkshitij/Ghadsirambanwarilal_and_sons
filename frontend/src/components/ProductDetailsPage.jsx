import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function ProductDetailsPage({ productId, onNavigate, onCartClick }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const product = products.find((p) => p.id === productId);

  const getProductType = (prod) => {
    if (!prod) return 'Standard';
    const sub = (prod.subcategory || '').toLowerCase();
    const name = (prod.name || '').toLowerCase();
    if (sub.includes('ring') || name.includes('ring')) return 'Ring';
    if (sub.includes('bangle') || name.includes('bangle')) return 'Bangle';
    if (sub.includes('bracelet') || name.includes('bracelet')) return 'Bracelet';
    if (sub.includes('necklace') || sub.includes('choker') || sub.includes('pendant') || name.includes('necklace') || name.includes('choker') || name.includes('pendant')) return 'Necklace';
    return 'Standard';
  };

  const getSizesForType = (type) => {
    switch (type) {
      case 'Ring':
        return ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
      case 'Bangle':
        return ['2-2', '2-4', '2-6', '2-8', '2-10', '2-12', '2-14', '3'];
      case 'Bracelet':
        return ['6.0', '6.5', '7.0', '7.5', '8.0'];
      case 'Necklace':
        return ['14"', '16"', '18"', '20"'];
      default:
        return [];
    }
  };

  const productType = getProductType(product);
  const sizes = getSizesForType(productType);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setQty(1);
      const type = getProductType(product);
      const szs = getSizesForType(type);
      setSelectedSize(szs[0] || '');
    }
  }, [productId, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between font-sans text-black">
        <Navbar onCartClick={onCartClick} alwaysShowBg={true} onBrandClick={() => onNavigate('home')} onShopClick={() => onNavigate('shop')} />
        <main className="flex-1 flex flex-col items-center justify-center pt-36">
          <p className="font-cormorant text-xl text-neutral-500 italic">Product not found.</p>
          <button onClick={() => onNavigate('shop')} className="mt-4 px-6 py-2.5 bg-neutral-900 text-white font-sans text-xs tracking-wider uppercase font-semibold">
            Return to Shop
          </button>
        </main>
        <Footer onBrandClick={() => onNavigate('home')} onNavigate={onNavigate} />
      </div>
    );
  }

  const formatPrice = (price) => new Intl.NumberFormat('en-IN').format(price);

  const handleDecrement = () => {
    setQty((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setQty((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    addItem(product, qty, selectedSize);
  };

  const handleBuyNow = () => {
    addItem(product, qty, selectedSize);
    onNavigate('cart');
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between font-sans">
      <Navbar 
        onCartClick={onCartClick} 
        onBookClick={() => onNavigate('appointment')}
        onShopClick={() => onNavigate('shop')} 
        onBrandClick={() => onNavigate('home')} 
        alwaysShowBg={true} 
      />

      <main className="flex-1 w-full max-w-[1100px] mx-auto px-6 md:px-8 pt-36 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
          <div className="flex flex-col w-full animate-fade-in">
            <div className="relative aspect-square w-full flex items-center justify-center overflow-hidden">
              <img 
                src={activeImage || product.image} 
                alt={product.name} 
                className="w-[85%] h-[85%] object-contain mix-blend-multiply transition-all duration-300" 
              />
            </div>
            
            {/* Gallery Thumbnails */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3.5 mt-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square w-full flex items-center justify-center overflow-hidden bg-[#f6f5f3] p-1 cursor-pointer transition-all duration-300 border border-neutral-100 ${
                      (activeImage || product.image) === img ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} thumbnail ${idx + 1}`} 
                      className="w-[85%] h-[85%] object-contain mix-blend-multiply" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info */}
          <div className="flex flex-col select-none">
            {/* Breadcrumbs */}
            <div className="font-sans text-[0.68rem] tracking-[0.16em] uppercase text-neutral-400 mb-4 font-light">
              Shop &nbsp;|&nbsp; {product.category} &nbsp;|&nbsp; {product.subcategory}
            </div>

            {/* Title */}
            <h1 className="font-sans font-light text-2xl md:text-[2.1rem] tracking-[0.08em] uppercase text-neutral-900 m-0 mb-6 leading-tight">
              {product.name}
            </h1>

            {/* Price & Stock Row */}
            <div className="flex items-baseline justify-between border-b border-neutral-100 pb-5 mb-8">
              <div className="flex items-baseline">
                <span className="font-sans text-xl font-light text-neutral-900 tracking-wide">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-sans text-sm text-neutral-400 line-through ml-3.5 tracking-wide">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <span className="font-sans text-[0.72rem] tracking-wider text-neutral-400 font-light">
                {product.stock} in stock
              </span>
            </div>

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5 select-none">
                  <span className="font-sans text-[0.72rem] tracking-[0.16em] uppercase text-neutral-800 font-semibold">
                    Select Size
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(true)}
                    className="font-sans text-[0.7rem] tracking-[0.12em] uppercase text-[#c89b3c] hover:text-[#b0852e] bg-transparent border-none cursor-pointer underline font-medium"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[40px] h-[40px] px-3 flex items-center justify-center font-sans text-xs tracking-wider border transition-all duration-300 ${
                        selectedSize === sz
                          ? 'border-neutral-900 bg-neutral-950 text-white font-medium'
                          : 'border-neutral-200 bg-transparent text-neutral-600 hover:border-neutral-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector Box */}
            <div className="flex items-center justify-between border border-neutral-200/50 bg-[#fafafa] rounded-sm py-3 px-5 w-full mb-5 hover:border-neutral-300/80 transition-colors">
              <button
                type="button"
                onClick={handleDecrement}
                className="text-neutral-400 hover:text-black bg-transparent border-none cursor-pointer px-3 py-1 text-base font-light select-none transition-colors"
              >
                —
              </button>
              <span className="font-sans text-sm text-neutral-800 font-medium select-none">{qty}</span>
              <button
                type="button"
                onClick={handleIncrement}
                className="text-neutral-400 hover:text-black bg-transparent border-none cursor-pointer px-3 py-1 text-base font-light select-none transition-colors"
              >
                +
              </button>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-white hover:bg-neutral-950 text-neutral-800 hover:text-white border border-neutral-900 font-sans text-xs font-semibold tracking-[0.2em] py-4.5 transition-all duration-300 cursor-pointer uppercase rounded-none"
              >
                Add to Cart
              </button>
              
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full bg-neutral-950 hover:bg-[#c89b3c] text-white border-none font-sans text-xs font-semibold tracking-[0.2em] py-4.5 transition-all duration-300 cursor-pointer uppercase rounded-none"
              >
                Buy Now
              </button>
            </div>

            {/* Product Specifications Section */}
            {product.specs && (
              <div className="mt-9 border-t border-neutral-100 pt-7 flex flex-col gap-4 font-sans select-none text-neutral-600 font-light">
                <h4 className="text-[0.72rem] tracking-[0.2em] uppercase text-neutral-900 font-medium mb-1">
                  Product Details
                </h4>
                <div className="flex flex-col gap-2.5 text-[0.82rem] leading-relaxed">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-neutral-100/50 pb-2">
                      <span className="text-neutral-400 font-light capitalize">{key}</span>
                      <span className="text-neutral-800 font-normal">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

      <Footer onBrandClick={() => onNavigate('home')} onNavigate={onNavigate} />

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative max-w-md w-full bg-[#fbf6ee] border-4 border-[#382319] p-1.5 shadow-2xl rounded-sm">
            {/* Double Border Frame */}
            <div className="border border-[#c6a076]/40 p-5 md:p-6 bg-[#fbf6ee] text-neutral-800">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors p-1"
                aria-label="Close modal"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[2]">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Title Header */}
              <div className="text-center border-b border-[#c6a076]/30 pb-4 mb-5 select-none">
                <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#c89b3c] block mb-1">
                  Symetree Style Guide
                </span>
                <h3 className="font-cormorant text-2xl font-light tracking-[0.08em] uppercase text-neutral-900 m-0">
                  Know Your Size
                </h3>
                <span className="font-sans text-[0.8rem] tracking-[0.05em] text-neutral-400 font-light block mt-1 lowercase italic">
                  ({productType})
                </span>
              </div>

              {/* Guide Contents */}
              <div className="max-h-[350px] overflow-y-auto pr-1">
                {productType === 'Ring' && <RingSizeChart />}
                {productType === 'Bangle' && <BangleSizeChart />}
                {productType === 'Bracelet' && <BraceletSizeChart />}
                {productType === 'Necklace' && <NecklaceSizeChart />}
              </div>

              {/* Bottom Note */}
              <p className="font-sans text-[0.7rem] text-center text-neutral-400 font-light mt-5 mb-0 select-none">
                Wrap a string or paper around to measure circumference in centimeters.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Size Guide Chart Helper Components */
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
    <div className="flex flex-col gap-4 font-sans select-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#c6a076]/30 text-neutral-400 font-light tracking-wider uppercase text-[0.65rem]">
              <th className="py-2 font-normal">India Size</th>
              <th className="py-2 font-normal">USA Size</th>
              <th className="py-2 font-normal">Circumference (cm)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c6a076]/10 text-neutral-700 font-light">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#c6a076]/5">
                <td className="py-2.5 font-normal">{row.india}</td>
                <td className="py-2.5">{row.usa}</td>
                <td className="py-2.5 font-normal">{row.cm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center border-t border-[#c6a076]/20 pt-4 mt-2">
        <svg viewBox="0 0 100 45" className="w-40 h-auto stroke-[#c6a076] fill-none stroke-[0.8]" strokeLinecap="round">
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
    <div className="flex flex-col gap-4 font-sans select-none">
      <div className="flex border-b border-[#c6a076]/20 mb-2">
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
                <th className="py-2 font-normal">Bangle Size</th>
                <th className="py-2 font-normal">Circumference (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c6a076]/10 text-neutral-700 font-light">
              {circData.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#c6a076]/5">
                  <td className="py-2.5 font-normal">{row.size}</td>
                  <td className="py-2.5 font-normal">{row.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#c6a076]/30 text-neutral-400 font-light tracking-wider uppercase text-[0.65rem]">
                <th className="py-2 font-normal">Bangle Size</th>
                <th className="py-2 font-normal">Inner Diameter (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c6a076]/10 text-neutral-700 font-light">
              {diaData.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#c6a076]/5">
                  <td className="py-2.5 font-normal">{row.size}</td>
                  <td className="py-2.5 font-normal">{row.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-center border-t border-[#c6a076]/20 pt-4 mt-2">
        <svg viewBox="0 0 100 45" className="w-32 h-auto stroke-[#c6a076] fill-none stroke-[0.8]">
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
    <div className="flex flex-col gap-4 font-sans select-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#c6a076]/30 text-neutral-400 font-light tracking-wider uppercase text-[0.65rem]">
              <th className="py-2 font-normal">Bracelet Size (Inches)</th>
              <th className="py-2 font-normal">Circumference (cm)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c6a076]/10 text-neutral-700 font-light">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#c6a076]/5">
                <td className="py-2.5 font-normal">{row.size}</td>
                <td className="py-2.5 font-normal">{row.cm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center border-t border-[#c6a076]/20 pt-4 mt-2">
        <svg viewBox="0 0 100 45" className="w-32 h-auto stroke-[#c6a076] fill-none stroke-[0.8]">
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
    <div className="flex flex-col gap-4 font-sans select-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#c6a076]/30 text-neutral-400 font-light tracking-wider uppercase text-[0.65rem]">
              <th className="py-2 font-normal">Length</th>
              <th className="py-2 font-normal">Style</th>
              <th className="py-2 font-normal">Fit Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c6a076]/10 text-neutral-700 font-light">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#c6a076]/5">
                <td className="py-2.5 font-normal">{row.size}</td>
                <td className="py-2.5 font-medium text-neutral-800">{row.label}</td>
                <td className="py-2.5 text-neutral-500 leading-normal">{row.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center border-t border-[#c6a076]/20 pt-4 mt-2">
        <svg viewBox="0 0 100 45" className="w-28 h-auto stroke-[#c6a076] fill-none stroke-[0.8]">
          <path d="M50 8c12 0 22 10 22 22 0 6-3 10-6 12L50 48 34 42c-3-2-6-6-6-12 0-12 10-22 22-22z" />
          <path d="M50 8c8 0 15 8 15 18 0 5-2 8-4 10L50 42l-11-6c-2-2-4-5-4-10 0-10 7-18 15-18z" className="stroke-[#c89b3c] stroke-[0.5]" />
        </svg>
      </div>
    </div>
  );
}
