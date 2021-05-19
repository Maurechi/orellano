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

    return res.status(201).json(createdOrder);
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
    return res.json(order);
  } else res.status(404);
  throw new Error('Order Not Found');
});
// Update order to paid
// Route: Get api/orders/:id/pay
// Access: Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  //   populate will attach the user info to this
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // next line comes from the PayPal Api
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    return res.json(updatedOrder);
  } else res.status(404);
  throw new Error('Order Not Found');
});

// Get logged in user orders
// Route: Get api/orders/myorders
// Access: Private
const getUserOrders = asyncHandler(async (req, res) => {
  /* mongoose method to get all orders where the user 
  attached to that order is the one thats logged in */
  const orders = await Order.find({ user: req.user._id });

  return res.json(orders);
});

// Get all orders
// Route: Get api/orders/orders
// Access: Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  /* mongoose method to get all orders where the user 
  attached to that order is the one thats logged in */
  const orders = await Order.find({}).populate('user', 'id name');

  return res.json(orders);
});

// Update order to delivered
// Route: Get api/orders/:id/deliver
// Access: Private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    return res.json(updatedOrder);
  } else res.status(404);
  throw new Error('Order Not Found');
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getUserOrders,
  getOrders,
  updateOrderToDelivered,
};
