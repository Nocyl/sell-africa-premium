
import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ProductFiltersProps {
  type?: "all" | "digital" | "physical" | "course";
}

const ProductFilters = ({ type = "all" }: ProductFiltersProps) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Catégories différentes selon le type de produit
  const categories = type === "digital" 
    ? ["Templates", "Software", "E-Books", "Design", "Audio", "Photos"]
    : type === "physical"
    ? ["Vêtements", "Électronique", "Maison", "Beauté", "Sport", "Alimentation"]
    : type === "course"
    ? ["Marketing", "Programmation", "Design", "Business", "Langues", "Musique"]
    : ["Populaires", "Nouveautés", "Recommandés", "En promotion"];

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="font-semibold mb-4">Filtres</h3>
      
      <Accordion type="multiple" defaultValue={["price", "categories", "ratings"]}>
        <AccordionItem value="price">
          <AccordionTrigger>Prix</AccordionTrigger>
          <AccordionContent>
            <div className="py-4">
              <Slider 
                defaultValue={[0, 1000]} 
                max={1000} 
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{priceRange[0]} $</span>
                <span>{priceRange[1]} $</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="categories">
          <AccordionTrigger>Catégories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 py-2">
              {categories.map((category) => (
                <div 
                  key={category}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded"
                  onClick={() => toggleCategory(category)}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                    selectedCategories.includes(category) ? "bg-worldsell-blue-500 border-worldsell-blue-500" : "border-gray-300"
                  }`}>
                    {selectedCategories.includes(category) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span className="text-sm">{category}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="ratings">
          <AccordionTrigger>Évaluations</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 py-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div 
                  key={rating}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded"
                >
                  <div className="w-4 h-4 rounded border border-gray-300"></div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        className={`h-4 w-4 ${
                          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                    <span className="text-sm ml-1">{rating}+</span>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {type === "physical" && (
          <AccordionItem value="shipping">
            <AccordionTrigger>Livraison</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Livraison gratuite</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Livraison rapide</span>
                  <Switch />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
        
        {type === "digital" && (
          <AccordionItem value="format">
            <AccordionTrigger>Format</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 py-2">
                <Badge variant="outline" className="cursor-pointer">PDF</Badge>
                <Badge variant="outline" className="cursor-pointer">Video</Badge>
                <Badge variant="outline" className="cursor-pointer">Audio</Badge>
                <Badge variant="outline" className="cursor-pointer">ZIP</Badge>
                <Badge variant="outline" className="cursor-pointer">EXE</Badge>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
      
      <Separator className="my-4" />
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="w-1/2">Réinitialiser</Button>
        <Button size="sm" className="w-1/2 bg-worldsell-blue-500">Appliquer</Button>
      </div>
    </div>
  );
};

export default ProductFilters;
