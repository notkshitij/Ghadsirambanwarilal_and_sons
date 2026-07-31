import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartToast() {
  const { notification } = useCart();

  if (!notification) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed z-[10000] bottom-6 right-4 md:right-8 max-w-[calc(100vw-2rem)] bg-[#150305] text-[#fff6ea] border border-gold-primary/60 shadow-[0_12px_30px_rgba(0,0,0,0.3)] px-5 py-4 flex items-center gap-3 animate-hero-fade-in-up-1"
    >
      <span className="w-5 h-5 rounded-full bg-gold-primary text-mahogany-dark font-bold text-xs flex items-center justify-center">✓</span>
      <span className="font-display text-sm tracking-[0.04em]">{notification}</span>
    </div>
  );
}
