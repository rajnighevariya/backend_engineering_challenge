const Order = require('../models/order');
const axios = require('axios');
const { productServiceUrl } = require('../config');

exports.createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;
    // Check product availability and update stock
    for (const item of products) {
      const response = await axios.get(`${productServiceUrl}/api/products/${item.productId}`);
      const product = response.data;
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for product ${product.name}` });
      }
      await axios.put(`${productServiceUrl}/api/products/${item.productId}`, { stock: product.stock - item.quantity });
    }
    const order = new Order({ userId, products, totalAmount });
    await order.save();
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('products.productId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId').populate('products.productId');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
