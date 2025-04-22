
import React, { useEffect, useRef } from "react";
import { useSearch } from "@/contexts/SearchContext";
import { 
  Package, 
  BookOpen, 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  Search, 
  X,
  Loader2 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SearchResults() {
  const { 
    searchQuery, 
    setSearchQuery, 
    searchResults, 
    isSearching, 
    performSearch, 
    clearSearch,
    isSearchOpen
  } = useSearch();
  
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };
  
  const handleResultClick = (url: string) => {
    navigate(url);
    clearSearch();
  };
  
  const getIconForType = (type: string) => {
    switch (type) {
      case "product":
        return <Package className="h-4 w-4 text-blue-500" />;
      case "course":
        return <BookOpen className="h-4 w-4 text-green-500" />;
      case "order":
        return <ShoppingBag className="h-4 w-4 text-amber-500" />;
      case "customer":
        return <Users className="h-4 w-4 text-purple-500" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-red-500" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };
  
  if (!isSearchOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in-0 zoom-in-95">
        <div className="p-4 border-b">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                placeholder="Rechercher dans le tableau de bord..."
                className="pl-9 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" size="sm">
              Rechercher
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={clearSearch}
              className="ml-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fermer</span>
            </Button>
          </form>
        </div>
        
        <div className="min-h-32">
          {isSearching ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : searchResults.length > 0 ? (
            <ScrollArea className="max-h-[60vh]">
              <div className="divide-y">
                {searchResults.map((result) => (
                  <div 
                    key={`${result.type}-${result.id}`}
                    className="p-3 hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => handleResultClick(result.url)}
                  >
                    <div className="flex items-start gap-3">
                      {result.image ? (
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center overflow-hidden shrink-0">
                          <img src={result.image} alt={result.title} className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                          {getIconForType(result.type)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-medium truncate">{result.title}</h4>
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                            {getIconForType(result.type)}
                            <span>{result.type.charAt(0).toUpperCase() + result.type.slice(1)}</span>
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">{result.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : searchQuery ? (
            <div className="text-center py-10 px-4">
              <p className="text-muted-foreground">
                Aucun résultat trouvé pour "<span className="font-medium">{searchQuery}</span>"
              </p>
            </div>
          ) : (
            <div className="text-center py-10 px-4">
              <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                Commencez à taper pour rechercher des produits, cours, commandes...
              </p>
            </div>
          )}
        </div>
        
        {searchResults.length > 0 && (
          <div className="bg-muted/50 p-2 text-center text-xs text-muted-foreground">
            Appuyez sur ESC pour fermer les résultats
          </div>
        )}
      </div>
    </div>
  );
}
