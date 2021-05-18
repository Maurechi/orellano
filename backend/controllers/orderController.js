import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

// Create New Order
// Route: POST api/orders
// Access: Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
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

// Get Order by id
// Route: Get api/orders/:id
// Access: Private
const getOrderById = asyncHandler(async (req, res) => {
  //   populate will attach the user info to this
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else res.status(404);
  throw new Error('Order Not Found');
});

export { addOrderItems, getOrderById };
