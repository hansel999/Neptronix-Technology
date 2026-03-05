const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
const defaultOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5177', 'https://neptronixtechnology.netlify.app'];
const envOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes('*')) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

// Health check (always responds regardless of DB state)
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Neptronix API running' }));

// Start server immediately, then connect to MongoDB
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    const { seedProducts, seedAdmin } = require('./utils/seed');
    await seedProducts();
    await seedAdmin();
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });
