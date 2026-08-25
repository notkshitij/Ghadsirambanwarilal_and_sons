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
    <div className="min-h-screen bg-[#0D0A08] text-[#FAF4EE] flex flex-col justify-between font-sans">
      <div className="w-full">
        <Navbar 
          onCartClick={() => {}} 
          onBookClick={onBookClick} 
          onShopClick={onContinueShopping} 
          onBrandClick={handleBrandClick} 
          onNavigate={onNavigate}
          alwaysShowBg={true} 
        />
        <main className="max-w-[1100px] mx-auto px-6 md:px-8 pt-36 pb-20">
          {/* Cart Header */}
          <div className="flex items-center justify-between gap-5 mb-10 border-b border-[#c89b3c]/20 pb-5">
            <div className="flex items-baseline">
              <h1 className="font-cormorant font-light text-3xl md:text-[2.2rem] tracking-wide text-[#FAF4EE] m-0">Shopping Cart</h1>
              <span className="inline-flex items-center justify-center bg-[#D4AF37]/20 text-[#F4E3A1] border border-[#D4AF37]/40 text-xs font-light px-2.5 py-0.5 rounded-full ml-3.5 select-none">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="font-sans text-xs tracking-[0.16em] uppercase text-[#A69280] hover:text-red-400 bg-transparent border-none cursor-pointer transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Cart Body */}
          {cartItems.length === 0 ? (
            <div className="border border-[#c89b3c]/20 bg-[#16120F] p-16 text-center shadow-2xl">
              <p className="font-cormorant text-2xl font-light text-[#FAF4EE] mb-3">Your cart is empty</p>
              <p className="font-sans text-sm font-light text-[#A69280] mb-8 max-w-[400px] mx-auto leading-relaxed">Explore our signature bridal collections and legacy designs to begin your selection.</p>
              <button
                type="button"
                onClick={onContinueShopping}
                className="shop-now-btn !max-w-xs font-semibold tracking-[0.2em] uppercase cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
              {/* Items List */}
              <section className="flex flex-col gap-6">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedSize || 'standard'}`} className="flex flex-col sm:flex-row gap-5 items-center sm:items-center bg-[#16120F] border border-[#c89b3c]/20 p-5 shadow-lg rounded-sm">
                    {/* Item Image */}
                    <div className="w-24 h-24 shrink-0 bg-[#0D0A08] border border-[#c89b3c]/25 flex items-center justify-center rounded-sm">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <h2 className="font-sans text-base font-normal text-[#FAF4EE] m-0 truncate tracking-wide">{item.name}</h2>
                      {item.selectedSize && (
                        <p className="font-sans text-xs font-light text-[#A69280] m-0 mt-1">Size: {item.selectedSize}</p>
                      )}
                      <p className="font-sans text-sm font-light text-[#F4E3A1] m-0 mt-1.5">{formatPrice(item.price)} each</p>
                    </div>

                    {/* Quantity & Delete Controls */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-5 w-full sm:w-auto self-stretch">
                      {/* Close button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.selectedSize)}
                        aria-label={`Remove ${item.name}`}
                        className="text-[#A69280] hover:text-red-400 hover:scale-110 bg-transparent border-none cursor-pointer p-1 transition-all self-end sm:self-auto"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[1.5]">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>

                      {/* Quantity Bar */}
                      <div className="flex items-center justify-between border border-[#c89b3c]/30 bg-[#0D0A08] rounded-sm py-1.5 px-3 w-32 transition-all hover:border-[#c89b3c]/60">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.selectedSize)}
                          className="text-[#A69280] hover:text-[#D4AF37] bg-transparent border-none cursor-pointer px-2 py-0.5 text-sm font-light select-none transition-colors"
                        >
                          —
                        </button>
                        <span className="font-sans text-sm text-[#FAF4EE] font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                          className="text-[#A69280] hover:text-[#D4AF37] bg-transparent border-none cursor-pointer px-2 py-0.5 text-sm font-light select-none transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              {/* Order Summary Sidebar */}
              <aside className="bg-[#16120F] border border-[#c89b3c]/30 border-t-4 border-t-[#D4AF37] p-7 flex flex-col shadow-2xl">
                <h2 className="font-cormorant text-xl font-normal text-[#FAF4EE] tracking-wide m-0 mb-6 uppercase">Order Summary</h2>
                
                <div className="flex flex-col gap-4 font-sans text-sm mb-6 border-b border-[#c89b3c]/20 pb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[#D9C8B4] font-light">Subtotal</span>
                    <span className="text-[#FAF4EE] font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#D9C8B4] font-light">Shipping</span>
                    <span className="text-[#D4AF37] font-medium tracking-wide uppercase text-xs">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-[#A69280]">
                    <span>Tax (GST)</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline mb-6">
                  <span className="font-sans text-sm text-[#FAF4EE] font-normal">Total</span>
                  <span className="font-cormorant text-2xl font-semibold text-[#F4E3A1]">{formatPrice(totalPrice)}</span>
                </div>

                <button
                  type="button"
                  onClick={onCheckout}
                  className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F4E3A1] to-[#C89B3C] hover:brightness-110 text-[#0D0A08] font-sans text-xs font-semibold tracking-[0.2em] uppercase py-4 border-none cursor-pointer transition-all duration-300 shadow-lg"
                >
                  Proceed to Checkout
                </button>
                <button
                  type="button"
                  onClick={onContinueShopping}
                  className="w-full mt-3.5 bg-transparent border border-[#c89b3c]/30 text-[#D9C8B4] hover:text-[#FAF4EE] hover:border-[#D4AF37] font-sans text-xs tracking-[0.16em] uppercase py-3 cursor-pointer transition-all"
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
