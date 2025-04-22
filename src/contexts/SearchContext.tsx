
import React, { createContext, useState, useContext, ReactNode } from "react";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "product" | "course" | "order" | "customer" | "message";
  url: string;
  image?: string;
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  isSearching: boolean;
  performSearch: (query: string) => Promise<void>;
  clearSearch: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Mock search function - would connect to a real search API in a production app
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setSearchQuery(query);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock search results with correct type
      const mockResults: SearchResult[] = [
        {
          id: "p1",
          title: "iMac Pro 2023",
          description: "Produit digital - Ordinateur",
          type: "product",
          url: "/seller/products/p1",
          image: "https://api.dicebear.com/7.x/shapes/svg?seed=product1"
        },
        {
          id: "p2",
          title: "Template Site Web Premium",
          description: "Produit digital - Template",
          type: "product",
          url: "/seller/products/p2",
          image: "https://api.dicebear.com/7.x/shapes/svg?seed=product2"
        },
        {
          id: "c1",
          title: "Formation Complet WordPress",
          description: "Cours - Développement Web",
          type: "course",
          url: "/seller/courses/c1",
          image: "https://api.dicebear.com/7.x/shapes/svg?seed=course1"
        },
        {
          id: "o1",
          title: "Commande #12345",
          description: "Commande - Thomas Dubois - 29/04/2023",
          type: "order",
          url: "/seller/orders/o1"
        },
        {
          id: "m1",
          title: "Message de Support",
          description: "Message - Besoin d'aide avec mon achat",
          type: "message",
          url: "/seller/messages/m1"
        }
      ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(mockResults);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  const value = {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    performSearch,
    clearSearch,
    isSearchOpen,
    setIsSearchOpen
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
