
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

const CourseFilters = () => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [durationRange, setDurationRange] = useState([0, 50]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const categories = [
    "Marketing Digital", 
    "Développement Web", 
    "Design Graphique", 
    "Finance", 
    "Entrepreneuriat", 
    "Langues"
  ];
  
  const levels = ["Débutant", "Intermédiaire", "Avancé", "Tous niveaux"];

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleLevel = (level: string) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter(l => l !== level));
    } else {
      setSelectedLevels([...selectedLevels, level]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="font-semibold mb-4">Filtres</h3>
      
      <Accordion type="multiple" defaultValue={["price", "duration", "categories", "levels"]}>
        <AccordionItem value="price">
          <AccordionTrigger>Prix</AccordionTrigger>
          <AccordionContent>
            <div className="py-4">
              <Slider 
                defaultValue={[0, 500]} 
                max={500} 
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>Gratuit</span>
                <span>{priceRange[1]} $</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="duration">
          <AccordionTrigger>Durée</AccordionTrigger>
          <AccordionContent>
            <div className="py-4">
              <Slider 
                defaultValue={[0, 50]} 
                max={50} 
                step={1}
                value={durationRange}
                onValueChange={setDurationRange}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>0h</span>
                <span>{durationRange[1]}h+</span>
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
                    selectedCategories.includes(category) ? "bg-worldsell-orange-400 border-worldsell-orange-400" : "border-gray-300"
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
        
        <AccordionItem value="levels">
          <AccordionTrigger>Niveau</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 py-2">
              {levels.map((level) => (
                <div 
                  key={level}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded"
                  onClick={() => toggleLevel(level)}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                    selectedLevels.includes(level) ? "bg-worldsell-orange-400 border-worldsell-orange-400" : "border-gray-300"
                  }`}>
                    {selectedLevels.includes(level) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span className="text-sm">{level}</span>
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
      </Accordion>
      
      <Separator className="my-4" />
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="w-1/2">Réinitialiser</Button>
        <Button size="sm" className="w-1/2 bg-worldsell-orange-400">Appliquer</Button>
      </div>
    </div>
  );
};

export default CourseFilters;
