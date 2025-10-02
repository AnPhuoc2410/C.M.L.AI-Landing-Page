import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Confetti from "react-confetti";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

const Game4_CreativityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiGeneratedContents, setAiGeneratedContents] = useState([]); // Store AI-generated content for each question
  const [aiPositions, setAiPositions] = useState([]); // Track which side is AI for each question

  // Pre-made questions - Chỉ có câu gốc của con người, AI sẽ generate câu tương tự
  const questions = [
    {
      type: "poem",
      humanContent: "Mùa thu về trên phố cũ\nLá vàng rơi nhẹ bên song\nNhớ người xưa mỗi chiều mưa\nTrái tim này vẫn mong manh",
      category: "Thơ",
      aiPrompt: "Viết một bài thơ 4 câu về mùa thu và nỗi nhớ, phong cách đơn giản và trực tiếp. Chỉ trả về nội dung thơ, không giải thích."
    },
    {
      type: "story",
      humanContent: "Cô gái nhỏ bước vào tiệm cà phê, ánh mắt lạc lõng tìm kiếm một góc yên tĩnh. Tay cầm cuốn sách cũ, trang giấy đã ố vàng theo năm tháng. Ngoài kia, mưa vẫn rơi.",
      category: "Văn xuôi",
      aiPrompt: "Viết một đoạn văn ngắn 3-4 câu về một cô gái trong quán cà phê đang đọc sách vào ngày mưa. Văn phong đơn giản, câu ngắn. Chỉ trả về nội dung văn, không giải thích."
    },
    {
      type: "code",
      humanContent: "// Fibonacci với đệ quy và memoization\nconst fib = (n, memo = {}) => {\n  if (n in memo) return memo[n];\n  if (n <= 2) return 1;\n  memo[n] = fib(n-1, memo) + fib(n-2, memo);\n  return memo[n];\n};",
      category: "Lập trình",
      aiPrompt: "Viết một hàm JavaScript tính số Fibonacci theo cách đơn giản nhất (đệ quy thuần). Chỉ trả về code, không giải thích, không comment."
    },
    {
      type: "philosophy",
      humanContent: "Con người không chỉ sống để tồn tại, mà sống để tìm kiếm ý nghĩa. Chúng ta là những sinh vật duy nhất có khả năng suy ngẫm về sự vô nghĩa và từ đó tạo ra ý nghĩa riêng.",
      category: "Triết lý",
      aiPrompt: "Viết 2-3 câu về ý nghĩa cuộc sống con người theo phong cách đơn giản, rõ ràng, dễ hiểu. Chỉ trả về nội dung, không giải thích thêm."
    },
    {
      type: "mixed",
      humanContent: "Đêm khuya ngồi viết những dòng thơ\nMực tàn trên giấy vẫn chưa khô\nNghĩ về cuộc đời bao điều nghịch lý\nCon người ta vẫn cứ mãi mong chờ",
      category: "Thơ về Cuộc sống",
      aiPrompt: "Viết một bài thơ 4 câu về việc viết thơ đêm khuya và suy ngẫm cuộc đời. Phong cách đơn giản. Chỉ trả về nội dung thơ, không giải thích."
    }
  ];

  const generateAIContent = async (prompt) => {
    try {
      console.log("API Key:", import.meta.env.VITE_API_KEY ? "Exists" : "Missing");
      
      // Try gemini-2.5-flash first (newer, faster model)
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      return text.trim();
    } catch (error) {
      console.error("Error generating AI content:", error);
      console.error("Full error:", JSON.stringify(error, null, 2));
      
      // Return fallback content based on prompt type
      if (prompt.includes("thơ")) {
        return "Mùa thu đến với lá vàng\nGió nhẹ thổi qua đường phố\nNhớ về thời gian cũ\nLòng người vẫn mong chờ";
      } else if (prompt.includes("văn")) {
        return "Một cô gái bước vào quán. Cô tìm chỗ ngồi. Tay cô cầm cuốn sách. Ngoài trời mưa. Cô bắt đầu đọc.";
      } else if (prompt.includes("JavaScript")) {
        return "function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}";
      } else if (prompt.includes("ý nghĩa cuộc sống")) {
        return "Con người cần có mục đích sống. Mỗi người tìm ý nghĩa riêng. Chúng ta nên sống có giá trị.";
      } else {
        return "Đêm về ngồi viết thơ\nGiấy bút trước mặt\nSuy ngẫm về đời\nTìm câu trả lời";
      }
    }
  };

  // Initialize: Generate AI content for all questions and random positions
  React.useEffect(() => {
    const initializeGame = async () => {
      if (aiPositions.length === 0) {
        setLoading(true);
        
        // Generate random positions
        const positions = questions.map(() => Math.random() > 0.5);
        setAiPositions(positions);
        
        // Generate AI content for all questions
        const aiContents = await Promise.all(
          questions.map(q => generateAIContent(q.aiPrompt))
        );
        setAiGeneratedContents(aiContents);
        
        setLoading(false);
      }
    };
    
    initializeGame();
  }, []);

  const handleAnswer = (clickedRight) => {
    const aiIsOnRight = aiPositions[currentQuestion];
    
    // User clicked right side (B), check if AI is actually on right
    const correct = clickedRight === aiIsOnRight;

    if (correct) {
      setScore(score + 1);
    }

    setShowResult({ correct, aiIsOnRight });
    setTimeout(() => {
      setShowResult(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameComplete(true);
      }
    }, 3000);
  };

  if (gameComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        {percentage >= 60 && <Confetti recycle={false} numberOfPieces={200} />}
        <h2 className="text-4xl font-bold text-neural-green mb-4">
          🎨 Kết Quả
        </h2>
        <div className="bg-black/60 border border-cyber-blue rounded-xl p-6 max-w-2xl mx-auto mb-6">
          <p className="text-5xl font-bold text-cyber-blue mb-4">
            {score}/{questions.length}
          </p>
          <p className="text-xl text-cream-white/80 mb-6">
            Độ chính xác: {percentage}%
          </p>
          
          <div className="bg-revolutionary-gold/10 border border-revolutionary-gold/30 rounded-lg p-5 mb-4">
            <p className="text-cream-white/90 leading-relaxed">
              {percentage >= 80 ? (
                <>
                  🌟 <strong>Xuất sắc!</strong> Bạn có con mắt tinh tường phân biệt sáng tạo
                  của con người và AI. Rõ ràng sáng tạo nhân văn có những dấu ấn đặc biệt!
                </>
              ) : percentage >= 60 ? (
                <>
                  👍 <strong>Tốt!</strong> Bạn nhận biết được một số đặc điểm. AI đang ngày
                  càng tiến bộ nhưng vẫn còn khoảng cách với con người.
                </>
              ) : (
                <>
                  🤔 <strong>AI đã cải trang rất khéo!</strong> Không dễ phân biệt chút nào.
                  Điều này cho thấy AI có thể bắt chước khá tốt bề mặt của sáng tạo.
                </>
              )}
            </p>
          </div>

          <div className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-4">
            <h3 className="text-lg font-bold text-cyber-blue mb-2">
              💭 Câu Hỏi Suy Ngẫm
            </h3>
            <p className="text-sm text-cream-white/80 italic">
              {percentage < 50 
                ? '"Nếu con người không còn phân biệt nổi đâu là sáng tạo của mình, thì ý nghĩa của sự sáng tạo sẽ ra sao?"'
                : '"Vẫn có điều gì đó trong sáng tạo con người mà máy chưa đạt được. Đó là gì? Trí tưởng tượng? Cảm xúc? Ý thức?"'
              }
            </p>
          </div>
        </div>

        <div className="bg-neural-green/10 border border-neural-green/30 rounded-xl p-5 max-w-2xl mx-auto mb-6">
          <p className="text-sm text-cream-white/90 leading-relaxed">
            <span className="text-neural-green font-bold">🧙‍♂️ Trợ lý Turing:</span>{" "}
            "Con người sáng tạo không ngừng – và nay có AI đồng hành. Hãy nhớ lời Marx: 
            <em className="text-revolutionary-gold"> sáng tạo là biểu hiện cao quý của bản chất 
            con người có ý thức.</em> Dù công nghệ tiên tiến đến đâu, ý nghĩa và mục đích của 
            sáng tạo vẫn nằm trong tay chúng ta."
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setGameComplete(false);
            setAiGeneratedContents([]);
            setAiPositions([]); // Reset positions for new game
          }}
          className="bg-cyber-blue text-black px-8 py-3 rounded-lg font-bold"
        >
          Chơi Lại
        </motion.button>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];
  const aiIsOnRight = aiPositions[currentQuestion];
  const aiGeneratedContent = aiGeneratedContents[currentQuestion];

  // Get the content for left (A) and right (B) based on AI position
  const getContentForSide = (isRightSide) => {
    // AI is always the generated content, Human is always humanContent
    if (aiIsOnRight) {
      return isRightSide ? aiGeneratedContent : question.humanContent;
    } else {
      return isRightSide ? question.humanContent : aiGeneratedContent;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-cream-white/60">
            Câu {currentQuestion + 1}/{questions.length}
          </span>
          <span className="text-sm text-cyber-blue font-bold">
            Điểm: {score}
          </span>
        </div>
        <div className="w-full bg-steel-gray/30 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            className="bg-gradient-to-r from-cyber-blue to-neural-green h-2 rounded-full"
          />
        </div>
      </div>

      {/* Turing Assistant */}
      <div className="bg-neural-green/10 border border-neural-green/30 rounded-xl p-4 mb-6 flex items-start gap-3">
        <div className="text-3xl">🧙‍♂️</div>
        <div>
          <p className="text-sm font-bold text-neural-green mb-1">Trợ lý Turing:</p>
          <p className="text-sm text-cream-white/80 italic">
            {question.type === "poem" && "Thơ AI thường dùng cấu trúc đều đặn, thiếu chút cảm xúc sâu lắng..."}
            {question.type === "story" && "Văn xuôi AI thường có câu văn đơn giản, ít hình ảnh ẩn dụ..."}
            {question.type === "code" && "Code AI thường là giải pháp cơ bản, thiếu tối ưu hóa sáng tạo..."}
            {question.type === "philosophy" && "Triết lý AI thường liệt kê, thiếu chiều sâu suy tư..."}
            {question.type === "mixed" && "Kết hợp nhiều yếu tố! Hãy chú ý đến cảm xúc và chiều sâu..."}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h3 className="text-2xl font-bold text-center text-cyber-blue mb-6">
              {question.category}: Đâu là sáng tạo của Con người? 🤔
            </h3>

            {loading ? (
              <div className="text-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="text-6xl mb-4 inline-block"
                >
                  ⚙️
                </motion.div>
                <p className="text-cream-white/80">AI đang tạo nội dung cho tất cả câu hỏi...</p>
                <p className="text-cream-white/60 text-sm mt-2">Đợi chút nhé, đang generate 5 câu 🤖</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Option A (Left) */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(false)} // false = clicked left/A
                  className="bg-gradient-to-br from-revolutionary-gold/10 to-steel-gray/20 border-2 border-revolutionary-gold/30 hover:border-revolutionary-gold rounded-xl p-6 text-left transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-revolutionary-gold">A</span>
                    <span className="text-sm text-cream-white/60 group-hover:text-revolutionary-gold transition-colors">
                      Con người
                    </span>
                  </div>
                  <div className="bg-black/40 rounded-lg p-4 min-h-[150px] flex items-center">
                    <pre className="text-cream-white/90 text-sm whitespace-pre-wrap font-mono">
                      {getContentForSide(false)}
                    </pre>
                  </div>
                </motion.button>

                {/* Option B (Right) */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(true)} // true = clicked right/B
                  className="bg-gradient-to-br from-cyber-blue/10 to-steel-gray/20 border-2 border-cyber-blue/30 hover:border-cyber-blue rounded-xl p-6 text-left transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-cyber-blue">B</span>
                    <span className="text-sm text-cream-white/60 group-hover:text-cyber-blue transition-colors">
                      Con người
                    </span>
                  </div>
                  <div className="bg-black/40 rounded-lg p-4 min-h-[150px] flex items-center">
                    <pre className="text-cream-white/90 text-sm whitespace-pre-wrap font-mono">
                      {getContentForSide(true)}
                    </pre>
                  </div>
                </motion.button>
              </div>
            )}

            <div className="text-center text-sm text-cream-white/60">
              Bạn có 15 giây để quyết định...
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: 2, duration: 0.5 }}
              className="text-8xl mb-6"
            >
              {showResult.correct ? "✅" : "❌"}
            </motion.div>
            <p className="text-2xl text-cream-white/90 mb-4">
              {showResult.correct ? "Chính xác!" : "Chưa đúng!"}
            </p>
            <div className="bg-black/60 border border-cyber-blue/50 rounded-xl p-6 max-w-xl mx-auto">
              <p className="text-lg text-cream-white/80">
                Đáp án đúng: <strong className="text-revolutionary-gold">
                  {showResult.aiIsOnRight ? "B" : "A"}
                </strong> là AI
              </p>
              <p className="text-lg text-cream-white/80 mt-2">
                <strong className="text-neural-green">
                  {showResult.aiIsOnRight ? "A" : "B"}
                </strong> là Con người
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Game4_CreativityTest;
