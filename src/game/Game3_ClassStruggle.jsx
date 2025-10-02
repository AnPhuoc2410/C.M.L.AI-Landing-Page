import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const Game3_ClassStruggle = () => {
  const [gameMode, setGameMode] = useState(null); // 'capitalist' or 'worker'
  const [currentDay, setCurrentDay] = useState(1);
  const [capitalistScore, setCapitalistScore] = useState({ profit: 0, fairness: 100 });
  const [workerScore, setWorkerScore] = useState({ income: 0, happiness: 100 });
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [bothModesComplete, setBothModesComplete] = useState({ capitalist: false, worker: false });

  const capitalistScenarios = [
    {
      day: 1,
      title: "Ngày 1: Khởi nghiệp",
      description: "Startup AI giao đồ ăn của bạn đang phát triển. Tài xế yêu cầu tăng lương.",
      choices: [
        {
          text: "Sa thải 30% tài xế, thay bằng drone AI",
          effect: { profit: 150, fairness: -30 },
          message: "💰 Lợi nhuận tăng nhanh nhưng tài xế bất mãn!"
        },
        {
          text: "Tăng lương 10% cho tài xế",
          effect: { profit: 50, fairness: 10 },
          message: "👍 Tài xế hài lòng nhưng chi phí tăng"
        },
        {
          text: "Giữ nguyên, không thay đổi",
          effect: { profit: 100, fairness: -5 },
          message: "⚖️ Duy trì hiện trạng"
        }
      ]
    },
    {
      day: 2,
      title: "Ngày 2: Áp lực cạnh tranh",
      description: "Đối thủ cắt giảm giá dịch vụ 20%. Bạn cần phản ứng.",
      choices: [
        {
          text: "Cắt giảm % thu nhập của tài xế",
          effect: { profit: 120, fairness: -25 },
          message: "📉 Cạnh tranh được nhưng tài xế tức giận"
        },
        {
          text: "Giữ giá, đầu tư marketing",
          effect: { profit: 80, fairness: 5 },
          message: "📢 Giữ uy tín nhưng lợi nhuận giảm"
        },
        {
          text: "Tăng AI tối ưu, giảm nhân sự",
          effect: { profit: 150, fairness: -35 },
          message: "🤖 Tối ưu hóa tối đa, sa thải hàng loạt"
        }
      ]
    },
    {
      day: 3,
      title: "Ngày 3: Khủng hoảng đình công",
      description: "Tài xế đồng loạt tắt app, đòi cải thiện điều kiện!",
      choices: [
        {
          text: "Phớt lờ, tuyển tài xế mới",
          effect: { profit: -50, fairness: -40 },
          message: "❌ Dịch vụ tê liệt! Khách hàng rời bỏ"
        },
        {
          text: "Đàm phán, tăng 15% thu nhập",
          effect: { profit: 70, fairness: 20 },
          message: "🤝 Giải quyết ổn thỏa, chi phí tăng"
        },
        {
          text: "Tự động hóa hoàn toàn (100% AI)",
          effect: { profit: 200, fairness: -50 },
          message: "🚁 Drone thay thế hoàn toàn! Nhưng..."
        }
      ]
    }
  ];

  const workerScenarios = [
    {
      day: 1,
      title: "Ngày 1: Bắt đầu làm việc",
      description: "Bạn là tài xế giao hàng. Chọn ca làm việc.",
      choices: [
        {
          text: "Làm 8 tiếng (ca chuẩn)",
          effect: { income: 50, happiness: 5 },
          message: "💼 Thu nhập thấp, không đủ chi tiêu"
        },
        {
          text: "Làm 12 tiếng (tăng ca)",
          effect: { income: 100, happiness: -10 },
          message: "💪 Thu nhập ổn nhưng kiệt sức"
        },
        {
          text: "Làm 16 tiếng (quá tải)",
          effect: { income: 150, happiness: -25 },
          message: "😰 Nhiều tiền nhưng sức khỏe suy giảm"
        }
      ]
    },
    {
      day: 2,
      title: "Ngày 2: Thuật toán thay đổi",
      description: "App giảm phần trăm cho tài xế từ 80% xuống 70%!",
      choices: [
        {
          text: "Chấp nhận, làm nhiều hơn để bù",
          effect: { income: 80, happiness: -15 },
          message: "😞 Làm nhiều hơn nhưng thu nhập không tăng"
        },
        {
          text: "Nghỉ 1 ngày để phản đối",
          effect: { income: 0, happiness: -5 },
          message: "✊ Biểu thị thái độ nhưng mất thu nhập"
        },
        {
          text: "Tham gia nhóm đình công ảo",
          effect: { income: 30, happiness: 10 },
          message: "🔥 Đoàn kết! Nếu đủ người, công ty phải nhượng bộ"
        }
      ]
    },
    {
      day: 3,
      title: "Ngày 3: Quyết định cuối cùng",
      description: "Thu nhập không đủ sống. Bạn sẽ làm gì?",
      choices: [
        {
          text: "Tiếp tục làm, chịu đựng",
          effect: { income: 70, happiness: -20 },
          message: "😔 Vòng lặp bất công tiếp diễn"
        },
        {
          text: "Tham gia công đoàn, đấu tranh tập thể",
          effect: { income: 100, happiness: 20 },
          message: "✊ Đoàn kết lao động! Điều kiện được cải thiện"
        },
        {
          text: "Bỏ nghề, tìm việc khác",
          effect: { income: 50, happiness: 0 },
          message: "🚪 Thoát ra nhưng vẫn trong vòng xoáy"
        }
      ]
    }
  ];

  const scenarios = gameMode === "capitalist" ? capitalistScenarios : workerScenarios;

  const handleChoice = (choice) => {
    setResultMessage(choice.message);
    setShowResult(true);

    if (gameMode === "capitalist") {
      setCapitalistScore({
        profit: capitalistScore.profit + choice.effect.profit,
        fairness: Math.max(0, Math.min(100, capitalistScore.fairness + choice.effect.fairness))
      });
    } else {
      setWorkerScore({
        income: workerScore.income + choice.effect.income,
        happiness: Math.max(0, Math.min(100, workerScore.happiness + choice.effect.happiness))
      });
    }

    setTimeout(() => {
      setShowResult(false);
      if (currentDay < 3) {
        setCurrentDay(currentDay + 1);
      } else {
        completeMode();
      }
    }, 3000);
  };

  const completeMode = () => {
    setBothModesComplete({
      ...bothModesComplete,
      [gameMode]: true
    });
  };

  const resetGame = () => {
    setGameMode(null);
    setCurrentDay(1);
    setCapitalistScore({ profit: 0, fairness: 100 });
    setWorkerScore({ income: 0, happiness: 100 });
    setShowResult(false);
    setBothModesComplete({ capitalist: false, worker: false });
  };

  if (!gameMode) {
    return (
      <div className="max-w-4xl mx-auto text-center py-8">
        <h2 className="text-4xl font-bold text-cyber-blue mb-6">
          👥 Chọn Vai Của Bạn
        </h2>
        <p className="text-cream-white/80 mb-8 max-w-2xl mx-auto">
          Trải nghiệm cả hai góc nhìn của xã hội số: Tư bản công nghệ và Lao động gig.
          Quyết định của bạn sẽ định hình kết cục ra sao?
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameMode("capitalist")}
            className="bg-gradient-to-br from-revolutionary-gold/20 to-cyber-blue/20 border-2 border-revolutionary-gold rounded-xl p-8 hover:border-revolutionary-gold/80 transition-all group"
          >
            <div className="text-6xl mb-4">👔</div>
            <h3 className="text-2xl font-bold text-revolutionary-gold mb-3">
              Tư Bản Công Nghệ
            </h3>
            <p className="text-cream-white/80 text-sm mb-4">
              Bạn là CEO startup AI. Mục tiêu: Tối đa hóa lợi nhuận trong 3 ngày.
            </p>
            {bothModesComplete.capitalist && (
              <span className="inline-block bg-neural-green/20 text-neural-green px-3 py-1 rounded-full text-xs">
                ✓ Đã hoàn thành
              </span>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameMode("worker")}
            className="bg-gradient-to-br from-neural-green/20 to-cyber-blue/20 border-2 border-neural-green rounded-xl p-8 hover:border-neural-green/80 transition-all group"
          >
            <div className="text-6xl mb-4">👷</div>
            <h3 className="text-2xl font-bold text-neural-green mb-3">
              Lao Động Số
            </h3>
            <p className="text-cream-white/80 text-sm mb-4">
              Bạn là tài xế giao hàng. Mục tiêu: Kiếm đủ sống trong 3 ngày.
            </p>
            {bothModesComplete.worker && (
              <span className="inline-block bg-neural-green/20 text-neural-green px-3 py-1 rounded-full text-xs">
                ✓ Đã hoàn thành
              </span>
            )}
          </motion.button>
        </div>

        {bothModesComplete.capitalist && bothModesComplete.worker && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-revolutionary-gold/10 border border-revolutionary-gold/30 rounded-xl p-6"
          >
            <h3 className="text-2xl font-bold text-revolutionary-gold mb-4">
              📊 So Sánh Kết Quả
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <div className="text-sm text-cream-white/60 mb-2">Vai Tư Bản:</div>
                <div className="text-lg">💰 Lợi nhuận: {capitalistScore.profit}</div>
                <div className="text-lg">⚖️ Công bằng: {capitalistScore.fairness}%</div>
              </div>
              <div>
                <div className="text-sm text-cream-white/60 mb-2">Vai Lao Động:</div>
                <div className="text-lg">💵 Thu nhập: {workerScore.income}</div>
                <div className="text-lg">😊 Hạnh phúc: {workerScore.happiness}%</div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg">
              <p className="text-cream-white/90 italic text-sm">
                "Nếu không có sự cân bằng, xã hội sẽ bất ổn. 
                <br />Vô sản tất cả các nước, đoàn kết lại!" - Karl Marx
              </p>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  if (currentDay > 3) {
    const score = gameMode === "capitalist" ? capitalistScore : workerScore;
    const isSuccess = gameMode === "capitalist" 
      ? score.profit >= 300 && score.fairness >= 40
      : score.income >= 200 && score.happiness >= 50;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        {isSuccess && <Confetti recycle={false} numberOfPieces={150} />}
        <h2 className="text-4xl font-bold mb-4">
          {isSuccess ? "🎉 Thành Công!" : "😔 Kết Thúc"}
        </h2>
        <div className="bg-black/60 border border-cyber-blue rounded-xl p-6 max-w-2xl mx-auto mb-6">
          {gameMode === "capitalist" ? (
            <>
              <p className="text-2xl text-revolutionary-gold mb-2">
                Lợi nhuận: {capitalistScore.profit}
              </p>
              <p className="text-xl text-cream-white/80 mb-4">
                Công bằng: {capitalistScore.fairness}%
              </p>
              <div className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-4">
                <p className="text-cream-white/90 text-sm leading-relaxed">
                  {capitalistScore.fairness < 30 ? (
                    <>❌ Lợi nhuận cao nhưng bất công tràn lan! Công ty sẽ đối mặt với khủng hoảng lao động.</>
                  ) : capitalistScore.profit < 200 ? (
                    <>⚠️ Quá tập trung vào công bằng, lợi nhuận thấp. Khó cạnh tranh trong thị trường.</>
                  ) : (
                    <>✅ Bạn cân bằng tốt! Nhưng đừng quên: mâu thuẫn căn bản vẫn tồn tại.</>
                  )}
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-2xl text-neural-green mb-2">
                Thu nhập: {workerScore.income}
              </p>
              <p className="text-xl text-cream-white/80 mb-4">
                Hạnh phúc: {workerScore.happiness}%
              </p>
              <div className="bg-neural-green/10 border border-neural-green/30 rounded-lg p-4">
                <p className="text-cream-white/90 text-sm leading-relaxed">
                  {workerScore.happiness < 30 ? (
                    <>😰 Thu nhập có nhưng sức khỏe kiệt quệ! Đây không phải cuộc sống bền vững.</>
                  ) : workerScore.income < 150 ? (
                    <>💔 Dù cố gắng nhưng thu nhập không đủ sống. Hệ thống cần thay đổi!</>
                  ) : (
                    <>✊ Đoàn kết đã mang lại kết quả! Nhưng đấu tranh vẫn phải tiếp tục.</>
                  )}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="bg-cyber-blue text-black px-6 py-3 rounded-lg font-bold"
          >
            Chơi Vai Khác
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCurrentDay(1);
              if (gameMode === "capitalist") {
                setCapitalistScore({ profit: 0, fairness: 100 });
              } else {
                setWorkerScore({ income: 0, happiness: 100 });
              }
            }}
            className="bg-neural-green text-black px-6 py-3 rounded-lg font-bold"
          >
            Chơi Lại Vai Này
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const scenario = scenarios[currentDay - 1];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`rounded-lg p-4 border-2 ${
          gameMode === "capitalist" 
            ? "bg-revolutionary-gold/20 border-revolutionary-gold/50"
            : "bg-neural-green/20 border-neural-green/50"
        }`}>
          <div className="text-xs text-cream-white/60 mb-1">
            {gameMode === "capitalist" ? "Lợi Nhuận" : "Thu Nhập"}
          </div>
          <div className="text-3xl font-bold">
            {gameMode === "capitalist" ? `💰${capitalistScore.profit}` : `💵${workerScore.income}`}
          </div>
        </div>
        <div className={`rounded-lg p-4 border-2 ${
          gameMode === "capitalist"
            ? "bg-cyber-blue/20 border-cyber-blue/50"
            : "bg-revolutionary-gold/20 border-revolutionary-gold/50"
        }`}>
          <div className="text-xs text-cream-white/60 mb-1">
            {gameMode === "capitalist" ? "Công Bằng" : "Hạnh Phúc"}
          </div>
          <div className="text-3xl font-bold">
            {gameMode === "capitalist" ? `⚖️${capitalistScore.fairness}%` : `😊${workerScore.happiness}%`}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentDay}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <div className="bg-gradient-to-r from-cyber-blue/20 to-revolutionary-gold/20 rounded-xl p-6 mb-6 border border-cyber-blue/30">
              <h3 className="text-2xl font-bold text-cyber-blue mb-2">
                {scenario.title}
              </h3>
              <p className="text-cream-white/90">{scenario.description}</p>
            </div>

            <div className="space-y-3">
              {scenario.choices.map((choice, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChoice(choice)}
                  className="w-full text-left bg-steel-gray/20 hover:bg-steel-gray/40 border border-cyber-blue/30 hover:border-cyber-blue rounded-lg p-4 transition-all"
                >
                  <p className="text-cream-white/90">{choice.text}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">
              {resultMessage.includes("✅") || resultMessage.includes("✊") ? "🎉" : 
               resultMessage.includes("❌") ? "❌" : "⚠️"}
            </div>
            <div className="bg-black/60 border-2 border-cyber-blue rounded-xl p-6 max-w-xl mx-auto">
              <p className="text-xl text-cream-white/90">{resultMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Game3_ClassStruggle;
