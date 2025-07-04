import express from 'express';
import Product from '../models/Product.js';
import { generateMockProducts } from './seed.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Seed products (one-time use)
router.post('/seed', async (req, res) => {
  try {
    await Product.deleteMany();
    const mockProducts = generateMockProducts(1000); // You can adjust the count
    await Product.insertMany(mockProducts);
    res.json({ message: 'Database seeded with mock products' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to seed products' });
  }
});

export default router; 