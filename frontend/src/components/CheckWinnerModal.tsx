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

  // Reset animation state when modal opens
  useEffect(() => {
    if (isOpen) {
      setAnimationComplete(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Determine the winner color based on the model name
  const getWinnerColor = (winner: string) => {
    if (winner === debate.model1) return "bg-blue-500";
    if (winner === debate.model2) return "bg-green-500";
    return "bg-purple-500"; // Default fallback
  };

  // Determine the loser
  const getLoser = () => {
    return winnerData.winner === debate.model1 ? debate.model2 : debate.model1;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      {/* Backdrop with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm "
        onClick={onClose}
      />

      {/* Modal content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative bg-gray-900 rounded-2xl w-full max-w-2xl mx-4 overflow-hidden border border-white/20 shadow-2xl"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="relative pt-8 pb-6 px-6 text-center border-b border-white/10">
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
                  <Award size={40} className="text-yellow-500 mb-3" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white">
                  Judging debate...
                </h2>
                <p className="text-gray-400 mt-2">
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
                  <Trophy size={48} className="text-yellow-500" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles size={16} className="text-yellow-300" />
                  </motion.div>
                </motion.div>
                <h2 className="text-2xl font-bold text-white">Debate Winner</h2>
                <p className="text-gray-400 mt-1">
                  As determined by {debate.judge}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Winner content */}
        <AnimatePresence>
          {animationComplete && winnerData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-6"
            >
              {/* Winner card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="bg-gray-800/70 rounded-xl p-4 mb-6 backdrop-blur-sm border border-white/10 max-h-[300px] overflow-x-auto"
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
                      <h3 className="text-xl font-bold text-white">
                        {winnerData.winner}
                      </h3>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: "spring" }}
                        className="ml-2 bg-yellow-500/20 px-2 py-0.5 rounded text-yellow-300 text-sm font-medium flex items-center"
                      >
                        <Trophy size={12} className="mr-1" />
                        Winner
                      </motion.div>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-400 font-bold">
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
                                  ? "text-yellow-500"
                                  : "text-gray-600"
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

                <div className="pl-16">
                  <p className="text-gray-300 mb-3">{winnerData.reasoning}</p>

                  <h4 className="text-sm font-medium text-white mb-2">
                    Key highlights:
                  </h4>
                  <ul className="space-y-2">
                    {winnerData.highlights.map((highlight, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.3 + index * 0.2 }}
                        className="flex items-center text-gray-300"
                      >
                        <ArrowRight
                          size={12}
                          className="text-green-500 mr-2 flex-shrink-0"
                        />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Loser mention */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="text-center text-gray-400 text-sm"
              >
                <p>
                  {getLoser()} put up a good fight but couldn't outperform the
                  winner.
                  <br />
                  Better luck next time!
                </p>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, type: "spring" }}
                className="mt-6 flex justify-center"
              >
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg shadow-blue-900/20"
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
