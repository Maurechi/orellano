import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load .env files into process.env
dotenv.config();

// Starting Database
connectDB();

// Starting Express
const app = express();

// this will allow us to accept JSON data in body
app.use(express.json());

// Root
app.get('/', (req, res) => {
  res.send('Api is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Custom Error Handler Middlewares "./middleware/errorMiddleware.js"
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port: ${PORT}`.yellow.bold
  )
);
