import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, ArrowRight } from "lucide-react";

const promos = [
  {
    id: 1,
    title: "OFERTA DEL DÍA",
    subtitle: "50% DE DESCUENTO EN TECNOLOGÍA",
    color: "from-purple-600 via-pink-500 to-orange-400",
    emoji: "🚀"
  },
  {
    id: 2,
    title: "VIBRA POSITIVA",
    subtitle: "ENVÍO GRATIS EN TU PRIMERA COMPRA",
    color: "from-cyan-500 via-blue-500 to-indigo-600",
    emoji: "💎"
  },
  {
    id: 3,
    title: "ULTRA AHORRO",
    subtitle: "3X2 EN PRODUCTOS SELECCIONADOS",
    color: "from-emerald-500 via-teal-500 to-cyan-600",
    emoji: "🔥"
  }
];

export default function PromoBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % promos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleBannerClick = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF']
    });
  };

  return (
    <div className="relative w-full overflow-hidden bg-zinc-900 group">
      <motion.div 
        className="cursor-pointer"
        onClick={handleBannerClick}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={promos[index].id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`relative py-1.5 px-4 sm:py-6 sm:px-12 bg-gradient-to-r ${promos[index].color} flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 text-white text-center sm:text-left`}
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"
              />
              <motion.div 
                animate={{ 
                  scale: [1, 1.5, 1],
                  rotate: [0, -10, 0],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 7, repeat: Infinity }}
                className="absolute -bottom-20 -right-20 w-60 h-60 bg-black/20 rounded-full blur-3xl"
              />
            </div>

            <div className="relative z-10 flex items-center gap-3">
              <span className="text-xl sm:text-4xl animate-bounce">{promos[index].emoji}</span>
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                  <span className="text-[7px] sm:text-[10px] font-black uppercase tracking-[0.3em] opacity-90">
                    {promos[index].title}
                  </span>
                </div>
                <h3 className="text-sm sm:text-2xl font-black italic tracking-tighter">
                  {promos[index].subtitle}
                </h3>
              </div>
            </div>

            <div className="relative z-10 sm:ml-auto">
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                className="bg-white text-zinc-900 px-4 py-1.5 sm:px-6 sm:py-2 rounded-full font-bold text-[9px] sm:text-xs flex items-center gap-1 sm:gap-2 shadow-xl shadow-black/10 transition-colors hover:bg-zinc-100"
              >
                APROVECHAR YA
                <ArrowRight className="w-3 h-3" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
