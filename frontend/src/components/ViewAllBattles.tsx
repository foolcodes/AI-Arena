import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, SortDesc, Layers } from "lucide-react";
import { fetchAllBattles } from "../api/fetchAllBattles";
import BattleCard from "./BattleCard";

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

const ViewAllBattles = () => {
  const [battles, setBattles] = useState<Battle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [filterModel, setFilterModel] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch all battles
  useEffect(() => {
    const fetchBattles = async () => {
      setIsLoading(true);
      try {
        const response = await fetchAllBattles();
        setBattles(response.battles);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch battles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBattles();
  }, []);

  // Filter and sort battles
  const filteredBattles = battles.filter((battle) => {
    const matchesTerm =
      battle.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      battle.model1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      battle.model2.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesModel = filterModel
      ? battle.model1 === filterModel ||
        battle.model2 === filterModel ||
        battle.judge === filterModel
      : true;

    return matchesTerm && matchesModel;
  });

  const sortedBattles = [...filteredBattles].sort((a, b) => {
    switch (sortOption) {
      case "recent":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "popular":
        return b.upVote - b.downVote - (a.upVote - a.downVote);
      case "rounds":
        return b.rounds - a.rounds;
      default:
        return 0;
    }
  });

  // Get unique models for filter
  const allModels = Array.from(
    new Set(
      battles.flatMap((battle) => [battle.model1, battle.model2, battle.judge])
    )
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden p-4 md:p-12">
      {/* Animated background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-[100px] transform -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-[100px] transform translate-y-1/2" />
      </div>

      {/* Header */}
      <header className="relative z-10 mb-12">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI Debate Battles
        </motion.h1>
        <motion.div
          className="bg-white/5 h-1 w-24 mx-auto rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ delay: 0.2, duration: 0.8 }}
        />
      </header>

      {/* Search and filters */}
      <div className="container mx-auto max-w-6xl mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search topics or models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/50 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 hover:bg-gray-700 border border-white/10 rounded-lg transition-colors"
            >
              <Filter size={18} />
              <span className="hidden md:inline">Filters</span>
            </button>

            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-gray-800/50 border border-white/10 rounded-lg py-3 pl-4 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
                <option value="rounds">Most Rounds</option>
              </select>
              <SortDesc
                size={18}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Expanded filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-gray-800/50 border border-white/10 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-3">
                  Filter by Model
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilterModel("")}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filterModel === ""
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    All
                  </button>

                  {allModels.map((model) => (
                    <button
                      key={model}
                      onClick={() => setFilterModel(model)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        filterModel === model
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Battle cards */}
      <div className="container mx-auto max-w-6xl">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : sortedBattles.length === 0 ? (
          <div className="text-center py-20">
            <Layers size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-medium text-gray-400">
              No battles found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {sortedBattles.map((battle, index) => (
                <BattleCard index={index} battle={battle} key={index} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllBattles;
