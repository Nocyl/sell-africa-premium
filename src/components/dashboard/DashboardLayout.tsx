
import { ReactNode, useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
  Bell,
  MessageSquare,
  Search,
  ChevronDown
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: ReactNode;
}

const commonMenuItems = [
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
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, content: "Nouvelle commande reçue", time: "Il y a 15 min", read: false },
    { id: 2, content: "Mise à jour de la plateforme", time: "Il y a 1 heure", read: false },
    { id: 3, content: "Votre cours a été approuvé", time: "Il y a 2 heures", read: true },
  ]);
  const [messages, setMessages] = useState([
    { id: 1, from: "Support", content: "Besoin d'aide?", time: "Il y a 20 min", read: false },
    { id: 2, from: "Client", content: "Question sur le produit", time: "Il y a 3 heures", read: true },
  ]);
  
  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Recherche en cours: ${searchQuery}`);
      // Ici on pourrait implémenter une vraie recherche
      setSearchQuery("");
    }
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("Toutes les notifications ont été marquées comme lues");
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  const unreadMessagesCount = messages.filter(m => !m.read).length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r bg-white z-30">
          <SidebarHeader className="border-b px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">WorldSell</h2>
              <Badge variant="outline" className="text-xs font-normal">Pro</Badge>
            </div>
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
            "md:flex flex-col",
            mobileOpen ? "flex" : "hidden"
          )}>
            <div className="px-4 pt-4 pb-2">
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
              
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
              
              <div className="space-y-1 mb-6">
                <h4 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Navigation
                </h4>
                {commonMenuItems.map((item) => (
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
              </div>
              
              <div className="space-y-1">
                <h4 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Paramètres
                </h4>
                <NavLink
                  to="/dashboard/settings"
                  className={({ isActive }) =>
                    cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100"
                    )
                  }
                >
                  <Settings className="h-5 w-5" />
                  <span>Paramètres</span>
                </NavLink>
              </div>
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
                  <ChevronDown className="h-4 w-4 ml-auto" />
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
            
            <Button 
              variant="destructive" 
              className="justify-start"
              onClick={() => {
                toast.success("Vous avez été déconnecté avec succès");
                navigate("/");
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <header className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <TooltipProvider>
                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                          <Bell className="h-5 w-5" />
                          {unreadNotificationsCount > 0 && (
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Notifications</p>
                    </TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent align="end" className="w-[300px]">
                    <div className="flex items-center justify-between p-2">
                      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                      {unreadNotificationsCount > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={markAllNotificationsAsRead}
                          className="text-xs h-7"
                        >
                          Tout marquer comme lu
                        </Button>
                      )}
                    </div>
                    <DropdownMenuSeparator />
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <DropdownMenuItem key={notification.id} className={cn(
                          "flex flex-col items-start p-3 cursor-default",
                          !notification.read && "bg-muted/50"
                        )}>
                          <div className="text-sm font-medium">{notification.content}</div>
                          <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="p-3 text-center text-sm text-muted-foreground">
                        Aucune notification
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipProvider>
              
              <TooltipProvider>
                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                          <MessageSquare className="h-5 w-5" />
                          {unreadMessagesCount > 0 && (
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Messages</p>
                    </TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent align="end" className="w-[300px]">
                    <DropdownMenuLabel>Messages</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {messages.length > 0 ? (
                      messages.map(message => (
                        <DropdownMenuItem key={message.id} className={cn(
                          "flex flex-col items-start p-3 cursor-default",
                          !message.read && "bg-muted/50"
                        )}>
                          <div className="text-sm font-medium">{message.from}</div>
                          <div className="text-sm">{message.content}</div>
                          <div className="text-xs text-muted-foreground mt-1">{message.time}</div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="p-3 text-center text-sm text-muted-foreground">
                        Aucun message
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipProvider>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas" />
                      <AvatarFallback>TD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                    <User className="h-4 w-4 mr-2" />
                    Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => {
                      toast.success("Vous avez été déconnecté avec succès");
                      navigate("/");
                    }}
                    className="text-red-500 focus:text-red-500"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
