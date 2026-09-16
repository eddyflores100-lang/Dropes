import { Truck, Zap } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="hidden sm:flex bg-zinc-900 text-white px-4 py-2.5 text-center text-xs font-medium tracking-wide items-center justify-center gap-6 flex-wrap">
      <div className="flex items-center gap-2">
        <Truck className="w-3.5 h-3.5" />
        <span>ENVÍO GRATIS +35€</span>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <Zap className="w-3.5 h-3.5" />
        <span>Entrega 24-48h en España</span>
      </div>
      <div className="hidden md:flex items-center gap-2">
        <span>💸 Pago Contra Reembolso</span>
      </div>
    </div>
  );
}
