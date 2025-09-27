const navLinks = [
  { id: "philosophy", title: "Philosophy" },
  { id: "about", title: "About" },
  { id: "timeline", title: "Journey" },
  { id: "minigame", title: "Interactive" },
  { id: "contact", title: "Contact" },
];

// =============================
// Triết học Mác – Lênin
// =============================
const theoryLists = [
  {
    id: 1,
    name: "Phép biện chứng duy vật",
    origin: "Mác – Ăngghen",
    detail: "Cơ sở lý luận về sự vận động và phát triển",
    importance: "Nền tảng"
  },
  {
    id: 2,
    name: "Chủ nghĩa duy vật lịch sử",
    origin: "Mác",
    detail: "Vai trò của sản xuất vật chất trong lịch sử",
    importance: "Cốt lõi"
  },
  {
    id: 3,
    name: "Chủ nghĩa xã hội khoa học",
    origin: "Mác – Ăngghen – Lênin",
    detail: "Định hướng xây dựng xã hội công bằng",
    importance: "Chiến lược"
  },
  {
    id: 4,
    name: "Kinh tế chính trị Mác – Lênin",
    origin: "Lênin",
    detail: "Phân tích quan hệ sản xuất và giá trị thặng dư",
    importance: "Quan trọng"
  }
]

// =============================
// Trí tuệ nhân tạo (AI)
// =============================
const aiLists = [
  {
    id: 1,
    name: "Machine Learning",
    origin: "AI hiện đại",
    detail: "Học từ dữ liệu để dự đoán và phân loại",
    importance: "Ứng dụng rộng rãi"
  },
  {
    id: 2,
    name: "Deep Learning",
    origin: "Neural Networks",
    detail: "Mạng nơ-ron nhiều tầng, xử lý hình ảnh/giọng nói",
    importance: "Tiên phong"
  },
  {
    id: 3,
    name: "Natural Language Processing (NLP)",
    origin: "AI",
    detail: "Hiểu và sinh ngôn ngữ tự nhiên",
    importance: "Giao tiếp người – máy"
  },
  {
    id: 4,
    name: "AI Đạo đức",
    origin: "Triết học & Công nghệ",
    detail: "Vấn đề kiểm soát, trách nhiệm và công bằng",
    importance: "Thách thức lớn"
  }
]

// 📌 Profile (note: thay ảnh avatar các triết gia + nhà AI)
const profileLists = [
  { imgPath: "/images/marx.png" }, // 📌 thay bằng ảnh Karl Marx
  { imgPath: "/images/lenin.png" }, // 📌 thay bằng ảnh Lenin
  { imgPath: "/images/turing.png" }, // 📌 thay bằng ảnh Alan Turing
  { imgPath: "/images/modern-ai.png" }, // 📌 thay bằng ảnh AI hiện đại
];

// 📌 Feature so sánh (Mác – Lênin)
const featureLists = [
  "Khám phá AI như công cụ giải phóng sức lao động",
  "Xây dựng tri thức chung – giống như ‘tư liệu sản xuất mới’",
  "Ứng dụng 3D, dữ liệu lớn và Machine Learning",
  "Tương lai: kết hợp Chủ nghĩa Xã hội & Trí tuệ Nhân tạo",
];

// 📌 Feature so sánh (AI)
const goodLists = [
  "Tư duy biện chứng: kết hợp giữa Mác – Lê Nin và Khoa học hiện đại",
  "AI phục vụ con người, không thay thế con người",
  "Phát triển dựa trên nền tảng công bằng xã hội",
  "Công nghệ vì sự tiến bộ, không vì sự áp bức",
];

// 📌 Thông tin dự án
const storeInfo = {
  heading: "Về Dự Án",
  address: "Landing page học tập triết học Mác – Lênin trong thời đại AI",
  contact: {
    phone: "—",
    email: "anphuocdao2410@gmail.com", // 📌 thay email nhóm
  },
};

const openingHours = [
  { day: "Triết học", time: "Nền tảng tư tưởng" },
  { day: "AI", time: "Công nghệ thời đại mới" },
  { day: "Tương lai", time: "Kết hợp & phát triển" },
];

