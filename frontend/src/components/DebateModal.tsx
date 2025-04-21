import { Brain, ChevronDown, Wand2, X } from "lucide-react";
import React from "react";

type Debate = {
  topic: string;
  model1: string;
  model2: string;
  judge: string;
  rounds: number;
};

type DebateModalProps = {
  setShowNewDebateForm: (show: boolean) => void;
  handleCreateDebate: (e: React.FormEvent<HTMLFormElement>) => void;
  newDebate: Debate;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setNewDebate: React.Dispatch<React.SetStateAction<Debate>>;
};

const DebateModal: React.FC<DebateModalProps> = ({
  setShowNewDebateForm,
  handleCreateDebate,
  newDebate,
  handleInputChange,
  setNewDebate,
}) => {
  const availableModels = [
    "llama8b",
    "mistral",
    "gemma",
    "llama70b",
    "qwen",
    "scout",
  ];

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full p-6 border border-gray-700 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Wand2 size={24} className="text-red-500 mr-2" />
            Create New Debate
          </h2>
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setShowNewDebateForm(false)}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleCreateDebate}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Debate Topic
            </label>
            <input
              type="text"
              name="topic"
              value={newDebate.topic}
              onChange={handleInputChange}
              placeholder="Enter a topic or question for debate..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Opponent 1 */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                First Opponent
              </label>
              <div className="relative">
                <select
                  name="model1"
                  value={newDebate.model1}
                  onChange={handleInputChange}
                  className="appearance-none w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {availableModels.map((model) => (
                    <option key={`op1-${model}`} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown size={18} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Opponent 2 */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Second Opponent
              </label>
              <div className="relative">
                <select
                  name="model2"
                  value={newDebate.model2}
                  onChange={handleInputChange}
                  className="appearance-none w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {availableModels.map((model) => (
                    <option key={`op2-${model}`} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Judge */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Judge
              </label>
              <div className="relative">
                <select
                  name="judge"
                  value={newDebate.judge}
                  onChange={handleInputChange}
                  className="appearance-none w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {availableModels.map((model) => (
                    <option key={`judge-${model}`} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Number of Rounds */}
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Number of Rounds
            </label>
            <div className="flex items-center space-x-2">
              {[4, 6, 8, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`px-4 py-2 rounded-lg ${
                    newDebate.rounds === num
                      ? "bg-red-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() =>
                    setNewDebate((prev) => ({ ...prev, rounds: num }))
                  }
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowNewDebateForm(false)}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center"
            >
              <Brain size={18} className="mr-2" />
              Start Debate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DebateModal;
