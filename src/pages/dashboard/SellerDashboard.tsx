
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SellerStatsCards from "./seller/SellerStatsCards";
import SellerSalesOverview from "./seller/SellerSalesOverview";
import SellerBestProducts from "./seller/SellerBestProducts";
import SellerSalesDistribution from "./seller/SellerSalesDistribution";
import SellerRecentMessages from "./seller/SellerRecentMessages";
import SellerRecentOrders from "./seller/SellerRecentOrders";
import SellerProductsAndCourses from "./seller/SellerProductsAndCourses";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, LayoutDashboard, Package, BookOpen, ShoppingBag, PieChart, MessageSquare } from "lucide-react";
import QuickNavMenu from "@/components/dashboard/QuickNavMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SellerDashboard() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const quickNavItems = [
    {
      label: "Tableau de bord",
      href: "/seller",
      icon: LayoutDashboard,
      description: "Vue d'ensemble"
    },
    {
      label: "Produits",
      href: "/seller/products",
      icon: Package,
      description: "Gérer vos produits"
    },
    {
      label: "Cours",
      href: "/seller/courses",
      icon: BookOpen,
      description: "Gérer vos cours"
    },
    {
      label: "Commandes",
      href: "/seller/orders",
      icon: ShoppingBag,
      description: "Suivi des commandes"
    },
    {
      label: "Ventes",
      href: "/seller/sales",
      icon: PieChart,
      description: "Analyse des revenus"
    },
    {
      label: "Messages",
      href: "/seller/messages",
      icon: MessageSquare,
      description: "Support client"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-4 justify-between sticky top-0 bg-background z-10 py-2">
          {isMobile ? (
            <QuickNavMenu 
              title="Menu vendeur" 
              items={quickNavItems} 
              variant="drawer"
              className="mb-2 w-full"
            />
          ) : (
            <>
              <QuickNavMenu 
                title="Menu rapide" 
                items={quickNavItems}
                className="mr-2"
              />
              <div className="flex flex-wrap gap-2 items-center">
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
            </>
          )}
        </div>
        
        <ScrollArea className="h-full w-full" orientation="vertical">
          <div className="space-y-8 pb-8">
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
        </ScrollArea>
      </div>
    </DashboardLayout>
  );
}
