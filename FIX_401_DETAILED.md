# 🚨 FIX LỖI 401 - HƯỚNG DẪN TỪNG BƯỚC CỤ THỂ

## ⚠️ BẠN ĐANG GẶP LỖI:
```
POST https://script.google.com/.../exec net::ERR_ABORTED 401 (Unauthorized)
```

**Nghĩa là**: Apps Script không cho phép request từ website của bạn vì chưa được authorize hoặc deploy đúng cách.

---

## ✅ GIẢI PHÁP - LÀM CHÍNH XÁC TỪNG BƯỚC

### BƯỚC 1: Mở Google Sheet

1. Click vào link này: https://docs.google.com/spreadsheets/d/1sxewYWtnjdV4bRwzHH8OsSH70wDAnAoysvIAI_kvs1Y/edit
2. Đảm bảo bạn đang login đúng tài khoản Google có quyền edit sheet này

### BƯỚC 2: Thêm Header (nếu chưa có)

Trong sheet, dòng 1 phải có:
```
A1: Tên
B1: Giá trị Thặng dư
C1: Tiền
D1: Điểm
E1: Ngày chơi
```

### BƯỚC 3: Vào Apps Script Editor

1. Trong Google Sheet, vào menu **Extensions** (hoặc **Tiện ích**)
2. Chọn **Apps Script**
3. Cửa sổ Apps Script editor sẽ mở ra

### BƯỚC 4: Paste Code Mới

1. **XÓA HẾT** code mẫu có sẵn (function myFunction() {...})
2. Mở file `GoogleAppsScript.js` trong VS Code
3. **Copy TOÀN BỘ** code (Ctrl+A, Ctrl+C)
4. Paste vào Apps Script editor (Ctrl+V)
5. Nhấn **Save** (Ctrl+S hoặc icon đĩa)
6. Đặt tên project: `CMLAI_Game_API`

### BƯỚC 5: ⚠️ AUTHORIZE (BƯỚC QUAN TRỌNG NHẤT!)

**Đây là bước bạn có thể đã bỏ qua!**

1. Ở dropdown function (góc trên), chọn: **`doPost`**
2. Nhấn nút **Run** ▶️ (hoặc Ctrl+R)
3. Sẽ xuất hiện popup: **"Authorization required"**
4. Nhấn **Review Permissions**
5. Chọn tài khoản Google của bạn
6. Sẽ thấy cảnh báo: **"Google hasn't verified this app"**
   - Đây là BÌNH THƯỜNG! Vì đây là script của bạn
7. Nhấn **Advanced** (góc dưới bên trái)
8. Nhấn **Go to CMLAI_Game_API (unsafe)**
9. Nhấn **Allow** để cấp quyền:
   - ✅ See, edit, create, and delete your spreadsheets
   - ✅ Connect to external service

10. Sau khi authorize, sẽ thấy log: "Execution completed"

✅ **Xong bước này, Apps Script đã có quyền truy cập Sheet!**

### BƯỚC 6: Test Function

1. Chọn function: **`testPermissions`**
2. Nhấn **Run** ▶️
3. Xem log (View → Logs hoặc Ctrl+Enter)
4. Phải thấy:
   ```
   ✅ Sheet name: ...
   ✅ Last row: ...
   ✅ Permissions OK!
   ```

### BƯỚC 7: Deploy Web App

1. Nhấn **Deploy** (góc trên bên phải) → **New deployment**

2. Nhấn **⚙️ icon** (bên cạnh "Select type") → chọn **Web app**

3. **Điền thông tin**:
   ```
   ┌─────────────────────────────────────────────┐
   │ Description:                                │
   │ [CMLAI Game Leaderboard API]               │
   │                                             │
   │ Execute as:                                 │
   │ [Me (your-email@gmail.com)]  ← CHỌN CÁI NÀY│
   │                                             │
   │ Who has access:                             │
   │ [Anyone]  ← PHẢI CHỌN "Anyone"             │
   │                                             │
   │ ❌ KHÔNG CHỌN:                             │
   │    - Only myself                            │
   │    - Anyone with Google account             │
   └─────────────────────────────────────────────┘
   ```

4. Nhấn **Deploy**

5. Sẽ thấy dialog "New deployment created"

6. **COPY URL** có dạng:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
   ⚠️ Phải có `/exec` ở cuối!

