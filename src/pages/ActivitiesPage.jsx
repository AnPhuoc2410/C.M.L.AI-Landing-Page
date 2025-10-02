import React, { useState } from "react";
import { Link } from "react-router-dom";
import GameModal from "../game/GameModal";
import Game1_Contradiction from "../game/Game1_Contradiction";
import Game2_SurplusValue from "../game/Game2_SurplusValue";
import Game3_ClassStruggle from "../game/Game3_ClassStruggle";
import Game4_CreativityTest from "../game/Game4_CreativityTest";

const ActivitiesPage = () => {
  const [activeGame, setActiveGame] = useState(null);
  const minigames = [
    {
      id: 1,
      name: "Mâu thuẫn 4.0",
      subtitle: "Xung đột Lực lượng Sản xuất AI và Quan hệ Sản xuất",
      description:
        "Nhập vai nhà cố vấn thời gian du hành qua các giai đoạn lịch sử. Điều chỉnh quan hệ sản xuất cho phù hợp với sự xuất hiện của AI để tránh cách mạng xã hội.",
      image: "/images2/TrietAI1.png",
      type: "Chiến lược",
      features: ["Lựa chọn tương tác", "Nhiều kết cục", "Mentor Mác hướng dẫn"],
      difficulty: "Trung bình",
      component: Game1_Contradiction,
    },
    {
      id: 2,
      name: "Thợ săn Giá trị Thặng dư",
      subtitle: "Bóc lột Lao động trong Kỷ nguyên AI",
      description:
        "Vào vai nhà tư bản điều hành nhà máy. Cân bằng giữa việc bóc lột công nhân và đầu tư Robot AI để tối đa hóa giá trị thặng dư mà không gây đình công.",
      image: "/images2/TrietAI3.png",
      type: "Mô phỏng",
      features: ["Quản lý tài nguyên", "Cân bằng chiến lược", "Hệ thống điểm"],
      difficulty: "Khó",
      component: Game2_SurplusValue,
    },
    {
      id: 3,
      name: "AI và Đấu tranh Giai cấp 4.0",
      subtitle: "Lợi ích Tư bản Công nghệ vs. Lao động Số",
      description:
        "Trải nghiệm cả hai góc nhìn giai cấp: Tư bản công nghệ và Lao động số. Hiểu rõ sự khác biệt về lợi ích kinh tế trong thời đại AI.",
      image: "/images2/TrietAI4.png",
      type: "Nhập vai",
      features: ["Hai chế độ chơi", "Sự kiện ngẫu nhiên", "So sánh kết quả"],
      difficulty: "Khó",
      component: Game3_ClassStruggle,
    },
    {
      id: 4,
      name: "Thử tài Sáng tạo: Người hay Máy?",
      subtitle: "Ranh giới giữa Sáng tạo Nhân văn và Trí tuệ Nhân tạo",
      description:
        "Phân biệt tác phẩm do con người và AI tạo ra. Khám phá ranh giới giữa sự sáng tạo của con người và sản phẩm AI qua tranh, thơ, nhạc và code.",
      image: "/images2/TrietAI5.png",
      type: "Trắc nghiệm",
      features: ["Đa dạng lĩnh vực", "Gemini AI", "Trợ lý Turing"],
      difficulty: "Dễ",
      component: Game4_CreativityTest,
    },
  ];

  return (
    <div className="min-h-screen bg-main-bg text-cream-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-revolutionary-gold/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-revolutionary-gold font-bold text-xl">
            ← Về Trang Chủ
          </Link>

          <div className="flex gap-4">
            <Link
              to="/why-project"
              className="text-cyber-blue hover:text-revolutionary-gold transition-colors"
            >
              Vì Sao
            </Link>
            <Link
              to="/goals"
              className="text-cyber-blue hover:text-revolutionary-gold transition-colors"
            >
              Mục Tiêu
            </Link>
            <Link
              to="/experience"
              className="text-cyber-blue hover:text-revolutionary-gold transition-colors"
            >
              Trải Nghiệm
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-10 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 cyber-gradient">
            Minigame & Hoạt Động
          </h1>

          <div className="mb-6">
            <img
              src="/images2/Triet4.png"
              alt="Activities and Games"
              className="mx-auto max-w-md rounded-xl shadow-2xl border border-revolutionary-gold/30"
            />
          </div>

          <div className="max-w-md mx-auto mb-6">
            <div className="text-center p-3 bg-black/30 rounded-lg border border-revolutionary-gold/30">
              <p className="text-revolutionary-gold text-xs">
                🎵 Audio tour available on main page
              </p>
            </div>
          </div>

          <p className="text-lg mb-6 text-cream-white/80 max-w-3xl mx-auto leading-relaxed">
            Trải nghiệm bốn mini-game tương tác được thiết kế dựa trên các chủ đề 
            lý thuyết chính của Triết học Mác-Lênin trong kỷ nguyên AI. Mỗi trò 
            chơi kết hợp nhập vai, mô phỏng và câu đố để giúp bạn hiểu sâu hơn về 
            các khái niệm triết học thông qua thực hành.
          </p>
        </div>
      </section>

      {/* Four Main Minigames Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-3 text-cyber-blue">
            Bốn Mini-Game Tương Tác
          </h2>
          <p className="text-center text-lg mb-10 text-cream-white/80">
            Học Triết học Mác-Lênin qua trải nghiệm tương tác và mô phỏng
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {minigames.map((game, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-steel-gray/30 to-steel-gray/10 rounded-xl overflow-hidden border border-cyber-blue/20 hover:border-cyber-blue/60 transition-all duration-300 hover:shadow-2xl hover:shadow-cyber-blue/30 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold backdrop-blur-sm ${
                      game.difficulty === "Dễ" 
                        ? "bg-neural-green/90 text-black" 
                        : game.difficulty === "Trung bình"
                        ? "bg-cyber-blue/90 text-black"
                        : "bg-revolutionary-gold/90 text-black"
                    }`}>
                      {game.difficulty}
                    </span>
                  </div>
                  
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/80 backdrop-blur-sm text-revolutionary-gold font-bold text-xs px-2.5 py-1 rounded-md border border-revolutionary-gold/40">
                      {game.type}
                    </span>
                  </div>

                  {/* Title overlay on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white mb-0.5 drop-shadow-lg">
                      {game.name}
                    </h3>
                    <p className="text-revolutionary-gold text-xs font-semibold drop-shadow-md line-clamp-1">
                      {game.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-cream-white/80 mb-3 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
                    {game.description}
                  </p>

                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1.5">
                      {game.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-neural-green/15 text-neural-green px-2 py-0.5 rounded text-xs border border-neural-green/25 hover:bg-neural-green/25 transition-colors"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveGame(game)}
                    className="w-full bg-cyber-blue/10 border border-cyber-blue/50 text-cyber-blue py-2.5 rounded-lg font-bold text-sm hover:bg-cyber-blue hover:text-black hover:border-cyber-blue transition-all duration-300 hover:shadow-lg hover:shadow-cyber-blue/50"
                  >
                    Chơi Ngay →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Context Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-revolutionary-gold/5 to-neural-green/5">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-revolutionary-gold">
            Về Các Mini-Game
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/30 rounded-xl p-6 border border-cyber-blue/30 hover:border-cyber-blue/50 transition-colors">
              <h3 className="text-xl font-bold text-cyber-blue mb-3 flex items-center gap-2">
                <span className="text-2xl">🎮</span>
                Phương Pháp Học Tập
              </h3>
              <ul className="space-y-2 text-cream-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-neural-green mt-0.5">✓</span>
                  <span>Nhập vai và trải nghiệm tình huống lịch sử</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neural-green mt-0.5">✓</span>
                  <span>Mô phỏng mâu thuẫn kinh tế-xã hội AI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neural-green mt-0.5">✓</span>
                  <span>Quyết định và thấy hệ quả trực tiếp</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neural-green mt-0.5">✓</span>
                  <span>Phản hồi tức thì với giải thích lý thuyết</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/30 rounded-xl p-6 border border-revolutionary-gold/30 hover:border-revolutionary-gold/50 transition-colors">
              <h3 className="text-xl font-bold text-revolutionary-gold mb-3 flex items-center gap-2">
                <span className="text-2xl">📚</span>
                Kiến Thức Thu Được
              </h3>
              <ul className="space-y-2 text-cream-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-cyber-blue mt-0.5">•</span>
                  <span>Lực lượng sản xuất - Quan hệ sản xuất</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyber-blue mt-0.5">•</span>
                  <span>Giá trị thặng dư & bóc lột lao động</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyber-blue mt-0.5">•</span>
                  <span>Đấu tranh giai cấp thời đại số</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyber-blue mt-0.5">•</span>
                  <span>Sáng tạo nhân văn vs. Trí tuệ nhân tạo</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-cyber-blue/10 to-revolutionary-gold/10 rounded-xl p-5 border border-neural-green/30">
            <p className="text-center text-sm text-cream-white/90 leading-relaxed">
              <span className="text-neural-green font-bold">💡</span> Mỗi mini-game 
              được thiết kế dựa trên nội dung học thuật Triết học Mác-Lênin, 
              kết hợp bối cảnh AI hiện đại. Vừa giải trí vừa hiểu sâu khái niệm 
              triết học qua trải nghiệm tương tác.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-4 cyber-gradient">
            Sẵn Sàng Khám Phá?
          </h2>
          <p className="text-base mb-6 text-cream-white/80 max-w-2xl mx-auto">
            Trải nghiệm cách học Triết học Mác-Lênin hoàn toàn mới thông qua 
            các mini-game tương tác với công nghệ AI
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/goals"
              className="bg-cyber-blue text-black px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-cyber-blue/80 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-blue/50"
            >
              Xem Mục Tiêu
            </Link>
            <Link
              to="/experience"
              className="bg-neural-green text-black px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-neural-green/80 transition-all duration-300 hover:shadow-lg hover:shadow-neural-green/50"
            >
              Trải Nghiệm
            </Link>
            <Link
              to="/"
              className="border-2 border-revolutionary-gold text-revolutionary-gold px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-revolutionary-gold hover:text-black transition-all duration-300"
            >
              Về Trang Chủ
            </Link>
          </div>
        </div>
      </section>
      
      {/* Game Modals */}
      {activeGame && (
        <GameModal
          isOpen={!!activeGame}
          onClose={() => setActiveGame(null)}
          title={activeGame.name}
        >
          {activeGame.component && <activeGame.component />}
        </GameModal>
      )}
    </div>
  );
};

export default ActivitiesPage;
