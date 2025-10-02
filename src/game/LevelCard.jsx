import { motion } from 'framer-motion';

const LevelCard = ({ level, isActive, onClick, isCompleted, outcome }) => {
  const getOutcomeIcon = () => {
    if (!isCompleted) return level.icon;
    switch (outcome) {
      case 'success': return '✨';
      case 'revolution': return '⚔️';
      case 'transition': return '⚖️';
      default: return level.icon;
    }
  };

  const getOutcomeColor = () => {
    if (!isCompleted) return 'border-cyber-blue/30';
    switch (outcome) {
      case 'success': return 'border-neural-green';
      case 'revolution': return 'border-communist-red';
      case 'transition': return 'border-revolutionary-gold';
      default: return 'border-cyber-blue/30';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={!isActive && !isCompleted}
      className={`
        relative p-6 rounded-xl border-2 transition-all
        ${isActive ? 'bg-cyber-blue/10 border-cyber-blue shadow-lg shadow-cyber-blue/20' : ''}
        ${isCompleted ? `bg-black/40 ${getOutcomeColor()}` : ''}
        ${!isActive && !isCompleted ? 'bg-black/20 border-steel-gray/30 opacity-50 cursor-not-allowed' : ''}
        ${isActive || isCompleted ? 'cursor-pointer hover:shadow-xl' : ''}
      `}
    >
      <div className="text-4xl mb-2">{getOutcomeIcon()}</div>
      <h3 className="text-cream-white font-bold text-lg mb-1">{level.name}</h3>
      <p className="text-cyber-blue text-xs">{level.era}</p>
      {isCompleted && (
        <div className="mt-2 text-xs font-semibold">
          {outcome === 'success' && <span className="text-neural-green">✓ Resolved</span>}
          {outcome === 'revolution' && <span className="text-communist-red">✗ Revolution</span>}
          {outcome === 'transition' && <span className="text-revolutionary-gold">~ Unstable</span>}
        </div>
      )}
    </motion.button>
  );
};

export default LevelCard;
