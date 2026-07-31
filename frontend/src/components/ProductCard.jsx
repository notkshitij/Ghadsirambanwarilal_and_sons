import React from 'react';
import { useCart } from '../context/CartContext';

const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(price);

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="bg-[#fcfbfa] border border-[#c6a076]/25 rounded-sm overflow-hidden hover:-translate-y-2 hover:border-gold-primary/70 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-500">
      <div className="h-48 bg-[url('/background.png')] bg-center bg-cover flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[#150305]/55" />
        <img src={product.image} alt={product.name} className="relative z-10 w-28 h-28 object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)]" />
      </div>
      <div className="p-7">
        <span className="font-display text-[0.7rem] font-semibold tracking-[0.2em] text-[#c6a076] uppercase">{product.category}</span>
        <h5 className="font-display text-xl font-medium tracking-[0.06em] text-mahogany-dark mt-3 mb-2">{product.name}</h5>
        <p className="font-display text-gold-dark text-lg mb-6">{formatPrice(product.price)}</p>
        <button
          type="button"
          onClick={() => addItem(product)}
          className="w-full font-display text-[0.75rem] font-semibold tracking-[0.16em] uppercase text-mahogany-dark bg-gradient-to-br from-[#fbe8d0] via-gold-primary to-[#9a7550] border-none py-3 cursor-pointer hover:brightness-110 transition-all duration-300"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
