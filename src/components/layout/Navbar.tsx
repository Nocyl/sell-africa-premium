
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Menu, X, User, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import AuthButtons from "@/components/auth/AuthButtons";

const Navbar = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Temporaire, à remplacer par un vrai état d'authentification

  const navItems = [
    { name: "Accueil", href: "/" },
    { 
      name: "Produits", 
      href: "/products",
      submenu: [
        { name: "Tous les produits", href: "/products" },
        { name: "Produits numériques", href: "/digital" },
        { name: "Produits physiques", href: "/physical" },
      ] 
    },
    { name: "Formations", href: "/courses" },
    { name: "Vendre", href: "/sell" },
  ];

  // Vérifie si un lien est actif
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle className="flex items-center">
                  <span className="text-worldsell-orange-400">World</span>
                  <span className="text-worldsell-blue-500">Sell</span>
                </SheetTitle>
                <SheetDescription>
                  La marketplace premium pour l'Afrique
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col p-4">
                {navItems.map((item) => (
                  <div key={item.name} className="py-1">
                    {item.submenu ? (
                      <div className="space-y-1">
                        <div className="font-medium text-foreground py-2">
                          {item.name}
                        </div>
                        <div className="pl-4 border-l border-border">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={cn(
                                "block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                                isActive(subItem.href) && "text-foreground font-medium"
                              )}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={cn(
                          "block py-2 font-medium text-muted-foreground hover:text-foreground transition-colors",
                          isActive(item.href) && "text-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-foreground"
          >
            <span className="text-worldsell-orange-400">World</span>
            <span className="text-worldsell-blue-500">Sell</span>
          </Link>

          <NavigationMenu className="hidden md:flex ml-6">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  {item.submenu ? (
                    <>
                      <NavigationMenuTrigger 
                        className={cn(
                          "text-sm font-medium text-muted-foreground",
                          isActive(item.href) && "text-foreground"
                        )}
                      >
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-2 p-4">
                          {item.submenu.map((subItem) => (
                            <li key={subItem.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={subItem.href}
                                  className={cn(
                                    "block select-none space-y-1 rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                    isActive(subItem.href) && "bg-accent text-accent-foreground"
                                  )}
                                >
                                  <div className="font-medium">{subItem.name}</div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium h-10 px-4 text-muted-foreground transition-colors hover:text-foreground",
                        isActive(item.href) && "text-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          {isSearchOpen && !isMobile ? (
            <div className="flex w-[200px] items-center gap-2 lg:w-[300px]">
              <input
                type="search"
                placeholder="Rechercher des produits..."
                className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Rechercher</span>
            </Button>
          )}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">Mon profil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="cursor-pointer">Mes commandes</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/wishlist" className="cursor-pointer">Liste d'envies</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setIsAuthenticated(false)}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <AuthButtons />
          )}

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Panier</span>
              <span className="absolute -top-1 -right-1 bg-worldsell-orange-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
