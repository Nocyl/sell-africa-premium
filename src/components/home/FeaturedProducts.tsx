
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  type: "digital" | "physical" | "course";
  category: string;
  sponsored?: boolean;
  sellerId?: number;
  sellerName?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Formation React Développeur Front End",
    price: 25000,
    image: "/images/products/react-course.webp",
    type: "course",
    category: "Development",
    sponsored: true,
    sellerId: 101,
    sellerName: "TechEdu Pro"
  },
  {
    id: 2,
    name: "T-shirt WorldSell",
    price: 8000,
    image: "/images/products/t-shirt-worldsell.webp",
    type: "physical",
    category: "Clothing",
    sponsored: true,
    sellerId: 102,
    sellerName: "ModaStyle"
  },
  {
    id: 3,
    name: "UI/UX Design Kit",
    price: 15000,
    image: "/images/products/ui-ux-kit.webp",
    type: "digital",
    category: "Design",
    sponsored: true,
    sellerId: 103,
    sellerName: "DesignMasters"
  },
];

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: product.type as "digital" | "physical" | "course",
      category: product.category,
      quantity: 1
    });
  };

  return (
    <div className="container py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Nos produits populaires</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="product-card overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-4 relative">
              {product.sponsored && (
                <Badge className="absolute top-6 right-6 bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Sponsorisé
                </Badge>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 flex items-center text-sm">
                {product.category}
                {product.sellerName && (
                  <span className="ml-auto text-xs text-gray-500">
                    Par {product.sellerName}
                  </span>
                )}
              </p>
              <div className={cn(
                "text-xl font-bold mt-2",
                product.sponsored ? "text-primary" : "text-gray-900"
              )}>
                {product.price.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'XOF',
                })}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 bg-gray-50">
              <Button onClick={() => navigate(`/product/${product.id}`)}>
                Voir plus
              </Button>
              <Button variant="secondary" onClick={() => handleAddToCart(product)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
