
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QuickNavMenu from "@/components/dashboard/QuickNavMenu";
import { ProductCard, ProductCardSkeleton, ProductProps } from "@/components/dashboard/seller/ProductCard";
import ProductsFilter from "@/components/dashboard/seller/ProductsFilter";
import EmptyState from "@/components/dashboard/seller/EmptyState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Données simulées des produits
const mockProducts: ProductProps[] = [
  {
    id: "1",
    name: "Ebook: Guide de l'entrepreneur africain",
    description: "Un guide complet pour les entrepreneurs débutants en Afrique avec des conseils pratiques et des études de cas locales.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 15000,
    status: "in_stock",
    type: "digital",
    category: "Ebooks",
    sales: 87
  },
  {
    id: "2",
    name: "Modèle de business plan",
    description: "Template professionnel de business plan adapté au marché africain avec analyses financières et prévisions.",
    image: "https://images.unsplash.com/photo-1634979149798-e9a118734e93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 12000,
    salePrice: 9500,
    status: "in_stock",
    type: "digital",
    category: "Templates",
    sales: 124
  },
  {
    id: "3",
    name: "Montre artisanale en bois",
    description: "Montre élégante fabriquée à la main avec des bois africains durables et un mécanisme japonais de qualité.",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 45000,
    status: "low_stock",
    type: "physical",
    category: "Accessoires",
    sales: 38,
    stock: 3
  },
  {
    id: "4",
    name: "Cours vidéo marketing digital",
    description: "Formation complète en marketing digital spécialement conçue pour le marché africain avec études de cas locales.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 55000,
    salePrice: 39000,
    status: "in_stock",
    type: "digital",
    category: "Formations",
    sales: 72
  },
  {
    id: "5",
    name: "Sac à main en tissu wax",
    description: "Sac à main artisanal fait avec des tissus wax authentiques, parfait pour un style unique et coloré.",
    image: "https://images.unsplash.com/photo-1543682704-15adeb008ac4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 28000,
    status: "out_of_stock",
    type: "physical",
    category: "Mode",
    sales: 48,
    stock: 0
  },
  {
    id: "6",
    name: "Pack d'icônes africaines",
    description: "Collection de 200 icônes vectorielles inspirées de motifs et symboles africains pour vos projets de design.",
    image: "https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 18000,
    status: "in_stock",
    type: "digital",
    category: "Design",
    sales: 56
  }
];

export default function SellerProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");
  const [activeSort, setActiveSort] = useState("newest");
  
  const quickNavItems = [
    {
      label: "Nouveau produit",
      href: "/seller/products/new",
      description: "Ajouter un produit",
      icon: Plus
    }
  ];

  useEffect(() => {
    // Simuler un chargement depuis une API
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filtrer les produits en fonction des critères actuels
    let result = [...products];
    
    // Recherche
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filtrage par type
    if (activeType !== "all") {
      result = result.filter(product => product.type === activeType);
    }
    
    // Filtrage par statut
    if (activeStatus !== "all") {
      result = result.filter(product => product.status === activeStatus);
    }
    
    // Tri
    result = result.sort((a, b) => {
      switch (activeSort) {
        case "newest":
          return -1; // simuler le tri par date (le plus récent en premier)
        case "oldest":
          return 1; // simuler le tri par date (le plus ancien en premier)
        case "price-high":
          return (b.salePrice || b.price) - (a.salePrice || a.price);
        case "price-low":
          return (a.salePrice || a.price) - (b.salePrice || b.price);
        case "sales":
          return b.sales - a.sales;
        default:
          return 0;
      }
    });
    
    setFilteredProducts(result);
  }, [searchQuery, activeType, activeStatus, activeSort, products]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    toast.info(`Recherche: ${query || "tous les produits"}`);
  };
  
  const handleTypeChange = (type: string) => {
    setActiveType(type);
  };
  
  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
  };
  
  const handleSortChange = (sort: string) => {
    setActiveSort(sort);
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mes Produits</h1>
        <QuickNavMenu 
          title="Actions" 
          items={quickNavItems}
          variant="menu"
        />
      </div>

      <ProductsFilter 
        onSearch={handleSearch}
        onTypeChange={handleTypeChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
      />

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setActiveType("all")}>
            Tous
          </TabsTrigger>
          <TabsTrigger value="digital" onClick={() => setActiveType("digital")}>
            Produits digitaux
          </TabsTrigger>
          <TabsTrigger value="physical" onClick={() => setActiveType("physical")}>
            Produits physiques
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <ScrollArea className="h-full w-full" orientation="vertical">
        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Aucun produit trouvé"
            description={
              searchQuery
                ? "Aucun produit ne correspond à votre recherche. Essayez d'autres termes ou créez un nouveau produit."
                : "Vous n'avez pas encore de produits. Commencez par créer votre premier produit."
            }
            icon={<Package className="h-8 w-8" />}
            actionLabel="Créer un produit"
            actionLink="/seller/products/new"
          />
        )}
      </ScrollArea>
    </DashboardLayout>
  );
}
