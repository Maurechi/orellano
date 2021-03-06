import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Load .env files into process.env
dotenv.config();
// Starting Database
connectDB();

const app = express();
// app.use(cors);
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers.host === 'macellaio.herokuapp.com')
      return res.redirect(301, 'https://www.macellaio.store');
    if (req.headers['x-forwarded-proto'] !== 'https')
      return res.redirect('https://' + req.headers.host + req.url);
    else return next();
  } else return next();
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// this will allow us to accept JSON data in body
app.use(express.json());

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Custom Error Handler Middlewares "./middleware/errorMiddleware.js"
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
