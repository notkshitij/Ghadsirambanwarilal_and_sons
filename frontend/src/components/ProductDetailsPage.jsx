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
      case 'Ring': return ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
      case 'Bangle': return ['2-2', '2-4', '2-6', '2-8', '2-10', '2-12', '2-14', '3'];
      case 'Bracelet': return ['6.0', '6.5', '7.0', '7.5', '8.0'];
      case 'Necklace': return ['14"', '16"', '18"', '20"'];
      default: return [];
    }
  };

  const productType = getProductType(product);
  const sizes = getSizesForType(productType);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Ghadsiram's`;
      setActiveImage(product.image);
      setQty(1);
      const szs = getSizesForType(getProductType(product));
      setSelectedSize(szs[0] || '');
    } else {
      document.title = "Product Not Found | Ghadsiram's";
    }
  }, [productId, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0D0A08] text-[#FAF4EE] flex flex-col justify-between font-sans">
        <Navbar onCartClick={onCartClick} alwaysShowBg={true} onBrandClick={() => onNavigate('home')} onShopClick={() => onNavigate('shop')} onNavigate={onNavigate} />
        <main className="flex-1 flex flex-col items-center justify-center pt-36">
          <p className="font-cormorant text-xl text-[#D9C8B4] italic">Product not found.</p>
          <button onClick={() => onNavigate('shop')} className="mt-4 px-6 py-2.5 bg-[#16120F] border border-[#c89b3c]/40 text-[#F4E3A1] font-sans text-xs tracking-wider uppercase font-semibold cursor-pointer rounded-lg">
            Return to Shop
          </button>
        </main>
        <Footer onBrandClick={() => onNavigate('home')} onNavigate={onNavigate} />
      </div>
    );
  }

  const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  const handleAddToCart = () => {
    addItem(product, qty, selectedSize);
    if (onCartClick) onCartClick();
  };

  const allImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="min-h-screen bg-[#0D0A08] text-[#FAF4EE] flex flex-col justify-between font-sans">
      <Navbar
        onCartClick={onCartClick}
        onBookClick={() => onNavigate('appointment')}
        onShopClick={() => onNavigate('shop')}
        onBrandClick={() => onNavigate('home')}
        onNavigate={onNavigate}
        alwaysShowBg={true}
      />

      <main className="flex-1 w-full max-w-[1100px] mx-auto px-6 md:px-8 pt-32 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* LEFT: Image + Thumbnails */}
          <div className="flex flex-col gap-3">
            {/* Main Image */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-[#16120F]" style={{ aspectRatio: '3/4' }}>
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-3 gap-2.5">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square w-full overflow-hidden rounded-lg bg-[#16120F] border-2 cursor-pointer transition-all ${
                      (activeImage || product.image) === img
                        ? 'border-[#C9AA6B]'
                        : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Info */}
          <div className="flex flex-col gap-5 pt-2">

            {/* Category */}
            <p className="font-sans text-[0.68rem] font-semibold tracking-[0.28em] text-[#C9AA6B] uppercase m-0">
              {product.subcategory || product.category}
            </p>

            {/* Product Name */}
            <h1 className="font-cormorant font-semibold text-4xl md:text-5xl text-[#FAF4EE] m-0 leading-[1.1]">
              {product.name}
            </h1>

            {/* Short Description */}
            {product.description && (
              <p className="font-sans text-sm font-light text-[#7A6A58] leading-[1.8] m-0">
                {product.description}
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-sans text-2xl font-semibold text-[#FAF4EE]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-sans text-sm text-[#5A4C3D] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[#1E1812]" />

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-sans text-[0.65rem] font-semibold tracking-[0.22em] text-[#7A6A58] uppercase m-0">
                    Size — {selectedSize}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(true)}
                    className="font-sans text-[0.65rem] tracking-[0.16em] uppercase text-[#C9AA6B] bg-transparent border-none cursor-pointer underline"
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
                      className={`min-w-[44px] h-[44px] px-3 flex items-center justify-center font-sans text-xs border rounded-lg cursor-pointer transition-all ${
                        selectedSize === sz
                          ? 'border-[#C9AA6B] bg-[#C9AA6B]/15 text-[#FAF4EE]'
                          : 'border-[#2E231A] bg-transparent text-[#7A6A58]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="font-sans text-[0.65rem] font-semibold tracking-[0.22em] text-[#7A6A58] uppercase mb-3">
                Quantity
              </p>
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  onClick={() => setQty((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 flex items-center justify-center border border-[#2E231A] rounded-full text-[#7A6A58] bg-transparent cursor-pointer text-base font-light"
                >
                  −
                </button>
                <span className="font-sans text-sm text-[#FAF4EE] w-4 text-center">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((p) => p + 1)}
                  className="w-8 h-8 flex items-center justify-center border border-[#2E231A] rounded-full text-[#7A6A58] bg-transparent cursor-pointer text-base font-light"
                >
                  +
                </button>
              </div>
            </div>

            {/* ADD TO BAG */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-4 rounded-xl font-sans text-[0.78rem] font-semibold tracking-[0.18em] uppercase border-none cursor-pointer"
              style={{ background: '#C9AA6B', color: '#0D0A08' }}
            >
              Add to Bag — {formatPrice(product.price * qty)}
            </button>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[#1E1812]" />

            {/* Materials / Specs */}
            {product.specs && (
              <div>
                <p className="font-sans text-[0.65rem] font-semibold tracking-[0.22em] text-[#C9AA6B] uppercase mb-2">
                  Materials
                </p>
                <p className="font-sans text-sm font-light text-[#7A6A58] leading-[1.7] m-0">
                  {Object.entries(product.specs).map(([k, v]) => `${k}: ${v}`).join(' · ')}
                </p>
              </div>
            )}

            {/* Care */}
            <div>
              <p className="font-sans text-[0.65rem] font-semibold tracking-[0.22em] text-[#C9AA6B] uppercase mb-2">
                Care
              </p>
              <p className="font-sans text-sm font-light text-[#7A6A58] leading-[1.7] m-0">
                Store separately in the pouch provided. Avoid contact with perfume and lotions. Clean gently with a soft cloth.
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* You may also like */}
      {(() => {
        const related = products.filter((p) => p.id !== product.id).slice(0, 3);
        if (related.length === 0) return null;
        return (
          <section className="w-full bg-[#0D0A08] py-16 md:py-20 px-6 md:px-12">
            <div className="max-w-[1100px] mx-auto">
              {/* Header */}
              <div className="text-center mb-10">
                <p className="font-sans text-[0.65rem] font-semibold tracking-[0.28em] text-[#C9AA6B] uppercase mb-3">
                  Complete the Set
                </p>
                <h2 className="font-cormorant font-light text-4xl md:text-5xl text-[#FAF4EE] m-0">
                  You may also like
                </h2>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
                {related.map((p) => (
                  <article
                    key={p.id}
                    onClick={() => onNavigate && onNavigate('product', p.id)}
                    className="flex flex-col cursor-pointer group"
                  >
                    <div className="relative w-full overflow-hidden rounded-xl bg-[#16120F]" style={{ aspectRatio: '3/4' }}>
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <span className="absolute top-3.5 left-3.5 bg-[#1A1410]/90 text-[#FAF4EE] px-3 py-1 text-[0.6rem] tracking-[0.18em] font-sans font-semibold uppercase rounded-full border border-[#2E231A] select-none">
                        Bestseller
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between mt-3 px-0.5">
                      <h3 className="font-cormorant font-semibold text-base md:text-lg text-[#FAF4EE] m-0 leading-tight">
                        {p.name}
                      </h3>
                      <span className="font-sans text-sm font-light text-[#7A6A58] shrink-0 ml-4">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p.price)}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      <Footer onBrandClick={() => onNavigate('home')} onNavigate={onNavigate} />

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative max-w-md w-full bg-[#16120F] border border-[#2E231A] p-6 rounded-2xl shadow-2xl text-[#FAF4EE]">
            <button
              type="button"
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-4 right-4 text-[#7A6A58] bg-transparent border-none cursor-pointer p-1"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.5]">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h3 className="font-cormorant text-2xl font-light text-[#FAF4EE] m-0 mb-1">Size Guide</h3>
            <p className="font-sans text-[0.7rem] text-[#7A6A58] mb-5 tracking-wide uppercase">{productType}</p>
            <div className="max-h-[350px] overflow-y-auto">
              {productType === 'Ring' && <RingSizeChart />}
              {productType === 'Bangle' && <BangleSizeChart />}
              {productType === 'Bracelet' && <BraceletSizeChart />}
              {productType === 'Necklace' && <NecklaceSizeChart />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RingSizeChart() {
  const data = [
    { india: '8', usa: '4 ½', cm: '4.6' }, { india: '9', usa: '5', cm: '4.8' },
    { india: '10', usa: '5 ½', cm: '4.9' }, { india: '11', usa: '6', cm: '5.0' },
    { india: '12', usa: '6 ¼', cm: '5.2' }, { india: '13', usa: '6 ½', cm: '5.3' },
    { india: '14', usa: '7', cm: '5.4' }, { india: '15', usa: '7 ½', cm: '5.8' },
    { india: '16', usa: '8', cm: '5.9' }, { india: '17', usa: '8 ½', cm: '7.35' },
    { india: '18', usa: '9', cm: '5.9' }, { india: '19', usa: '9 ½', cm: '6.1' },
    { india: '20', usa: '10', cm: '6.2' },
  ];
  return (
    <table className="w-full text-left text-xs border-collapse font-sans">
      <thead><tr className="border-b border-[#2E231A] text-[#C9AA6B] text-[0.65rem] tracking-wider uppercase">
        <th className="py-2 font-normal">India</th><th className="py-2 font-normal">USA</th><th className="py-2 font-normal">Circumference</th>
      </tr></thead>
      <tbody className="divide-y divide-[#1E1812] text-[#7A6A58]">
        {data.map((r, i) => <tr key={i}><td className="py-2.5 text-[#FAF4EE]">{r.india}</td><td className="py-2.5">{r.usa}</td><td className="py-2.5 text-[#FAF4EE]">{r.cm}</td></tr>)}
      </tbody>
    </table>
  );
}

function BangleSizeChart() {
  const data = [
    { size: '2-2', cm: '17' }, { size: '2-4', cm: '18' }, { size: '2-6', cm: '19' },
    { size: '2-8', cm: '20' }, { size: '2-10', cm: '21' }, { size: '2-12', cm: '22' },
    { size: '2-14', cm: '23' }, { size: '3', cm: '24' },
  ];
  return (
    <table className="w-full text-left text-xs border-collapse font-sans">
      <thead><tr className="border-b border-[#2E231A] text-[#C9AA6B] text-[0.65rem] tracking-wider uppercase">
        <th className="py-2 font-normal">Size</th><th className="py-2 font-normal">Circumference (cm)</th>
      </tr></thead>
      <tbody className="divide-y divide-[#1E1812] text-[#7A6A58]">
        {data.map((r, i) => <tr key={i}><td className="py-2.5 text-[#FAF4EE]">{r.size}</td><td className="py-2.5 text-[#FAF4EE]">{r.cm}</td></tr>)}
      </tbody>
    </table>
  );
}

function BraceletSizeChart() {
  const data = [
    { size: '6.0', cm: '16.5' }, { size: '6.5', cm: '17.7' }, { size: '7.0', cm: '19.0' },
    { size: '7.5', cm: '20.3' }, { size: '8.0', cm: '21.5' },
  ];
  return (
    <table className="w-full text-left text-xs border-collapse font-sans">
      <thead><tr className="border-b border-[#2E231A] text-[#C9AA6B] text-[0.65rem] tracking-wider uppercase">
        <th className="py-2 font-normal">Size (Inches)</th><th className="py-2 font-normal">Circumference (cm)</th>
      </tr></thead>
      <tbody className="divide-y divide-[#1E1812] text-[#7A6A58]">
        {data.map((r, i) => <tr key={i}><td className="py-2.5 text-[#FAF4EE]">{r.size}</td><td className="py-2.5 text-[#FAF4EE]">{r.cm}</td></tr>)}
      </tbody>
    </table>
  );
}

function NecklaceSizeChart() {
  const data = [
    { size: '14"', label: 'Choker', pos: 'Rests at the base of the throat.' },
    { size: '16"', label: 'Collar', pos: 'Sits at the collarbone.' },
    { size: '18"', label: 'Princess', pos: 'Hangs just below the collarbone.' },
    { size: '20"', label: 'Matinee', pos: 'Rests at the top of the bust.' },
  ];
  return (
    <table className="w-full text-left text-xs border-collapse font-sans">
      <thead><tr className="border-b border-[#2E231A] text-[#C9AA6B] text-[0.65rem] tracking-wider uppercase">
        <th className="py-2 font-normal">Length</th><th className="py-2 font-normal">Style</th><th className="py-2 font-normal">Fit</th>
      </tr></thead>
      <tbody className="divide-y divide-[#1E1812] text-[#7A6A58]">
        {data.map((r, i) => <tr key={i}><td className="py-2.5 text-[#FAF4EE]">{r.size}</td><td className="py-2.5 text-[#C9AA6B]">{r.label}</td><td className="py-2.5">{r.pos}</td></tr>)}
      </tbody>
    </table>
  );
}
