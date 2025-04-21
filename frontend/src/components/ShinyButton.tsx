import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ShinyButtonProps {
  title: string;
}

const ShinyButton = ({ title }: ShinyButtonProps) => {
  const navigate = useNavigate();
  return (
    <motion.button
      initial={{ "--x": "100%", scale: 1 }}
      animate={{ "--x": "-100%" }}
      whileTap={{ scale: 0.97 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
      className="px-6 py-2 rounded-md relative radial-gradient cursor-pointer"
      onClick={() => navigate("/all-battles")}
    >
      <span className="text-neutral-100 tracking-wide font-medium h-full w-full block relative linear-mask font-sans-serif">
        {title}
      </span>
      <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
    </motion.button>
  );
};

export default ShinyButton;
