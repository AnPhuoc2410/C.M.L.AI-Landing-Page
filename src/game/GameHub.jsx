import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GameHub = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'contradiction',
      title: 'Mâu Thuẫn 4.0',
      subtitle: 'Lực Lượng Sản Xuất vs Quan Hệ Sản Xuất',
      description: 'Mô phỏng turn-based về biện chứng Marx. Quản lý xã hội qua 3 kỷ nguyên với AI.',
      icon: '🤖⚔️🏭',
      color: 'from-communist-red to-cyber-blue',
      status: 'HOÀN THÀNH',
      duration: '30-45 phút',
      difficulty: 'Phức tạp',
      route: '/game/contradiction',
    },
    {
      id: 'surplus',
      title: 'Thợ Săn Giá Trị Thặng Dư',
      subtitle: 'Vampire Capitalist Tycoon',
      description: 'Vào vai nhà tư bản-ma cà rồng. Khai thác công nhân vs đầu tư robot AI. Cân bằng lợi nhuận và đạo đức!',
      icon: '🧛💰🏭',
      color: 'from-communist-red to-revolutionary-gold',
      status: 'MỚI',
      duration: '10-15 phút',
      difficulty: 'Dễ',
      route: '/game/surplus-value',
    },
    {
      id: 'class-struggle',
      title: 'AI & Đấu Tranh Giai Cấp',
      subtitle: 'Hai Mặt Của Nền Kinh Tế',
      description: 'Chơi 2 vai: Tech Capitalist hoặc Digital Worker. Trải nghiệm bất bình đẳng từ cả hai góc độ.',
      icon: '👔💻🛠️',
      color: 'from-cyber-blue to-neural-green',
      status: 'MỚI',
      duration: '15-20 phút',
      difficulty: 'Trung bình',
      route: '/game/class-struggle',
    },
    {
      id: 'human-ai',
      title: 'Con Người hay AI?',
      subtitle: 'Creative Turing Test',
      description: 'Đoán tác phẩm sáng tạo (thơ, tranh, nhạc) được tạo bởi AI hay con người. Khám phá bản chất sáng tạo!',
      icon: '🎨🤖❓',
      color: 'from-revolutionary-gold to-neural-green',
      status: 'MỚI',
      duration: '10 phút',
      difficulty: 'Dễ',
      route: '/game/human-or-ai',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-communist-red/20 to-cyber-blue/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-cream-white mb-4">
            🎮 MARX ARCADE 🎮
          </h1>
          <p className="text-cyber-blue text-xl md:text-2xl mb-2">
            4 Minigames Về Lý Thuyết Marx & AI
          </p>
          <p className="text-cream-white/70 text-lg">
            Học biện chứng vật chất qua trò chơi tương tác
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="mt-6 bg-steel-gray/30 hover:bg-steel-gray/50 text-cream-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            ← Quay Về Trang Chủ
          </motion.button>
        </motion.div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative group"
            >
              <div
                className={`bg-gradient-to-br ${game.color} p-1 rounded-3xl cursor-pointer`}
                onClick={() => navigate(game.route)}
              >
                <div className="bg-black/90 backdrop-blur-xl rounded-3xl p-6 h-full">
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        game.status === 'HOÀN THÀNH'
                          ? 'bg-neural-green/20 text-neural-green border border-neural-green/50'
                          : 'bg-revolutionary-gold/20 text-revolutionary-gold border border-revolutionary-gold/50'
                      }`}
                    >
                      {game.status}
                    </span>
                    <div className="text-5xl">{game.icon}</div>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl font-bold text-cream-white mb-2 group-hover:text-cyber-blue transition-colors">
                    {game.title}
                  </h2>
                  <p className="text-revolutionary-gold text-sm mb-4 font-semibold">
                    {game.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-cream-white/80 leading-relaxed mb-6">
                    {game.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex gap-4 text-sm text-cream-white/60 mb-4">
                    <div className="flex items-center gap-2">
                      <span>⏱️</span>
                      <span>{game.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📊</span>
                      <span>{game.difficulty}</span>
                    </div>
                  </div>

                  {/* Play Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(game.route);
                    }}
                    className="w-full bg-gradient-to-r from-communist-red to-revolutionary-gold text-cream-white font-bold py-3 rounded-xl shadow-lg group-hover:shadow-revolutionary-gold/50 transition-all"
                  >
                    Chơi Ngay →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Educational Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 border-2 border-revolutionary-gold/50"
        >
          <div className="flex items-start gap-4">
            <div className="text-6xl">🧔</div>
            <div>
              <h3 className="text-revolutionary-gold font-bold text-2xl mb-4">
                Về Marx Arcade
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-cream-white/90">
                <div>
                  <h4 className="font-bold text-cyber-blue mb-2">🎯 Mục Đích</h4>
                  <p className="text-sm leading-relaxed">
                    Dạy lý thuyết Karl Marx về kinh tế chính trị qua trò chơi tương tác. 
                    Mỗi game khám phá một khái niệm cốt lõi: biện chứng, giá trị thặng dư, 
                    đấu tranh giai cấp, và bản chất con người.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-neural-green mb-2">📚 Học Được Gì</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Lực lượng sản xuất vs Quan hệ sản xuất</li>
                    <li>• Khai thác lao động & giá trị thặng dư</li>
                    <li>• Mâu thuẫn giai cấp trong thời đại AI</li>
                    <li>• Lao động sáng tạo & ý thức con người</li>
                  </ul>
                </div>
              </div>
              <p className="text-cyber-blue italic mt-4 text-center">
                "Những nhà triết học chỉ giải thích thế giới theo nhiều cách khác nhau. 
                Vấn đề là thay đổi nó." - Karl Marx
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameHub;
