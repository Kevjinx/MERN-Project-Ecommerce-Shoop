import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getAllOrders,
} from '../controller/orderController.js';

const orderRoutes = express.Router();

orderRoutes.route('/').post(addOrderItems);
orderRoutes.route('/').get(getAllOrders);
orderRoutes.route('/:id').get(getOrderById);
orderRoutes.route('/user').get(getMyOrders);
orderRoutes.route('/:id/pay').put(updateOrderToPaid);
orderRoutes.route('/:id/deliver').put(updateOrderToDelivered);

export default orderRoutes;
