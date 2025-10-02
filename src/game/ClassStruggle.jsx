import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ClassStruggle = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('menu'); // menu, modeSelect, playing, results
  const [selectedMode, setSelectedMode] = useState(null); // 'capitalist' or 'worker'
  const [turn, setTurn] = useState(1);
  const [maxTurns] = useState(8);

  // Capitalist stats
  const [capitalProfit, setCapitalProfit] = useState(1000);
  const [capitalReputation, setCapitalReputation] = useState(50);
  const [capitalWorkerSatisfaction, setCapitalWorkerSatisfaction] = useState(50);

  // Worker stats
  const [workerMoney, setWorkerMoney] = useState(500);
  const [workerHealth, setWorkerHealth] = useState(80);
  const [workerHappiness, setWorkerHappiness] = useState(60);

  // Game data
  const capitalistScenarios = [
    {
      turn: 1,
      situation: "Startup của bạn đang tăng trưởng. Nhưng chi phí lao động chiếm 40% doanh thu. Các nhà đầu tư yêu cầu tăng lợi nhuận.",
      choices: [
        { text: "Cắt giảm 20% nhân sự, tăng khối lượng công việc cho người còn lại", profit: 300, reputation: -10, satisfaction: -20 },
        { text: "Tăng phí dịch vụ cho khách hàng 15%", profit: 200, reputation: -5, satisfaction: 0 },
        { text: "Duy trì hiện trạng, tập trung phát triển sản phẩm", profit: 50, reputation: 5, satisfaction: 5 }
      ]
    },
    {
      turn: 2,
      situation: "Thuật toán AI mới có thể thay thế 30% công việc của team marketing. Nhà đầu tư rất quan tâm.",
      choices: [
        { text: "Triển khai AI ngay, sa thải nhân viên marketing", profit: 400, reputation: -15, satisfaction: -25 },
        { text: "Dùng AI hỗ trợ, giữ nguyên nhân sự nhưng tăng KPI", profit: 150, reputation: 0, satisfaction: -10 },
        { text: "Đào tạo lại nhân viên, không sa thải", profit: -50, reputation: 10, satisfaction: 15 }
      ]
    },
    {
      turn: 3,
      situation: "Nhân viên yêu cầu tăng lương 15% do lạm phát. Quỹ hiện tại đủ chi trả nhưng sẽ ảnh hưởng tăng trưởng.",
      choices: [
        { text: "Từ chối, giải thích tình hình tài chính khó khăn", profit: 100, reputation: -5, satisfaction: -15 },
        { text: "Tăng 5% và hứa hẹn bonus cuối năm", profit: 0, reputation: 0, satisfaction: 0 },
        { text: "Tăng lương 15% như yêu cầu", profit: -100, reputation: 5, satisfaction: 20 }
      ]
    },
    {
      turn: 4,
      situation: "Đối thủ cạnh tranh tung chiến dịch marketing mạnh. Bạn cần tăng tốc độ làm việc để kịp deadline.",
      choices: [
        { text: "Yêu cầu làm thêm 12h/ngày không lương OT", profit: 200, reputation: -10, satisfaction: -20 },
        { text: "Thuê thêm freelancer ngắn hạn", profit: 50, reputation: 0, satisfaction: 5 },
        { text: "Chấp nhận chậm deadline, giữ work-life balance", profit: -100, reputation: 5, satisfaction: 10 }
      ]
    },
    {
      turn: 5,
      situation: "Có cơ hội IPO nếu lợi nhuận tăng 40% trong quý này. Nhà đầu tư đang gây áp lực.",
      choices: [
        { text: "Cắt giảm mọi chi phí không cần thiết (bao gồm phúc lợi)", profit: 500, reputation: -20, satisfaction: -30 },
        { text: "Tăng giá dịch vụ 25%, chấp nhận mất khách hàng", profit: 300, reputation: -10, satisfaction: -5 },
        { text: "Từ chối IPO lúc này, tập trung phát triển bền vững", profit: 0, reputation: 10, satisfaction: 10 }
      ]
    },
    {
      turn: 6,
      situation: "Nhân viên senior yêu cầu chế độ remote 100%. Nếu từ chối, họ có thể nghỉ việc.",
      choices: [
        { text: "Đồng ý remote, tin tưởng nhân viên", profit: 0, reputation: 5, satisfaction: 15 },
        { text: "Hybrid 3 ngày văn phòng / 2 ngày remote", profit: 0, reputation: 0, satisfaction: 5 },
        { text: "Yêu cầu 100% văn phòng, để họ nghỉ nếu muốn", profit: -50, reputation: -5, satisfaction: -15 }
      ]
    },
    {
      turn: 7,
      situation: "AI automation giờ có thể xử lý 50% công việc customer support. Chi phí triển khai: $30K.",
      choices: [
        { text: "Triển khai, sa thải team support, giữ lại 1 người", profit: 600, reputation: -25, satisfaction: -35 },
        { text: "Dùng AI kết hợp con người (hybrid model)", profit: 200, reputation: 0, satisfaction: -5 },
        { text: "Không dùng AI, giữ nguyên team con người", profit: -50, reputation: 10, satisfaction: 10 }
      ]
    },
    {
      turn: 8,
      situation: "Cuối năm tài chính. Bạn cần quyết định phân bổ lợi nhuận thế nào.",
      choices: [
        { text: "100% chia cho nhà đầu tư và lãnh đạo", profit: 300, reputation: -15, satisfaction: -25 },
        { text: "70% nhà đầu tư, 30% bonus nhân viên", profit: 150, reputation: 0, satisfaction: 10 },
        { text: "50/50 chia đều cho tất cả mọi người", profit: 0, reputation: 10, satisfaction: 20 }
      ]
    }
  ];

  const workerScenarios = [
    {
      turn: 1,
      situation: "Bạn làm freelance giao hàng cho app food delivery. Hôm nay có 15 đơn cần giao trong 8 tiếng.",
      choices: [
        { text: "Nhận tất cả, làm 12 tiếng để hoàn thành", money: 200, health: -15, happiness: -10 },
        { text: "Chỉ nhận 10 đơn gần nhất", money: 120, health: -5, happiness: 0 },
        { text: "Nghỉ hôm nay để tự chăm sóc sức khỏe", money: 0, health: 10, happiness: 5 }
      ]
    },
    {
      turn: 2,
      situation: "App giảm giá cước từ 15k/đơn xuống 12k/đơn do 'cạnh tranh thị trường'. Thu nhập giảm 20%.",
      choices: [
        { text: "Làm thêm giờ để bù thu nhập", money: 150, health: -20, happiness: -15 },
        { text: "Chấp nhận thu nhập thấp hơn", money: 100, health: 0, happiness: -10 },
        { text: "Tìm app khác hoặc công việc khác", money: 80, health: -10, happiness: -5 }
      ]
    },
    {
      turn: 3,
      situation: "Bạn nhận job dán nhãn dữ liệu cho AI. Lương $0.05/mẫu, cần 2000 mẫu để đủ tiền thuê nhà tháng này.",
      choices: [
        { text: "Làm 14h/ngày để hoàn thành đúng hạn", money: 180, health: -25, happiness: -20 },
        { text: "Làm từ từ, chấp nhận trễ tiền thuê", money: 120, health: -10, happiness: -15 },
        { text: "Vay tiền bạn bè, làm ít hơn", money: 100, health: 0, happiness: -10 }
      ]
    },
    {
      turn: 4,
      situation: "Thuật toán của app đánh giá bạn 4.2/5 sao do 2 đơn giao trễ. Bạn bị giảm ưu tiên nhận đơn.",
      choices: [
        { text: "Làm việc điên cuồng để cải thiện rating", money: 150, health: -20, happiness: -15 },
        { text: "Khiếu nại lên app (có thể vô ích)", money: 80, health: -5, happiness: -10 },
        { text: "Chuyển sang platform khác", money: 100, health: -10, happiness: -5 }
      ]
    },
    {
      turn: 5,
      situation: "Bạn nhận được offer hợp đồng full-time tại công ty, lương cố định nhưng phải OT không lương.",
      choices: [
        { text: "Nhận việc, chấp nhận OT vì ổn định", money: 300, health: -15, happiness: -10 },
        { text: "Thương lượng điều khoản OT có lương", money: 250, health: -10, happiness: 0 },
        { text: "Từ chối, tiếp tục freelance tự do", money: 120, health: 0, happiness: 5 }
      ]
    },
    {
      turn: 6,
      situation: "Công ty triển khai AI giám sát năng suất. Bạn phải làm việc 95% thời gian, không được nghỉ lâu.",
      choices: [
        { text: "Tuân thủ hoàn toàn để không bị phạt", money: 200, health: -20, happiness: -20 },
        { text: "Cố gắng cheat hệ thống (rủi ro cao)", money: 180, health: -10, happiness: -15 },
        { text: "Phản ánh với HR (có thể bị trả thù)", money: 150, health: -5, happiness: -10 }
      ]
    },
    {
      turn: 7,
      situation: "AI chatbot thay thế 50% team. Khối lượng công việc của bạn tăng gấp đôi với cùng mức lương.",
      choices: [
        { text: "Im lặng chấp nhận vì sợ mất việc", money: 250, health: -25, happiness: -25 },
        { text: "Yêu cầu tăng lương hoặc nghỉ việc", money: 300, health: -15, happiness: -10 },
        { text: "Tìm công việc mới, chấp nhận thất nghiệp tạm thời", money: -50, health: 0, happiness: -5 }
      ]
    },
    {
      turn: 8,
      situation: "Cuối năm công ty lãi lớn nhưng bạn không được bonus. CEO nói 'năm sau sẽ tốt hơn'.",
      choices: [
        { text: "Tin tưởng và tiếp tục làm việc chăm chỉ", money: 200, health: -10, happiness: -15 },
        { text: "Làm việc ở mức tối thiểu (quiet quitting)", money: 180, health: 0, happiness: -5 },
        { text: "Tổ chức đồng nghiệp yêu cầu công bằng", money: 150, health: -5, happiness: 10 }
      ]
    }
  ];

  const startGame = (mode) => {
    setSelectedMode(mode);
    setGameState('playing');
    setTurn(1);

    if (mode === 'capitalist') {
      setCapitalProfit(1000);
      setCapitalReputation(50);
      setCapitalWorkerSatisfaction(50);
    } else {
      setWorkerMoney(500);
      setWorkerHealth(80);
      setWorkerHappiness(60);
    }
  };

  const makeChoice = (choice) => {
    if (selectedMode === 'capitalist') {
      setCapitalProfit(capitalProfit + choice.profit);
      setCapitalReputation(Math.max(0, Math.min(100, capitalReputation + choice.reputation)));
      setCapitalWorkerSatisfaction(Math.max(0, Math.min(100, capitalWorkerSatisfaction + choice.satisfaction)));
    } else {
      setWorkerMoney(workerMoney + choice.money);
      setWorkerHealth(Math.max(0, Math.min(100, workerHealth + choice.health)));
      setWorkerHappiness(Math.max(0, Math.min(100, workerHappiness + choice.happiness)));
    }

    if (turn < maxTurns) {
      setTurn(turn + 1);
    } else {
      setGameState('results');
    }
  };

  const getCapitalistEnding = () => {
    if (capitalProfit > 3000 && capitalWorkerSatisfaction < 30) {
      return {
        title: "🏆 Nhà Tư Bản Thành Công",
        desc: `Bạn đạt lợi nhuận $${capitalProfit} nhưng công nhân bất mãn nghiêm trọng.`,
        marx: '"Tư bản đến thế gian, từ đầu đến chân, mỗi lỗ chân lông đều chảy máu và nhớp bẩn." - Bạn đã hy sinh người lao động để làm giàu.'
      };
    }
    if (capitalProfit > 2000 && capitalWorkerSatisfaction > 50) {
      return {
        title: "⚖️ Nhà Tư Bản Khai Sáng",
        desc: `Lợi nhuận $${capitalProfit} với sự hài lòng của công nhân ở mức ${capitalWorkerSatisfaction}%.`,
        marx: '"Trong chủ nghĩa tư bản, ngay cả những nhà tư bản \'tốt\' vẫn phải bóc lột để tồn tại trong cạnh tranh." - Bạn cố gắng cân bằng nhưng hệ thống vẫn bất công.'
      };
    }
    if (capitalProfit < 1500) {
      return {
        title: "📉 Công Ty Phá Sản",
        desc: `Lợi nhuận chỉ còn $${capitalProfit}. Nhà đầu tư rút vốn.`,
        marx: '"Tư bản sợ không có lợi nhuận hoặc lợi nhuận quá nhỏ." - Bạn không đủ tàn nhẫn để thành công trong hệ thống này.'
      };
    }
    return {
      title: "💼 Tồn Tại",
      desc: `Lợi nhuận $${capitalProfit}, reputation ${capitalReputation}%.`,
      marx: '"Mâu thuẫn của chủ nghĩa tư bản cuối cùng sẽ dẫn đến sự sụp đổ của nó." - Bạn duy trì được công ty nhưng mâu thuẫn vẫn tồn tại.'
    };
  };

  const getWorkerEnding = () => {
    if (workerMoney > 1500 && workerHealth < 40) {
      return {
        title: "💰 Kiếm Được Tiền, Mất Sức Khỏe",
        desc: `Bạn có $${workerMoney} nhưng sức khỏe chỉ còn ${workerHealth}%.`,
        marx: '"Người công nhân càng làm việc nhiều, anh ta càng trở nên nghèo." - Bạn hy sinh sức khỏe để tồn tại trong hệ thống bóc lột.'
      };
    }
    if (workerMoney > 1200 && workerHappiness > 50 && workerHealth > 60) {
      return {
        title: "🌟 Cân Bằng Cuộc Sống",
        desc: `$${workerMoney}, sức khỏe ${workerHealth}%, hạnh phúc ${workerHappiness}%.`,
        marx: '"Đấu tranh giai cấp tập thể mới có thể thay đổi hệ thống." - Bạn tồn tại tốt nhưng vẫn phụ thuộc vào nhà tư bản.'
      };
    }
    if (workerMoney < 800) {
      return {
        title: "📉 Nghèo Khó",
        desc: `Chỉ còn $${workerMoney}, sức khỏe ${workerHealth}%, hạnh phúc ${workerHappiness}%.`,
        marx: '"Giai cấp công nhân không có gì để mất ngoài xiềng xích của họ." - Bạn sống trong cảnh bấp bênh, sẵn sàng cho cách mạng.'
      };
    }
    return {
      title: "⚙️ Tồn Tại",
      desc: `$${workerMoney}, sức khỏe ${workerHealth}%.`,
      marx: '"Lịch sử của tất cả các xã hội cho đến nay là lịch sử của đấu tranh giai cấp." - Bạn tiếp tục đấu tranh để tồn tại.'
    };
  };

  // Menu Screen
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-cyber-blue/20 to-neural-green/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl w-full"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-7xl mb-4"
            >
              ⚔️
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-cream-white mb-3">
              AI & Đấu Tranh Giai Cấp 4.0
            </h1>
            <p className="text-cyber-blue text-xl mb-2">Class Struggle Simulator</p>
            <p className="text-revolutionary-gold text-sm">
              🏭 Trải Nghiệm Hai Bên Của Mâu Thuẫn Giai Cấp 🤖
            </p>
          </div>

          <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-6 mb-6 border-2 border-revolutionary-gold/50">
            <h3 className="text-revolutionary-gold font-bold text-lg mb-4 text-center">
              Chọn Giai Cấp Của Bạn
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Capitalist Mode */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setGameState('modeSelect')}
                className="bg-gradient-to-br from-communist-red via-revolutionary-gold to-communist-red p-6 rounded-xl text-left border-2 border-revolutionary-gold hover:border-cream-white transition-all"
              >
                <div className="text-5xl mb-3">💼</div>
                <h4 className="text-cream-white font-bold text-xl mb-2">
                  Nhà Tư Bản Tech
                </h4>
                <p className="text-cream-white/80 text-sm mb-3">
                  Điều hành startup AI. Tối đa hóa lợi nhuận bằng mọi giá.
                </p>
                <div className="text-revolutionary-gold text-xs font-bold">
                  📊 Quản lý: Lợi nhuận | Danh tiếng | Sự hài lòng của công nhân
                </div>
              </motion.button>

              {/* Worker Mode */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setGameState('modeSelect');
                  setSelectedMode('worker');
                }}
                className="bg-gradient-to-br from-cyber-blue via-neural-green to-cyber-blue p-6 rounded-xl text-left border-2 border-neural-green hover:border-cream-white transition-all"
              >
                <div className="text-5xl mb-3">👨‍🏭</div>
                <h4 className="text-cream-white font-bold text-xl mb-2">
                  Công Nhân Số
                </h4>
                <p className="text-cream-white/80 text-sm mb-3">
                  Sống bằng gig economy. Tồn tại trong hệ thống AI bóc lột.
                </p>
                <div className="text-neural-green text-xs font-bold">
                  ⚙️ Quản lý: Tiền | Sức khỏe | Hạnh phúc
                </div>
              </motion.button>
            </div>
          </div>

          <div className="bg-black/60 rounded-xl p-5 mb-4 border border-steel-gray/50">
            <p className="text-cream-white text-sm italic text-center">
              <span className="text-revolutionary-gold font-bold">"Lịch sử của mọi xã hội tồn tại cho đến nay là lịch sử của đấu tranh giai cấp."</span>
              <br />- Karl Marx, Tuyên ngôn Đảng Cộng sản (1848)
            </p>
          </div>

          <button
            onClick={() => navigate('/game')}
            className="w-full bg-steel-gray/30 hover:bg-steel-gray/50 text-cream-white py-3 rounded-xl font-semibold transition-all"
          >
            ← Quay Về Game Hub
          </button>
        </motion.div>
      </div>
    );
  }

  // Mode Select Screen
  if (gameState === 'modeSelect' && selectedMode === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-communist-red/30 to-revolutionary-gold/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full text-center"
        >
          <h2 className="text-4xl font-bold text-cream-white mb-6">
            Chọn Vai Trò Của Bạn
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <button
              onClick={() => startGame('capitalist')}
              className="bg-communist-red/80 hover:bg-communist-red p-8 rounded-2xl border-2 border-revolutionary-gold transition-all"
            >
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-cream-white font-bold text-2xl mb-2">
                Nhà Tư Bản
              </h3>
              <p className="text-cream-white/80">Tối đa hóa lợi nhuận</p>
            </button>
            <button
              onClick={() => startGame('worker')}
              className="bg-cyber-blue/80 hover:bg-cyber-blue p-8 rounded-2xl border-2 border-neural-green transition-all"
            >
              <div className="text-6xl mb-4">👨‍🏭</div>
              <h3 className="text-cream-white font-bold text-2xl mb-2">
                Công Nhân
              </h3>
              <p className="text-cream-white/80">Tồn tại và phát triển</p>
            </button>
          </div>
          <button
            onClick={() => setGameState('menu')}
            className="w-full bg-steel-gray/30 text-cream-white py-3 rounded-xl"
          >
            ← Quay Lại
          </button>
        </motion.div>
      </div>
    );
  }

  // Results Screen
  if (gameState === 'results') {
    const ending = selectedMode === 'capitalist' ? getCapitalistEnding() : getWorkerEnding();

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-communist-red/40 to-cyber-blue/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-3xl w-full"
        >
          <div className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-revolutionary-gold">
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold text-cream-white mb-4">
                {ending.title}
              </h2>
              <p className="text-revolutionary-gold text-lg mb-6">
                {ending.desc}
              </p>
            </div>

            {/* Stats Display */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {selectedMode === 'capitalist' ? (
                <>
                  <div className="bg-revolutionary-gold/20 rounded-xl p-4 border border-revolutionary-gold/50">
                    <div className="text-revolutionary-gold text-sm mb-1">Lợi Nhuận</div>
                    <div className="text-cream-white text-2xl font-bold">${capitalProfit}</div>
                  </div>
                  <div className="bg-cyber-blue/20 rounded-xl p-4 border border-cyber-blue/50">
                    <div className="text-cyber-blue text-sm mb-1">Danh Tiếng</div>
                    <div className="text-cream-white text-2xl font-bold">{capitalReputation}%</div>
                  </div>
                  <div className="bg-neural-green/20 rounded-xl p-4 border border-neural-green/50">
                    <div className="text-neural-green text-sm mb-1">Sự Hài Lòng</div>
                    <div className="text-cream-white text-2xl font-bold">{capitalWorkerSatisfaction}%</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-revolutionary-gold/20 rounded-xl p-4 border border-revolutionary-gold/50">
                    <div className="text-revolutionary-gold text-sm mb-1">Tiền</div>
                    <div className="text-cream-white text-2xl font-bold">${workerMoney}</div>
                  </div>
                  <div className="bg-communist-red/20 rounded-xl p-4 border border-communist-red/50">
                    <div className="text-communist-red text-sm mb-1">Sức Khỏe</div>
                    <div className="text-cream-white text-2xl font-bold">{workerHealth}%</div>
                  </div>
                  <div className="bg-neural-green/20 rounded-xl p-4 border border-neural-green/50">
                    <div className="text-neural-green text-sm mb-1">Hạnh Phúc</div>
                    <div className="text-cream-white text-2xl font-bold">{workerHappiness}%</div>
                  </div>
                </>
              )}
            </div>

            {/* Marx Commentary */}
            <div className="bg-communist-red/30 rounded-2xl p-6 mb-6 border-2 border-revolutionary-gold">
              <div className="flex items-start gap-4">
                <div className="text-5xl">🧔</div>
                <div>
                  <h3 className="text-revolutionary-gold font-bold text-lg mb-2">
                    Phân Tích Của Marx:
                  </h3>
                  <p className="text-cream-white italic leading-relaxed">
                    {ending.marx}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => startGame(selectedMode)}
                className="flex-1 bg-gradient-to-r from-communist-red to-revolutionary-gold text-cream-white font-bold py-4 rounded-xl"
              >
                🔄 Chơi Lại Vai Này
              </button>
              <button
                onClick={() => {
                  setGameState('menu');
                  setSelectedMode(null);
                }}
                className="flex-1 bg-steel-gray/50 hover:bg-steel-gray/70 text-cream-white font-semibold py-4 rounded-xl"
              >
                🔀 Đổi Vai
              </button>
            </div>
            <button
              onClick={() => navigate('/game')}
              className="w-full mt-4 bg-steel-gray/30 hover:bg-steel-gray/50 text-cream-white py-3 rounded-xl"
            >
              ← Game Hub
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Playing Screen
  const currentScenario = selectedMode === 'capitalist'
    ? capitalistScenarios.find(s => s.turn === turn)
    : workerScenarios.find(s => s.turn === turn);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-steel-gray/20 to-communist-red/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* HUD */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="flex gap-3">
            <div className="bg-black/60 backdrop-blur-xl rounded-xl px-4 py-2 border-2 border-revolutionary-gold/50">
              <div className="text-revolutionary-gold text-xs">Lượt</div>
              <div className="text-cream-white text-xl font-bold">{turn}/{maxTurns}</div>
            </div>
            {selectedMode === 'capitalist' ? (
              <>
                <div className="bg-black/60 backdrop-blur-xl rounded-xl px-4 py-2 border-2 border-revolutionary-gold/50">
                  <div className="text-revolutionary-gold text-xs">Lợi Nhuận</div>
                  <div className="text-cream-white text-xl font-bold">${capitalProfit}</div>
                </div>
                <div className="bg-black/60 backdrop-blur-xl rounded-xl px-4 py-2 border-2 border-cyber-blue/50">
                  <div className="text-cyber-blue text-xs">Danh Tiếng</div>
                  <div className="text-cream-white text-xl font-bold">{capitalReputation}%</div>
                </div>
                <div className="bg-black/60 backdrop-blur-xl rounded-xl px-4 py-2 border-2 border-neural-green/50">
                  <div className="text-neural-green text-xs">Hài Lòng</div>
                  <div className="text-cream-white text-xl font-bold">{capitalWorkerSatisfaction}%</div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-black/60 backdrop-blur-xl rounded-xl px-4 py-2 border-2 border-revolutionary-gold/50">
                  <div className="text-revolutionary-gold text-xs">Tiền</div>
                  <div className="text-cream-white text-xl font-bold">${workerMoney}</div>
                </div>
                <div className="bg-black/60 backdrop-blur-xl rounded-xl px-4 py-2 border-2 border-communist-red/50">
                  <div className="text-communist-red text-xs">Sức Khỏe</div>
                  <div className="text-cream-white text-xl font-bold">{workerHealth}%</div>
                </div>
                <div className="bg-black/60 backdrop-blur-xl rounded-xl px-4 py-2 border-2 border-neural-green/50">
                  <div className="text-neural-green text-xs">Hạnh Phúc</div>
                  <div className="text-cream-white text-xl font-bold">{workerHappiness}%</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Scenario Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={turn}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-revolutionary-gold mb-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">
                {selectedMode === 'capitalist' ? '💼' : '👨‍🏭'}
              </div>
              <div>
                <h3 className="text-revolutionary-gold font-bold text-sm mb-1">
                  {selectedMode === 'capitalist' ? 'Quyết Định Kinh Doanh' : 'Tình Huống Công Việc'}
                </h3>
                <h2 className="text-cream-white text-2xl font-bold">
                  Lượt {turn}: {selectedMode === 'capitalist' ? 'CEO' : 'Survival'}
                </h2>
              </div>
            </div>

            <p className="text-cream-white text-lg leading-relaxed mb-8">
              {currentScenario.situation}
            </p>

            <div className="space-y-3">
              {currentScenario.choices.map((choice, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => makeChoice(choice)}
                  className="w-full bg-steel-gray/30 hover:bg-steel-gray/50 text-left p-5 rounded-xl border-2 border-steel-gray/50 hover:border-revolutionary-gold transition-all group"
                >
                  <p className="text-cream-white font-semibold mb-3 group-hover:text-revolutionary-gold transition-colors">
                    {choice.text}
                  </p>
                  <div className="flex gap-4 text-sm">
                    {selectedMode === 'capitalist' ? (
                      <>
                        <span className={choice.profit >= 0 ? 'text-neural-green' : 'text-communist-red'}>
                          💰 {choice.profit >= 0 ? '+' : ''}{choice.profit}
                        </span>
                        <span className={choice.reputation >= 0 ? 'text-cyber-blue' : 'text-communist-red'}>
                          📊 {choice.reputation >= 0 ? '+' : ''}{choice.reputation}%
                        </span>
                        <span className={choice.satisfaction >= 0 ? 'text-neural-green' : 'text-communist-red'}>
                          😊 {choice.satisfaction >= 0 ? '+' : ''}{choice.satisfaction}%
                        </span>
                      </>
                    ) : (
                      <>
                        <span className={choice.money >= 0 ? 'text-neural-green' : 'text-communist-red'}>
                          💵 {choice.money >= 0 ? '+' : ''}{choice.money}
                        </span>
                        <span className={choice.health >= 0 ? 'text-neural-green' : 'text-communist-red'}>
                          ❤️ {choice.health >= 0 ? '+' : ''}{choice.health}%
                        </span>
                        <span className={choice.happiness >= 0 ? 'text-neural-green' : 'text-communist-red'}>
                          😊 {choice.happiness >= 0 ? '+' : ''}{choice.happiness}%
                        </span>
                      </>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => {
            setGameState('menu');
            setSelectedMode(null);
          }}
          className="w-full bg-steel-gray/30 hover:bg-steel-gray/50 text-cream-white py-3 rounded-xl font-semibold"
        >
          ← Thoát Về Menu
        </button>
      </div>
    </div>
  );
};

export default ClassStruggle;
