import { ShieldCheck } from "lucide-react";

export default function PaymentMethods() {
  return (
    <section id="payment-methods" className="py-10 bg-[#0a0a0c] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-2xl border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md animate-pulse"></div>
              <div className="relative w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-white mb-0.5">Pago 100% Seguro</div>
              <div className="text-sm font-medium text-emerald-400">Transacciones encriptadas SSL</div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 w-full lg:w-auto">
            <div className="h-12 px-6 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-lg">
              Contra Reembolso
            </div>
            <div className="h-12 px-4 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-xl flex items-center justify-center shadow-lg">
              <img src="/assets/visa.svg" alt="Visa" className="h-4 sm:h-5 opacity-90 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden'); }} />
              <span className="hidden text-white font-bold tracking-wider italic text-lg">VISA</span>
            </div>
            <div className="h-12 px-4 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-xl flex items-center justify-center shadow-lg">
              <img src="/assets/mastercard.svg" alt="Mastercard" className="h-5 sm:h-6 opacity-90 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden'); }} />
              <span className="hidden text-white font-bold text-lg"><span className="text-red-500">master</span><span className="text-orange-500">card</span></span>
            </div>
            <div className="h-12 px-5 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-sky-400 font-extrabold text-xl tracking-tight">bizum</span>
            </div>
            <div className="h-12 px-4 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-xl flex items-center justify-center shadow-lg">
              <img src="/assets/paypal.svg" alt="PayPal" className="h-4 sm:h-5 opacity-90 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden'); }} />
              <span className="hidden text-white font-bold italic text-lg"><span className="text-blue-200">Pay</span><span className="text-sky-400">Pal</span></span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
