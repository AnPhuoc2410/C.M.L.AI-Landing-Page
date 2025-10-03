import React from "react";
import { Link } from "react-router-dom";

const WhyThisProjectPage = () => {
  return (
    <div className="min-h-screen bg-main-bg text-cream-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-revolutionary-gold/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-revolutionary-gold font-bold text-xl hover:text-cyber-blue transition-colors">
            ← Về Trang Chủ
          </Link>

          <div className="flex gap-4">
            <Link
              to="/goals"
              className="text-cyber-blue hover:text-revolutionary-gold transition-colors font-semibold"
            >
              Mục Tiêu
            </Link>
            <Link
              to="/activities"
              className="text-cyber-blue hover:text-revolutionary-gold transition-colors font-semibold"
            >
              Hoạt Động
            </Link>
            <Link
              to="/experience"
              className="text-cyber-blue hover:text-revolutionary-gold transition-colors font-semibold"
            >
              Trải Nghiệm
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream-white">
        {/* Background Image */}
        <img
          src="/images2/Triet2.png"
          alt="Philosophy 4.0 Vision"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-white/60 via-transparent to-cream-white/60"></div>
        
        {/* Content */}
        <div className="container mx-auto max-w-4xl text-center relative z-10 px-4 pt-24 pb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-communist-red uppercase tracking-tight">
            Vì Sao Có Dự Án Này?
          </h1>

          <div className="max-w-md mx-auto mb-8">
            {/* Audio available on main page tour */}
            <div className="text-center p-4 bg-revolutionary-gold/20 rounded-lg border-4 border-communist-red">
              <p className="text-communist-red text-base font-bold">
                🎵 Audio tour available on main page
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="relative min-h-screen py-20 px-4 overflow-hidden bg-communist-red">
        {/* Background Image */}
        <img
          src="/images2/TrietAI.png"
          alt="AI Philosophy Integration"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="bg-cream-white p-8 rounded-xl border-4 border-revolutionary-gold">
              <h2 className="text-4xl font-bold mb-6 text-communist-red uppercase">
                Thách Thức Của Thời Đại
              </h2>
              <p className="text-lg leading-relaxed mb-4 text-steel-gray">
                Trong kỷ nguyên công nghệ 4.0, chúng ta đang chứng kiến sự phát
                triển vượt bậc của trí tuệ nhân tạo. Tuy nhiên, triết học - nền
                tảng của tư duy con người - vẫn chưa theo kịp tốc độ phát triển
                này.
              </p>
              <p className="text-lg leading-relaxed text-steel-gray">
                Philosophy 4.0 ra đời để giải quyết khoảng cách này, tạo ra một
                cầu nối giữa tư duy truyền thống và công nghệ hiện đại.
              </p>
            </div>
            <div className="hidden md:block">
              <img
                src="/images2/TrietAI.png"
                alt="AI Philosophy Integration"
                className="rounded-xl border-4 border-cream-white hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="relative grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1 hidden md:block">
              <img
                src="/images2/TrietAI1.png"
                alt="Future Thinking"
                className="rounded-xl border-4 border-cream-white hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Background Image for mobile */}
            <div className="absolute inset-0 md:hidden">
              <img
                src="/images2/TrietAI1.png"
                alt="Future Thinking"
                className="w-full h-full object-cover opacity-10 rounded-xl"
              />
            </div>
            
            <div className="order-1 md:order-2 bg-revolutionary-gold p-8 rounded-xl border-4 border-cream-white relative z-10">
              <h2 className="text-4xl font-bold mb-6 text-communist-red uppercase">
                Tầm Nhìn Tương Lai
              </h2>
              <p className="text-lg leading-relaxed mb-4 text-steel-gray">
                Chúng tôi tin rằng tương lai thuộc về những ai có thể kết hợp
                được tư duy triết học sâu sắc với khả năng ứng dụng công nghệ AI
                một cách thông minh.
              </p>
              <p className="text-lg leading-relaxed text-steel-gray">
                Philosophy 4.0 không chỉ là một dự án công nghệ, mà là một phong
                trào tư duy mới, nơi mà trí tuệ nhân tạo và trí tuệ con người
                cùng phát triển và bổ trợ lẫn nhau.
              </p>
            </div>
          </div>

          <div className="text-center bg-cream-white p-12 rounded-2xl border-4 border-communist-red">
            <h2 className="text-5xl font-bold mb-12 text-communist-red uppercase">
              Điểm Khác Biệt
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 - Đổi Mới */}
              <div className="relative overflow-hidden bg-revolutionary-gold p-8 rounded-xl border-4 border-communist-red hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
                <div className="relative z-10">
                  <img
                    src="/images2/TrietAI3.png"
                    alt="Innovation"
                    className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-communist-red object-cover"
                  />
                  <h3 className="text-2xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                    Đổi Mới
                  </h3>
                  <p className="text-steel-gray group-hover:text-cream-white leading-relaxed">Kết hợp triết học cổ điển với công nghệ AI tiên tiến nhất</p>
                </div>
              </div>
              
              {/* Card 2 - Ứng Dụng */}
              <div className="relative overflow-hidden bg-cyber-blue p-8 rounded-xl border-4 border-communist-red hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
                <div className="relative z-10">
                  <img
                    src="/images2/TrietAI4.png"
                    alt="Practical"
                    className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-communist-red object-cover"
                  />
                  <h3 className="text-2xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                    Ứng Dụng
                  </h3>
                  <p className="text-steel-gray group-hover:text-cream-white leading-relaxed">Không chỉ lý thuyết mà còn có giá trị thực tiễn cao</p>
                </div>
              </div>
              
              {/* Card 3 - Cộng Đồng */}
              <div className="relative overflow-hidden bg-neural-green p-8 rounded-xl border-4 border-communist-red hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
                <div className="relative z-10">
                  <img
                    src="/images2/TrietAI5.png"
                    alt="Community"
                    className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-communist-red object-cover"
                  />
                  <h3 className="text-2xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                    Cộng Đồng
                  </h3>
                  <p className="text-steel-gray group-hover:text-cream-white leading-relaxed">Xây dựng cộng đồng học tập và nghiên cứu toàn cầu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 px-4 overflow-hidden bg-cream-white">
        {/* Background Image */}
        <img
          src="/images2/Triet4.0.png"
          alt="Philosophy 4.0 CTA"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        {/* Content */}
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-communist-red uppercase">
            Sẵn Sàng Tham Gia Cuộc Cách Mạng Tư Duy?
          </h2>
          <p className="text-xl md:text-2xl text-steel-gray mb-12 max-w-2xl mx-auto font-paragraph">
            Hãy cùng chúng tôi khám phá tương lai của triết học trong kỷ nguyên AI
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              to="/goals"
              className="bg-revolutionary-gold text-communist-red border-4 border-communist-red px-10 py-4 rounded-xl font-bold text-lg uppercase hover:bg-communist-red hover:text-cream-white hover:scale-105 transition-all duration-300"
            >
              Tìm Hiểu Mục Tiêu
            </Link>
            <Link
              to="/activities"
              className="bg-cyber-blue text-communist-red border-4 border-communist-red px-10 py-4 rounded-xl font-bold text-lg uppercase hover:bg-communist-red hover:text-cream-white hover:scale-105 transition-all duration-300"
            >
              Khám Phá Hoạt Động
            </Link>
            <Link
              to="/"
              className="bg-cream-white text-communist-red border-4 border-communist-red px-10 py-4 rounded-xl font-bold text-lg uppercase hover:bg-communist-red hover:text-cream-white hover:scale-105 transition-all duration-300"
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
