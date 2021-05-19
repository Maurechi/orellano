import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import { json } from 'express';

// Fetch all products
// Route: GET api/products
// Access: Public
const getProducts = asyncHandler(async (req, res) => {
  // mongoose method on model
  const products = await Product.find({});
  return res.json(products);
});

// fetch one product
// Route: GET api/products/:id
// Access: Public
const getProductById = asyncHandler(async (req, res) => {
  // mongoose method on model
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Delete a product
// Route: DELETE api/products/:id
// Access: Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  // mongoose method on model
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    return res.json({ message: 'product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Create a product
// Route: POST api/products/
// Access: Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  return res.status(201).json(createdProduct);
});

// Update a product
// Route: PUT api/products/:id
// Access: Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    return res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('product not found');
  }
});

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
};
