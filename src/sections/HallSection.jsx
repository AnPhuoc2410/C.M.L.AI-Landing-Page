import CardSwiper from "../components/CardSwiper";

const HallSection = () => {
  return (
    <section
      id="hall-section"
      className="hall-section bg-[#2e2e2e] min-h-screen py-20"
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Minigame & Hoạt Động
          </h1>

          <div className="max-w-3xl mx-auto space-y-4 text-gray-300">
            <p className="text-lg">
              Khám phá các minigame tương tác và hoạt động thú vị được thiết kế
              để phát triển tư duy triết học 4.0.
            </p>

            <p className="text-base">
              Từ những trò chơi logic AI đến các bài tập tư duy phản biện, trải
              nghiệm học tập đa tương tác giúp bạn phát triển khả năng tư duy
              triết học trong kỷ nguyên số. Mỗi hoạt động được thiết kế để kết
              hợp giải trí với học tập sâu sắc.
            </p>
          </div>
        </div>

        {/* Card Swiper */}
        <CardSwiper />
      </div>
    </section>
  );
};

export default HallSection;
