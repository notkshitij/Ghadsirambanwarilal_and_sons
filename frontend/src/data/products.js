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

import diff8_1 from '../assets/Product Image/diff product 8/diff_product_1.png';
import diff8_2 from '../assets/Product Image/diff product 8/diff_product_2.png';
import diff8_3 from '../assets/Product Image/diff product 8/diff_product_3.png';
import diff8_4 from '../assets/Product Image/diff product 8/diff_product_4.png';

import diff9_1 from '../assets/Product Image/diff product 9/diff_product_1.png';
import diff9_2 from '../assets/Product Image/diff product 9/diff_product_2.png';
import diff9_3 from '../assets/Product Image/diff product 9/diff_product_3.png';

import diff10_1 from '../assets/Product Image/diff product 10/diff_product_1.png';
import diff10_2 from '../assets/Product Image/diff product 10/diff_product_2.png';
import diff10_3 from '../assets/Product Image/diff product 10/diff_product_3.png';
import diff10_4 from '../assets/Product Image/diff product 10/diff_product_4.png';
import diff10_5 from '../assets/Product Image/diff product 10/diff_product_5.png';

import diff11_1 from '../assets/Product Image/diff product 11/diff_product_1.png';
import diff11_2 from '../assets/Product Image/diff product 11/diff_product_2.png';
import diff11_3 from '../assets/Product Image/diff product 11/diff_product_3.png';

import diff12_1 from '../assets/Product Image/diff product 12/diff_product_1.jpg';
import diff12_2 from '../assets/Product Image/diff product 12/diff_product_2.jpg';

