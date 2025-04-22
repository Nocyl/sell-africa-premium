
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, ShoppingCart, Tag, Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  salePrice?: number;
  status: "in_stock" | "out_of_stock" | "low_stock";
  type: "digital" | "physical";
  category: string;
  sales: number;
  stock?: number;
}

export function ProductCard({ product }: { product: ProductProps }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const statusColors = {
    in_stock: "bg-green-100 text-green-800 hover:bg-green-200",
    low_stock: "bg-amber-100 text-amber-800 hover:bg-amber-200",
    out_of_stock: "bg-red-100 text-red-800 hover:bg-red-200",
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in_stock": return "En stock";
      case "low_stock": return "Stock faible";
      case "out_of_stock": return "Épuisé";
      default: return status;
    }
  };
  
  const handleDelete = () => {
    setIsLoading(true);
    // Simuler une suppression
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Produit supprimé avec succès");
    }, 1000);
  };
  
  const handleEdit = () => {
    navigate(`/seller/products/edit/${product.id}`);
  };
  
  const handleView = () => {
    navigate(`/product/${product.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
        <Badge 
          className={`absolute top-2 right-2 ${statusColors[product.status]}`}
        >
          {getStatusLabel(product.status)}
        </Badge>
        {product.type === "digital" ? (
          <Badge variant="secondary" className="absolute top-2 left-2">
            Digital
          </Badge>
        ) : (
          <Badge variant="outline" className="absolute top-2 left-2 bg-white/80">
            Physique
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold text-primary">
            {formatPrice(product.salePrice || product.price)}
          </p>
          {product.salePrice && (
            <p className="text-sm text-muted-foreground line-through">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {product.description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            <span>{product.sales} vendus</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span>{product.category}</span>
          </div>
          {product.type === "physical" && product.stock !== undefined && (
            <div className="flex items-center gap-1 col-span-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span>{product.stock} en stock</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 mr-2"
          onClick={handleView}
        >
          <Eye className="h-4 w-4 mr-1" />
          Aperçu
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="sm" className="flex-1">
              <Edit className="h-4 w-4 mr-1" />
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 focus:text-red-600" 
              onClick={handleDelete}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isLoading ? "Suppression..." : "Supprimer"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="h-48">
        <Skeleton className="h-full w-full" />
      </div>
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-4/5 mb-2" />
        <Skeleton className="h-7 w-1/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}
