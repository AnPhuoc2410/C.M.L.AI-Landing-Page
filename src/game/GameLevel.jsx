import { motion } from 'framer-motion';
import { useState } from 'react';

const GameLevel = ({ level, onChoiceMade, onBack }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [aiIntroduced, setAiIntroduced] = useState(false);

  const handleIntroduceAI = () => {
    setAiIntroduced(true);
  };

  const handleChoiceSelect = (choice) => {
    setSelectedChoice(choice);
    setShowResult(true);
  };

  const handleContinue = () => {
    onChoiceMade(selectedChoice.outcome, level.id);
  };

  if (!aiIntroduced) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: level.background }}
      >
        <div className="max-w-2xl w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-cyber-blue/50 shadow-2xl"
          >
            <div className="text-6xl mb-4 text-center">{level.icon}</div>
            <h1 className="text-4xl font-bold text-center text-cream-white mb-2">
              {level.name}
            </h1>
            <p className="text-cyber-blue text-center mb-6">{level.era}</p>
            <p className="text-cream-white text-lg mb-6 leading-relaxed">
              {level.description}
            </p>
            
            <div className="bg-communist-red/20 border-2 border-communist-red/50 rounded-xl p-4 mb-6">
              <h3 className="text-revolutionary-gold font-semibold mb-2">Current System:</h3>
              <p className="text-cream-white text-sm mb-2">{level.currentSystem.name}</p>
              <p className="text-cream-white/70 text-sm">{level.currentSystem.description}</p>
            </div>

            <div className="bg-cyber-blue/20 border-2 border-cyber-blue/50 rounded-xl p-4 mb-6">
              <p className="text-cream-white text-sm">
                <span className="font-semibold text-cyber-blue">Current Productivity:</span>{' '}
                {level.initialProductivity} units/day
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleIntroduceAI}
              className="w-full bg-gradient-to-r from-cyber-blue to-neural-green text-black font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all"
            >
              🤖 Introduce Advanced AI →
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (showResult && selectedChoice) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: level.background }}
      >
        <div className="max-w-2xl w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-revolutionary-gold shadow-2xl"
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-revolutionary-gold mb-2">
                {selectedChoice.outcome === 'success' && '✨ HARMONY ACHIEVED!'}
                {selectedChoice.outcome === 'revolution' && '⚔️ REVOLUTION!'}
                {selectedChoice.outcome === 'transition' && '⚖️ UNSTABLE TRANSITION'}
              </h2>
            </div>

            <div className="bg-black/40 rounded-xl p-6 mb-6">
              <p className="text-cream-white text-lg leading-relaxed mb-4">
                {selectedChoice.result}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-cyber-blue font-semibold">Stability Impact:</span>
                <div className="flex-1 bg-black/50 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.abs(selectedChoice.stability)}%` }}
                    className={`h-full ${
                      selectedChoice.stability > 0 ? 'bg-neural-green' : 'bg-communist-red'
                    }`}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
                <span className={`text-sm font-bold ${
                  selectedChoice.stability > 0 ? 'text-neural-green' : 'text-communist-red'
                }`}>
                  {selectedChoice.stability > 0 ? '+' : ''}{selectedChoice.stability}%
                </span>
              </div>
            </div>

            <div className="bg-communist-red/20 border-2 border-revolutionary-gold/50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="text-3xl">🧔</div>
                <div>
                  <h3 className="text-revolutionary-gold font-semibold mb-1">Marx's Analysis:</h3>
                  <p className="text-cream-white/90 text-sm italic">"{selectedChoice.marxQuote}"</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="flex-1 bg-steel-gray/50 hover:bg-steel-gray/70 text-cream-white font-semibold py-3 rounded-xl transition-all"
              >
                ← Back to Levels
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                className="flex-1 bg-gradient-to-r from-revolutionary-gold to-soviet-amber text-black font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Continue →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: level.background }}
    >
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-neural-green/50 shadow-2xl"
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="text-7xl mb-4"
            >
              🤖
            </motion.div>
            <h2 className="text-3xl font-bold text-neural-green mb-2">
              AI REVOLUTION!
            </h2>
            <p className="text-cream-white text-lg">
              Advanced AI has arrived! Productivity increased from{' '}
              <span className="text-cyber-blue font-bold">{level.initialProductivity}</span> to{' '}
              <span className="text-neural-green font-bold">{level.initialProductivity + level.aiBoost}</span> units/day
            </p>
          </div>

          <div className="bg-communist-red/20 border-2 border-communist-red/50 rounded-xl p-4 mb-6">
            <h3 className="text-revolutionary-gold font-semibold mb-2">⚠️ The Contradiction:</h3>
            <p className="text-cream-white text-sm">{level.currentSystem.contradiction}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-cream-white font-bold text-xl mb-4 text-center">
              How will you resolve this contradiction?
            </h3>
            <div className="space-y-4">
              {level.choices.map((choice) => (
                <motion.button
                  key={choice.id}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChoiceSelect(choice)}
                  className="w-full text-left bg-black/50 hover:bg-black/70 border-2 border-cyber-blue/30 hover:border-cyber-blue rounded-xl p-5 transition-all group"
                >
                  <h4 className="text-cream-white font-bold text-lg mb-2 group-hover:text-cyber-blue transition-colors">
                    {choice.label}
                  </h4>
                  <p className="text-cream-white/70 text-sm">{choice.description}</p>
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="w-full bg-steel-gray/30 hover:bg-steel-gray/50 text-cream-white font-semibold py-3 rounded-xl transition-all"
          >
            ← Back to Level Select
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GameLevel;
