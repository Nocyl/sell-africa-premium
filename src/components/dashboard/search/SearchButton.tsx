
import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useSearch } from "@/contexts/SearchContext";
import { useHotkeys } from "@/hooks/use-hotkeys";

export default function SearchButton() {
  const { setIsSearchOpen } = useSearch();
  
  // Add keyboard shortcut (Cmd+K or Ctrl+K)
  useHotkeys("mod+k", (e) => {
    e.preventDefault();
    setIsSearchOpen(true);
  });
  
  return (
    <Button
      variant="outline"
      size="sm"
      className="relative h-9 w-full justify-start text-sm text-muted-foreground md:w-40 lg:w-64"
      onClick={() => setIsSearchOpen(true)}
    >
      <Search className="h-3.5 w-3.5 mr-2" />
      <span className="hidden md:inline-flex">Rechercher...</span>
      <kbd className="pointer-events-none absolute right-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium md:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
}
