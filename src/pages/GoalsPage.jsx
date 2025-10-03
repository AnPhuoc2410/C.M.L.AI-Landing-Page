import React from "react";
import { Link } from "react-router-dom";

const GoalsPage = () => {
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
              to="/why-project"
              className="text-cyber-blue hover:text-revolutionary-gold transition-colors font-semibold"
            >
              Vì Sao
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
        <img
          src="/images2/Triet4.0.png"
          alt="Philosophy 4.0 Goals"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-cream-white/60 via-transparent to-cream-white/60"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10 px-4 pt-24 pb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-communist-red uppercase tracking-tight">
            Mục Tiêu Triết 4.0
          </h1>

          <div className="max-w-md mx-auto mb-8">
            <div className="text-center p-4 bg-revolutionary-gold/20 rounded-lg border-4 border-communist-red">
              <p className="text-communist-red text-base font-bold">
                🎵 Audio tour available on main page
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative min-h-screen py-20 px-4 bg-communist-red">
        <img
          src="/images2/TrietAI2.png"
          alt="Timeline Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 text-cream-white uppercase">
              Lộ Trình Phát Triển
            </h2>
            <p className="text-xl text-cream-white/90">
              Hành trình tiến hóa của triết học trong kỷ nguyên AI
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-12">
            {/* Goal 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-cream-white p-6 rounded-xl border-4 border-revolutionary-gold">
                <h3 className="text-2xl font-bold mb-3 text-communist-red uppercase">
                  Giai Đoạn 1
                </h3>
                <h4 className="text-xl font-semibold mb-4 text-cyber-blue">
                  Xây Dựng Nền Tảng
                </h4>
                <p className="text-steel-gray leading-relaxed">
                  Phát triển framework cơ bản kết hợp triết học cổ điển với
                  AI. Tạo ra những công cụ đầu tiên để hỗ trợ tư duy triết
                  học.
                </p>
              </div>
              <div>
                <img
                  src="/images2/Triet3.png"
                  alt="Foundation"
                  className="rounded-xl border-4 border-cream-white hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Goal 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <img
                  src="/images2/Triet4.png"
                  alt="Development"
                  className="rounded-xl border-4 border-cream-white hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="order-1 md:order-2 bg-revolutionary-gold p-6 rounded-xl border-4 border-cream-white">
                <h3 className="text-2xl font-bold mb-3 text-communist-red uppercase">
                  Giai Đoạn 2
                </h3>
                <h4 className="text-xl font-semibold mb-4 text-cyber-blue">
                  Phát Triển Ứng Dụng
                </h4>
                <p className="text-steel-gray leading-relaxed">
                  Tạo ra các ứng dụng thực tế của Philosophy 4.0 trong giáo
                  dục, nghiên cứu và đời sống hàng ngày.
                </p>
              </div>
            </div>

            {/* Goal 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-cyber-blue p-6 rounded-xl border-4 border-cream-white">
                <h3 className="text-2xl font-bold mb-3 text-communist-red uppercase">
                  Giai Đoạn 3
                </h3>
                <h4 className="text-xl font-semibold mb-4 text-black">
                  Mở Rộng Cộng Đồng
                </h4>
                <p className="text-steel-gray leading-relaxed">
                  Xây dựng cộng đồng toàn cầu các nhà triết học, nhà phát
                  triển AI và những người quan tâm đến tương lai của tư duy.
                </p>
              </div>
              <div>
                <img
                  src="/images2/Triet5.png"
                  alt="Community"
                  className="rounded-xl border-4 border-cream-white hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Goal 4 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <img
                  src="/images2/Triet6.png"
                  alt="Future"
                  className="rounded-xl border-4 border-cream-white hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="order-1 md:order-2 bg-neural-green p-6 rounded-xl border-4 border-cream-white">
                <h3 className="text-2xl font-bold mb-3 text-communist-red uppercase">
                  Giai Đoạn 4
                </h3>
                <h4 className="text-xl font-semibold mb-4 text-black">
                  Tương Lai Triết Học
                </h4>
                <p className="text-steel-gray leading-relaxed">
                  Tạo ra những breakthrough trong cách con người tư duy và
                  giải quyết vấn đề, mở ra kỷ nguyên mới của triết học số.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Objectives */}
      <section className="relative py-20 px-4 bg-cream-white">
        <img
          src="/images2/Triet7.png"
          alt="Objectives Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-communist-red uppercase">
            Mục Tiêu Cốt Lõi
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-cyber-blue p-6 rounded-xl border-4 border-communist-red text-center hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-4 bg-communist-red group-hover:bg-cream-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-cream-white group-hover:text-communist-red">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                Tích Hợp AI
              </h3>
              <p className="text-steel-gray group-hover:text-cream-white">
                Kết hợp trí tuệ nhân tạo với tư duy triết học để tạo ra những
                công cụ hỗ trợ tư duy mạnh mẽ
              </p>
            </div>

            <div className="bg-revolutionary-gold p-6 rounded-xl border-4 border-communist-red text-center hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-4 bg-communist-red group-hover:bg-cream-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-cream-white group-hover:text-communist-red">
                  2
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                Giáo Dục
              </h3>
              <p className="text-steel-gray group-hover:text-cream-white">
                Cách mạng hóa cách dạy và học triết học thông qua công nghệ
                tương tác và AI
              </p>
            </div>

            <div className="bg-neural-green p-6 rounded-xl border-4 border-communist-red text-center hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-4 bg-communist-red group-hover:bg-cream-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-cream-white group-hover:text-communist-red">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                Nghiên Cứu
              </h3>
              <p className="text-steel-gray group-hover:text-cream-white">
                Thúc đẩy nghiên cứu về triết học AI và ứng dụng của nó trong thế
                giới thực
              </p>
            </div>

            <div className="bg-cyber-blue p-6 rounded-xl border-4 border-communist-red text-center hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-4 bg-communist-red group-hover:bg-cream-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-cream-white group-hover:text-communist-red">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                Cộng Đồng
              </h3>
              <p className="text-steel-gray group-hover:text-cream-white">
                Xây dựng mạng lưới toàn cầu của những người quan tâm đến
                Philosophy 4.0
              </p>
            </div>

            <div className="bg-revolutionary-gold p-6 rounded-xl border-4 border-communist-red text-center hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-4 bg-communist-red group-hover:bg-cream-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-cream-white group-hover:text-communist-red">5</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                Ứng Dụng
              </h3>
              <p className="text-steel-gray group-hover:text-cream-white">
                Tạo ra các sản phẩm và dịch vụ có giá trị thực tiễn từ
                Philosophy 4.0
              </p>
            </div>

            <div className="bg-neural-green p-6 rounded-xl border-4 border-communist-red text-center hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-4 bg-communist-red group-hover:bg-cream-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-cream-white group-hover:text-communist-red">
                  6
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                Tương Lai
              </h3>
              <p className="text-steel-gray group-hover:text-cream-white">
                Định hình tương lai của triết học trong kỷ nguyên số và AI
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 px-4 bg-communist-red">
        <img
          src="/images2/TrietAI.png"
          alt="CTA Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-cream-white uppercase">
            Cùng Nhau Xây Dựng Tương Lai Triết Học
          </h2>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              to="/activities"
              className="bg-revolutionary-gold text-communist-red border-4 border-cream-white px-10 py-4 rounded-xl font-bold text-lg uppercase hover:bg-cream-white hover:scale-105 transition-all duration-300"
            >
              Khám Phá Hoạt Động
            </Link>
            <Link
              to="/"
              className="bg-cream-white text-communist-red border-4 border-revolutionary-gold px-10 py-4 rounded-xl font-bold text-lg uppercase hover:bg-revolutionary-gold hover:scale-105 transition-all duration-300"
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
