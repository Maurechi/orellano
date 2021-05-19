import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
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
app.use('/api/upload', uploadRoutes);

// Getting Paypal client id
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// __dirname isn't accesible due to using ES6 modules, so we have to create this variable
const __dirname = path.resolve();
// making the upload folder static to be accessible and loaded in the browser
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

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
