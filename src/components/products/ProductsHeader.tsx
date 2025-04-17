
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ProductsHeader = () => {
  return (
    <div className="bg-gradient-to-r from-worldsell-blue-50 to-worldsell-orange-50 py-12">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Discover Products</h1>
        <p className="text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Explorez des milliers de produits de vendeurs à travers l'Afrique
        </p>
        
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2">
            <Input 
              placeholder="Rechercher des produits..." 
              className="bg-white"
            />
            <Button className="bg-worldsell-blue-500 hover:bg-worldsell-blue-600">
              <Search className="h-4 w-4 mr-2" />
              Rechercher
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;
