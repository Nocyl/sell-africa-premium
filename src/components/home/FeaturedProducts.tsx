
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useState } from "react";

// Mock product data
const products = [
  {
    id: 1,
    name: "Advanced Digital Marketing Course",
    price: 129.99,
    currency: "USD",
    type: "digital",
    rating: 4.8,
    reviews: 245,
    image: "bg-worldsell-blue-100",
    seller: "DigitalPros Academy",
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
  }
];

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="overflow-hidden product-card">
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
          <Button size="sm" variant="ghost" className="p-0 h-8 w-8">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturedProducts = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Button variant="link" className="text-worldsell-blue-500">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
