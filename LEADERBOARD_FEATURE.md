# 🏆 TÍNH NĂNG BẢNG XẾP HẠNG - HƯỚNG DẪN

## ✨ Tính năng mới

Sau khi người chơi **thắng game** và **lưu kết quả**, họ có thể xem **Bảng Xếp Hạng Top 10** với điểm số cao nhất.

---

## 🎮 Luồng hoạt động

```
1. Người chơi thắng game (đạt 500 GTTD)
   ↓
2. Hiện form nhập tên
   ↓
3. Nhập tên → Nhấn "Lưu Kết Quả"
   ↓
4. Gửi dữ liệu lên Google Sheet
   ↓
5. Sau 1 giây, tự động fetch bảng xếp hạng
   ↓
6. Hiển thị Top 10 người chơi theo điểm số giảm dần
   ↓
7. Highlight tên người chơi hiện tại (nếu có trong top 10)
```

---

## 📊 Cấu trúc Bảng Xếp Hạng

### Top 3 đặc biệt:
- 🥇 **#1**: Background vàng + border vàng
- 🥈 **#2**: Background xám + border xám
- 🥉 **#3**: Background đồng + border đồng

### Từ #4 đến #10:
- Background steel gray
- Border trắng mờ
- Số thứ tự #4, #5, #6...

### Thông tin hiển thị:
```
┌─────────────────────────────────────────────────────┐
│ 🥇  Player Name [BẠN]              1,234 điểm       │
│     GTTD: 520 | 💰 $80 | 17:03:49 3/10/2025        │
└─────────────────────────────────────────────────────┘
```

- **Tên người chơi**
- **Badge "BẠN"** nếu là người chơi hiện tại
- **Giá trị thặng dư** (GTTD)
- **Tiền** còn lại
- **Điểm số** lớn, in đậm
- **Thời gian** chơi

---

## 🎯 Công thức Tính Điểm

```javascript
Điểm = Giá trị Thặng dư + (Tiền × 8)
```

### Ví dụ:
```
Player 1: GTTD = 520, Tiền = $80
→ Điểm = 520 + (80 × 8) = 1,160

Player 2: GTTD = 600, Tiền = $50
→ Điểm = 600 + (50 × 8) = 1,000

Player 1 > Player 2 → Player 1 xếp hạng cao hơn
```

---

## 🔧 Cấu hình Google Apps Script

Apps Script đã được cấu hình để:

### 1. POST Request (Lưu dữ liệu)
```javascript
function doPost(e) {
  // Nhận data từ game
  // Thêm vào sheet
  // Sắp xếp theo điểm giảm dần
  // Trả về success
}
```

### 2. GET Request (Lấy bảng xếp hạng)
```javascript
function doGet(e) {
  // Lấy toàn bộ dữ liệu từ sheet
  // Trả về JSON format
  return {
    success: true,
    data: [[header], [row1], [row2], ...]
  }
}
```

### 3. Auto Sort
Dữ liệu được tự động sắp xếp theo cột **Điểm** (cột D) giảm dần ngay sau khi thêm dòng mới.

---

## 🚀 Cách sử dụng

### Trong Game:

1. **Chơi và Thắng**: Đạt 500 GTTD trong 2 phút
2. **Lưu Kết Quả**: Nhập tên và nhấn "Lưu"
3. **Tự động hiện Leaderboard**: Sau 1 giây
4. **Hoặc nhấn nút**: "🏆 Xem Bảng Xếp Hạng" nếu bỏ qua lưu

### Xem Bảng Xếp Hạng Đầy Đủ:

Nhấn nút **"📊 Xem Bảng Xếp Hạng Đầy Đủ"** để mở Google Sheet trong tab mới.

---

## 🎨 UI Components

### 1. Loading State
```
   ⏳ (spinning animation)
   Đang tải bảng xếp hạng...
```

### 2. Empty State
```
   📊
   Chưa có dữ liệu bảng xếp hạng
```

### 3. Leaderboard Card
- Gradient background (vàng → xanh dương)
- Border vàng 2px
- Title với emoji 🏆
- Animation fade in từ trái qua phải (stagger)
- Responsive layout

