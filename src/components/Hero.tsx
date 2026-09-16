import { useState, useEffect } from "react";
import { ShoppingBag, ArrowRight, ChevronLeft, ChevronRight, Zap, ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import productsData from "../data/products.json";

export default function Hero({ onProductClick }: { onProductClick: (product: any) => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = productsData.slice(0, 3); // Top 3 profitable products

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden bg-white py-6 lg:py-24">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,0,0,0.03),transparent_70%)] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,0,0,0.02),transparent_70%)] pointer-events-none translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">
        {/* Text Content */}
        <div className="relative z-10 order-2 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "circOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-[10px] font-black tracking-[0.2em] uppercase mb-8 border border-red-100">
                <motion.span 
                   animate={{ scale: [1, 1.2, 1] }} 
                   transition={{ duration: 2, repeat: Infinity }}
                   className="w-2 h-2 bg-red-600 rounded-full" 
                />
                LÍDER EN VENTAS {new Date().getFullYear()}
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-zinc-900 leading-[0.9] mb-6 lg:mb-8 italic">
                {slides[currentSlide].name.split(' ').slice(0, 3).join(' ')}
                <br />
                <span className="text-red-600">PREMIUM.</span>
              </h1>
              
              <p className="text-xl text-zinc-500 mb-10 max-w-lg leading-relaxed font-medium">
                Diseño antigravedad que desafía lo convencional. Calidad extrema con <span className="text-zinc-900 font-bold">envío gratis</span> en 24 horas a toda la península.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onProductClick(slides[currentSlide])}
                  className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-zinc-900 text-white rounded-[2rem] font-black text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-zinc-900/40 group overflow-hidden relative"
                >
                  <motion.div 
                    initial={{ x: -100 }}
                    whileHover={{ x: 300 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" 
                  />
                  <ShoppingBag className="w-5 h-5" />
                  COMPRAR AHORA
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={prevSlide}
                    title="Anterior"
                    aria-label="Anterior"
                    className="w-14 h-14 flex items-center justify-center rounded-2xl bg-zinc-50 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-all border border-zinc-100"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    title="Siguiente"
                    aria-label="Siguiente"
                    className="w-14 h-14 flex items-center justify-center rounded-2xl bg-zinc-50 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-all border border-zinc-100"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-zinc-100 pt-10">
                 <div className="flex items-center gap-3">
                    <div className="p-3 bg-zinc-900 rounded-xl text-white">
                       <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                       <div className="text-xs font-black uppercase text-zinc-900">Garantía Total</div>
                       <div className="text-[10px] text-zinc-400 font-medium tracking-tight">De por vida en todos los productos</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-600 rounded-xl text-white">
                       <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                       <div className="text-xs font-black uppercase text-zinc-900">IA Verificada</div>
                       <div className="text-[10px] text-zinc-400 font-medium tracking-tight">Top calidad seleccionado por IA</div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Image */}
        <div className="relative order-1 lg:order-2">
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-full aspect-square max-w-[550px] mx-auto group cursor-pointer"
            onClick={() => onProductClick(slides[currentSlide])}
          >
            <div className="absolute inset-4 rounded-[4rem] bg-zinc-50 transform rotate-6 transition-transform group-hover:rotate-12 duration-700" />
            <div className="absolute inset-4 rounded-[4rem] bg-white shadow-2xl border border-zinc-100 flex items-center justify-center overflow-hidden p-12">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentSlide}
                  initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 1.2, opacity: 0, rotate: 10 }}
                  transition={{ duration: 0.8, ease: "backOut" }}
                  src={slides[currentSlide].image} 
                  alt={slides[currentSlide].name} 
                  className="w-full h-full object-contain filter drop-shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>
            
            {/* Price Tag */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-red-600 text-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] shadow-2xl flex flex-col items-center justify-center transform group-hover:scale-110 transition-transform"
            >
              <span className="text-xs sm:text-sm font-black opacity-80 uppercase tracking-widest line-through mb-0.5 sm:mb-1">{slides[currentSlide].priceWas}€</span>
              <span className="text-2xl sm:text-4xl font-black italic tracking-tighter">{slides[currentSlide].priceNow}€</span>
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-[10px] font-black">
                 -40%
              </div>
            </motion.div>
          </motion.div>

          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-zinc-100/50 rounded-full blur-[120px] scale-150 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
