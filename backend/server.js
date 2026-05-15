require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const enquiryRoutes = require('./routes/enquiry');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & utility middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  methods: ['GET', 'POST'],
  credentials: false
}));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// Rate limiting on form endpoints
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                  // 10 requests per IP per window
  message: { success: false, message: 'Too many submissions, please try again later.' }
});

// Health check
app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'Veridian Immigration API', version: '1.0.0' });
});

// Routes
app.use('/api/enquiry', formLimiter, enquiryRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅ Veridian backend running on port ${PORT}`);
});
