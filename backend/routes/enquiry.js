const express = require('express');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const { sendEnquiryEmail } = require('../utils/mailer');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '..', 'data', 'enquiries.json');

// Ensure data file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

// POST /api/enquiry
router.post(
  '/',
  [
    body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Valid name required'),
    body('email').trim().isEmail().withMessage('Valid email required').normalizeEmail(),
    body('phone').trim().isLength({ min: 7, max: 20 }).withMessage('Valid phone required'),
    body('destination').trim().isLength({ min: 2, max: 60 }).withMessage('Destination required'),
    body('message').optional().trim().isLength({ max: 2000 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array()
      });
    }

    const enquiry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      ...req.body,
      ip: req.ip,
      createdAt: new Date().toISOString()
    };

    // Save to local JSON store (swap with a DB in production)
    try {
      const current = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '[]');
      current.push(enquiry);
      fs.writeFileSync(DATA_FILE, JSON.stringify(current, null, 2));
    } catch (err) {
      console.error('Storage error:', err);
    }

    // Send notification email (silently fails if SMTP not configured)
    try {
      await sendEnquiryEmail(enquiry);
    } catch (err) {
      console.error('Mail error:', err.message);
    }

    res.status(201).json({
      success: true,
      message: 'Enquiry received. Our team will contact you within 24 hours.',
      id: enquiry.id
    });
  }
);

// GET /api/enquiry — protected list (basic key check) — admin use only
router.get('/', (req, res) => {
  const key = req.headers['x-admin-key'];
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  try {
    const list = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '[]');
    res.json({ success: true, count: list.length, enquiries: list });
  } catch {
    res.json({ success: true, count: 0, enquiries: [] });
  }
});

module.exports = router;
