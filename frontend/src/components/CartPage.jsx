import React from 'react';
import Navbar from './Navbar';
import { useCart } from '../context/CartContext';
import Footer from './Footer';

const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(price);

export default function CartPage({ onContinueShopping }) {
  const { cartItems, removeItem, updateQuantity, clearCart, totalPrice, itemCount } = useCart();

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between">
      <div className="w-full">
        <Navbar onCartClick={() => {}} onBrandClick={onContinueShopping} alwaysShowBg={true} />
        <main className="max-w-[1100px] mx-auto px-4 md:px-8 pt-32 pb-16">
          {/* Cart Header */}
          <div className="flex items-center justify-between gap-5 mb-10">
            <div className="flex items-center">
              <h1 className="font-sans text-3xl font-light text-neutral-800 m-0">Shopping Cart</h1>
              <span className="inline-flex items-center justify-center bg-neutral-100 text-neutral-600 text-sm font-normal px-2.5 py-0.5 rounded ml-3 select-none">
                {itemCount}
              </span>
            </div>
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="font-sans text-xs tracking-[0.14em] uppercase text-neutral-500 bg-transparent border-none cursor-pointer hover:text-black transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>

          {/* Cart Body */}
          {cartItems.length === 0 ? (
            <div className="border border-neutral-100 bg-white p-12 text-center rounded">
              <p className="font-sans text-xl font-light text-neutral-800 mb-3">Your cart is empty</p>
              <p className="font-sans text-sm font-light text-neutral-400 mb-8">Explore our signature collections to begin your selection.</p>
              <button
                type="button"
                onClick={onContinueShopping}
                className="font-sans text-[0.85rem] font-medium tracking-[0.16em] uppercase text-white bg-black hover:bg-neutral-900 border-none py-3.5 px-8 cursor-pointer transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
              {/* Items List */}
              <section className="bg-white border border-neutral-100 rounded-none divide-y divide-neutral-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-5 p-6 items-start sm:items-center relative">
                    {/* Item Image */}
                    <div className="w-24 h-24 shrink-0 bg-neutral-50 flex items-center justify-center rounded">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <h2 className="font-sans text-base font-normal text-neutral-800 m-0 truncate">{item.name}</h2>
                      <p className="font-sans text-sm font-normal text-neutral-500 m-0 mt-1">{formatPrice(item.price)}</p>
                    </div>

                    {/* Quantity & Delete Controls */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 w-full sm:w-auto self-stretch">
                      {/* Close button (top right style in item container) */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-neutral-400 hover:text-black bg-transparent border-none cursor-pointer p-1 transition-colors self-end sm:self-auto"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[1.5]">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>

                      {/* Quantity Bar */}
                      <div className="flex items-center justify-between bg-neutral-50 rounded py-1.5 px-3 w-32">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="text-neutral-500 hover:text-black bg-transparent border-none cursor-pointer px-2 py-0.5 text-sm font-light select-none"
                        >
                          —
                        </button>
                        <span className="font-sans text-sm text-neutral-800 font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-neutral-500 hover:text-black bg-transparent border-none cursor-pointer px-2 py-0.5 text-sm font-light select-none"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              {/* Order Summary Sidebar */}
              <aside className="bg-white border border-neutral-100 p-6 flex flex-col">
                <h2 className="font-sans text-lg font-normal text-neutral-800 m-0 mb-6">Order Summary</h2>
                <div className="flex justify-between items-center border-t border-neutral-100 pt-5 font-sans text-sm mb-6">
                  <span className="text-neutral-500 font-light">Subtotal</span>
                  <span className="text-neutral-800 font-normal">{formatPrice(totalPrice)}</span>
                </div>
                <button
                  type="button"
                  className="w-full bg-black hover:bg-neutral-900 text-white font-sans text-[0.85rem] font-medium tracking-[0.16em] uppercase py-3.5 border-none cursor-pointer transition-colors"
                >
                  Proceed to Checkout
                </button>
                <button
                  type="button"
                  onClick={onContinueShopping}
                  className="w-full mt-3 bg-transparent border border-neutral-200 text-neutral-600 hover:text-black font-sans text-xs tracking-[0.14em] uppercase py-2.5 cursor-pointer transition-colors"
                >
                  Continue Shopping
                </button>
              </aside>
            </div>
          )}
        </main>
      </div>
      <Footer onBrandClick={onContinueShopping} />
    </div>
  );
}
