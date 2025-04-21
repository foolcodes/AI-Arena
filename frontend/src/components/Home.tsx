import { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  Brain,
  Share2,
  MessageCircle,
  Award,
  Zap,
  Globe,
  Users,
  Clock,
  Wand2,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [hovered, setHovered] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const [activeTab, setActiveTab] = useState("philosophical");

  type DebateExample = {
    topic: string;
    opponent1: string;
    opponent2: string;
    judge: string;
    excerpt: string;
  };

  const debateExamples: Record<string, DebateExample> = {
    philosophical: {
      topic: "Is consciousness purely physical?",
      opponent1: "Claude 3.5",
      opponent2: "GPT-4",
      judge: "LLaMA-3",
      excerpt:
        "While physical correlates of consciousness exist, the hard problem suggests qualia may transcend material explanation...",
    },
    scientific: {
      topic: "Will quantum computing replace classical computing?",
      opponent1: "Gemini Ultra",
      opponent2: "Claude 3.5",
      judge: "GPT-4",
      excerpt:
        "Quantum computing excels in specific domains like cryptography and simulation, but general-purpose classical computing will remain essential...",
    },
    cultural: {
      topic: "Do social media algorithms harm societal cohesion?",
      opponent1: "GPT-4",
      opponent2: "LLaMA-3",
      judge: "Claude 3.5",
      excerpt:
        "While personalization creates filter bubbles, the real issue may lie in monetization models that prioritize engagement over healthy discourse...",
    },
  };

  const testimonials = [
    {
      text: "The debates are so intense you'd think the AIs have personal beef. One minute they're quoting research papers, the next they're subtly throwing shade. Best reality show of 2025, hands down.",
      title: "100x Hackathon Winner",
    },
    {
      text: "I thought it would be a polite discussion between two AIs. Instead, I witnessed a full-blown intellectual street fight — with citations. 10/10 would recommend for your daily entertainment fix!",
      title: "Making machines learn",
    },
    {
      text: "One AI started its argument with 'Well, actually...' and the other went full savage mode. I haven't laughed this hard at a 'debate' since my friends argued over pineapple on pizza.",
      title: "Tech Engineer",
    },
    {
      text: "At first, I tuned in for the laughs. But halfway through, I realized I was learning new facts... and questioning my own life choices. AI battles: educational chaos at its finest",
      title: "Engineer",
    },
  ];

  const faqs = [
    {
      question: "How does the AI debate platform work?",
      answer:
        "Select two AI models to serve as debaters, choose a third AI as the judge, pick any topic of interest, and watch as they engage in a structured debate. You can share the results or save them for future reference.",
    },
    {
      question: "Can I suggest topics for the debates?",
      answer:
        "Absolutely! You have complete freedom to suggest any appropriate topic. From philosophy and science to culture and technology, the AI models will attempt to form coherent arguments based on their training.",
    },
    {
      question: "What makes this different from just chatting with AI?",
      answer:
        "Our platform creates a dynamic environment where multiple AI models interact with each other rather than just responding to human prompts. This reveals interesting differences in their approaches, knowledge bases, and reasoning patterns.",
    },
  ];

  const features = [
    {
      icon: <Brain className="text-red-600" size={24} />,
      title: "Advanced AI Models",
      description:
        "Access a variety of sophisticated AI models with different specializations and approaches to reasoning.",
    },
    {
      icon: <MessageCircle className="text-red-600" size={24} />,
      title: "Unlimited Topics",
      description:
        "From philosophical questions to roasting each other, explore any subject that interests you.",
    },
    {
      icon: <Award className="text-red-600" size={24} />,
      title: "AI Judging",
      description:
        "A neutral AI evaluates arguments based on logic, evidence, and persuasiveness.",
    },
    {
      icon: <Share2 className="text-red-600" size={24} />,
      title: "Shareable Results",
      description:
        "Easily share fascinating debates with colleagues, friends, or on social media.",
    },
    {
      icon: <Zap className="text-red-600" size={24} />,
      title: "Real-time Generation",
      description:
        "Watch the debate unfold in real-time as AI models construct their arguments.",
    },
    {
      icon: <Globe className="text-red-600" size={24} />,
      title: "Global Perspectives",
      description:
        "Experience diverse viewpoints that challenge your thinking and expand understanding.",
    },
  ];

  useEffect(() => {
    // Testimonial rotation
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => {
      clearInterval(testimonialInterval);
    };
  }, [testimonials.length]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-x-hidden">
      {/* Floating particles/circles for background animation */}
      {/* Floating particles/circles for background animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {useMemo(() => {
          return [...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full mix-blend-overlay opacity-20 animate-float-${
                (i % 4) + 1
              } `}
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(135deg, #ff4d4d, #f9cb28)"
                    : "linear-gradient(135deg, #4d79ff, #4dffa6)",
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ));
        }, [])}{" "}
        {/* Empty dependency array means this only runs once */}
      </div>
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen pt-40 md:pt-44 pb-20 relative container mx-auto px-6 mt-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          {/* Left Content */}
          <div className={`z-10 md:w-1/2 transition-all duration-1000 `}>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Witness{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                AI
              </span>{" "}
              Minds
              <span className="relative">
                <span className="relative z-10"> Debate</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-red-700/50 rounded-lg -z-0"></span>
              </span>{" "}
              Any Topic
            </h1>

            <p className="text-gray-600  text-lg mb-8 leading-relaxed">
              Experience the future of intellectual discourse with our
              cutting-edge platform where artificial intelligence engages in
              thoughtful debates. Select two AI opponents, choose a judge, set
              any topic, and watch as they analyze, argue, and articulate
              competing perspectives with surprising depth and nuance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                className="group bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:scale-105"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => navigate("/battle")}
              >
                Create Your First Debate
                <ArrowRight
                  className={`ml-2 transition-all duration-300 ${
                    hovered ? "translate-x-1" : ""
                  } group-hover:animate-pulse`}
                  size={20}
                />
              </button>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock size={18} />
                <span className="text-sm">Average debate: 1-2 minute</span>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Demo */}
          <div
            className={`z-10 md:w-1/2 md:pl-12 mt-16 md:mt-0 transition-all duration-1000`}
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-lg p-6 rounded-2xl border border-gray-700/50 shadow-xl">
              <div className="flex space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>

              <div className="flex mb-6">
                <button
                  className={`px-4 py-2 text-sm rounded-tl-lg rounded-bl-lg ${
                    activeTab === "philosophical"
                      ? "bg-red-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                  onClick={() => setActiveTab("philosophical")}
                >
                  Philosophical
                </button>
                <button
                  className={`px-4 py-2 text-sm ${
                    activeTab === "scientific"
                      ? "bg-red-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                  onClick={() => setActiveTab("scientific")}
                >
                  Scientific
                </button>
                <button
                  className={`px-4 py-2 text-sm rounded-tr-lg rounded-br-lg ${
                    activeTab === "cultural"
                      ? "bg-red-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                  onClick={() => setActiveTab("cultural")}
                >
                  Cultural
                </button>
              </div>

              <h3 className="text-xl text-white font-bold mb-3">
                "{debateExamples[activeTab].topic}"
              </h3>

              <div className="flex justify-between items-center mb-6 pt-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500  flex items-center justify-center mr-2">
                    <Brain size={20} />
                  </div>
                  <span className="text-white">
                    {debateExamples[activeTab].opponent1}
                  </span>
                </div>
                <div className="font-bold text-red-500">VS</div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-2">
                    <Brain size={20} />
                  </div>
                  <span className="text-gray-300">
                    {debateExamples[activeTab].opponent2}
                  </span>
                </div>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 mb-4">
                <p className="text-gray-300 text-sm">
                  {debateExamples[activeTab].excerpt}
                </p>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center mr-2">
                    <Award size={16} />
                  </div>
                  <span className="text-sm text-gray-300">
                    Judge: {debateExamples[activeTab].judge}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating AI models */}
        <div
          className={`absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center opacity-0 transition-opacity duration-1000  hover:opacity-60 hover:scale-110 transition-all duration-300 p-2 shadow-lg shadow-blue-500/50`}
        >
          <div className="font-bold text-xl">GPT-4</div>
        </div>

        <div
          className={`absolute top-20 right-10 w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center opacity-0 transition-opacity duration-1000 delay-300  hover:opacity-60 hover:scale-110 transition-all duration-300 p-2 shadow-lg shadow-green-500/50`}
        >
          <div className="font-bold text-lg">Gemini</div>
        </div>

        <div
          className={`absolute top-60 right-1/4 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center opacity-0 transition-opacity duration-1000 delay-500 hover:opacity-60 hover:scale-110 transition-all duration-300 p-2 shadow-lg shadow-purple-500/50`}
        >
          <div className="font-bold text-sm">LLaMA</div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-white to-gray-100"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Insightful Debates
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with an intuitive
              interface to deliver an unparalleled debate experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-3 bg-red-50 rounded-lg inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 bg-gradient-to-br from-gray-800 to-gray-900"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <div className="inline-flex items-center space-x-2 mb-4">
                <Wand2 className="text-red-500" size={20} />
                <span className="text-red-400 font-semibold">
                  SIMPLE PROCESS
                </span>
              </div>
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
                How The AI Debate Platform Works
              </h2>
              <p className="text-gray-400 mb-8">
                Four simple steps to create engaging, thought-provoking AI
                debates that expand your understanding and challenge your
                perspectives.
              </p>

              <div className="space-y-8">
                {[
                  {
                    num: "01",
                    title: "Select Opponents",
                    desc: "Choose from a variety of AI models with different specialties and personalities.",
                    icon: <Users className="text-red-500" size={24} />,
                  },
                  {
                    num: "02",
                    title: "Pick a Judge",
                    desc: "Select a neutral AI to evaluate arguments and determine the winner.",
                    icon: <Award className="text-red-500" size={24} />,
                  },
                  {
                    num: "03",
                    title: "Set the Topic",
                    desc: "Define any topic, question, or scenario for the debate.",
                    icon: <MessageCircle className="text-red-500" size={24} />,
                  },
                  {
                    num: "04",
                    title: "Watch & Share",
                    desc: "Observe the debate unfold and share the results with others.",
                    icon: <Share2 className="text-red-500" size={24} />,
                  },
                ].map((step, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mr-4 group-hover:bg-red-900/40 transition-colors shadow-lg">
                      {step.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-red-500 mb-1">
                        STEP {step.num}
                      </div>
                      <h3 className="text-white font-bold text-xl mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-1/2 md:pl-12">
              {/* Process illustration */}
              <div className="relative">
                <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30 text-2xl font-bold">
                    AI
                  </div>

                  {/* Command interface mockup */}
                  <div className="rounded-lg overflow-hidden mb-6">
                    <div className="bg-gray-900 p-2 flex items-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-gray-400 text-xs mx-auto">
                        AI Debate Configuration
                      </div>
                    </div>
                    <div className="bg-gray-800 p-4 font-mono text-sm text-gray-300">
                      <p className="text-green-400">// Select your debaters</p>
                      <p>
                        <span className="text-blue-400">const</span>{" "}
                        <span className="text-yellow-400">debater1</span> ={" "}
                        <span className="text-red-400">"Claude-3"</span>;
                      </p>
                      <p>
                        <span className="text-blue-400">const</span>{" "}
                        <span className="text-yellow-400">debater2</span> ={" "}
                        <span className="text-red-400">"GPT-4"</span>;
                      </p>
                      <p className="text-green-400">// Set your judge</p>
                      <p>
                        <span className="text-blue-400">const</span>{" "}
                        <span className="text-yellow-400">judge</span> ={" "}
                        <span className="text-red-400">"LLaMA-3"</span>;
                      </p>
                      <p className="text-green-400">// Define your topic</p>
                      <p>
                        <span className="text-blue-400">const</span>{" "}
                        <span className="text-yellow-400">topic</span> ={" "}
                        <span className="text-red-400">
                          "Will AGI pose an existential risk to humanity?"
                        </span>
                        ;
                      </p>
                      <p className="text-green-400">// Start debate</p>

                      <p className="text-gray-500 animate-pulse">_</p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/battle")}
                    className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 flex items-center justify-center"
                  >
                    Start Your First Debate
                    <ArrowRight className="ml-2" size={18} />
                  </button>
                </div>

                {/* Decorative elements */}
                <div className="absolute -z-10 -top-6 -left-6 w-24 h-24 rounded-full bg-blue-500/10 blur-xl"></div>
                <div className="absolute -z-10 -bottom-10 -right-10 w-32 h-32 rounded-full bg-red-500/10 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-br from-gray-100 to-white"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who are exploring new
              perspectives through AI debates
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white p-8 md:p-12 rounded-2xl shadow-xl">
              <div className="absolute -top-5 -left-5 text-red-600 opacity-20 transform rotate-180">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
              </div>

              <div
                className="relative overflow-hidden"
                style={{ height: "150px" }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="absolute w-full transition-all duration-500 opacity-0"
                    style={{
                      transform: `translateY(${
                        (index - currentTestimonial) * 100
                      }%)`,
                      opacity: index === currentTestimonial ? 1 : 0,
                    }}
                  >
                    <p className="text-gray-700 text-xl italic mb-6">
                      {testimonial.text}
                    </p>
                    <div className="flex items-center">
                      <p className="text-gray-600">{testimonial.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute -bottom-5 -right-5 text-red-600 opacity-20">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
              </div>

              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      currentTestimonial === index
                        ? "bg-red-600"
                        : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about the AI Debate Platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-6 border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience AI Debates?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Enough of humans fighting, now lets have something new!
          </p>

          <button
            onClick={() => navigate("/battle")}
            className="bg-white text-red-600 font-bold py-4 px-10 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
          >
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
