const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

const router = express.Router();

// GET /api/cart
router.get('/', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    res.json({ cart: cart || { items: [] } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/cart — add or update item
router.post('/', protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) cart = new Cart({ userId: req.user._id, items: [] });

    const existingIndex = cart.items.findIndex(i => i.productId.toString() === productId);
    if (existingIndex > -1) {
      cart.items[existingIndex].quantity = quantity;
    } else {
      cart.items.push({ productId, quantity, price: product.price });
    }

    await cart.save();
    const populated = await Cart.findById(cart._id).populate('items.productId');
    res.json({ cart: populated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/cart/:productId — remove item
router.delete('/:productId', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(i => i.productId.toString() !== req.params.productId);
    await cart.save();
    const populated = await Cart.findById(cart._id).populate('items.productId');
    res.json({ cart: populated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/cart — clear entire cart
router.delete('/', protect, async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
