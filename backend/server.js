import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import products from './data/products.js';

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

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get one product
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port: ${PORT}`)
);
