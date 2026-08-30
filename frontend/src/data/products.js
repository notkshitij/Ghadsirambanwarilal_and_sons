import { useState, useEffect } from 'react';

import diff1 from '../assets/Product Image/diff product/diff_product_1.png';
import diff2 from '../assets/Product Image/diff product/diff_product_2.png';
import diff3 from '../assets/Product Image/diff product/diff_product_3.png';
import diff4 from '../assets/Product Image/diff product/diff_product_4.png';

import diff2_1 from '../assets/Product Image/diff product 2/diff_product_1.png';
import diff2_2 from '../assets/Product Image/diff product 2/diff_product_2.png';
import diff2_3 from '../assets/Product Image/diff product 2/diff_product_3.png';
import diff2_4 from '../assets/Product Image/diff product 2/diff_product_4.png';

import diff3_1 from '../assets/Product Image/diff product 3/diff_product_1.png';
import diff3_2 from '../assets/Product Image/diff product 3/diff_product_2.png';

import diff4_1 from '../assets/Product Image/diff product 4/diff_product_1.png';
import diff4_2 from '../assets/Product Image/diff product 4/diff_product_2.png';

import diff5_1 from '../assets/Product Image/diff product 5/diff_product_1.png';
import diff5_2 from '../assets/Product Image/diff product 5/diff_product_2.png';
import diff5_3 from '../assets/Product Image/diff product 5/diff_product_3.png';

import diff6_1 from '../assets/Product Image/diff product 6/diff_product_1.png';
import diff6_2 from '../assets/Product Image/diff product 6/diff_product_2.png';
import diff6_3 from '../assets/Product Image/diff product 6/diff_product_3.png';

import diff7_1 from '../assets/Product Image/diff product 7/diff_product_1.png';
import diff7_2 from '../assets/Product Image/diff product 7/diff_product_2.png';
import diff7_3 from '../assets/Product Image/diff product 7/diff_product_3.png';
import diff7_4 from '../assets/Product Image/diff product 7/diff_product_4.png';

