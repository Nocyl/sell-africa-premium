
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, cartCount } = useCart();

  // Calculer le sous-total
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  // Supprimer un article du panier
  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId);
  };

  // Rediriger vers la page de paiement
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }
    navigate("/checkout");
  };

  // Continuer les achats
  const handleContinueShopping = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-1xl font-bold">Votre Panier ({cartCount} {cartCount > 1 ? 'articles' : 'article'})</h1>
            <Button 
              variant="ghost" 
              className="gap-2" 
              onClick={handleContinueShopping}
            >
              <ArrowLeft className="h-4 w-4" />
              Continuer les achats
            </Button>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-6 text-muted-foreground">
                <ShoppingBag className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg">Votre panier est vide</p>
                <p className="text-sm mt-2">Découvrez nos produits et ajoutez-les à votre panier</p>
              </div>
              <Button 
                className="bg-worldsell-blue-500 hover:bg-worldsell-blue-600"
                onClick={() => navigate("/products")}
              >
                Découvrir nos produits
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence initial={false}>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      <Card>
                        <CardContent className="flex items-center gap-4 p-4">
                          <div 
                            className="w-24 h-24 rounded bg-cover bg-center" 
                            style={{ backgroundImage: `url(${item.image})` }}
                            onClick={() => navigate(`/product/${item.id}`)}
                          ></div>
                          <div className="flex-1">
                            <h3 
                              className="font-semibold hover:text-worldsell-blue-500 cursor-pointer"
                              onClick={() => navigate(`/${item.type === 'course' ? 'course' : 'product'}/${item.id}`)}
                            >
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => decreaseQuantity(item.id)}
                                className="h-8 w-8"
                                disabled={item.type !== 'physical'}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => increaseQuantity(item.id)}
                                className="h-8 w-8"
                                disabled={item.type !== 'physical'}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{(item.price * item.quantity).toFixed(2)} €</p>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-red-500 mt-2"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Résumé de la commande</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Sous-total</span>
                        <span>{subtotal.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Livraison</span>
                        <span>{shipping.toFixed(2)} €</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>{total.toFixed(2)} €</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-6 bg-worldsell-orange-400 hover:bg-worldsell-orange-500"
                      onClick={handleCheckout}
                    >
                      Passer la commande
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
