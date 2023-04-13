import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';
import dbConnect from './db/dbConnect.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import bodyParser from 'body-parser';
import * as path from 'path';
import uploadRoutes from './routes/uploadRoutes.js';

dbConnect();
dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();

//setting frontend build to static folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  //any routes that isn't api will point to index.html in build
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Hello World, API is running');
  });
}

app.use(notFound, errorHandler);

app.listen(PORT, () =>
  console.log(colors.rainbow(`Server running in ${NODE_ENV} on port ${PORT}`))
);
