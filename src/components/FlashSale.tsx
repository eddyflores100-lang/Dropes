import { useEffect, useState } from "react";
import productsData from "../data/products.json";

export default function FlashSale({ onProductClick }: { onProductClick: (product: any) => void }) {

  const [timeLeft, setTimeLeft] = useState({ h: 8, m: 47, s: 22 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) {
          s--;
        } else {
          s = 59;
          if (m > 0) {
            m--;
          } else {
            m = 59;
            if (h > 0) {
              h--;
            }
          }
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get 3 real products from the catalog for the flash sale
  const flashProducts = [
    productsData.find(p => p.id === "1162"), // Arona Pro Smartwatch
    productsData.find(p => p.id === "1131"), // Masajeador de cuello
    productsData.find(p => p.id === "3415"), // Humidificador gotas antigravedad
  ].filter(Boolean);

  const discounts = ["-55%", "-40%", "-60%"];
  const gradients = [
    "from-[#0a141c] to-[#0d2238]",
    "from-[#1c100a] to-[#381d0d]",
    "from-[#1c0a32] to-[#380d68]",
  ];

  return (
    <div className="py-6 px-4 md:py-[60px] md:px-20 bg-[#050505]">
      <div className="bg-zinc-900 border border-zinc-800 rounded-[24px] sm:rounded-[40px] p-6 sm:p-14 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-[60px] items-center relative overflow-hidden">
        <div className="absolute -top-20 right-[200px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,69,0,0.1),transparent_70%)] pointer-events-none"></div>
        <div className="absolute right-[50px] top-1/2 -translate-y-1/2 font-display text-[180px] font-extrabold tracking-[-0.05em] text-white/5 pointer-events-none select-none hidden md:block">
          SALE
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center gap-1.5 bg-red-600 py-1 px-3.5 rounded-md text-[10px] font-extrabold tracking-[0.15em] uppercase text-white">
              ⚡ Flash Sale
            </div>
            <div className="text-[12px] text-zinc-500 font-bold uppercase tracking-wider">Sólo hoy</div>
          </div>
          <div className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter italic leading-none mb-4 text-white">
            HASTA <span className="text-red-600">70%</span><br />OFF
          </div>
          <div className="text-zinc-500 text-xs sm:text-sm font-medium">Aprovecha antes de que acabe el tiempo</div>
          
          <div className="flex gap-2 sm:gap-3 mt-8">
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl py-3 px-4 sm:py-4 sm:px-6 text-center min-w-[70px] sm:min-w-[80px]">
              <div className="text-2xl sm:text-4xl font-black leading-none text-red-600 tracking-tighter">
                {String(timeLeft.h).padStart(2, '0')}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold mt-1">Horas</div>
            </div>
            <div className="text-2xl text-zinc-800 self-center mb-4">:</div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl py-3 px-4 sm:py-4 sm:px-6 text-center min-w-[70px] sm:min-w-[80px]">
              <div className="text-2xl sm:text-4xl font-black leading-none text-red-600 tracking-tighter">
                {String(timeLeft.m).padStart(2, '0')}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold mt-1">Min</div>
            </div>
            <div className="text-2xl text-zinc-800 self-center mb-4">:</div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl py-3 px-4 sm:py-4 sm:px-6 text-center min-w-[70px] sm:min-w-[80px]">
              <div className="text-2xl sm:text-4xl font-black leading-none text-red-600 tracking-tighter">
                {String(timeLeft.s).padStart(2, '0')}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold mt-1">Seg</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide relative z-10 no-scrollbar">
          {flashProducts.map((product, idx) => (
            <div 
              key={product!.id}
              className="w-[160px] sm:w-[200px] shrink-0 bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer hover:border-red-600/30 group"
              onClick={() => onProductClick(product)}
            >
              <div className={`h-[120px] sm:h-[160px] flex items-center justify-center relative bg-gradient-to-br ${gradients[idx]} overflow-hidden p-4 group-hover:scale-105 transition-transform duration-500`}>
                <img 
                  src={product!.image} 
                  alt={product!.name} 
                  className="w-full h-full object-contain drop-shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white py-1 px-2.5 rounded-lg text-[9px] font-black tracking-widest uppercase z-20">
                  {discounts[idx]}
                </div>
              </div>
              <div className="p-4">
                <div className="text-[11px] sm:text-[13px] font-bold text-white mb-2 leading-tight line-clamp-2 italic tracking-tight">{product!.name}</div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-xl font-black text-white tracking-tighter">{product!.priceNow}€</span>
                  <span className="text-[10px] sm:text-xs text-zinc-600 line-through font-bold">{product!.priceWas}€</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
