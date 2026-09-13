import React, { useState, useRef } from 'react';

const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(price);

export default function ProductCard({ product, onNavigate, badge }) {
  const [isHovered, setIsHovered] = useState(false);
  const imageContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update glow coordinates
    imageContainerRef.current.style.setProperty('--mouse-x', `${x}px`);
    imageContainerRef.current.style.setProperty('--mouse-y', `${y}px`);

    // Calculate 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; // Max 8 deg tilt
    const rotateY = ((x - centerX) / centerX) * 8;

    imageContainerRef.current.style.setProperty('--rotate-x', `${rotateX}deg`);
    imageContainerRef.current.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (imageContainerRef.current) {
      // Reset rotation on leave smoothly
      imageContainerRef.current.style.setProperty('--rotate-x', `0deg`);
      imageContainerRef.current.style.setProperty('--rotate-y', `0deg`);
    }
  };

  return (
    <article
      onClick={() => onNavigate && onNavigate('product', product.id)}
      className="w-full flex flex-col cursor-pointer group"
      style={{ perspective: '1000px' }}
    >
      {/* Large Image Card */}
      <div
        ref={imageContainerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full overflow-hidden rounded-2xl bg-[#16120F] border border-[#2A1F16] transition-all group-hover:border-[#C9AA6B]/40"
        style={{ 
          aspectRatio: '3/4',
          transform: isHovered ? 'rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale3d(1.02, 1.02, 1.02)' : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out, border-color 0.3s',
          transformStyle: 'preserve-3d'
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Cursor Glow / Spotlight Effect */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ease-out"
          style={{
            opacity: isHovered ? 1 : 0,
            background: 'radial-gradient(160px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 238, 205, 0.38) 0%, rgba(201, 170, 107, 0.20) 32%, rgba(201, 170, 107, 0.06) 60%, transparent 80%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Badge */}
        {badge && (
          <span className="relative z-20 absolute top-3.5 left-3.5 bg-[#16120F]/85 backdrop-blur-md text-[#C9AA6B] px-3 py-1 text-[0.6rem] tracking-[0.22em] font-sans font-semibold uppercase rounded-full border border-[#C9AA6B]/25 select-none shadow-md">
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

