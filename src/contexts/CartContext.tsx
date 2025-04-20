
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

// Type for cart items
export interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  quantity: number;
  image: string;
  type: "digital" | "physical" | "course";
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  increaseQuantity: (itemId: number) => void;
  decreaseQuantity: (itemId: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  showCartPopup: boolean;
  setShowCartPopup: (show: boolean) => void;
  closeCartPopup: () => void;
  hasPhysicalItems: boolean;
  hasDigitalItems: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  // Initialize cart from localStorage if available
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [showCartPopup, setShowCartPopup] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate total number of items
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate total price
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Check if cart has physical or digital items
  const hasPhysicalItems = cartItems.some(item => item.type === "physical");
  const hasDigitalItems = cartItems.some(item => item.type === "digital" || item.type === "course");

  // Add item to cart
  const addToCart = (newItem: CartItem) => {
    setCartItems(prevItems => {
      // Check if item already exists
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + (newItem.quantity || 1)
        };
        toast.success(`Quantité de ${newItem.name} mise à jour dans le panier`);
        return updatedItems;
      } else {
        // Add new item
        toast.success(`${newItem.name} ajouté au panier`);
        return [...prevItems, { ...newItem, quantity: newItem.quantity || 1 }];
      }
    });
    
    // Show cart popup when adding items
    setShowCartPopup(true);
    
    // Auto-close popup after 7 seconds
    setTimeout(() => {
      closeCartPopup();
    }, 7000);
  };

  // Remove item from cart
  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === itemId);
      if (itemToRemove) {
        toast.success(`${itemToRemove.name} retiré du panier`);
      }
      return prevItems.filter(item => item.id !== itemId);
    });
  };

  // Increase item quantity
  const increaseQuantity = (itemId: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease item quantity
  const decreaseQuantity = (itemId: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            // Si la quantité serait 0, on supprime l'article complètement
            // Mais on ne montre le toast qu'une seule fois
            toast.success(`${item.name} retiré du panier`);
            return null;
          }
        }
        return item;
      }).filter(Boolean) as CartItem[];
      
      return updatedItems;
    });
  };

  // Clear entire cart - avec un seul toast
  const clearCart = () => {
    // Ne montrer le toast que si le panier n'est pas déjà vide
    if (cartItems.length > 0) {
      toast.success("Panier vidé avec succès");
    }
    setCartItems([]);
  };

  // Close cart popup
  const closeCartPopup = () => {
    setShowCartPopup(false);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      cartCount,
      cartTotal,
      showCartPopup,
      setShowCartPopup,
      closeCartPopup,
      hasPhysicalItems,
      hasDigitalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
