import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Creating User Schema
const productSchema = mongoose.Schema(
  {
    // Add connection between a product and user with reference
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      text: String,
      required: true,
    },
    image: {
      text: String,
      required: true,
    },
    brand: {
      text: String,
      required: true,
    },
    category: {
      text: String,
      required: true,
    },
    description: {
      text: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      text: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      text: Number,
      required: true,
      default: 0,
    },
    price: {
      text: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      text: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Creating Model that will conform to our schema with its required fields
const Product = mongoose.model('Product', productSchema);

export default Product;
