import { Menu, RefreshCw, X } from "lucide-react";
import ShinyButton from "./ShinyButton";
import { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

interface DebateHeaderProps {
  scrolled: boolean;
}

export const SharedBattleHeader = ({ scrolled }: DebateHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-3xl shadow-lg py-4"
          : "bg-transparent py-3 md:py-6"
      }`}
    >
      <div className="container mx-auto px-8 md:px-16 flex justify-between items-center pt-3 md:py-0">
        <div className="flex items-center justify-center pb-2">
          <img src={logo} className="h-9 mr-3" />
          <div className="text-xl md:text-2xl font-bold">AI Arena</div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            className="btn-primary text-sm"
            onClick={() => navigate("/battle")}
          >
            <RefreshCw size={16} className="mr-2" />
            New Battle
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
            className="btn-primary w-full flex justify-center items-center py-4"
            onClick={() => navigate("/battle")}
          >
            <RefreshCw size={16} className="mr-2" />
            New Battle
          </button>
          <ShinyButton title="View Battles" />
        </div>
      )}
    </div>
  );
};
