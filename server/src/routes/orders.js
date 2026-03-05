const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// GET /api/orders — user's own orders (admin gets all)
router.get('/', protect, async (req, res) => {
  try {
    const query = req.user.isAdmin ? {} : { userId: req.user._id };
    const orders = await Order.find(query).sort({ createdAt: -1 }).populate('items.productId');
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (!req.user.isAdmin && order.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/orders — place order
router.post('/', protect, async (req, res) => {
  try {
    const { items, shipping, payment, subtotal, shippingCost, tax, total } = req.body;
    if (!items || items.length === 0)
      return res.status(400).json({ message: 'No items in order' });

    const order = await Order.create({
      userId: req.user._id,
      items,
      shipping,
      payment,
      subtotal,
      shippingCost,
      tax,
      total,
      status: 'confirmed',
    });

    // Clear cart after order placed
    await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });

    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/orders/:id/status — admin update status
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
