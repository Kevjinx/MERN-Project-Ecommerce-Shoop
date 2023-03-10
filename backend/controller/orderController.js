import expressAsyncHandler from 'express-async-handler';
import Order from '../db/models/orderModel.js';

// @type    POST
// @route   /api/orders/
// @desc    create an order
// @access  private
const addOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(204);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @type    GET
// @route   /api/orders/:id
// @desc    fetch one order
// @access  private
const getOrderById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate(
    'user',
    'firstName lastName email'
  );
  res.json(order);
});

// @type    GET
// @route   /api/orders/user
// @desc    fetch all order from logged in user
// @access  private
const getMyOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @type    GET
// @route   /api/orders/:id/pay
// @desc    update order to paid
// @access  private

const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @type    GET
// @route   /api/orders/:id/deliver
// @desc    update order to delivered
// @access  private/admin
const updateOrderToDelivered = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @type    GET
// @desc    Get all orders
// @route   /api/orders
// @access  Private/Admin
const getAllOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getAllOrders,
};
