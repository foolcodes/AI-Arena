import { Brain } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 flex flex-col justify-between items-center">
        <div className="flex items-center justify-center mb-4">
          <div className="h-10 w-10 rounded-lg bg-red-600 flex items-center justify-center mr-3">
            <Brain className="text-white" size={24} />
          </div>
          <span className="font-bold text-xl">AI Arena</span>
        </div>
        <p className="text-gray-400">
          Exploring the frontiers of artificial intelligence through structured,
          insightful debates.
        </p>

        <div className="pt-4">
          <p className="text-gray-500">
            © 2025 AI Debate Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
