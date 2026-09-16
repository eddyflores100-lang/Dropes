import { ShieldCheck, Truck, Undo2, HeadphonesIcon } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Truck,
    title: "Envío 24-48h",
    desc: "Trabajamos con almacenes locales para que recibas tu pedido en tiempo récord.",
    color: "#ff4500",
  },
  {
    icon: ShieldCheck,
    title: "Pago Contra Reembolso",
    desc: "Paga en efectivo directamente al repartidor cuando recibas tu paquete. Cero riesgos.",
    color: "#00c853",
  },
  {
    icon: Undo2,
    title: "Devoluciones Fáciles",
    desc: "¿No te convence? Tienes 30 días para devolverlo sin preguntas ni complicaciones.",
    color: "#aa00ff",
  },
  {
    icon: HeadphonesIcon,
    title: "Soporte 24/7",
    desc: "Nuestro equipo está siempre disponible vía WhatsApp o email para ayudarte.",
    color: "#2979ff",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function WhyUs() {
  return (
    <section className="relative py-20 lg:py-32 bg-[#050505] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center opacity-20">
        <div className="w-[800px] h-[400px] bg-red-600/30 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              La nueva forma de
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                comprar
              </span>
            </h2>
            <p className="text-lg text-zinc-400">
              Olvídate de las tiendas de dropshipping tradicionales. Ofrecemos una experiencia premium, rápida y segura.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-b from-zinc-800 to-zinc-900 opacity-50 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]" />
                <div className="relative h-full bg-[#0a0a0c] p-8 rounded-3xl border border-white/5 transition-all duration-300 group-hover:bg-[#111115] group-hover:border-white/10 overflow-hidden">
                  
                  {/* Subtle glow behind icon */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl rounded-full"
                    style={{ background: benefit.color }}
                  />

                  <div className="relative">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      <Icon className="w-7 h-7" style={{ color: benefit.color }} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
