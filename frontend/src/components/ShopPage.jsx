import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductCard from './ProductCard';
import { useProductsStore } from '../data/products';

// Assign badges to first few products
const badges = ['Bestseller', 'New', null, null, null];

const CATEGORY_META = {
  All: {
    tag: 'The Collection',
    title: 'Shop',
    desc: 'A quiet catalogue of fine jewellery — crafted with care and kept for a lifetime.',
  },
  Necklaces: {
    tag: 'Curated Creations',
    title: 'Necklaces',
    desc: 'Handcrafted royal pendants, uncut polki necklaces, and timeless bridal chokers.',
  },
  Bracelets: {
    tag: 'Signature Adornments',
    title: 'Bracelets',
    desc: 'Royal handcrafted pounchis and luxury bracelets studded with authentic gemstones and gold.',
  },
  'Hair Clips': {
    tag: 'Artisanal Ornaments',
    title: 'Hair Clips',
    desc: 'Opulent artisanal hair clips adorned with brilliant polki diamonds, rich colour stones, and cascading pearls.',
  },
};

export default function ShopPage({ 
  onNavigate, 
  onCartClick, 
  initialCategory = 'All',
  onSelectCategory 
}) {
  const { products } = useProductsStore();
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'All');

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleBrandClick = () => {
    if (onNavigate) onNavigate('home');
  };

  const handleShopClick = () => {
    setActiveCategory('All');
    if (onSelectCategory) onSelectCategory('All');
    else if (onNavigate) onNavigate('shop');
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  // Filter products based on active category
  const filteredProducts = products.filter((product) => {
    if (activeCategory === 'All') return true;
    const sub = (product.subcategory || '').toLowerCase();
    const cat = (product.category || '').toLowerCase();
    const name = (product.name || '').toLowerCase();

    if (activeCategory === 'Necklaces') {
      return (
        sub.includes('necklace') ||
        sub.includes('pendant') ||
        sub.includes('choker') ||
        name.includes('necklace') ||
        name.includes('pendant') ||
        name.includes('choker')
      );
    }
    if (activeCategory === 'Bracelets') {
      return (
        sub.includes('bracelet') ||
        sub.includes('pounchi') ||
        sub.includes('bangle') ||
        name.includes('bracelet') ||
        name.includes('pounchi') ||
        name.includes('bangle')
      );
    }
    if (activeCategory === 'Hair Clips') {
      return (
        sub.includes('hair') ||
        sub.includes('clip') ||
        name.includes('hair') ||
        name.includes('clip')
      );
    }
    return sub === activeCategory.toLowerCase() || cat === activeCategory.toLowerCase();
  });

  const meta = CATEGORY_META[activeCategory] || {
    tag: 'The Collection',
    title: activeCategory,
    desc: `Handcrafted fine signature jewellery in ${activeCategory}.`,
  };

  const categoriesList = ['All', 'Necklaces', 'Bracelets', 'Hair Clips'];

  return (
    <div className="min-h-screen bg-[#0D0A08] text-[#FAF4EE] flex flex-col justify-between font-sans">
      <Navbar
        onCartClick={onCartClick}
        onBookClick={() => { if (onNavigate) onNavigate('appointment'); }}
        onShopClick={handleShopClick}
        onBrandClick={handleBrandClick}
        onNavigate={onNavigate}
        alwaysShowBg={true}
      />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 md:px-12 pt-36 pb-24">
        {/* Page Header */}
        <div className="mb-12">
          <p className="font-sans text-[0.68rem] font-semibold tracking-[0.28em] text-[#C9AA6B] uppercase mb-4">
            {meta.tag}
          </p>
          <h1 className="font-cormorant font-light text-6xl md:text-7xl text-[#FAF4EE] m-0 mb-5 leading-[1]">
            {meta.title}
          </h1>
          <p className="font-sans text-sm font-light text-[#7A6A58] leading-[1.7] m-0 max-w-[480px]">
            {meta.desc}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
                badge={activeCategory === 'All' ? badges[idx] || null : null}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <p className="font-cormorant text-2xl text-[#A69280] italic mb-4">
              No pieces found in this category.
            </p>
            <button
              type="button"
              onClick={() => handleCategoryChange('All')}
              className="px-6 py-2.5 bg-[#16120F] border border-[#C9AA6B]/40 text-[#C9AA6B] text-xs uppercase tracking-wider rounded-lg cursor-pointer"
            >
              View All Collection
            </button>
          </div>
        )}
      </main>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
