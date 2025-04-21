
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SellerStatsCards from "./seller/SellerStatsCards";
import SellerSalesOverview from "./seller/SellerSalesOverview";
import SellerBestProducts from "./seller/SellerBestProducts";
import SellerSalesDistribution from "./seller/SellerSalesDistribution";
import SellerRecentMessages from "./seller/SellerRecentMessages";
import SellerRecentOrders from "./seller/SellerRecentOrders";
import SellerProductsAndCourses from "./seller/SellerProductsAndCourses";

export default function SellerDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="hidden md:block"></div>
          <div className="flex flex-wrap gap-2">
            {/* Les boutons pour ajouter produit/cours sont dans SellerProductsAndCourses */}
          </div>
        </div>
        <SellerStatsCards />
        <SellerSalesOverview />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SellerBestProducts />
          <SellerSalesDistribution />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SellerRecentMessages />
          <SellerRecentOrders />
        </div>
        <div className="grid grid-cols-1 gap-8">
          <SellerProductsAndCourses />
        </div>
      </div>
    </DashboardLayout>
  );
}
