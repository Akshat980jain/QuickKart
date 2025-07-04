import connectDB from '../lib/mongodb';
import Product from '../models/Product';
import User from '../models/User';
import Order from '../models/Order';
import { generateMockProducts } from '../data/generateMockProducts';

export async function initializeDatabase() {
  try {
    await connectDB();
    
    // Check if products collection is empty
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Seeding products...');
      const mockProducts = generateMockProducts(10000);
      await Product.insertMany(mockProducts);
      console.log('Products seeded successfully');
    }
    
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
}

export async function getProducts(options: {
  category?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}) {
  const { category, search, sortBy = 'rating', sortOrder = 'desc', page = 1, limit = 24 } = options;
  
  try {
    await connectDB();
    
    const query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    const skip = (page - 1) * limit;
    
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(query)
    ]);
    
    return {
      products,
      total,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

export async function getProductById(id: string) {
  try {
    await connectDB();
    return await Product.findById(id).lean();
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw error;
  }
}