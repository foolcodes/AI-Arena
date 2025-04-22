import { useState, useEffect } from "react";
import { DebateHeader } from "../components/DebateHeader";
import { DebateMessage } from "./DebateMessage";
import {
  Brain,
  Award,
  ChevronRight,
  RefreshCw,
  HelpCircle,
  Check,
  Copy,
} from "lucide-react";
import ShowHelp from "./ShowHelp";
import DebateModal from "./DebateModal";
import { startBattle } from "../api/startBattle";
import { shareBattle } from "../api/shareBattle";
import CheckWinnerModal from "./CheckWinnerModal";

const Battle = () => {
  interface WinnerData {
    winner: string;
    score: number | null;
    loserScore: number | null;
    reasoning: string | null;
    highlights: string[];
  }

  const [winnerData, setWinnerData] = useState<WinnerData>({
    winner: "llama8b",
    score: 9,
    reasoning: `llama8b demonstrated superior arguments, better evidence, and more compelling reasoning throughout the debate on F.R.I.E.N.D.S".`,
    highlights: [
      "Strong opening statement with clear thesis",
      "Effectively countered opponent's key points",
      "Used compelling examples and evidence",
      "Maintained consistent logical structure",
    ],
    loserScore: 7,
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  const [showNewDebateForm, setShowNewDebateForm] = useState(false);
  const [battleId, setBattleId] = useState<string | null>(null);
  const [showShareToast, setShowShareToast] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [isLoadingWinner, setIsLoadingWinner] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //Debatform state
  const [newDebate, setNewDebate] = useState({
    topic: "",
    model1: "llama8b",
    model2: "llama8b",
    judge: "llama8b",
    rounds: 6,
  });

  const [debate, setDebate] = useState({
    topic: "Who is the perfect character in the series F.R.E.I.N.D.S",
    model1: "llama8b",
    model2: "mistral",
    judge: "gemma",
    rounds: 6,
  });

  interface Message {
    turn: number;
    sender: string;
    message: string;
    color: string;
    timestamp: string;
    model: string;
  }

  // default debate messages
  const sampleMessages: Message[] = [
    {
      turn: 1,
      sender: debate.model1,
      message:
        "Clearly, Chandler Bing is the perfect character! His sarcasm is a survival mechanism, his jokes are legendary, and let's be honest — without him, the group would have *zero* comic timing. He's the glue holding their dysfunctional lives together, one punchline at a time!",
      color: "green",
      timestamp: "00:08",
      model: debate.model1,
    },
    {
      turn: 2,
      sender: debate.model2,
      message:
        "Hold on! It's obviously Joey Tribbiani. He's pure-hearted, endlessly loyal, and honestly, who can resist 'How you doin'?' Joey brings joy without even trying — *plus*, he can finish a whole pizza by himself. That's talent *and* commitment, my friend!",
      color: "blue",
      timestamp: "00:21",
      model: debate.model2,
    },
    {
      turn: 3,
      sender: debate.model1,
      message:
        "Joey is adorable, but let's be real — if wisdom was a pizza, Joey would still be hungry. Chandler, on the other hand, drops wisdom bombs hidden inside jokes. Plus, who else would make Thanksgiving awkwardness 10x funnier every single year?",
      color: "green",
      timestamp: "00:36",
      model: debate.model1,
    },
    {
      turn: 4,
      sender: debate.model2,
      message:
        "Wisdom shmisdom! Joey gives us what really matters — love, loyalty, and a good appetite. You can't survive New York sarcasm alone, but you *can* survive anything with a Joey by your side... and maybe a meatball sub too!",
      color: "blue",
      timestamp: "00:51",
      model: debate.model2,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(sampleMessages);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // Scroll to top when the route changes

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewDebate((prev) => ({ ...prev, [name]: value }));
  };

  const handleShareBattle = async () => {
    try {
      const response = await shareBattle(
        debate.topic,
        debate.model1,
        debate.model2,
        debate.judge,
        debate.rounds,
        messages
      );

      const id = response.battle._id;
      setBattleId(id);

      // Creating the shareable URL
      const shareableUrl = `${window.location.origin}/battle/${id}`;

      // Copying to clipboard
      await navigator.clipboard.writeText(shareableUrl);

      // Showing success toast
      setCopySuccess(true);
      setShowShareToast(true);

      // Hiding toast after 3 seconds
      setTimeout(() => {
        setShowShareToast(false);
        setCopySuccess(false);
      }, 3000);
    } catch (error) {
      // Showing error toast
      setCopySuccess(false);
      setShowShareToast(true);

      // Hiding toast after 3 seconds
      setTimeout(() => {
        setShowShareToast(false);
      }, 3000);
    }
  };

  const handleCheckWinner = async () => {
    setIsLoadingWinner(true);

    setTimeout(() => {
      setIsLoadingWinner(false);
      setShowWinnerModal(true);
    }, 1500);
  };

  // Handle creating a new debate
  const handleCreateDebate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages([]);
    setShowNewDebateForm(false);
    try {
      const response = await startBattle(
        newDebate.model1,
        newDebate.model2,
        newDebate.topic,
        newDebate.rounds
      );

      setMessages(response.debate);
      setDebate(newDebate);

      const judgement = response.judgement;

      const winnerMatch = judgement.match(/WINNER: ([^\n]+)/);
      const scoreMatch = judgement.match(/SCORE: ([0-9]+) - ([0-9]+)/);
      const reasoningMatch = judgement.match(/ (.+)$/s);

      const winner = winnerMatch ? winnerMatch[1].trim() : null;
      const loserScore = scoreMatch ? parseInt(scoreMatch[1]) : null;
      const winnerScore = scoreMatch ? parseInt(scoreMatch[2]) : null;
      const reasoning = reasoningMatch ? reasoningMatch[1].trim() : null;

      let highlights = [];
      if (reasoning) {
        const sentences = reasoning.split(". ");
        highlights = sentences
          .filter(
            (s: string) =>
              s.includes("demonstrated") ||
              s.includes("showcased") ||
              s.includes("effectively") ||
              s.includes("strong") ||
              s.includes("creative") ||
              s.includes("confident")
          )
          .slice(0, 3)
          .map((s: string) => s.trim() + (s.endsWith(".") ? "" : "."));

        // If we couldn't extract enough highlights, adding some generic ones
        if (highlights.length < 2) {
          highlights = [
            `${winner} demonstrated superior debating skills.`,
            `${winner} presented more compelling arguments.`,
            `${winner} showed better engagement with the topic.`,
          ];
        }
      }

      setWinnerData({
        winner,
        score: winnerScore,
        loserScore,
        reasoning,
        highlights,
      });

      if (response.id) {
        setBattleId(response.id);
      }
    } catch (error: any) {
      console.error("Failed to start debate:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden py-5 md:py-12 md:px-12 px-4">
      {/* Animated background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-r from-red-400/20 to-red-600/20 blur-[100px] transform -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-r from-orange-400/20 to-red-500/20 blur-[100px] transform translate-y-1/2" />
      </div>
      <DebateHeader
        scrolled={scrolled}
        setShowNewDebateForm={setShowNewDebateForm}
        handleShareBattle={handleShareBattle}
      />

      {/* Share success toast */}
      {showShareToast && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center space-x-2 px-4 py-2 rounded-md text-white ${
            copySuccess ? "bg-green-600" : "bg-red-600"
          } shadow-lg transition-all`}
        >
          {copySuccess ? (
            <>
              <Check size={18} />
              <span>Share link copied to clipboard!</span>
            </>
          ) : (
            <span>Failed to copy share link</span>
          )}
        </div>
      )}

      {/* New Debate Form Modal */}
      {showNewDebateForm && (
        <DebateModal
          setShowNewDebateForm={setShowNewDebateForm}
          handleCreateDebate={handleCreateDebate}
          newDebate={newDebate}
          handleInputChange={handleInputChange}
          setNewDebate={setNewDebate}
        />
      )}

      {/* Main content */}
      <div className="container mx-auto px-4 py-20">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            "{debate.topic}"
          </h1>

          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <Brain className="text-white" size={20} />
                </div>
                <span className="text-white ml-2">{debate.model1}</span>
              </div>

              <div className="font-bold text-red-500">VS</div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Brain className="text-white" size={20} />
                </div>
                <span className="text-white ml-2">{debate.model2}</span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center mr-2">
                <Award className="text-white" size={20} />
              </div>
              <span className="text-gray-300 text-sm">
                Judge: {debate.judge}
              </span>
              <button
                className="ml-2 text-gray-400 hover:text-white"
                onClick={() => setShowHelp(!showHelp)}
              >
                <HelpCircle size={16} />
              </button>
            </div>
          </div>

          {showHelp && <ShowHelp setShowHelp={setShowHelp} />}
        </div>

        {/* Battle ID display */}
        {battleId && (
          <div className="flex items-center mb-4 bg-gray-800 rounded-lg p-2 max-w-md">
            <span className="text-gray-300 text-sm truncate flex-1">
              Battle ID: {battleId}
            </span>
            <button
              className="ml-2 p-1 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white"
              onClick={async () => {
                const shareableUrl = `${window.location.origin}/battle:${battleId}`;
                await navigator.clipboard.writeText(shareableUrl);
                setCopySuccess(true);
                setShowShareToast(true);
                setTimeout(() => {
                  setShowShareToast(false);
                  setCopySuccess(false);
                }, 3000);
              }}
            >
              <Copy size={16} />
            </button>
          </div>
        )}

        {/* Chat container */}
        <div className="chat-container rounded-xl shadow-2xl overflow-hidden border border-white/10">
          {/* Messages */}
          <div className="p-6 h-[600px] overflow-y-auto space-y-6">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-500 animate-pulse flex flex-col items-center">
                  <RefreshCw size={30} className="mb-2 animate-spin" />
                  <p>Loading debate...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <DebateMessage key={message.turn} message={message} />
                ))}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="bg-gradient-subtle p-4 border-t border-white/10">
            <div className="flex items-center justify-center">
              {" "}
              <button
                onClick={handleCheckWinner}
                disabled={isLoadingWinner}
                className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium ${
                  isLoadingWinner
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {isLoadingWinner ? (
                  <>
                    <RefreshCw size={18} className="mr-2 animate-spin" />
                    Judging...
                  </>
                ) : (
                  <>
                    <ChevronRight size={18} className="mr-2" />
                    Check winner
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        <CheckWinnerModal
          isOpen={showWinnerModal}
          onClose={() => setShowWinnerModal(false)}
          winnerData={winnerData}
          debate={debate}
        />
      </div>
    </div>
  );
};

export default Battle;
