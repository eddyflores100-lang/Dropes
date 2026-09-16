import { X, Heart, ShoppingBag, Star, Shield, Truck, RotateCcw, ArrowLeft, Sparkles, Zap, ChevronRight, CheckCircle2, TrendingUp, AlertCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import productsData from "../data/products.json";

interface Product {
  id: string;
  name: string;
  brand: string;
  priceNow: string;
  priceWas: string;
  image: string;
  description: string;
  stars?: number | string;
  reviews?: string;
}

export default function ProductDetail({ 
  product, 
  onClose, 
  onAddToCart 
}: { 
  product: Product; 
  onClose: () => void; 
  onAddToCart: (product: any) => void;
}) {
  const [activeTab, setActiveTab] = useState<'info' | 'specs'>('info');
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const related = [...productsData]
      .filter(p => p.id !== product.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    setRelatedProducts(related);
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 50);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0b] text-white overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-zinc-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* Glass Header */}
      <div className={`sticky top-0 z-50 flex items-center justify-between px-6 h-20 transition-all duration-300 ${isScrolled ? 'bg-black/60 backdrop-blur-3xl border-b border-white/5' : 'bg-transparent'}`}>
        <motion.button 
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose} 
          className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>
        
        <AnimatePresence>
          {isScrolled && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex-1 px-8 truncate text-center font-black tracking-tighter uppercase text-sm"
            >
              {product.name}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3">
          <motion.button 
            whileTap={{ scale: 0.8 }}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-white/40 hover:text-red-500 transition-colors"
          >
            <Heart className="w-6 h-6" />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.8 }}
            onClick={onClose} 
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-white/40 hover:text-red-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" onScroll={handleScroll}>
        <div className="max-w-7xl mx-auto px-6 py-10 lg:py-20 grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Visual Showcase Section */}
          <div className="relative group">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="relative aspect-square rounded-[3rem] bg-gradient-to-br from-zinc-900/50 to-black border border-white/5 flex items-center justify-center p-12 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.1),transparent_70%)] group-hover:opacity-100 opacity-0 transition-opacity" />
              
              <motion.img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_35px_60px_rgba(0,0,0,0.8)]"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              />

              {/* Badges */}
              <div className="absolute top-8 left-8 flex flex-col gap-3 z-20">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-red-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] flex items-center gap-2 shadow-2xl"
                >
                  <TrendingUp className="w-4 h-4" />
                  DESTACADO HOY
                </motion.div>
                <div className="bg-zinc-800/80 backdrop-blur-md text-zinc-400 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] border border-white/5">
                  STOCK LIMITADO
                </div>
              </div>
            </motion.div>

            {/* Thumbnail Preview (Simulated) */}
            <div className="mt-8 flex gap-4 justify-center">
               {[1,2,3].map(i => (
                 <div key={i} className={`w-20 h-20 rounded-2xl border ${i === 1 ? 'border-red-600' : 'border-white/5'} bg-zinc-900/50 p-3 hover:border-red-600/50 transition-colors cursor-pointer`}>
                   <img src={product.image} alt="prev" className="w-full h-full object-contain opacity-50 group-hover:opacity-100 transition-opacity" />
                 </div>
               ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col">
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-red-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">
                  {product.reviews || '492 opiniones'}
                </span>
                <div className="h-1 w-1 bg-zinc-800 rounded-full" />
                <span className="text-xs font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  EN STOCK
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter mb-4 sm:mb-6 uppercase italic">
                {product.name}
              </h1>

               <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
                <div className="bg-zinc-900 border border-white/5 rounded-2xl p-3 sm:p-4 flex flex-col min-w-[100px] sm:min-w-[120px]">
                  <span className="text-[9px] sm:text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-0.5 sm:mb-1">Oferta</span>
                  <span className="text-2xl sm:text-4xl font-black text-white tracking-tighter">{product.priceNow}€</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm sm:text-lg text-zinc-600 line-through font-bold tracking-tighter opacity-50">
                    {product.priceWas}€
                  </span>
                  <div className="flex items-center gap-1 text-red-500 font-black text-[9px] sm:text-[11px] uppercase tracking-widest">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                    <span>Ahorras {(parseFloat(product.priceWas) - parseFloat(product.priceNow)).toFixed(2)}€</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 mb-8 sm:mb-10">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAddToCart(product)}
                  className="w-full h-14 sm:h-20 bg-red-600 hover:bg-red-700 text-white rounded-[1.5rem] sm:rounded-[2rem] font-black text-lg sm:text-xl flex items-center justify-center gap-3 sm:gap-4 shadow-3xl shadow-red-900/30 transition-all group"
                >
                  <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7" />
                  PEDIR AHORA
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" />
                </motion.button>
                <div className="flex items-center justify-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] overflow-hidden">
                   <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                   <span>¡Quedan pocas unidades en oferta!</span>
                </div>
              </div>

              {/* Trust Section */}
              <div className="grid grid-cols-3 gap-3 mb-12">
                <div className="flex flex-col items-center text-center p-4 rounded-3xl bg-white/5 border border-white/5">
                  <Truck className="w-6 h-6 text-red-600 mb-2" />
                  <span className="text-[9px] font-black uppercase text-zinc-400">Envío 24H</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-3xl bg-white/5 border border-white/5">
                  <Shield className="w-6 h-6 text-red-600 mb-2" />
                  <span className="text-[9px] font-black uppercase text-zinc-400">Pago Seguro</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-3xl bg-white/5 border border-white/5">
                  <RotateCcw className="w-6 h-6 text-red-600 mb-2" />
                  <span className="text-[9px] font-black uppercase text-zinc-400">Garantía</span>
                </div>
              </div>

              {/* Advanced Tabs */}
              <div>
                <div className="flex gap-8 mb-8 border-b border-white/5">
                  {['info', 'specs'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`pb-4 text-xs font-black tracking-[0.2em] uppercase relative transition-colors ${activeTab === tab ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
                    >
                      {tab === 'info' ? 'DETALLES' : 'FICHA TÉCNICA'}
                      {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-red-600" />}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="prose prose-invert max-w-none text-zinc-400 text-sm leading-relaxed"
                  >
                    {activeTab === 'info' ? (
                      <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                           <div className="text-[10px] text-zinc-600 font-black uppercase mb-1">MARCA</div>
                           <div className="text-white font-bold">{product.brand || 'DROPES EXC'}</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                           <div className="text-[10px] text-zinc-600 font-black uppercase mb-1">MODELO</div>
                           <div className="text-white font-bold">PREMIUM 2024</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                           <div className="text-[10px] text-zinc-600 font-black uppercase mb-1">GARANTÍA</div>
                           <div className="text-white font-bold">2 AÑOS ESPAÑA</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                           <div className="text-[10px] text-zinc-600 font-black uppercase mb-1">ENVÍO</div>
                           <div className="text-white font-bold">GRATIS</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <section className="mt-32 px-6 py-24 bg-black relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-black text-white mb-12 tracking-tighter italic uppercase flex items-center gap-4">
              <Zap className="w-8 h-8 text-red-600 fill-red-600" />
              TAMBIÉN TE PUEDE INTERESAR
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
              {relatedProducts.map((p, i) => (
                <motion.div 
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-zinc-900/50 rounded-[2.5rem] p-4 border border-white/5 hover:border-red-600/30 transition-all group cursor-pointer overflow-hidden"
                >
                  <div className="aspect-square rounded-[2rem] bg-black/40 overflow-hidden mb-6 p-6 relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="font-black text-white text-xs line-clamp-2 mb-4 tracking-tight uppercase italic">{p.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-white text-xl tracking-tighter">{p.priceNow}€</span>
                    <button 
                      title="Añadir producto relacionado al carrito"
                      className="p-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 active:scale-90"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Mobile Sticky Bar - Only visible on small screens */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="lg:hidden fixed bottom-6 left-6 right-6 p-4 sm:p-5 bg-black/80 backdrop-blur-3xl border border-white/5 z-50 flex items-center gap-4 sm:gap-6 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
      >
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">HOY SOLO</span>
          <span className="text-2xl font-black text-red-600 tracking-tighter">{product.priceNow}€</span>
        </div>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => onAddToCart(product)}
          className="flex-1 h-16 bg-red-600 text-white rounded-2xl font-black text-md flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(220,38,38,0.3)]"
        >
          <ShoppingBag className="w-6 h-6" />
          PEDIR AHORA
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
