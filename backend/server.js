const express = require('express');
const products = require('./products');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/products', (req, res) => {
  res.send(products);
});

app.listen(5000, () => console.log('Server is running on port 5000'));