export const INITIAL_PRODUCTS = [
  {
    id: 'mayur-meenakari-polki-pendant',
    name: 'Mayur Meenakari Polki & Pearl Pendant',
    price: 56650,
    originalPrice: 72000,
    stock: 18,
    image: diff3,
    images: [diff3, diff4, diff1, diff2],
    category: 'Polki & Kundan',
    subcategory: 'Necklaces',
    description: 'An exquisite handcrafted peacock motif pendant with delicate pearl tassel, vivid meenakari enamel artistry, fine uncut polki, and rich gemstone accents.',
    materials: 'Handcrafted in 24K gold finish with uncut polki diamonds, vivid meenakari enamel, and cultured pearls.',
    care: 'Store separately in the suede pouch provided. Avoid contact with perfume and lotions. Clean gently with a soft cloth.',
    specs: {
      'Gold': '1.5gm (approx)',
      'Colour stones': '30 carats',
      'Polki': '2.70 carats',
      'Pearls': '28 carats'
    }
  },
  {
    id: 'padma-meenakari-ruby-pendant',
    name: 'Padma Meenakari Ruby & Pearl Pendant',
    price: 41200,
    originalPrice: 58000,
    stock: 15,
    image: diff2_4,
    images: [diff2_4, diff2_2, diff2_1, diff2_3],
    category: 'Polki & Kundan',
    subcategory: 'Necklaces',
    description: 'A regal handcrafted black meenakari leaf pendant studded with uncut polki, rubies, and strung with ruby beads and a south sea pearl tassel.',
    materials: 'Crafted in fine gold finish with uncut polki diamonds, natural rubies, and south sea pearl tassel.',
    care: 'Store separately in the pouch provided. Avoid contact with perfume, moisture, and water.',
    specs: {
      'Gold': '1.2 gms (approx)',
      'Colour stones': '25 carats',
      'Polki': '0.50 carats',
      'Pearls': '10 carats'
    }
  },
  {
    id: 'the-golden-eagle-pendant',
    name: 'The Golden Eagle',
    price: 65000,
    originalPrice: 85000,
    stock: 14,
    image: diff6_1,
    images: [diff6_1, diff6_2, diff6_3],
    category: 'Polki & Kundan',
    subcategory: 'Necklaces',
    description: 'A majestic golden eagle motif pendant handcrafted with intricate polki diamond wings, emerald and ruby centerpieces, and strung with emerald bead strings and pearl drops.',
    materials: 'Authentic royal eagle motif pendant in gold with polki diamonds, carved emeralds, rubies, and pearls.',
    care: 'Keep in dry, ambient environment. Wipe gently with microfibre cloth after wearing.',
    specs: {
      'Gold': '2.5 gram (approx)',
      'Polki': '3.5 carats',
      'Colour stones': '35 carats',
      'Pearls': '25 carats',
      'Size': '18"'
    }
  },
  {
    id: 'turquoise-pounchi-bracelet',
    name: 'Turquoise Pounchi Bracelet',
    price: 50000,
    originalPrice: 68000,
    stock: 10,
    image: diff7_1,
    images: [diff7_1, diff7_2, diff7_3, diff7_4],
    category: 'Polki & Kundan',
    subcategory: 'Bracelets',
    description: 'A traditional royal pounchi bracelet handcrafted in authentic Irani Firoza (Turquoise) with floral gold framing, ruby accents, and embossed gold back artistry.',
    materials: 'Authentic Irani Firoza (Turquoise) with 22K gold framing, ruby centers, and gold floral embossed reverse.',
    care: 'Protect from hard surfaces, perfumes, and direct water exposure. Store in velvet jewelry case.',
    specs: {
      'Gold': '1.7 gms approx',
      'Colour stones': '20 carats',
      'Material': 'Authentic Irani Firoza',
      'Size': 'Free Size (Adjustable)'
    }
  },
  {
    id: 'royal-chandrika-necklace',
    name: 'Royal Chandrika Necklace',
    price: 250000,
    originalPrice: 320000,
    stock: 12,
    image: diff3_1,
    images: [diff3_1, diff3_2],
    category: 'Polki & Kundan',
    subcategory: 'Necklaces',
    materials: 'Solid gold craftsmanship with certified uncut polki diamonds and south sea pearls.',
    care: 'Store flat in velvet case. Do not bend or expose to harsh chemicals.',
    specs: {
      'Gold': '5-6 gram (approx)',
      'Polki': '7 carats',
      'Pearls': '41 carats'
    }
  },
  {
    id: 'aranya-navratna-pendant',
    name: 'Aranya Navratna Pendant',
    price: 65000,
    originalPrice: 95000,
    stock: 53,
    image: diff4_1,
    images: [diff4_1, diff4_2],
    category: 'Polki & Kundan',
    subcategory: 'Necklaces',
    materials: 'Navratna gemstones, uncut polki diamonds, and fluted emerald bead stringing.',
    care: 'Store in suede pouch. Clean with soft dry lint-free cloth.',
    specs: {
      'Gold': '2gram (approx)',
      'Polki': '0.80 carats',
      'Stones': '7 carats'
    }
  },
  {
    id: 'navaratna-splendor-choker',
    name: 'Navaratna Splendor Choker',
    price: 320000,
    originalPrice: 450000,
    stock: 8,
    image: diff5_1,
    images: [diff5_1, diff5_2, diff5_3],
    category: 'Polki & Kundan',
    subcategory: 'Necklaces',
    materials: 'Heritage navratna gemstones set with jadau polki craftsmanship in rich gold framing.',
    care: 'Avoid moisture, perfumes, and chemical cleaners. Store in original box.',
    specs: {
      'Gold': '14-15 gram (approx)',
      'Polki': '8 carats',
      'Stones': '65 carats'
    }
  },
];

export const INITIAL_CATEGORIES = ['Necklaces', 'Bracelets'];

// Image asset map for default product fallback
const DEFAULT_IMAGE_MAP = {
  'mayur-meenakari-polki-pendant': { image: diff3, images: [diff3, diff4, diff1, diff2] },
  'padma-meenakari-ruby-pendant': { image: diff2_4, images: [diff2_4, diff2_2, diff2_1, diff2_3] },
  'the-golden-eagle-pendant': { image: diff6_1, images: [diff6_1, diff6_2, diff6_3] },
  'turquoise-pounchi-bracelet': { image: diff7_1, images: [diff7_1, diff7_2, diff7_3, diff7_4] },
  'royal-chandrika-necklace': { image: diff3_1, images: [diff3_1, diff3_2] },
  'aranya-navratna-pendant': { image: diff4_1, images: [diff4_1, diff4_2] },
  'navaratna-splendor-choker': { image: diff5_1, images: [diff5_1, diff5_2, diff5_3] },
};

