import { Heart, Sparkles, Star, Zap, ShoppingCart, Search, Filter, ChevronLeft, ChevronRight, Smartphone, Home, Trophy, Utensils, Baby, Grid } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import productsData from "../data/products.json";
import React, { useState, useEffect } from "react";

const APP_CATEGORIES = [
  { id: 1, name: "Todas", icon: Grid },
  { id: 2, name: "Tecnología", icon: Smartphone },
  { id: 3, name: "Hogar", icon: Home },
  { id: 4, name: "Belleza", icon: Sparkles },
  { id: 5, name: "Deporte", icon: Trophy },
  { id: 6, name: "Cocina", icon: Utensils },
  { id: 7, name: "Niños", icon: Baby },
];

function ProductCard({ product, index, onBuy, onProductClick }: { product: any, index: number, onBuy: (p: any) => void, onProductClick: (p: any) => void, key?: string | number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: (index % 20) * 0.05, duration: 0.4 }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      onClick={() => onProductClick(product)}
    >
      <div className="absolute inset-x-4 -bottom-4 h-full bg-zinc-900/40 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      
      <div className="bg-[#0f0f11] rounded-[1.5rem] sm:rounded-[2.5rem] border border-zinc-800/50 p-2 sm:p-5 transition-all duration-500 hover:border-red-600/30 overflow-hidden flex flex-col h-full relative">
        {/* Header Badges */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex flex-col gap-1.5 z-20">
          <motion.span 
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            className="bg-red-600 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl shadow-red-900/20"
          >
            TOP VENTAS
          </motion.span>
          {product.tag && (
            <span className="bg-zinc-800 text-zinc-300 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-zinc-700/50">
              {product.tag}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
          }}
          title="Añadir a favoritos"
          aria-label="Añadir a favoritos"
          className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 sm:p-3 bg-zinc-800/80 backdrop-blur-md rounded-xl sm:rounded-2xl text-zinc-400 hover:text-red-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-20 border border-zinc-700/50"
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Image Display */}
        <div className="relative aspect-square rounded-[1.2rem] sm:rounded-[2rem] bg-gradient-to-b from-zinc-800/30 to-zinc-900/50 overflow-hidden mb-3 sm:mb-6 flex items-center justify-center p-3 sm:p-8 transition-all duration-700 group-hover:scale-105 border border-zinc-800/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain transition-all duration-700 group-hover:scale-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </div>

        <div className="px-1 sm:px-3 flex flex-col flex-1">
          <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
            <div className="flex text-red-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-black text-zinc-500 uppercase tracking-tighter">{product.reviews || '99+ opiniones'}</span>
          </div>
          
          <h3 className="font-black text-white text-xs sm:text-xl mb-3 sm:mb-4 line-clamp-2 leading-tight tracking-tighter italic">
            {product.name}
          </h3>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mt-auto pt-3 sm:pt-4 border-t border-zinc-800/50">
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-black text-white tracking-tighter flex items-center gap-0.5">
                {product.priceNow}<span className="text-[10px] sm:text-sm font-bold text-red-600">€</span>
              </span>
              <span className="text-[10px] text-zinc-500 line-through font-bold">
                {product.priceWas}€
              </span>
            </div>
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onBuy(product);
              }}
              className="w-full sm:w-auto h-10 sm:h-14 px-3 sm:px-6 bg-red-600 text-white rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[11px] uppercase tracking-wider sm:tracking-[0.2em] flex items-center justify-center gap-2 sm:gap-3 hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-900/20 group/btn"
            >
              <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/btn:-translate-y-1" />
              <span>PEDIR</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BestSellers({ 
  onBuy, 
  onProductClick,
  selectedCategory,
  showAll,
  onShowAll
}: { 
  onBuy: (product: any) => void, 
  onProductClick: (product: any) => void,
  selectedCategory?: string | null,
  showAll?: boolean,
  onShowAll?: () => void
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("relevant"); 
  const [localCategory, setLocalCategory] = useState<string | null>(selectedCategory || null);

  useEffect(() => {
    setLocalCategory(selectedCategory || null);
    setCurrentPage(1);
  }, [selectedCategory]);
  
  // reset page if search or sort filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortOption, localCategory]);

  const ITEMS_PER_PAGE = 20;

  let filtered = [...productsData];

  // Category Filter
  if (localCategory && localCategory !== "Todas") {
    filtered = filtered.filter(p => 
      p.category?.toLowerCase() === localCategory.toLowerCase() || 
      (localCategory === "Tecnología" && !p.category) // Fallback for some old products
    );
  }

  // Search Filter
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
  }

  // Sort Filter
  if (sortOption === "a-z") {
    filtered.sort((a,b) => a.name.localeCompare(b.name));
  } else if (sortOption === "z-a") {
    filtered.sort((a,b) => b.name.localeCompare(a.name));
  } else if (sortOption === "price-asc") {
    filtered.sort((a,b) => parseFloat(a.priceNow) - parseFloat(b.priceNow));
  } else if (sortOption === "price-desc") {
    filtered.sort((a,b) => parseFloat(b.priceNow) - parseFloat(a.priceNow));
  } else {
    // defaults to loaded order (which we pretend is roughly by relevance/reviews)
  }

  const isFullCatalogView = showAll || selectedCategory || localCategory || searchQuery;
  
  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  let displayedProducts = [...filtered];

  if (!isFullCatalogView) {
    // Default limited view for home page (just best sellers preview)
    displayedProducts = filtered.slice(0, 8);
  } else {
    // Paginated View
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    displayedProducts = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }

  return (
    <section className="py-12 sm:py-24 bg-[#050505] relative overflow-hidden" id="products-section">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-zinc-900/20 to-transparent pointer-events-none" />
      <div className="absolute -left-20 top-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -right-20 top-1/4 w-96 h-96 bg-zinc-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mb-16 gap-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-[2px] w-12 bg-red-600" />
            <span className="text-xs font-black text-red-600 uppercase tracking-[0.5em]">
              EXCLUSIVE SELECTION
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter italic leading-[0.85]">
            {isFullCatalogView ? "CATÁLOGO DIGITAL" : "LOS MÁS VENDIDOS"} <br />
            {!isFullCatalogView && <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">DEL MES</span>}
          </h2>
        </div>

        {/* Filters and Controls - Only show in Catalog View */}
        {isFullCatalogView && (
          <div className="flex flex-col gap-8 mb-16 z-20 relative">
            {/* Category Pills */}
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {APP_CATEGORIES.map(cat => {
                const isActive = localCategory === cat.name || (cat.name === "Todas" && !localCategory);
                return (
                  <button
                    key={cat.id}
                    onClick={() => setLocalCategory(cat.name === "Todas" ? null : cat.name)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-bold text-sm whitespace-nowrap transition-all ${
                      isActive 
                        ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-900/20" 
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Search and Sort Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-900/60 border border-zinc-800 p-2 pl-6 rounded-2xl backdrop-blur-md">
              <div className="flex items-center gap-3 w-full md:w-auto flex-1">
                <Search className="w-5 h-5 text-zinc-500" />
                <input 
                  type="text"
                  placeholder="Buscar por producto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-white w-full text-sm font-medium placeholder:text-zinc-600"
                />
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 md:border-l border-zinc-800 pt-3 md:pt-0 pl-0 md:pl-4">
                <Filter className="w-4 h-4 text-zinc-500" />
                <select 
                  title="Ordenar por"
                  aria-label="Ordenar por"
                  className="bg-zinc-800 text-white border-none rounded-xl px-4 py-2 text-sm font-bold outline-none cursor-pointer appearance-none hover:bg-zinc-700 transition-colors"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="relevant">Relevancia</option>
                  <option value="a-z">Alfabético (A a Z)</option>
                  <option value="z-a">Alfabético (Z a A)</option>
                  <option value="price-asc">Precio (Menor a Mayor)</option>
                  <option value="price-desc">Precio (Mayor a Menor)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index} 
                onBuy={onBuy} 
                onProductClick={onProductClick} 
              />
            ))
          ) : (
             <div className="col-span-full py-20 text-center flex flex-col items-center justify-center">
               <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                 <Search className="w-8 h-8 text-zinc-600" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">No se encontraron productos</h3>
               <p className="text-zinc-500">Prueba ajustando tu búsqueda o seleccionando otra categoría.</p>
             </div>
          )}
        </div>

        {/* Pagination Controls */}
        {isFullCatalogView && totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-4">
            <button 
              title="Página anterior"
              aria-label="Página anterior"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-12 h-12 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({length: totalPages}).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                    currentPage === i + 1 
                      ? "bg-red-600 text-white shadow-lg shadow-red-900/20" 
                      : "bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              title="Página siguiente"
              aria-label="Página siguiente"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-12 h-12 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Initial Explore Button */}
        {!isFullCatalogView && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-24 text-center"
          >
            <button 
              onClick={(e) => { e.preventDefault(); if (onShowAll) onShowAll(); }}
              className="relative group inline-flex items-center gap-4 px-12 py-6 bg-white text-zinc-900 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10"
            >
              <span className="relative z-10">EXPLORAR TODO EL CATÁLOGO</span>
              <Zap className="w-4 h-4 text-red-600 fill-red-600 relative z-10" />
              <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-0" />
              <div className="absolute inset-0 bg-white group-hover:opacity-0 transition-opacity" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