### 4. Player Highlight
- Badge "BẠN" màu xanh dương nếu là người chơi hiện tại
- So sánh theo `playerName === player.name`

---

## 📱 Responsive Design

### Desktop (>768px):
- Card rộng tối đa 768px
- Flex layout với spacing thoải mái
- Font size lớn, dễ đọc

### Mobile (<768px):
- Tự động thu nhỏ
- Rank icon nhỏ hơn
- Text truncate nếu tên quá dài

---

## 🔐 Security & Privacy

### Public Access:
- Apps Script deployment: "Who has access" = **Anyone**
- Bất kỳ ai cũng có thể:
  - ✅ Lưu kết quả (POST)
  - ✅ Xem bảng xếp hạng (GET)

### Data Stored:
- Tên người chơi (tối đa 50 ký tự)
- Giá trị thặng dư
- Tiền
- Điểm
- Ngày chơi (format: HH:MM:SS DD/MM/YYYY)

### No Sensitive Data:
- Không lưu email
- Không lưu IP address
- Không lưu device info

---

## 🐛 Troubleshooting

### Leaderboard không hiện:

1. **Kiểm tra Console (F12)**:
   ```javascript
   // Phải thấy:
   📊 Đang tải bảng xếp hạng...
   ✅ Leaderboard data: {...}
   🏆 Top 10: [...]
   ```

2. **Test GET request**:
   ```javascript
   fetch('YOUR_APPS_SCRIPT_URL', {method: 'GET', mode: 'cors'})
     .then(r => r.json())
     .then(d => console.log(d))
   ```

3. **Kiểm tra Apps Script**:
   - Function `doGet` đã có chưa?
   - Deployment "Who has access" = Anyone?

### CORS Error:

```
Access-Control-Allow-Origin header is missing
```

**Fix**: Apps Script đã tự động thêm CORS headers khi return `ContentService.createTextOutput()`

### Data không đúng format:

Kiểm tra Google Sheet:
- Dòng 1 phải là header
- Các cột theo thứ tự: Tên | GTTD | Tiền | Điểm | Ngày

---

## 🎯 Future Enhancements

### 1. Pagination
- Hiện tại: Top 10
- Tương lai: View all với pagination

### 2. Filters
- Filter theo ngày (hôm nay, tuần này, tháng này)
- Filter theo điểm số range

### 3. Player Profile
- Click vào tên → Xem chi tiết
- Lịch sử chơi
- Thống kê

### 4. Real-time Updates
- WebSocket hoặc polling
- Update leaderboard tự động mỗi 30 giây

### 5. Animations
- Confetti khi vào Top 3
- Trophy rotation animation
- Score counter animation

---

## 📝 Code Structure

### State Management:
```javascript
const [showLeaderboard, setShowLeaderboard] = useState(false);
const [leaderboardData, setLeaderboardData] = useState([]);
const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);
```

### Fetch Function:
```javascript
const fetchLeaderboard = async () => {
  // 1. Set loading state
  // 2. Fetch from Apps Script (GET)
  // 3. Parse và sort data
  // 4. Take top 10
  // 5. Update state
  // 6. Show leaderboard
}
```

### Auto-fetch after save:
```javascript
// Trong saveResultToSheet():
setSaveMessage("✅ Đã lưu kết quả thành công!");
setTimeout(() => {
  fetchLeaderboard(); // Auto-fetch sau 1 giây
}, 1000);
```

---

## ✅ Checklist hoàn thành

- [x] Add leaderboard state variables
- [x] Create fetchLeaderboard function
- [x] Parse và sort data by score (descending)
- [x] Take top 10 players
- [x] Design leaderboard UI với medals
- [x] Highlight current player
- [x] Add loading state
- [x] Add empty state
- [x] Auto-fetch after save
- [x] Manual fetch button
- [x] Link to full sheet
- [x] Responsive design
- [x] Animation effects

---

**Developed by**: CMLAI Team  
**Game**: Triết 4.0 - Thợ săn Giá trị Thặng dư  
**Version**: 2.0 with Leaderboard
