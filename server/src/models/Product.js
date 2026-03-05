const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:               { type: String, required: true, trim: true },
  description:        { type: String, required: true },
  price:              { type: Number, required: true, min: 0 },
  originalPrice:      { type: Number, default: null },
  category:           { type: String, required: true },
  subcategory:        { type: String, default: '' },
  brand:              { type: String, required: true },
  images:             [{ type: String }],
  specifications:     { type: Map, of: String, default: {} },
  features:           [{ type: String }],
  inStock:            { type: Boolean, default: true },
  stockCount:         { type: Number, default: 0 },
  rating:             { type: Number, default: 0, min: 0, max: 5 },
  reviewCount:        { type: Number, default: 0 },
  isNew:              { type: Boolean, default: false },
  isOnSale:           { type: Boolean, default: false },
  discountPercentage: { type: Number, default: 0 },
  tags:               [{ type: String }],
  warranty:           { type: String, default: '' },
  shippingInfo:       { type: String, default: '' },
}, { timestamps: true });

// Full-text search index
productSchema.index({ name: 'text', description: 'text', brand: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
