import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const Game5_MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");

  // Dữ liệu các nhà triết học
  const philosophers = [
    { id: 1, name: "Aristotle", image: "/Philosophy/Aristotles.jpg", displayName: "Aristotle" },
    { id: 2, name: "Nietzsche", image: "/Philosophy/Friedrich_Nietzsche.jpg", displayName: "Friedrich Nietzsche" },
    { id: 3, name: "Kant", image: "/Philosophy/Immanuel_Kant.jpg", displayName: "Immanuel Kant" },
    { id: 4, name: "Marx", image: "/Philosophy/Karl_Marx.jpg", displayName: "Karl Marx" },
    { id: 5, name: "Confucius", image: "/Philosophy/Khong_Tu_2.jpg", displayName: "Khổng Tử (Confucius)" },
    { id: 6, name: "Plato", image: "/Philosophy/Plato.jpg", displayName: "Plato" },
    { id: 7, name: "Pythagoras", image: "/Philosophy/Pythagoras.jpg", displayName: "Pythagoras" },
    { id: 8, name: "Descartes", image: "/Philosophy/Rene_Descartes.jpg", displayName: "René Descartes" },
    { id: 9, name: "Beauvoir", image: "/Philosophy/Simone_de_Beauvoir.png", displayName: "Simone de Beauvoir" },
    { id: 10, name: "Socrates", image: "/Philosophy/Socrates.jpg", displayName: "Socrates" }
  ];

  const difficultySettings = {
    easy: { pairs: 6, gridCols: 4, timeBonus: 300 },
    medium: { pairs: 8, gridCols: 4, timeBonus: 200 },
    hard: { pairs: 10, gridCols: 5, timeBonus: 100 }
  };

  // Tạo và xáo trộn thẻ
  const shuffleCards = useCallback(() => {
    const selectedPhilosophers = philosophers.slice(0, difficultySettings[difficulty].pairs);
    const gameCards = [];
    
    // Tạo cặp thẻ: ảnh và tên
    selectedPhilosophers.forEach((philosopher, index) => {
      // Thẻ ảnh
      gameCards.push({
        id: `${philosopher.id}_image`,
        type: "image",
        content: philosopher.image,
        matchId: philosopher.id,
        philosopher: philosopher
      });
      
      // Thẻ tên
      gameCards.push({
        id: `${philosopher.id}_name`,
        type: "name",
        content: philosopher.displayName,
        matchId: philosopher.id,
        philosopher: philosopher
      });
    });

    // Xáo trộn thẻ
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, [difficulty]);

  // Timer
  useEffect(() => {
    let interval;
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted]);

  // Bắt đầu game
  const startGame = () => {
    setGameStarted(true);
    setGameCompleted(false);
    setScore(0);
    setMoves(0);
    setTimeElapsed(0);
    setFlippedCards([]);
    setMatchedPairs([]);
    setShowConfetti(false);
    shuffleCards();
  };

  // Restart game
  const restartGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setScore(0);
    setMoves(0);
    setTimeElapsed(0);
    setFlippedCards([]);
    setMatchedPairs([]);
    setShowConfetti(false);
    setCards([]);
  };

  // Xử lý khi click thẻ
  const handleCardClick = (card) => {
    if (flippedCards.length >= 2 || flippedCards.includes(card.id) || matchedPairs.includes(card.matchId)) {
      return;
    }

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const card1 = cards.find(c => c.id === newFlippedCards[0]);
      const card2 = cards.find(c => c.id === newFlippedCards[1]);

      if (card1.matchId === card2.matchId) {
        // Tìm được cặp
        setTimeout(() => {
          setMatchedPairs(prev => [...prev, card1.matchId]);
          setFlippedCards([]);
          setScore(prev => prev + 100 + difficultySettings[difficulty].timeBonus - timeElapsed);
          
          // Kiểm tra hoàn thành game
          if (matchedPairs.length + 1 === difficultySettings[difficulty].pairs) {
            setGameCompleted(true);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
          }
        }, 1000);
      } else {
        // Không khớp
        setTimeout(() => {
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  // Format thời gian
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      {showConfetti && <Confetti />}
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🧠 Memory Match - Nhà Triết Học
          </h1>
          <p className="text-gray-600">
            Tìm cặp thẻ phù hợp: Ảnh và tên của nhà triết học
          </p>
        </div>

        {!gameStarted ? (
          // Màn hình bắt đầu
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Chọn độ khó</h2>
              <div className="flex justify-center gap-4">
                {Object.keys(difficultySettings).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      difficulty === level
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {level === 'easy' && 'Dễ (6 cặp)'}
                    {level === 'medium' && 'Trung bình (8 cặp)'}
                    {level === 'hard' && 'Khó (10 cặp)'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Cách chơi:</h3>
              <ul className="text-left text-gray-600 max-w-md mx-auto">
                <li>• Click để lật thẻ</li>
                <li>• Tìm cặp thẻ: ảnh nhà triết học và tên của họ</li>
                <li>• Hoàn thành càng nhanh, điểm càng cao</li>
                <li>• Vị trí thẻ được xáo trộn mỗi lần chơi</li>
              </ul>
            </div>

            <button
              onClick={startGame}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
            >
              🎮 Bắt Đầu Chơi
            </button>
          </motion.div>
        ) : (
          <>
            {/* Game stats */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{score}</div>
                  <div className="text-sm text-gray-600">Điểm</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{moves}</div>
                  <div className="text-sm text-gray-600">Lượt</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{formatTime(timeElapsed)}</div>
                  <div className="text-sm text-gray-600">Thời gian</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {matchedPairs.length}/{difficultySettings[difficulty].pairs}
                  </div>
                  <div className="text-sm text-gray-600">Cặp đã tìm</div>
                </div>
              </div>
              
              <button
                onClick={restartGame}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                🔄 Chơi lại
              </button>
            </div>

            {/* Game board */}
            <div 
              className={`grid gap-4 mx-auto`}
              style={{
                gridTemplateColumns: `repeat(${difficultySettings[difficulty].gridCols}, 1fr)`,
                maxWidth: `${difficultySettings[difficulty].gridCols * 140}px`
              }}
            >
              <AnimatePresence>
                {cards.map((card) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-32 h-32 cursor-pointer ${
                      matchedPairs.includes(card.matchId) ? 'pointer-events-none' : ''
                    }`}
                    onClick={() => handleCardClick(card)}
                  >
                    {/* Hiển thị theo trạng thái thẻ */}
                    {flippedCards.includes(card.id) || matchedPairs.includes(card.matchId) ? (
                      // Mặt trước - hiển thị nội dung
                      <div
                        className={`w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center ${
                          matchedPairs.includes(card.matchId)
                            ? 'ring-4 ring-green-400 bg-green-50'
                            : ''
                        }`}
                      >
                        {card.type === 'image' ? (
                          <img
                            src={card.content}
                            alt={card.philosopher.displayName}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = '/images/placeholder.jpg';
                            }}
                          />
                        ) : (
                          <div className="text-center p-2 flex items-center justify-center h-full">
                            <div className="text-xs font-bold text-gray-800 leading-tight text-center">
                              {card.content}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Mặt sau - thẻ úp
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center">
                        <div className="text-white text-4xl">🧠</div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Game completed */}
            <AnimatePresence>
              {gameCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                  <div className="bg-white rounded-2xl p-8 text-center max-w-md">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-3xl font-bold text-green-600 mb-4">
                      Chúc Mừng!
                    </h2>
                    <div className="space-y-2 mb-6">
                      <p className="text-lg">
                        <span className="font-semibold">Điểm số:</span> {score}
                      </p>
                      <p className="text-lg">
                        <span className="font-semibold">Thời gian:</span> {formatTime(timeElapsed)}
                      </p>
                      <p className="text-lg">
                        <span className="font-semibold">Số lượt:</span> {moves}
                      </p>
                    </div>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={restartGame}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                      >
                        🎮 Chơi lại
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Game5_MemoryMatch;