export const INITIAL_PRODUCTS = [
  {
    id: 'mayur-meenakari-polki-pendant',
    name: 'Mayur pendant',
    price: 75000,
    originalPrice: 95000,
    stock: 18,
    image: diff3,
    images: [diff3, diff4, diff1, diff2],
    category: 'Polki & Kundan',
    subcategory: 'Necklaces',
    description: 'An exquisite handcrafted peacock motif pendant with delicate pearl tassel, fine uncut polki, and rich gemstone accents.',
    materials: 'Handcrafted in 24K gold finish with uncut polki diamonds and cultured pearls.',
    care: 'Store separately in jewellery box with bubble paper provided. Avoid contact with perfume and lotions. Clean gently with a soft cloth.',
    specs: {
      'Gold': '1.5gm (approx)',
      'Colour stones': '30 carats',
      'Polki': '2.70 carats',
      'Pearls': '28 carats'
    }
  },
  {
    id: 'budroom-hair-clips',
    name: 'Budroom hair clips',
    price: 50000,
    originalPrice: 65000,
    stock: 12,
    image: diff8_1,
    images: [diff8_1, diff8_2, diff8_3, diff8_4],
    category: 'Polki & Kundan',
    subcategory: 'Hair Clips',
    description: 'An opulent handcrafted pair of Budroom hair clips encrusted with brilliant uncut polki diamonds, vivid ruby and emerald colour stones, and delicate pearl tassels.',
    materials: 'Handcrafted in fine gold finish with uncut polki diamonds, rich colour stones, and cultured seed pearls.',
    care: 'Store separately in jewellery box with bubble paper provided. Avoid contact with perfume and lotions. Clean gently with a soft cloth.',
    specs: {
      'Gold': '1 - 1.5 grams approx',
      'Polki': '3.5 carats',
      'Colour stones': '2 carats',
      'Pearls': '10 carats',
      'Unit': 'Pair'
    }
  },
  {
    id: 'shahi-nakshi-hair-clips',
    name: 'Shahi nakshi hair clips',
    price: 45000,
    originalPrice: 60000,
    stock: 10,
    image: diff9_1,
    images: [diff9_1, diff9_2, diff9_3],
    category: 'Polki & Kundan',
    subcategory: 'Hair Clips',
    description: 'Regal crescent moon handcrafted Shahi nakshi hair clips adorned with fine uncut polki, vibrant multi-gemstone teardrops, and cascading seed pearls.',
    materials: 'Handcrafted in fine gold finish with uncut polki diamonds, vivid multi-color stones, and cultured seed pearls.',
    care: 'Store separately in jewellery box with bubble paper provided. Avoid contact with perfume and lotions. Clean gently with a soft cloth.',
    specs: {
      'Gold': '1.5 grams approx',
      'Polki': '0.20 carats',
      'Colour stones': '3 carats',
      'Pearls': '15 carats',
      'Unit': 'Pair'
    }
  },
  {
    id: 'padma-meenakari-ruby-pendant',
    name: 'Padma Ruby & Pearl Pendant',
    price: 55000,
    originalPrice: 72000,
    stock: 15,
    image: diff2_4,
    images: [diff2_4, diff2_2, diff2_1, diff2_3],
    category: 'Polki & Kundan',
    subcategory: 'Necklaces',
    description: 'A regal handcrafted black leaf pendant studded with uncut polki, rubies, and strung with ruby beads and a south sea pearl tassel.',
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
    sizes: ['2.6'],
    description: 'A traditional royal pounchi bracelet handcrafted in authentic Irani Firoza (Turquoise) with floral gold framing, ruby accents, and embossed gold back artistry.',
    materials: 'Authentic Irani Firoza (Turquoise) with 22K gold framing, ruby centers, and gold floral embossed reverse.',
    care: 'Protect from hard surfaces, perfumes, and direct water exposure. Store in velvet jewelry case.',
    specs: {
      'Gold': '1.7 gms approx',
      'Colour stones': '20 carats',
      'Material': 'Authentic Irani Firoza',
      'Size': '2.6'
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
    materials: 'Fine craftsmanship with certified uncut polki diamonds and south sea pearls.',
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
    care: 'Store separately in jewellery box with bubble paper provided. Avoid contact with perfume and lotions. Clean gently with a soft cloth.',
    specs: {
      'Gold': '14-15 gram (approx)',
      'Polki': '8 carats',
      'Stones': '65 carats'
    }
  },
  {
    id: 'indrani-mango-detachable-necklace',
    name: 'Indrani mango ditachable necklace',
    price: 420000,
    originalPrice: 540000,
    stock: 5,
    image: diff10_1,
    images: [diff10_1, diff10_3, diff10_4, diff10_5, diff10_2],
    category: 'Polki & Kundan',
    subcategory: 'Necklaces',
    description: 'An opulent royal bridal mango motif multi-way detachable necklace handcrafted in rich yellow gold with brilliant uncut polki diamonds, lustrous south sea pearls, and ornate traditional nakshi engraved backside.',
    materials: 'Handcrafted in fine gold finish with uncut polki diamonds, cultured south sea pearls, and silk dori.',
    care: 'Store separately in jewellery box with bubble paper provided. Avoid contact with perfume and lotions. Clean gently with a soft cloth.',
    specs: {
      'Gold': '14 grams approx',
      'Polki': '36 carats',
      'Pearls': '60 carats'
    }
  },
  {
    id: 'stones-garden-jhumka',
    name: 'Stones Garden Jhumka',
    price: 60000,
    originalPrice: 78000,
    stock: 10,
    image: diff11_1,
    images: [diff11_1, diff11_2, diff11_3],
    category: 'Polki & Kundan',
    subcategory: 'Jhumke',
    description: 'An exquisite handcrafted Stones Garden Jhumka adorned with fine Polky diamonds, vibrant colour stones, lustrous pearls, and cascading multi-stone tassels in rich gold framing.',
    materials: 'Handcrafted in fine gold with uncut Polky diamonds, natural colour stones, and cultured pearls.',
    care: 'Store separately in jewellery box with bubble paper provided. Avoid contact with perfume and lotions. Clean gently with a soft cloth.',
    specs: {
      'Gold': '2 gram (approx)',
      'Polky': '4 carats',
      'Colour stones': '45 carats',
      'Pearls': '25 carats'
    }
  },
  {
    id: 'jade-square-pendant',
    name: 'Jade Square Pendant',
    price: 80000,
    originalPrice: 100000,
    stock: 8,
    image: diff12_1,
    images: [diff12_1, diff12_2],
    category: 'Polki & Kundan',
    subcategory: 'Necklaces',
    description: 'A breathtaking handcrafted Jade Square Pendant featuring an ornate floral motif with fine polky diamonds, vivid colour stones, cascading jade drops, and lustrous seed pearls strung on an elegant jade bead chain.',
    materials: 'Handcrafted in fine gold with uncut polky diamonds, natural jade colour stones, and cultured seed pearls.',
    care: 'Store separately in jewellery box with bubble paper provided. Avoid contact with perfume and lotions. Clean gently with a soft cloth.',
    specs: {
      'Gold': '2 gram (approx)',
      'Polky': '2.5 carats',
      'Colour stones': '50 carats',
      'Pearls': '15 carats'
    }
  },
];

export const INITIAL_CATEGORIES = ['Necklaces', 'Bracelets', 'Hair Clips', 'Jhumke'];

// Image asset map for default product fallback
const DEFAULT_IMAGE_MAP = {
  'mayur-meenakari-polki-pendant': { image: diff3, images: [diff3, diff4, diff1, diff2] },
  'budroom-hair-clips': { image: diff8_1, images: [diff8_1, diff8_2, diff8_3, diff8_4] },
  'shahi-nakshi-hair-clips': { image: diff9_1, images: [diff9_1, diff9_2, diff9_3] },
  'padma-meenakari-ruby-pendant': { image: diff2_4, images: [diff2_4, diff2_2, diff2_1, diff2_3] },
  'the-golden-eagle-pendant': { image: diff6_1, images: [diff6_1, diff6_2, diff6_3] },
  'turquoise-pounchi-bracelet': { image: diff7_1, images: [diff7_1, diff7_2, diff7_3, diff7_4] },
  'royal-chandrika-necklace': { image: diff3_1, images: [diff3_1, diff3_2] },
  'aranya-navratna-pendant': { image: diff4_1, images: [diff4_1, diff4_2] },
  'navaratna-splendor-choker': { image: diff5_1, images: [diff5_1, diff5_2, diff5_3] },
  'indrani-mango-detachable-necklace': { image: diff10_1, images: [diff10_1, diff10_3, diff10_4, diff10_5, diff10_2] },
  'stones-garden-jhumka': { image: diff11_1, images: [diff11_1, diff11_2, diff11_3] },
  'jade-square-pendant': { image: diff12_1, images: [diff12_1, diff12_2] },
};

export const getStoredProducts = () => {
  try {
    const raw = localStorage.getItem('gb_admin_products');
    if (!raw) return INITIAL_PRODUCTS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_PRODUCTS;

    // Check if new default items need to be merged into stored products
    let list = [...parsed];
    const budroomInInit = INITIAL_PRODUCTS.find((p) => p.id === 'budroom-hair-clips');
    if (budroomInInit && !list.some((p) => p.id === 'budroom-hair-clips')) {
      list.splice(1, 0, budroomInInit);
    }
    const shahiInInit = INITIAL_PRODUCTS.find((p) => p.id === 'shahi-nakshi-hair-clips');
    if (shahiInInit && !list.some((p) => p.id === 'shahi-nakshi-hair-clips')) {
      list.splice(2, 0, shahiInInit);
    }
    const indraniInInit = INITIAL_PRODUCTS.find((p) => p.id === 'indrani-mango-detachable-necklace');
    if (indraniInInit && !list.some((p) => p.id === 'indrani-mango-detachable-necklace')) {
      list.push(indraniInInit);
    }
    const jhumkaInInit = INITIAL_PRODUCTS.find((p) => p.id === 'stones-garden-jhumka');
    if (jhumkaInInit && !list.some((p) => p.id === 'stones-garden-jhumka')) {
      list.push(jhumkaInInit);
    }
    const jadePendantInInit = INITIAL_PRODUCTS.find((p) => p.id === 'jade-square-pendant');
    if (jadePendantInInit && !list.some((p) => p.id === 'jade-square-pendant')) {
      list.push(jadePendantInInit);
    }

    // Rehydrate default product images, prices, names, and sizes if needed
    return list.map((p) => {
      const initMatch = INITIAL_PRODUCTS.find((init) => init.id === p.id);
      if (initMatch) {
        return {
          ...p,
          name: p.id === 'mayur-meenakari-polki-pendant' && (p.name === 'Mayur' || p.name?.toLowerCase().includes('meenakari') || !p.name)
            ? initMatch.name 
            : (p.name?.toLowerCase().includes('meenakari') || !p.name ? initMatch.name : p.name),
          description: p.description?.toLowerCase().includes('meenakari') ? initMatch.description : p.description,
          materials: p.materials?.toLowerCase().includes('meenakari') ? initMatch.materials : p.materials,
          price: (p.id === 'mayur-meenakari-polki-pendant' && (p.price === 56650 || !p.price)) ||
                 (p.id === 'padma-meenakari-ruby-pendant' && (p.price === 41200 || !p.price))
                 ? initMatch.price : (p.price || initMatch.price),
          originalPrice: (p.id === 'mayur-meenakari-polki-pendant' && (p.originalPrice === 72000 || !p.originalPrice)) ||
                         (p.id === 'padma-meenakari-ruby-pendant' && (p.originalPrice === 58000 || !p.originalPrice))
                         ? initMatch.originalPrice : (p.originalPrice || initMatch.originalPrice),
          image: p.image || initMatch.image,
          images: p.images && p.images.length > 0 ? p.images : initMatch.images,
          sizes: p.sizes || initMatch.sizes,
          care: p.care?.includes('suede pouch') ? initMatch.care : (p.care || initMatch.care),
          specs: {
            ...p.specs,
            ...(p.id === 'turquoise-pounchi-bracelet' ? { Size: '2.6' } : {})
          }
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
