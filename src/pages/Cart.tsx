
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Type pour les éléments du panier
interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  quantity: number;
  image: string;
  type: "digital" | "physical" | "course";
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Formation Marketing Digital",
      price: 129.99,
      category: "Formation",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      type: "course"
    },
    {
      id: 2,
      name: "Sac en cuir africain artisanal",
      price: 89.99,
      category: "Physique",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
      type: "physical"
    }
  ]);

  // Calculer le sous-total
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  // Augmenter la quantité d'un article
  const increaseQuantity = (itemId: number) => {
    setCartItems(
      cartItems.map(item => 
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    toast.success("Quantité mise à jour");
  };

  // Diminuer la quantité d'un article
  const decreaseQuantity = (itemId: number) => {
    setCartItems(
      cartItems.map(item => 
        item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
    toast.success("Quantité mise à jour");
  };

  // Supprimer un article du panier
  const removeItem = (itemId: number) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    toast.success("Article supprimé du panier");
  };

  // Rediriger vers la page de paiement
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }
    navigate("/checkout");
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
          <h1 className="text-2xl font-bold mb-6">Votre Panier</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-6 text-muted-foreground">
                <ShoppingBag className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg">Votre panier est vide</p>
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
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <Card>
                      <CardContent className="flex items-center gap-4 p-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => increaseQuantity(item.id)}
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
                            className="text-red-500"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <div className="lg:col-span-1">
                <Card>
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
