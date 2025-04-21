
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  description?: string;
}

interface QuickNavMenuProps {
  title: string;
  items: NavItem[];
}

export default function QuickNavMenu({ title, items }: QuickNavMenuProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menubar className="border-none bg-transparent p-0">
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
              className="flex cursor-pointer flex-col items-start py-2"
              onClick={() => navigate(item.href)}
            >
              <span className="font-medium">{item.label}</span>
              {item.description && (
                <span className="text-xs text-muted-foreground">{item.description}</span>
              )}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
