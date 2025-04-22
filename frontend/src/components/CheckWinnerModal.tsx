import { useState, useEffect } from "react";
import {
  Trophy,
  X,
  ThumbsUp,
  Brain,
  Award,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Debate {
  model1: string;
  model2: string;
  judge: string;
}

interface WinnerData {
  winner: string;
  score: number | null;
  loserScore: number | null;
  reasoning: string | null;
  highlights: string[];
}

interface CheckWinnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  winnerData: WinnerData;
  debate: Debate;
}

const CheckWinnerModal = ({
  isOpen,
  onClose,
  winnerData,
  debate,
}: CheckWinnerModalProps) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimationComplete(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getWinnerColor = (winner: string) => {
    if (winner === debate.model1) return "bg-red-500";
    if (winner === debate.model2) return "bg-orange-500";
    return "bg-pink-500";
  };

  const getLoser = () => {
    return winnerData.winner === debate.model1 ? debate.model2 : debate.model1;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl mx-4 overflow-hidden shadow-2xl border border-red-500/20"
      >
        {/* Decorative Blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pink-400/20 rounded-full blur-3xl" />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="relative pt-8 pb-6 px-6 text-center border-b border-red-500/20">
          <AnimatePresence>
            {!animationComplete ? (
              <motion.div
                key="judging"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: 1 }}
                  onAnimationComplete={() => setAnimationComplete(true)}
                >
                  <Award size={40} className="text-red-400 mb-3" />
                </motion.div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  Judging debate...
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Our judge {debate.judge} is determining the winner
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="relative mb-4"
                >
                  <Trophy size={48} className="text-red-400" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles size={16} className="text-pink-300" />
                  </motion.div>
                </motion.div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  Debate Winner
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  As determined by {debate.judge}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Winner */}
        <AnimatePresence>
          {animationComplete && winnerData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-6"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="bg-white/80 dark:bg-gray-800/70 rounded-xl p-4 mb-6 backdrop-blur-sm border border-red-500/10 max-h-[300px] overflow-x-auto"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-full ${getWinnerColor(
                      winnerData.winner
                    )} flex items-center justify-center`}
                  >
                    <Brain className="text-white" size={24} />
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                        {winnerData.winner}
                      </h3>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: "spring" }}
                        className="ml-2 bg-red-500/20 px-2 py-0.5 rounded text-red-400 text-xs md:text-sm font-medium flex items-center"
                      >
                        <Trophy size={12} className="mr-1" />
                        Winner
                      </motion.div>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-red-500 font-bold">
                        {winnerData.score}/10
                      </span>
                      <div className="ml-2 flex">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.1 + i * 0.1 }}
                          >
                            <ThumbsUp
                              size={12}
                              className={`mr-0.5 ${
                                i < Math.round((winnerData.score ?? 0) / 2)
                                  ? "text-red-400"
                                  : "text-gray-300"
                              }`}
                              fill={
                                i < Math.round((winnerData.score ?? 0) / 2)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reasoning */}
                <div className="pl-4 md:pl-16">
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {winnerData.reasoning}
                  </p>

                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Key highlights:
                  </h4>
                  <ul className="space-y-2">
                    {winnerData.highlights.map((highlight, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.3 + index * 0.2 }}
                        className="flex items-center text-gray-600 dark:text-gray-300"
                      >
                        <ArrowRight
                          size={12}
                          className="text-red-400 mr-2 flex-shrink-0"
                        />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Loser */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="text-center text-gray-500 dark:text-gray-400 text-xs md:text-sm"
              >
                <p>
                  {getLoser()} put up a strong fight but couldn't outperform the
                  winner. Better luck next time!
                </p>
              </motion.div>

              {/* Close Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, type: "spring" }}
                className="mt-6 flex justify-center"
              >
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-700 rounded-lg text-white font-medium hover:from-red-600 hover:to-red-600 transition-colors shadow-lg shadow-red-500/30"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CheckWinnerModal;
