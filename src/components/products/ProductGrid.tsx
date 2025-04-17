
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star, ChevronDown, GridIcon, List } from "lucide-react";

interface ProductGridProps {
  type?: "all" | "digital" | "physical" | "course";
}

const ProductGrid = ({ type = "all" }: ProductGridProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");

  // Données fictives des produits
  const products = [
    {
      id: 1,
      name: "Advanced Digital Marketing Course",
      price: 129.99,
      currency: "USD",
      type: "course",
      rating: 4.8,
      reviews: 245,
      image: "bg-worldsell-blue-100",
      seller: "DigitalPros Academy",
    },
    {
      id: 2,
      name: "Handcrafted African Leather Bag",
      price: 89.99,
      currency: "USD",
      type: "physical",
      rating: 4.9,
      reviews: 129,
      image: "bg-worldsell-orange-100",
      seller: "LeatherCraft Nigeria",
    },
    {
      id: 3,
      name: "E-commerce Website Templates Bundle",
      price: 49.99,
      currency: "USD",
      type: "digital",
      rating: 4.7,
      reviews: 78,
      image: "bg-worldsell-earth-100",
      seller: "WebDesigns Kenya",
    },
    {
      id: 4,
      name: "Photography Masterclass",
      price: 79.99,
      currency: "USD",
      type: "course",
      rating: 4.9,
      reviews: 312,
      image: "bg-green-100",
      seller: "CreativeEye South Africa",
    },
    {
      id: 5,
      name: "Premium African Coffee Beans",
      price: 24.99,
      currency: "USD",
      type: "physical",
      rating: 4.8,
      reviews: 183,
      image: "bg-worldsell-earth-200",
      seller: "CoffeeFarms Ethiopia",
    },
    {
      id: 6,
      name: "Social Media Management Templates",
      price: 19.99,
      currency: "USD",
      type: "digital",
      rating: 4.6,
      reviews: 92,
      image: "bg-worldsell-blue-200",
      seller: "MarketingPro Ghana",
    },
  ];

  // Filtrer les produits selon le type si spécifié
  const filteredProducts = type === "all" 
    ? products 
    : products.filter(product => product.type === type);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">
          Affichage de <span className="font-medium">{filteredProducts.length}</span> produits
        </p>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded">
            <button 
              className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <GridIcon className="h-4 w-4" />
            </button>
            <button 
              className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">Trier par:</span>
            <select 
              className="text-sm border rounded p-1.5"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Popularité</option>
              <option value="newest">Plus récent</option>
              <option value="price-low">Prix croissant</option>
              <option value="price-high">Prix décroissant</option>
              <option value="rating">Avis</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: any;
  viewMode: "grid" | "list";
}

const ProductCard = ({ product, viewMode }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className={`${product.image} aspect-square sm:w-48 relative`}>
            <Badge 
              variant="outline" 
              className="absolute top-2 left-2 bg-white"
            >
              {product.type === 'digital' ? 'Digital' : 
               product.type === 'course' ? 'Course' : 'Physical'}
            </Badge>
            <button 
              className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart 
                size={18} 
                className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"} 
              />
            </button>
          </div>
          
          <CardContent className="p-4 flex-1">
            <div className="mb-1 text-xs text-muted-foreground">{product.seller}</div>
            <h3 className="font-medium text-lg mb-2">{product.name}</h3>
            
            <div className="flex items-center gap-1 mb-3">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            </div>
            
            <div className="font-semibold text-lg mb-3">
              {product.currency} {product.price.toFixed(2)}
            </div>
            
            <div className="flex gap-2">
              <Button className="bg-worldsell-orange-400 hover:bg-worldsell-orange-500">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Ajouter au panier
              </Button>
              <Button variant="outline">
                Voir détails
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden h-full">
      <div className={`aspect-square ${product.image} relative`}>
        <Badge 
          variant="outline" 
          className="absolute top-2 left-2 bg-white"
        >
          {product.type === 'digital' ? 'Digital' : 
           product.type === 'course' ? 'Course' : 'Physical'}
        </Badge>
        <button 
          className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart 
            size={18} 
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"} 
          />
        </button>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-1 text-xs text-muted-foreground">{product.seller}</div>
        <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div className="font-semibold">
            {product.currency} {product.price.toFixed(2)}
          </div>
          <Button size="sm" className="bg-worldsell-orange-400 hover:bg-worldsell-orange-500 h-8 w-8 p-0">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductGrid;
