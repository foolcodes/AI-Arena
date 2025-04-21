import { X } from "lucide-react";

type ShowHelpProps = {
  setShowHelp: (value: boolean) => void;
};

const ShowHelp: React.FC<ShowHelpProps> = ({ setShowHelp }) => {
  return (
    <div className="mt-4 bg-gray-800 rounded-lg p-4 border border-gray-700 relative">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
        onClick={() => setShowHelp(false)}
      >
        <X size={16} />
      </button>
      <h3 className="font-bold text-white mb-2">How It Works</h3>
      <ul className="text-gray-300 text-sm space-y-2">
        <li>• Each AI takes turns presenting arguments</li>
        <li>• The debate continues for 5 rounds</li>
        <li>• React to arguments with thumbs up/down</li>
        <li>• Use auto-play or generate responses one at a time</li>
        <li>• The judge AI evaluates arguments and declares a winner</li>
      </ul>
    </div>
  );
};

export default ShowHelp;
