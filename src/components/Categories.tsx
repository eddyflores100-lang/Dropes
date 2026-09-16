import { ArrowRight, Smartphone, Home, Sparkles, Trophy, Utensils, Baby } from "lucide-react";

const categories = [
  { id: 1, name: "Tecnología", icon: Smartphone, color: "bg-blue-50 text-blue-600 border-blue-100" },
  { id: 2, name: "Hogar", icon: Home, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { id: 3, name: "Belleza", icon: Sparkles, color: "bg-pink-50 text-pink-600 border-pink-100" },
  { id: 4, name: "Deporte", icon: Trophy, color: "bg-orange-50 text-orange-600 border-orange-100" },
  { id: 5, name: "Cocina", icon: Utensils, color: "bg-amber-50 text-amber-600 border-amber-100" },
  { id: 6, name: "Niños", icon: Baby, color: "bg-purple-50 text-purple-600 border-purple-100" },
];

export default function Categories({ onSelectCategory }: { onSelectCategory?: (cat: string) => void }) {
  return (
    <section className="py-10 sm:py-24 bg-white" id="categorias">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tighter italic text-zinc-900 mb-4 uppercase">
            Explora por Categoría
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base font-medium max-w-2xl mx-auto">
            Iconos diseñados para una navegación rápida y sencilla por todo nuestro catálogo.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map(category => (
            <a 
              key={category.id} 
              href="#products-section" 
              onClick={(e) => {
                if (onSelectCategory) {
                  onSelectCategory(category.name);
                }
              }}
              className={`group flex flex-col items-center justify-center p-4 sm:p-8 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${category.color}`}
            >
              <div className="mb-2 sm:mb-4 transform transition-transform group-hover:rotate-12">
                <category.icon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-sm sm:text-lg font-black text-zinc-900">{category.name}</h3>
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                Ver todo <ArrowRight className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
