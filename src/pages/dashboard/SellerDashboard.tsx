
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SellerStatsCards from "./seller/SellerStatsCards";
import SellerSalesOverview from "./seller/SellerSalesOverview";
import SellerBestProducts from "./seller/SellerBestProducts";
import SellerSalesDistribution from "./seller/SellerSalesDistribution";
import SellerRecentMessages from "./seller/SellerRecentMessages";
import SellerRecentOrders from "./seller/SellerRecentOrders";
import SellerProductsAndCourses from "./seller/SellerProductsAndCourses";
import QuickNavMenu from "@/components/dashboard/QuickNavMenu";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function SellerDashboard() {
  const navigate = useNavigate();
  
  const dashboardSections = [
    { label: "Statistiques", href: "#stats", description: "Vue d'ensemble de vos performances" },
    { label: "Ventes", href: "#sales", description: "Analyse détaillée de vos ventes" },
    { label: "Meilleurs produits", href: "#products", description: "Vos produits les plus performants" },
    { label: "Distribution des ventes", href: "#distribution", description: "Répartition de vos revenus" },
    { label: "Messages récents", href: "#messages", description: "Communications avec les clients" },
    { label: "Commandes récentes", href: "#orders", description: "Dernières commandes reçues" },
    { label: "Produits et cours", href: "#catalog", description: "Votre catalogue complet" },
  ];
  
  const quickLinks = [
    { label: "Paramètres de la boutique", href: "/seller/settings", description: "Personnalisez votre boutique" },
    { label: "Ajouter un produit", href: "/seller/products/new", description: "Créer un nouveau produit" },
    { label: "Ajouter un cours", href: "/seller/courses/new", description: "Créer un nouveau cours" },
    { label: "Voir les commandes", href: "/seller/orders", description: "Gérer toutes vos commandes" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <QuickNavMenu title="Navigation rapide" items={dashboardSections} />
            <QuickNavMenu title="Actions rapides" items={quickLinks} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => navigate("/seller/products/new")}
            >
              <Plus className="h-4 w-4" />
              Ajouter un produit
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => navigate("/seller/courses/new")}
            >
              <Plus className="h-4 w-4" />
              Ajouter un cours
            </Button>
          </div>
        </div>
        
        <div id="stats">
          <SellerStatsCards />
        </div>
        
        <div id="sales">
          <SellerSalesOverview />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div id="products">
            <SellerBestProducts />
          </div>
          <div id="distribution">
            <SellerSalesDistribution />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div id="messages">
            <SellerRecentMessages />
          </div>
          <div id="orders">
            <SellerRecentOrders />
          </div>
        </div>
        
        <div id="catalog" className="grid grid-cols-1 gap-8">
          <SellerProductsAndCourses />
        </div>
      </div>
    </DashboardLayout>
  );
}
