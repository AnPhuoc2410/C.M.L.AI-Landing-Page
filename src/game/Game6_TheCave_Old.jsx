import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Game6_TheCave = () => {
  const [stage, setStage] = useState(1); // 1: Shadows, 2: Fire, 3: Outside, 4: Truth, 5: Video
  const [clickCount, setClickCount] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [chainsBreaking, setChainsBreaking] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Các bóng sẽ hiển thị trên tường (người và vật thể)
  const shadows = [
    { id: 1, name: "Người", shape: "🚶", position: "25%", type: "person" },
    { id: 2, name: "Bình", shape: "🏺", position: "45%", type: "object" },
    { id: 3, name: "Cây", shape: "🌿", position: "65%", type: "object" },
    { id: 4, name: "Người đi", shape: "🚶", position: "85%", type: "person" }
  ];

  const illusions = [
    "Đây là thế giới thực...",
    "Ảo tưởng về thực tại...", 
    "Những gì tôi thấy là tất cả...",
    "Không có gì khác ngoài những bóng này...",
    "Đây chính là sự thật duy nhất..."
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
      setShowVideo(true);
    }
  };

  // Close video and show completion
  const closeVideo = () => {
    setShowVideo(false);
    setGameCompleted(true);
  };

  // Reset game
  const resetGame = () => {
    setStage(1);
    setClickCount(0);
    setGameCompleted(false);
    setShowFlash(false);
    setChainsBreaking(false);
    setShowVideo(false);
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
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/game/TheCave/Cave_Wall.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center pt-6 pb-3">
              <h1 className="text-3xl font-bold text-gray-300 mb-3">
                🕳️ Hang Động Của Plato
              </h1>
              <p className="text-gray-400 max-w-xl mx-auto px-4 text-base">
                Bạn bị trói từ khi sinh ra, chỉ có thể nhìn vào bức tường phía trước...
              </p>
            </div>

            {/* Wall with shadows */}
            <div className="relative h-64 bg-gray-800 mx-8 rounded-lg border-4 border-gray-700 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-800"></div>
              
              {/* Shadows moving on wall */}
              {shadows.map((shadow, index) => (
                <motion.div
                  key={shadow.id}
                  className="absolute cursor-pointer"
                  style={{ 
                    left: shadow.position,
                    top: "60%",
                    transform: "translateY(-50%)"
                  }}
                  animate={{
                    x: shadow.type === 'person' ? [-30, 30, -30] : [-10, 10, -10],
                    scale: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: shadow.type === 'person' ? 4 + index : 6 + index,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  onClick={() => handleShadowClick(shadow.id)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <div className="text-4xl opacity-40 filter blur-[1px] transform scale-y-75">
                    {shadow.shape}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Instructions */}
            <div className="text-center mt-6">
              <p className="text-gray-300 text-lg mb-3">
                "Đây là thế giới thực"
              </p>
              <p className="text-yellow-400 text-base">
                [ CLICK vào bóng để quan sát ] ({clickCount}/5)
              </p>
            </div>

            {/* Chains decoration */}
            <div className="flex justify-center mt-6">
              <motion.div
                className={`text-5xl ${chainsBreaking ? 'animate-pulse' : ''}`}
                animate={chainsBreaking ? { 
                  rotate: [0, -15, 15, 0],
                  scale: [1, 1.2, 0.8, 1]
                } : {}}
                transition={{ duration: 0.3, repeat: chainsBreaking ? 6 : 0 }}
              >
                {chainsBreaking ? "💥⛓️💥" : "⛓️"}
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
                <div className="bg-red-900 bg-opacity-60 rounded-lg p-4 mx-auto max-w-md">
                  <p className="text-red-300 italic text-lg">
                    "{illusions[clickCount - 1]}"
                  </p>
                </div>
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
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/game/TheCave/Cave_Fire.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          >
            {/* Orange overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-yellow-800 to-red-900 bg-opacity-40"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="text-center pt-6 pb-3">
              <h2 className="text-3xl font-bold text-orange-200 mb-3">
                🔥 Ngọn Lửa Chân Lý
              </h2>
              <p className="text-orange-100 max-w-xl mx-auto px-4 text-base">
                Xiềng gãy → quay lại nhìn thấy ngọn lửa và người cầm đồ vật
              </p>
            </div>

            {/* Fire scene */}
            <div className="flex justify-center items-center h-72 relative">
              {/* Central fire */}
              <motion.div
                className="text-[100px] z-20"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 8, -8, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🔥
              </motion.div>
              
              {/* People carrying objects */}
              <motion.div
                className="absolute left-1/4 text-5xl"
                animate={{ 
                  x: [-80, 80, -80],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                👤🏺
              </motion.div>
              
              <motion.div
                className="absolute right-1/4 text-5xl"
                animate={{ 
                  x: [80, -80, 80],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                🚶‍♀️🌿
              </motion.div>

              {/* Light rays */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400 rounded-full opacity-10 blur-3xl"></div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-12"
            >
              <div className="bg-yellow-900 bg-opacity-60 rounded-2xl p-6 mx-auto max-w-2xl mb-8">
                <p className="text-yellow-100 text-2xl font-semibold mb-2">
                  "Những gì ta thấy chỉ là phản chiếu"
                </p>
                <p className="text-orange-200 text-lg">
                  Bóng đen trên tường chỉ là ảnh của những vật thể thực sự...
                </p>
              </div>
              
              <button
                onClick={nextStage}
                className="bg-orange-500 hover:bg-orange-400 text-white px-10 py-4 rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg"
              >
                [ TIẾP TỤC ]
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Stage 3: Outside the Cave */}
      {stage === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-screen"
        >
          {/* Background image placeholder */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/game/TheCave/Outside.png')"
            }}
          >
            {/* Bright gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-100 to-yellow-100 opacity-70"></div>
          </div>

          {/* Content */}
          <div className="relative z-20">
            <div className="text-center pt-6 pb-3">
              <h2 className="text-3xl font-bold text-blue-800 mb-3">
                ☀️ Ánh Sáng Chói Lóa
              </h2>
              <p className="text-blue-700 max-w-xl mx-auto px-4 text-base">
                Ban đầu chói mắt → sau đó thấy thiên nhiên
              </p>
            </div>

            {/* Bright flash effect */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="absolute inset-0 bg-white z-10"
            />

            {/* Nature scene */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3, delay: 1.5 }}
              className="relative h-72 flex justify-center items-center"
            >
              {/* Sun */}
              <motion.div
                className="absolute top-6 right-6 text-6xl"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity }
                }}
              >
                ☀️
              </motion.div>

              {/* Sky and clouds */}
              <motion.div
                className="absolute top-8 left-6 text-2xl"
                animate={{ x: [0, 60, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
              >
                ☁️
              </motion.div>
              
              <motion.div
                className="absolute top-12 right-1/3 text-xl"
                animate={{ x: [0, -40, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
              >
                ☁️
              </motion.div>

              {/* Trees and nature */}
              <motion.div
                className="text-6xl mx-4"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🌳
              </motion.div>
              <motion.div
                className="text-7xl mx-4"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                🌲
              </motion.div>
              <motion.div
                className="text-5xl mx-4"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🌿
              </motion.div>

              {/* Birds */}
              <motion.div
                className="absolute top-20 left-1/4 text-xl"
                animate={{ 
                  x: [0, 120, 0], 
                  y: [0, -30, 0] 
                }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                🦅
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="text-center mt-12 relative z-30"
            >
              <div className="bg-white bg-opacity-90 rounded-2xl p-6 mx-auto max-w-2xl mb-8 shadow-lg">
                <p className="text-blue-800 text-xl font-semibold mb-2">
                  Bầu trời, cây cối xuất hiện
                </p>
                <p className="text-blue-700 text-lg">
                  Có cả một thế giới rộng lớn ngoài kia...
                </p>
              </div>
              
              <button
                onClick={nextStage}
                className="relative z-40 bg-yellow-500 hover:bg-yellow-400 text-blue-800 px-10 py-4 rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg cursor-pointer"
                style={{ pointerEvents: 'auto' }}
              >
                [ RA NGOÀI HANG ]
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Stage 4: The Sun of Truth */}
      {stage === 4 && !gameCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-screen"
        >
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/game/TheCave/Sun.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          >
            {/* Bright golden overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-orange-100 to-amber-100 bg-opacity-50"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="text-center pt-6">
              <h2 className="text-4xl font-bold text-orange-800 mb-5">
                ☀️ MẶT TRỜI
              </h2>
            </div>

            {/* Giant Sun */}
            <div className="flex justify-center items-center h-64">
              <motion.div
                className="text-[200px]"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: 360
                }}
                transition={{
                  scale: { duration: 6, repeat: Infinity },
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" }
                }}
              >
                ☀️
              </motion.div>
            </div>

            {/* Plato's quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="text-center mt-8 px-6"
            >
              <div className="bg-white bg-opacity-90 rounded-3xl p-6 max-w-3xl mx-auto shadow-2xl border-4 border-yellow-300">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-3">📜</div>
                  <h3 className="text-xl font-bold text-orange-800">Lời Plato Dạy</h3>
                </div>
                
                <div className="text-center space-y-3">
                  <p className="text-lg italic text-gray-800 leading-relaxed">
                    "Mặt trời là hình ảnh của Chân Lý và Thiện Hảo,<br/>
                    nhờ nó chúng ta thấy và hiểu được tất cả."
                  </p>
                  
                  <div className="border-t-2 border-orange-200 pt-3">
                    <p className="text-base text-orange-700 font-semibold">
                      — Plato (428-348 TCN)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="text-center mt-8"
            >
              <button
                onClick={nextStage}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 shadow-2xl"
              >
                [ XEM VIDEO GIẢI THÍCH ]
              </button>
            </motion.div>
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

      {/* YouTube Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-4xl w-full"
            >
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  🎥 Video Giải Thích Hang Động Plato
                </h3>
                <p className="text-gray-600">
                  Tìm hiểu sâu hơn về triết học của Plato
                </p>
              </div>
              
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/69F7GhASOdM?autoplay=1"
                  title="Plato's Cave Explanation"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="text-center mt-6">
                <button
                  onClick={closeVideo}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all mr-4"
                >
                  ✔️ Xem Xong - Tiếp Tục
                </button>
                <button
                  onClick={() => setShowVideo(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  ❌ Đóng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Game6_TheCave;
