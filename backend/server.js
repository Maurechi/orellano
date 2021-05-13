import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import products from './data/products.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';

// Load .env files into process.env
dotenv.config();

// Starting Database
connectDB();

// Starting Express
const app = express();

// Root
app.get('/', (req, res) => {
  res.send('Api is running...');
});

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port: ${PORT}`.yellow.bold
  )
);
