import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import { json } from 'express';

// Fetch all products
// Route: GET api/products
// Access: Public
const getProducts = asyncHandler(async (req, res) => {
  // how many products per page
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;
  // getting the query after the '?' for searches
  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            category: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            brand: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
        ],
      }
    : {};

  // getting number of products
  const count = await Product.countDocuments({ ...keyword });
  // mongoose method on model
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  return res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

// Create new review
// Route: PUT api/products/:id/reviews
// Access: Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('You already reviewed this product');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    return res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('product not found');
  }
});

// Get top rated products
// Route: GET api/products/top
// Access: Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: 1 }).limit(3);

  return res.json(products);
});

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
