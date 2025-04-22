
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QuickNavMenu from "@/components/dashboard/QuickNavMenu";

export default function SellerProducts() {
  const navigate = useNavigate();
  
  const quickNavItems = [
    {
      label: "Nouveau produit",
      href: "/seller/products/new",
      description: "Ajouter un produit",
      icon: Plus
    }
  ];

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

      <ScrollArea className="h-full w-full" orientation="vertical">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          // ... Intégrer ici la grille de produits
        </div>
      </ScrollArea>
    </DashboardLayout>
  );
}
