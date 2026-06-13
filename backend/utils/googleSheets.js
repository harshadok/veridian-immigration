const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
let authClient = null;

function getGoogleAuth() {
  if (authClient) return authClient;

  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
  const serviceAccountKeyBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64;
  if (!spreadsheetId || !serviceAccountKeyBase64) {
    return null;
  }

  let keyJson;
  try {
    const raw = Buffer.from(serviceAccountKeyBase64, 'base64').toString('utf8');
    keyJson = JSON.parse(raw);
  } catch (err) {
    console.error('Google Sheets auth parse error:', err);
    return null;
  }

  authClient = new google.auth.JWT({
    email: keyJson.client_email,
    key: keyJson.private_key,
    scopes: SCOPES
  });
  return authClient;
}

async function appendEnquiryRow(enquiry) {
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
  const auth = getGoogleAuth();
  if (!auth || !spreadsheetId) {
    throw new Error('Google Sheets configuration missing');
  }

  const sheets = google.sheets({ version: 'v4', auth });
  const row = [
    enquiry.id,
    enquiry.name,
    enquiry.email,
    enquiry.phone,
    enquiry.destination,
    enquiry.message || '',
    enquiry.ip,
    enquiry.createdAt
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Enquiries!A:H',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [row]
    }
  });
}

async function getSpreadsheetInfo() {
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
  const auth = getGoogleAuth();
  if (!auth || !spreadsheetId) {
    throw new Error('Google Sheets configuration missing');
  }

  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.get({ spreadsheetId });
  return response.data;
}

module.exports = { appendEnquiryRow, getSpreadsheetInfo };
