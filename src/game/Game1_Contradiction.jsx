import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const Game1_Contradiction = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const levels = [
    {
      era: "Xã Hội Phong Kiến",
      year: "1000 CE",
      description: "Robot AI từ tương lai xuất hiện với khả năng tăng năng suất gấp 10 lần!",
      image: "/images2/Triet1.png",
      choices: [
        {
          id: "A",
          text: "Giữ nguyên chế độ địa chủ - nông nô, AI tăng thu tô cho địa chủ",
          result: "fail",
          message: "❌ Mâu thuẫn bùng nổ! Nông dân nổi dậy lật đổ địa chủ. Quan hệ sản xuất cũ không thể chứa đựng lực lượng sản xuất mới!",
          marxQuote: '"Khi quan hệ cũ trở thành xiềng xích, xã hội buộc phải vùng lên" - Karl Marx'
        },
        {
          id: "B",
          text: "Xóa bỏ nông nô, thuê công nhân tự do vận hành AI",
          result: "partial",
          message: "⚠️ Xã hội chuyển sang tư bản sơ kỳ. Ổn định tạm thời nhưng mâu thuẫn mới đang hình thành...",
          marxQuote: '"Tư bản là bước tiến nhưng cũng chứa đựng mâu thuẫn riêng"'
        },
        {
          id: "C",
          text: "Hợp tác xã: Nông dân cùng sở hữu AI và ruộng đất",
          result: "success",
          message: "✅ Hoàn hảo! Quan hệ sản xuất tiến bộ phù hợp với LLSX mới. Mọi người cùng hưởng lợi!",
          marxQuote: '"Sản xuất vì con người, không vì lợi nhuận" - Marx'
        }
      ]
    },
    {
      era: "Cách Mạng Công Nghiệp",
      year: "1850 CE",
      description: "AI quản lý nhà máy hiện đại xuất hiện, năng suất tăng vọt!",
      image: "/images2/Triet3.png",
      choices: [
        {
          id: "A",
          text: "Tư bản tư nhân sở hữu hoàn toàn AI và máy móc",
          result: "fail",
          message: "❌ Bất bình đẳng tăng cao! Công nhân đình công quy mô lớn. Hệ thống sụp đổ!",
          marxQuote: '"Tư bản tích tụ ở một cực, nghèo khổ tích tụ ở cực đối lập"'
        },
        {
          id: "B",
          text: "Nhà nước điều tiết, đảm bảo phúc lợi công nhân",
          result: "partial",
          message: "⚠️ Tạm ổn! Nhưng căn bản mâu thuẫn vẫn chưa được giải quyết.",
          marxQuote: '"Cải cách chỉ là tạm thời, cần thay đổi căn bản"'
        },
        {
          id: "C",
          text: "Sở hữu tập thể phương tiện sản xuất, AI phục vụ cộng đồng",
          result: "success",
          message: "✅ Xuất sắc! AI phục vụ toàn xã hội, không còn bóc lột!",
          marxQuote: '"Từ mỗi người theo năng lực, cho mỗi người theo nhu cầu"'
        }
      ]
    },
    {
      era: "Kỷ Nguyên Số Hiện Đại",
      year: "2025 CE",
      description: "AI sinh tạo và tự động hóa thay thế hàng triệu việc làm!",
      image: "/images2/Triet5.png",
      choices: [
        {
          id: "A",
          text: "Big Tech độc quyền AI, tối đa hóa lợi nhuận cổ đông",
          result: "fail",
          message: "❌ Thất nghiệp tràn lan! Bất ổn xã hội cực điểm. Hệ thống sụp đổ!",
          marxQuote: '"Công nghệ trong tay thiểu số trở thành công cụ áp bức"'
        },
        {
          id: "B",
          text: "Thu thuế AI, tăng phúc lợi xã hội (UBI)",
          result: "partial",
          message: "⚠️ Giảm bớt mâu thuẫn nhưng chưa giải quyết gốc rễ vấn đề quyền lực.",
          marxQuote: '"Phúc lợi không thay thế được quyền sở hữu"'
        },
        {
          id: "C",
          text: "AI là tài sản công, do cộng đồng dân chủ quản lý",
          result: "success",
          message: "✅ Hoàn hảo! AI 4.0 phục vụ nhân dân, xã hội công bằng và thịnh vượng!",
          marxQuote: '"Công nghệ giải phóng con người khỏi lao động nặng nhọc"'
        }
      ]
    }
  ];

  const handleChoice = (choice) => {
    setResultMessage(choice.message);
    setShowResult(true);

    if (choice.result === "success") {
      setScore(score + 100);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else if (choice.result === "partial") {
      setScore(score + 50);
    }

    setTimeout(() => {
      setShowResult(false);
      if (currentLevel < levels.length - 1) {
        setCurrentLevel(currentLevel + 1);
      } else {
        setGameCompleted(true);
      }
    }, 4000);
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setGameCompleted(false);
    setShowResult(false);
  };

  if (gameCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        {showConfetti && <Confetti />}
        <h2 className="text-4xl font-bold text-neural-green mb-4">
          🎉 Hoàn Thành Game!
        </h2>
        <p className="text-2xl text-cyber-blue mb-4">Điểm số: {score}/300</p>
        <div className="bg-revolutionary-gold/10 border border-revolutionary-gold/30 rounded-xl p-6 max-w-2xl mx-auto mb-6">
          <p className="text-cream-white/90 text-lg leading-relaxed">
            {score >= 250 ? "🌟 Xuất sắc! Bạn đã hiểu rõ quy luật phát triển LLSX-QHSX!" 
              : score >= 150 ? "👍 Tốt! Bạn đã nắm được cơ bản về mâu thuẫn xã hội."
              : "📚 Hãy thử lại để hiểu sâu hơn về lý thuyết Mác!"}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="bg-cyber-blue text-black px-8 py-3 rounded-lg font-bold hover:bg-cyber-blue/80"
        >
          Chơi Lại
        </motion.button>
      </motion.div>
    );
  }

  const level = levels[currentLevel];

  return (
    <div className="max-w-4xl mx-auto">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-cream-white/60">Tiến độ</span>
          <span className="text-sm text-cyber-blue font-bold">Điểm: {score}</span>
        </div>
        <div className="w-full bg-steel-gray/30 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentLevel + 1) / levels.length) * 100}%` }}
            className="bg-gradient-to-r from-cyber-blue to-neural-green h-2 rounded-full"
          />
        </div>
        <div className="text-xs text-cream-white/60 mt-1">
          Màn {currentLevel + 1}/{levels.length}
        </div>
      </div>

      {/* Level Content */}
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentLevel}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {/* Era Header */}
            <div className="bg-gradient-to-r from-revolutionary-gold/20 to-cyber-blue/20 rounded-xl p-6 mb-6 border border-revolutionary-gold/30">
              <h3 className="text-3xl font-bold text-revolutionary-gold mb-2">
                {level.era}
              </h3>
              <p className="text-sm text-cream-white/60">{level.year}</p>
            </div>

            {/* Scenario */}
            <div className="bg-black/40 rounded-xl p-6 mb-6 border border-cyber-blue/20">
              <div className="mb-4">
                <img
                  src={level.image}
                  alt={level.era}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <p className="text-lg text-cream-white/90 leading-relaxed">
                {level.description}
              </p>
            </div>

            {/* Mentor Marx Guide */}
            <div className="bg-neural-green/10 border border-neural-green/30 rounded-xl p-4 mb-6 flex items-start gap-3">
              <div className="text-3xl">🧙‍♂️</div>
              <div>
                <p className="text-sm font-bold text-neural-green mb-1">Mentor Mác:</p>
                <p className="text-sm text-cream-white/80 italic">
                  "Lực lượng sản xuất mới đòi hỏi quan hệ sản xuất mới phù hợp..."
                </p>
              </div>
            </div>

            {/* Choices */}
            <div className="space-y-4">
              {level.choices.map((choice, index) => (
                <motion.button
                  key={choice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChoice(choice)}
                  className="w-full text-left bg-steel-gray/20 hover:bg-steel-gray/40 border border-cyber-blue/30 hover:border-cyber-blue rounded-xl p-4 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl font-bold text-cyber-blue group-hover:text-revolutionary-gold transition-colors">
                      {choice.id}
                    </span>
                    <p className="text-cream-white/90 flex-1">{choice.text}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: 3, duration: 0.5 }}
              className="text-8xl mb-6"
            >
              {resultMessage.includes("✅") ? "🎉" : resultMessage.includes("⚠️") ? "⚠️" : "💥"}
            </motion.div>
            <div className="bg-black/60 border-2 border-cyber-blue rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-2xl text-cream-white mb-6 leading-relaxed">
                {resultMessage}
              </p>
              <div className="bg-revolutionary-gold/10 border border-revolutionary-gold/30 rounded-lg p-4">
                <p className="text-revolutionary-gold italic">
                  {levels[currentLevel].choices.find(c => c.message === resultMessage)?.marxQuote}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Game1_Contradiction;
