
import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface QuickNavMenuProps {
  title: string;
  items: NavItem[];
  variant?: "menu" | "drawer";
  className?: string;
}

export default function QuickNavMenu({ 
  title, 
  items, 
  variant = "menu", 
  className
}: QuickNavMenuProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Utiliser le drawer sur mobile ou si explicitement demandé
  const useDrawer = isMobile || variant === "drawer";

  if (useDrawer) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className={cn("flex items-center gap-1 font-medium", className)}
          >
            <Menu className="h-4 w-4 mr-1" />
            {title}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto p-4">
            {items.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="w-full justify-start gap-3 text-base font-normal mb-2"
                onClick={() => navigate(item.href)}
              >
                {item.icon && <item.icon className="h-5 w-5" />}
                <div className="flex flex-col items-start">
                  <span className="font-medium">{item.label}</span>
                  {item.description && (
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Menubar className={cn("border-none bg-transparent p-0", className)}>
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1 font-medium"
            onClick={() => setIsOpen(!isOpen)}
          >
            {title}
            <ChevronDown className="h-4 w-4 opacity-70" />
          </Button>
        </MenubarTrigger>
        <MenubarContent 
          className="min-w-[240px] bg-background" 
          align="start"
        >
          {items.map((item) => (
            <MenubarItem 
              key={item.href}
              className="flex cursor-pointer gap-2 flex-col items-start py-2"
              onClick={() => navigate(item.href)}
            >
              <div className="flex items-center gap-2 w-full">
                {item.icon && <item.icon className="h-4 w-4" />}
                <span className="font-medium">{item.label}</span>
              </div>
              {item.description && (
                <span className="text-xs text-muted-foreground pl-6">{item.description}</span>
              )}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

// Importer cn pour className
import { cn } from "@/lib/utils";
