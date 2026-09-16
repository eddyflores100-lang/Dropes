import { Facebook, Instagram, Twitter, MessageCircle, Mail, MapPin, CreditCard, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#020202] pt-8 sm:pt-16 border-t border-white/5 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8 mb-8 sm:mb-16">
          
          {/* Brand Col */}
          <div className="lg:pr-8">
            <h2 className="text-2xl font-black text-white tracking-tighter mb-4 inline-flex items-center gap-1">
              DROPES<span className="w-2 h-2 rounded-full bg-red-600 mb-1"></span>
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              Tu tienda de confianza. Revolucionando el comercio online con envíos rápidos, pago contra reembolso y soporte excepcional 24/7.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 text-zinc-400">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 text-zinc-400">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 text-zinc-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 text-zinc-400">
                <span className="font-bold text-lg italic">TikTok</span>
              </a>
            </div>
          </div>

          {/* Links Col */}
          <div>
            <h3 className="text-white font-bold tracking-widest text-[10px] sm:text-sm uppercase mb-4 sm:mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-zinc-500">
              <li><a href="#" className="hover:text-red-500 transition-colors inline-block hover:translate-x-1 transform duration-200">Inicio</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors inline-block hover:translate-x-1 transform duration-200">Catálogo de Productos</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors inline-block hover:translate-x-1 transform duration-200">Categorías</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors inline-block hover:translate-x-1 transform duration-200">Super Ventas</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors inline-block hover:translate-x-1 transform duration-200">Rastrear mi pedido</a></li>
            </ul>
          </div>

          {/* Legal Col */}
          <div>
            <h3 className="text-white font-bold tracking-widest text-[10px] sm:text-sm uppercase mb-4 sm:mb-6">Políticas</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Términos del Servicio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Reembolso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Envíos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Aviso Legal</a></li>
            </ul>
          </div>

          {/* Contact & Trust Col */}
          <div>
            <h3 className="text-white font-bold tracking-widest text-[10px] sm:text-sm uppercase mb-4 sm:mb-6">Contacto Seguro</h3>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm mb-4 sm:mb-6 text-zinc-500">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>Almacenes en Madrid y Barcelona, España.</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <span>soporte@dropes.es</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Atención por WhatsApp 24/7</span>
              </li>
            </ul>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 flex items-center gap-3 group">
              <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-white font-bold text-xs sm:text-sm">Checkout Seguro</div>
                <div className="text-[10px] text-zinc-600">100% Protegido</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium">
            © {new Date().getFullYear()} DROPES. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
            <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-700" />
            <span className="text-[9px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white/5 rounded border border-white/10">VISA</span>
            <span className="text-[9px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white/5 rounded border border-white/10">MASTERCARD</span>
            <span className="text-[9px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white/5 rounded border border-white/10">BIZUM</span>
            <span className="text-[9px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white/5 rounded border border-white/10 text-emerald-500/80 border-emerald-500/20">REEMBOLSO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
