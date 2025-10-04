# 🎮 Hướng Dẫn Cài Đặt Google Sheets Leaderboard

## 📋 Tính năng
Khi người chơi **thắng** Game 2 (Thợ săn Giá trị Thặng dư), họ có thể lưu kết quả vào Google Sheets để tạo bảng xếp hạng.

### Dữ liệu được lưu:
- **Tên**: Tên người chơi
- **Giá trị Thặng dư**: GTTD thu được
- **Tiền**: Số tiền còn lại
- **Điểm**: Tính theo công thức `Điểm = GTTD + Tiền × 8`
- **Ngày chơi**: Thời gian hoàn thành game

---

## 🛠️ Cài Đặt Google Apps Script

### Bước 1: Chuẩn bị Google Sheet

1. Mở Google Sheet của bạn: [Sheet Link](https://docs.google.com/spreadsheets/d/1sxewYWtnjdV4bRwzHH8OsSH70wDAnAoysvIAI_kvs1Y/edit)
2. Đổi tên sheet thành **"CMLAI_Minigame_Leaderboard"** (tùy chọn)
3. Thêm header vào dòng đầu tiên:
   - A1: `Tên`
   - B1: `Giá trị Thặng dư`
   - C1: `Tiền`
   - D1: `Điểm`
   - E1: `Ngày chơi`

### Bước 2: Tạo Apps Script

1. Trong Google Sheet, vào **Extensions** → **Apps Script**
2. Xóa code mẫu có sẵn
3. Copy toàn bộ code từ file `GoogleAppsScript.js` và paste vào
4. Nhấn **Save** (Ctrl+S) và đặt tên project: `CMLAI_Game_API`

### Bước 3: Deploy Web App ⚠️ QUAN TRỌNG

1. Nhấn **Deploy** → **New deployment**
2. Nhấn vào **⚙️ icon bánh răng** bên cạnh "Select type"
3. Chọn type: **Web app**
4. Cấu hình **CỰC KỲ QUAN TRỌNG**:
   - **Description**: `CMLAI Game Leaderboard API`
   - **Execute as**: **`Me (email của bạn)`** ← Chọn email của bạn
   - **Who has access**: **`Anyone`** ← PHẢI CHỌN "Anyone", KHÔNG phải "Anyone with Google account"
5. Nhấn **Deploy**
6. **QUAN TRỌNG**: Lần đầu tiên sẽ yêu cầu authorize:
   - Nhấn **Authorize access**
   - Chọn tài khoản Google của bạn
   - Nhấn **Advanced** → **Go to CMLAI_Game_API (unsafe)**
   - Nhấn **Allow** để cấp quyền
7. Copy **Web app URL** (dạng: `https://script.google.com/macros/s/...../exec`)

**⚠️ LƯU Ý**: Nếu chọn sai "Who has access", bạn sẽ gặp lỗi 401!

### Bước 4: Cập nhật .env

1. Mở file `.env` trong project
2. Paste URL vào `VITE_SHEET_URL`:
   ```
   VITE_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

### Bước 5: Test

1. Chạy dev server: `npm run dev`
2. Chơi Game 2 và thắng
3. Nhập tên và nhấn "Lưu Kết Quả"
4. Kiểm tra Google Sheet → Dữ liệu sẽ tự động xuất hiện!

---

## 🧪 Testing Apps Script

Để test Apps Script hoạt động:

### Test bằng GET request:
Mở URL script trong browser:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Kết quả sẽ hiển thị:
```json
{
  "success": true,
  "rows": 5,
  "data": [["Tên", "GTTD", "Tiền", "Điểm", "Ngày"], ...]
}
```

### Test bằng POST (Postman/Thunder Client):
```
POST https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
Content-Type: application/json

{
  "name": "Test Player",
  "surplusValue": 520,
  "money": 80,
  "score": 1160,
  "date": "3/10/2025, 10:30:00"
}
```

---

## 🎯 Công thức Tính Điểm

```
Điểm = Giá trị Thặng dư + (Tiền × 8)
```

### Ví dụ:
- GTTD: 520
- Tiền: $80
- **Điểm = 520 + (80 × 8) = 1,160**

### Giải thích:
- **Giá trị Thặng dư** thể hiện khả năng bóc lột lao động
- **Tiền × 8** thể hiện khả năng quản lý tài chính (tiền quan trọng hơn 8 lần)
- Người chơi cần cân bằng giữa thu thập GTTD và giữ tiền

---

## 🔧 Troubleshooting

### ❌ Lỗi 401 Unauthorized (PHỔ BIẾN NHẤT)

**Nguyên nhân**: Apps Script chưa được cấu hình đúng hoặc "Who has access" không phải "Anyone"

**Giải pháp**:
1. Vào Apps Script editor
2. Nhấn **Deploy** → **Manage deployments**
3. Nhấn **✏️ Edit** deployment hiện tại
4. Kiểm tra:
   - ✅ Execute as: **Me (your-email@gmail.com)**
   - ✅ Who has access: **Anyone** (KHÔNG phải "Anyone with Google account")
5. Nhấn **Deploy**
6. Copy **URL MỚI** và thay trong `.env`

**Nếu vẫn lỗi**:
1. Xóa deployment cũ
2. Tạo **New deployment** mới
3. Làm theo hướng dẫn Bước 3 ở trên

### ❌ Lỗi "Authorization required"
- Vào Apps Script → **Run** → chọn function `doPost`
- Nhấn **Authorize**
- Chấp nhận quyền truy cập
- **Advanced** → **Go to project (unsafe)** → **Allow**

### ❌ Lỗi "403 Forbidden"
- Kiểm tra "Who has access" = **Anyone**
- Redeploy với New deployment
- Clear browser cache và thử lại

### Dữ liệu không xuất hiện
- Kiểm tra Console (F12) → Network tab
- Xem có lỗi CORS không
- Kiểm tra URL trong `.env` có đúng không

### Script chạy chậm
- Apps Script free tier có giới hạn: 20,000 requests/day
- Nếu nhiều người chơi, cân nhắc upgrade

---

## 📊 Xem Bảng Xếp Hạng

Dữ liệu được tự động sắp xếp theo **Điểm giảm dần** trong Google Sheet.

### Để tạo dashboard đẹp:
1. Vào Google Sheet → Insert → Chart
2. Chọn Chart type: **Table** hoặc **Bar chart**
3. Data range: Select all data
4. Customize: Màu sắc, font chữ theo theme CMLAI

---

## 🚀 Nâng Cấp (Tùy chọn)

### Thêm validation:
```javascript
// Trong Apps Script, thêm vào đầu doPost():
if (!data.name || data.name.trim().length < 2) {
  throw new Error("Tên phải có ít nhất 2 ký tự");
}
if (data.score < 0) {
  throw new Error("Điểm không hợp lệ");
}
```

### Giới hạn duplicate names:
```javascript
// Kiểm tra tên đã tồn tại trong 1 giờ qua
const values = sheet.getDataRange().getValues();
const oneHourAgo = new Date(Date.now() - 3600000);
const recentNames = values.filter(row => {
  const rowDate = new Date(row[4]);
  return row[0] === data.name && rowDate > oneHourAgo;
});

if (recentNames.length > 0) {
  throw new Error("Bạn đã lưu kết quả trong vòng 1 giờ qua!");
}
```

### Thêm webhook Discord/Telegram:
```javascript
// Gửi thông báo khi có người đạt điểm cao
if (data.score > 1500) {
  UrlFetchApp.fetch("YOUR_WEBHOOK_URL", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      content: `🏆 ${data.name} đạt ${data.score} điểm!`
    })
  });
}
```

---

## 📝 Notes

- Apps Script có độ trễ ~1-2 giây do cold start
- Mode `no-cors` được dùng để tránh CORS error
- Dữ liệu được lưu ngay lập tức vào Sheet
- Có thể share Sheet link công khai để mọi người xem leaderboard

---

**Phát triển bởi**: CMLAI Team  
**Game**: Triết 4.0 - Thợ săn Giá trị Thặng dư
