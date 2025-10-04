# 🎯 QUICK FIX - LỖI 401 (5 PHÚT)

## 📌 TÓM TẮT VẤN ĐỀ

Bạn đang gặp lỗi: **Failed to load resource: 401 Unauthorized**

Nguyên nhân: Google Apps Script chưa được cấu hình cho phép truy cập công khai.

---

## ⚡ GIẢI PHÁP NHANH (5 BƯỚC)

### 1️⃣ Mở Google Sheet
```
https://docs.google.com/spreadsheets/d/1sxewYWtnjdV4bRwzHH8OsSH70wDAnAoysvIAI_kvs1Y/edit
```

### 2️⃣ Vào Apps Script
**Extensions** → **Apps Script**

### 3️⃣ Authorize (Lần đầu tiên)
1. Chọn function `doPost` 
2. Nhấn Run ▶️
3. Review Permissions → Allow
4. Advanced → Go to project (unsafe) → Allow

### 4️⃣ Deploy với Settings Đúng
```
Deploy → New deployment

Settings:
├─ Type: Web app
├─ Execute as: Me (email@gmail.com)
└─ Who has access: Anyone ← QUAN TRỌNG!
```

### 5️⃣ Update URL trong .env
```env
VITE_SHEET_URL=https://script.google.com/macros/s/[NEW_URL]/exec
```

**Restart server:**
```powershell
npm run dev
```

---

## ✅ TEST NGAY

1. Mở browser → Paste URL từ deployment
2. Phải thấy JSON response (không phải lỗi 401)
3. Chơi game → Thắng → Nhập tên → Lưu
4. Check Google Sheet → Dữ liệu xuất hiện ✅

---

## 🆘 VẪN LỖI?

### Quick checks:
- [ ] URL trong `.env` có đúng không? (phải có `/exec` ở cuối)
- [ ] Đã restart dev server chưa? (Ctrl+C rồi `npm run dev`)
- [ ] "Who has access" = "Anyone" (không phải "Anyone with Google account")
- [ ] Đã authorize function `doPost` chưa?

### Xem thêm:
- `FIX_401_ERROR.md` - Hướng dẫn chi tiết
- `LEADERBOARD_SETUP.md` - Setup từ đầu

---

**URL hiện tại trong .env của bạn:**
```
https://script.google.com/macros/s/AKfycbznAbGryKRcEns9rsCWmdc-e2InfMo1B6ggHuuVkiTSbnnY1Lh-IleHWkXryz2y_wHq/exec
```

⚠️ Nếu bạn tạo deployment mới, URL này sẽ thay đổi!

---

**Contact**: Nếu vẫn không được, gửi screenshot của:
1. Deployment settings
2. Browser console (F12)
3. Response khi mở URL trực tiếp
