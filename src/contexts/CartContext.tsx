
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
  showCartPopup: boolean;
  setShowCartPopup: (show: boolean) => void;
  closeCartPopup: () => void;
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
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { ...newItem, quantity: newItem.quantity || 1 }];
      }
    });
    
    // Show cart popup when adding items
    setShowCartPopup(true);
  };

  // Remove item from cart
  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
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
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId && item.quantity > 1 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
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
      showCartPopup,
      setShowCartPopup,
      closeCartPopup
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
