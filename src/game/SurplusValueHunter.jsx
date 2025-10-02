import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SurplusValueHunter = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameOver
  const [score, setScore] = useState(0);
  const [money, setMoney] = useState(100);
  const [timeLeft, setTimeLeft] = useState(60);
  const [workers, setWorkers] = useState([]);
  const [robots, setRobots] = useState([]);
  const [strikes, setStrikes] = useState(0);
  const [workerRevolt, setWorkerRevolt] = useState(false);

  // Worker class
  const createWorker = (id) => ({
    id,
    health: 100,
    productivity: 10,
    position: { x: Math.random() * 70 + 10, y: Math.random() * 60 + 20 },
    isWorking: false,
    mood: 'normal', // normal, tired, angry
  });

  // Start game
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setMoney(100);
    setTimeLeft(60);
    setStrikes(0);
    setWorkerRevolt(false);
    setWorkers([
      createWorker(1),
      createWorker(2),
      createWorker(3),
      createWorker(4),
    ]);
    setRobots([]);
  };

  // Timer countdown
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameState('gameOver');
    }
  }, [gameState, timeLeft]);

  // Robot auto-production
  useEffect(() => {
    if (gameState === 'playing' && robots.length > 0) {
      const robotInterval = setInterval(() => {
        robots.forEach((robot) => {
          if (robot.status === 'working') {
            setScore((s) => s + 5);
            setMoney((m) => m - 1); // Maintenance cost
          }
        });
      }, 1000);
      return () => clearInterval(robotInterval);
    }
  }, [gameState, robots]);

  // Check worker revolt
  useEffect(() => {
    const unhappyWorkers = workers.filter((w) => w.health < 30).length;
    if (unhappyWorkers >= 3) {
      setWorkerRevolt(true);
      setGameState('gameOver');
    }
  }, [workers]);

  // Click worker to extract surplus value
  const extractValue = useCallback(
    (workerId) => {
      setWorkers((prevWorkers) =>
        prevWorkers.map((worker) => {
          if (worker.id === workerId && worker.health > 0) {
            const newHealth = Math.max(0, worker.health - 15);
            const points = worker.productivity;

            // Add score
            setScore((s) => s + points);

            // Worker reaction
            let newMood = 'normal';
            if (newHealth < 30) {
              newMood = 'angry';
              // Chance of strike
              if (Math.random() < 0.3) {
                setStrikes((s) => s + 1);
              }
            } else if (newHealth < 60) {
              newMood = 'tired';
            }

            return {
              ...worker,
              health: newHealth,
              mood: newMood,
              isWorking: true,
            };
          }
          return worker;
        })
      );

      // Reset working animation
      setTimeout(() => {
        setWorkers((prevWorkers) =>
          prevWorkers.map((w) =>
            w.id === workerId ? { ...w, isWorking: false } : w
          )
        );
      }, 500);
    },
    []
  );

  // Buy robot
  const buyRobot = () => {
    if (money >= 50 && robots.length < 4) {
      setMoney(money - 50);
      setRobots([
        ...robots,
        {
          id: robots.length + 1,
          status: 'working',
          position: {
            x: Math.random() * 70 + 10,
            y: Math.random() * 60 + 20,
          },
        },
      ]);
    }
  };

  // Heal worker
  const healWorker = (workerId) => {
    if (money >= 10) {
      setMoney(money - 10);
      setWorkers((prevWorkers) =>
        prevWorkers.map((w) =>
          w.id === workerId
            ? { ...w, health: Math.min(100, w.health + 30), mood: 'normal' }
            : w
        )
      );
    }
  };

  // Get Marx commentary
  const getMarxCommentary = () => {
    const robotRatio = robots.length / (workers.length + robots.length);
    const avgWorkerHealth =
      workers.reduce((sum, w) => sum + w.health, 0) / workers.length;

    if (workerRevolt) {
      return '"Những người không có gì để mất ngoài xiềng xích của họ!" - Người lao động đã nổi dậy chống lại sự khai thác của bạn!';
    }
    if (robotRatio > 0.5) {
      return `"AI không tạo ra giá trị mới, chỉ chuyển giao giá trị do lao động con người tạo ra." - Bạn đã đầu tư ${(
        robotRatio * 100
      ).toFixed(0)}% vào robot, nhưng lợi nhuận thực chỉ đến từ khai thác lao động!`;
    }
    if (avgWorkerHealth < 40) {
      return '"Tư bản là lao động chết, giống như ma cà rồng, chỉ sống bằng cách hút máu lao động sống." - Bạn đã khai thác công nhân đến mức kiệt sức!';
    }
    if (strikes > 2) {
      return `"Lịch sử của mọi xã hội tồn tại cho đến nay là lịch sử của đấu tranh giai cấp." - ${strikes} cuộc đình công đã xảy ra vì sự bóc lột của bạn!`;
    }
    if (score > 500 && avgWorkerHealth > 60) {
      return '"Giá trị thặng dư = Giá trị do công nhân tạo ra - Tiền lương họ nhận." - Bạn đã tạo lợi nhuận nhưng vẫn giữ công nhân khỏe mạnh... Một nhà tư bản "khôn ngoan"?';
    }
    return `"Giá trị thặng dư là nguồn gốc của lợi nhuận tư bản." - Bạn đã trích xuất ${score} điểm giá trị thặng dư từ lao động của công nhân!`;
  };

  // Menu Screen
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-communist-red/30 to-revolutionary-gold/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full text-center"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-8xl mb-6"
          >
            🧛
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-cream-white mb-4">
            Thợ Săn Giá Trị Thặng Dư
          </h1>
          <p className="text-revolutionary-gold text-xl mb-2">
            Vampire Capitalist Tycoon
          </p>
          <p className="text-cyber-blue text-sm mb-8">
            🏭 Lao Động & Giá Trị Thặng Dư 💰
          </p>

          <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 mb-6 border-2 border-communist-red/50">
            <h3 className="text-revolutionary-gold font-bold text-lg mb-4">
              🎮 Cách Chơi
            </h3>
            <div className="text-cream-white/90 text-left space-y-3 text-sm">
              <p>
                <strong className="text-communist-red">👨‍🏭 Click công nhân:</strong>{' '}
                Trích xuất giá trị thặng dư (+10 điểm) nhưng giảm sức khỏe (-15
                HP)
              </p>
              <p>
                <strong className="text-cyber-blue">🤖 Mua robot (50đ):</strong>{' '}
                Tự động tạo điểm (+5/giây) nhưng tốn bảo trì (-1đ/giây)
              </p>
              <p>
                <strong className="text-neural-green">💊 Chữa công nhân (10đ):</strong>{' '}
                Hồi 30 HP, tránh đình công và nổi dậy
              </p>
              <p>
                <strong className="text-revolutionary-gold">⚠️ Cẩn thận:</strong>{' '}
                Công nhân kiệt sức sẽ đình công hoặc nổi dậy!
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="w-full bg-gradient-to-r from-communist-red to-revolutionary-gold text-cream-white font-bold py-4 rounded-xl text-xl shadow-2xl mb-3"
          >
            Bắt Đầu Khai Thác →
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/game')}
            className="w-full bg-steel-gray/30 hover:bg-steel-gray/50 text-cream-white py-3 rounded-xl transition-all"
          >
            ← Quay Về Game Hub
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Game Over Screen
  if (gameState === 'gameOver') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-communist-red/40 to-revolutionary-gold/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-revolutionary-gold">
            <div className="text-center mb-6">
              <div className="text-7xl mb-4">
                {workerRevolt ? '⚔️' : '🧛'}
              </div>
              <h2 className="text-4xl font-bold text-cream-white mb-2">
                {workerRevolt ? 'Cách Mạng Công Nhân!' : 'Hết Giờ!'}
              </h2>
              <p className="text-revolutionary-gold text-lg">
                Giá trị thặng dư thu được: <strong>{score}</strong> điểm
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-communist-red/20 rounded-xl p-4 border border-communist-red/50">
                <div className="text-3xl mb-2">👨‍🏭</div>
                <div className="text-cream-white text-sm">Công nhân còn lại</div>
                <div className="text-2xl font-bold text-cream-white">
                  {workers.filter((w) => w.health > 0).length}/
                  {workers.length}
                </div>
              </div>
              <div className="bg-cyber-blue/20 rounded-xl p-4 border border-cyber-blue/50">
                <div className="text-3xl mb-2">🤖</div>
                <div className="text-cream-white text-sm">Robot AI</div>
                <div className="text-2xl font-bold text-cream-white">
                  {robots.length}
                </div>
              </div>
              <div className="bg-revolutionary-gold/20 rounded-xl p-4 border border-revolutionary-gold/50">
                <div className="text-3xl mb-2">⚔️</div>
                <div className="text-cream-white text-sm">Đình công</div>
                <div className="text-2xl font-bold text-cream-white">
                  {strikes}
                </div>
              </div>
              <div className="bg-neural-green/20 rounded-xl p-4 border border-neural-green/50">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-cream-white text-sm">Tiền còn lại</div>
                <div className="text-2xl font-bold text-cream-white">
                  {money}đ
                </div>
              </div>
            </div>

            <div className="bg-communist-red/20 rounded-2xl p-6 mb-6 border-2 border-revolutionary-gold/50">
              <div className="flex items-start gap-4">
                <div className="text-5xl">🧔</div>
                <div>
                  <h3 className="text-revolutionary-gold font-bold text-lg mb-2">
                    Phân Tích Của Marx:
                  </h3>
                  <p className="text-cream-white italic text-sm leading-relaxed">
                    {getMarxCommentary()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={startGame}
                className="flex-1 bg-gradient-to-r from-communist-red to-revolutionary-gold text-cream-white font-bold py-4 rounded-xl"
              >
                🔄 Chơi Lại
              </button>
              <button
                onClick={() => navigate('/game')}
                className="flex-1 bg-steel-gray/30 hover:bg-steel-gray/50 text-cream-white font-semibold py-4 rounded-xl"
              >
                ← Game Hub
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Playing Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-steel-gray/20 to-communist-red/20 p-4">
      <div className="max-w-7xl mx-auto">
        {/* HUD */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <div className="flex gap-4">
            <div className="bg-black/60 backdrop-blur-xl rounded-xl px-4 py-2 border-2 border-revolutionary-gold/50">
              <div className="text-revolutionary-gold text-xs">Giá Trị Thặng Dư</div>
              <div className="text-cream-white text-2xl font-bold">{score}</div>
            </div>
            <div className="bg-black/60 backdrop-blur-xl rounded-xl px-4 py-2 border-2 border-neural-green/50">
              <div className="text-neural-green text-xs">Tiền</div>
              <div className="text-cream-white text-2xl font-bold">{money}đ</div>
            </div>
            <div className="bg-black/60 backdrop-blur-xl rounded-xl px-4 py-2 border-2 border-cyber-blue/50">
              <div className="text-cyber-blue text-xs">Thời Gian</div>
              <div className="text-cream-white text-2xl font-bold">{timeLeft}s</div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={buyRobot}
              disabled={money < 50 || robots.length >= 4}
              className="bg-cyber-blue/20 hover:bg-cyber-blue/30 disabled:opacity-50 text-cream-white px-4 py-2 rounded-xl border-2 border-cyber-blue/50 font-semibold transition-all"
            >
              🤖 Mua Robot (50đ)
            </button>
            <button
              onClick={() => navigate('/game')}
              className="bg-steel-gray/30 hover:bg-steel-gray/50 text-cream-white px-4 py-2 rounded-xl font-semibold"
            >
              ← Thoát
            </button>
          </div>
        </div>

        {/* Strikes Warning */}
        {strikes > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-communist-red/80 rounded-xl p-3 mb-4 border-2 border-revolutionary-gold text-center"
          >
            <span className="text-cream-white font-bold">
              ⚠️ Đình công: {strikes} lần - Công nhân đang phản kháng!
            </span>
          </motion.div>
        )}

        {/* Factory Floor */}
        <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-6 border-2 border-steel-gray/50 relative h-[500px]">
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Workers */}
            <AnimatePresence>
              {workers.map((worker) => (
                <motion.div
                  key={worker.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  style={{
                    position: 'absolute',
                    left: `${worker.position.x}%`,
                    top: `${worker.position.y}%`,
                  }}
                  className="cursor-pointer"
                  onClick={() => worker.health > 0 && extractValue(worker.id)}
                >
                  <motion.div
                    animate={
                      worker.isWorking ? { scale: [1, 1.2, 1] } : { scale: 1 }
                    }
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className="text-4xl">
                      {worker.health === 0
                        ? '😵'
                        : worker.mood === 'angry'
                        ? '😡'
                        : worker.mood === 'tired'
                        ? '😓'
                        : '👨‍🏭'}
                    </div>
                    {/* Health bar */}
                    {worker.health > 0 && (
                      <div className="absolute -bottom-2 left-0 w-12 bg-black/60 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            worker.health < 30
                              ? 'bg-communist-red'
                              : worker.health < 60
                              ? 'bg-revolutionary-gold'
                              : 'bg-neural-green'
                          }`}
                          style={{ width: `${worker.health}%` }}
                        />
                      </div>
                    )}
                    {/* Heal button */}
                    {worker.health > 0 && worker.health < 70 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          healWorker(worker.id);
                        }}
                        className="absolute -top-6 left-0 bg-neural-green/80 text-white text-xs px-2 py-1 rounded"
                      >
                        💊 10đ
                      </button>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Robots */}
            <AnimatePresence>
              {robots.map((robot) => (
                <motion.div
                  key={`robot-${robot.id}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  style={{
                    position: 'absolute',
                    left: `${robot.position.x}%`,
                    top: `${robot.position.y}%`,
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                    className="text-4xl"
                  >
                    🤖
                  </motion.div>
                  <div className="absolute -bottom-2 left-0 text-cyber-blue text-xs font-bold">
                    +5/s
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Info Panel */}
        <div className="mt-4 bg-black/60 backdrop-blur-xl rounded-xl p-4 border-2 border-revolutionary-gold/50">
          <div className="flex items-center justify-between flex-wrap gap-4 text-sm text-cream-white">
            <div>
              <span className="text-revolutionary-gold font-bold">💡 Tip:</span>{' '}
              Robot AI không tạo giá trị mới, chỉ chuyển giao giá trị từ lao
              động!
            </div>
            <div className="flex gap-4">
              <div>
                Công nhân: {workers.filter((w) => w.health > 0).length}/
                {workers.length}
              </div>
              <div>Robot: {robots.length}/4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurplusValueHunter;
