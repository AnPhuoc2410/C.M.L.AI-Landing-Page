import React from "react";
import { Link } from "react-router-dom";

const GoalsPage = () => {
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
            Mục Tiêu Triết 4.0
          </h1>

          <div className="mb-8">
            <img
              src="/images2/Triet4.0.png"
              alt="Philosophy 4.0 Goals"
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
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 text-revolutionary-gold">
              Lộ Trình Phát Triển
            </h2>
            <p className="text-xl text-cream-white/80">
              Hành trình tiến hóa của triết học trong kỷ nguyên AI
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyber-blue to-revolutionary-gold"></div>

            <div className="space-y-16">
              {/* Goal 1 */}
              <div className="flex items-center gap-8">
                <div className="w-5/12 text-right">
                  <div className="bg-steel-gray/20 p-6 rounded-xl border border-cyber-blue/30">
                    <h3 className="text-2xl font-bold mb-3 text-cyber-blue">
                      Giai Đoạn 1
                    </h3>
                    <h4 className="text-xl font-semibold mb-4">
                      Xây Dựng Nền Tảng
                    </h4>
                    <p className="text-cream-white/80">
                      Phát triển framework cơ bản kết hợp triết học cổ điển với
                      AI. Tạo ra những công cụ đầu tiên để hỗ trợ tư duy triết
                      học.
                    </p>
                  </div>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-cyber-blue border-4 border-black shadow-lg"></div>
                </div>
                <div className="w-5/12">
                  <img
                    src="/images2/Triet3.png"
                    alt="Foundation"
                    className="rounded-xl shadow-lg border border-cyber-blue/30"
                  />
                </div>
              </div>

              {/* Goal 2 */}
              <div className="flex items-center gap-8">
                <div className="w-5/12">
                  <img
                    src="/images2/Triet4.png"
                    alt="Development"
                    className="rounded-xl shadow-lg border border-revolutionary-gold/30"
                  />
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-revolutionary-gold border-4 border-black shadow-lg"></div>
                </div>
                <div className="w-5/12">
                  <div className="bg-steel-gray/20 p-6 rounded-xl border border-revolutionary-gold/30">
                    <h3 className="text-2xl font-bold mb-3 text-revolutionary-gold">
                      Giai Đoạn 2
                    </h3>
                    <h4 className="text-xl font-semibold mb-4">
                      Phát Triển Ứng Dụng
                    </h4>
                    <p className="text-cream-white/80">
                      Tạo ra các ứng dụng thực tế của Philosophy 4.0 trong giáo
                      dục, nghiên cứu và đời sống hàng ngày.
                    </p>
                  </div>
                </div>
              </div>

              {/* Goal 3 */}
              <div className="flex items-center gap-8">
                <div className="w-5/12 text-right">
                  <div className="bg-steel-gray/20 p-6 rounded-xl border border-neural-green/30">
                    <h3 className="text-2xl font-bold mb-3 text-neural-green">
                      Giai Đoạn 3
                    </h3>
                    <h4 className="text-xl font-semibold mb-4">
                      Mở Rộng Cộng Đồng
                    </h4>
                    <p className="text-cream-white/80">
                      Xây dựng cộng đồng toàn cầu các nhà triết học, nhà phát
                      triển AI và những người quan tâm đến tương lai của tư duy.
                    </p>
                  </div>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-neural-green border-4 border-black shadow-lg"></div>
                </div>
                <div className="w-5/12">
                  <img
                    src="/images2/Triet5.png"
                    alt="Community"
                    className="rounded-xl shadow-lg border border-neural-green/30"
                  />
                </div>
              </div>

              {/* Goal 4 */}
              <div className="flex items-center gap-8">
                <div className="w-5/12">
                  <img
                    src="/images2/Triet6.png"
                    alt="Future"
                    className="rounded-xl shadow-lg border border-data-purple/30"
                  />
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-data-purple border-4 border-black shadow-lg"></div>
                </div>
                <div className="w-5/12">
                  <div className="bg-steel-gray/20 p-6 rounded-xl border border-data-purple/30">
                    <h3 className="text-2xl font-bold mb-3 text-data-purple">
                      Giai Đoạn 4
                    </h3>
                    <h4 className="text-xl font-semibold mb-4">
                      Tương Lai Triết Học
                    </h4>
                    <p className="text-cream-white/80">
                      Tạo ra những breakthrough trong cách con người tư duy và
                      giải quyết vấn đề, mở ra kỷ nguyên mới của triết học số.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Objectives */}
      <section className="py-16 px-4 bg-gradient-to-r from-steel-gray/10 to-revolutionary-gold/10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-revolutionary-gold">
            Mục Tiêu Cốt Lõi
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black/50 p-6 rounded-xl border border-cyber-blue/30 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-cyber-blue/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-cyber-blue">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-cyber-blue">
                Tích Hợp AI
              </h3>
              <p className="text-cream-white/80">
                Kết hợp trí tuệ nhân tạo với tư duy triết học để tạo ra những
                công cụ hỗ trợ tư duy mạnh mẽ
              </p>
            </div>

            <div className="bg-black/50 p-6 rounded-xl border border-revolutionary-gold/30 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-revolutionary-gold/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-revolutionary-gold">
                  2
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-revolutionary-gold">
                Giáo Dục
              </h3>
              <p className="text-cream-white/80">
                Cách mạng hóa cách dạy và học triết học thông qua công nghệ
                tương tác và AI
              </p>
            </div>

            <div className="bg-black/50 p-6 rounded-xl border border-neural-green/30 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-neural-green/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-neural-green">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-neural-green">
                Nghiên Cứu
              </h3>
              <p className="text-cream-white/80">
                Thúc đẩy nghiên cứu về triết học AI và ứng dụng của nó trong thế
                giới thực
              </p>
            </div>

            <div className="bg-black/50 p-6 rounded-xl border border-data-purple/30 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-data-purple/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-data-purple">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-data-purple">
                Cộng Đồng
              </h3>
              <p className="text-cream-white/80">
                Xây dựng mạng lưới toàn cầu của những người quan tâm đến
                Philosophy 4.0
              </p>
            </div>

            <div className="bg-black/50 p-6 rounded-xl border border-soviet-amber/30 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-soviet-amber/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-soviet-amber">5</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-soviet-amber">
                Ứng Dụng
              </h3>
              <p className="text-cream-white/80">
                Tạo ra các sản phẩm và dịch vụ có giá trị thực tiễn từ
                Philosophy 4.0
              </p>
            </div>

            <div className="bg-black/50 p-6 rounded-xl border border-digital-silver/30 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-digital-silver/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-digital-silver">
                  6
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-digital-silver">
                Tương Lai
              </h3>
              <p className="text-cream-white/80">
                Định hình tương lai của triết học trong kỷ nguyên số và AI
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Cùng Nhau Xây Dựng Tương Lai Triết Học
          </h2>
          <div className="flex gap-4 justify-center">
            <Link
              to="/activities"
              className="bg-cyber-blue text-black px-8 py-3 rounded-lg font-bold hover:bg-cyber-blue/80 transition-colors"
            >
              Khám Phá Hoạt Động
            </Link>
            <Link
              to="/"
              className="border border-revolutionary-gold text-revolutionary-gold px-8 py-3 rounded-lg font-bold hover:bg-revolutionary-gold hover:text-black transition-colors"
            >
              Về Trang Chủ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GoalsPage;
