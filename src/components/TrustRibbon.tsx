import { Truck, ShieldCheck, Undo2, Banknote, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const trustItems = [
  {
    icon: Truck,
    title: "Envío 24-48h",
    subtitle: "España y Portugal",
    color: "#FF4500",
    gradient: "from-red-500/20 to-orange-500/20",
    glow: "shadow-[0_0_25px_rgba(255,69,0,0.3)]",
    delay: 0,
  },
  {
    icon: Banknote,
    title: "Contra Reembolso",
    subtitle: "Paga al recibir",
    color: "#00C853",
    gradient: "from-green-500/20 to-emerald-500/20",
    glow: "shadow-[0_0_25px_rgba(0,200,83,0.3)]",
    delay: 0.1,
  },
  {
    icon: ShieldCheck,
    title: "Pago Seguro",
    subtitle: "100% encriptado",
    color: "#2979FF",
    gradient: "from-blue-500/20 to-cyan-500/20",
    glow: "shadow-[0_0_25px_rgba(41,121,255,0.3)]",
    delay: 0.2,
  },
  {
    icon: Undo2,
    title: "Devoluciones",
    subtitle: "30 días de garantía",
    color: "#AA00FF",
    gradient: "from-purple-500/20 to-fuchsia-500/20",
    glow: "shadow-[0_0_25px_rgba(170,0,255,0.3)]",
    delay: 0.3,
  },
];

export default function TrustRibbon() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#0a0a0f] via-[#111118] to-[#0a0a0f] py-1">
      {/* Animated gradient top border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent animate-shimmer" />
      {/* Animated gradient bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-shimmer" style={{ animationDelay: '1s' }} />

      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: ['#FF4500', '#00C853', '#2979FF', '#AA00FF', '#FFD600', '#FF1744'][i],
              left: `${15 + i * 15}%`,
              top: '50%',
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-5">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay, duration: 0.5, ease: "easeOut" }}
              >
                <div className={`
                  relative flex flex-col items-center text-center gap-3 py-5 px-4 
                  rounded-2xl border border-white/[0.06] 
                  bg-gradient-to-b from-white/[0.04] to-transparent
                  backdrop-blur-sm
                  transition-all duration-500 ease-out
                  hover:border-white/[0.12] hover:from-white/[0.07]
                  hover:${item.glow}
                  cursor-default
                `}>
                  {/* Icon glow background */}
                  <div
                    className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: item.color }}
                  />
                  
                  {/* Animated icon container */}
                  <motion.div
                    className="relative z-10 p-3 rounded-xl border border-white/10 transition-all duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}15, ${item.color}05)`,
                    }}
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: item.delay * 2,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.4 },
                    }}
                  >
                    <Icon
                      className="w-6 h-6 transition-all duration-500"
                      style={{ color: item.color }}
                      strokeWidth={2}
                    />
                    
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2"
                      style={{ borderColor: item.color }}
                      animate={{
                        scale: [1, 1.4],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: item.delay + 0.5,
                        ease: "easeOut",
                      }}
                    />
                  </motion.div>

                  {/* Text content */}
                  <div className="relative z-10">
                    <div className="text-sm font-bold text-white/90 tracking-wide group-hover:text-white transition-colors duration-300">
                      {item.title}
                    </div>
                    <div
                      className="text-[11px] mt-1 font-medium tracking-wider uppercase transition-colors duration-300"
                      style={{ color: `${item.color}99` }}
                    >
                      {item.subtitle}
                    </div>
                  </div>

                  {/* Corner sparkle on hover */}
                  <motion.div
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-3 h-3" style={{ color: item.color }} />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
