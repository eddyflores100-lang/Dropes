import { Search, Heart, ShoppingBag, Menu } from "lucide-react";

export default function Navbar({ cartCount = 0, onCartClick }: { cartCount?: number, onCartClick?: () => void }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-zinc-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 text-zinc-600 hover:text-zinc-900" title="Menu" aria-label="Menu">
            <Menu className="w-5 h-5" />
          </button>
          <a href="#" className="text-2xl font-extrabold tracking-tighter text-zinc-900 flex items-center gap-1">
            DROPES<span className="w-2 h-2 bg-red-600 rounded-full"></span>
          </a>
        </div>

        <ul className="hidden lg:flex items-center gap-8">
          <li><a href="#" className="text-sm font-bold text-zinc-900 hover:text-red-600 transition-colors">Inicio</a></li>
          <li><a href="#products-section" className="text-sm font-bold text-zinc-600 hover:text-red-600 transition-colors">Catálogo</a></li>
          <li><a href="#categorias" className="text-sm font-bold text-zinc-600 hover:text-red-600 transition-colors">Categorías</a></li>
          <li><a href="#payment-methods" className="text-sm font-bold text-zinc-600 hover:text-red-600 transition-colors">Envíos y Pago</a></li>
          <li><a href="#products-section" className="text-sm font-extrabold text-red-600 hover:text-red-800 transition-colors flex items-center gap-1">Super Ventas !</a></li>
        </ul>

        <div className="flex items-center gap-2 sm:gap-4">
          <button className="hidden sm:block p-2 text-zinc-600 hover:text-zinc-900 transition-colors" title="Buscar" aria-label="Buscar">
            <Search className="w-5 h-5" />
          </button>
          <button className="hidden sm:block p-2 text-zinc-600 hover:text-red-600 transition-colors" title="Favoritos" aria-label="Favoritos">
            <Heart className="w-5 h-5" />
          </button>
          <button aria-label="Carrito" title="Abrir carrito" onClick={onCartClick} className="p-2 text-zinc-900 hover:text-red-600 transition-colors relative">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white text-[11px] font-extrabold rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1 ring-2 ring-white">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
