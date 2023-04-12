import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createProductReview,
} from '../controller/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const productRoutes = express.Router();

productRoutes.route('/').get(getProducts).post(protect, admin, createProduct);

productRoutes
  .route('/:productId')
  .get(getProductById)
  .delete(protect, admin, deleteProductById)
  .put(protect, admin, updateProduct);

productRoutes.route('/:productId/reviews').post(protect, createProductReview);

export default productRoutes;
