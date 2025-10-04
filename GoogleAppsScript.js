/**
 * Google Apps Script để nhận dữ liệu từ Game và lưu vào Google Sheet
 * 
 * HƯỚNG DẪN CÀI ĐẶT:
 * 1. Mở Google Sheet của bạn
 * 2. Vào Extensions → Apps Script
 * 3. Xóa code mẫu và paste code này vào
 * 4. Nhấn Save (Ctrl+S)
 * 5. Chọn function "doPost" → Nhấn Run ▶️ → Authorize
 * 6. Nhấn Deploy → New deployment
 * 7. Chọn type: Web app
 * 8. Execute as: Me
 * 9. Who has access: Anyone
 * 10. Deploy và copy URL
 * 11. Paste URL vào file .env (VITE_SHEET_URL)
 * 
 * CẤU TRÚC SHEET (Dòng 1 - Header):
 * A1: Tên
 * B1: Giá trị Thặng dư
 * C1: Tiền
 * D1: Điểm
 * E1: Ngày chơi
 */

function doPost(e) {
  try {
    Logger.log("📥 Nhận request POST");
    
    // Lấy sheet đầu tiên trong spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse dữ liệu từ request
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
      Logger.log("📊 Data nhận được: " + JSON.stringify(data));
    } else {
      throw new Error("Không có dữ liệu trong request");
    }
    
    // Kiểm tra xem có header chưa
    const lastRow = sheet.getLastRow();
    if (lastRow === 0) {
      // Thêm header nếu sheet trống
      sheet.appendRow(['Tên', 'Giá trị Thặng dư', 'Tiền', 'Điểm', 'Ngày chơi']);
      Logger.log("✅ Đã thêm header");
    }
    
    // Thêm dòng mới với dữ liệu game
    sheet.appendRow([
      data.name || "Unknown",
      data.surplusValue || 0,
      data.money || 0,
      data.score || 0,
      data.date || new Date().toLocaleString()
    ]);
    Logger.log("✅ Đã thêm dòng dữ liệu");
    
    // Sắp xếp theo điểm giảm dần (cột D - index 4)
    if (sheet.getLastRow() > 1) {
      const dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5);
      dataRange.sort({column: 4, ascending: false});
      Logger.log("✅ Đã sắp xếp theo điểm");
    }
    
    // Trả về thành công
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Đã lưu kết quả thành công!',
      data: data
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("❌ Lỗi: " + error.toString());
    
    // Trả về lỗi
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Lỗi: ' + error.toString(),
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Để test, có thể GET để xem dữ liệu
  try {
    Logger.log("📥 Nhận request GET");
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Apps Script đang hoạt động!",
      rows: data.length,
      data: data,
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("❌ Lỗi GET: " + error.toString());
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function để kiểm tra quyền
function testPermissions() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  Logger.log("✅ Sheet name: " + sheet.getName());
  Logger.log("✅ Last row: " + sheet.getLastRow());
  Logger.log("✅ Permissions OK!");
}

