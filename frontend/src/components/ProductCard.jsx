import React from 'react';

const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(price);

export default function ProductCard({ product, onNavigate, badge }) {
  return (
    <article
      onClick={() => onNavigate && onNavigate('product', product.id)}
      className="w-full flex flex-col cursor-pointer group"
    >
      {/* Large Image Card */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-[#16120F] border border-[#2A1F16] transition-all duration-300 group-hover:border-[#C9AA6B]/30" style={{ aspectRatio: '3/4' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Badge */}
        {badge && (
          <span className="absolute top-3.5 left-3.5 bg-[#16120F]/85 backdrop-blur-md text-[#C9AA6B] px-3 py-1 text-[0.6rem] tracking-[0.22em] font-sans font-semibold uppercase rounded-full border border-[#C9AA6B]/25 select-none shadow-md">
            {badge}
          </span>
        )}
      </div>

      {/* Name + Price row */}
      <div className="flex items-baseline justify-between mt-3.5 px-0.5">
        <h3 className="font-serif font-bold text-base md:text-[1.05rem] text-[#FAF4EE] m-0 leading-tight group-hover:text-[#C9AA6B] transition-colors">
          {product.name}
        </h3>
        <span className="font-sans text-sm font-light text-[#8C7A6B] shrink-0 ml-3">
          {formatPrice(product.price)}
        </span>
      </div>
    </article>
  );
}
