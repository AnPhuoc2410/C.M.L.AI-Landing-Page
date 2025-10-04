import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Game6_TheCave = () => {
  // Main game states
  const [stage, setStage] = useState(1);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [chainsBreaking, setChainsBreaking] = useState(false);

  // Stage 1 states
  const [clickCount, setClickCount] = useState(0);
  const [stage1Message, setStage1Message] = useState("");
  
  // Stage 2 states  
  const [fireObjects, setFireObjects] = useState([
    { id: 1, shape: "👤", name: "Người", clicked: false, isSource: true },
    { id: 2, shape: "🏺", name: "Bình", clicked: false, isSource: true },
    { id: 3, shape: "🌿", name: "Cây", clicked: false, isSource: true },
    { id: 4, shape: "☁️", name: "Mây", clicked: false, isSource: false },
    { id: 5, shape: "💨", name: "Khói", clicked: false, isSource: false }
  ]);
  const [stage2ClickedCount, setStage2ClickedCount] = useState(0);
  const [stage2Complete, setStage2Complete] = useState(false);
  
  // Stage 2 maze states
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 4 });
  const [stage2MazeComplete, setStage2MazeComplete] = useState(false);

  // Stage 3 states (chỉ brightness)
  const [brightness, setBrightness] = useState(0);
  const [brightnessComplete, setBrightnessComplete] = useState(false);
  const [stage3Complete, setStage3Complete] = useState(false);
  const brightnessRef = useRef(null);

  // Constants
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

  // Generate random maze function
  const generateRandomMaze = () => {
    const newMaze = Array(5).fill().map(() => Array(5).fill(0));
    
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (Math.random() < 0.3 && !(x === 0 && y === 4)) {
          newMaze[y][x] = 1;
        }
      }
    }
    
    newMaze[0][4] = 2; // Exit
    newMaze[4][0] = 0; // Start
    
    return newMaze;
  };

  const [maze, setMaze] = useState(() => generateRandomMaze());

  // Refresh maze function
  const refreshMaze = () => {
    setMaze(generateRandomMaze());
    setPlayerPos({ x: 0, y: 4 });
    setStage2MazeComplete(false);
  };

  // Game logic functions
  const handleShadowClick = () => {
    if (stage === 1) {
      setClickCount(prev => prev + 1);
      
      if (clickCount >= 4) {
        setChainsBreaking(true);
        setTimeout(() => {
          setStage(2);
          setChainsBreaking(false);
        }, 2000);
      }
    }
  };

  const handleFireObjectClick = (objectId) => {
    setFireObjects(prev => prev.map(obj => {
      if (obj.id === objectId && !obj.clicked) {
        setStage2ClickedCount(count => {
          const newCount = count + 1;
          if (obj.isSource) {
            setStage1Message("✅ Đúng! Đây là nguồn tạo ra bóng!");
          } else {
            setStage1Message("❌ Không phải! Tìm vật thể thực sự tạo bóng!");
          }
          
          if (newCount >= 3) {
            setTimeout(() => {
              setStage2Complete(true);
              setStage1Message(""); // Clear message when moving to maze
            }, 1000);
          }
          return newCount;
        });
        return { ...obj, clicked: true };
      }
      return obj;
    }));
  };

  const handleKeyPress = (direction) => {
    setPlayerPos(prev => {
      let newX = prev.x;
      let newY = prev.y;

      switch (direction) {
        case 'up': newY = Math.max(0, prev.y - 1); break;
        case 'down': newY = Math.min(4, prev.y + 1); break;
        case 'left': newX = Math.max(0, prev.x - 1); break;
        case 'right': newX = Math.min(4, prev.x + 1); break;
      }

      if (maze[newY][newX] === 1) {
        return prev;
      }

      if (maze[newY][newX] === 2) {
        if (stage === 2) {
          setStage2MazeComplete(true);
        }
      }

      return { x: newX, y: newY };
    });
  };

  const brightnessIntervalRef = useRef(null);

  const startBrightnessIncrease = () => {
    if (brightnessIntervalRef.current) return;
    
    brightnessIntervalRef.current = setInterval(() => {
      setBrightness(prev => {
        const newBrightness = Math.min(100, prev + 3);
        if (newBrightness >= 100) {
          setBrightnessComplete(true);
          setTimeout(() => setStage3Complete(true), 1000);
          clearInterval(brightnessIntervalRef.current);
          brightnessIntervalRef.current = null;
        }
        return newBrightness;
      });
    }, 50);
  };

  const stopBrightnessIncrease = () => {
    if (brightnessIntervalRef.current) {
      clearInterval(brightnessIntervalRef.current);
      brightnessIntervalRef.current = null;
    }
  };

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

  const closeVideo = () => {
    setShowVideo(false);
    setGameCompleted(true);
  };

  const resetGame = () => {
    setStage(1);
    setGameCompleted(false);
    setShowVideo(false);
    setShowFlash(false);
    setChainsBreaking(false);
    setClickCount(0);
    setStage1Message("");
    setFireObjects(prev => prev.map(o => ({ ...o, clicked: false })));
    setStage2ClickedCount(0);
    setStage2Complete(false);
    setPlayerPos({ x: 0, y: 4 });
    setStage2MazeComplete(false);
    setBrightness(0);
    setBrightnessComplete(false);
    setStage3Complete(false);
    setMaze(generateRandomMaze());
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
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

      {/* Stage 1: Shadows */}
      {stage === 1 && (
        <div className="relative w-full h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images2/Triet1.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>

          <div className="relative z-10 p-4">
            <div className="text-center pt-3 pb-3">
              <h1 className="text-2xl font-bold text-gray-300 mb-2">
                🕳️ Hang Động Của Plato
              </h1>
              <p className="text-gray-400 max-w-lg mx-auto px-3 text-sm">
                Bạn bị trói từ khi sinh ra, chỉ có thể nhìn vào bức tường phía trước...
              </p>
            </div>

            <div className="relative h-40 bg-gray-800 mx-3 rounded-lg border-3 border-gray-700 overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-800"></div>
              
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
                  onClick={handleShadowClick}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <div className="text-4xl opacity-40 filter blur-[1px] transform scale-y-75">
                    {shadow.shape}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-4">
              <p className="text-gray-300 text-base mb-2">
                "Đây là thế giới thực"
              </p>
              <p className="text-yellow-400 text-sm">
                [ CLICK vào bóng để quan sát ] ({clickCount}/5)
              </p>
            </div>

            <div className="flex justify-center mt-4">
              <motion.div
                className={`text-4xl ${chainsBreaking ? 'animate-pulse' : ''}`}
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
                  className="text-red-400 font-bold text-lg ml-4 self-center"
                >
                  Xiềng xích đang gãy...
                </motion.p>
              )}
            </div>

            {clickCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-4"
              >
                <div className="bg-red-900 bg-opacity-60 rounded-lg p-3 mx-auto max-w-md">
                  <p className="text-red-300 italic text-sm">
                    "{illusions[clickCount - 1]}"
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Stage 2: Fire Objects + Maze */}
      {stage === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-full"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images2/Triet2.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-yellow-800 to-red-900 bg-opacity-40"></div>
          </div>

          <div className="relative z-10 p-2">
            {!stage2Complete ? (
              /* Fire Objects Game - Smaller */
              <>
                <div className="text-center mb-2">
                  <h2 className="text-lg font-bold text-orange-200 mb-1">
                    🔥 Khám Phá Ngọn Lửa
                  </h2>
                  <p className="text-orange-100 text-xs max-w-md mx-auto">
                    Click vào 3 vật thể thực sự tạo ra bóng! ({stage2ClickedCount}/3)
                  </p>
                </div>

                <div className="text-center mb-3">
                  <motion.div
                    className="text-[60px] inline-block"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    🔥
                  </motion.div>
                </div>

                <div className="relative max-w-2xl mx-auto h-32">
                  {fireObjects.map((obj, index) => (
                    <motion.div
                      key={obj.id}
                      className={`absolute cursor-pointer ${obj.clicked ? 'opacity-50' : 'opacity-100'}`}
                      style={{
                        left: `${20 + index * 15}%`,
                        top: `${30 + Math.sin(index) * 15}%`
                      }}
                      animate={{
                        x: [-15, 15, -15],
                        y: [0, -8, 0]
                      }}
                      transition={{
                        duration: 3 + index,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      onClick={() => !obj.clicked && handleFireObjectClick(obj.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="text-3xl mb-1">{obj.shape}</div>
                      <p className="text-orange-200 text-xs text-center font-semibold">
                        {obj.name}
                      </p>
                      {obj.clicked && (
                        <div className={`mt-1 px-1 py-0.5 rounded text-xs font-bold ${
                          obj.isSource ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                        }`}>
                          {obj.isSource ? '✅' : '❌'}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {stage1Message && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-3"
                  >
                    <div className="bg-yellow-900 bg-opacity-80 rounded-lg p-2 inline-block">
                      <p className="text-yellow-200 text-sm font-semibold">
                        {stage1Message}
                      </p>
                    </div>
                  </motion.div>
                )}
              </>
            ) : !stage2MazeComplete ? (
              /* Maze Game */
              <div className="text-center">
                <h2 className="text-lg font-bold text-blue-200 mb-2">
                  🏃‍♂️ Thoát Khỏi Hang Động
                </h2>
                <p className="text-blue-100 text-xs mb-3">
                  Điều khiển nhân vật thoát ra! Tránh tường (⬛) và tìm lối thoát (🚪)
                </p>

                <div className="bg-white bg-opacity-90 rounded-xl p-3 inline-block mb-3">
                  <div className="grid grid-cols-5 gap-1">
                    {maze.map((row, y) => 
                      row.map((cell, x) => (
                        <div
                          key={`${x}-${y}`}
                          className={`w-8 h-8 border border-gray-300 flex items-center justify-center text-sm ${
                            cell === 1 ? 'bg-gray-800' : 'bg-gray-100'
                          }`}
                        >
                          {playerPos.x === x && playerPos.y === y ? '🚶' : 
                           cell === 1 ? '⬛' : 
                           cell === 2 ? '🚪' : ''}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-3">
                  <div></div>
                  <button 
                    onClick={() => handleKeyPress('up')}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg font-bold text-sm"
                  >
                    ⬆️
                  </button>
                  <div></div>
                  <button 
                    onClick={() => handleKeyPress('left')}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg font-bold text-sm"
                  >
                    ⬅️
                  </button>
                  <div></div>
                  <button 
                    onClick={() => handleKeyPress('right')}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg font-bold text-sm"
                  >
                    ➡️
                  </button>
                  <div></div>
                  <button 
                    onClick={() => handleKeyPress('down')}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg font-bold text-sm"
                  >
                    ⬇️
                  </button>
                  <div></div>
                </div>

                {/* Refresh Maze Button */}
                <div className="text-center">
                  <button
                    onClick={refreshMaze}
                    className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all transform hover:scale-105"
                  >
                    🔄 Tạo Lại Mê Cung
                  </button>
                </div>
              </div>
            ) : (
              /* Stage 2 Complete */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <h2 className="text-xl font-bold text-green-200 mb-4">
                  🎉 Hoàn Thành Giai Đoạn 2!
                </h2>
                <p className="text-green-100 text-lg mb-6">
                  Bạn đã khám phá nguồn gốc bóng đổ và thoát khỏi hang động!
                </p>
                
                <button
                  onClick={nextStage}
                  className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
                >
                  [ KHÁM PHÁ THÊM ]
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Stage 3: Brightness Only */}
      {stage === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-full"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images2/Triet3.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-100 to-yellow-100 opacity-50"></div>
          </div>

          <div className="relative z-20 p-4">
            {!brightnessComplete ? (
              /* Brightness Puzzle */
              <div className="text-center">
                <h2 className="text-xl font-bold text-blue-800 mb-3">
                  ☀️ Mở Ra Ánh Sáng
                </h2>
                <p className="text-blue-700 text-sm mb-4">
                  Giữ nút để từ từ mở ra ánh sáng thật! ({brightness}%)
                </p>

                <div 
                  className="fixed inset-0 bg-white transition-opacity duration-100"
                  style={{ opacity: (100 - brightness) / 100 }}
                ></div>

                <div className="relative z-30">
                  <button
                    onMouseDown={startBrightnessIncrease}
                    onMouseUp={stopBrightnessIncrease}
                    onMouseLeave={stopBrightnessIncrease}
                    onTouchStart={startBrightnessIncrease}
                    onTouchEnd={stopBrightnessIncrease}
                    className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 px-6 py-4 rounded-full font-bold text-sm transition-all transform hover:scale-105 active:scale-95 select-none"
                    style={{ filter: `brightness(${100 + brightness}%)` }}
                  >
                    🌅 GIỮ ĐỂ MỞ ÁNH SÁNG
                  </button>
                  
                  <div className="mt-3">
                    <div className="bg-gray-300 rounded-full h-3 w-48 mx-auto">
                      <div 
                        className="bg-yellow-400 h-3 rounded-full transition-all duration-100"
                        style={{ width: `${brightness}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold text-green-800 mb-4">
                  🎉 Chào Mừng Đến Thế Giới Thực!
                </h2>
                <p className="text-green-700 text-lg mb-8">
                  Bạn đã thoát khỏi hang động và thấy được ánh sáng chân lý!
                </p>
                
                {stage3Complete && (
                  <button
                    onClick={nextStage}
                    className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-xl font-bold text-xl transition-all transform hover:scale-105"
                  >
                    [ KHÁM PHÁ MẶT TRỜI CHÂN LÝ ]
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Stage 4: The Sun */}
      {stage === 4 && !gameCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-full"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images2/Triet4.0.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-orange-100 to-amber-100 bg-opacity-50"></div>
          </div>

          <div className="relative z-10 text-center p-6">
            <h2 className="text-4xl font-bold text-orange-800 mb-6">
              ☀️ MẶT TRỜI CHÂN LÝ
            </h2>

            <div className="mb-8">
              <motion.div
                className="text-[75px] inline-block"
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

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mb-4"
            >
              <div className="bg-white bg-opacity-95 rounded-3xl p-6 max-w-3xl mx-auto shadow-2xl">
                <div className="text-2xl mb-3">📜</div>
                <h3 className="text-xl font-bold text-orange-800 mb-3">Lời Plato Dạy</h3>
                <p className="text-lg italic text-gray-800 leading-relaxed mb-3">
                  "Mặt trời là hình ảnh của Chân Lý và Thiện Hảo,<br/>
                  nhờ nó chúng ta thấy và hiểu được tất cả."
                </p>
                <p className="text-base text-orange-700 font-semibold">
                  — Plato (428-348 TCN)
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <button
                onClick={nextStage}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 shadow-2xl"
              >
                [ XEM VIDEO GIẢI THÍCH ]
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Video Modal */}
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
                  🎥 Video Giải Thuyết Ẩn Dụ Hang Động
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

      {/* Game Complete Modal */}
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
