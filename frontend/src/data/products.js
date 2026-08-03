import image1 from '../assets/Product Image/image4.png';
import image2 from '../assets/Product Image/image2.png';
import image3 from '../assets/Product Image/image3.png';
import image5 from '../assets/Product Image/image5.png';
import image0 from '../assets/Product Image/image.png';

export const products = [
  {
    id: 'royal-chandrika-necklace',
    name: 'Royal Chandrika Necklace',
    price: 250000,
    originalPrice: 320000,
    stock: 12,
    image: image1,
    category: 'Polki & Kundan',
    subcategory: 'Necklaces',
    specs: {
      gold: '5-6 gram (approx)',
      polki: '7 carats',
      pearls: '41 carats'
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
      gold: '2gram (approx)',
      polki: '0.80 carats',
      stones: '7 carats'
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
      gold: '14-15 gram (approx)',
      polki: '8 carats',
      stones: '65 carats'
    }
  },
  {
    id: 'royal-chandrika-necklace-ii',
    name: 'Royal Chandrika Necklace',
    price: 250000,
    originalPrice: 320000,
    stock: 12,
    image: image5,
    category: 'Polki & Kundan',
    subcategory: 'Necklaces',
    specs: {
      gold: '5-6 gram (approx)',
      polki: '7 carats',
      pearls: '41 carats'
    }
  },
];
