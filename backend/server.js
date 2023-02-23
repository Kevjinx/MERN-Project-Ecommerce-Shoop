import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';
import cors from 'cors';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

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

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
