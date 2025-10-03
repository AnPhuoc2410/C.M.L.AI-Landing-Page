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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream-white">
        <img
          src="/images2/Triet6.png"
          alt="Experience and Expectations"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-cream-white/60 via-transparent to-cream-white/60"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10 px-4 pt-24 pb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-communist-red uppercase tracking-tight">
            Kỳ Vọng & Trải Nghiệm
          </h1>

          <div className="max-w-md mx-auto mb-8">
            <div className="text-center p-4 bg-revolutionary-gold/20 rounded-lg border-4 border-communist-red">
              <p className="text-communist-red text-base font-bold">
                🎵 Audio tour available on main page
              </p>
            </div>
          </div>

          <p className="text-xl mb-8 text-steel-gray max-w-3xl mx-auto">
            Khám phá những trải nghiệm thực tế từ cộng đồng người dùng và hiểu
            rõ những gì bạn có thể kỳ vọng khi tham gia vào hệ sinh thái
            Philosophy 4.0.
          </p>
        </div>
      </section>

      {/* Learning Expectations */}
      <section className="relative py-20 px-4 bg-communist-red">
        <img
          src="/images2/TrietAI.png"
          alt="Expectations Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-5xl font-bold text-center mb-4 text-cream-white uppercase">
            Những Gì Bạn Sẽ Đạt Được
          </h2>
          <p className="text-center text-xl mb-12 text-cream-white/90">
            Kỹ năng và kiến thức cụ thể sau khi hoàn thành chương trình
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {expectations.map((expectation, index) => (
              <div
                key={index}
                className="bg-cream-white p-6 rounded-xl border-4 border-revolutionary-gold"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{expectation.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-communist-red uppercase">
                      {expectation.title}
                    </h3>
                    <p className="text-steel-gray text-sm">
                      {expectation.description}
                    </p>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-steel-gray">Độ thành thạo trung bình</span>
                    <span className="text-communist-red font-bold">
                      {expectation.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-steel-gray rounded-full h-2">
                    <div
                      className="bg-communist-red h-2 rounded-full transition-all duration-1000"
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
      <section className="relative py-20 px-4 bg-cream-white">
        <img
          src="/images2/Triet7.png"
          alt="Learning Path Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-5xl font-bold text-center mb-4 text-communist-red uppercase">
            Lộ Trình Học Tập
          </h2>
          <p className="text-center text-xl mb-12 text-steel-gray">
            Hành trình từ người mới bắt đầu đến chuyên gia Philosophy 4.0
          </p>

          <div className="space-y-12">
            {learningPath.map((phase, index) => (
              <div
                key={index}
                className="bg-revolutionary-gold p-6 rounded-xl border-4 border-communist-red"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-communist-red rounded-full flex items-center justify-center mr-4">
                    <span className="text-cream-white font-bold text-xl">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-communist-red uppercase">
                      {phase.phase}
                    </h3>
                    <p className="text-cyber-blue font-semibold">
                      {phase.duration}
                    </p>
                  </div>
                </div>
                <p className="text-steel-gray mb-4">
                  {phase.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-communist-red uppercase">
                    Hoạt động chính:
                  </p>
                  {phase.activities.map((activity, actIndex) => (
                    <div
                      key={actIndex}
                      className="flex items-center text-sm"
                    >
                      <span className="w-2 h-2 bg-communist-red rounded-full mr-2"></span>
                      <span className="text-steel-gray">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="relative py-20 px-4 bg-communist-red">
        <img
          src="/images2/TrietAI3.png"
          alt="Testimonials Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-5xl font-bold text-center mb-4 text-cream-white uppercase">
            Trải Nghiệm Người Dùng
          </h2>
          <p className="text-center text-xl mb-12 text-cream-white/90">
            Những chia sẻ thật từ cộng đồng Philosophy 4.0
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="bg-cream-white p-6 rounded-xl border-4 border-revolutionary-gold"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={experience.avatar}
                    alt={experience.name}
                    className="w-16 h-16 rounded-full border-4 border-communist-red mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-communist-red">{experience.name}</h3>
                    <p className="text-cyber-blue text-sm">{experience.role}</p>
                  </div>
                </div>
                <p className="text-steel-gray italic mb-4">"{experience.quote}"</p>
                <div className="flex justify-between items-center">
                  <div className="flex">
                    {[...Array(experience.rating)].map((_, i) => (
                      <span key={i} className="text-revolutionary-gold">★</span>
                    ))}
                  </div>
                  <span className="text-sm text-steel-gray">Kinh nghiệm: {experience.experience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 px-4 bg-cream-white">
        <img
          src="/images2/Triet1.png"
          alt="CTA Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-communist-red uppercase">
            Bắt Đầu Hành Trình Của Bạn
          </h2>
          <p className="text-xl md:text-2xl text-steel-gray mb-12 max-w-2xl mx-auto">
            Tham gia cộng đồng Philosophy 4.0 và khám phá tương lai của triết học
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              to="/activities"
              className="bg-revolutionary-gold text-communist-red border-4 border-communist-red px-10 py-4 rounded-xl font-bold text-lg uppercase hover:bg-communist-red hover:text-cream-white hover:scale-105 transition-all duration-300"
            >
              Khám Phá Hoạt Động
            </Link>
            <Link
              to="/goals"
              className="bg-cyber-blue text-communist-red border-4 border-communist-red px-10 py-4 rounded-xl font-bold text-lg uppercase hover:bg-communist-red hover:text-cream-white hover:scale-105 transition-all duration-300"
            >
              Xem Mục Tiêu
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

export default ExperiencePage;
