import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getAllOrders,
} from '../controller/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const orderRoutes = express.Router();

orderRoutes
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getAllOrders);
orderRoutes.route('/myorders').get(protect, getMyOrders);
orderRoutes.route('/:id').get(protect, getOrderById);
orderRoutes.route('/:id/pay').put(protect, updateOrderToPaid);
orderRoutes.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default orderRoutes;
