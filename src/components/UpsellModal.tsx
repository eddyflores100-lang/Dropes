import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ShoppingBag, ArrowRight, ShieldCheck, Timer } from "lucide-react";
import { useState, useEffect } from "react";

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (product: any) => void;
  baseProduct: any;
}

const UPSELL_PRODUCT = {
  id: "upsell-premium-kit",
  name: "Kit Premium de Limpieza & Cuidado",
  price: "12.99",
  originalPrice: "29.99",
  image: "https://api.dropea.com/11619/product-file",
  description: "Protege y mantén tus productos como nuevos con nuestro kit profesional. ¡Oferta única solo por hoy!"
};

export default function UpsellModal({ isOpen, onClose, onAccept, baseProduct }: UpsellModalProps) {
  const [seconds, setSeconds] = useState(600); // 10 minutes timer

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl max-w-lg w-full relative"
          >
            {/* Header / Accent */}
            <div className="bg-gradient-to-r from-red-600 to-orange-500 p-6 text-white text-center relative overflow-hidden">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="absolute -top-10 -right-10 w-32 h-32 border-4 border-white/10 rounded-full" 
               />
               <h2 className="text-sm font-black tracking-[0.2em] mb-1">OFERTA EXCLUSIVA</h2>
               <p className="text-2xl font-black italic">¡ESPERA! NO TE VAYAS SIN ESTO</p>
            </div>

            <div className="p-8">
              <div className="flex gap-6 mb-8">
                <div className="w-1/3 aspect-square rounded-3xl bg-zinc-100 overflow-hidden shadow-inner">
                  <img src={UPSELL_PRODUCT.image} alt="Upsell" className="w-full h-full object-cover" />
                </div>
                <div className="w-2/3">
                  <h3 className="text-xl font-bold text-zinc-900 mb-2 leading-tight">
                    {UPSELL_PRODUCT.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-black text-red-600">{UPSELL_PRODUCT.price}€</span>
                    <span className="text-sm text-zinc-400 line-through">{UPSELL_PRODUCT.originalPrice}€</span>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">
                      AHORRA 60%
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Añade este kit a tu compra del <span className="font-bold text-zinc-800">{baseProduct?.name}</span> y obtén protección total garantizada.
                  </p>
                </div>
              </div>

              {/* Urgency */}
              <div className="flex items-center justify-between bg-zinc-50 rounded-2xl p-4 mb-8 border border-zinc-100">
                <div className="flex items-center gap-2 text-zinc-600">
                  <Timer className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">La oferta expira en:</span>
                </div>
                <span className="font-mono text-xl font-black text-red-600">{formatTime(seconds)}</span>
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-10 text-xs font-medium text-zinc-600">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span>Garantía extendida de por vida incluida</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Compatible con todos tus pedidos actuales</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => onAccept(UPSELL_PRODUCT)}
                  className="w-full bg-zinc-900 text-white py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-lg shadow-zinc-200 group"
                >
                  <ShoppingBag className="w-5 h-5" />
                  SÍ, LO QUIERO POR {UPSELL_PRODUCT.price}€
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button 
                  onClick={onClose}
                  className="w-full py-3 text-zinc-400 text-sm font-semibold hover:text-zinc-600 transition-colors"
                >
                  No gracias, prefiero pagar el precio completo luego
                </button>
              </div>
            </div>

            <button 
              onClick={onClose}
              title="Cerrar oferta"
              aria-label="Cerrar oferta"
              className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-full text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
