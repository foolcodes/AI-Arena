import { Brain } from "lucide-react";

interface MessageBubbleProps {
  content: string;
  model: string;
  isAI2?: boolean;
}

const MessageBubble = ({
  content,
  model,
  isAI2 = false,
}: MessageBubbleProps) => {
  return (
    <div
      className={`
        flex w-full gap-3 my-4
        ${isAI2 ? "flex-row-reverse" : "flex-row"}
      `}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0",
          ${isAI2 ? "bg-green-500" : "bg-blue-500"}`}
      >
        <Brain className="text-white" size={20} />
      </div>
      <div
        className={`
          flex flex-col max-w-[80%] mx-2",
          ${isAI2 ? "items-end" : "items-start"}
        `}
      >
        <span className="text-sm text-gray-400 mb-1">{model}</span>
        <div
          className={`
            rounded-2xl px-4 py-2 text-white",
            ${
              isAI2
                ? "bg-green-500 rounded-br-none"
                : "bg-blue-500 rounded-bl-none"
            }`}
        >
          <p className="text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
