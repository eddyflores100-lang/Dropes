import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

const notifications = [
  { name: "María G.", location: "Madrid", product: "Humidificador gotas antigravedad", time: "Hace 2 min" },
  { name: "Carlos M.", location: "Barcelona", product: "Arona Pro Smartwatch", time: "Hace 5 min" },
  { name: "Laura P.", location: "Valencia", product: "PISTOLA PARA PINTAR ELÉCTRICA", time: "Hace 12 min" },
  { name: "David R.", location: "Sevilla", product: "Masajeador de cuello electromagnético", time: "Hace 15 min" },
  { name: "Ana S.", location: "Bilbao", product: "Faja Colombiana push up", time: "Hace 22 min" }
];

export default function SocialProofPopup() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed) return;

    const showTimeout = setTimeout(() => {
      setVisible(true);
    }, 3000);

    const hideInterval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setVisible(true);
      }, 1000);
    }, 8000);

    return () => {
      clearTimeout(showTimeout);
      clearInterval(hideInterval);
    };
  }, [closed]);

  if (closed) return null;

  const current = notifications[currentIndex];

  return (
    <div 
      className={`fixed bottom-4 left-4 z-50 transition-all duration-500 transform ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-xl border border-zinc-100 p-4 pr-10 flex items-center gap-4 max-w-sm relative">
        <button 
          onClick={() => setClosed(true)}
          className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        </div>
        
        <div>
          <div className="text-sm text-zinc-600 mb-0.5">
            <span className="font-bold text-zinc-900">{current.name}</span> en {current.location}
          </div>
          <div className="text-sm font-medium text-zinc-900 mb-1">
            Compró {current.product}
          </div>
          <div className="text-xs text-zinc-400">
            {current.time} · Compra verificada
          </div>
        </div>
      </div>
    </div>
  );
}
