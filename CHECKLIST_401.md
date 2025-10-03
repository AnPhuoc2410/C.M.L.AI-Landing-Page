# ✅ CHECKLIST FIX LỖI 401 - IN RA VÀ LÀM THEO

## 📋 Làm theo thứ tự từ trên xuống:

```
┌──────────────────────────────────────────────────────────────┐
│  BƯỚC  │  VIỆC CẦN LÀM                     │  ✓ XONG       │
├──────────────────────────────────────────────────────────────┤
│   1    │ Mở Google Sheet                   │  [ ]          │
│        │ Link: https://docs.google.com/... │               │
│        │                                    │               │
│   2    │ Thêm header dòng 1 nếu chưa có   │  [ ]          │
│        │ Tên | GTTD | Tiền | Điểm | Ngày  │               │
│        │                                    │               │
│   3    │ Extensions → Apps Script          │  [ ]          │
│        │                                    │               │
│   4    │ Xóa code cũ, paste code mới      │  [ ]          │
│        │ File: GoogleAppsScript.js         │               │
│        │ Save (Ctrl+S)                     │               │
│        │                                    │               │
│   5    │ ⚠️ AUTHORIZE (QUAN TRỌNG!)        │  [ ]          │
│        │ - Chọn function: doPost           │               │
│        │ - Nhấn Run ▶️                      │               │
│        │ - Review Permissions → Allow      │               │
│        │ - Advanced → Go to project        │               │
│        │                                    │               │
│   6    │ Test: Run function testPermissions│  [ ]          │
│        │ Phải thấy "✅ Permissions OK!"    │               │
│        │                                    │               │
│   7    │ Deploy → New deployment           │  [ ]          │
│        │ - Type: Web app                   │               │
│        │ - Execute as: Me                  │               │
│        │ - Who has access: Anyone          │               │
│        │                                    │               │
│   8    │ Copy URL deployment               │  [ ]          │
│        │ Format: https://.../exec          │               │
│        │                                    │               │
│   9    │ Test URL trong browser            │  [ ]          │
│        │ Phải thấy JSON {"success": true}  │               │
│        │                                    │               │
│   10   │ Paste URL vào .env                │  [ ]          │
│        │ VITE_SHEET_URL=https://...        │               │
│        │                                    │               │
│   11   │ Restart dev server                │  [ ]          │
│        │ Ctrl+C → npm run dev              │               │
│        │                                    │               │
│   12   │ Test game: Chơi → Thắng → Lưu    │  [ ]          │
│        │ Check Sheet có data mới           │               │
└──────────────────────────────────────────────────────────────┘
```

---

## ⚠️ BƯỚC THƯỜNG BỊ BỎ QUA:

### 🔴 BƯỚC 5 - AUTHORIZE
**Đây là bước QUAN TRỌNG NHẤT!**

Nếu không authorize, Apps Script sẽ trả về lỗi 401!

```
Apps Script Editor
├─ Function dropdown: [chọn "doPost"]
├─ Nhấn Run ▶️
├─ Popup "Authorization required"
│  ├─ Review Permissions
│  ├─ Chọn tài khoản
│  ├─ "Google hasn't verified" → Advanced
│  └─ "Go to CMLAI_Game_API" → Allow
└─ ✅ Xong!
```

### 🔴 BƯỚC 7 - DEPLOY SETTINGS
**Phải chọn đúng "Who has access"!**

```
❌ SAI: "Only myself" → Lỗi 401
❌ SAI: "Anyone with Google account" → Lỗi 401
✅ ĐÚNG: "Anyone" → OK!
```

### 🔴 BƯỚC 9 - TEST URL
**Phải test trong browser TRƯỚC KHI dùng trong game!**

```
Browser → Paste URL → Enter
↓
✅ Thấy JSON → OK, tiếp tục
❌ Lỗi 401 → Quay lại bước 5 hoặc 7
```

### 🔴 BƯỚC 11 - RESTART SERVER
**PHẢI restart để .env được load lại!**

```
Terminal:
Ctrl+C (Stop server)
npm run dev (Start lại)
```

---

## 🔍 QUICK DEBUG

Nếu vẫn lỗi 401, kiểm tra:

```javascript
// 1. Paste vào Console (F12) trong game:
console.log(import.meta.env.VITE_SHEET_URL);

// 2. Phải in ra URL đúng, giống trong .env
// 3. Nếu undefined → Chưa restart server
// 4. Nếu URL cũ → Chưa cập nhật .env đúng
```

```powershell
# 5. Kiểm tra .env trong terminal:
Get-Content .env

# Phải thấy:
# VITE_SHEET_URL=https://script.google.com/macros/s/.../exec
```

---

## 📞 CONTACT

Nếu làm hết checklist mà vẫn lỗi, gửi:
1. Screenshot deployment settings
2. Response khi test URL trong browser
3. Console log (F12) từ game

---

**Print checklist này ra và check từng bước!** ✅
