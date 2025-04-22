
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QuickNavMenu from "@/components/dashboard/QuickNavMenu";
import { CourseCard, CourseCardSkeleton, CourseProps } from "@/components/dashboard/seller/CourseCard";
import CoursesFilter from "@/components/dashboard/seller/CoursesFilter";
import EmptyState from "@/components/dashboard/seller/EmptyState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Données simulées des cours
const mockCourses: CourseProps[] = [
  {
    id: "1",
    title: "Introduction au marketing digital",
    description: "Apprenez les bases du marketing digital et comment créer une stratégie efficace pour votre entreprise.",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 49000,
    status: "published",
    students: 124,
    lessons: 8,
    duration: "4h 30min",
    category: "Marketing"
  },
  {
    id: "2",
    title: "Développement web avec React",
    description: "Maîtrisez React.js et créez des applications web modernes et réactives avec les dernières technologies.",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 79000,
    status: "published",
    students: 89,
    lessons: 12,
    duration: "8h 15min",
    category: "Développement"
  },
  {
    id: "3",
    title: "Photographie pour débutants",
    description: "Découvrez les techniques de base de la photographie et améliorez rapidement vos compétences.",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 35000,
    status: "draft",
    students: 0,
    lessons: 6,
    duration: "3h 45min",
    category: "Photographie"
  },
  {
    id: "4",
    title: "Intelligence artificielle fondamentale",
    description: "Comprendre les bases de l'IA et comment l'appliquer dans vos projets professionnels.",
    thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 89000,
    status: "published",
    students: 56,
    lessons: 10,
    duration: "7h 20min",
    category: "Technologie"
  },
  {
    id: "5",
    title: "Design d'interface utilisateur",
    description: "Apprenez à créer des interfaces utilisateur attrayantes et fonctionnelles pour vos applications.",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 65000,
    status: "draft",
    students: 0,
    lessons: 8,
    duration: "5h 10min",
    category: "Design"
  }
];

export default function SellerCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");
  const [activeSort, setActiveSort] = useState("newest");
  
  const quickNavItems = [
    {
      label: "Nouveau cours",
      href: "/seller/courses/new",
      description: "Ajouter un cours",
      icon: Plus
    }
  ];

  useEffect(() => {
    // Simuler un chargement depuis une API
    const timer = setTimeout(() => {
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filtrer les cours en fonction des critères actuels
    let result = [...courses];
    
    // Recherche
    if (searchQuery) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filtrage par statut
    if (activeStatus !== "all") {
      result = result.filter(course => course.status === activeStatus);
    }
    
    // Tri
    result = result.sort((a, b) => {
      switch (activeSort) {
        case "newest":
          return -1; // simuler le tri par date (le plus récent en premier)
        case "oldest":
          return 1; // simuler le tri par date (le plus ancien en premier)
        case "price-high":
          return b.price - a.price;
        case "price-low":
          return a.price - b.price;
        case "students":
          return b.students - a.students;
        default:
          return 0;
      }
    });
    
    setFilteredCourses(result);
  }, [searchQuery, activeStatus, activeSort, courses]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    toast.info(`Recherche: ${query || "tous les cours"}`);
  };
  
  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
  };
  
  const handleSortChange = (sort: string) => {
    setActiveSort(sort);
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mes Cours</h1>
        <QuickNavMenu 
          title="Actions" 
          items={quickNavItems}
          variant="menu"
        />
      </div>

      <CoursesFilter 
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
      />

      <ScrollArea className="h-full w-full" orientation="vertical">
        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <CourseCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Aucun cours trouvé"
            description={
              searchQuery
                ? "Aucun cours ne correspond à votre recherche. Essayez d'autres termes ou créez un nouveau cours."
                : "Vous n'avez pas encore de cours. Commencez par créer votre premier cours."
            }
            icon={<BookOpen className="h-8 w-8" />}
            actionLabel="Créer un cours"
            actionLink="/seller/courses/new"
          />
        )}
      </ScrollArea>
    </DashboardLayout>
  );
}
