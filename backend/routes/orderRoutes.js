import express from 'express';
import { addOrderItems, getOrderById } from '../controller/orderController.js';

const orderRoutes = express.Router();

orderRoutes.route('/').post(addOrderItems);
orderRoutes.route('/:id').get(getOrderById);

export default orderRoutes;
