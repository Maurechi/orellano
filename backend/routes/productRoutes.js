import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Fetch all products
// Route: GET api/products
// Access: Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    // mongoose method on model
    const products = await Product.find({});
    res.json(products);
  })
);

// fetch one product
// Route: GET api/products/:id
// Access: Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    // mongoose method on model
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      // This message will appear only if the formatting of the Id still aligns
      // with a typical product Id, but without actually finding any matching product
      // If we erase the line below it will be status 500
      res.status(404);
      // This Error is formatted by our custom error handler
      throw new Error('Product not found');
    }
  })
);

export default router;
