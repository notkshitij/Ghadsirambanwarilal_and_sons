import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function ProductDetailsPage({ productId, onNavigate, onCartClick }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState('');

  const product = products.find((p) => p.id === productId);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setQty(1);
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
    addItem(product, qty);
  };

  const handleBuyNow = () => {
    addItem(product, qty);
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
    </div>
  );
}
