const express = require('express');
const products = require('./data/products');

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

app.listen(5000, console.log('Server Running on port 5000'));
