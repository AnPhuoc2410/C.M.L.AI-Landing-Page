import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const Game2_SurplusValue = () => {
  const [workers, setWorkers] = useState([
    { id: 1, health: 100, productivity: 10, position: 0 },
    { id: 2, health: 100, productivity: 10, position: 1 },
    { id: 3, health: 100, productivity: 10, position: 2 },
    { id: 4, health: 100, productivity: 10, position: 3 },
  ]);
  const [robots, setRobots] = useState([]);
  const [surplusValue, setSurplusValue] = useState(0);
  const [money, setMoney] = useState(100);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [showStrike, setShowStrike] = useState(false);

  const ROBOT_COST = 50;
  const TARGET_VALUE = 500;
  const STRIKE_THRESHOLD = 30; // Worker health below this triggers strike

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });

      // Auto production from robots
      setRobots((prevRobots) =>
        prevRobots.map((robot) => {
          if (robot.condition > 0) {
            setSurplusValue((prev) => prev + 5);
            return { ...robot, condition: robot.condition - 1 };
          }
          return robot;
        })
      );

      // Worker recovery
      setWorkers((prevWorkers) =>
        prevWorkers.map((worker) => ({
          ...worker,
          health: Math.min(100, worker.health + 2),
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, gameOver]);

  // Check for strike
  useEffect(() => {
    const unhappyWorkers = workers.filter((w) => w.health < STRIKE_THRESHOLD);
    if (unhappyWorkers.length >= 2 && !showStrike) {
      triggerStrike();
    }
  }, [workers]);

  const triggerStrike = () => {
    setShowStrike(true);
    setMessage("⚠️ ĐÌNH CÔNG! Công nhân yêu cầu cải thiện điều kiện!");
    setTimeout(() => setShowStrike(false), 3000);
  };

  const exploitWorker = (workerId) => {
    setWorkers((prevWorkers) =>
      prevWorkers.map((worker) => {
        if (worker.id === workerId && worker.health > 10) {
          setSurplusValue((prev) => prev + worker.productivity);
          return { ...worker, health: worker.health - 15 };
        }
        return worker;
      })
    );
  };

  const buyRobot = () => {
    if (money >= ROBOT_COST) {
      setMoney(money - ROBOT_COST);
      setRobots([
        ...robots,
        { id: Date.now(), condition: 100, productivity: 5 },
      ]);
      setMessage("🤖 Đã mua Robot AI! Tự động sản xuất giá trị thặng dư.");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const convertToMoney = () => {
    const converted = Math.floor(surplusValue / 10);
    setMoney(money + converted);
    setSurplusValue(surplusValue % 10);
    setMessage(`💰 Đã chuyển đổi thành ${converted} tiền!`);
    setTimeout(() => setMessage(""), 2000);
  };

  const startGame = () => {
    setIsPlaying(true);
    setMessage("🎮 Game bắt đầu! Hãy thu thập giá trị thặng dư!");
    setTimeout(() => setMessage(""), 2000);
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
  };

  const resetGame = () => {
    setWorkers([
      { id: 1, health: 100, productivity: 10, position: 0 },
      { id: 2, health: 100, productivity: 10, position: 1 },
      { id: 3, health: 100, productivity: 10, position: 2 },
      { id: 4, health: 100, productivity: 10, position: 3 },
    ]);
    setRobots([]);
    setSurplusValue(0);
    setMoney(100);
    setTimeLeft(120);
    setIsPlaying(false);
    setGameOver(false);
    setMessage("");
  };

  if (gameOver) {
    const success = surplusValue >= TARGET_VALUE;
    const workerAbuse = workers.filter((w) => w.health < 50).length >= 3;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        {success && <Confetti recycle={false} numberOfPieces={200} />}
        <h2 className="text-4xl font-bold mb-4">
          {success ? "🎉 Thắng!" : "😢 Thua!"}
        </h2>
        <div className="bg-black/60 border border-cyber-blue rounded-xl p-6 max-w-2xl mx-auto mb-6">
          <p className="text-2xl text-cyber-blue mb-4">
            Giá trị thặng dư: {surplusValue}/{TARGET_VALUE}
          </p>
          <div className="bg-revolutionary-gold/10 border border-revolutionary-gold/30 rounded-lg p-4 mb-4">
            <p className="text-cream-white/90 leading-relaxed">
              {workerAbuse && success ? (
                <>
                  ⚠️ <strong>Bạn thu được nhiều giá trị thặng dư</strong>, nhưng công nhân kiệt
                  sức! 
                  <br />
                  <span className="text-revolutionary-gold italic text-sm">
                    "Lợi nhuận cao đến từ đâu? Từ máu và mồ hôi của họ!" - Marx
                  </span>
                </>
              ) : success ? (
                <>
                  ✅ <strong>Bạn cân bằng tốt</strong> giữa bóc lột và duy trì sức lao động!
                  <br />
                  <span className="text-neural-green italic text-sm">
                    "Nhưng đừng quên: Giá trị thặng dư vẫn đến từ lao động công nhân."
                  </span>
                </>
              ) : (
                <>
                  ❌ <strong>Bạn chưa đạt mục tiêu!</strong> Hãy thử tối ưu chiến lược.
                  <br />
                  <span className="text-cyber-blue italic text-sm">
                    "Robot không tự tạo giá trị mới, chỉ lao động sống mới làm được!"
                  </span>
                </>
              )}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="bg-steel-gray/20 rounded p-3">
              <div className="text-cream-white/60">Công nhân</div>
              <div className="text-xl font-bold text-neural-green">
                {workers.filter((w) => w.health > 50).length}/4
              </div>
            </div>
            <div className="bg-steel-gray/20 rounded p-3">
              <div className="text-cream-white/60">Robot AI</div>
              <div className="text-xl font-bold text-cyber-blue">
                {robots.length}
              </div>
            </div>
            <div className="bg-steel-gray/20 rounded p-3">
              <div className="text-cream-white/60">Tiền</div>
              <div className="text-xl font-bold text-revolutionary-gold">
                ${money}
              </div>
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="bg-cyber-blue text-black px-8 py-3 rounded-lg font-bold"
        >
          Chơi Lại
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-revolutionary-gold/20 border border-revolutionary-gold/50 rounded-lg p-3">
          <div className="text-xs text-cream-white/60 mb-1">Giá trị Thặng dư</div>
          <div className="text-2xl font-bold text-revolutionary-gold">
            {surplusValue}💧
          </div>
        </div>
        <div className="bg-cyber-blue/20 border border-cyber-blue/50 rounded-lg p-3">
          <div className="text-xs text-cream-white/60 mb-1">Tiền</div>
          <div className="text-2xl font-bold text-cyber-blue">${money}</div>
        </div>
        <div className="bg-neural-green/20 border border-neural-green/50 rounded-lg p-3">
          <div className="text-xs text-cream-white/60 mb-1">Thời gian</div>
          <div className="text-2xl font-bold text-neural-green">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
          </div>
        </div>
        <div className="bg-steel-gray/20 border border-steel-gray/50 rounded-lg p-3">
          <div className="text-xs text-cream-white/60 mb-1">Mục tiêu</div>
          <div className="text-2xl font-bold text-cream-white">
            {TARGET_VALUE}💧
          </div>
        </div>
      </div>

      {/* Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mb-4 p-4 rounded-lg border text-center font-bold ${
              showStrike
                ? "bg-red-500/20 border-red-500"
                : "bg-cyber-blue/20 border-cyber-blue/50"
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {!isPlaying ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <h3 className="text-3xl font-bold text-cyber-blue mb-4">
            🏭 Nhà Máy Ma Cà Rồng
          </h3>
          <p className="text-cream-white/80 mb-6 max-w-2xl mx-auto">
            Bạn là nhà tư bản! Mục tiêu: Thu thập <strong>{TARGET_VALUE} giọt máu giá trị
            thặng dư</strong> trong 2 phút. Click công nhân để bóc lột, mua robot AI để tự động
            sản xuất. Nhưng cẩn thận: kiệt sức quá sẽ đình công!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="bg-revolutionary-gold text-black px-8 py-3 rounded-lg font-bold"
          >
            Bắt Đầu Chơi
          </motion.button>
        </motion.div>
      ) : (
        <>
          {/* Factory Floor */}
          <div className="bg-gradient-to-b from-steel-gray/20 to-black/40 border border-cyber-blue/30 rounded-xl p-6 mb-6">
            <h4 className="text-xl font-bold text-cyber-blue mb-4">
              🏭 Dây Chuyền Sản Xuất
            </h4>
            
            {/* Workers */}
            <div className="mb-6">
              <div className="text-sm text-cream-white/60 mb-2">Công nhân (Click để bóc lột):</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {workers.map((worker) => (
                  <motion.button
                    key={worker.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => exploitWorker(worker.id)}
                    disabled={worker.health < 10}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      worker.health > 60
                        ? "bg-neural-green/20 border-neural-green/50"
                        : worker.health > 30
                        ? "bg-revolutionary-gold/20 border-revolutionary-gold/50"
                        : "bg-red-500/20 border-red-500/50"
                    } ${worker.health < 10 ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="text-3xl mb-2">👷</div>
                    <div className="text-xs text-cream-white/60 mb-1">Công nhân {worker.id}</div>
                    <div className="w-full bg-black/40 rounded-full h-2 mb-1">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          worker.health > 60
                            ? "bg-neural-green"
                            : worker.health > 30
                            ? "bg-revolutionary-gold"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${worker.health}%` }}
                      />
                    </div>
                    <div className="text-xs font-bold">HP: {worker.health}%</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Robots */}
            <div>
              <div className="text-sm text-cream-white/60 mb-2">Robot AI (Tự động):</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                {robots.map((robot) => (
                  <div
                    key={robot.id}
                    className="p-4 rounded-lg border-2 bg-cyber-blue/20 border-cyber-blue/50"
                  >
                    <div className="text-3xl mb-2">🤖</div>
                    <div className="text-xs text-cream-white/60 mb-1">Robot AI</div>
                    <div className="w-full bg-black/40 rounded-full h-2 mb-1">
                      <div
                        className="h-2 rounded-full bg-cyber-blue transition-all"
                        style={{ width: `${robot.condition}%` }}
                      />
                    </div>
                    <div className="text-xs font-bold">Độ bền: {robot.condition}%</div>
                  </div>
                ))}
                {robots.length < 4 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={buyRobot}
                    disabled={money < ROBOT_COST}
                    className="p-4 rounded-lg border-2 border-dashed border-cyber-blue/30 hover:border-cyber-blue/60 hover:bg-cyber-blue/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="text-3xl mb-2">➕</div>
                    <div className="text-xs text-cream-white/80">Mua Robot</div>
                    <div className="text-xs font-bold text-cyber-blue">${ROBOT_COST}</div>
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={convertToMoney}
              disabled={surplusValue < 10}
              className="bg-revolutionary-gold/20 border-2 border-revolutionary-gold text-revolutionary-gold px-6 py-3 rounded-lg font-bold hover:bg-revolutionary-gold hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              💰 Bán GTTD (10💧 = $1)
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={endGame}
              className="bg-red-500/20 border-2 border-red-500 text-red-500 px-6 py-3 rounded-lg font-bold hover:bg-red-500 hover:text-black transition-all"
            >
              ⏹️ Kết Thúc
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default Game2_SurplusValue;
