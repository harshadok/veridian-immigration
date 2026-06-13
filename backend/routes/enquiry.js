const express = require('express');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const { sendEnquiryEmail } = require('../utils/mailer');
const { appendEnquiryRow, getSpreadsheetInfo } = require('../utils/googleSheets');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '..', 'data', 'enquiries.json');
const CSV_FILE = path.join(__dirname, '..', 'data', 'enquiries.csv');

// Ensure data file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}
// Ensure CSV file exists with header
if (!fs.existsSync(CSV_FILE)) {
  const header = 'id,name,email,phone,destination,message,ip,createdAt\n';
  fs.writeFileSync(CSV_FILE, header, 'utf8');
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
      // Append to CSV (basic escaping of quotes)
      try {
        const csvEscape = (v) => {
          if (v === undefined || v === null) return '';
          return '"' + String(v).replace(/"/g, '""') + '"';
        };
        const line = [enquiry.id, enquiry.name, enquiry.email, enquiry.phone, enquiry.destination, enquiry.message || '', enquiry.ip, enquiry.createdAt]
          .map(csvEscape)
          .join(',') + '\n';
        fs.appendFileSync(CSV_FILE, line, 'utf8');
      } catch (csvErr) {
        console.error('CSV write error:', csvErr);
      }
      // Send to Google Sheets if configured
      try {
        await appendEnquiryRow(enquiry);
      } catch (gsErr) {
        console.error('Google Sheets error:', gsErr.message);
      }
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

// GET /api/enquiry/export - download CSV of enquiries (admin only)
router.get('/export', (req, res) => {
  const key = req.headers['x-admin-key'];
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    // If CSV missing, try to regenerate from JSON
    if (!fs.existsSync(CSV_FILE)) {
      const current = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '[]');
      const header = 'id,name,email,phone,destination,message,ip,createdAt\n';
      const rows = current.map((e) => {
        const esc = (v) => '"' + String(v || '').replace(/"/g, '""') + '"';
        return [e.id, e.name, e.email, e.phone, e.destination, e.message || '', e.ip, e.createdAt].map(esc).join(',');
      }).join('\n');
      fs.writeFileSync(CSV_FILE, header + rows + (rows ? '\n' : ''), 'utf8');
    }

    res.download(CSV_FILE, 'enquiries.csv', (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({ success: false, message: 'Failed to download CSV' });
      }
    });
  } catch (err) {
    console.error('Export error:', err);
    res.status(500).json({ success: false, message: 'Export failed' });
  }
});

// GET /api/enquiry/check-sheets - verify Google Sheets connection
router.get('/check-sheets', async (_req, res) => {
  try {
    const info = await getSpreadsheetInfo();
    res.json({
      success: true,
      title: info.properties.title,
      spreadsheetId: info.spreadsheetId,
      sheets: info.sheets.map((sheet) => sheet.properties.title)
    });
  } catch (err) {
    console.error('Sheets check error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
