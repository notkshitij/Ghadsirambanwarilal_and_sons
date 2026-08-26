import image1 from '../assets/Product Image/image4.png';
import image2 from '../assets/Product Image/image2.png';
import image3 from '../assets/Product Image/image3.png';
import image5 from '../assets/Product Image/image5.png';
import image0 from '../assets/Product Image/image.png';

import diff1 from '../assets/Product Image/diff product/diff_product_1.png';
import diff2 from '../assets/Product Image/diff product/diff_product_2.png';
import diff3 from '../assets/Product Image/diff product/diff_product_3.png';
import diff4 from '../assets/Product Image/diff product/diff_product_4.png';
import diff5 from '../assets/Product Image/diff product/diff_product_5.png';

import diff2_1 from '../assets/Product Image/diff product 2/diff_product_1.png';
import diff2_2 from '../assets/Product Image/diff product 2/diff_product_2.png';
import diff2_3 from '../assets/Product Image/diff product 2/diff_product_3.png';
import diff2_4 from '../assets/Product Image/diff product 2/diff_product_4.png';
import diff2_5 from '../assets/Product Image/diff product 2/diff_product_5.png';

export const products = [
  {
    id: 'mayur-meenakari-polki-pendant',
    name: 'Mayur Meenakari Polki & Pearl Pendant',
    price: 56650,
    originalPrice: 72000,
    stock: 18,
    image: diff1,
    images: [diff1, diff2, diff3, diff4, diff5],
    category: 'Polki & Kundan',
    subcategory: 'Pendants',
    description: 'An exquisite handcrafted peacock motif pendant with delicate pearl tassel, vivid meenakari enamel artistry, fine uncut polki, and rich gemstone accents.',
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
    image: diff2_1,
    images: [diff2_1, diff2_2, diff2_3, diff2_4, diff2_5],
    category: 'Polki & Kundan',
    subcategory: 'Pendants',
    description: 'A regal handcrafted black meenakari leaf pendant studded with uncut polki, rubies, and strung with ruby beads and a south sea pearl tassel.',
    specs: {
      'Gold': '1.2 gms (approx)',
      'Colour stones': '25 carats',
      'Polki': '0.50 carats',
      'Pearls': '10 carats'
    }
  },
  {
    id: 'royal-chandrika-necklace',
    name: 'Royal Chandrika Necklace',
    price: 250000,
    originalPrice: 320000,
    stock: 12,
    image: image1,
    images: [image1, image5],
    category: 'Polki & Kundan',
    subcategory: 'Necklaces',
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
    image: image2,
    images: [image2, image0],
    category: 'Polki & Kundan',
    subcategory: 'Pendants',
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
    image: image3,
    category: 'Polki & Kundan',
    subcategory: 'Chokers',
    specs: {
      'Gold': '14-15 gram (approx)',
      'Polki': '8 carats',
      'Stones': '65 carats'
    }
  },
];
