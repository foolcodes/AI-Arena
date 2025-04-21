import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Award,
  Brain,
  Calendar,
  ChevronRight,
  Layers,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { likeBattle } from "../api/likeBattle";
import { dislikeBattle } from "../api/dislikeBattle";
import { useState } from "react";

interface Battle {
  _id: string;
  topic: string;
  model1: string;
  model2: string;
  judge: string;
  rounds: number;
  createdAt: string;
  upVote: number;
  downVote: number;
}

interface BattleCardProps {
  index: number;
  battle: Battle;
}

const BattleCard = ({ index, battle }: BattleCardProps) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleReaction = async (reaction: "like" | "dislike") => {
    try {
      if (reaction === "like") {
        await likeBattle(battle._id);
        setLiked((prev) => !prev);
        setDisliked(false);
      } else {
        await dislikeBattle(battle._id);
        setDisliked((prev) => !prev);
        setLiked(false);
      }
    } catch (error) {
      console.error("Failed to react to battle:", error);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-gray-800/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm hover:shadow-lg hover:shadow-blue-900/20 transition-all"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-lg line-clamp-1" title={battle.topic}>
            {battle.topic}
          </h3>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <Brain className="text-white" size={16} />
            </div>
            <span className="text-white ml-2 text-sm">{battle.model1}</span>
          </div>

          <div className="font-bold text-red-500 text-sm">VS</div>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <Brain className="text-white" size={16} />
            </div>
            <span className="text-white ml-2 text-sm">{battle.model2}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1 text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
            <Award size={12} />
            <span>Judge: {battle.judge}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
            <Layers size={12} />
            <span>{battle.rounds} Rounds</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
            <Calendar size={12} />
            <span>{formatDate(battle.createdAt)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleReaction("like")}
              className={`flex items-center gap-1 ${
                liked ? "text-blue-400" : "text-gray-400 hover:text-blue-400"
              } transition-colors`}
            >
              <ThumbsUp size={18} />
              <span>{battle.upVote}</span>
            </button>

            <button
              onClick={() => handleReaction("dislike")}
              className={`flex items-center gap-1 ${
                disliked ? "text-red-400" : "text-gray-400 hover:text-red-400"
              } transition-colors`}
            >
              <ThumbsDown size={18} />
              <span>{battle.downVote}</span>
            </button>
          </div>

          <button
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
            onClick={() => navigate(`/battle/${battle._id}`)}
          >
            <span className="text-sm">View</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BattleCard;
