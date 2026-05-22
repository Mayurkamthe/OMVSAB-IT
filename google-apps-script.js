/**
 * OMVSAB IT Solutions — Enquiry Form → Google Sheets
 * =====================================================
 * SETUP STEPS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste this entire file and save (Ctrl+S)
 * 4. Click "Deploy" → "New deployment" → Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL
 * 6. Paste it into your .env as: REACT_APP_GOOGLE_SHEET_URL=<paste here>
 * 7. Restart your React app (npm start)
 */

const SHEET_NAME = "Enquiries"; // Tab name in your Google Sheet

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Enquiry Type", "Name", "Phone", "Email",
        "College / University", "Current Year", "Interested In", "Message"
      ]);
      // Style header
      const header = sheet.getRange(1, 1, 1, 9);
      header.setBackground("#1A1A1A");
      header.setFontColor("#FFFFFF");
      header.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.enquiryType || "",
      data.name || "",
      data.phone || "",
      data.email || "",
      data.college || "",
      data.year || "",
      data.course || "",
      data.message || "",
    ]);

    // Auto-resize columns
    sheet.autoResizeColumns(1, 9);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "OMVSAB Enquiry Sheet API is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}
