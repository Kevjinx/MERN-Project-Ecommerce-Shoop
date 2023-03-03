import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';
import dbConnect from './db/dbConnect.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import bodyParser from 'body-parser';

dbConnect();
dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound, errorHandler);

app.listen(PORT, () =>
  console.log(colors.rainbow(`Server running in ${NODE_ENV} on port ${PORT}`))
);
