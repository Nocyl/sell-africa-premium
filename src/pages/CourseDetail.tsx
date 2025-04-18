
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Star, Clock, UserRound, BookOpen, 
  CheckCircle, Shield, Award, BarChart, Heart
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsletterSection from "@/components/home/NewsletterSection";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Types pour les cours
interface Course {
  id: number;
  title: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  students: number;
  image: string;
  instructor: string;
  duration: string;
  level: string;
  lessons: number;
  featured: boolean;
  description: string;
  whatYouWillLearn: string[];
  modules: CourseModule[];
}

interface CourseModule {
  title: string;
  duration: string;
  lessons: CourseLessons[];
}

interface CourseLessons {
  title: string;
  duration: string;
  type: "video" | "quiz" | "text";
  preview?: boolean;
}

// Mock data pour les cours
const mockCourses: Course[] = [
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
    description: "Cette formation complète vous guidera à travers toutes les facettes du marketing digital, avec une attention particulière aux stratégies efficaces pour le marché africain. Du référencement au marketing sur les réseaux sociaux, en passant par l'email marketing et la publicité payante, vous apprendrez à développer des campagnes performantes et à analyser leurs résultats.",
    whatYouWillLearn: [
      "Créer une stratégie complète de marketing digital",
      "Optimiser votre contenu pour les moteurs de recherche (SEO)",
      "Élaborer des campagnes publicitaires efficaces sur les réseaux sociaux",
      "Analyser les données pour améliorer vos performances",
      "Mettre en place des campagnes d'email marketing qui convertissent",
      "Adapter vos stratégies au contexte africain spécifique"
    ],
    modules: [
      {
        title: "Introduction au Marketing Digital",
        duration: "5h",
        lessons: [
          { title: "Vue d'ensemble du marketing digital", duration: "45min", type: "video", preview: true },
          { title: "Le paysage numérique africain", duration: "1h", type: "video" },
          { title: "Établir vos objectifs marketing", duration: "30min", type: "video" },
          { title: "Analyse des concurrents", duration: "45min", type: "video" },
          { title: "Quiz d'introduction", duration: "20min", type: "quiz" }
        ]
      },
      {
        title: "Search Engine Optimization (SEO)",
        duration: "8h",
        lessons: [
          { title: "Principes fondamentaux du SEO", duration: "1h", type: "video" },
          { title: "Recherche de mots-clés pour le marché africain", duration: "1h15min", type: "video" },
          { title: "Optimisation on-page", duration: "1h30min", type: "video" },
          { title: "Stratégies de link building", duration: "1h", type: "video" },
          { title: "SEO local pour les entreprises africaines", duration: "45min", type: "video" },
          { title: "Exercice pratique SEO", duration: "2h", type: "text" },
          { title: "Évaluation SEO", duration: "30min", type: "quiz" }
        ]
      },
      {
        title: "Marketing sur les Réseaux Sociaux",
        duration: "10h",
        lessons: [
          { title: "Stratégies pour Facebook et Instagram", duration: "1h30min", type: "video" },
          { title: "Marketing sur Twitter", duration: "1h", type: "video" },
          { title: "LinkedIn pour les professionnels africains", duration: "1h", type: "video" },
          { title: "YouTube et marketing vidéo", duration: "1h30min", type: "video" },
          { title: "WhatsApp Business", duration: "45min", type: "video", preview: true },
          { title: "Création de contenu engageant", duration: "1h15min", type: "video" },
          { title: "Planification et automatisation", duration: "1h", type: "video" },
          { title: "Analyse des performances", duration: "1h", type: "video" },
          { title: "Projet de campagne sociale", duration: "2h", type: "text" }
        ]
      }
    ]
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
    description: "Ce cours vous enseignera comment créer des applications web modernes en utilisant React pour le frontend et Node.js pour le backend. Spécialement conçu pour les développeurs africains, il aborde des cas d'usage pertinents pour la région et des solutions adaptées aux contraintes locales comme la bande passante limitée et l'optimisation pour mobile.",
    whatYouWillLearn: [
      "Maîtriser React.js et ses concepts fondamentaux",
      "Développer des API robustes avec Node.js et Express",
      "Intégrer des bases de données MongoDB à vos applications",
      "Créer des applications web réactives et optimisées pour mobile",
      "Implémenter l'authentification et la sécurité",
      "Déployer vos applications sur des serveurs africains et internationaux"
    ],
    modules: [
      {
        title: "Bases de JavaScript Moderne",
        duration: "6h",
        lessons: [
          { title: "ES6 et au-delà", duration: "1h", type: "video", preview: true },
          { title: "Fonctions asynchrones", duration: "1h30min", type: "video" },
          { title: "Manipulation du DOM", duration: "1h", type: "video" },
          { title: "Exercices pratiques", duration: "2h", type: "text" },
          { title: "Quiz JavaScript", duration: "30min", type: "quiz" }
        ]
      },
      {
        title: "React Fondamentaux",
        duration: "10h",
        lessons: [
          { title: "Introduction à React", duration: "1h", type: "video" },
          { title: "Composants et JSX", duration: "1h30min", type: "video" },
          { title: "État et cycle de vie", duration: "1h15min", type: "video" },
          { title: "Hooks et fonctionnalités modernes", duration: "2h", type: "video", preview: true },
          { title: "Gestion des formulaires", duration: "1h", type: "video" },
          { title: "Routage avec React Router", duration: "1h15min", type: "video" },
          { title: "Projet: Dashboard d'application", duration: "2h", type: "text" }
        ]
      },
      {
        title: "Node.js et Express",
        duration: "8h",
        lessons: [
          { title: "Configuration de Node.js", duration: "45min", type: "video" },
          { title: "Création d'API RESTful", duration: "1h30min", type: "video" },
          { title: "Intégration de MongoDB", duration: "1h15min", type: "video" },
          { title: "Authentification JWT", duration: "1h30min", type: "video" },
          { title: "Optimisation des performances", duration: "1h", type: "video" },
          { title: "Projet: Création d'une API complète", duration: "2h", type: "text" }
        ]
      }
    ]
  }
];

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Simuler une requête API
    const foundCourse = mockCourses.find(c => c.id === Number(id));
    
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      // Rediriger si le cours n'existe pas
      navigate("/courses");
    }
  }, [id, navigate]);

  const handleEnroll = () => {
    toast.success(`Inscription au cours: ${course?.title}`);
    navigate("/checkout");
  };

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-xl">Chargement du cours...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* En-tête du cours */}
        <div className={`${course.image} py-12`}>
          <div className="container">
            <Button 
              variant="outline" 
              className="mb-6 bg-background" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              {course.featured && (
                <Badge className="mb-3 bg-worldsell-orange-400">
                  Populaire
                </Badge>
              )}
              <h1 className="text-2xl md:text-4xl font-bold mb-4">{course.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground">({course.reviews} avis)</span>
                </div>
                <div className="flex items-center gap-1">
                  <UserRound className="h-4 w-4" />
                  <span>{course.students} étudiants</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.lessons} leçons</span>
                </div>
                <Badge variant="outline" className="bg-background">
                  {course.level}
                </Badge>
              </div>
              
              <p className="mb-6">
                <span className="font-medium">Instructeur: </span> 
                {course.instructor}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-xl font-bold mb-4">Description du cours</h2>
                <p className="text-muted-foreground mb-6">
                  {course.description}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-xl font-bold mb-4">Ce que vous apprendrez</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.whatYouWillLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-worldsell-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-xl font-bold mb-4">Contenu du cours</h2>
                
                <div className="mb-4 text-sm">
                  <span className="text-muted-foreground">
                    {course.modules.length} modules • {course.lessons} leçons • Durée totale: {course.duration}
                  </span>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {course.modules.map((module, moduleIndex) => (
                    <AccordionItem key={moduleIndex} value={`module-${moduleIndex}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex flex-col items-start text-left">
                          <div>{module.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {module.lessons.length} leçons • {module.duration}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pt-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <li 
                              key={lessonIndex} 
                              className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                            >
                              <div className="flex items-center gap-2">
                                {lesson.type === "video" && (
                                  <div className="h-8 w-8 rounded-full bg-worldsell-blue-100 flex items-center justify-center">
                                    <BookOpen className="h-4 w-4 text-worldsell-blue-500" />
                                  </div>
                                )}
                                {lesson.type === "quiz" && (
                                  <div className="h-8 w-8 rounded-full bg-worldsell-orange-100 flex items-center justify-center">
                                    <BarChart className="h-4 w-4 text-worldsell-orange-500" />
                                  </div>
                                )}
                                {lesson.type === "text" && (
                                  <div className="h-8 w-8 rounded-full bg-worldsell-earth-100 flex items-center justify-center">
                                    <BookOpen className="h-4 w-4 text-worldsell-earth-500" />
                                  </div>
                                )}
                                <div>
                                  <div className="font-medium">{lesson.title}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {lesson.duration}
                                  </div>
                                </div>
                              </div>
                              {lesson.preview && (
                                <Badge variant="outline" className="ml-2">
                                  Aperçu gratuit
                                </Badge>
                              )}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </div>
            
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="border rounded-lg p-6 sticky top-20"
              >
                <div className="text-3xl font-bold mb-4">
                  {course.currency} {course.price.toFixed(2)}
                </div>
                
                <Button 
                  className="w-full mb-3 bg-worldsell-orange-400 hover:bg-worldsell-orange-500"
                  onClick={handleEnroll}
                >
                  S'inscrire maintenant
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full mb-6"
                  onClick={() => {
                    setIsFavorite(!isFavorite);
                    toast.success(isFavorite ? "Retiré des favoris" : "Ajouté aux favoris");
                  }}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                </Button>
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-worldsell-blue-500" />
                    <span>Accès à vie au contenu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-worldsell-blue-500" />
                    <span>Garantie satisfait ou remboursé pendant 30 jours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-worldsell-blue-500" />
                    <span>Certificat d'accomplissement</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
