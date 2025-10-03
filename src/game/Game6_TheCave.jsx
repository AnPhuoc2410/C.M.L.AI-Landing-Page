import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Game6_TheCave = () => {
  const [stage, setStage] = useState(1); // 1: Shadows, 2: Fire, 3: Outside, 4: Truth
  const [clickCount, setClickCount] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [chainsBreaking, setChainsBreaking] = useState(false);

  // Các bóng AI sẽ hiển thị trên tường
  const shadows = [
    { id: 1, name: "Algorithm", shape: "🤖", position: "20%" },
    { id: 2, name: "Data", shape: "📊", position: "40%" },
    { id: 3, name: "Code", shape: "💻", position: "60%" },
    { id: 4, name: "Machine", shape: "⚙️", position: "80%" }
  ];

  const illusions = [
    "Đây là thế giới thực sự...",
    "Những gì tôi thấy là tất cả...",
    "Không có gì ngoài những bóng này...",
    "Đây chính là sự thật...",
    "Tôi biết tất cả về thực tại..."
  ];

  // Xử lý click vào bóng
  const handleShadowClick = (shadowId) => {
    if (stage === 1) {
      setClickCount(prev => prev + 1);
      
      // Sau 5 clicks, xiềng xích bắt đầu gãy
      if (clickCount >= 4) {
        setChainsBreaking(true);
        setTimeout(() => {
          setStage(2);
          setChainsBreaking(false);
        }, 2000);
      }
    }
  };

  // Tiến lên stage tiếp theo
  const nextStage = () => {
    if (stage === 2) {
      setShowFlash(true);
      setTimeout(() => {
        setStage(3);
        setShowFlash(false);
      }, 1500);
    } else if (stage === 3) {
      setStage(4);
    } else if (stage === 4) {
      setGameCompleted(true);
    }
  };

  // Reset game
  const resetGame = () => {
    setStage(1);
    setClickCount(0);
    setGameCompleted(false);
    setShowFlash(false);
    setChainsBreaking(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      {/* Flash effect khi ra ngoài hang */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50"
          />
        )}
      </AnimatePresence>

      {/* Stage 1: Shadows on the Wall */}
      {stage === 1 && (
        <div className="relative w-full h-screen">
          {/* Cave wall */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-gray-600">
            {/* Header */}
            <div className="text-center pt-8 pb-4">
              <h1 className="text-3xl font-bold text-yellow-400 mb-2">
                🕳️ Hang Động Của Plato
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto px-4">
                Bạn bị xiềng xích từ khi sinh ra, chỉ có thể nhìn vào bức tường phía trước...
              </p>
              <p className="text-yellow-300 mt-2">
                Click vào những bóng để "hiểu" thế giới ({clickCount}/5)
              </p>
            </div>

            {/* Shadows moving on wall */}
            <div className="relative h-96 bg-gray-700 mx-8 rounded-lg border-4 border-gray-600 overflow-hidden">
              {shadows.map((shadow, index) => (
                <motion.div
                  key={shadow.id}
                  className="absolute cursor-pointer"
                  style={{ 
                    left: shadow.position,
                    top: "50%",
                    transform: "translateY(-50%)"
                  }}
                  animate={{
                    x: [-50, 50, -50],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3 + index,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  onClick={() => handleShadowClick(shadow.id)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="text-6xl opacity-60 filter blur-sm">
                    {shadow.shape}
                  </div>
                  <div className="text-center text-gray-400 text-sm mt-2">
                    {shadow.name}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chains */}
            <div className="flex justify-center mt-8">
              <motion.div
                className={`text-6xl ${chainsBreaking ? 'animate-pulse' : ''}`}
                animate={chainsBreaking ? { 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 0.9, 1]
                } : {}}
                transition={{ duration: 0.5, repeat: chainsBreaking ? 4 : 0 }}
              >
                {chainsBreaking ? "💥" : "⛓️"}
              </motion.div>
              {chainsBreaking && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 font-bold text-xl ml-4 self-center"
                >
                  Xiềng xích đang gãy...
                </motion.p>
              )}
            </div>

            {/* Illusion messages */}
            {clickCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-6"
              >
                <p className="text-red-400 italic text-lg">
                  "{illusions[clickCount - 1]}"
                </p>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Stage 2: The Fire */}
      {stage === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-screen"
        >
          <div className="text-center pt-8 pb-4">
            <h2 className="text-3xl font-bold text-orange-400 mb-2">
              🔥 Ngọn Lửa Chân Lý
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto px-4">
              Bạn quay lại và thấy ngọn lửa... Bóng chỉ là phản chiếu!
            </p>
          </div>

          {/* Fire scene */}
          <div className="flex justify-center items-center h-96">
            <div className="relative">
              {/* Fire animation */}
              <motion.div
                className="text-9xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🔥
              </motion.div>
              
              {/* People carrying objects */}
              <motion.div
                className="absolute -right-32 top-1/2 transform -translate-y-1/2"
                animate={{ x: [-100, 100, -100] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="text-4xl">🚶‍♂️📱</div>
              </motion.div>
              
              <motion.div
                className="absolute -left-32 top-1/2 transform -translate-y-1/2"
                animate={{ x: [100, -100, 100] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="text-4xl">🚶‍♀️💻</div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8"
          >
            <p className="text-yellow-400 text-xl font-semibold mb-6">
              "Những bóng tôi thấy chỉ là ảo ảnh... Thực tại phức tạp hơn thế!"
            </p>
            <button
              onClick={nextStage}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
            >
              🚪 Tiến Ra Ngoài Hang
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Stage 3: Outside the Cave */}
      {stage === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-screen bg-gradient-to-br from-blue-400 via-green-300 to-yellow-200"
        >
          <div className="text-center pt-8 pb-4">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">
              🌞 Thế Giới Thực Sự
            </h2>
            <p className="text-blue-700 max-w-2xl mx-auto px-4">
              Ánh sáng chói chang! Đây là thế giới thực với cây cối, mặt trời, và sự thật...
            </p>
          </div>

          {/* Nature scene */}
          <div className="relative h-96 flex justify-center items-center">
            {/* Sun */}
            <motion.div
              className="absolute top-8 right-8 text-8xl"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity }
              }}
            >
              ☀️
            </motion.div>

            {/* Trees */}
            <motion.div
              className="text-6xl mx-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🌳
            </motion.div>
            <motion.div
              className="text-8xl mx-4"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🌲
            </motion.div>
            <motion.div
              className="text-6xl mx-4"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              🌳
            </motion.div>

            {/* Birds */}
            <motion.div
              className="absolute top-16 left-1/4 text-2xl"
              animate={{ x: [0, 100, 0], y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              🦅
            </motion.div>

            {/* Clouds */}
            <motion.div
              className="absolute top-12 left-8 text-4xl"
              animate={{ x: [0, 50, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              ☁️
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8"
          >
            <p className="text-blue-700 text-xl font-semibold mb-6">
              "Wow! Có cả một thế giới rộng lớn ngoài kia. AI chỉ là công cụ, con người và tự nhiên mới là bản chất!"
            </p>
            <button
              onClick={nextStage}
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-800 px-8 py-4 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
            >
              ☀️ Nhìn Vào Mặt Trời Chân Lý
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Stage 4: The Sun of Truth */}
      {stage === 4 && !gameCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200"
        >
          <div className="text-center pt-8">
            <h2 className="text-4xl font-bold text-orange-800 mb-4">
              ☀️ Mặt Trời Chân Lý
            </h2>
          </div>

          {/* Giant Sun */}
          <div className="flex justify-center items-center h-96">
            <motion.div
              className="text-[200px]"
              animate={{
                scale: [1, 1.1, 1],
                rotate: 360
              }}
              transition={{
                scale: { duration: 4, repeat: Infinity },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
            >
              ☀️
            </motion.div>
          </div>

          {/* Plato's quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mt-8 px-4"
          >
            <div className="bg-white bg-opacity-80 rounded-2xl p-6 max-w-4xl mx-auto shadow-lg">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">Lời Plato Dạy</h3>
              <p className="text-lg italic text-gray-800 mb-4">
                "Mặt trời là hình ảnh của Chân Lý và Thiện Hảo, nhờ nó chúng ta thấy và hiểu được tất cả.
                Trong kỷ nguyên AI, hãy nhớ rằng công nghệ chỉ là bóng trên tường - 
                trí tuệ thực sự đến từ việc hiểu bản chất con người và vũ trụ."
              </p>
              <p className="text-orange-700 font-semibold">
                - Plato (428-348 TCN) & Philosophy 4.0
              </p>
            </div>
          </motion.div>

          <div className="text-center mt-8">
            <button
              onClick={nextStage}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
            >
              🎓 Hoàn Thành Hành Trình
            </button>
          </div>
        </motion.div>
      )}

      {/* Game Completed Modal */}
      <AnimatePresence>
        {gameCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 text-center max-w-2xl">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-orange-800 mb-4">
                Chúc Mừng Triết Gia!
              </h2>
              
              <div className="bg-white rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Bạn Đã Học Được:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div>
                    <h4 className="font-semibold text-blue-700">🕳️ Hang Động</h4>
                    <p className="text-sm text-gray-600">Thế giới ảo tưởng, thiên kiến</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-700">🔥 Ngọn Lửa</h4>
                    <p className="text-sm text-gray-600">Nhận thức đầu tiên về sự thật</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700">🌍 Thế Giới Thực</h4>
                    <p className="text-sm text-gray-600">Thực tại đa dạng, phong phú</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-700">☀️ Mặt Trời</h4>
                    <p className="text-sm text-gray-600">Chân lý tối cao, triết lý</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 italic">
                  "Trong thời đại AI, đừng để công nghệ trở thành 'hang động' mới. 
                  Hãy luôn tìm kiếm chân lý và hiểu biết sâu sắc hơn về con người và vũ trụ."
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  🔄 Chơi Lại
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Game6_TheCave;
