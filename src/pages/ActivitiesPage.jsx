import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavBar from "../components/Navbar";
import GameModal from "../game/GameModal";
import Game1_Contradiction from "../game/Game1_Contradiction";
import Game2_SurplusValue from "../game/Game2_SurplusValue";
import Game3_ClassStruggle from "../game/Game3_ClassStruggle";
import Game4_CreativityTest from "../game/Game4_CreativityTest";
import Game5_MemoryMatch from "../game/Game5_MemoryMatch";
import Game6_TheCave from "../game/Game6_TheCave";

const ActivitiesPage = () => {
  const { t } = useTranslation();
  const [activeGame, setActiveGame] = useState(null);
  
  const minigames = [
    {
      name: "Trí Nhớ Biện Chứng",
      subtitle: "Ghép triết gia với tư tưởng bất hủ",
      description:
        "Một mini game lật thẻ nơi bạn thử thách trí nhớ bằng cách ghép hình ảnh các triết gia với tên của họ. Càng nhớ đúng nhiều cặp, bạn càng hiểu rõ hơn về họ.",
      image: "/game/Game_MemoryMatch.png",
      type: "Trí nhớ",
      features: [
        "Ghép ảnh - tên triết gia",
        "Đếm điểm và thời gian",
      ],
      difficulty: "Trung bình",
      component: Game5_MemoryMatch,
    },
    {
      id: 2,
      name: t("activities.game2.name"),
      subtitle: t("activities.game2.subtitle"),
      description: t("activities.game2.description"),
      image: "/game/Game_Thohun.png",
      type: t("activities.game2.type"),
      features: [
        t("activities.game2.features.resource"),
        t("activities.game2.features.balance"),
        t("activities.game2.features.points")
      ],
      difficulty: t("activities.game2.difficulty"),
      component: Game2_SurplusValue,
    },
    {
      id: 3,
      name: "The Cave - Thuyết Ẩn Dụ Hang Động",
      subtitle: "Hành trình từ Bóng tối đến Ánh sáng",
      description:
        "Nhập vai một tù nhân bị giam trong hang động của Plato. Khởi đầu bạn chỉ thấy những chiếc bóng, nhưng qua từng bước bạn sẽ khám phá ngọn lửa, thoát khỏi xiềng xích, và cuối cùng bước ra ánh sáng chân lý. Một trải nghiệm triết học tương tác, nơi bạn trực tiếp cảm nhận hành trình nhận thức từ ảo tưởng đến sự thật.",
      image: "/game/Game_TheCave.png",
      type: "Nhập vai",
      features: ["Hai chế độ chơi", "Sự kiện ngẫu nhiên", "So sánh kết quả"],
      difficulty: "Dễ",
      component: Game6_TheCave,
    },
    {
      id: 4,
      name: t("activities.game4.name"),
      subtitle: t("activities.game4.subtitle"),
      description: t("activities.game4.description"),
      image: "/images2/TrietAI5.png",
      type: t("activities.game4.type"),
      features: [
        t("activities.game4.features.diverse"),
        t("activities.game4.features.gemini"),
        t("activities.game4.features.turing")
      ],
      difficulty: t("activities.game4.difficulty"),
      component: Game4_CreativityTest,
    },
  ];

  return (
    <div className="min-h-screen bg-main-bg text-cream-white">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream-white pt-16">
        <img
          src="/images2/Triet4.png"
          alt="Activities and Games"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-cream-white/60 via-transparent to-cream-white/60"></div>

        <div className="container mx-auto max-w-4xl text-center relative z-10 px-4 pt-24 pb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-communist-red uppercase tracking-tight">
            {t("activities.pageTitle")}
          </h1>

          <div className="max-w-md mx-auto mb-6">
            <div className="text-center p-3 bg-revolutionary-gold/20 rounded-lg border-4 border-communist-red">
              <p className="text-communist-red text-sm font-bold">
                {t("activities.audioTourNote")}
              </p>
            </div>
          </div>

          <p className="text-lg mb-6 text-steel-gray max-w-3xl mx-auto leading-relaxed">
            {t("activities.intro")}
          </p>
        </div>
      </section>

      {/* Four Main Minigames Section */}
      <section className="relative py-20 px-4 bg-communist-red">
        <img
          src="/images2/TrietAI.png"
          alt="Games Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />

        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-3 text-cream-white uppercase">
            {t("activities.mainTitle")}
          </h2>
          <p className="text-center text-lg mb-10 text-cream-white/90">
            {t("activities.mainSubtitle")}
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {minigames.map((game, index) => (
              <div
                key={index}
                className="group bg-cream-white rounded-xl overflow-hidden border-4 border-revolutionary-gold hover:border-cyber-blue transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-90 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-communist-red/80 via-communist-red/20 to-transparent"></div>

                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-bold backdrop-blur-sm ${
                        game.difficulty === "Dễ"
                          ? "bg-neural-green/90 text-black"
                          : game.difficulty === "Trung bình"
                          ? "bg-cyber-blue/90 text-black"
                          : "bg-revolutionary-gold/90 text-black"
                      }`}
                    >
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
                  <p className="text-black mb-3 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
                    {game.description}
                  </p>

                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1.5">
                      {game.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-[#FFD700]/80 text-black px-2 py-0.5 rounded text-xs border border-[#FFD700]/60 hover:bg-[#FFD700]/90 transition-colors"
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
                    {t("activities.playNow")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Context Section */}
      <section className="relative py-16 px-4 bg-cream-white">
        <img
          src="/images2/Triet5.png"
          alt="Educational Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />

        <div className="container mx-auto max-w-5xl relative z-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-communist-red uppercase">
            {t("activities.aboutGames.title")}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-cyber-blue rounded-xl p-6 border-4 border-communist-red hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
              <h3 className="text-xl font-bold text-communist-red group-hover:text-cream-white mb-3 flex items-center gap-2 uppercase">
                <span className="text-2xl">🎮</span>
                {t("activities.aboutGames.learningMethod.title")}
              </h3>
              <ul className="space-y-2 text-steel-gray group-hover:text-cream-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-communist-red group-hover:text-revolutionary-gold mt-0.5">
                    ✓
                  </span>
                  <span>{t("activities.aboutGames.learningMethod.point1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-communist-red group-hover:text-revolutionary-gold mt-0.5">
                    ✓
                  </span>
                  <span>{t("activities.aboutGames.learningMethod.point2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-communist-red group-hover:text-revolutionary-gold mt-0.5">
                    ✓
                  </span>
                  <span>{t("activities.aboutGames.learningMethod.point3")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-communist-red group-hover:text-revolutionary-gold mt-0.5">
                    ✓
                  </span>
                  <span>{t("activities.aboutGames.learningMethod.point4")}</span>
                </li>
              </ul>
            </div>

            <div className="bg-revolutionary-gold rounded-xl p-6 border-4 border-communist-red hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
              <h3 className="text-xl font-bold text-communist-red group-hover:text-cream-white mb-3 flex items-center gap-2 uppercase">
                <span className="text-2xl">📚</span>
                {t("activities.aboutGames.knowledgeGained.title")}
              </h3>
              <ul className="space-y-2 text-steel-gray group-hover:text-cream-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-communist-red group-hover:text-cyber-blue mt-0.5">
                    •
                  </span>
                  <span>{t("activities.aboutGames.knowledgeGained.point1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-communist-red group-hover:text-cyber-blue mt-0.5">
                    •
                  </span>
                  <span>{t("activities.aboutGames.knowledgeGained.point2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-communist-red group-hover:text-cyber-blue mt-0.5">
                    •
                  </span>
                  <span>{t("activities.aboutGames.knowledgeGained.point3")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-communist-red group-hover:text-cyber-blue mt-0.5">
                    •
                  </span>
                  <span>{t("activities.aboutGames.knowledgeGained.point4")}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-neural-green rounded-xl p-5 border-4 border-communist-red">
            <p className="text-center text-sm text-steel-gray leading-relaxed">
              <span className="text-communist-red font-bold">💡</span> {t("activities.aboutGames.note")}
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 px-4 bg-communist-red">
        <img
          src="/images2/Triet6.png"
          alt="CTA Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-cream-white uppercase">
            {t("activities.cta.title")}
          </h2>
          <p className="text-base md:text-xl mb-6 text-cream-white/90 max-w-2xl mx-auto">
            {t("activities.cta.subtitle")}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/goals"
              className="bg-cyber-blue text-communist-red border-4 border-cream-white px-8 py-3 rounded-xl font-bold text-lg uppercase hover:bg-cream-white hover:scale-105 transition-all duration-300"
            >
              {t("activities.cta.viewGoals")}
            </Link>
            <Link
              to="/experience"
              className="bg-revolutionary-gold text-communist-red border-4 border-cream-white px-8 py-3 rounded-xl font-bold text-lg uppercase hover:bg-cream-white hover:scale-105 transition-all duration-300"
            >
              {t("activities.cta.experience")}
            </Link>
            <Link
              to="/"
              className="bg-cream-white text-communist-red border-4 border-revolutionary-gold px-8 py-3 rounded-xl font-bold text-lg uppercase hover:bg-revolutionary-gold hover:scale-105 transition-all duration-300"
            >
              {t("activities.cta.backHome")}
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
