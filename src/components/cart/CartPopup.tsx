
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";

interface CartPopupProps {
  isOpen: boolean;
  onClose: () => void;
  itemCount: number;
}

const CartPopup = ({ isOpen, onClose, itemCount }: CartPopupProps) => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Mobile: use drawer, Desktop: use popup
  const isMobile = window.innerWidth < 768;

  const handleCheckout = () => {
    navigate("/checkout");
    onClose();
  };
  
  const handleViewCart = () => {
    navigate("/cart");
    onClose();
  };

  useEffect(() => {
    // Auto-close after 10 seconds if user doesn't interact
    let timer: NodeJS.Timeout;
    if (isOpen && !isDrawerOpen) {
      timer = setTimeout(() => {
        onClose();
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, onClose, isDrawerOpen]);

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-worldsell-orange-400" />
              Panier mis à jour
              <span className="ml-auto">
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </span>
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 text-center">
            <p className="mb-4">
              Vous avez <span className="font-bold">{itemCount}</span> {itemCount > 1 ? 'articles' : 'article'} dans votre panier
            </p>
          </div>
          <DrawerFooter>
            <Button onClick={handleViewCart} variant="outline" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Voir le panier
            </Button>
            <Button onClick={handleCheckout} className="gap-2 bg-worldsell-orange-400 hover:bg-worldsell-orange-500">
              Passer la commande
              <ArrowRight className="h-4 w-4" />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 500 }}
          className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 z-50"
        >
          <div className="bg-white rounded-lg shadow-xl border overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-worldsell-orange-400" />
                <span className="font-medium">Panier mis à jour</span>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 text-center">
              <p className="mb-4">
                Vous avez <span className="font-bold">{itemCount}</span> {itemCount > 1 ? 'articles' : 'article'} dans votre panier
              </p>
            </div>
            <div className="p-4 bg-muted/20 flex gap-3">
              <Button onClick={handleViewCart} variant="outline" className="gap-2 flex-1">
                <ShoppingCart className="h-4 w-4" />
                Voir le panier
              </Button>
              <Button onClick={handleCheckout} className="gap-2 flex-1 bg-worldsell-orange-400 hover:bg-worldsell-orange-500">
                Passer la commande
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartPopup;
