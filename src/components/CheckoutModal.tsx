import { useState, ChangeEvent } from "react";
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Minus, Plus, ShoppingBag, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CheckoutModalProps {
  cart: any[];
  onClose: () => void;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onClearCart: () => void;
}

const DROPEA_API_KEY = "AIzaP1ltDwuOh4UrOGMxtm66iImf4SNdiGHlYhcSAmRW8HE=";
const SHOP_ID = 12928;

const SPAIN_PROVINCES = [
  "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia", "Palma de Mallorca", "Las Palmas", "Bilbao", "Alicante", "Córdoba", "Valladolid", "Vigo", "Gijón", "Hospitalet", "Vitoria", "A Coruña", "Granada", "Elche"
];

const PORTUGAL_DISTRICTS = [
  "Lisboa", "Porto", "Braga", "Setúbal", "Aveiro", "Leiria", "Santarém", "Coimbra", "Faro", "Viseu"
];

export default function CheckoutModal({ cart, onClose, onUpdateQuantity, onClearCart }: CheckoutModalProps) {
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");
  const [savedTotal, setSavedTotal] = useState<string>("0.00");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    zip: "",
    city: "",
    country: "ES",
    email: "cliente@tienda.com"
  });

  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.priceNow.toString().replace(',', '.'));
      return total + (isNaN(price) ? 0 : price * item.quantity);
    }, 0).toFixed(2);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitOrderToDropea = async () => {
    setLoading(true);
    setError(null);

    const query = `
      mutation CreateOrder($shop_id: Int!, $payment_method: PaymentMethodEnum!, $customer: CustomerInputType!, $products: [OrderProductInputType!]!) {
        orderCreate(shop_id: $shop_id, payment_method: $payment_method, customer: $customer, products: $products) {
          id
        }
      }
    `;

    const variables = {
      shop_id: SHOP_ID,
      payment_method: paymentMethod === "cod" ? "CASH_ON_DELIVERY" : "CARD",
      customer: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
        country: formData.country as any // ES or PT
      },
      products: cart.map(item => ({
        product_id: parseInt(item.id),
        unit_price: parseFloat(item.priceNow.toString().replace(',', '.')),
        quantity: item.quantity,
        total_value: parseFloat(item.priceNow.toString().replace(',', '.')) * item.quantity
      }))
    };

    try {
      const response = await fetch('https://api.dropea.com/graphql/dropshippers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': DROPEA_API_KEY
        },
        body: JSON.stringify({ query, variables })
      });

      const result = await response.json();
      
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      setSavedTotal(getSubtotal());
      setStep("success");
      onClearCart();
    } catch (err: any) {
      setError(err.message || "Error al conectar con el servidor. Inténtelo de nuevo.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-zinc-900/40 backdrop-blur-md overflow-hidden">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white rounded-3xl w-full max-w-lg max-h-[95vh] overflow-y-auto shadow-2xl relative flex flex-col no-scrollbar"
      >
        <button 
          onClick={onClose} 
          title="Cerrar"
          aria-label="Cerrar"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {step === "cart" && (
            <motion.div 
              key="cart"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="p-5 sm:p-8 flex-1 flex flex-col"
            >
              <h3 className="text-xl sm:text-3xl font-black text-zinc-900 mb-6 sm:mb-8 flex items-center gap-3 italic tracking-tighter uppercase">
                <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                Tu Carrito
              </h3>
              
              {cart.length === 0 ? (
                <div className="text-center py-20 text-zinc-400 flex flex-col items-center">
                  <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-12 h-12 text-zinc-200" />
                  </div>
                  <p className="text-lg font-bold text-zinc-300">El carrito está vacío</p>
                  <button
                    onClick={onClose}
                    className="mt-8 px-10 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all active:scale-95 shadow-xl shadow-zinc-900/20"
                  >
                    Seguir Comprando
                  </button>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto mb-8 pr-2 custom-scrollbar">
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 sm:gap-5 items-center bg-zinc-50 border border-zinc-100 rounded-[1.5rem] sm:rounded-[2rem] p-3 sm:p-5 transition-all hover:bg-white hover:border-zinc-200 hover:shadow-lg">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden bg-white flex-shrink-0 border border-zinc-100 p-2">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">{item.category || "General"}</div>
                          <div className="font-bold text-zinc-900 mb-1.5 sm:mb-3 truncate text-sm sm:text-base" title={item.name}>{item.name}</div>
                          <div className="flex items-center justify-between">
                            <div className="text-lg sm:text-xl font-black text-zinc-900">{item.priceNow}€</div>
                            <div className="flex items-center gap-4 bg-white border border-zinc-100 px-3 py-1.5 rounded-full shadow-sm">
                              <button 
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} 
                                title="Reducir cantidad"
                                aria-label="Reducir cantidad"
                                className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-red-500 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-bold text-sm text-zinc-900">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} 
                                title="Aumentar cantidad"
                                aria-label="Aumentar cantidad"
                                className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-emerald-500 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {cart.length > 0 && (
                <div className="mt-auto">
                  <div className="bg-zinc-900 rounded-[1.8rem] sm:rounded-[2.5rem] p-5 sm:p-8 text-white mb-4 sm:mb-6 shadow-2xl shadow-zinc-900/20">
                    <div className="flex justify-between items-center mb-2 opacity-60 text-sm">
                      <span>Subtotal</span>
                      <span>{getSubtotal()}€</span>
                    </div>
                    <div className="flex justify-between items-center mb-6 text-emerald-400 text-sm font-bold uppercase tracking-widest">
                      <span>Envío exprés</span>
                      <span>GRATIS</span>
                    </div>
                    <div className="flex justify-between items-center text-xl sm:text-3xl font-black">
                      <span>Total</span>
                      <span>{getSubtotal()}€</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setStep("checkout")}
                    className="w-full bg-red-600 text-white py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] font-black transition-all hover:bg-red-700 active:scale-[0.98] flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl shadow-2xl shadow-red-600/30"
                  >
                    Finalizar Pedido
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {step === "checkout" && (
            <motion.div 
              key="checkout"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="p-5 sm:p-8"
            >
               <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                  <button 
                    onClick={() => setStep("cart")} 
                    title="Volver al carrito"
                    aria-label="Volver al carrito"
                    className="p-2 sm:p-3 bg-zinc-50 rounded-full hover:bg-zinc-100 transition-colors -ml-1 sm:-ml-2"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
                  </button>
                  <h3 className="text-xl sm:text-3xl font-black text-zinc-900 italic tracking-tighter uppercase">Finalizar</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-10">
                <button 
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 flex flex-col items-center gap-2 sm:gap-3 transition-all ${paymentMethod === 'cod' ? 'border-red-600 bg-red-50' : 'border-zinc-100 bg-zinc-50 hover:border-zinc-200'}`}
                >
                   <Truck className={`w-6 h-6 sm:w-8 sm:h-8 ${paymentMethod === 'cod' ? 'text-red-600' : 'text-zinc-300'}`} />
                   <span className={`text-[11px] sm:text-sm font-black text-center ${paymentMethod === 'cod' ? 'text-zinc-900' : 'text-zinc-400'}`}>Contra Reembolso</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 flex flex-col items-center gap-2 sm:gap-3 transition-all ${paymentMethod === 'card' ? 'border-zinc-900 bg-zinc-100' : 'border-zinc-100 bg-zinc-50 hover:border-zinc-200'}`}
                >
                    <CreditCard className={`w-6 h-6 sm:w-8 sm:h-8 ${paymentMethod === 'card' ? 'text-zinc-900' : 'text-zinc-300'}`} />
                    <span className={`text-[11px] sm:text-sm font-black text-center ${paymentMethod === 'card' ? 'text-zinc-900' : 'text-zinc-400'}`}>Tarjeta / Bizum</span>
                </button>
              </div>

              {error && (
                <div className="mb-6 p-5 bg-red-50 border border-red-100 text-red-700 rounded-3xl text-sm flex gap-3">
                  <AlertCircle className="w-6 h-6 flex-shrink-0" />
                  <p className="font-bold">{error}</p>
                </div>
              )}

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); submitOrderToDropea(); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-zinc-400 uppercase ml-2">Nombre</span>
                    <input required name="first_name" value={formData.first_name} onChange={handleInputChange} type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3.5 px-4 sm:py-4 sm:px-5 text-sm outline-none focus:border-red-600 focus:bg-white transition-all font-bold" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-zinc-400 uppercase ml-2">Apellidos</span>
                    <input required name="last_name" value={formData.last_name} onChange={handleInputChange} type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3.5 px-4 sm:py-4 sm:px-5 text-sm outline-none focus:border-red-600 focus:bg-white transition-all font-bold" />
                  </div>
                </div>
                <div className="space-y-1">
                    <span className="text-[10px] font-black text-zinc-400 uppercase ml-2">País</span>
                    <select name="country" value={formData.country} onChange={handleInputChange} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3.5 px-4 sm:py-4 sm:px-5 text-sm outline-none focus:border-red-600 focus:bg-white transition-all font-bold">
                      <option value="ES">España 🇪🇸</option>
                      <option value="PT">Portugal 🇵🇹</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <span className="text-[10px] font-black text-zinc-400 uppercase ml-2">Ciudad / Provincia</span>
                    <select required name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3.5 px-4 sm:py-4 sm:px-5 text-sm outline-none focus:border-red-600 focus:bg-white transition-all font-bold">
                      <option value="">Selecciona tu ciudad...</option>
                      {formData.country === "ES" ? SPAIN_PROVINCES.map(p => <option key={p} value={p}>{p}</option>) : PORTUGAL_DISTRICTS.map(p => <option key={p} value={p}>{p}</option>)}
                      <option value="Otra">Otra (Especificar en dirección)</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <span className="text-[10px] font-black text-zinc-400 uppercase ml-2">Teléfono</span>
                    <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="Ej: 600 000 000" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3.5 px-4 sm:py-4 sm:px-5 text-sm outline-none focus:border-red-600 focus:bg-white transition-all font-bold" />
                </div>
                <div className="space-y-1">
                    <span className="text-[10px] font-black text-zinc-400 uppercase ml-2">Código Postal</span>
                    <input required name="zip" value={formData.zip} onChange={handleInputChange} type="text" placeholder="Ej: 28001" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3.5 px-4 sm:py-4 sm:px-5 text-sm outline-none focus:border-red-600 focus:bg-white transition-all font-bold" />
                </div>
                <div className="space-y-1">
                    <span className="text-[10px] font-black text-zinc-400 uppercase ml-2">Dirección Completa</span>
                    <input required name="address" value={formData.address} onChange={handleInputChange} type="text" placeholder="Calle, número, piso..." className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3.5 px-4 sm:py-4 sm:px-5 text-sm outline-none focus:border-red-600 focus:bg-white transition-all font-bold" />
                </div>
                
                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] font-black transition-all active:scale-[0.95] disabled:opacity-50 mt-4 sm:mt-8 flex items-center justify-center gap-3 text-lg sm:text-xl shadow-2xl ${paymentMethod === 'cod' ? 'bg-red-600 hover:bg-red-700 shadow-red-600/30' : 'bg-zinc-900 hover:bg-zinc-800 shadow-zinc-900/30'}`}
                >
                  {loading ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : (
                    <>
                      {paymentMethod === 'cod' ? "Confirmar Pedido" : "Ir al Pago"}
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Conexión Encriptada SSL
              </div>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div 
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-12 text-center"
            >
              <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-10 border-4 border-emerald-100">
                <CheckCircle2 className="w-16 h-16 text-emerald-600" />
              </div>
              <h3 className="text-4xl font-black text-zinc-900 mb-6 tracking-tight italic uppercase italic tracking-tighter">¡GRACIAS!</h3>
              <p className="text-zinc-500 mb-10 text-lg font-medium">
                Tu pedido ha sido procesado con éxito. En breve recibirás una llamada o WhatsApp para confirmar el envío.
                <br /><br />
                {paymentMethod === 'cod' && (
                  <span className="bg-red-50 text-red-600 px-8 py-5 rounded-[2rem] inline-block font-black border-2 border-red-100 shadow-xl shadow-red-600/10">
                    Prepárate: El repartidor cobrará {savedTotal}€
                  </span>
                )}
              </p>
              <button 
                onClick={onClose}
                className="w-full bg-zinc-900 text-white py-6 rounded-[2rem] font-black text-lg transition-all hover:bg-zinc-800 active:scale-[0.98]"
              >
                Continuar Comprando
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
