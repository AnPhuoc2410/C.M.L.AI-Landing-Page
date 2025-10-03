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
  const [showNameForm, setShowNameForm] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);
  const [currentPlayerData, setCurrentPlayerData] = useState(null); // Lưu data của người chơi hiện tại

  const ROBOT_COST = 50;
  const ROBOT_REPAIR_COST = 30;
  const MAX_ROBOTS = 6;
  const WORKER_HIRE_COST = 40;
  const TARGET_VALUE = 300;
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
    
    
    setShowNameForm(true);
  };

  const calculateScore = () => {
    // Điểm = GTTD + Tiền × 8
    return surplusValue + money * 8;
  };

  // Hàm kiểm tra xem player có phải là người chơi hiện tại không
  const isCurrentPlayer = (player) => {
    if (!currentPlayerData) return false;
    
    // 1. So sánh tên (bắt buộc phải trùng)
    if (player.name !== currentPlayerData.name) return false;
    
    // 2. So sánh thời gian (date string)
    if (player.date !== currentPlayerData.date) return false;
    
    // 3. So sánh điểm
    if (player.score !== currentPlayerData.score) return false;
    
    // 4. So sánh GTTD
    if (player.surplusValue !== currentPlayerData.surplusValue) return false;
    
    // Nếu tất cả đều trùng → Đây là người chơi hiện tại
    return true;
  };

  const saveResultToSheet = async () => {
    if (!playerName.trim()) {
      setSaveMessage("❌ Vui lòng nhập tên!");
      setTimeout(() => setSaveMessage(""), 2000);
      return;
    }

    setIsSaving(true);
    setSaveMessage("💾 Đang lưu kết quả...");

    try {
      const score = calculateScore();
      const timestamp = Date.now(); // Timestamp chính xác để so sánh
      const currentDate = new Date().toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh"
      });

      const data = {
        name: playerName.trim(),
        surplusValue: surplusValue,
        money: money,
        score: score,
        date: currentDate
      };

      // Lưu data của người chơi hiện tại để so sánh sau (bao gồm timestamp)
      setCurrentPlayerData({
        name: playerName.trim(),
        score: score,
        surplusValue: surplusValue,
        money: money,
        date: currentDate,
        timestamp: timestamp // Lưu timestamp để so sánh chính xác
      });

      const sheetUrl = import.meta.env.VITE_SHEET_URL;
      
      console.log("📤 Đang gửi dữ liệu lên Google Sheet...");
      console.log("🔗 URL:", sheetUrl);
      console.log("📊 Data:", data);

      const response = await fetch(sheetUrl, {
        method: "POST",
        mode: "no-cors", // Important for Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("✅ Response:", response);
      console.log("📝 Status:", response.status, response.statusText);

      // With no-cors, we can't read the response, so assume success
      setSaveMessage("✅ Đã lưu kết quả thành công!");
      setShowNameForm(false);
      setTimeout(() => setSaveMessage(""), 3000);
      
      // Fetch leaderboard sau khi lưu thành công
      setTimeout(() => {
        fetchLeaderboard();
      }, 1000);
      
    } catch (error) {
      console.error("❌ Lỗi khi lưu:", error);
      setSaveMessage("❌ Lỗi khi lưu. Vui lòng thử lại!");
      setTimeout(() => setSaveMessage(""), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const fetchLeaderboard = async () => {
    setIsLoadingLeaderboard(true);
    console.log("📊 Đang tải bảng xếp hạng...");

    try {
      const sheetUrl = import.meta.env.VITE_SHEET_URL;
      const response = await fetch(sheetUrl, {
        method: "GET",
        mode: "cors",
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Leaderboard data:", result);

        if (result.success && result.data) {
          // data[0] là header, data[1..n] là các dòng dữ liệu
          const rows = result.data.slice(1); // Bỏ header
          
          // Parse và sort theo điểm (cột index 3)
          const leaderboard = rows
            .map(row => ({
              name: row[0] || "Unknown",
              surplusValue: parseInt(row[1]) || 0,
              money: parseInt(row[2]) || 0,
              score: parseInt(row[3]) || 0,
              date: row[4] || ""
            }))
            .sort((a, b) => b.score - a.score) // Sắp xếp giảm dần theo điểm
            .slice(0, 10); // Lấy top 10

          setLeaderboardData(leaderboard);
          setShowLeaderboard(true);
          console.log("🏆 Top 10:", leaderboard);
        }
      } else {
        console.error("❌ Lỗi fetch leaderboard:", response.status);
      }
    } catch (error) {
      console.error("❌ Lỗi khi tải leaderboard:", error);
    } finally {
      setIsLoadingLeaderboard(false);
    }
  };

  const skipSave = () => {
    setShowNameForm(false);
    setSaveMessage("");
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
    setShowNameForm(false);
    setPlayerName("");
    setSaveMessage("");
    setShowLeaderboard(false);
    setLeaderboardData([]);
    setCurrentPlayerData(null); // Clear data người chơi hiện tại
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

        {/* Name Form Modal for Winners */}
        {showNameForm && success && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black/90 border-2 border-revolutionary-gold rounded-xl p-6 max-w-md mx-auto mb-6"
          >
            <h3 className="text-2xl font-bold text-revolutionary-gold mb-4">
              🏆 Lưu Kết Quả Vào Bảng Xếp Hạng
            </h3>
            <div className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-4 mb-4">
              <div className="text-left text-sm space-y-2">
                <p className="text-cream-white/80">
                  📊 <strong>Điểm của bạn:</strong>{" "}
                  <span className="text-revolutionary-gold text-xl font-bold">
                    {calculateScore()}
                  </span>
                </p>
                <p className="text-cream-white/60 text-xs italic">
                  (Điểm = GTTD {surplusValue} + Tiền ${money} × 8)
                </p>
              </div>
            </div>
            
            <input
              type="text"
              placeholder="Nhập tên của bạn..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && saveResultToSheet()}
              className="w-full bg-steel-gray/30 border border-cyber-blue/50 rounded-lg px-4 py-3 mb-4 text-cream-white placeholder-cream-white/40 focus:outline-none focus:border-cyber-blue"
              disabled={isSaving}
              maxLength={50}
            />
            
            {saveMessage && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm mb-3 ${
                  saveMessage.includes('✅') ? 'text-neural-green' : 
                  saveMessage.includes('❌') ? 'text-red-400' : 
                  'text-cyber-blue'
                }`}
              >
                {saveMessage}
              </motion.p>
            )}

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={saveResultToSheet}
                disabled={isSaving}
                className="flex-1 bg-revolutionary-gold text-black px-6 py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Đang lưu..." : "💾 Lưu Kết Quả"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={skipSave}
                disabled={isSaving}
                className="flex-1 bg-steel-gray/50 text-cream-white px-6 py-3 rounded-lg font-bold disabled:opacity-50"
              >
                Bỏ qua
              </motion.button>
            </div>
          </motion.div>
        )}

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

        {/* Action Button - Improved UX - MOVED TO TOP */}
        <div className="flex justify-center mb-6">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.08, boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="relative overflow-hidden bg-gradient-to-r from-cyber-blue to-neural-green text-black px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-cyber-blue/50 transition-all group"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <span className="relative flex items-center gap-2">
              <span className="text-2xl">🔄</span>
              <span>Chơi Lại</span>
            </span>
          </motion.button>
        </div>

        {/* Load Leaderboard Button - For both success and fail */}
        {!showLeaderboard && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchLeaderboard}
            disabled={isLoadingLeaderboard}
            className="bg-revolutionary-gold/20 border-2 border-revolutionary-gold text-revolutionary-gold px-8 py-3 rounded-lg font-bold mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingLeaderboard ? "⏳ Đang tải..." : "🏆 Xem Bảng Xếp Hạng"}
          </motion.button>
        )}

        {/* Leaderboard Section */}
        {showLeaderboard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-revolutionary-gold/10 to-cyber-blue/10 border-2 border-revolutionary-gold rounded-xl p-6 max-w-3xl mx-auto mb-6"
          >
            <h3 className="text-3xl font-bold text-center mb-6 text-revolutionary-gold flex items-center justify-center gap-3">
              <span>🏆</span>
              <span>BẢNG XẾP HẠNG TOP 10</span>
              <span>🏆</span>
            </h3>

            {isLoadingLeaderboard ? (
              <div className="text-center py-8">
                <div className="animate-spin text-4xl mb-2">⏳</div>
                <p className="text-cream-white/60">Đang tải bảng xếp hạng...</p>
              </div>
            ) : leaderboardData.length > 0 ? (
              <div className="space-y-2">
                {leaderboardData.map((player, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      index === 0
                        ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500"
                        : index === 1
                        ? "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-2 border-gray-400"
                        : index === 2
                        ? "bg-gradient-to-r from-orange-600/20 to-orange-700/20 border-2 border-orange-600"
                        : "bg-steel-gray/30 border border-cream-white/20"
                    }`}
                  >
                    {/* Rank */}
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      {index === 0 ? (
                        <span className="text-4xl">🥇</span>
                      ) : index === 1 ? (
                        <span className="text-4xl">🥈</span>
                      ) : index === 2 ? (
                        <span className="text-4xl">🥉</span>
                      ) : (
                        <span className="text-2xl font-bold text-cream-white/60">
                          #{index + 1}
                        </span>
                      )}
                    </div>

                    {/* Player Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <p className="text-lg font-bold text-cream-white truncate">
                          {player.name}
                        </p>
                        {/* So sánh theo thứ tự: Tên → Thời gian → Điểm → GTTD */}
                        {isCurrentPlayer(player) && (
                          <span className="text-xs bg-cyber-blue text-black px-2 py-0.5 rounded-full font-bold">
                            BẠN
                          </span>
                        )}
                      </div>
                      <div className="flex gap-4 text-xs text-cream-white/60">
                        <span>GTTD: {player.surplusValue}</span>
                        <span>💰 ${player.money}</span>
                        <span className="text-cream-white/40">{player.date}</span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="flex-shrink-0 text-right">
                      <div className="text-2xl font-bold text-revolutionary-gold">
                        {player.score.toLocaleString()}
                      </div>
                      <div className="text-xs text-cream-white/60">điểm</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-cream-white/60">
                <p className="text-xl mb-2">📊</p>
                <p>Chưa có dữ liệu bảng xếp hạng</p>
              </div>
            )}
          </motion.div>
        )}


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
            🧛‍♂️ Thợ Săn Giá Trị Thặng Dư
          </h3>
          <p className="text-cream-white/80 mb-8 max-w-2xl mx-auto text-lg">
            Bạn là <span className="text-revolutionary-gold font-bold">nhà tư bản ma cà rồng</span> điều hành nhà máy! 
            <br />
            <span className="text-neural-green font-bold">Mục tiêu: Thu thập {TARGET_VALUE} giọt máu giá trị thặng dư trong 2 phút</span>
          </p>

          {/* Game Guide */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 text-left max-w-4xl mx-auto">
            {/* Cách chơi */}
            <div className="bg-gradient-to-br from-cyber-blue/20 to-steel-gray/20 border-2 border-cyber-blue/50 rounded-xl p-6">
              <h4 className="text-cyber-blue font-bold text-lg mb-4 flex items-center gap-2">
                🎮 Cách Chơi
              </h4>
              <ul className="space-y-2 text-sm text-cream-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-revolutionary-gold">👷</span>
                  <span><strong>Click công nhân</strong> để bóc lột (+20 GTTD, -15 HP)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neural-green">🤖</span>
                  <span><strong>Mua Robot AI</strong> ($50, tối đa 6 con) - Tự động tạo +5 GTTD/giây</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">👷</span>
                  <span><strong>Thuê công nhân</strong> ($40) - Tăng nguồn lao động</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✕</span>
                  <span><strong>Sa thải công nhân</strong> (thu về $20) - Giảm chi phí</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-revolutionary-gold">💰</span>
                  <span><strong>Bán GTTD</strong> (10💧 = $1) - Chuyển đổi thành tiền</span>
                </li>
              </ul>
            </div>

            {/* Cảnh báo & Cơ chế */}
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500/50 rounded-xl p-6">
              <h4 className="text-red-400 font-bold text-lg mb-4 flex items-center gap-2">
                ⚠️ Cảnh Báo & Cơ Chế
              </h4>
              <ul className="space-y-2 text-sm text-cream-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">💔</span>
                  <span><strong>HP &lt; 10%:</strong> Công nhân không thể làm việc</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">🚨</span>
                  <span><strong>ĐÌNH CÔNG:</strong> 3+ công nhân HP &lt; 10% → Tất cả ngừng làm!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">💥</span>
                  <span><strong>Robot hỏng:</strong> Tỷ lệ tăng khi độ bền thấp (8%/3%/1%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">⏰</span>
                  <span><strong>Sửa robot:</strong> $30, phải sửa trong 5 giây hoặc mất robot!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">💚</span>
                  <span><strong>Hồi máu:</strong> +2 HP/giây tự động</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Strategy Tips */}
          <div className="bg-revolutionary-gold/10 border border-revolutionary-gold/30 rounded-xl p-6 max-w-4xl mx-auto mb-8 text-left">
            <h4 className="text-revolutionary-gold font-bold text-lg mb-3 flex items-center gap-2">
              💡 Chiến Thuật
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <div className="text-cyber-blue font-bold">🎯 Cân Bằng:</div>
                <p className="text-cream-white/80">Đừng bóc lột quá nhiều công nhân cùng lúc. Giữ ít nhất 2 công nhân khỏe mạnh!</p>
              </div>
              <div className="space-y-1">
                <div className="text-neural-green font-bold">🤖 Robot AI:</div>
                <p className="text-cream-white/80">Đầu tư robot sớm để thu GTTD tự động. Nhưng cẩn thận robot hỏng!</p>
              </div>
              <div className="space-y-1">
                <div className="text-revolutionary-gold font-bold">💰 Quản Lý:</div>
                <p className="text-cream-white/80">Bán GTTD để có tiền mua robot và thuê công nhân khi cần.</p>
              </div>
            </div>
          </div>

          {/* Philosophy Note */}
          <div className="bg-steel-gray/20 border border-steel-gray/50 rounded-xl p-6 max-w-4xl mx-auto mb-8 text-left">
            <h4 className="text-cream-white font-bold text-lg mb-3 flex items-center gap-2">
              📚 Triết Học Mác
            </h4>
            <p className="text-cream-white/80 text-sm leading-relaxed italic">
              <span className="text-revolutionary-gold font-bold">"Giá trị thặng dư (GTTD)"</span> là khái niệm cốt lõi của Marx - 
              phần giá trị công nhân tạo ra nhưng bị chủ nhân chiếm giữ. Marx ví tư bản như 
              <span className="text-red-400 font-bold"> "ma cà rồng hút máu lao động sống"</span>. 
              Trong thời đại AI: <span className="text-cyber-blue font-bold">Robot có tạo giá trị mới, 
              hay chỉ chuyển hóa giá trị từ lao động con người?</span> Game này giúp bạn trải nghiệm 
              mâu thuẫn giữa tư bản và lao động!
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="bg-gradient-to-r from-revolutionary-gold to-neural-green text-black px-12 py-4 rounded-xl font-bold text-xl shadow-lg"
          >
            🎮 Bắt Đầu Săn Lùng!
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
