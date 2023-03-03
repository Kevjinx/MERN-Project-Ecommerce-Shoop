import express from 'express';
import {
  getProducts,
  getProductById,
} from '../controller/productController.js';

const productRoutes = express.Router();

productRoutes.route('/').get(getProducts);
productRoutes.route('/:productId').get(getProductById);

export default productRoutes;
