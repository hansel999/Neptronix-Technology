const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId:   { type: String, required: true },
  name:        { type: String, required: true },
  image:       { type: String, default: '' },
  price:       { type: Number, required: true },
  quantity:    { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:    [orderItemSchema],
  shipping: {
    firstName: String,
    lastName:  String,
    email:     String,
    phone:     String,
    address:   String,
    city:      String,
    state:     String,
    zipCode:   String,
    country:   String,
  },
  payment: {
    method:     { type: String, default: 'card' },
    status:     { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  },
  subtotal:     { type: Number, required: true },
  shippingCost: { type: Number, default: 0 },
  tax:          { type: Number, default: 0 },
  total:        { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'confirmed',
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
