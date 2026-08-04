import React from 'react';
import Navbar from './Navbar';
import { useCart } from '../context/CartContext';
import Footer from './Footer';

const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(price);

export default function CartPage({ onContinueShopping, onBackToHome, onBookClick, onNavigate, onCheckout }) {
  const { cartItems, removeItem, updateQuantity, clearCart, totalPrice, itemCount } = useCart();

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

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between font-sans">
      <div className="w-full">
        <Navbar 
          onCartClick={() => {}} 
          onBookClick={onBookClick} 
          onShopClick={onContinueShopping} 
          onBrandClick={handleBrandClick} 
          alwaysShowBg={true} 
        />
        <main className="max-w-[1100px] mx-auto px-6 md:px-8 pt-36 pb-20">
          {/* Cart Header */}
          <div className="flex items-center justify-between gap-5 mb-10 border-b border-neutral-100 pb-5">
            <div className="flex items-baseline">
              <h1 className="font-cormorant font-light text-3xl md:text-[2.2rem] tracking-wide text-neutral-900 m-0">Shopping Cart</h1>
              <span className="inline-flex items-center justify-center bg-neutral-100 text-neutral-600 text-xs font-light px-2.5 py-0.5 rounded-full ml-3.5 select-none">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="font-sans text-xs tracking-[0.16em] uppercase text-neutral-400 bg-transparent border-none cursor-pointer hover:text-red-700 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Cart Body */}
          {cartItems.length === 0 ? (
            <div className="border border-neutral-100 bg-[#fdfcfb] p-16 text-center shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
              <p className="font-cormorant text-2xl font-light text-neutral-800 mb-3">Your cart is empty</p>
              <p className="font-sans text-sm font-light text-neutral-400 mb-8 max-w-[400px] mx-auto leading-relaxed">Explore our signature bridal collections and legacy designs to begin your selection.</p>
              <button
                type="button"
                onClick={onContinueShopping}
                className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-white bg-[#111] hover:bg-[#c89b3c] border-none py-4 px-10 cursor-pointer transition-all duration-300 shadow-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
              {/* Items List */}
              <section className="flex flex-col gap-6">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedSize || 'standard'}`} className="flex flex-col sm:flex-row gap-5 items-center sm:items-center bg-[#fdfcfb] border border-neutral-100/60 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] rounded-sm">
                    {/* Item Image */}
                    <div className="w-24 h-24 shrink-0 bg-[#fdfcfb] border border-neutral-100/60 flex items-center justify-center rounded-sm">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <h2 className="font-sans text-base font-normal text-neutral-900 m-0 truncate tracking-wide">{item.name}</h2>
                      {item.selectedSize && (
                        <p className="font-sans text-xs font-light text-neutral-400 m-0 mt-1">Size: {item.selectedSize}</p>
                      )}
                      <p className="font-sans text-sm font-light text-neutral-500 m-0 mt-1.5">{formatPrice(item.price)} each</p>
                    </div>

                    {/* Quantity & Delete Controls */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-5 w-full sm:w-auto self-stretch">
                      {/* Close button (top right style in item container) */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.selectedSize)}
                        aria-label={`Remove ${item.name}`}
                        className="text-neutral-400 hover:text-black hover:scale-110 bg-transparent border-none cursor-pointer p-1 transition-all self-end sm:self-auto"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[1.5]">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>

                      {/* Quantity Bar */}
                      <div className="flex items-center justify-between border border-neutral-200/60 bg-neutral-50/50 rounded-sm py-1.5 px-3 w-32 transition-all hover:border-neutral-300">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.selectedSize)}
                          className="text-neutral-400 hover:text-black bg-transparent border-none cursor-pointer px-2 py-0.5 text-sm font-light select-none transition-colors"
                        >
                          —
                        </button>
                        <span className="font-sans text-sm text-neutral-800 font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                          className="text-neutral-400 hover:text-black bg-transparent border-none cursor-pointer px-2 py-0.5 text-sm font-light select-none transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              {/* Order Summary Sidebar */}
              <aside className="bg-[#fdfcfb] border border-[#c6a076]/20 border-t-4 border-t-[#c89b3c] p-7 flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                <h2 className="font-cormorant text-xl font-normal text-neutral-900 tracking-wide m-0 mb-6 uppercase">Order Summary</h2>
                
                <div className="flex flex-col gap-4 font-sans text-sm mb-6 border-b border-neutral-100 pb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 font-light">Subtotal</span>
                    <span className="text-neutral-800 font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 font-light">Shipping</span>
                    <span className="text-[#c89b3c] font-medium tracking-wide uppercase text-xs">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-neutral-400">
                    <span>Tax (GST)</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline mb-6">
                  <span className="font-sans text-sm text-neutral-900 font-normal">Total</span>
                  <span className="font-cormorant text-2xl font-semibold text-neutral-900">{formatPrice(totalPrice)}</span>
                </div>

                <button
                  type="button"
                  onClick={onCheckout}
                  className="w-full bg-[#111] hover:bg-[#c89b3c] text-white font-sans text-xs font-semibold tracking-[0.2em] uppercase py-4 border-none cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Proceed to Checkout
                </button>
                <button
                  type="button"
                  onClick={onContinueShopping}
                  className="w-full mt-3.5 bg-transparent border border-neutral-200 text-neutral-500 hover:text-black font-sans text-xs tracking-[0.16em] uppercase py-3 cursor-pointer transition-all hover:border-neutral-400"
                >
                  Continue Shopping
                </button>
              </aside>
            </div>
          )}
        </main>
      </div>
      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
