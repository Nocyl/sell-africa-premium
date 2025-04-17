
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, Clock, UserRound, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CourseGrid = () => {
  // Données fictives des cours
  const courses = [
    {
      id: 1,
      title: "Marketing Digital Complet",
      price: 129.99,
      currency: "USD",
      rating: 4.8,
      reviews: 245,
      students: 1250,
      image: "bg-worldsell-blue-100",
      instructor: "Dr. Aminata Diallo",
      duration: "42h",
      level: "Tous niveaux",
      lessons: 84,
      featured: true,
    },
    {
      id: 2,
      title: "Développement Web avec React & Node.js",
      price: 149.99,
      currency: "USD",
      rating: 4.9,
      reviews: 189,
      students: 890,
      image: "bg-worldsell-orange-100",
      instructor: "Emmanuel Osei",
      duration: "38h",
      level: "Intermédiaire",
      lessons: 72,
      featured: true,
    },
    {
      id: 3,
      title: "Design Graphique pour Entrepreneurs",
      price: 89.99,
      currency: "USD",
      rating: 4.7,
      reviews: 113,
      students: 740,
      image: "bg-worldsell-earth-100",
      instructor: "Sarah Mensah",
      duration: "28h",
      level: "Débutant",
      lessons: 56,
      featured: false,
    },
    {
      id: 4,
      title: "Comptabilité et Finance pour PME",
      price: 119.99,
      currency: "USD",
      rating: 4.6,
      reviews: 98,
      students: 520,
      image: "bg-green-100",
      instructor: "Mohamed El Fassi",
      duration: "32h",
      level: "Intermédiaire",
      lessons: 64,
      featured: false,
    },
    {
      id: 5,
      title: "Anglais des Affaires",
      price: 79.99,
      currency: "USD",
      rating: 4.8,
      reviews: 215,
      students: 1820,
      image: "bg-blue-100",
      instructor: "Chioma Okafor",
      duration: "24h",
      level: "Débutant à Avancé",
      lessons: 48,
      featured: true,
    },
    {
      id: 6,
      title: "Entrepreneuriat: De l'Idée au Lancement",
      price: 99.99,
      currency: "USD",
      rating: 4.9,
      reviews: 176,
      students: 980,
      image: "bg-worldsell-earth-200",
      instructor: "Jean-Pierre Kouamé",
      duration: "36h",
      level: "Tous niveaux",
      lessons: 72,
      featured: true,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">
          Affichage de <span className="font-medium">{courses.length}</span> cours
        </p>
        
        <div className="flex items-center gap-2">
          <span className="text-sm">Trier par:</span>
          <select className="text-sm border rounded p-1.5">
            <option>Popularité</option>
            <option>Plus récent</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
            <option>Avis</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

interface CourseCardProps {
  course: any;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="overflow-hidden h-full">
      <div className={`aspect-video ${course.image} relative`}>
        {course.featured && (
          <Badge className="absolute top-2 left-2 bg-worldsell-orange-400">
            Populaire
          </Badge>
        )}
        <button 
          className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart 
            size={18} 
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"} 
          />
        </button>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{course.rating}</span>
            <span className="text-xs text-muted-foreground">({course.reviews})</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {course.level}
          </Badge>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
        
        <div className="text-sm text-muted-foreground mb-3">
          Par {course.instructor}
        </div>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{course.lessons} leçons</span>
          </div>
          <div className="flex items-center gap-1">
            <UserRound className="h-3.5 w-3.5" />
            <span>{course.students}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="font-semibold text-lg">
            {course.currency} {course.price.toFixed(2)}
          </div>
          <Button className="bg-worldsell-orange-400 hover:bg-worldsell-orange-500">
            S'inscrire
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseGrid;
