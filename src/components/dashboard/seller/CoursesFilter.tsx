
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

export interface CoursesFilterProps {
  onSearch: (query: string) => void;
  onStatusChange: (status: string) => void;
  onSortChange: (sort: string) => void;
}

export default function CoursesFilter({
  onSearch,
  onStatusChange,
  onSortChange,
}: CoursesFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  const handleStatusChange = (value: string) => {
    setStatus(value);
    onStatusChange(value);
  };
  
  const handleSortChange = (value: string) => {
    setSort(value);
    onSortChange(value);
  };
  
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full mb-6">
      <form onSubmit={handleSearch} className="flex-1">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un cours..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filtres
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Statut</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={status} onValueChange={handleStatusChange}>
              <DropdownMenuRadioItem value="all">Tous</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="published">Publiés</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="draft">Brouillons</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="archived">Archivés</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            
            <DropdownMenuLabel className="mt-2">Trier par</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sort} onValueChange={handleSortChange}>
              <DropdownMenuRadioItem value="newest">Plus récents</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">Plus anciens</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price-high">Prix décroissant</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price-low">Prix croissant</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="students">Nombre d'étudiants</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
