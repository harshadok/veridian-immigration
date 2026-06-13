const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const DEFAULT_SHEET_NAME = 'Enquiries';
const HEADER_ROW = ['id', 'name', 'email', 'phone', 'destination', 'message', 'ip', 'createdAt'];
let authClient = null;
let serviceAccountEmail = null;

function getSheetName() {
  return process.env.GOOGLE_SHEET_NAME || DEFAULT_SHEET_NAME;
}

function getServiceAccountKey() {
  const serviceAccountKeyBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64;
  if (!serviceAccountKeyBase64) {
    return null;
  }

  try {
    const raw = Buffer.from(serviceAccountKeyBase64, 'base64').toString('utf8');
    const keyJson = JSON.parse(raw);
    serviceAccountEmail = keyJson.client_email;
    return keyJson;
  } catch (err) {
    console.error('Google Sheets auth parse error:', err);
    return null;
  }
}

function getGoogleSheetsConfig() {
  if (!serviceAccountEmail) {
    getServiceAccountKey();
  }

  return {
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID || null,
    sheetName: getSheetName(),
    serviceAccountEmail
  };
}

function getSheetRange(columns) {
  const safeSheetName = getSheetName().replace(/'/g, "''");
  return `'${safeSheetName}'!${columns}`;
}

function formatGoogleSheetsError(err) {
  const { spreadsheetId, serviceAccountEmail: email } = getGoogleSheetsConfig();
  const message = err?.message || String(err);

  if (/permission/i.test(message)) {
    return `Google Sheets permission denied. Share spreadsheet ${spreadsheetId} with ${email} as Editor.`;
  }

  return message;
}

function getGoogleAuth() {
  if (authClient) return authClient;

  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
  const keyJson = getServiceAccountKey();
  if (!spreadsheetId || !keyJson) {
    return null;
  }

  authClient = new google.auth.JWT({
    email: keyJson.client_email,
    key: keyJson.private_key,
    scopes: SCOPES
  });
  return authClient;
}

async function ensureEnquiriesSheet(sheets, spreadsheetId) {
  const sheetName = getSheetName();
  const metadata = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: 'sheets.properties.title'
  });
  const sheetTitles = metadata.data.sheets.map((sheet) => sheet.properties.title);

  if (!sheetTitles.includes(sheetName)) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: { title: sheetName }
            }
          }
        ]
      }
    });
  }

  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: getSheetRange('A1:H1')
  });
  if (!headerResponse.data.values?.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: getSheetRange('A1:H1'),
      valueInputOption: 'RAW',
      requestBody: {
        values: [HEADER_ROW]
      }
    });
  }
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

  try {
    await ensureEnquiriesSheet(sheets, spreadsheetId);
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: getSheetRange('A:H'),
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [row]
      }
    });
  } catch (err) {
    throw new Error(formatGoogleSheetsError(err));
  }
}

async function getSpreadsheetInfo() {
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
  const auth = getGoogleAuth();
  if (!auth || !spreadsheetId) {
    throw new Error('Google Sheets configuration missing');
  }

  const sheets = google.sheets({ version: 'v4', auth });
  try {
    const response = await sheets.spreadsheets.get({ spreadsheetId });
    return response.data;
  } catch (err) {
    throw new Error(formatGoogleSheetsError(err));
  }
}

module.exports = { appendEnquiryRow, getSpreadsheetInfo, getGoogleSheetsConfig };
