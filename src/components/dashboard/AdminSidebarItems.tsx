
import { ReactNode } from "react";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Package, 
  Settings, 
  BarChart3, 
  CreditCard,
  FileText,
  Bell,
  MessageSquare,
  BookOpen,
  Lock,
  HelpCircle,
  Mail
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface SidebarItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: {
    content: string;
    variant: "default" | "warning" | "danger";
  };
  submenu?: SidebarItem[];
}

export const adminSidebarItems: SidebarItem[] = [
  {
    title: "Tableau de bord",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Utilisateurs",
    icon: Users,
    href: "/admin/users",
    badge: {
      content: "New",
      variant: "warning"
    },
    submenu: [
      {
        title: "Tous les utilisateurs",
        icon: Users,
        href: "/admin/users",
      },
      {
        title: "Vendeurs",
        icon: Users,
        href: "/admin/sellers",
      },
      {
        title: "Roles & Permissions",
        icon: Lock,
        href: "/admin/roles",
      }
    ]
  },
  {
    title: "Produits",
    icon: Package,
    href: "/admin/products",
    submenu: [
      {
        title: "Tous les produits",
        icon: Package,
        href: "/admin/products",
      },
      {
        title: "Catégories",
        icon: Package,
        href: "/admin/categories",
      },
      {
        title: "Évaluations",
        icon: Package,
        href: "/admin/reviews",
      }
    ]
  },
  {
    title: "Commandes",
    icon: ShoppingCart,
    href: "/admin/orders",
    badge: {
      content: "8",
      variant: "danger"
    }
  },
  {
    title: "Cours",
    icon: BookOpen,
    href: "/admin/courses",
    submenu: [
      {
        title: "Tous les cours",
        icon: BookOpen,
        href: "/admin/courses",
      },
      {
        title: "Catégories",
        icon: BookOpen,
        href: "/admin/course-categories",
      },
      {
        title: "Évaluations",
        icon: BookOpen,
        href: "/admin/course-reviews",
      }
    ]
  },
  {
    title: "Paiements",
    icon: CreditCard,
    href: "/admin/payments",
  },
  {
    title: "Marketing",
    icon: BarChart3,
    href: "/admin/marketing",
    submenu: [
      {
        title: "Promotions",
        icon: BarChart3,
        href: "/admin/promotions",
      },
      {
        title: "Codes promo",
        icon: BarChart3,
        href: "/admin/coupons",
      },
      {
        title: "Campagnes email",
        icon: Mail,
        href: "/admin/email-campaigns",
      }
    ]
  },
  {
    title: "Rapports",
    icon: FileText,
    href: "/admin/reports",
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/admin/notifications",
    badge: {
      content: "12",
      variant: "danger"
    }
  },
  {
    title: "Messages",
    icon: MessageSquare,
    href: "/admin/messages",
    badge: {
      content: "5",
      variant: "warning"
    }
  },
  {
    title: "Aide & Support",
    icon: HelpCircle,
    href: "/admin/support",
  },
  {
    title: "Paramètres",
    icon: Settings,
    href: "/admin/settings",
  }
];

interface AdminMenuProps {
  collapsed?: boolean;
}

export const AdminSidebarMenu = ({ collapsed = false }: AdminMenuProps) => {
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
      {adminSidebarItems.map((item) => (
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
