import { Brain, Clock } from "lucide-react";

interface DebateMessageProps {
  message: {
    turn: number;
    sender: string;
    message: string;
    color: string;
    timestamp: string;
    model: string;
  };
}

export const DebateMessage = ({ message }: DebateMessageProps) => {
  return (
    <div className="group flex flex-col animate-fade-in">
      <div className="flex items-center mb-2">
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-br from-${message.color}-400 to-${message.color}-600 flex items-center justify-center mr-1 md:mr-3 shadow-glow-${message.color}`}
        >
          <Brain size={20} className="text-white" />
        </div>
        <div className="font-medium text-white">{message.model}</div>
        <div className="ml-auto text-xs text-gray-400 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Clock size={12} className="mr-1" />
          {message.timestamp}
        </div>
      </div>

      <div className="ml-2 md:ml-13">
        <div className="relative">
          <div className="absolute -left-2 top-4 w-4 h-4 transform rotate-45 bg-gray-800"></div>
          <div className="bg-gray-800 rounded-lg p-5 shadow-xl backdrop-blur-sm">
            <p className="text-gray-200 leading-relaxed">{message.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
