import { motion } from 'framer-motion';
import { useState } from 'react';

const GameLaunchButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleLaunchGame = () => {
    // Scroll to game section
    const gameSection = document.getElementById('game-section');
    if (gameSection) {
      gameSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleLaunchGame}
        className="bg-gradient-to-br from-communist-red via-revolutionary-gold to-cyber-blue p-1 rounded-2xl shadow-2xl hover:shadow-revolutionary-gold/50 transition-all"
      >
        <div className="bg-black rounded-xl px-6 py-4 flex items-center gap-3">
          <motion.span
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl"
          >
            🎮
          </motion.span>
          <div className="text-left">
            <div className="text-revolutionary-gold font-bold text-sm">PLAY NOW</div>
            <div className="text-cream-white text-xs">Contradiction 4.0</div>
          </div>
        </div>
      </motion.button>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-xl rounded-xl p-4 w-64 border-2 border-cyber-blue/50 shadow-xl"
        >
          <h4 className="text-revolutionary-gold font-bold mb-2 text-sm">
            Interactive Marxist Theory Game
          </h4>
          <p className="text-cream-white text-xs leading-relaxed">
            Navigate the dialectical contradictions between AI-powered productive forces 
            and outdated relations of production across three historical eras.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GameLaunchButton;
