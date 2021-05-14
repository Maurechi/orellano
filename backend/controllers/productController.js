import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// Fetch all products
// Route: GET api/products
// Access: Public
const getProducts = asyncHandler(async (req, res) => {
  // mongoose method on model
  const products = await Product.find({});
  res.json(products);
});

// fetch one product
// Route: GET api/products/:id
// Access: Public
const getProductById = asyncHandler(async (req, res) => {
  // mongoose method on model
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProductById, getProducts };
