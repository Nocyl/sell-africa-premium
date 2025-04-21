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
import SellerDashboardMenu from "./seller/components/SellerDashboardMenu";

export default function SellerDashboard() {
  const navigate = useNavigate();
  
  

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-4 justify-between">
          
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
            <SellerDashboardMenu />
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
