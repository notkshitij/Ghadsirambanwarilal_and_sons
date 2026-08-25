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
      {/* Large Image */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-[#16120F] border border-[#2A1F16]" style={{ aspectRatio: '3/4' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Badge */}
        {badge && (
          <span className="absolute top-3.5 left-3.5 bg-[#1A1410]/90 text-[#FAF4EE] px-3 py-1 text-[0.6rem] tracking-[0.18em] font-sans font-semibold uppercase rounded-full border border-[#2E231A] select-none">
            {badge}
          </span>
        )}
      </div>

      {/* Name + Price row */}
      <div className="flex items-baseline justify-between mt-3 px-0.5">
        <h3 className="font-cormorant font-semibold text-base md:text-lg text-[#FAF4EE] m-0 leading-tight">
          {product.name}
        </h3>
        <span className="font-sans text-sm font-light text-[#7A6A58] shrink-0 ml-4">
          {formatPrice(product.price)}
        </span>
      </div>
    </article>
  );
}
