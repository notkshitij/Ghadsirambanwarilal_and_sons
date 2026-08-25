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
      className="fixed z-[10000] bottom-6 right-4 md:right-8 max-w-[calc(100vw-2rem)] bg-[#0D0A08] text-[#FAF4EE] border border-[#D4AF37]/60 shadow-[0_12px_35px_rgba(0,0,0,0.8)] px-5 py-4 flex items-center gap-3 animate-hero-fade-in-up-1 rounded-sm"
    >
      <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#0D0A08] font-bold text-xs flex items-center justify-center">✓</span>
      <span className="font-display text-sm tracking-[0.04em]">{notification}</span>
    </div>
  );
}
