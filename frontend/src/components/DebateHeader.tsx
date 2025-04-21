import { Share2, RefreshCw } from "lucide-react";
import ShinyButton from "./ShinyButton";

interface DebateHeaderProps {
  scrolled: boolean;
  setShowNewDebateForm: (show: boolean) => void;
  handleShareBattle: () => Promise<void>; // Changed to function type that returns a Promise
}

export const DebateHeader = ({
  scrolled,
  setShowNewDebateForm,
  handleShareBattle,
}: DebateHeaderProps) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 p-12 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg shadow-lg py-2"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">
            AI<span className="font-extrabold">Debate</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-glass" onClick={handleShareBattle}>
            <Share2 size={16} className="mr-2" />
            Share
          </button>
          <button
            className="btn-primary"
            onClick={() => setShowNewDebateForm(true)}
          >
            <RefreshCw size={16} className="mr-2" />
            New Debate
          </button>
          <ShinyButton title="View all Debates" />
        </div>
      </div>
    </div>
  );
};
