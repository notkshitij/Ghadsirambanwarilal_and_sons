import React from 'react';
import { useCart } from '../context/CartContext';

const formatPriceShort = (price) => {
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2).replace(/\.00$/, '')}L`;
  }
  return `₹${(price / 1000).toFixed(1).replace(/\.0$/, '')}K`;
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="w-full flex flex-col group transition-all duration-500">
      {/* Square Image Box */}
      <div className="relative aspect-square w-full bg-[#f6f5f3] hover:bg-[#eae9e6] flex items-center justify-center overflow-hidden transition-all duration-500">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-[90%] h-[90%] object-contain mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105" 
        />
        
        {/* Subtle Price Tag (Bottom-Right) */}
        <span className="absolute bottom-3.5 right-3.5 bg-white/95 px-2.5 py-0.5 text-[0.65rem] tracking-[0.16em] text-neutral-600 font-sans shadow-sm select-none border border-neutral-100 font-medium">
          {formatPriceShort(product.price)}
        </span>

        {/* Hover Quick Add Overlay */}
        <div className="absolute inset-0 bg-[#150305]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10 pointer-events-none group-hover:pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addItem(product);
            }}
            className="bg-white hover:bg-neutral-900 hover:text-white text-neutral-800 text-[0.68rem] font-sans font-semibold tracking-[0.2em] uppercase py-3.5 px-6 border-none shadow-[0_4px_15px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Label and horizontal line separator */}
      <div className="mt-4.5 flex items-center gap-3">
        <h5 className="font-sans text-[0.78rem] font-normal tracking-[0.12em] uppercase text-neutral-800 m-0 whitespace-nowrap">
          {product.name}
        </h5>
        <div className="flex-1 h-[1px] bg-neutral-200" />
      </div>
    </article>
  );
}
