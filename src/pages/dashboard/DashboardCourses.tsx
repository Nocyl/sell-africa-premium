
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, File, Clock, Award, BookOpen, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Données de cours fictives
const courses = [
  {
    id: "1",
    title: "Introduction au développement web",
    instructor: "Thomas Dubois",
    progress: 75,
    lastAccessed: "18 Avril 2025",
    status: "in-progress",
    duration: "12h 30min",
    modules: 14,
    completed: 10,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
  },
  {
    id: "2",
    title: "UI/UX Design Masterclass",
    instructor: "Marie Durant",
    progress: 45,
    lastAccessed: "16 Avril 2025",
    status: "in-progress",
    duration: "10h 15min",
    modules: 12,
    completed: 5,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
  },
  {
    id: "3",
    title: "Marketing Digital Avancé",
    instructor: "Jean Dupont",
    progress: 100,
    lastAccessed: "10 Avril 2025",
    status: "completed",
    duration: "8h 45min",
    modules: 10,
    completed: 10,
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
  },
  {
    id: "4",
    title: "E-commerce et Vente en Ligne",
    instructor: "Sophie Martin",
    progress: 15,
    lastAccessed: "12 Avril 2025",
    status: "in-progress",
    duration: "9h 20min",
    modules: 12,
    completed: 2,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
  }
];

export default function DashboardCourses() {
  const [activeTab, setActiveTab] = useState("all");

  // Filtrer les cours en fonction de l'onglet actif
  const filteredCourses = activeTab === "all" 
    ? courses 
    : courses.filter(course => 
        activeTab === "completed" 
          ? course.status === "completed" 
          : course.status === "in-progress"
      );

  const activeCourses = courses.filter(course => course.status === "in-progress").length;
  const completedCourses = courses.filter(course => course.status === "completed").length;
  
  // Calcul du temps total consacré aux cours (en heures)
  const totalHoursSpent = 42.5;

  // Calcul du pourcentage d'achèvement global
  const overallProgress = Math.round(
    courses.reduce((acc, course) => acc + course.progress, 0) / courses.length
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Mes cours</h1>
          <p className="text-muted-foreground">
            Suivez votre progression dans vos cours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Cours actifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCourses}</div>
              <div className="text-xs text-muted-foreground mt-1">
                à terminer
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Cours complétés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCourses}</div>
              <div className="text-xs text-muted-foreground mt-1">
                cours terminés
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Temps total d'apprentissage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHoursSpent}h</div>
              <div className="text-xs text-muted-foreground mt-1">
                depuis votre inscription
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Progression globale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress}%</div>
              <Progress 
                value={overallProgress} 
                className="h-2 mt-2"
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle>Mes parcours d'apprentissage</CardTitle>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">Tous ({courses.length})</TabsTrigger>
                  <TabsTrigger value="in-progress">En cours ({activeCourses})</TabsTrigger>
                  <TabsTrigger value="completed">Terminés ({completedCourses})</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-36">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant={course.status === "completed" ? "default" : "secondary"}
                            className={course.status === "completed" ? "bg-green-600" : ""}
                          >
                            {course.status === "completed" ? "Terminé" : "En cours"}
                          </Badge>
                          <span className="text-white text-xs flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {course.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-base line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Par {course.instructor}</p>
                      
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {course.modules} modules
                        </span>
                        <span className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {course.completed}/{course.modules} complétés
                        </span>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{course.progress}% terminé</span>
                          <span>Dernier accès: {course.lastAccessed}</span>
                        </div>
                        <Progress 
                          value={course.progress} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <Button 
                          size="sm" 
                          className={cn(
                            "gap-1",
                            course.status === "completed" ? "bg-green-600 hover:bg-green-700" : ""
                          )}
                        >
                          {course.status === "completed" ? (
                            <>
                              <Award className="h-3 w-3" />
                              Certificat
                            </>
                          ) : (
                            <>
                              <Play className="h-3 w-3" />
                              Continuer
                            </>
                          )}
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <File className="h-3 w-3" />
                          Notes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-muted/20 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  Vous n'avez pas encore de cours dans cette catégorie.
                </p>
                <Button>Explorer les cours</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cours recommandés pour vous</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-32">
                  <img
                    src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
                    alt="JavaScript Avancé"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-3">
                  <h4 className="font-medium text-sm">JavaScript Avancé: ES6+ & Frameworks</h4>
                  <p className="text-xs text-muted-foreground mt-1">Par Alexandre Denis</p>
                  <div className="mt-3 flex justify-between">
                    <span className="text-sm font-semibold">30.000 FCFA</span>
                    <Badge variant="outline" className="text-xs">Populaire</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-32">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
                    alt="Design Mobile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-3">
                  <h4 className="font-medium text-sm">Design Mobile: UX et UI pour Applications</h4>
                  <p className="text-xs text-muted-foreground mt-1">Par Caroline Lefèvre</p>
                  <div className="mt-3 flex justify-between">
                    <span className="text-sm font-semibold">28.000 FCFA</span>
                    <Badge variant="outline" className="text-xs">Nouveau</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-32">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
                    alt="Business Plan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-3">
                  <h4 className="font-medium text-sm">Business Plan: De l'Idée à l'Entreprise</h4>
                  <p className="text-xs text-muted-foreground mt-1">Par Marc Delaporte</p>
                  <div className="mt-3 flex justify-between">
                    <span className="text-sm font-semibold">25.000 FCFA</span>
                    <Badge variant="outline" className="text-xs">Tendance</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
