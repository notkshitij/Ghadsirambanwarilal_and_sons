import React from 'react';

const formatPriceShort = (price) => {
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2).replace(/\.00$/, '')}L`;
  }
  return `₹${(price / 1000).toFixed(1).replace(/\.0$/, '')}K`;
};

export default function ProductCard({ product, onNavigate }) {
  return (
    <article 
      onClick={() => onNavigate && onNavigate('product', product.id)}
      className="w-full flex flex-col group hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(0,0,0,0.03)] transition-all duration-500 rounded-sm cursor-pointer"
    >
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
      </div>
    </article>
  );
}
