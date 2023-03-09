import expressAsyncHandler from 'express-async-handler';
import Order from '../db/models/orderModel.js';

// @type    POST
// @route   /api/orders/
// @desc    create an order
// @access  private
const addOrderItems = expressAsyncHandler(async (req, res) => {
  console.log(req);
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
    res.status(1400);
    throw new Error('No order items');
    return;
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

export { addOrderItems, getOrderById };
