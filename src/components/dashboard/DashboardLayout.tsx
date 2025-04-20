
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingBag,
  GraduationCap,
  User,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";

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
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="border-b px-6 py-4">
            <h2 className="text-xl font-bold">WorldSell</h2>
          </SidebarHeader>
          <SidebarContent>
            <nav className="space-y-2 px-4 py-3">
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
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </nav>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <NavLink
              to="/dashboard/settings"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <Settings className="h-5 w-5" />
              <span>Paramètres</span>
            </NavLink>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </SidebarProvider>
  );
}
