import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

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
