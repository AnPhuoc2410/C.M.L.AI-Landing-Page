import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const Game2_SurplusValue = () => {
  const [workers, setWorkers] = useState([
    { id: 1, health: 100, productivity: 20, position: 0 },
    { id: 2, health: 100, productivity: 20, position: 1 },
    { id: 3, health: 100, productivity: 20, position: 2 },
    { id: 4, health: 100, productivity: 20, position: 3 },
  ]);
  const [nextWorkerId, setNextWorkerId] = useState(5);
  const [robots, setRobots] = useState([]);
  const [surplusValue, setSurplusValue] = useState(0);
  const [money, setMoney] = useState(100);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [showStrike, setShowStrike] = useState(false);
  const [isOnStrike, setIsOnStrike] = useState(false);

  const ROBOT_COST = 50;
  const ROBOT_REPAIR_COST = 30;
  const MAX_ROBOTS = 6;
  const WORKER_HIRE_COST = 40;
  const TARGET_VALUE = 500;
  const STRIKE_THRESHOLD = 30; // Worker health below this triggers strike
  const CRITICAL_WORKERS_THRESHOLD = 3; // Number of critical health workers to trigger strike

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
      setRobots((prevRobots) => {
        return prevRobots.map((robot) => {
          if (robot.isBroken) {
            // Check if 5 seconds passed since breakdown
            if (Date.now() - robot.brokenTime >= 5000) {
              setMessage("💥 Robot bị hỏng hoàn toàn và biến mất!");
              setTimeout(() => setMessage(""), 2000);
              return null; // Will be filtered out
            }
            return robot;
          }
          
          if (robot.condition > 0) {
            setSurplusValue((prev) => prev + 5);
            const newCondition = robot.condition - 1;
            
            // Random breakdown chance 
            const breakdownChance = robot.condition < 40 ? 0.08 : 
                        robot.condition < 75 ? 0.03 : 0.01;  
            const randomBreakdown = Math.random() < breakdownChance;
            
            if (randomBreakdown) {
              setMessage("⚠️ Robot bị hỏng đột ngột! Sửa ngay hoặc mất sau 5s!");
              setTimeout(() => setMessage(""), 2000);
              return { ...robot, condition: newCondition, isBroken: true, brokenTime: Date.now() };
            }
            
            return { ...robot, condition: newCondition };
          }
          return robot;
        }).filter(r => r !== null); // Remove destroyed robots
      });

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

  // Check for strike - 3 workers with health < 10
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    
    const criticalWorkers = workers.filter((w) => w.health < 10);
    
    if (criticalWorkers.length >= CRITICAL_WORKERS_THRESHOLD && !isOnStrike) {
      // Start strike
      setIsOnStrike(true);
      setShowStrike(true);
      setMessage("🚨 ĐÌNH CÔNG! 3+ công nhân kiệt sức! Tất cả ngừng làm việc!");
    } else if (criticalWorkers.length < CRITICAL_WORKERS_THRESHOLD && isOnStrike) {
      // End strike
      setIsOnStrike(false);
      setShowStrike(false);
      setMessage("✅ Đình công kết thúc! Công nhân quay lại làm việc.");
      setTimeout(() => setMessage(""), 2000);
    }
  }, [workers, isPlaying, gameOver, isOnStrike]);

  const exploitWorker = (workerId) => {
    // Cannot exploit during strike
    if (isOnStrike) {
      setMessage("✊ Đang đình công! Không thể bóc lột công nhân!");
      setTimeout(() => setMessage(""), 1500);
      return;
    }
    
    setWorkers((prevWorkers) =>
      prevWorkers.map((worker) => {
        if (worker.id === workerId && worker.health > 10) {
          const newHealth = Math.max(0, worker.health - 15); // Đảm bảo không âm
          setSurplusValue((prev) => prev + worker.productivity);
          return { ...worker, health: newHealth };
        }
        return worker;
      })
    );
  };

  const buyRobot = () => {
    if (robots.length >= MAX_ROBOTS) {
      setMessage("⚠️ Đã đạt giới hạn tối đa 6 robot!");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    
    if (money >= ROBOT_COST) {
      setMoney(money - ROBOT_COST);
      setRobots([
        ...robots,
        { id: Date.now(), condition: 100, productivity: 5, isBroken: false, brokenTime: null },
      ]);
      setMessage("🤖 Đã mua Robot AI! Tự động sản xuất giá trị thặng dư.");
      setTimeout(() => setMessage(""), 2000);
    } else {
      setMessage("💰 Không đủ tiền mua robot!");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const repairRobot = (robotId) => {
    if (money >= ROBOT_REPAIR_COST) {
      setMoney(money - ROBOT_REPAIR_COST);
      setRobots(prevRobots =>
        prevRobots.map(robot =>
          robot.id === robotId
            ? { ...robot, condition: 100, isBroken: false, brokenTime: null }
            : robot
        )
      );
      setMessage("🔧 Đã sửa chữa robot!");
      setTimeout(() => setMessage(""), 2000);
    } else {
      setMessage(`💰 Không đủ tiền! Cần $${ROBOT_REPAIR_COST}`);
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const hireWorker = () => {
    if (money >= WORKER_HIRE_COST) {
      setMoney(money - WORKER_HIRE_COST);
      setWorkers([
        ...workers,
        { id: nextWorkerId, health: 100, productivity: 10, position: workers.length },
      ]);
      setNextWorkerId(nextWorkerId + 1);
      setMessage("👷 Đã thuê công nhân mới!");
      setTimeout(() => setMessage(""), 2000);
    } else {
      setMessage(`💰 Không đủ tiền! Cần $${WORKER_HIRE_COST}`);
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const fireWorker = (workerId) => {
    if (workers.length <= 1) {
      setMessage("⚠️ Phải giữ ít nhất 1 công nhân!");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    
    const refund = Math.floor(WORKER_HIRE_COST / 2); // Thu hồi 1/2 giá thuê
    setWorkers(workers.filter(w => w.id !== workerId));
    setMoney(money + refund);
    setMessage(`❌ Đã sa thải! Thu về $${refund}`);
    setTimeout(() => setMessage(""), 2000);
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
    setNextWorkerId(5);
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
                  <div
                    key={worker.id}
                    className={`relative p-4 rounded-lg border-2 transition-all ${
                      isOnStrike 
                        ? "bg-red-600/30 border-red-600 animate-pulse"
                        : worker.health > 70
                        ? "bg-green-500/20 border-green-500/60 hover:border-green-400"
                        : worker.health > 40
                        ? "bg-yellow-500/20 border-yellow-500/60 hover:border-yellow-400"
                        : worker.health > 10
                        ? "bg-orange-500/20 border-orange-500/60 hover:border-orange-400"
                        : "bg-red-500/30 border-red-500/70 hover:border-red-400"
                    } ${worker.health < 10 || isOnStrike ? "opacity-70" : ""}`}
                  >
                    {/* Fire button - top right corner */}
                    {workers.length > 1 && !isOnStrike && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          fireWorker(worker.id);
                        }}
                        className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg transition-all hover:scale-110 z-10"
                        title="Sa thải (Thu về $20)"
                      >
                        ✕
                      </button>
                    )}
                    
                    <motion.button
                      whileHover={{ scale: isOnStrike ? 1 : 1.05 }}
                      whileTap={{ scale: isOnStrike ? 1 : 0.95 }}
                      onClick={() => exploitWorker(worker.id)}
                      disabled={worker.health < 10 || isOnStrike}
                      className={`w-full ${isOnStrike ? 'cursor-not-allowed' : ''}`}
                    >
                      <div className="text-3xl mb-2">
                        {isOnStrike ? '✊😠' : '👷'}
                      </div>
                      <div className="text-xs text-cream-white/60 mb-1">
                        {isOnStrike ? '🚨 ĐÌNH CÔNG!' : `Công nhân ${worker.id}`}
                      </div>
                      <div className="w-full bg-black/60 rounded-full h-2.5 mb-1 border border-black/80">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            worker.health > 70
                              ? "bg-gradient-to-r from-green-400 to-green-500 shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                              : worker.health > 40
                              ? "bg-gradient-to-r from-yellow-400 to-orange-500 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                              : worker.health > 10
                              ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                              : "bg-gradient-to-r from-red-600 to-red-800 shadow-[0_0_12px_rgba(220,38,38,0.8)] animate-pulse"
                          }`}
                          style={{ width: `${Math.max(0, worker.health)}%` }}
                        />
                      </div>
                      <div className={`text-xs font-bold ${
                        worker.health > 70 ? 'text-green-400' :
                        worker.health > 40 ? 'text-yellow-400' :
                        worker.health > 10 ? 'text-orange-500' :
                        'text-red-500 animate-pulse'
                      }`}>
                        HP: {Math.max(0, worker.health)}%
                      </div>
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>

            {/* Robots */}
            <div>
              <div className="text-sm text-cream-white/60 mb-2">Robot AI (Tự động) - Tối đa {MAX_ROBOTS}:</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                {robots.map((robot) => {
                  const timeLeft = robot.isBroken ? Math.max(0, 5 - Math.floor((Date.now() - robot.brokenTime) / 1000)) : null;
                  
                  return (
                    <div
                      key={robot.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        robot.isBroken 
                          ? "bg-red-500/20 border-red-500/50 animate-pulse" 
                          : "bg-cyber-blue/20 border-cyber-blue/50"
                      }`}
                    >
                      <div className="text-3xl mb-2">{robot.isBroken ? "💥🤖" : "🤖"}</div>
                      <div className="text-xs text-cream-white/60 mb-1">
                        {robot.isBroken ? `⚠️ HỎng (${timeLeft}s)` : "Robot AI"}
                      </div>
                      <div className="w-full bg-black/40 rounded-full h-2 mb-1">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            robot.isBroken ? "bg-red-500" : "bg-cyber-blue"
                          }`}
                          style={{ width: `${robot.condition}%` }}
                        />
                      </div>
                      <div className="text-xs font-bold mb-2">Độ bền: {robot.condition}%</div>
                      {robot.isBroken && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            repairRobot(robot.id);
                          }}
                          disabled={money < ROBOT_REPAIR_COST}
                          className="w-full bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1.5 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          🔧 Sửa (${ROBOT_REPAIR_COST})
                        </motion.button>
                      )}
                    </div>
                  );
                })}
                {robots.length < MAX_ROBOTS && (
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
                    <div className="text-xs text-cream-white/50 mt-1">{robots.length}/{MAX_ROBOTS}</div>
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-3 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={hireWorker}
              disabled={money < WORKER_HIRE_COST}
              className="bg-neural-green/20 border-2 border-neural-green text-neural-green px-6 py-3 rounded-lg font-bold hover:bg-neural-green hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              👷 Thuê CN (${WORKER_HIRE_COST})
            </motion.button>
            
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