// 📌 Socials (note: thay icon/social thật)
const socials = [
  { name: "Instagram", icon: "/images/insta.png", url: "#" },
  { name: "X (Twitter)", icon: "/images/x.png", url: "#" },
  { name: "Facebook", icon: "/images/fb.png", url: "#" },
];

// 📌 All Sections (thay allCocktails → allConcepts)
const allConcepts = [
  {
    id: 1,
    name: "Mác – Lênin",
    image: "/images/marx-lenin.png", // 📌 thay ảnh poster triết học
    title: "Nền tảng lý luận",
    description:
      "Triết học Mác – Lênin cung cấp phương pháp luận khoa học để phân tích xã hội, lịch sử và con người.",
  },
  {
    id: 2,
    name: "AI Hiện Đại",
    image: "/images/ai-future.png", // 📌 thay ảnh AI neural network
    title: "Công cụ thời đại",
    description:
      "AI là công nghệ giúp con người tăng năng suất, tự động hoá, và mở ra kỷ nguyên sáng tạo mới.",
  },
  {
    id: 3,
    name: "Sự kết hợp",
    image: "/images/fusion.png", // 📌 thay ảnh kết hợp con người – AI
    title: "Học tập & phát triển",
    description:
      "Kết hợp giữa triết học và AI giúp chúng ta hiểu sâu hơn về bản chất, định hướng cho tương lai nhân loại.",
  },
  {
    id: 4,
    name: "Tương lai",
    image: "/images/future.png", // 📌 thay ảnh cyber + Marxist theme
    title: "Tư duy phê phán & công nghệ",
    description:
      "Một xã hội phát triển bền vững cần sự gắn kết giữa lý luận khoa học và công nghệ tiên tiến.",
  },
];

// =============================
// Quiz: Marx vs AI
// =============================
const quizQuestions = [
  {
    id: 1,
    quote:
      "Sự phát triển của lực lượng sản xuất vật chất là tiền đề cho sự thay đổi các quan hệ sản xuất.",
    answer: "Marx",
    source: "Phép biện chứng duy vật",
    explanation:
      "Luận điểm về vai trò quyết định của lực lượng sản xuất đối với quan hệ sản xuất là cốt lõi của chủ nghĩa duy vật lịch sử.",
  },
  {
    id: 2,
    quote:
      "Mạng nơ-ron có thể học các biểu diễn trừu tượng từ dữ liệu quy mô lớn mà không cần quy tắc viết sẵn.",
    answer: "AI",
    source: "Deep Learning",
    explanation:
      "Nhấn mạnh khả năng học tự động của mạng nơ-ron sâu, đặc trưng của AI hiện đại.",
  },
  {
    id: 3,
    quote:
      "Tồn tại xã hội quyết định ý thức xã hội, không phải ngược lại.",
    answer: "Marx",
    source: "Chủ nghĩa duy vật lịch sử",
    explanation:
      "Một mệnh đề kinh điển của Mác về mối quan hệ giữa cơ sở hạ tầng và kiến trúc thượng tầng.",
  },
  {
    id: 4,
    quote:
      "Mô hình ngôn ngữ dự đoán từ kế tiếp bằng cách tối thiểu hoá hàm mất mát trên kho văn bản khổng lồ.",
    answer: "AI",
    source: "NLP / LLM",
    explanation:
      "Mô tả cơ chế huấn luyện điển hình của các mô hình ngôn ngữ lớn hiện nay.",
  },
  {
    id: 5,
    quote:
      "Lịch sử của mọi xã hội cho đến nay là lịch sử đấu tranh giai cấp.",
    answer: "Marx",
    source: "Tuyên ngôn của Đảng Cộng sản",
    explanation:
      "Trích dẫn nổi tiếng của Mác và Ăng-ghen về quy luật vận động lịch sử.",
  },
  {
    id: 6,
    quote:
      "Trí tuệ nhân tạo nên được thiết kế có trách nhiệm, minh bạch và vì lợi ích chung.",
    answer: "AI",
    source: "AI Ethics",
    explanation:
      "Nêu nguyên tắc đạo đức trong phát triển AI hiện đại, không thuộc văn bản của Mác.",
  },
];

export {
  navLinks,
  theoryLists,
  aiLists,
  profileLists,
  featureLists,
  goodLists,
  openingHours,
  storeInfo,
  socials,
  allConcepts,
  quizQuestions,
};
