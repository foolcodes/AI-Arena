import { Share2, RefreshCw, Menu, X } from "lucide-react";
import { useState } from "react";
import ShinyButton from "./ShinyButton";
import logo from "../assets/logo.png";

interface DebateHeaderProps {
  scrolled: boolean;
  setShowNewDebateForm: (show: boolean) => void;
  handleShareBattle: () => Promise<void>;
}

export const DebateHeader = ({
  scrolled,
  setShowNewDebateForm,
  handleShareBattle,
}: DebateHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-3xl shadow-lg py-4"
          : "bg-transparent py-3 md:py-6"
      }`}
    >
      <div className="container mx-auto px-8 md:px-16 flex justify-between items-center pt-3 md:py-0">
        <div className="flex items-center justify-center">
          <img src={logo} className="h-9 mr-3" />
          <div className="text-xl md:text-2xl font-bold">AI Arena</div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3">
          <button className="btn-glass text-sm" onClick={handleShareBattle}>
            <Share2 size={16} className="mr-2" />
            Share
          </button>
          <button
            className="btn-primary text-sm"
            onClick={() => setShowNewDebateForm(true)}
          >
            <RefreshCw size={16} className="mr-2" />
            New Debate
          </button>
          <ShinyButton title="View all Debates" />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden container mx-auto px-4 mt-2 pb-3 flex flex-col space-y-3 bg-background/95 backdrop-blur-lg rounded-lg shadow-lg">
          <button
            className="btn-glass w-full flex justify-center items-center py-2"
            onClick={() => {
              handleShareBattle();
              setMobileMenuOpen(false);
            }}
          >
            <Share2 size={16} className="mr-2" />
            Share
          </button>
          <button
            className="btn-primary w-full flex justify-center items-center py-2"
            onClick={() => {
              setShowNewDebateForm(true);
              setMobileMenuOpen(false);
            }}
          >
            <RefreshCw size={16} className="mr-2" />
            New Debate
          </button>
          <ShinyButton title="View all Debates" />
        </div>
      )}
    </div>
  );
};
