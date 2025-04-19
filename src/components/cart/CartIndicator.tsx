
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import CartPopup from "./CartPopup";

const CartIndicator = () => {
  const navigate = useNavigate();
  const { cartCount, showCartPopup, closeCartPopup } = useCart();

  return (
    <>
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={() => navigate('/cart')}
        >
          <ShoppingCart className="h-5 w-5" />
          <AnimatePresence mode="wait">
            {cartCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 bg-worldsell-orange-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {cartCount}
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>
      
      <CartPopup 
        isOpen={showCartPopup} 
        onClose={closeCartPopup} 
        itemCount={cartCount} 
      />
    </>
  );
};

export default CartIndicator;
