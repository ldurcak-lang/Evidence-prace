// Google Apps Script kód pro zpracování požadavků z HTML formulářů
// Tento kód vložte do Google Apps Script editoru

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheetId = data.sheetId;
    const rowData = data.data;
    
    // Otevření Google Sheets
    const ss = SpreadsheetApp.openById(sheetId);
    const sheet = ss.getSheetByName('Evidence') || ss.getSheets()[0];
    
    // Přidání řádku
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data uložena'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'API is running'
  })).setMimeType(ContentService.MimeType.JSON);
}
