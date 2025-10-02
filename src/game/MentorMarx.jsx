import { useState } from 'react';
import { mentorMarxQuotes } from './GameData';
import { motion, AnimatePresence } from 'framer-motion';

const MentorMarx = ({ currentLevel, showHint }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const getContextualHint = () => {
    if (!currentLevel) return mentorMarxQuotes[0];
    
    const hints = [
      `Level ${currentLevel.id}: The ${currentLevel.currentSystem.name} faces a fundamental contradiction...`,
      currentLevel.currentSystem.contradiction,
      mentorMarxQuotes[currentLevel.id - 1] || mentorMarxQuotes[0],
    ];
    
    return hints[quoteIndex % hints.length];
  };

  return (
    <AnimatePresence>
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-96 z-50"
        >
          <div className="bg-gradient-to-br from-communist-red/95 to-dark-crimson/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border-2 border-revolutionary-gold">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-revolutionary-gold rounded-full flex items-center justify-center text-3xl shadow-lg">
                🧔
              </div>
              <div className="flex-1">
                <h3 className="text-revolutionary-gold font-bold text-lg mb-2 font-sans">
                  Mentor Marx
                </h3>
                <p className="text-cream-white text-sm leading-relaxed font-paragraph">
                  "{getContextualHint()}"
                </p>
              </div>
            </div>
            <button
              onClick={() => setQuoteIndex(prev => prev + 1)}
              className="mt-4 w-full bg-revolutionary-gold/20 hover:bg-revolutionary-gold/30 text-revolutionary-gold px-4 py-2 rounded-lg transition-all text-sm font-semibold"
            >
              Next Insight →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MentorMarx;
