
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const [orderId] = useState(location.state?.orderId || "WS" + Math.floor(100000 + Math.random() * 900000));
  
  useEffect(() => {
    clearCart();
    
    // Launch confetti only once when the component mounts
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, [clearCart]);

  const handleContinueShopping = () => {
    navigate("/products");
  };

  const handleViewOrder = () => {
    navigate("/dashboard/orders");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-16 bg-muted/20">
        <div className="container max-w-2xl">
          <motion.div
            className="bg-white rounded-lg shadow-sm border p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-3">Paiement réussi !</h1>
              <p className="text-muted-foreground mb-6">
                Merci pour votre achat. Votre commande a été traitée avec succès.
              </p>
              
              <div className="bg-muted/30 rounded-lg p-6 mb-8">
                <div className="text-sm text-muted-foreground mb-2">Numéro de commande</div>
                <div className="text-xl font-medium flex items-center justify-center gap-2">
                  {orderId}
                  <motion.div
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 2, repeatDelay: 0.5 }}
                  >
                    <Sparkles className="h-5 w-5 text-worldsell-orange-400" />
                  </motion.div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={handleContinueShopping}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Continuer vos achats
                </Button>
                <Button
                  className="gap-2 bg-worldsell-blue-500 hover:bg-worldsell-blue-600"
                  onClick={handleViewOrder}
                >
                  Voir ma commande
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
