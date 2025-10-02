# 🎮 Triết 4.0 - Mini Games Documentation

## Tổng quan
Bốn mini-game tương tác dựa trên kịch bản Triết học Mác-Lênin trong kỷ nguyên AI, sử dụng công nghệ hiện đại để tăng trải nghiệm học tập.

---

## 🛠️ Công Nghệ Sử Dụng

### Core Libraries
- **React** - Framework chính
- **Framer Motion** - Animation và transitions
- **React Three Fiber** (sẵn sàng) - 3D graphics nếu cần mở rộng
- **Google Generative AI (Gemini)** - Tạo nội dung AI động
- **React Confetti** - Hiệu ứng chiến thắng

### Features Implemented
✅ Smooth animations với Framer Motion
✅ Modal system với backdrop blur
✅ Progress tracking & scoring
✅ AI integration với Gemini API
✅ Responsive design
✅ Gamification (points, badges, confetti)

---

## 🎯 Các Game

### Game 1: Mâu thuẫn 4.0
**Loại:** Chiến lược lựa chọn
**Độ khó:** Trung bình
**Thời gian:** ~5-7 phút

#### Mô tả
Nhập vai nhà cố vấn thời gian du hành qua 3 giai đoạn lịch sử (Phong kiến, Cách mạng công nghiệp, Hiện đại). Mỗi màn xuất hiện robot AI và người chơi phải chọn cách điều chỉnh quan hệ sản xuất.

#### Cơ Chế Game
- 3 levels (eras) với 3 choices mỗi level
- Mỗi lựa chọn có outcome khác nhau (success/partial/fail)
- Mentor Mác xuất hiện đưa hints và quotes
- Animation khi chuyển màn và hiển thị kết quả
- Scoring: 100 points cho success, 50 cho partial

#### Key Features
- Branching narrative với nhiều endings
- Educational quotes từ Marx
- Visual feedback với particles (có thể thêm)
- Progress bar tracking

---

### Game 2: Thợ săn Giá trị Thặng dư
**Loại:** Simulation/Resource Management
**Độ khó:** Khó
**Thời gian:** 2 phút (realtime)

#### Mô tả
Người chơi là nhà tư bản điều hành nhà máy với 4 công nhân. Mục tiêu: Thu thập 500 giá trị thặng dư trong 2 phút bằng cách click công nhân (bóc lột) hoặc mua robot AI.

#### Cơ Chế Game
- Click worker để exploit (+10 GTTD, -15 HP)
- Workers tự hồi 2 HP/giây
- Buy robots ($50 each, auto produce 5 GTTD/giây)
- Robots degrade over time (condition meter)
- Strike triggers khi 2+ workers < 30 HP
- Convert GTTD to money (10:1 ratio)

#### Balancing
- Phải cân bằng giữa exploit workers và invest AI
- Quá exploit → strike → lose
- Chỉ dùng AI → thiếu value creation
- Teach: "Giá trị từ lao động sống"

#### Key Features
- Real-time timer
- Health bars với color coding
- Strike event system
- Multiple endings với different messages
- Confetti on win

---

### Game 3: AI và Đấu tranh Giai cấp 4.0
**Loại:** Dual-perspective RPG
**Độ khó:** Khó
**Thời gian:** ~8-10 phút (cả 2 modes)

#### Mô tả
Trải nghiệm 2 vai: Tư bản công nghệ (CEO startup) và Lao động số (tài xế gig). Mỗi mode có 3 ngày với scenarios khác nhau.

#### Mode 1: Capitalist
- Mục tiêu: Maximize profit, maintain fairness
- 3 days với choices về: hiring, pricing, automation
- Scoring: Profit points + Fairness meter (0-100%)
- Events: Strikes, government investigation

#### Mode 2: Worker
- Mục tiêu: Earn enough income, maintain happiness
- 3 days với choices về: work hours, strikes, unions
- Scoring: Income + Happiness meter (0-100%)
- Events: Algorithm changes, collective action

#### Key Features
- Split-screen concept (có thể visual hóa)
- Compare results sau khi chơi cả 2 modes
- Marx quote: "Vô sản đoàn kết!"
- Multiple endings dựa trên balance

---

### Game 4: Thử tài Sáng tạo
**Loại:** Quiz/Turing Test
**Độ khó:** Dễ
**Thời gian:** ~3-5 phút

#### Mô tả
Đoán xem tác phẩm nào do con người hay AI tạo ra. 5 câu hỏi về: thơ, văn xuôi, code, triết lý, và 1 câu AI generated realtime.

