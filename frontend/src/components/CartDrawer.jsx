import React from 'react';
import { useCart } from '../context/CartContext';

const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(price);

export default function CartDrawer({ isOpen, onClose, onCheckout }) {
  const { cartItems, removeItem, updateQuantity, totalPrice, itemCount } = useCart();

  return (
    <div className={`fixed inset-0 z-[100] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className={`absolute inset-0 w-full h-full bg-black/60 border-none transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Drawer Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        className={`absolute right-0 top-0 h-full w-full max-w-[420px] bg-[#12100E] text-[#FAF4EE] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5">
          <span className="font-sans text-base font-semibold tracking-wide text-[#FAF4EE]">
            Your Bag ({itemCount})
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="text-[#FAF4EE] bg-transparent border-none cursor-pointer flex items-center justify-center p-1"
          >
            <span className="text-xl font-light leading-none">×</span>
          </button>
        </header>

        {/* Thin divider */}
        <div className="w-full h-[1px] bg-[#1E1812]" />

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <p className="font-sans text-sm font-light text-[#7A6A58] m-0">Your bag is empty.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <article key={`${item.id}-${item.selectedSize || 'standard'}`} className="flex flex-col pb-6 border-b border-[#1E1812] last:border-none">
                  <div className="flex gap-4 items-start relative">
                    <div className="w-16 h-16 shrink-0 bg-[#1A1510] flex items-center justify-center rounded-md overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                    </div>
                    <div className="min-w-0 flex-1 pr-6">
                      <h3 className="font-sans text-sm font-normal text-[#FAF4EE] m-0 truncate">{item.name}</h3>
                      {item.selectedSize && (
                        <p className="font-sans text-[0.7rem] font-light text-[#7A6A58] m-0 mt-0.5">Size: {item.selectedSize}</p>
                      )}
                      <p className="font-sans text-xs font-light text-[#C9AA6B] m-0 mt-1">{formatPrice(item.price)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id, item.selectedSize)}
                      aria-label={`Remove ${item.name}`}
                      className="absolute right-0 top-0 text-[#5A4C3D] bg-transparent border-none cursor-pointer p-1"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-[1.5]">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-4 mt-3 ml-20">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.selectedSize)}
                      className="text-[#7A6A58] bg-transparent border-none cursor-pointer text-sm px-1 select-none"
                    >—</button>
                    <span className="font-sans text-xs text-[#FAF4EE]">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                      className="text-[#7A6A58] bg-transparent border-none cursor-pointer text-sm px-1 select-none"
                    >+</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="px-6 pb-8 pt-5 border-t border-[#1E1812]">
          <div className="flex justify-between items-center mb-4">
            <span className="font-sans text-[0.65rem] font-semibold tracking-[0.22em] text-[#7A6A58] uppercase">Subtotal</span>
            <span className="font-sans text-base font-semibold text-[#FAF4EE]">{formatPrice(totalPrice)}</span>
          </div>
          <button
            type="button"
            disabled={cartItems.length === 0}
            onClick={() => { onClose(); if (onCheckout) onCheckout(); }}
            className="w-full bg-[#1E1812] text-[#FAF4EE] font-sans text-[0.72rem] font-semibold tracking-[0.22em] uppercase py-4 cursor-pointer border-none rounded-lg disabled:opacity-40 disabled:cursor-not-allowed select-none"
          >
            Checkout
          </button>
        </footer>
      </aside>
    </div>
  );
}
