# 🚨 FIX LỖI 401 UNAUTHORIZED - HƯỚNG DẪN CHI TIẾT

## ❌ Lỗi: "Failed to load resource: the server responded with a status of 401"

### 📋 Checklist nhanh:
- [ ] Apps Script đã được deploy chưa?
- [ ] "Who has access" có phải là "Anyone" không?
- [ ] Đã authorize script lần đầu chưa?
- [ ] URL trong `.env` có đúng không?

---

## ✅ GIẢI PHÁP TỪNG BƯỚC

### Bước 1: Kiểm tra Apps Script

1. Mở Google Sheet: https://docs.google.com/spreadsheets/d/1sxewYWtnjdV4bRwzHH8OsSH70wDAnAoysvIAI_kvs1Y/edit
2. Vào **Extensions** → **Apps Script**
3. Kiểm tra code đã được paste vào chưa?

### Bước 2: Authorize Script (LẦN ĐẦU)

**Trước khi deploy, PHẢI authorize:**

1. Trong Apps Script editor
2. Chọn function: `doPost` (dropdown ở toolbar)
3. Nhấn **Run** (▶️)
4. Sẽ hiện popup: "Authorization required"
5. Nhấn **Review Permissions**
6. Chọn tài khoản Google của bạn
7. Sẽ hiện cảnh báo: "Google hasn't verified this app"
8. Nhấn **Advanced**
9. Nhấn **Go to CMLAI_Game_API (unsafe)**
10. Nhấn **Allow**

✅ Sau khi authorize xong, sẽ thấy "Execution completed"

### Bước 3: Deploy Đúng Cách

**QUAN TRỌNG: Phải chọn đúng settings!**

1. Nhấn **Deploy** → **New deployment** (hoặc **Manage deployments** nếu đã có)
2. Nếu chưa có deployment, nhấn **⚙️ icon** → chọn **Web app**
3. **Configuration**:
   ```
   Description: CMLAI Game Leaderboard API
   
   Execute as: [CHỌN] Me (your-email@gmail.com)
              ⚠️ KHÔNG CHỌN "User accessing the web app"
   
   Who has access: [CHỌN] Anyone
                   ⚠️ PHẢI CHỌN "Anyone", KHÔNG phải:
                      - "Only myself"
                      - "Anyone with Google account"
   ```
4. Nhấn **Deploy**
5. Copy URL (format: `https://script.google.com/macros/s/AKfycb.../exec`)

### Bước 4: Cập nhật URL trong .env

**URL MỚI SAU MỖI LẦN DEPLOY SẼ KHÁC!**

Mở file `.env` và update:
```env
VITE_SHEET_URL=https://script.google.com/macros/s/[YOUR_NEW_DEPLOYMENT_ID]/exec
```

⚠️ **CHÚ Ý**: 
- Mỗi lần deploy mới, URL sẽ thay đổi!
- Phải copy URL từ deployment dialog
- URL phải kết thúc bằng `/exec`

### Bước 5: Test deployment

**Test trực tiếp trong browser:**

1. Copy URL từ deployment
2. Mở tab mới và paste URL
3. Kết quả mong đợi:
   ```json
   {
     "success": true,
     "rows": 1,
     "data": [["Tên", "Giá trị Thặng dư", "Tiền", "Điểm", "Ngày chơi"]]
   }
   ```

❌ Nếu thấy lỗi 401:
- Quay lại Bước 2: Authorize lại
- Hoặc Bước 3: Kiểm tra "Who has access" = "Anyone"

---

## 🔍 DEBUG TRONG GAME

Khi bạn chơi game và thắng:

1. Nhấn **F12** → mở **Console** tab
2. Nhập tên và nhấn "Lưu Kết Quả"
3. Xem log trong Console:

```
📤 Đang gửi dữ liệu lên Google Sheet...
🔗 URL: https://script.google.com/macros/s/.../exec
📊 Data: {name: "Test", surplusValue: 520, money: 80, score: 1160, date: "..."}
✅ Response: Response {type: "opaque", status: 0, ok: false, ...}
📝 Status: 0 (opaque)
```

**Giải thích status codes:**
- `0` (opaque): Bình thường với `mode: "no-cors"` - Request đã được gửi thành công
- `401`: Lỗi authorization - Xem hướng dẫn dưới
- `403`: Lỗi permissions - Kiểm tra "Who has access"

---

## 🆘 VẪN BỊ LỖI 401?

### Option 1: Xóa deployment cũ và tạo mới

1. Apps Script → **Deploy** → **Manage deployments**
2. Nhấn **🗑️ Archive** deployment cũ
3. Tạo **New deployment** mới theo Bước 3
4. Copy URL mới vào `.env`
5. **Restart dev server**: 
   ```powershell
   # Stop server (Ctrl+C)
   npm run dev
   ```

### Option 2: Test với mode 'cors' để xem lỗi chi tiết

Tạm thời đổi trong code:

```javascript
// Trong Game2_SurplusValue.jsx, dòng ~260
const response = await fetch(sheetUrl, {
  method: "POST",
  mode: "cors", // ĐỔI TỪ "no-cors" THÀNH "cors"
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});

// Thêm log để xem response
const responseText = await response.text();
console.log("Response text:", responseText);
```

Sau khi test xong, **đổi lại thành `mode: "no-cors"`**

### Option 3: Kiểm tra Google Account

1. Đảm bảo bạn đang login đúng Google account
2. Account đó phải có quyền edit Sheet
3. Thử logout và login lại Google

---

## 📝 Checklist cuối cùng

Trước khi test, đảm bảo:

- [x] Google Sheet có header row: `Tên | Giá trị Thặng dư | Tiền | Điểm | Ngày chơi`
- [x] Apps Script đã paste code từ `GoogleAppsScript.js`
- [x] Đã chạy function `doPost` và authorize
- [x] Deploy với settings: Execute as "Me", Access "Anyone"
- [x] Copy đúng URL vào `.env`
- [x] Restart dev server sau khi update `.env`
- [x] Test URL trong browser trước (phải thấy JSON response)

---

## 🎯 Test thành công khi:

1. Chơi game và thắng
2. Form nhập tên hiện ra
3. Nhập tên và nhấn "Lưu Kết Quả"
4. Thấy message: "✅ Đã lưu kết quả thành công!"
5. Mở Google Sheet → Thấy dữ liệu mới xuất hiện

---

## 💡 Tips

- Sau mỗi lần thay đổi Apps Script, **KHÔNG CẦN** deploy lại
- Chỉ cần deploy lại nếu thay đổi settings (Execute as, Who has access)
- URL chỉ thay đổi khi tạo **New deployment** mới
- Có thể có nhiều deployments cùng lúc (v1, v2, v3...)
- Dùng "Manage deployments" để switch giữa các versions

---

**Nếu vẫn không được, hãy gửi cho tôi:**
1. Screenshot của deployment settings
2. URL trong file `.env`
3. Screenshot của Console log (F12)
4. Screenshot của lỗi 401

Tôi sẽ giúp bạn debug! 🚀