#### Cơ Chế Game
- 5 questions với 2 options (A vs B)
- Categories: Poem, Story, Code, Philosophy
- 1 question uses Gemini API để tạo thơ realtime
- 15 seconds mỗi câu (timer visual)
- Trợ lý Turing cho hints

#### AI Integration (Gemini)
```javascript
const genAI = new GoogleGenerativeAI("API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
// Generate poem/content on-the-fly
```

#### Key Features
- Real AI generation với Gemini
- Educational tooltips về differences
- Percentage score với philosophical questions
- Different messages based on performance
- Confetti trên 60%+

---

## 🎨 UI/UX Features

### Animations (Framer Motion)
- Page transitions
- Modal open/close với spring physics
- Button hover states với scale
- Result screens với rotation
- Progress bars với smooth width changes
- Confetti on success

### Visual Design
- Cyber theme colors (cyber-blue, revolutionary-gold, neural-green)
- Gradient backgrounds
- Glass morphism effects (backdrop-blur)
- Responsive grid layouts (2 columns games)
- Health/meter bars với color coding
- Badge system

### Gamification
✅ Points & scoring system
✅ Progress bars
✅ Badges (difficulty, type)
✅ Confetti celebrations
✅ Leaderboard ready (localStorage/Firebase)
✅ Multiple endings
✅ Marx quotes as rewards

---

## 🚀 Cài Đặt & Chạy

```bash
# Đã cài đặt dependencies
npm install framer-motion @react-three/fiber @react-three/drei three firebase @google/generative-ai react-confetti

# Chạy dev server
npm run dev

# Build production
npm run build
```

---

## 📁 Cấu Trúc File

```
src/
├── game/
│   ├── GameModal.jsx              # Modal wrapper component
│   ├── Game1_Contradiction.jsx    # Game 1: Mâu thuẫn 4.0
│   ├── Game2_SurplusValue.jsx     # Game 2: Thợ săn GTTD
│   ├── Game3_ClassStruggle.jsx    # Game 3: Đấu tranh giai cấp
│   └── Game4_CreativityTest.jsx   # Game 4: Sáng tạo AI
└── pages/
    └── ActivitiesPage.jsx         # Main page với game cards
```

---

## 🔮 Mở Rộng Trong Tương Lai

### Đã sẵn sàng implement:
- [ ] React Three Fiber cho 3D scenes (factory, feudal farm)
- [ ] Lottie animations cho characters
- [ ] Particle systems cho revolution effects
- [ ] Firebase Realtime Database cho multiplayer
- [ ] Supabase cho leaderboard
- [ ] WebRTC peer-to-peer
- [ ] More AI API integrations (Stable Diffusion cho art)
- [ ] Sound effects & background music
- [ ] Mobile-optimized touch controls
- [ ] Achievements system
- [ ] Social sharing features

### Improvements:
- [ ] Add more levels to Game 1
- [ ] More worker types in Game 2
- [ ] More scenarios in Game 3
- [ ] Expand AI content types in Game 4
- [ ] Add mini-tutorials
- [ ] Save progress to localStorage
- [ ] Analytics tracking

---

## 🎓 Educational Value

### Khái Niệm Được Dạy:
1. **Game 1:** Lực lượng sản xuất vs. Quan hệ sản xuất
2. **Game 2:** Giá trị thặng dư, bóc lột lao động
3. **Game 3:** Đấu tranh giai cấp hiện đại
4. **Game 4:** Sáng tạo nhân văn vs. AI

### Phương Pháp:
- Learning by doing (experiential)
- Multiple perspectives
- Immediate feedback
- Branching narratives
- Gamification keeps engagement
- Philosophical quotes reinforce concepts

---

## 🐛 Known Issues & Solutions

### Potential Issues:
1. **Gemini API rate limits**
   - Solution: Cache generated content
   - Fallback to pre-made content

2. **Performance với nhiều animations**
   - Solution: Use React.memo, lazy loading
   - Optimize re-renders

3. **Mobile touch targets**
   - Solution: Larger buttons, better spacing
   - Touch-optimized controls

---

## 👥 Credits

**Developer:** AI Assistant + Your Team
**Framework:** React + Vite
**Animation:** Framer Motion
**AI:** Google Gemini
**Philosophy:** Karl Marx & Vladimir Lenin
**Design:** Cyberpunk/Revolutionary theme

---

## 📝 License

Educational project - Triết 4.0
Dự án Triết học Mác-Lênin trong kỷ nguyên AI

---

**Chúc bạn học vui và chơi game vui! 🎮📚✊**
