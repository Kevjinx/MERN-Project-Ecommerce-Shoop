import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';
import dbConnect from './db/dbConnect.js';
import productRoutes from './routes/productRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dbConnect();
dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/products', productRoutes);

app.use(notFound, errorHandler);

app.listen(PORT, () =>
  console.log(colors.rainbow(`Server running in ${NODE_ENV} on port ${PORT}`))
);
