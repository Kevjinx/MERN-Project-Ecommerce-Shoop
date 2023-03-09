import express from 'express';
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
} from '../controller/orderController.js';

const orderRoutes = express.Router();

orderRoutes.route('/').post(addOrderItems);
orderRoutes.route('/:id').get(getOrderById);
orderRoutes.route('/user').get(getMyOrders);

export default orderRoutes;
