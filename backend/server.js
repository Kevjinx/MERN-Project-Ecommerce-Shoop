const express = require('express');
const products = require('./data/products');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:productId', (req, res) => {
  const { productId } = req.params;
  const product = products.find((p) => p._id === productId);
  res.json(product);
});

app.listen(5000, () => console.log('Server is running on port 5000'));
