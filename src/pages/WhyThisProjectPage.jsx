import React from "react";
import { Link } from "react-router-dom";

const WhyThisProjectPage = () => {
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
              to="/goals"
              className="text-cyber-blue hover:text-revolutionary-gold transition-colors"
            >
              Mục Tiêu
            </Link>
            <Link
              to="/activities"
              className="text-cyber-blue hover:text-revolutionary-gold transition-colors"
            >
              Hoạt Động
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
            Vì Sao Có Dự Án Này?
          </h1>

          <div className="mb-8">
            <img
              src="/images2/Triet2.png"
              alt="Philosophy 4.0 Vision"
              className="mx-auto max-w-lg rounded-2xl shadow-2xl border border-revolutionary-gold/30"
            />
          </div>

          <div className="max-w-md mx-auto mb-8">
            {/* Audio available on main page tour */}
            <div className="text-center p-4 bg-black/30 rounded-lg border border-revolutionary-gold/30">
              <p className="text-revolutionary-gold text-sm">
                🎵 Audio tour available on main page
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-revolutionary-gold">
                Thách Thức Của Thời Đại
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                Trong kỷ nguyên công nghệ 4.0, chúng ta đang chứng kiến sự phát
                triển vượt bậc của trí tuệ nhân tạo. Tuy nhiên, triết học - nền
                tảng của tư duy con người - vẫn chưa theo kịp tốc độ phát triển
                này.
              </p>
              <p className="text-lg leading-relaxed">
                Philosophy 4.0 ra đời để giải quyết khoảng cách này, tạo ra một
                cầu nối giữa tư duy truyền thống và công nghệ hiện đại.
              </p>
            </div>
            <div>
              <img
                src="/images2/TrietAI.png"
                alt="AI Philosophy Integration"
                className="rounded-xl shadow-lg border border-cyber-blue/30"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <img
                src="/images2/TrietAI1.png"
                alt="Future Thinking"
                className="rounded-xl shadow-lg border border-neural-green/30"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold mb-6 text-cyber-blue">
                Tầm Nhìn Tương Lai
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                Chúng tôi tin rằng tương lai thuộc về những ai có thể kết hợp
                được tư duy triết học sâu sắc với khả năng ứng dụng công nghệ AI
                một cách thông minh.
              </p>
              <p className="text-lg leading-relaxed">
                Philosophy 4.0 không chỉ là một dự án công nghệ, mà là một phong
                trào tư duy mới, nơi mà trí tuệ nhân tạo và trí tuệ con người
                cùng phát triển và bổ trợ lẫn nhau.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8 text-neural-green">
              Điểm Khác Biệt
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-steel-gray/20 p-6 rounded-xl border border-revolutionary-gold/30">
                <img
                  src="/images2/TrietAI3.png"
                  alt="Innovation"
                  className="w-20 h-20 mx-auto mb-4 rounded-full"
                />
                <h3 className="text-xl font-bold mb-3 text-revolutionary-gold">
                  Đổi Mới
                </h3>
                <p>Kết hợp triết học cổ điển với công nghệ AI tiên tiến nhất</p>
              </div>
              <div className="bg-steel-gray/20 p-6 rounded-xl border border-cyber-blue/30">
                <img
                  src="/images2/TrietAI4.png"
                  alt="Practical"
                  className="w-20 h-20 mx-auto mb-4 rounded-full"
                />
                <h3 className="text-xl font-bold mb-3 text-cyber-blue">
                  Ứng Dụng
                </h3>
                <p>Không chỉ lý thuyết mà còn có giá trị thực tiễn cao</p>
              </div>
              <div className="bg-steel-gray/20 p-6 rounded-xl border border-neural-green/30">
                <img
                  src="/images2/TrietAI5.png"
                  alt="Community"
                  className="w-20 h-20 mx-auto mb-4 rounded-full"
                />
                <h3 className="text-xl font-bold mb-3 text-neural-green">
                  Cộng Đồng
                </h3>
                <p>Xây dựng cộng đồng học tập và nghiên cứu toàn cầu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-revolutionary-gold/10 to-cyber-blue/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Sẵn Sàng Tham Gia Cuộc Cách Mạng Tư Duy?
          </h2>
          <div className="flex gap-4 justify-center">
            <Link
              to="/goals"
              className="bg-revolutionary-gold text-black px-8 py-3 rounded-lg font-bold hover:bg-revolutionary-gold/80 transition-colors"
            >
              Tìm Hiểu Mục Tiêu
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

export default WhyThisProjectPage;
