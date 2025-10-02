import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HumanOrAI = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('menu'); // menu, playing, coCreate, results
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const [aiGenerated, setAiGenerated] = useState('');

  const quizData = [
    {
      type: 'poem',
      content: `Ánh trăng vằng vặc trên sông Thu,
Lòng người bồi hồi nhớ cố hương.
Một mình tôi ngồi bên bờ nước,
Nghe tiếng sóng vỗ, nghe chim ca.`,
      isAI: false,
      explanation: '✅ Người viết - Thơ này có chiều sâu cảm xúc, hình ảnh cụ thể ("vằng vặc", "bồi hồi") và cảm giác nhớ nhà chân thực. AI thường không tạo ra được sự tinh tế này.',
    },
    {
      type: 'poem',
      content: `Trong đêm tối, ánh sáng chiếu rọi,
Con người cùng nhau tiến bước đi.
Tương lai tươi sáng đang chờ đợi,
Chúng ta sẽ đến nơi mơ ước.`,
      isAI: true,
      explanation: '❌ AI viết - Thơ này quá chung chung, thiếu hình ảnh cụ thể, và sử dụng cụm từ "sáng - tối", "tương lai tươi sáng" theo kiểu khuôn mẫu. AI hay tạo ra những câu "an toàn" nhưng thiếu cảm xúc thật.',
    },
    {
      type: 'painting',
      content: '🖼️ Bức tranh: Cảnh hoàng hôn trên biển với màu cam, tím, đỏ hòa quyện. Có một chiếc thuyền nhỏ ở giữa biển. Ánh sáng phản chiếu trên mặt nước tạo vệt sáng hoàn hảo đối xứng.',
      isAI: true,
      explanation: '❌ AI vẽ - Ánh sáng phản chiếu "hoàn hảo đối xứng" là dấu hiệu của AI. Nghệ sĩ người thường để lại những điểm không hoàn hảo, nhưng có "linh hồn". AI tạo ra sự hoàn hảo kỹ thuật nhưng thiếu cá tính.',
    },
    {
      type: 'painting',
      content: '🖼️ Bức tranh: Chân dung một người phụ nữ lớn tuổi với nếp nhăn rõ ràng, ánh mắt sâu thẳm. Một bên khuôn mặt sáng hơn, một bên tối hơn. Có vài nét vẽ lỗi nhỏ ở phần tóc nhưng khuôn mặt rất biểu cảm.',
      isAI: false,
      explanation: '✅ Người vẽ - "Nét vẽ lỗi nhỏ" và "biểu cảm sâu" là đặc trưng của nghệ sĩ người. AI thường tránh lỗi nhưng khó tạo ra cảm xúc phức tạp. Nghệ thuật con người chấp nhận không hoàn hảo để đạt biểu cảm.',
    },
    {
      type: 'code',
      content: `function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}`,
      isAI: true,
      explanation: '❌ AI viết - Code này quá "sạch" và theo kiểu textbook. AI thường viết code chuẩn mực nhưng thiếu style cá nhân. Lập trình viên người thường có quirks riêng (ví dụ: dùng reduce, forEach, hoặc comment giải thích).',
    },
    {
      type: 'code',
      content: `// TODO: fix this mess later lol
const getSum = (arr) => arr.reduce((a,b)=>a+b, 0); // idk why reduce works but it does`,
      isAI: false,
      explanation: '✅ Người viết - Comment "TODO", "lol", "idk" và style code ngắn gọn (reduce) là đặc trưng của con người. AI không viết comment hài hước hoặc thừa nhận không hiểu rõ. Đây là "cá tính" của lập trình viên.',
    },
    {
      type: 'music',
      content: '🎵 Đoạn nhạc: Giai điệu piano chậm, các nốt nhạc đều đặn, hợp âm C major - Am - F - G lặp lại suốt bài. Không có biến tấu bất ngờ. Nghe nhẹ nhàng nhưng hơi đơn điệu.',
      isAI: true,
      explanation: '❌ AI sáng tác - Hợp âm C-Am-F-G (4 chord) là pattern phổ biến nhất trong AI music. Sự "đều đặn" và "thiếu biến tấu" cho thấy thuật toán đang chơi an toàn. Nhạc sĩ người thường thêm bất ngờ, lỗi nhỏ, hoặc cảm xúc đột ngột.',
    },
    {
      type: 'music',
      content: '🎵 Đoạn nhạc: Guitar acoustic với nhịp không đều, có chỗ nhanh, có chỗ chậm. Xuất hiện một nốt "gảy nhầm" nhẹ ở giây thứ 12 nhưng tổng thể rất cảm xúc. Có vài khoảng lặng dài bất ngờ.',
      isAI: false,
      explanation: '✅ Người chơi - "Nhịp không đều", "gảy nhầm", "khoảng lặng bất ngờ" là dấu hiệu của con người. AI không "nhầm" và không tạo khoảng lặng một cách tự nhiên. Sự không hoàn hảo này tạo nên cảm giác chân thực và gần gũi.',
    },
  ];

  const startGame = () => {
    setGameState('playing');
    setCurrentRound(0);
    setScore(0);
    setShowFeedback(false);
  };

  const makeGuess = (guess) => {
    const currentItem = quizData[currentRound];
    const correct = (guess === 'ai' && currentItem.isAI) || (guess === 'human' && !currentItem.isAI);

    if (correct) {
      setScore(score + 1);
    }

    setFeedback(currentItem.explanation);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentRound < quizData.length - 1) {
        setCurrentRound(currentRound + 1);
      } else {
        setGameState('coCreate');
      }
    }, 4000);
  };

  const generateAIContent = () => {
    const prompts = [
      `Một bài thơ về "${userPrompt}":\n\n${userPrompt} là điều tuyệt vời,\nMang lại niềm vui cho con người.\nChúng ta cùng nhau tiến về phía trước,\nTương lai tươi sáng đang chờ đón.`,
      `Đoạn mã về "${userPrompt}":\n\nfunction handle${userPrompt.replace(/\s/g, '')}() {\n  // Xử lý ${userPrompt}\n  console.log("Processing ${userPrompt}");\n  return true;\n}`,
      `Ý tưởng tranh về "${userPrompt}":\n\n🖼️ Một bức tranh với màu sắc rực rỡ thể hiện ${userPrompt}. Composition cân đối, ánh sáng hoàn hảo, không có lỗi kỹ thuật. Trông đẹp nhưng hơi giống stock image.`,
    ];

    setAiGenerated(prompts[Math.floor(Math.random() * prompts.length)]);
  };

  const getMarxCommentary = () => {
    const percentage = ((score / quizData.length) * 100).toFixed(0);

    if (percentage >= 80) {
      return {
        title: '🎓 Bậc Thầy Phân Biệt',
        comment: '"Lao động có ý thức là bản chất con người." - Bạn hiểu rõ sự khác biệt giữa sáng tạo có ý thức (con người) và xử lý thuật toán (AI). AI không có ý thức, chỉ là công cụ.',
      };
    }
    if (percentage >= 50) {
      return {
        title: '🤔 Người Học Hỏi',
        comment: '"Trong thế giới tư bản, AI được dùng để thay thế lao động sáng tạo và hạ giá trị của nó." - Bạn đang học cách phân biệt. AI ngày càng "giống người" nhưng thiếu cảm xúc và ý thức thật sự.',
      };
    }
    return {
      title: '😵 Bị AI Đánh Lừa',
      comment: '"AI là công cụ của tư bản để tự động hóa và kiểm soát lao động." - Bạn khó phân biệt AI và người. Đây là mục tiêu của tư bản: làm cho AI thay thế lao động sáng tạo với chi phí thấp hơn.',
    };
  };

  // Menu Screen
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-revolutionary-gold/20 to-neural-green/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-7xl mb-4"
            >
              🧠
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-cream-white mb-3">
              Con Người hay AI?
            </h1>
            <p className="text-revolutionary-gold text-xl mb-2">
              The Creative Turing Test
            </p>
            <p className="text-cyber-blue text-sm">
              🎨 Phân Biệt Sáng Tạo Thật & Giả 🤖
            </p>
          </div>

          <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-6 mb-6 border-2 border-revolutionary-gold/50">
            <h3 className="text-revolutionary-gold font-bold text-lg mb-4 text-center">
              🎮 Cách Chơi
            </h3>
            <div className="text-cream-white/90 space-y-3 text-sm">
              <p>
                <strong className="text-cyber-blue">📝 8 tác phẩm:</strong> Thơ,
                tranh, code, nhạc - AI hoặc người tạo ra
              </p>
              <p>
                <strong className="text-neural-green">🤔 Nhiệm vụ:</strong> Đoán
                xem mỗi tác phẩm do AI hay con người sáng tạo
              </p>
              <p>
                <strong className="text-revolutionary-gold">💡 Gợi ý:</strong> AI
                thường "hoàn hảo" nhưng thiếu cảm xúc. Con người có lỗi nhưng có
                linh hồn.
              </p>
              <p>
                <strong className="text-communist-red">🎨 Round đặc biệt:</strong>{' '}
                Tạo tác phẩm cùng AI và so sánh với con người!
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="w-full bg-gradient-to-r from-revolutionary-gold to-neural-green text-black font-bold py-4 rounded-xl text-xl shadow-2xl mb-3"
          >
            Bắt Đầu Trắc Nghiệm →
          </motion.button>

          <button
            onClick={() => navigate('/game')}
            className="w-full bg-steel-gray/30 hover:bg-steel-gray/50 text-cream-white py-3 rounded-xl transition-all"
          >
            ← Quay Về Game Hub
          </button>
        </motion.div>
      </div>
    );
  }

  // Co-Create Screen
  if (gameState === 'coCreate') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-cyber-blue/20 to-revolutionary-gold/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-3xl w-full"
        >
          <div className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-revolutionary-gold">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🤝</div>
              <h2 className="text-4xl font-bold text-cream-white mb-2">
                Round Đặc Biệt: Cùng AI Sáng Tạo
              </h2>
              <p className="text-revolutionary-gold">
                Nhập một chủ đề, AI sẽ tạo tác phẩm cho bạn xem
              </p>
            </div>

            <div className="mb-6">
              <label className="text-cream-white font-semibold block mb-2">
                Chủ đề của bạn:
              </label>
              <input
                type="text"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="VD: mùa thu, tình yêu, công nghệ..."
                className="w-full bg-steel-gray/30 text-cream-white rounded-xl px-4 py-3 border-2 border-steel-gray/50 focus:border-revolutionary-gold outline-none"
              />
            </div>

            <button
              onClick={generateAIContent}
              disabled={!userPrompt.trim()}
              className="w-full bg-cyber-blue/80 hover:bg-cyber-blue disabled:opacity-50 text-cream-white font-bold py-3 rounded-xl mb-6 transition-all"
            >
              🤖 Tạo Bằng AI
            </button>

            {aiGenerated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-steel-gray/20 rounded-xl p-6 mb-6 border-2 border-cyber-blue/50"
              >
                <h3 className="text-cyber-blue font-bold mb-3">
                  Kết quả từ AI:
                </h3>
                <p className="text-cream-white whitespace-pre-line text-sm leading-relaxed">
                  {aiGenerated}
                </p>
              </motion.div>
            )}

            <div className="bg-communist-red/20 rounded-xl p-5 mb-6 border-2 border-revolutionary-gold/50">
              <p className="text-cream-white text-sm italic">
                <strong className="text-revolutionary-gold">
                  💡 Nhận xét:
                </strong>{' '}
                AI tạo ra kết quả nhanh và "ổn" nhưng thường thiếu chiều sâu,
                cảm xúc, và cá tính. Con người sáng tạo chậm hơn nhưng có linh
                hồn và ý nghĩa thật sự.
              </p>
            </div>

            <button
              onClick={() => setGameState('results')}
              className="w-full bg-gradient-to-r from-revolutionary-gold to-neural-green text-black font-bold py-4 rounded-xl"
            >
              Xem Kết Quả →
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Results Screen
  if (gameState === 'results') {
    const result = getMarxCommentary();

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-communist-red/30 to-revolutionary-gold/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-revolutionary-gold">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">
                {score >= 6 ? '🏆' : score >= 4 ? '👍' : '😅'}
              </div>
              <h2 className="text-4xl font-bold text-cream-white mb-4">
                {result.title}
              </h2>
              <div className="text-revolutionary-gold text-2xl font-bold mb-2">
                Điểm: {score}/{quizData.length}
              </div>
              <p className="text-cream-white/80">
                Tỷ lệ chính xác:{' '}
                {((score / quizData.length) * 100).toFixed(0)}%
              </p>
            </div>

            <div className="bg-communist-red/30 rounded-2xl p-6 mb-6 border-2 border-revolutionary-gold">
              <div className="flex items-start gap-4">
                <div className="text-5xl">🧔</div>
                <div>
                  <h3 className="text-revolutionary-gold font-bold text-lg mb-2">
                    Phân Tích Của Marx:
                  </h3>
                  <p className="text-cream-white italic leading-relaxed">
                    {result.comment}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-steel-gray/20 rounded-xl p-5 mb-6 border border-steel-gray/50">
              <h3 className="text-cyber-blue font-bold mb-3">
                💡 Điều Quan Trọng:
              </h3>
              <p className="text-cream-white/90 text-sm leading-relaxed">
                AI không "sáng tạo" theo nghĩa con người - nó chỉ tổ hợp lại dữ
                liệu đã học. <strong className="text-revolutionary-gold">Lao
                động sáng tạo có ý thức</strong> là đặc trưng của con người
                (theo Marx). Khi tư bản dùng AI thay thế nghệ sĩ, nhạc sĩ, họa
                sĩ → họ đang <strong className="text-communist-red">hạ giá trị
                lao động sáng tạo</strong> và biến nó thành hàng hóa rẻ tiền.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={startGame}
                className="flex-1 bg-gradient-to-r from-revolutionary-gold to-neural-green text-black font-bold py-4 rounded-xl"
              >
                🔄 Chơi Lại
              </button>
              <button
                onClick={() => navigate('/game')}
                className="flex-1 bg-steel-gray/50 hover:bg-steel-gray/70 text-cream-white font-semibold py-4 rounded-xl"
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
  const currentItem = quizData[currentRound];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-steel-gray/20 to-cyber-blue/20 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* HUD */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3">
            <div className="bg-black/60 backdrop-blur-xl rounded-xl px-4 py-2 border-2 border-revolutionary-gold/50">
              <div className="text-revolutionary-gold text-xs">Câu</div>
              <div className="text-cream-white text-xl font-bold">
                {currentRound + 1}/{quizData.length}
              </div>
            </div>
            <div className="bg-black/60 backdrop-blur-xl rounded-xl px-4 py-2 border-2 border-neural-green/50">
              <div className="text-neural-green text-xs">Đúng</div>
              <div className="text-cream-white text-xl font-bold">{score}</div>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRound}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-revolutionary-gold mb-6"
          >
            <div className="mb-6">
              <div className="inline-block bg-cyber-blue/20 text-cyber-blue px-4 py-2 rounded-full text-sm font-bold mb-4 border border-cyber-blue/50">
                {currentItem.type === 'poem' && '📝 Thơ'}
                {currentItem.type === 'painting' && '🖼️ Tranh'}
                {currentItem.type === 'code' && '💻 Code'}
                {currentItem.type === 'music' && '🎵 Nhạc'}
              </div>

              <div className="bg-steel-gray/20 rounded-xl p-6 border-2 border-steel-gray/50">
                <p className="text-cream-white text-lg leading-relaxed whitespace-pre-line">
                  {currentItem.content}
                </p>
              </div>
            </div>

            {!showFeedback && (
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => makeGuess('human')}
                  className="flex-1 bg-gradient-to-br from-neural-green to-cyber-blue text-cream-white font-bold py-6 rounded-xl text-xl border-2 border-neural-green/50 hover:border-cream-white transition-all"
                >
                  👨 Con Người
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => makeGuess('ai')}
                  className="flex-1 bg-gradient-to-br from-communist-red to-revolutionary-gold text-cream-white font-bold py-6 rounded-xl text-xl border-2 border-communist-red/50 hover:border-cream-white transition-all"
                >
                  🤖 AI
                </motion.button>
              </div>
            )}

            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-revolutionary-gold/20 rounded-xl p-6 border-2 border-revolutionary-gold"
              >
                <h3 className="text-revolutionary-gold font-bold text-lg mb-3">
                  📖 Giải Thích:
                </h3>
                <p className="text-cream-white leading-relaxed">{feedback}</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => {
            setGameState('menu');
            setCurrentRound(0);
            setScore(0);
          }}
          className="w-full bg-steel-gray/30 hover:bg-steel-gray/50 text-cream-white py-3 rounded-xl font-semibold"
        >
          ← Thoát Về Menu
        </button>
      </div>
    </div>
  );
};

export default HumanOrAI;
