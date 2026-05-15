const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.SMTP_HOST) return null;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  return transporter;
}

async function sendEnquiryEmail(enquiry) {
  const tx = getTransporter();
  if (!tx) {
    console.warn('⚠️  SMTP not configured — skipping email notification.');
    return;
  }

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#0f2a66;">New Enquiry — Veridian Immigration</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Name</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${enquiry.name}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Email</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${enquiry.email}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Phone</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${enquiry.phone}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Destination</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${enquiry.destination}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Message</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${enquiry.message || '—'}</td></tr>
        <tr><td style="padding:8px;"><b>Submitted</b></td><td style="padding:8px;">${enquiry.createdAt}</td></tr>
      </table>
    </div>
  `;

  await tx.sendMail({
    from: `"Veridian Website" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: `🌍 New Enquiry from ${enquiry.name} — ${enquiry.destination}`,
    html
  });
}

module.exports = { sendEnquiryEmail };
