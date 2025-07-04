import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRouter from './routes/products.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
  res.send('E-commerce backend is running');
});

app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});