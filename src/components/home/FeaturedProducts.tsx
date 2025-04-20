
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  type: "digital" | "physical" | "course";
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Formation React Développeur Front End",
    price: 25000,
    image: "/images/products/react-course.webp",
    type: "course",
    category: "Development"
  },
  {
    id: 2,
    name: "T-shirt WorldSell",
    price: 8000,
    image: "/images/products/t-shirt-worldsell.webp",
    type: "physical",
    category: "Clothing"
  },
  {
    id: 3,
    name: "UI/UX Design Kit",
    price: 15000,
    image: "/images/products/ui-ux-kit.webp",
    type: "digital",
    category: "Design"
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
            <CardContent className="p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-xl font-bold text-primary mt-2">
                {product.price.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'XOF',
                })}
              </p>
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