export const getStoredProducts = () => {
  try {
    const raw = localStorage.getItem('gb_admin_products');
    if (!raw) return INITIAL_PRODUCTS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_PRODUCTS;

    // Rehydrate default product images if needed
    return parsed.map((p) => {
      if (DEFAULT_IMAGE_MAP[p.id] && (!p.image || typeof p.image === 'object')) {
        return {
          ...p,
          image: p.image || DEFAULT_IMAGE_MAP[p.id].image,
          images: p.images && p.images.length > 0 ? p.images : DEFAULT_IMAGE_MAP[p.id].images,
        };
      }
      return p;
    });
  } catch (err) {
    console.warn('Error reading stored products:', err);
    return INITIAL_PRODUCTS;
  }
};

export const saveStoredProducts = (newProducts) => {
  try {
    localStorage.setItem('gb_admin_products', JSON.stringify(newProducts));
    window.dispatchEvent(new CustomEvent('products-updated', { detail: newProducts }));
  } catch (err) {
    console.error('Error saving products:', err);
  }
};

export const getStoredCategories = () => {
  try {
    const raw = localStorage.getItem('gb_admin_categories');
    if (!raw) return INITIAL_CATEGORIES;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_CATEGORIES;
    return Array.from(new Set([...INITIAL_CATEGORIES, ...parsed]));
  } catch (err) {
    return INITIAL_CATEGORIES;
  }
};

export const saveStoredCategories = (categories) => {
  try {
    localStorage.setItem('gb_admin_categories', JSON.stringify(categories));
    window.dispatchEvent(new CustomEvent('categories-updated', { detail: categories }));
  } catch (err) {
    console.error('Error saving categories:', err);
  }
};

// React hook to access live products & categories across any component
export function useProductsStore() {
  const [productList, setProductList] = useState(getStoredProducts);
  const [categoryList, setCategoryList] = useState(getStoredCategories);

  useEffect(() => {
    const handleProductsChange = () => {
      setProductList(getStoredProducts());
    };
    const handleCategoriesChange = () => {
      setCategoryList(getStoredCategories());
    };

    window.addEventListener('products-updated', handleProductsChange);
    window.addEventListener('categories-updated', handleCategoriesChange);
    window.addEventListener('storage', handleProductsChange);

    return () => {
      window.removeEventListener('products-updated', handleProductsChange);
      window.removeEventListener('categories-updated', handleCategoriesChange);
      window.removeEventListener('storage', handleProductsChange);
    };
  }, []);

  const addProduct = (product) => {
    const current = getStoredProducts();
    const updated = [product, ...current];
    saveStoredProducts(updated);

    if (product.subcategory) {
      addCategory(product.subcategory);
    }
  };

  const updateProduct = (updatedProduct) => {
    const current = getStoredProducts();
    const index = current.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      const copy = [...current];
      copy[index] = { ...copy[index], ...updatedProduct };
      saveStoredProducts(copy);
    }
  };

  const deleteProduct = (productId) => {
    const current = getStoredProducts();
    const filtered = current.filter((p) => p.id !== productId);
    saveStoredProducts(filtered);
  };

  const addCategory = (categoryName) => {
    if (!categoryName || !categoryName.trim()) return;
    const trimmed = categoryName.trim();
    const current = getStoredCategories();
    if (!current.includes(trimmed)) {
      const updated = [...current, trimmed];
      saveStoredCategories(updated);
    }
  };

  const deleteCategory = (categoryName) => {
    const current = getStoredCategories();
    const filtered = current.filter((c) => c.toLowerCase() !== categoryName.toLowerCase());
    saveStoredCategories(filtered);
  };

  return {
    products: productList,
    categories: categoryList,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    deleteCategory,
  };
}

// Fallback exported products array
export const products = getStoredProducts();
