import { Product } from '../types';

const categories = [
  'electronics',
  'clothing',
  'home',
  'beauty',
  'sports',
  'books',
  'toys',
  'automotive',
  'garden',
  'food'
];

const adjectives = [
  'Premium', 'Luxury', 'Essential', 'Classic', 'Modern',
  'Professional', 'Elegant', 'Durable', 'Compact', 'Advanced',
  'Smart', 'Portable', 'Wireless', 'Digital', 'Ergonomic'
];

const productTypes = {
  electronics: ['Smartphone', 'Laptop', 'Headphones', 'Smartwatch', 'Camera', 'Tablet', 'Speaker', 'Monitor', 'Keyboard', 'Mouse'],
  clothing: ['T-Shirt', 'Jeans', 'Dress', 'Jacket', 'Sweater', 'Shoes', 'Socks', 'Hat', 'Scarf', 'Gloves'],
  home: ['Lamp', 'Pillow', 'Blanket', 'Vase', 'Clock', 'Mirror', 'Rug', 'Chair', 'Table', 'Cabinet'],
  beauty: ['Moisturizer', 'Shampoo', 'Perfume', 'Lipstick', 'Foundation', 'Serum', 'Mask', 'Cream', 'Lotion', 'Oil'],
  sports: ['Ball', 'Racket', 'Gloves', 'Shoes', 'Bag', 'Mat', 'Weights', 'Band', 'Bottle', 'Watch'],
  books: ['Novel', 'Cookbook', 'Biography', 'Textbook', 'Magazine', 'Comic', 'Journal', 'Guide', 'Manual', 'Dictionary'],
  toys: ['Puzzle', 'Doll', 'Car', 'Block', 'Game', 'Robot', 'Plush', 'Board Game', 'Card Game', 'Action Figure'],
  automotive: ['Charger', 'Mount', 'Cover', 'Light', 'Mat', 'Tool', 'Cleaner', 'Air Freshener', 'Oil', 'Filter'],
  garden: ['Plant', 'Pot', 'Tool Set', 'Seeds', 'Soil', 'Gloves', 'Hose', 'Fertilizer', 'Light', 'Decoration'],
  food: ['Snack', 'Drink', 'Sauce', 'Spice', 'Mix', 'Bar', 'Chips', 'Nuts', 'Candy', 'Coffee']
};

const descriptions = {
  electronics: 'High-quality electronic device with advanced features and reliable performance.',
  clothing: 'Comfortable and stylish clothing made from premium materials.',
  home: 'Beautiful home decor item that adds elegance to any room.',
  beauty: 'Premium beauty product for your daily skincare routine.',
  sports: 'Professional-grade sports equipment for optimal performance.',
  books: 'Engaging and informative reading material for all ages.',
  toys: 'Fun and educational toy that provides hours of entertainment.',
  automotive: 'Essential automotive accessory for your vehicle.',
  garden: 'High-quality gardening product for your outdoor space.',
  food: 'Delicious and healthy food item made with natural ingredients.'
};

const imageUrls = {
  electronics: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=80'
  ],
  clothing: [
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&auto=format&fit=crop&q=80'
  ],
  home: [
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=500&auto=format&fit=crop&q=80'
  ],
  beauty: [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=80'
  ],
  sports: [
    'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=80'
  ],
  books: [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=80'
  ],
  toys: [
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558060370-d644479be6f7?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop&q=80'
  ],
  automotive: [
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=80'
  ],
  garden: [
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&auto=format&fit=crop&q=80'
  ],
  food: [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=500&auto=format&fit=crop&q=80'
  ]
};

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generatePrice(): number {
  return Number((Math.random() * (999.99 - 1.99) + 1.99).toFixed(2));
}

function generateRating(): number {
  return Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1));
}

function generateReviews(): number {
  return Math.floor(Math.random() * (1000 - 5) + 5);
}

function generateDiscount(): number {
  const shouldHaveDiscount = Math.random() < 0.3; // 30% chance of having a discount
  if (shouldHaveDiscount) {
    return Math.floor(Math.random() * (70 - 5) + 5);
  }
  return 0;
}

export function generateMockProducts(count: number = 20): Product[] {
  const products: Product[] = [];

  for (let i = 0; i < count; i++) {
    const category = getRandomElement(categories);
    const adjective = getRandomElement(adjectives);
    const productType = getRandomElement(productTypes[category as keyof typeof productTypes]);
    const name = `${adjective} ${productType}`;
    
    products.push({
      id: `prod_${i + 1}`,
      name,
      description: descriptions[category as keyof typeof descriptions],
      price: generatePrice(),
      image: getRandomElement(imageUrls[category as keyof typeof imageUrls]),
      category,
      inStock: Math.random() > 0.1, // 90% chance of being in stock
      rating: generateRating(),
      reviews: generateReviews(),
      discount: generateDiscount()
    });
  }

  return products;
}