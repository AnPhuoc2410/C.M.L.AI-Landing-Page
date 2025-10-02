import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { levels } from './GameData';
import LevelCard from './LevelCard';
import GameLevel from './GameLevel';
import MentorMarx from './MentorMarx';

const Contradiction40Game = () => {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'levelSelect', 'playing', 'completed'
  const [currentLevel, setCurrentLevel] = useState(null);
  const [completedLevels, setCompletedLevels] = useState({});
  const [showMentor, setShowMentor] = useState(false);
  const [totalStability, setTotalStability] = useState(0);

  const handleStartGame = () => {
    setGameState('levelSelect');
  };

  const handleLevelSelect = (level) => {
    setCurrentLevel(level);
    setGameState('playing');
    setShowMentor(true);
  };

  const handleChoiceMade = (outcome, levelId) => {
    setCompletedLevels(prev => ({
      ...prev,
      [levelId]: outcome,
    }));

    const choice = levels.find(l => l.id === levelId).choices.find(c => c.outcome === outcome);
    setTotalStability(prev => prev + choice.stability);

    if (levelId === levels.length) {
      setGameState('completed');
    } else {
      setGameState('levelSelect');
      setCurrentLevel(null);
    }
  };

  const handleBackToLevelSelect = () => {
    setCurrentLevel(null);
    setGameState('levelSelect');
    setShowMentor(false);
  };

  const handleRestart = () => {
    setGameState('menu');
    setCurrentLevel(null);
    setCompletedLevels({});
    setTotalStability(0);
    setShowMentor(false);
  };

  const getOverallOutcome = () => {
    if (totalStability >= 100) return 'utopia';
    if (totalStability >= 0) return 'stable';
    if (totalStability >= -50) return 'crisis';
    return 'collapse';
  };

  // Main Menu
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-communist-red/20 to-cyber-blue/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full text-center"
        >
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="text-6xl md:text-7xl font-bold text-cream-white mb-4 leading-tight"
          >
            CONTRADICTION 4.0
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-cyber-blue text-xl mb-8"
          >
            Productive Forces vs. Relations of Production
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 mb-8 border-2 border-revolutionary-gold/50"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-4xl">🤖</span>
              <span className="text-3xl text-revolutionary-gold">⚔️</span>
              <span className="text-4xl">🏭</span>
            </div>
            <p className="text-cream-white leading-relaxed mb-4">
              Navigate through three historical societies as advanced AI disrupts traditional 
              production relations. Will you adapt social structures to match new productive forces, 
              or will contradictions tear society apart?
            </p>
            <p className="text-cyber-blue text-sm italic">
              "The history of all hitherto existing society is the history of contradictions." - Marx (probably)
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartGame}
            className="w-full bg-gradient-to-r from-communist-red to-revolutionary-gold text-cream-white font-bold py-4 rounded-xl text-xl shadow-2xl hover:shadow-revolutionary-gold/50 transition-all"
          >
            Start Revolution →
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowMentor(!showMentor)}
            className="mt-4 text-revolutionary-gold hover:text-cream-white transition-colors text-sm flex items-center justify-center gap-2 mx-auto"
          >
            <span>🧔</span> {showMentor ? 'Hide' : 'Show'} Mentor Marx
          </motion.button>
        </motion.div>

        <MentorMarx currentLevel={null} showHint={showMentor} />
      </div>
    );
  }

  // Level Select
  if (gameState === 'levelSelect') {
    const completedCount = Object.keys(completedLevels).length;
    const successCount = Object.values(completedLevels).filter(o => o === 'success').length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-steel-gray/30 to-cyber-blue/20 p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-cream-white mb-4">
              Choose Your Era
            </h1>
            <p className="text-cyber-blue text-lg mb-4">
              Navigate the dialectical contradictions of history
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <div className="text-cream-white">
                Progress: <span className="text-revolutionary-gold font-bold">{completedCount}/3</span>
              </div>
              <div className="text-cream-white">
                Successes: <span className="text-neural-green font-bold">{successCount}</span>
              </div>
              <div className="text-cream-white">
                Stability: <span className={`font-bold ${totalStability >= 0 ? 'text-neural-green' : 'text-communist-red'}`}>
                  {totalStability > 0 ? '+' : ''}{totalStability}
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {levels.map((level, index) => {
              const isActive = index === 0 || completedLevels[level.id - 1];
              const isCompleted = !!completedLevels[level.id];
              
              return (
                <LevelCard
                  key={level.id}
                  level={level}
                  isActive={isActive}
                  isCompleted={isCompleted}
                  outcome={completedLevels[level.id]}
                  onClick={() => isActive && handleLevelSelect(level)}
                />
              );
            })}
          </div>

          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMentor(!showMentor)}
              className="bg-revolutionary-gold/20 hover:bg-revolutionary-gold/30 text-revolutionary-gold px-6 py-3 rounded-xl font-semibold transition-all border-2 border-revolutionary-gold/50"
            >
              🧔 {showMentor ? 'Hide' : 'Show'} Mentor Marx
            </motion.button>
            
            {completedCount === 3 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGameState('completed')}
                className="bg-gradient-to-r from-neural-green to-cyber-blue text-black px-6 py-3 rounded-xl font-bold shadow-lg"
              >
                View Final Analysis →
              </motion.button>
            )}
          </div>
        </motion.div>

        <MentorMarx currentLevel={currentLevel} showHint={showMentor} />
      </div>
    );
  }

  // Playing Level
  if (gameState === 'playing' && currentLevel) {
    return (
      <>
        <GameLevel
          level={currentLevel}
          onChoiceMade={handleChoiceMade}
          onBack={handleBackToLevelSelect}
        />
        <MentorMarx currentLevel={currentLevel} showHint={showMentor} />
        
        <button
          onClick={() => setShowMentor(!showMentor)}
          className="fixed top-4 right-4 bg-revolutionary-gold/80 hover:bg-revolutionary-gold text-black w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all z-40"
        >
          🧔
        </button>
      </>
    );
  }

  // Game Completed
  if (gameState === 'completed') {
    const outcome = getOverallOutcome();
    const successCount = Object.values(completedLevels).filter(o => o === 'success').length;
    const revolutionCount = Object.values(completedLevels).filter(o => o === 'revolution').length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-communist-red/30 to-cyber-blue/30 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-3xl w-full"
        >
          <div className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-revolutionary-gold shadow-2xl">
            <h1 className="text-5xl font-bold text-center text-revolutionary-gold mb-6">
              Historical Analysis Complete
            </h1>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-neural-green/20 rounded-xl p-4 text-center border-2 border-neural-green/50">
                <div className="text-3xl mb-2">✨</div>
                <div className="text-2xl font-bold text-neural-green">{successCount}</div>
                <div className="text-cream-white text-sm">Harmonious Resolutions</div>
              </div>
              <div className="bg-revolutionary-gold/20 rounded-xl p-4 text-center border-2 border-revolutionary-gold/50">
                <div className="text-3xl mb-2">⚖️</div>
                <div className="text-2xl font-bold text-revolutionary-gold">
                  {3 - successCount - revolutionCount}
                </div>
                <div className="text-cream-white text-sm">Unstable Transitions</div>
              </div>
              <div className="bg-communist-red/20 rounded-xl p-4 text-center border-2 border-communist-red/50">
                <div className="text-3xl mb-2">⚔️</div>
                <div className="text-2xl font-bold text-communist-red">{revolutionCount}</div>
                <div className="text-cream-white text-sm">Revolutions</div>
              </div>
            </div>

            <div className="bg-black/60 rounded-2xl p-6 mb-6 border-2 border-cyber-blue/50">
              <h2 className="text-2xl font-bold text-cyber-blue mb-4">
                {outcome === 'utopia' && '🌟 Communist Utopia Achieved!'}
                {outcome === 'stable' && '✅ Stable Socialist Society'}
                {outcome === 'crisis' && '⚠️ Society in Crisis'}
                {outcome === 'collapse' && '💥 Complete Systemic Collapse'}
              </h2>
              <p className="text-cream-white leading-relaxed mb-4">
                {outcome === 'utopia' && 'Perfect harmony between productive forces and relations of production! You\'ve created a society where AI serves humanity and all benefit equally.'}
                {outcome === 'stable' && 'You\'ve managed contradictions well. While not perfect, society has adapted to new productive forces with minimal disruption.'}
                {outcome === 'crisis' && 'Multiple contradictions remain unresolved. Society teeters on the edge, with growing tensions between classes.'}
                {outcome === 'collapse' && 'The contradictions proved too severe. Society has descended into chaos as old relations crumbled under new productive forces.'}
              </p>
              <div className="text-center">
                <span className="text-sm text-cream-white/70">Total Stability Score: </span>
                <span className={`text-2xl font-bold ${totalStability >= 0 ? 'text-neural-green' : 'text-communist-red'}`}>
                  {totalStability > 0 ? '+' : ''}{totalStability}
                </span>
              </div>
            </div>

            <div className="bg-communist-red/20 rounded-2xl p-6 mb-6 border-2 border-revolutionary-gold/50">
              <div className="flex items-start gap-4">
                <div className="text-5xl">🧔</div>
                <div>
                  <h3 className="text-revolutionary-gold font-bold text-xl mb-2">Marx's Final Verdict:</h3>
                  <p className="text-cream-white italic">
                    {outcome === 'utopia' && '"The free development of each is the condition for the free development of all. You have transcended the realm of necessity!"'}
                    {outcome === 'stable' && '"Progress, but the struggle continues. Remember: the emancipation of the working class must be the work of the workers themselves."'}
                    {outcome === 'crisis' && '"The contradictions sharpen. History shows that no social order perishes before all productive forces are fully developed within it."'}
                    {outcome === 'collapse' && '"Capitalism produces its own gravediggers. From the ashes, new forms must emerge - but at what cost?"'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRestart}
                className="flex-1 bg-gradient-to-r from-communist-red to-revolutionary-gold text-cream-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                🔄 Play Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGameState('levelSelect')}
                className="flex-1 bg-cyber-blue/20 hover:bg-cyber-blue/30 text-cyber-blue border-2 border-cyber-blue font-bold py-4 rounded-xl transition-all"
              >
                📊 Review Levels
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default Contradiction40Game;
