import React from "react";
import { Link } from "react-router-dom";

const ActivitiesPage = () => {
  const activities = [
    {
      title: "Trò Chơi Logic AI",
      description:
        "Giải các câu đố logic được thiết kế bởi AI để phát triển tư duy phản biện",
      image: "/images2/Triet1.png",
      difficulty: "Dễ → Khó",
      participants: "1-4 người",
    },
    {
      title: "Thảo Luận Triết Học",
      description:
        "Tham gia các cuộc thảo luận có hướng dẫn của AI về các chủ đề triết học",
      image: "/images2/Triet3.png",
      difficulty: "Trung bình",
      participants: "2-8 người",
    },
    {
      title: "Mô Phỏng Tình Huống",
      description:
        "Giải quyết các tình huống đạo đức phức tạp với sự hỗ trợ của AI",
      image: "/images2/Triet5.png",
      difficulty: "Khó",
      participants: "3-6 người",
    },
    {
      title: "Workshop Tư Duy",
      description: "Các buổi workshop thực hành kết hợp triết học và công nghệ",
      image: "/images2/Triet7.png",
      difficulty: "Linh hoạt",
      participants: "5-20 người",
    },
  ];

  const minigames = [
    {
      name: "Paradox Solver",
      description:
        "Giải quyết các nghịch lý triết học nổi tiếng với sự hỗ trợ của AI",
      image: "/images2/TrietAI1.png",
      type: "Puzzle",
    },
    {
      name: "Ethics Simulator",
      description:
        "Mô phỏng các tình huống đạo đức và đưa ra quyết định có căn cứ",
      image: "/images2/TrietAI3.png",
      type: "Simulation",
    },
    {
      name: "Socratic Dialogue",
      description:
        "Đối thoại với AI theo phương pháp Socrates để khám phá chân lý",
      image: "/images2/TrietAI4.png",
      type: "Conversation",
    },
    {
      name: "Logic Builder",
      description:
        "Xây dựng các luận chứng logic hoàn chỉnh từ tiền đề đến kết luận",
      image: "/images2/TrietAI5.png",
      type: "Strategy",
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
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 cyber-gradient">
            Minigame & Hoạt Động
          </h1>

          <div className="mb-8">
            <img
              src="/images2/Triet4.png"
              alt="Activities and Games"
              className="mx-auto max-w-lg rounded-2xl shadow-2xl border border-revolutionary-gold/30"
            />
          </div>

          <div className="max-w-md mx-auto mb-8">
            <div className="text-center p-4 bg-black/30 rounded-lg border border-revolutionary-gold/30">
              <p className="text-revolutionary-gold text-sm">
                🎵 Audio tour available on main page
              </p>
            </div>
          </div>

          <p className="text-xl mb-8 text-cream-white/80 max-w-3xl mx-auto">
            Khám phá thế giới học tập tương tác nơi triết học gặp gỡ công nghệ.
            Từ những trò chơi logic đơn giản đến các workshop phức tạp, mỗi hoạt
            động được thiết kế để phát triển tư duy phản biện và khả năng giải
            quyết vấn đề.
          </p>
        </div>
      </section>

      {/* Minigames Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-bold text-center mb-4 text-cyber-blue">
            Minigames Tương Tác
          </h2>
          <p className="text-center text-xl mb-12 text-cream-white/80">
            Học triết học thông qua trò chơi và thử thách thú vị
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {minigames.map((game, index) => (
              <div
                key={index}
                className="bg-steel-gray/20 rounded-xl overflow-hidden border border-cyber-blue/30 hover:border-cyber-blue transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-cyber-blue">
                      {game.name}
                    </h3>
                    <span className="text-xs bg-revolutionary-gold/20 text-revolutionary-gold px-2 py-1 rounded">
                      {game.type}
                    </span>
                  </div>
                  <p className="text-cream-white/80 text-sm">
                    {game.description}
                  </p>
                  <button className="w-full mt-4 bg-cyber-blue/20 border border-cyber-blue text-cyber-blue py-2 rounded-lg hover:bg-cyber-blue hover:text-black transition-colors">
                    Chơi Ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-revolutionary-gold/5 to-cyber-blue/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-bold text-center mb-4 text-revolutionary-gold">
            Hoạt Động Nhóm
          </h2>
          <p className="text-center text-xl mb-12 text-cream-white/80">
            Trải nghiệm học tập tập thể với sự hướng dẫn của AI
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="bg-black/50 rounded-xl overflow-hidden border border-revolutionary-gold/30 hover:border-revolutionary-gold transition-all duration-300"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h3 className="text-2xl font-bold mb-3 text-revolutionary-gold">
                      {activity.title}
                    </h3>
                    <p className="text-cream-white/80 mb-4">
                      {activity.description}
                    </p>

                    <div className="flex gap-4 mb-4 text-sm">
                      <div className="bg-steel-gray/30 px-3 py-1 rounded">
                        <span className="text-cyber-blue font-semibold">
                          Độ khó:{" "}
                        </span>
                        <span>{activity.difficulty}</span>
                      </div>
                      <div className="bg-steel-gray/30 px-3 py-1 rounded">
                        <span className="text-neural-green font-semibold">
                          Người chơi:{" "}
                        </span>
                        <span>{activity.participants}</span>
                      </div>
                    </div>

                    <button className="bg-revolutionary-gold text-black px-6 py-2 rounded-lg font-bold hover:bg-revolutionary-gold/80 transition-colors">
                      Tham Gia
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-neural-green">
            Tính Năng Đặc Biệt
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-cyber-blue/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-cyber-blue"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-cyber-blue">
                AI Hướng Dẫn
              </h3>
              <p className="text-cream-white/80">
                Hệ thống AI thông minh điều chỉnh độ khó và đưa ra gợi ý phù hợp
                với từng người chơi
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-revolutionary-gold/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-revolutionary-gold"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-revolutionary-gold">
                Tiến Độ Theo Dõi
              </h3>
              <p className="text-cream-white/80">
                Theo dõi quá trình học tập và nhận chứng chỉ khi hoàn thành các
                mốc quan trọng
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-neural-green/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-neural-green"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-neural-green">
                Cộng Đồng
              </h3>
              <p className="text-cream-white/80">
                Kết nối với cộng đồng học viên toàn cầu và chia sẻ kinh nghiệm
                học tập
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyber-blue/10 to-neural-green/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Sẵn Sàng Bắt Đầu Hành Trình?
          </h2>
          <p className="text-xl mb-8 text-cream-white/80 max-w-2xl mx-auto">
            Tham gia ngay để trải nghiệm cách học triết học hoàn toàn mới với sự
            hỗ trợ của AI
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/experience"
              className="bg-neural-green text-black px-8 py-3 rounded-lg font-bold hover:bg-neural-green/80 transition-colors"
            >
              Khám Phá Trải Nghiệm
            </Link>
            <Link
              to="/"
              className="border border-cyber-blue text-cyber-blue px-8 py-3 rounded-lg font-bold hover:bg-cyber-blue hover:text-black transition-colors"
            >
              Về Trang Chủ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActivitiesPage;
