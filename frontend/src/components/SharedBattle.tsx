import { useEffect, useState } from "react";
import { fetchBattle } from "../api/fetchBattle";
import { Award, Brain, RefreshCw } from "lucide-react";
import { DebateMessage } from "./DebateMessage";
import { SharedBattleHeader } from "./SharedBattleHeader";

const SharedBattle = () => {
  interface Message {
    turn: number;
    sender: string;
    message: string;
    color: string;
    timestamp: string;
    model: string;
  }
  const [debate, setDebate] = useState({
    topic: "Who is the perfect character in the series F.R.E.I.N.D.S",
    model1: "llama8b",
    model2: "mistral",
    judge: "gemma",
    rounds: 6,
  });

  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    const sharableBattle = async () => {
      const url = new URL(window.location.href);
      const pathSegments = url.pathname.split("/");
      const battleIdFromUrl = pathSegments[pathSegments.length - 1];

      const extractedId = battleIdFromUrl.replace("battle:", "");

      const response = await fetchBattle(extractedId);
      setMessages(response.battleData.messages);
      const debateData = {
        topic: response.battleData.topic,
        model1: response.battleData.model1,
        model2: response.battleData.model2,
        rounds: response.battleData.rounds,
        judge: response.battleData.judge,
      };
      setDebate(debateData);
    };
    sharableBattle();
  }, []);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // Scroll to top when the route changes

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden p-4 md:p-12">
      {/* Animated background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-r from-red-400/20 to-red-600/20 blur-[100px] transform -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-r from-orange-400/20 to-red-500/20 blur-[100px] transform translate-y-1/2" />
      </div>
      <SharedBattleHeader scrolled={scrolled} />
      {/* Main content */}
      <div className="container mx-auto px-4 py-20">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            "{debate.topic}"
          </h1>

          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                  <Brain className="tex-white" size={20} />
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
            </div>
          </div>
        </div>

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
        </div>
      </div>
    </div>
  );
};

export default SharedBattle;
