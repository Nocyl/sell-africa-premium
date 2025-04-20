
import { ReactNode } from "react";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  PieChart, 
  Settings, 
  BookOpen, 
  Users, 
  MessageSquare, 
  FileText, 
  BarChart3, 
  CreditCard,
  Tag,
  Gift,
  HelpCircle
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface SidebarItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: {
    content: string;
    variant: "default" | "warning" | "danger" | "success" | "pro";
  };
  submenu?: SidebarItem[];
}

export const sellerSidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/seller",
  },
  {
    title: "Produits",
    icon: Package,
    href: "/seller/products",
    submenu: [
      {
        title: "Tous les produits",
        icon: Package,
        href: "/seller/products",
      },
      {
        title: "Ajouter un produit",
        icon: Package,
        href: "/seller/products/new",
      },
      {
        title: "Catégories",
        icon: Tag,
        href: "/seller/categories",
      }
    ]
  },
  {
    title: "Cours",
    icon: BookOpen,
    href: "/seller/courses",
    submenu: [
      {
        title: "Tous les cours",
        icon: BookOpen,
        href: "/seller/courses",
      },
      {
        title: "Ajouter un cours",
        icon: BookOpen,
        href: "/seller/courses/new",
      },
      {
        title: "Quiz & Évaluations",
        icon: FileText,
        href: "/seller/quizzes",
        badge: {
          content: "Pro",
          variant: "pro"
        }
      }
    ]
  },
  {
    title: "Commandes",
    icon: ShoppingBag,
    href: "/seller/orders",
  },
  {
    title: "Clients",
    icon: Users,
    href: "/seller/customers",
    badge: {
      content: "Pro",
      variant: "pro"
    }
  },
  {
    title: "Ventes & Revenus",
    icon: PieChart,
    href: "/seller/sales",
  },
  {
    title: "Marketing",
    icon: BarChart3,
    href: "/seller/marketing",
    badge: {
      content: "Pro",
      variant: "pro"
    },
    submenu: [
      {
        title: "Promotions",
        icon: Tag,
        href: "/seller/promotions",
      },
      {
        title: "Codes promo",
        icon: Gift,
        href: "/seller/coupons",
      },
      {
        title: "Intégration WhatsApp",
        icon: MessageSquare,
        href: "/seller/whatsapp",
        badge: {
          content: "Pro",
          variant: "pro"
        }
      }
    ]
  },
  {
    title: "Paiements",
    icon: CreditCard,
    href: "/seller/payments",
  },
  {
    title: "Rapports",
    icon: FileText,
    href: "/seller/reports",
    badge: {
      content: "Pro",
      variant: "pro"
    }
  },
  {
    title: "Messages",
    icon: MessageSquare,
    href: "/seller/messages",
    badge: {
      content: "3",
      variant: "danger"
    }
  },
  {
    title: "Aide & Support",
    icon: HelpCircle,
    href: "/seller/support",
  },
  {
    title: "Paramètres",
    icon: Settings,
    href: "/seller/settings",
  }
];

interface SellerMenuProps {
  collapsed?: boolean;
}

export const SellerSidebarMenu = ({ collapsed = false }: SellerMenuProps) => {
  const renderSubMenu = (items: SidebarItem[]) => {
    return (
      <div className="ml-4 mt-1 space-y-1 border-l pl-3">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {!collapsed && <span>{item.title}</span>}
            {!collapsed && item.badge && (
              <span className={cn(
                "ml-auto rounded-full px-1.5 py-0.5 text-xs font-medium",
                item.badge.variant === "default" && "bg-primary/10 text-primary",
                item.badge.variant === "warning" && "bg-yellow-100 text-yellow-800",
                item.badge.variant === "danger" && "bg-red-100 text-red-800",
                item.badge.variant === "success" && "bg-green-100 text-green-800",
                item.badge.variant === "pro" && "bg-purple-100 text-purple-800",
              )}>
                {item.badge.content}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {sellerSidebarItems.map((item) => (
        <div key={item.href}>
          <NavLink
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 rounded-md px-3 py-2 transition-colors",
                isActive && !item.submenu
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {!collapsed && <span>{item.title}</span>}
            {!collapsed && item.badge && (
              <span className={cn(
                "ml-auto rounded-full px-1.5 py-0.5 text-xs font-medium",
                item.badge.variant === "default" && "bg-primary/10 text-primary",
                item.badge.variant === "warning" && "bg-yellow-100 text-yellow-800",
                item.badge.variant === "danger" && "bg-red-100 text-red-800",
                item.badge.variant === "success" && "bg-green-100 text-green-800",
                item.badge.variant === "pro" && "bg-purple-100 text-purple-800",
              )}>
                {item.badge.content}
              </span>
            )}
          </NavLink>
          {!collapsed && item.submenu && renderSubMenu(item.submenu)}
        </div>
      ))}
    </div>
  );
};
