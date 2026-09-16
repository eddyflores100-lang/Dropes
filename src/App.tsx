import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustRibbon from "./components/TrustRibbon";
import FlashSale from "./components/FlashSale";
import BestSellers from "./components/BestSellers";
import Categories from "./components/Categories";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import SocialProofPopup from "./components/SocialProofPopup";
import CheckoutModal from "./components/CheckoutModal";
import ProductDetail from "./components/ProductDetail";

import PromoBanner from "./components/PromoBanner";
import UpsellModal from "./components/UpsellModal";

export default function App() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<any | null>(null);
  const [showDownsell, setShowDownsell] = useState(false);
  const [hasSeenUpsell, setHasSeenUpsell] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAllCatalog, setShowAllCatalog] = useState(false);

  const handleAddToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    setLastAddedProduct(product);
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
    // Mostrar Upsell si tienen productos en el carrito, cerramos el carrito y aún no se les ofreció.
    if (cart.length > 0 && !hasSeenUpsell && !cart.find(i => i.id === 'upsell-premium-kit')) {
      setShowUpsell(true);
      setHasSeenUpsell(true);
    }
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <SocialProofPopup />
      
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-7 right-7 w-[46px] h-[46px] bg-red-600 border-none cursor-pointer rounded-full flex items-center justify-center text-[18px] text-white shadow-[0_8px_24px_rgba(220,38,38,0.4)] transition-all duration-250 z-40 hover:-translate-y-[3px] hover:scale-105 hover:shadow-[0_14px_30px_rgba(220,38,38,0.5)]"
      >
        ↑
      </button>

      <AnnouncementBar />
      <PromoBanner />
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      {showDownsell && (
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-yellow-400 text-zinc-900 py-2 px-4 text-center text-xs font-bold tracking-widest relative z-50 overflow-hidden"
        >
          <motion.div 
            animate={{ x: [-1000, 1000] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-40" 
          />
          🎁 ¡OFERTA RELÁMPAGO ACTIVADA! USA EL CUALQUIER PRODUCTO Y RECIBE UN REGALO SORPRESA
          <button 
            onClick={() => setShowDownsell(false)}
            className="ml-4 underline hover:text-zinc-700"
          >
            CERRAR
          </button>
        </motion.div>
      )}

      
      <main className="flex-1">
        <Hero onProductClick={setSelectedProduct} />

        <TrustRibbon />
        <FlashSale onProductClick={setSelectedProduct} />

        <BestSellers 
          onBuy={handleAddToCart} 
          onProductClick={setSelectedProduct}
          selectedCategory={selectedCategory}
          showAll={showAllCatalog}
          onShowAll={() => setShowAllCatalog(true)}
        />
        <Categories onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setShowAllCatalog(true);
        }} />
        <Testimonials />
        <Newsletter />
      </main>

      <Footer />

      {isCartOpen && (
        <CheckoutModal 
          cart={cart} 
          onClose={handleCloseCart} 
          onUpdateQuantity={handleUpdateQuantity}
          onClearCart={() => setCart([])}
        />
      )}

      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product) => {
            handleAddToCart(product);
            setSelectedProduct(null);
          }}
        />
      )}

      <UpsellModal 
        isOpen={showUpsell}
        onClose={() => {
          setShowUpsell(false);
          setShowDownsell(true); // Offer downsell if they decline upsell
        }}
        onAccept={(product) => {
          handleAddToCart(product);
          setShowUpsell(false);
          setIsCartOpen(true);
        }}
        baseProduct={lastAddedProduct}
      />
    </div>


  );
}
