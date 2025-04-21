import { Brain, Star } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    // Scroll event listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-lg bg-red-600 flex items-center justify-center mr-3">
            <Brain className="text-white" size={24} />
          </div>
          <span className="font-bold text-xl text-gray-900">AI Arena</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-700 hover:text-red-600 font-medium transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-700 hover:text-red-600 font-medium transition-colors"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="text-gray-700 hover:text-red-600 font-medium transition-colors"
          >
            Testimonials
          </a>
          <a
            href="#faq"
            className="text-gray-700 hover:text-red-600 font-medium transition-colors"
          >
            FAQ
          </a>
        </div>

        <button
          onClick={() =>
            window.open("https://github.com/foolcodes/AI-Arena", "_blank")
          }
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <span className="flex justify-center items-center">
            <Star />
            <span className="ml-2.5">Star us</span>
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
