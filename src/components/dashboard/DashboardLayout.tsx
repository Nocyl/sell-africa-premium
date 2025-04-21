import { useState } from "react";
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

// Simulation des composants UI
const Avatar = ({ children, className }) => (
  <div className={`relative inline-block overflow-hidden rounded-full bg-gray-200 ${className || ""}`}>
    {children}
  </div>
);

const AvatarImage = ({ src, alt = "" }) => (
  <img src={src} alt={alt} className="h-full w-full object-cover" />
);

const AvatarFallback = ({ children }) => (
  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500 font-medium">
    {children}
  </div>
);

const Badge = ({ children, variant, className }) => {
  const variantClasses = {
    destructive: "bg-red-100 text-red-600",
    outline: "border border-gray-200 bg-transparent",
    secondary: "bg-gray-100 text-gray-600",
    default: "bg-primary text-primary-foreground"
  };
  
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${variantClasses[variant] || variantClasses.default} ${className || ""}`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = "default", size, className = "", onClick, ...props }) => {
  const variantClasses = {
    default: "bg-gray-900 text-white hover:bg-gray-800",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-200 bg-white hover:bg-gray-50",
    ghost: "hover:bg-gray-100",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200"
  };
  
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 text-sm",
    icon: "h-10 w-10"
  };
  
  return (
    <button 
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size] || sizeClasses.default} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className, ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
    {...props}
  />
);

// Styles utilitaires
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Composant principal
function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDashboard, setActiveDashboard] = useState("user"); // user, seller, admin
  const [activeMenuItem, setActiveMenuItem] = useState("/dashboard");
  const [dropdownOpen, setDropdownOpen] = useState({
    notifications: false,
    messages: false,
    userMenu: false,
    roleMenu: false
  });
  
  // Les données pour la démo
  const notifications = [
    { id: 1, content: "Nouvelle commande reçue", time: "Il y a 15 min", read: false },
    { id: 2, content: "Mise à jour de la plateforme", time: "Il y a 1 heure", read: false },
    { id: 3, content: "Votre cours a été approuvé", time: "Il y a 2 heures", read: true }
  ];
  
  const messages = [
    { id: 1, from: "Support", content: "Besoin d'aide?", time: "Il y a 20 min", read: false },
    { id: 2, from: "Client", content: "Question sur le produit", time: "Il y a 3 heures", read: true }
  ];
  
  const userMenuItems = [
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
    {
      title: "Paramètres",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];
  
  // Simulation navigation
  const navigate = (path) => {
    setActiveMenuItem(path);
    // Déterminer le type de dashboard basé sur le chemin
    if (path.startsWith("/admin")) {
      setActiveDashboard("admin");
    } else if (path.startsWith("/seller")) {
      setActiveDashboard("seller");
    } else {
      setActiveDashboard("user");
    }
    // Fermer tous les menus déroulants
    setDropdownOpen({
      notifications: false,
      messages: false,
      userMenu: false,
      roleMenu: false
    });
    setMobileOpen(false);
  };

  const isAdminDashboard = activeDashboard === "admin";
  const isSellerDashboard = activeDashboard === "seller";
  const isUserDashboard = activeDashboard === "user";
  
  const toggleDropdown = (menu) => {
    setDropdownOpen(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };
  
  const markAllNotificationsAsRead = () => {
    // Simplement pour la démo
    console.log("Marquer toutes les notifications comme lues");
  };
  
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  const unreadMessagesCount = messages.filter(m => !m.read).length;
  
  const getDashboardTitle = () => {
    if (isAdminDashboard) {
      return "Administration";
    } else if (isSellerDashboard) {
      return "Tableau de bord vendeur";
    } else {
      return "Mon espace";
    }
  };

  const getDashboardDescription = () => {
    if (isAdminDashboard) {
      return "Tableau de bord administrateur WorldSell";
    } else if (isSellerDashboard) {
      return "Gérez vos produits, cours et ventes";
    } else {
      return "Votre espace personnel WorldSell";
    }
  };

  const renderDashboardMenu = () => {
    return (
      <div className="space-y-1">
        {userMenuItems.map((item) => (
          <div
            key={item.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors cursor-pointer",
              activeMenuItem === item.href
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-100"
            )}
            onClick={() => navigate(item.href)}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50 overflow-hidden border border-gray-200 rounded-lg shadow-sm">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`${mobileOpen ? "block" : "hidden"} md:block border-r bg-white z-30 w-64 flex-shrink-0`}>
          {/* Sidebar Header */}
          <div className="border-b px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">WorldSell</h2>
              {isAdminDashboard && (
                <Badge variant="destructive" className="text-xs font-normal">Admin</Badge>
              )}
              {isSellerDashboard && (
                <Badge variant="outline" className="text-xs font-normal">Pro</Badge>
              )}
              {isUserDashboard && (
                <Badge variant="secondary" className="text-xs font-normal">Client</Badge>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          
          {/* Sidebar Content */}
          <div className="flex flex-col">
            <div className="px-4 pt-4 pb-2">
              <div className="flex items-center gap-3 p-2 mb-6">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas" alt="Thomas Dubois" />
                  <AvatarFallback>TD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Thomas Dubois</h3>
                  <p className="text-xs text-gray-500">thomas.dubois@example.com</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-8"
                  />
                </div>
              </div>
              
              {renderDashboardMenu()}
            </div>
          </div>
          
          {/* Sidebar Footer */}
          <div className="border-t p-4 flex flex-col gap-2">
            <div className="relative">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => toggleDropdown("roleMenu")}
              >
                <Shield className="h-4 w-4" />
                Changer de rôle
                <ChevronDown className="h-4 w-4 ml-auto" />
              </Button>
              
              {dropdownOpen.roleMenu && (
                <div className="absolute bottom-full mb-1 right-0 z-50 min-w-[200px] rounded-md border bg-white p-1 shadow-md">
                  <div className="p-2 text-sm font-medium">Tableaux de bord</div>
                  <div className="h-px bg-gray-200 my-1"></div>
                  <div 
                    className="flex items-center p-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/dashboard")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Utilisateur
                  </div>
                  <div 
                    className="flex items-center p-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/seller")}
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    Vendeur
                  </div>
                  <div 
                    className="flex items-center p-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/admin")}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Administrateur
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              variant="destructive" 
              className="justify-start"
              onClick={() => navigate("/")}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          {/* Header */}
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
              {/* Notifications */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative"
                  onClick={() => toggleDropdown("notifications")}
                >
                  <Bell className="h-5 w-5" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </Button>
                
                {dropdownOpen.notifications && (
                  <div className="absolute top-full mt-1 right-0 z-50 min-w-[300px] rounded-md border bg-white shadow-md">
                    <div className="flex items-center justify-between p-2">
                      <div className="font-medium">Notifications</div>
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
                    <div className="h-px bg-gray-200"></div>
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={cn(
                          "flex flex-col items-start p-3 cursor-default",
                          !notification.read && "bg-gray-50"
                        )}
                      >
                        <div className="text-sm font-medium">{notification.content}</div>
                        <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Messages */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative"
                  onClick={() => toggleDropdown("messages")}
                >
                  <MessageSquare className="h-5 w-5" />
                  {unreadMessagesCount > 0 && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </Button>
                
                {dropdownOpen.messages && (
                  <div className="absolute top-full mt-1 right-0 z-50 min-w-[300px] rounded-md border bg-white shadow-md">
                    <div className="p-2 font-medium">
                      Messages
                    </div>
                    <div className="h-px bg-gray-200"></div>
                    {messages.map(message => (
                      <div 
                        key={message.id} 
                        className={cn(
                          "flex flex-col items-start p-3 cursor-default",
                          !message.read && "bg-gray-50"
                        )}
                      >
                        <div className="text-sm font-medium">{message.from}</div>
                        <div className="text-sm">{message.content}</div>
                        <div className="text-xs text-gray-500 mt-1">{message.time}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* User Menu */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative rounded-full"
                  onClick={() => toggleDropdown("userMenu")}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas" alt="Thomas Dubois" />
                    <AvatarFallback>TD</AvatarFallback>
                  </Avatar>
                </Button>
                
                {dropdownOpen.userMenu && (
                  <div className="absolute top-full mt-1 right-0 z-50 min-w-[200px] rounded-md border bg-white shadow-md">
                    <div className="p-2 font-medium">Mon compte</div>
                    <div className="h-px bg-gray-200"></div>
                    <div 
                      className="flex items-center p-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate("/dashboard/profile")}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profil
                    </div>
                    <div 
                      className="flex items-center p-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate(`/${activeDashboard}/settings`)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Paramètres
                    </div>
                    <div className="h-px bg-gray-200"></div>
                    <div 
                      className="flex items-center p-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer text-red-500"
                      onClick={() => navigate("/")}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Déconnexion
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 p-4 md:p-8 overflow-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">{getDashboardTitle()}</h1>
              <p className="text-gray-500">
                {getDashboardDescription()}
              </p>
            </div>
            
            {/* Placeholder content */}
            
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
