import React from "react";
import { Link } from "react-router-dom";

const ExperiencePage = () => {
  const experiences = [
    {
      name: "Minh Hoàng",
      role: "Sinh viên Triết học",
      avatar: "/images2/Triet1.png",
      quote:
        "Philosophy 4.0 đã thay đổi hoàn toàn cách tôi tiếp cận triết học. AI không thay thế tư duy mà giúp tôi tư duy sâu hơn.",
      rating: 5,
      experience: "6 tháng",
    },
    {
      name: "Dr. Lan Anh",
      role: "Giảng viên Đại học",
      avatar: "/images2/Triet3.png",
      quote:
        "Công cụ tuyệt vời cho việc giảng dạy. Sinh viên tôi tham gia tích cực hơn và hiểu sâu hơn về các khái niệm triết học.",
      rating: 5,
      experience: "1 năm",
    },
    {
      name: "Tuấn Anh",
      role: "Kỹ sư AI",
      avatar: "/images2/Triet5.png",
      quote:
        "Kết hợp hoàn hảo giữa công nghệ và nhân văn. Philosophy 4.0 mở ra những góc nhìn mới về AI ethics.",
      rating: 5,
      experience: "8 tháng",
    },
    {
      name: "Thảo Vy",
      role: "Nhà nghiên cứu",
      avatar: "/images2/Triet7.png",
      quote:
        "Nghiên cứu của tôi về AI consciousness đã có nhiều breakthrough nhờ framework Philosophy 4.0.",
      rating: 5,
      experience: "2 năm",
    },
  ];

  const expectations = [
    {
      title: "Tư Duy Phản Biện",
      description:
        "Phát triển khả năng phân tích và đánh giá thông tin một cách có hệ thống",
      icon: "🧠",
      progress: 95,
    },
    {
      title: "Giải Quyết Vấn Đề",
      description:
        "Áp dụng các nguyên lý triết học để giải quyết vấn đề thực tế",
      icon: "🔧",
      progress: 88,
    },
    {
      title: "Hiểu Biết AI Ethics",
      description:
        "Nắm vững các vấn đề đạo đức trong phát triển và ứng dụng AI",
      icon: "⚖️",
      progress: 92,
    },
    {
      title: "Kỹ Năng Giao Tiếp",
      description:
        "Trình bày và thảo luận các ý tưởng phức tạp một cách rõ ràng",
      icon: "💬",
      progress: 85,
    },
  ];

  const learningPath = [
    {
      phase: "Khám Phá",
      duration: "Tuần 1-2",
      description: "Làm quen với Philosophy 4.0 và các khái niệm cơ bản",
      activities: ["Minigame logic", "Video giới thiệu", "Bài test đánh giá"],
    },
    {
      phase: "Phát Triển",
      duration: "Tuần 3-8",
      description: "Phát triển kỹ năng thông qua các hoạt động tương tác",
      activities: ["Workshop nhóm", "Thảo luận AI ethics", "Dự án cá nhân"],
    },
    {
      phase: "Ứng Dụng",
      duration: "Tuần 9-12",
      description: "Áp dụng kiến thức vào các tình huống thực tế",
      activities: ["Case study", "Mô phỏng quyết định", "Presentation"],
    },
    {
      phase: "Thành Thạo",
      duration: "Tuần 13+",
      description: "Trở thành mentor và đóng góp cho cộng đồng",
      activities: ["Hướng dẫn newbie", "Tạo nội dung", "Nghiên cứu"],
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
              to="/activities"
              className="text-cyber-blue hover:text-revolutionary-gold transition-colors"
            >
              Hoạt Động
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 cyber-gradient">
            Kỳ Vọng & Trải Nghiệm
          </h1>

          <div className="mb-8">
            <img
              src="/images2/Triet6.png"
              alt="Experience and Expectations"
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
            Khám phá những trải nghiệm thực tế từ cộng đồng người dùng và hiểu
            rõ những gì bạn có thể kỳ vọng khi tham gia vào hệ sinh thái
            Philosophy 4.0.
          </p>
        </div>
      </section>

      {/* Learning Expectations */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-bold text-center mb-4 text-cyber-blue">
            Những Gì Bạn Sẽ Đạt Được
          </h2>
          <p className="text-center text-xl mb-12 text-cream-white/80">
            Kỹ năng và kiến thức cụ thể sau khi hoàn thành chương trình
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {expectations.map((expectation, index) => (
              <div
                key={index}
                className="bg-steel-gray/20 p-6 rounded-xl border border-cyber-blue/30"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{expectation.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-cyber-blue">
                      {expectation.title}
                    </h3>
                    <p className="text-cream-white/80 text-sm">
                      {expectation.description}
                    </p>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex justify-between text-sm">
                    <span>Độ thành thạo trung bình</span>
                    <span className="text-revolutionary-gold font-bold">
                      {expectation.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-steel-gray rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-cyber-blue to-revolutionary-gold h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${expectation.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-16 px-4 bg-gradient-to-r from-revolutionary-gold/5 to-neural-green/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-bold text-center mb-4 text-revolutionary-gold">
            Lộ Trình Học Tập
          </h2>
          <p className="text-center text-xl mb-12 text-cream-white/80">
            Hành trình từ người mới bắt đầu đến chuyên gia Philosophy 4.0
          </p>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-revolutionary-gold to-neural-green hidden md:block"></div>

            <div className="space-y-12">
              {learningPath.map((phase, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-8 ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-full md:w-5/12">
                    <div className="bg-black/50 p-6 rounded-xl border border-revolutionary-gold/30">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-revolutionary-gold/20 rounded-full flex items-center justify-center mr-4">
                          <span className="text-revolutionary-gold font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-revolutionary-gold">
                            {phase.phase}
                          </h3>
                          <p className="text-cyber-blue font-semibold">
                            {phase.duration}
                          </p>
                        </div>
                      </div>
                      <p className="text-cream-white/80 mb-4">
                        {phase.description}
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-neural-green">
                          Hoạt động chính:
                        </p>
                        {phase.activities.map((activity, actIndex) => (
                          <div
                            key={actIndex}
                            className="flex items-center text-sm"
                          >
                            <span className="w-2 h-2 bg-cyber-blue rounded-full mr-2"></span>
                            <span>{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-8 h-8 bg-revolutionary-gold rounded-full border-4 border-black shadow-lg"></div>
                  </div>

                  <div className="w-full md:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-bold text-center mb-4 text-neural-green">
            Trải Nghiệm Người Dùng
          </h2>
          <p className="text-center text-xl mb-12 text-cream-white/80">
            Những chia sẻ thật từ cộng đồng Philosophy 4.0
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="bg-steel-gray/20 p-6 rounded-xl border border-neural-green/30"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={experience.avatar}
                    alt={experience.name}
                    className="w-16 h-16 rounded-full border-2 border-neural-green/50 mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neural-green">
                      {experience.name}
                    </h3>
                    <p className="text-sm text-cream-white/70">
                      {experience.role}
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="flex text-revolutionary-gold mr-2">
                        {[...Array(experience.rating)].map((_, i) => (
                          <span key={i}>⭐</span>
                        ))}
                      </div>
                      <span className="text-xs text-cream-white/50">
                        ({experience.experience})
                      </span>
                    </div>
                  </div>
                </div>
                <blockquote className="text-cream-white/80 italic border-l-4 border-neural-green/50 pl-4">
                  "{experience.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyber-blue/5 to-data-purple/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-data-purple">
            Thành Tựu Cộng Đồng
          </h2>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-black/50 p-6 rounded-xl border border-cyber-blue/30">
              <div className="text-4xl font-bold text-cyber-blue mb-2">
                2,500+
              </div>
              <p className="text-cream-white/80">Học viên tích cực</p>
            </div>
            <div className="bg-black/50 p-6 rounded-xl border border-revolutionary-gold/30">
              <div className="text-4xl font-bold text-revolutionary-gold mb-2">
                450+
              </div>
              <p className="text-cream-white/80">Hoạt động hoàn thành</p>
            </div>
            <div className="bg-black/50 p-6 rounded-xl border border-neural-green/30">
              <div className="text-4xl font-bold text-neural-green mb-2">
                95%
              </div>
              <p className="text-cream-white/80">Tỷ lệ hài lòng</p>
            </div>
            <div className="bg-black/50 p-6 rounded-xl border border-data-purple/30">
              <div className="text-4xl font-bold text-data-purple mb-2">12</div>
              <p className="text-cream-white/80">Tháng phát triển</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Bắt Đầu Trải Nghiệm Của Bạn
          </h2>
          <p className="text-xl mb-8 text-cream-white/80 max-w-2xl mx-auto">
            Tham gia cộng đồng Philosophy 4.0 và khám phá tiềm năng tư duy của
            bạn
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="bg-neural-green text-black px-8 py-3 rounded-lg font-bold hover:bg-neural-green/80 transition-colors"
            >
              Đăng Ký Ngay
            </Link>
            <Link
              to="/activities"
              className="border border-cyber-blue text-cyber-blue px-8 py-3 rounded-lg font-bold hover:bg-cyber-blue hover:text-black transition-colors"
            >
              Xem Hoạt Động
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExperiencePage;
