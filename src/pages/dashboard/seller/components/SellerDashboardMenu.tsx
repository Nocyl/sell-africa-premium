
import { 
  Menu, 
  BarChart3, 
  LayoutDashboard,
  Package,
  Book,
  ShoppingCart,
  PieChart,
  MessageSquare,
  Users,
  Settings,
  HelpCircle,
  Plus,
  Tag
} from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";

const links = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/seller",
    scrollTo: "stats"
  },
  {
    label: "Statistiques",
    icon: BarChart3,
    href: "/seller#stats",
    scrollTo: "stats",
  },
  {
    label: "Ventes",
    icon: PieChart,
    href: "/seller#sales",
    scrollTo: "sales",
  },
  {
    label: "Meilleurs produits",
    icon: Package,
    href: "/seller#products",
    scrollTo: "products",
  },
  {
    label: "Distribution ventes",
    icon: PieChart,
    href: "/seller#distribution",
    scrollTo: "distribution",
  },
  {
    label: "Messages récents",
    icon: MessageSquare,
    href: "/seller#messages",
    scrollTo: "messages",
  },
  {
    label: "Commandes récentes",
    icon: ShoppingCart,
    href: "/seller#orders",
    scrollTo: "orders",
  },
  {
    label: "Catalogue (Produits et cours)",
    icon: Book,
    href: "/seller#catalog",
    scrollTo: "catalog",
  },
  { // liens directs
    label: "Ajouter un produit",
    icon: Plus,
    href: "/seller/products/new"
  },
  {
    label: "Ajouter un cours",
    icon: Plus,
    href: "/seller/courses/new"
  },
  {
    label: "Paramètres de la boutique",
    icon: Settings,
    href: "/seller/settings"
  },
];

export default function SellerDashboardMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (link: typeof links[0]) => {
    setOpen(false);
    if (link.href.startsWith("/seller#") && link.scrollTo) {
      // On la page seller, scrollInPage
      const dom = document.getElementById(link.scrollTo);
      if (dom) {
        dom.scrollIntoView({ behavior: "smooth" });
      } else {
        // fallback: navigate with anchor
        navigate(link.href);
      }
    } else {
      navigate(link.href);
    }
  }

  return (
    <>
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => setOpen(true)}
        className={clsx(
          "md:hidden", // bouton menu affiché sur mobile seulement
        )}
        aria-label="Ouvrir le menu du tableau de bord"
      >
        <Menu className="h-6 w-6" />
      </Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              <div className="flex items-center text-lg font-bold gap-2">
                <Menu className="h-6 w-6" /> Menu rapide
              </div>
            </DrawerTitle>
          </DrawerHeader>
          <nav className="flex flex-col gap-2 p-4">
            {links.map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                className="w-full justify-start gap-3 text-base font-normal"
                onClick={() => handleClick(link)}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Button>
            ))}
          </nav>
        </DrawerContent>
      </Drawer>
    </>
  );
}
