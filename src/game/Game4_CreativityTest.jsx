import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Confetti from "react-confetti";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

const Game4_CreativityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiGeneratedContents, setAiGeneratedContents] = useState([]); // Store AI-generated content for each question
  const [aiPositions, setAiPositions] = useState([]); // Track which side is AI for each question
  const [gameInitialized, setGameInitialized] = useState(false); // Track if game has been initialized
  const [error, setError] = useState(null); // Track initialization errors
  const [timeLeft, setTimeLeft] = useState(15); // Countdown timer

  // Full question bank - 24 questions (6 per category)
  const questionBank = [
    // THƠ (6 câu) - Từ Xuân Quỳnh, Hàn Mặc Tử, Xuân Diệu, Tố Hữu
    {
      type: "poem",
      humanContent:
        "Dữ dội và dịu êm\nỒn ào và lặng lẽ\nSông không hiểu nổi mình\nSóng tìm ra tận bể\n\nTrước muôn trùng sóng bể\nEm nghĩ về anh, em\nEm nghĩ về biển lớn\nTừ nơi nào sóng lên?",
      category: "Thơ - Xuân Quỳnh (Sóng)",
      aiPrompt:
        "Viết một bài thơ 8 câu về sóng biển và tình yêu, dữ dội và dịu êm. Phong cách trữ tình. Chỉ trả về nội dung thơ.",
    },
    {
      type: "poem",
      humanContent:
        "Từ ngày nào chẳng biết\nThuyền nghe lời biển khơi\nCánh hải âu, sóng biếc\nĐưa thuyền đi muôn nơi",
      category: "Thơ - Xuân Quỳnh (Thuyền và biển)",
      aiPrompt:
        "Viết một bài thơ 4 câu về thuyền và biển, hải âu và sóng. Phong cách trữ tình. Chỉ trả về thơ.",
    },
    {
      type: "poem",
      humanContent:
        "Hôn em vị chết trên môi\nÔm em sầu não rơi đôi cánh tình\nYêu em anh thoát hồn anh\nNhớ em anh hẹn để dành mai sau",
      category: "Thơ - Hàn Mặc Tử",
      aiPrompt:
        "Viết một bài thơ 4 câu về tình yêu đắm say, hôn và nhớ. Phong cách lãng mạn mãnh liệt. Chỉ trả về thơ.",
    },
    {
      type: "poem",
      humanContent:
        "Những ngày không gặp nhau\nBiển bạc đầu thương nhớ\nNhững ngày không gặp nhau\nLòng thuyền đau - rạn vỡ\n\nNếu từ giã thuyền rồi\nBiển chỉ còn sóng gió\n\nNếu phải cách xa anh\nEm chỉ còn bão tố",
      category: "Thơ - Xuân Quỳnh (Thuyền và biển)",
      aiPrompt:
        "Viết một bài thơ 8 câu về chia ly, thuyền và biển, bão tố tình yêu. Phong cách trữ tình. Chỉ trả về thơ.",
    },
    {
      type: "poem",
      humanContent:
        "Tôi muốn tắt nắng đi\nCho màu đừng nhạt mất;\nTôi muốn buộc gió lại\nCho hương đừng bay đi",
      category: "Thơ - Xuân Diệu",
      aiPrompt:
        "Viết một bài thơ 4 câu về muốn giữ nắng và gió, màu sắc và hương thơm. Phong cách lãng mạn. Chỉ trả về thơ.",
    },
    {
      type: "poem",
      humanContent:
        "Chồng chết trận rồi, đến lượt con\nMẹ già cặm cụi sống chon von\nTôi nhìn mẹ, tưởng Bà Trưng hiện\nBà mẹ nghìn năm của nước non",
      category: "Thơ - Huy Cận (Bà mẹ Việt Nam anh hùng)",
      aiPrompt:
        "Viết một bài thơ 4 câu về bà mẹ Việt Nam, chồng con hi sinh, kiên cường. Phong cách cách mạng. Chỉ trả về thơ.",
    },

    // VĂN XUÔI (6 câu) - Từ Nguyễn Du, Nam Cao, Tô Hoài, Nguyễn Nhật Ánh, Hồ Chí Minh, Nguyễn Minh Châu
    {
      type: "story",
      humanContent:
        "“Trăm năm trong cõi người ta,\nChữ tài chữ mệnh khéo là ghét nhau.\nTrải qua một cuộc bể dâu,\nNhững điều trông thấy mà đau đớn lòng.”",
      category: "Thơ – Nguyễn Du (Truyện Kiều)",
      aiPrompt:
        "Viết một khổ thơ lục bát 4 câu về thân phận con người trước tài và mệnh, giọng ngậm ngùi mà tỉnh táo. Dùng hình ảnh ẩn dụ mềm mại. Chỉ trả về văn.",
    },
    {
      type: "story",
      humanContent:
        "“Hắn vừa đi vừa chửi. Bao giờ cũng thế, cứ rượu xong là hắn chửi.\nHắn chửi đời, chửi trời, chửi cả làng Vũ Đại.\nChửi cả những đứa không chửi nhau với hắn, chửi cả cha đứa nào đẻ ra hắn.”",
      category: "Văn xuôi – Nam Cao (Chí Phèo)",
      aiPrompt:
        "Viết một đoạn văn 3–4 câu khắc họa một kẻ say rượu lang thang trong làng, tiếng chửi phơi bày sự cô độc và bị ruồng bỏ. Giọng hiện thực, có chút mỉa mai, câu văn ngắn – dài xen kẽ. Chỉ trả về văn.",
    },
    {
      type: "story",
      humanContent:
        "“Trước mặt tôi là một bức tranh mực tàu của một danh họa thời cổ.\nMột vài bóng người lớn lẫn trẻ con ngồi im phăng phắc như tượng trên chiếc mui khum khum.\nToàn bộ khung cảnh từ đường nét đến ánh sáng đều hài hòa và đẹp đẽ đến mức toàn bích.”",
      category: "Truyện ngắn – Nguyễn Minh Châu (Chiếc thuyền ngoài xa)",
      aiPrompt:
        "Viết một đoạn miêu tả 3–4 câu về cảnh đẹp hoàn mỹ nhìn từ xa như một bức tranh, xen một chi tiết nhỏ dự báo những góc khuất đời sống phía sau. Văn phong tinh tế, giàu thị giác. Chỉ trả về văn.",
    },
    {
      type: "story",
      humanContent:
        "“Tôi sống độc lập từ thuở bé. Tôi là Dế Mèn.\nTôi cường tráng, đôi càng mẫm bóng.\nĐôi cánh dài, mỗi khi vũ lên đã tưởng là cả một chiếc thuyền nan.”",
      category: "Thiếu nhi – Tô Hoài (Dế Mèn phiêu lưu ký)",
      aiPrompt:
        "Viết một đoạn 3–4 câu xưng “tôi” của một sinh vật nhỏ bé nhưng kiêu hãnh, vừa tự giới thiệu ngoại hình vừa bộc lộ khát vọng phiêu lưu. Văn phong hồn nhiên, giàu nhân hoá. Chỉ trả về văn.",
    },
    {
      type: "story",
      humanContent:
        "“Cả rừng xà nu hàng vạn cây không có cây nào không bị thương.\nCó những cây bị chặt đứt ngang nửa thân mình, đổ ào ào như một trận bão.\nNhưng bên cạnh đó, có những cây mới mọc, mầm xanh rướn lên mạnh mẽ.”",
      category: "Truyện ngắn – Nguyễn Trung Thành (Rừng xà nu)",
      aiPrompt:
        "Viết một đoạn 3–4 câu dùng hình tượng rừng cây để biểu đạt sức sống cộng đồng trước tàn phá chiến tranh: thương tích chồng chất nhưng mầm xanh vẫn trỗi dậy. Giọng mạnh mẽ, giàu nhịp điệu. Chỉ trả về văn.",
    },
    {
      type: "story",
      humanContent:
        "“Thân thể ở trong lao, tinh thần ở ngoài lao.\nMuốn nên sự nghiệp lớn, tinh thần càng phải cao.\nKhó khăn nào cũng vượt, giam cầm chẳng quản chi.”",
      category: "Thơ – Hồ Chí Minh (Nhật ký trong tù)",
      aiPrompt:
        "Viết 3–4 câu thơ ngắn, nhịp chắc, thể hiện ý chí tự do và lạc quan giữa cảnh tù đày; dùng ngôn ngữ giản dị, hàm súc. Chỉ trả về văn.",
    },
    {
      type: "story",
      humanContent:
        "“Ông tướng về hưu, đi đâu cũng kể chuyện chiến công xưa.\nNhưng xung quanh ông, người ta sống bằng những toan tính nhỏ nhoi, bằng đồng tiền và cái bụng.\nMột thời đã qua, và ông lạc lõng ngay trong gia đình mình.”",
      category: "Truyện ngắn – Nguyễn Huy Thiệp (Tướng về hưu)",
      aiPrompt:
        "Viết một đoạn 3–4 câu về một người từng hiển hách trở về đời thường, cho thấy cảm giác lạc lõng giữa những toan tính nhỏ nhặt hiện tại. Giọng tỉnh táo, tiết chế cảm xúc. Chỉ trả về văn.",
    },
    {
      type: "story",
      humanContent:
        "“Tuổi thơ như một chuyến tàu đã đi qua ga đời ta.\nDẫu có nhớ, có tiếc, ta cũng chẳng bao giờ mua được tấm vé quay về.\nNhưng trong lòng mỗi người, chuyến tàu ấy vẫn để lại âm vang dịu ngọt.”",
      category:
        "Tiểu thuyết thiếu nhi – Nguyễn Nhật Ánh (Cho tôi xin một vé đi tuổi thơ)",
      aiPrompt:
        "Viết một đoạn 3–4 câu gợi hoài niệm tuổi thơ bằng ẩn dụ chuyến tàu, giọng ấm áp, nhẹ nhàng, có chút dí dỏm tinh tế. Chỉ trả về văn.",
    },

    // TRIẾT LÝ (6 câu) - Từ các triết gia, nhà khoa học nổi tiếng
    {
      type: "philosophy",
      humanContent:
        "“Giai cấp công nhân toàn thế giới, hãy đoàn kết lại! Các anh chẳng có gì để mất ngoài xiềng xích của mình.”",
      category: "Triết học - Karl Marx",
      aiPrompt:
        "Viết 2-3 câu về tinh thần đoàn kết và khát vọng giải phóng của giai cấp công nhân. Văn phong hùng hồn, kêu gọi hành động. Chỉ trả về nội dung.",
    },
    {
      type: "philosophy",
      humanContent: "“Một chút hành động có giá trị hơn cả tấn lý thuyết.”",
      category: "Triết học - Friedrich Engels",
      aiPrompt:
        "Viết 2-3 câu về mối quan hệ giữa lý luận và hành động, nhấn mạnh sức mạnh thực tiễn. Văn phong trực diện, dễ hiểu. Chỉ trả về nội dung.",
    },
    {
      type: "philosophy",
      humanContent:
        "“Không có lý luận cách mạng thì cũng không thể có phong trào cách mạng.”",
      category: "Triết học - V.I. Lenin",
      aiPrompt:
        "Viết 2-3 câu về vai trò của lý luận trong cách mạng, nhấn mạnh sự gắn kết giữa tư tưởng và hành động. Giọng văn cứng rắn, lãnh đạo. Chỉ trả về nội dung.",
    },
    {
      type: "philosophy",
      humanContent: "“Chỉ cần chạm đến tình yêu, ai cũng trở thành thi sĩ.”",
      category: "Triết học - Plato",
      aiPrompt:
        "Viết 2-3 câu về tình yêu như nguồn cảm hứng thi ca và sáng tạo. Văn phong nhẹ nhàng, giàu chất thơ. Chỉ trả về nội dung.",
    },
    {
      type: "philosophy",
      humanContent: "“Cuộc đời không được chiêm nghiệm thì không đáng sống.”",
      category: "Triết học - Socrates",
      aiPrompt:
        "Viết 2-3 câu về tầm quan trọng của sự tự vấn và chiêm nghiệm trong đời sống con người. Giọng văn sâu sắc, triết lý. Chỉ trả về nội dung.",
    },
    {
      type: "philosophy",
      humanContent: "“Trí tưởng tượng quan trọng hơn tri thức.”",
      category: "Khoa học - Albert Einstein",
      aiPrompt:
        "Viết 2-3 câu về sức mạnh của trí tưởng tượng trong khoa học và sáng tạo. Văn phong truyền cảm hứng. Chỉ trả về nội dung.",
    },
  ];

  // Select 5 random questions from the bank
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // Generate ALL AI content in ONE API call
  const generateAllAIContent = async (questions) => {
    try {
      // Build a combined prompt for all 5 questions
      const combinedPrompt = `Bạn là một AI sáng tạo nội dung văn học và thơ ca tiếng Việt.
Hãy tạo ${questions.length} nội dung sáng tạo theo các yêu cầu sau.

QUAN TRỌNG: Trả về ĐÚNG format JSON này, không thêm markdown hoặc text khác:
{
  "contents": [
    "nội dung 1",
    "nội dung 2",
    "nội dung 3",
    "nội dung 4",
    "nội dung 5"
  ]
}

Các yêu cầu cho từng nội dung:

1. ${questions[0].aiPrompt}

2. ${questions[1].aiPrompt}

3. ${questions[2].aiPrompt}

4. ${questions[3].aiPrompt}

5. ${questions[4].aiPrompt}

Nhớ: Chỉ trả về JSON, không thêm giải thích gì khác.`;

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      const result = await model.generateContent(combinedPrompt);
      const text = result.response.text();

      // Parse JSON response
      const cleanedText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      const parsed = JSON.parse(cleanedText);

      if (!parsed.contents || parsed.contents.length !== questions.length) {
        throw new Error("Invalid response format from AI");
      }

      return parsed.contents;
    } catch (error) {
      // Check error type for better error messages
      if (error.message && error.message.includes("Failed to fetch")) {
        // Network error - DNS or connectivity issue
      } else if (error.status === 400) {
        console.error("❌ API KEY INVALID - Please check your API key");
      } else if (error.status === 503) {
        console.warn("⚠️ Model overloaded - Please try again");
      } else if (error.status === 429) {
        console.warn("⚠️ API Quota exceeded");
      }

      // Re-throw error to be handled by caller
      throw error;
    }
  };

  // Initialize: Select 5 random questions and generate AI content
  React.useEffect(() => {
    const initializeGame = async () => {
      // Only run if game not initialized yet
      if (!gameInitialized) {
        setLoading(true);
        setError(null);

        try {
          // Randomly select 5 questions from the bank
          const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
          const selected = shuffled.slice(0, 5);
          setSelectedQuestions(selected);

          // Generate random positions
          const positions = selected.map(() => Math.random() > 0.5);
          setAiPositions(positions);

          // ✨ Generate AI content for ALL questions in ONE API call
          const aiContents = await generateAllAIContent(selected);
          setAiGeneratedContents(aiContents);

          setLoading(false);
          setGameInitialized(true);
        } catch (err) {
          setLoading(false);

          // Determine error message
          let errorMessage = "Không thể khởi tạo trò chơi. ";
          if (err.message && err.message.includes("Failed to fetch")) {
            errorMessage +=
              "Không thể kết nối với Google AI API. Vui lòng kiểm tra:\n\n" +
              "1. Kết nối internet của bạn\n" +
              "2. Tắt VPN nếu đang bật\n" +
              "3. Kiểm tra Firewall/Antivirus\n" +
              "4. Thử trình duyệt khác\n\n" +
              "Lỗi kỹ thuật: ERR_NAME_NOT_RESOLVED";
          } else if (err.status === 400) {
            errorMessage += "API Key không hợp lệ hoặc đã hết hạn.";
          } else {
            errorMessage += err.message || "Lỗi không xác định.";
          }

          setError(errorMessage);
        }
      }
    };

    initializeGame();
  }, [gameInitialized]); // Fixed: use stable boolean instead of array length

  const handleAnswer = (clickedRight, isTimeout = false) => {
    const aiIsOnRight = aiPositions[currentQuestion];

    const humanIsOnRight = !aiIsOnRight;

    const correct = clickedRight === humanIsOnRight;

    if (correct && !isTimeout) {
      setScore(score + 1);
    }

    setShowResult({ correct, aiIsOnRight, humanIsOnRight, isTimeout });
    setTimeout(() => {
      setShowResult(false);
      if (currentQuestion < selectedQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(15);
      } else {
        setGameComplete(true);
      }
    }, 2000);
  };

  // Countdown timer effect
  React.useEffect(() => {
    if (!loading && !showResult && !gameComplete && gameInitialized && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (timeLeft === 0 && !showResult && !gameComplete) {
      handleAnswer(false, true); // Mark as timeout, always wrong
    }
  }, [timeLeft, loading, showResult, gameComplete, gameInitialized]);

  React.useEffect(() => {
    if (!showResult && !loading && gameInitialized) {
      setTimeLeft(15);
    }
  }, [currentQuestion, showResult, loading, gameInitialized]);

  if (gameComplete) {
    const percentage = Math.round((score / selectedQuestions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-6"
      >
        {percentage >= 60 && (
          <Confetti
            recycle={false}
            numberOfPieces={percentage === 100 ? 400 : 200}
            gravity={0.2}
          />
        )}

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Left Column - Score & Feedback */}
          <div className="space-y-5">
            {/* Score Card */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-black/60 border border-cyber-blue rounded-2xl p-6 text-center shadow-lg"
            >
              <h2 className="text-2xl font-bold text-neural-green mb-3">
                🎨 Kết Quả
              </h2>
              <motion.p
                key={score}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-6xl font-extrabold text-cyber-blue drop-shadow-lg"
              >
                {score}/{selectedQuestions.length}
              </motion.p>
              <p className="text-lg text-cream-white/80">
                Độ chính xác:{" "}
                <span className="font-bold text-neural-green">{percentage}%</span>
              </p>
            </motion.div>

            {/* Feedback Card */}
            <div className="bg-gradient-to-r from-revolutionary-gold/20 to-cyber-blue/10 border border-revolutionary-gold/40 rounded-xl p-5">
              <p className="text-base text-cream-white/90 leading-relaxed flex items-start gap-2">
                {percentage >= 80 ? (
                  <>
                    <span className="text-3xl">🌟</span>
                    <span>
                      <strong>Xuất sắc!</strong> Bạn có con mắt tinh tường phân
                      biệt sáng tạo của con người và AI!
                    </span>
                  </>
                ) : percentage >= 60 ? (
                  <>
                    <span className="text-3xl">👍</span>
                    <span>
                      <strong>Tốt!</strong> Bạn nhận biết được một số đặc điểm.
                      AI đang tiến bộ nhưng vẫn còn khoảng cách.
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-3xl">🤔</span>
                    <span>
                      <strong>AI đã cải trang rất khéo!</strong> Điều này cho thấy
                      AI có thể bắt chước khá tốt bề mặt của sáng tạo.
                    </span>
                  </>
                )}
              </p>
            </div>

            {/* Play Again Button */}
            <motion.button
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95, rotate: -1 }}
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setGameComplete(false);
                setGameInitialized(false);
              }}
              className="w-full bg-gradient-to-r from-cyber-blue to-neural-green text-black py-3 rounded-lg font-bold text-lg shadow-md hover:shadow-cyber-blue/50 transition-all"
            >
              🔄 Chơi Lại
            </motion.button>
          </div>

          {/* Right Column - Reflection & Assistant */}
          <div className="space-y-5">
            {/* Reflection Question */}
            <div className="relative bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-5">
              <div className="absolute left-0 top-0 h-full w-1 bg-cyber-blue rounded-l-lg animate-pulse" />
              <h3 className="text-base font-bold text-cyber-blue mb-3 flex items-center gap-2">
                💭 Câu Hỏi Suy Ngẫm
              </h3>
              <p className="text-sm text-cream-white/80 italic leading-relaxed">
                {percentage < 50
                  ? '"Nếu con người không còn phân biệt nổi đâu là sáng tạo của mình, thì ý nghĩa của sự sáng tạo sẽ ra sao?"'
                  : '"Vẫn có điều gì đó trong sáng tạo con người mà máy chưa đạt được. Đó là gì? Trí tưởng tượng? Cảm xúc? Ý thức?"'}
              </p>
            </div>

            {/* Turing Assistant Message */}
            <div className="relative bg-neural-green/10 border border-neural-green/30 rounded-lg p-5">
              <div className="absolute left-0 top-0 h-full w-1 bg-neural-green rounded-l-lg animate-pulse" />
              <p className="text-sm text-cream-white/90 leading-relaxed">
                <span className="text-neural-green font-bold">
                  🧙‍♂️ Trợ lý Turing:
                </span>{" "}
                "Con người sáng tạo không ngừng – và nay có AI đồng hành. Hãy nhớ
                lời Marx:{" "}
                <em className="text-revolutionary-gold">
                  sáng tạo là biểu hiện cao quý của bản chất con người có ý thức.
                </em>{" "}
                Dù công nghệ tiến đến đâu, ý nghĩa của sáng tạo vẫn nằm trong tay
                chúng ta."
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }


  const question = selectedQuestions[currentQuestion];
  const aiIsOnRight = aiPositions[currentQuestion];
  const aiGeneratedContent = aiGeneratedContents[currentQuestion];

  const getContentForSide = (isRightSide) => {
    if (!aiGeneratedContent || !question) {
      return "Đang tải...";
    }

    if (aiIsOnRight) {
      return isRightSide ? aiGeneratedContent : question.humanContent;
    } else {
      return isRightSide ? question.humanContent : aiGeneratedContent;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <DotLottieReact src="/lottie/eve.json" loop autoplay />
          <p className="text-cream-white/80 text-xl font-bold mb-2">
            AI đang tạo nội dung cho tất cả câu hỏi...
          </p>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-500 mb-4">Lỗi Kết Nối</h2>
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 max-w-2xl mx-auto mb-6">
            <p className="text-cream-white/90 whitespace-pre-line text-left">
              {error}
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setError(null);
                setGameInitialized(false);
              }}
              className="px-6 py-3 bg-cyber-blue hover:bg-cyber-blue/80 text-white rounded-lg font-bold transition-colors"
            >
              🔄 Thử Lại
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-steel-gray hover:bg-steel-gray/80 text-white rounded-lg font-bold transition-colors"
            >
              ↻ Tải Lại Trang
            </motion.button>
          </div>
          <div className="mt-6 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-cream-white/80 text-left">
              <strong className="text-cyber-blue">💡 Gợi ý khắc phục:</strong>
              <br />
              • Kiểm tra kết nối internet
              <br />
              • Tắt VPN/Proxy nếu đang bật
              <br />
              • Thử trình duyệt khác (Chrome, Firefox, Edge)
              <br />
              • Kiểm tra Firewall không chặn googleapis.com
              <br />• Xóa cache trình duyệt và thử lại
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Progress Bar with Timer - Compact */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <span className="text-sm text-cream-white/60">
                  Câu {currentQuestion + 1}/{selectedQuestions.length}
                </span>
                <span className="text-sm text-cyber-blue font-bold">
                  Điểm: {score}
                </span>
              </div>

              <motion.div
                className="flex items-center gap-2"
                animate={{
                  scale: timeLeft <= 5 ? [1, 1.05, 1] : 1,
                }}
                transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
              >
                {/* Circular Progress - Smaller */}
                <div className="relative w-10 h-10">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-steel-gray/30"
                    />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeDasharray="100"
                      animate={{
                        strokeDashoffset: 100 - (timeLeft / 15) * 100,
                      }}
                      className={
                        timeLeft <= 5
                          ? "text-red-500"
                          : timeLeft <= 10
                            ? "text-yellow-500"
                            : "text-cyber-blue"
                      }
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-xs font-bold ${timeLeft <= 5
                        ? "text-red-500"
                        : timeLeft <= 10
                          ? "text-yellow-500"
                          : "text-cyber-blue"
                      }`}>
                      {timeLeft}s
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="w-full bg-steel-gray/30 rounded-full h-1.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentQuestion + 1) / selectedQuestions.length) * 100
                    }%`,
                }}
                className="bg-gradient-to-r from-cyber-blue to-neural-green h-1.5 rounded-full"
              />
            </div>
          </div>

          {/* Turing Assistant - Compact version */}
          <div className="bg-neural-green/10 border border-neural-green/30 rounded-lg p-3 mb-4 flex items-center gap-2">
            <div className="text-2xl">🧙‍♂️</div>
            <div>
              <span className="text-xs font-bold text-neural-green">Trợ lý Turing: </span>
              <span className="text-xs text-cream-white/70 italic">
                {question?.type === "poem" && "Thơ AI thường dùng cấu trúc đều đặn..."}
                {question?.type === "story" && "Văn xuôi AI có câu văn đơn giản..."}
                {question?.type === "philosophy" && "Triết lý AI thường liệt kê..."}
              </span>
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
                <h3 className="text-2xl font-bold text-center text-cyber-blue mb-4">
                  {question?.category}: Đâu là sáng tạo của Con người? 🤔
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Option A (Left) */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(false)} // false = clicked left/A
                    className="bg-gradient-to-br from-revolutionary-gold/10 to-steel-gray/20 border-2 border-revolutionary-gold/30 hover:border-revolutionary-gold rounded-xl p-4 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-revolutionary-gold">A</span>
                      <span className="text-sm text-cream-white/60 group-hover:text-revolutionary-gold transition-colors">
                        Con người
                      </span>
                    </div>
                    <div className="bg-black/40 rounded-lg p-4 max-h-[300px] overflow-y-auto">
                      <pre className="text-cream-white/90 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                        {getContentForSide(false)}
                      </pre>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(true)} // true = clicked right/B
                    className="bg-gradient-to-br from-cyber-blue/10 to-steel-gray/20 border-2 border-cyber-blue/30 hover:border-cyber-blue rounded-xl p-4 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-cyber-blue">B</span>
                      <span className="text-sm text-cream-white/60 group-hover:text-cyber-blue transition-colors">
                        Con người
                      </span>
                    </div>
                    <div className="bg-black/40 rounded-lg p-4 max-h-[300px] overflow-y-auto">
                      <pre className="text-cream-white/90 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                        {getContentForSide(true)}
                      </pre>
                    </div>
                  </motion.button>
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
                {/* Lottie Animation based on result */}
                <div className="w-48 h-48 mx-auto mb-4">
                  <DotLottieReact
                    src={showResult.isTimeout ? "/lottie/timesUp.json" : showResult.correct ? "/lottie/checkmark.json" : "/lottie/bouncyFail.json"}
                    loop
                    autoplay
                  />
                </div>
                <p className="text-2xl text-cream-white/90 mb-4">
                  {showResult.isTimeout
                    ? "Hết giờ rồi!"
                    : showResult.correct
                      ? "Chính xác!"
                      : "Chưa đúng!"}
                </p>
                {showResult.isTimeut && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-base text-yellow-400/90 mb-4 font-medium"
                  >
                    💭 Ngần ngại quá lâu mất điểm rồi!
                  </motion.p>
                )}
                <div className="bg-black/60 border border-cyber-blue/50 rounded-xl p-6 max-w-xl mx-auto">
                  <p className="text-lg text-cream-white/80">
                    <strong className="text-neural-green">
                      {showResult.humanIsOnRight ? "B" : "A"}
                    </strong>{" "}
                    là Con người
                  </p>
                  <p className="text-lg text-cream-white/80 mt-2">
                    <strong className="text-revolutionary-gold">
                      {showResult.aiIsOnRight ? "B" : "A"}
                    </strong>{" "}
                    là AI
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default Game4_CreativityTest;