### BƯỚC 8: Test URL trong Browser

**QUAN TRỌNG: Test trước khi dùng trong game!**

1. Copy URL vừa nhận được
2. Mở tab mới trong browser
3. Paste URL và Enter
4. **Phải thấy JSON response**:
   ```json
   {
     "success": true,
     "message": "Apps Script đang hoạt động!",
     "rows": 1,
     "data": [["Tên", "Giá trị Thặng dư", "Tiền", "Điểm", "Ngày chơi"]],
     "timestamp": "2025-10-03T..."
   }
   ```

❌ **Nếu thấy lỗi 401 ngay ở đây**:
- Quay lại BƯỚC 5: Authorize lại function `doPost`
- Hoặc BƯỚC 7: Kiểm tra "Who has access" = "Anyone"

### BƯỚC 9: Update .env File

1. Mở file `.env` trong VS Code
2. Thay URL cũ bằng URL mới:
   ```env
   VITE_SHEET_URL=https://script.google.com/macros/s/[YOUR_NEW_ID]/exec
   ```

### BƯỚC 10: Restart Dev Server

**⚠️ PHẢI RESTART để .env được load lại!**

```powershell
# Trong terminal VS Code:
# 1. Stop server: Nhấn Ctrl+C
# 2. Start lại:
npm run dev
```

### BƯỚC 11: Test trong Game

1. Mở browser: http://localhost:5173 (hoặc port của bạn)
2. Chơi Game 2
3. Thắng game (đạt 500 GTTD)
4. Nhập tên
5. Nhấn "Lưu Kết Quả"
6. Mở **Console (F12)** → Xem log
7. Mở Google Sheet → **Phải thấy dữ liệu mới xuất hiện!**

---

## 🔍 KIỂM TRA LẠI

### ✅ Checklist đầy đủ:

- [ ] Sheet có header dòng 1
- [ ] Đã paste code mới vào Apps Script
- [ ] Đã Save code (Ctrl+S)
- [ ] **Đã authorize function `doPost`** ← QUAN TRỌNG!
- [ ] Đã test function `testPermissions` thành công
- [ ] Deploy với "Execute as: Me"
- [ ] Deploy với "Who has access: Anyone"
- [ ] Test URL trong browser thấy JSON
- [ ] Copy đúng URL vào `.env`
- [ ] Restart dev server
- [ ] Test trong game

---

## 🆘 VẪN BỊ LỖI 401?

### Nếu URL test trong browser OK nhưng game vẫn lỗi:

1. **Clear browser cache**:
   ```
   Ctrl+Shift+Delete → Clear cache
   ```

2. **Hard reload**:
   ```
   Ctrl+Shift+R
   ```

3. **Kiểm tra .env**:
   ```powershell
   # In terminal:
   Get-Content .env
   ```
   Đảm bảo URL đúng và không có khoảng trắng thừa

4. **Kiểm tra env trong browser**:
   ```javascript
   // Paste vào Console (F12):
   console.log(import.meta.env.VITE_SHEET_URL);
   ```
   Phải in ra URL đúng

### Nếu URL test trong browser cũng lỗi 401:

1. **Authorize lại**:
   - Apps Script → chọn `doPost` → Run → Allow

2. **Redeploy**:
   - Deploy → Manage deployments
   - Archive deployment cũ
   - New deployment mới

3. **Kiểm tra tài khoản**:
   - Đảm bảo login đúng Google account
   - Account có quyền edit Sheet

---

## 📞 DEBUG INFO CẦN THIẾT

Nếu vẫn không được, gửi cho tôi:

1. **Screenshot deployment settings** (Execute as + Who has access)
2. **Response khi test URL trong browser**
3. **Console log** từ game (F12 → Console)
4. **Content của file .env** (che ID nếu cần)

---

## 💡 LƯU Ý

- URL mới sau mỗi deployment khác URL cũ
- Mỗi lần update code Apps Script, KHÔNG CẦN deploy lại
- Chỉ cần deploy lại khi thay đổi settings
- Browser có thể cache response, clear cache nếu cần
- Mode `no-cors` là ĐÚNG, không đổi thành `cors`

---

**Good luck!** 🚀

Làm đúng theo các bước trên, lỗi 401 sẽ được fix 100%!
