
import { ReactNode, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingBag,
  GraduationCap,
  User,
  Settings,
  Building2,
  Shield,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Mes commandes",
    icon: ShoppingBag,
    href: "/dashboard/orders",
  },
  {
    title: "Mes cours",
    icon: GraduationCap,
    href: "/dashboard/courses",
  },
  {
    title: "Mon profil",
    icon: User,
    href: "/dashboard/profile",
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="border-b px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">WorldSell</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SidebarHeader>
          <SidebarContent className={cn(
            "md:flex",
            mobileOpen ? "flex" : "hidden"
          )}>
            <div className="p-4">
              <div className="flex items-center gap-3 p-2 mb-6">
                <Avatar>
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas" />
                  <AvatarFallback>TD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Thomas Dubois</h3>
                  <p className="text-xs text-muted-foreground">thomas.dubois@example.com</p>
                </div>
              </div>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-gray-100"
                      )
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </SidebarContent>
          <SidebarFooter className={cn(
            "border-t p-4 md:flex flex-col gap-2",
            mobileOpen ? "flex" : "hidden"
          )}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Shield className="h-4 w-4" />
                  Changer de rôle
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Tableaux de bord</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <User className="h-4 w-4 mr-2" />
                  Utilisateur
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/seller")}>
                  <Building2 className="h-4 w-4 mr-2" />
                  Vendeur
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/admin")}>
                  <Shield className="h-4 w-4 mr-2" />
                  Administrateur
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink
              to="/dashboard/settings"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileOpen(false)}
            >
              <Settings className="h-5 w-5" />
              <span>Paramètres</span>
            </NavLink>
            
            <Button 
              variant="ghost" 
              className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => navigate("/")}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Déconnexion
            </Button>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </SidebarProvider>
  );
}
