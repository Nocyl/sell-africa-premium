
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Users, Clock, Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export interface CourseProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  status: "draft" | "published" | "archived";
  students: number;
  lessons: number;
  duration: string;
  category: string;
}

export function CourseCard({ course }: { course: CourseProps }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const statusColors = {
    draft: "bg-amber-100 text-amber-800 hover:bg-amber-200",
    published: "bg-green-100 text-green-800 hover:bg-green-200",
    archived: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  };
  
  const handleDelete = () => {
    setIsLoading(true);
    // Simuler une suppression
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Cours supprimé avec succès");
    }, 1000);
  };
  
  const handleEdit = () => {
    navigate(`/seller/courses/edit/${course.id}`);
  };
  
  const handleView = () => {
    navigate(`/course/${course.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
        <Badge 
          className={`absolute top-2 right-2 ${statusColors[course.status]}`}
        >
          {course.status === "draft" ? "Brouillon" : 
           course.status === "published" ? "Publié" : "Archivé"}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg leading-tight">{course.title}</h3>
        <p className="text-xl font-bold text-primary">{formatPrice(course.price)}</p>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {course.description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{course.students} étudiants</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{course.lessons} leçons</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="font-normal">
              {course.category}
            </Badge>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 mr-2"
          onClick={handleView}
        >
          <Eye className="h-4 w-4 mr-1" />
          Aperçu
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="sm" className="flex-1">
              <Edit className="h-4 w-4 mr-1" />
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 focus:text-red-600" 
              onClick={handleDelete}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isLoading ? "Suppression..." : "Supprimer"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}

export function CourseCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="h-48">
        <Skeleton className="h-full w-full" />
      </div>
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-4/5 mb-2" />
        <Skeleton className="h-7 w-1/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}
