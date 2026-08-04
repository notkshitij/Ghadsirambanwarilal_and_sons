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
        aria-label="Close cart shadow"
        onClick={onClose}
        className={`absolute inset-0 w-full h-full bg-black/40 border-none transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Drawer Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        data-lenis-prevent
        className={`absolute right-0 top-0 h-full w-full max-w-[430px] bg-white text-black shadow-[-10px_0_30px_rgba(0,0,0,0.08)] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-white">
          <div className="flex items-baseline">
            <span className="font-cormorant text-xl font-light tracking-wide text-neutral-900">Your Cart</span>
            <span className="inline-flex items-center justify-center bg-neutral-100 text-neutral-600 text-xs font-light px-2 py-0.5 ml-2.5 rounded-full select-none">
              {itemCount}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="text-neutral-400 hover:text-black bg-transparent border-none cursor-pointer flex items-center justify-center p-1.5 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.25]">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <p className="font-cormorant text-xl font-light text-neutral-800 mb-2">Your cart is empty</p>
              <p className="font-sans text-xs font-light text-neutral-400 m-0">Your chosen bridal and fine luxury pieces will appear here.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <article key={`${item.id}-${item.selectedSize || 'standard'}`} className="flex flex-col pb-6 border-b border-neutral-100/70 last:border-none">
                  {/* Top Item Row (Image, Details, Delete) */}
                  <div className="flex gap-4 items-start relative">
                    <div className="w-16 h-16 shrink-0 bg-[#fdfcfb] border border-neutral-100/60 flex items-center justify-center rounded-sm">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                    </div>
                    <div className="min-w-0 flex-1 pr-6">
                      <h3 className="font-sans text-sm font-normal text-neutral-900 m-0 truncate tracking-wide">{item.name}</h3>
                      {item.selectedSize && (
                        <p className="font-sans text-[0.7rem] font-light text-neutral-400 m-0 mt-0.5">Size: {item.selectedSize}</p>
                      )}
                      <p className="font-sans text-xs font-light text-neutral-500 m-0 mt-1">{formatPrice(item.price)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id, item.selectedSize)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="absolute right-0 top-0 text-neutral-400 hover:text-red-700 bg-transparent border-none cursor-pointer p-1 transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-[1.5]">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>

                  {/* Quantity Selector Bar */}
                  <div className="flex items-center justify-between mt-3.5 border border-neutral-200/60 bg-neutral-50/50 rounded-sm py-1.5 px-3 w-full">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.selectedSize)}
                      className="text-neutral-400 hover:text-black bg-transparent border-none cursor-pointer px-3 py-0.5 text-sm font-light select-none transition-colors"
                    >
                      —
                    </button>
                    <span className="font-sans text-xs text-neutral-800 font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                      className="text-neutral-400 hover:text-black bg-transparent border-none cursor-pointer px-3 py-0.5 text-sm font-light select-none transition-colors"
                    >
                      +
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="p-6 border-t border-[#c6a076]/20 bg-[#fdfcfb]">
          <div className="flex justify-between items-baseline font-sans mb-5">
            <span className="text-neutral-500 font-light text-sm">Subtotal</span>
            <span className="font-cormorant text-xl font-semibold text-neutral-900">{formatPrice(totalPrice)}</span>
          </div>
          <button
            type="button"
            disabled={cartItems.length === 0}
            onClick={() => {
              onClose();
              if (onCheckout) onCheckout();
            }}
            className="w-full bg-[#111] hover:bg-[#c89b3c] text-white font-sans text-xs font-semibold tracking-[0.2em] uppercase py-4 cursor-pointer transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#111] select-none rounded-none shadow-md"
          >
            Checkout
          </button>
        </footer>
      </aside>
    </div>
  );
}
