
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, BookOpen, Clock, Award } from "lucide-react";

export default function DashboardCourses() {
  // Exemple de données de cours
  const courses = [
    {
      id: 1,
      title: "Introduction au Marketing Digital",
      instructor: "Marie Diop",
      progress: 75,
      category: "Marketing",
      lastAccessed: "2025-04-18T14:30:00",
      totalHours: 12,
      completedHours: 9,
    },
    {
      id: 2,
      title: "Développement Web pour Débutants",
      instructor: "Jean Ndiaye",
      progress: 30,
      category: "Développement",
      lastAccessed: "2025-04-15T10:15:00",
      totalHours: 20,
      completedHours: 6,
    },
    {
      id: 3,
      title: "Gestion de Projet Avancée",
      instructor: "Aminata Fall",
      progress: 100,
      category: "Business",
      lastAccessed: "2025-03-28T09:45:00",
      totalHours: 8,
      completedHours: 8,
      completed: true,
    },
  ];

  // Formatage de la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Mes cours</h1>
          <p className="text-muted-foreground">
            Suivez votre progression et continuez votre apprentissage
          </p>
        </div>

        <Tabs defaultValue="in-progress" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="in-progress">En cours</TabsTrigger>
            <TabsTrigger value="completed">Terminés</TabsTrigger>
            <TabsTrigger value="bookmarked">Sauvegardés</TabsTrigger>
          </TabsList>
          
          <TabsContent value="in-progress" className="space-y-4">
            {courses
              .filter(course => course.progress < 100)
              .map(course => (
                <Card key={course.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr]">
                      <div className="bg-gray-100 flex items-center justify-center p-6 min-h-[180px]">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-primary" />
                          </div>
                          <span className="text-sm font-medium">{course.category}</span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                          <h3 className="font-semibold text-lg">{course.title}</h3>
                          <div className="text-sm text-muted-foreground">
                            Par {course.instructor}
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-col space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{course.progress}% complété</span>
                            <span className="text-sm text-muted-foreground">
                              {course.completedHours}/{course.totalHours} heures
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        
                        <div className="mt-auto pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-2 h-4 w-4" />
                            Dernier accès le {formatDate(course.lastAccessed)}
                          </div>
                          
                          <Button className="flex items-center gap-2">
                            <Play className="h-4 w-4" />
                            Continuer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {courses.filter(course => course.progress < 100).length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">Aucun cours en cours</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Vous n'avez pas de cours en cours. Découvrez nos formations pour commencer à apprendre.
                  </p>
                  <Button className="mt-4" variant="outline" onClick={() => window.location.href = "/courses"}>
                    Explorer les cours
                  </Button>
                </div>
              )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {courses
              .filter(course => course.progress === 100)
              .map(course => (
                <Card key={course.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr]">
                      <div className="bg-green-50 flex items-center justify-center p-6 min-h-[180px]">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                            <Award className="h-8 w-8 text-green-600" />
                          </div>
                          <span className="text-sm font-medium">{course.category}</span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                          <h3 className="font-semibold text-lg">{course.title}</h3>
                          <div className="flex items-center">
                            <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                              Terminé
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">
                            Par {course.instructor}
                          </p>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            <Clock className="inline mr-2 h-4 w-4" />
                            Complété le {formatDate(course.lastAccessed)}
                          </div>
                          
                          <Button variant="outline" className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            Revoir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {courses.filter(course => course.progress === 100).length === 0 && (
                <div className="text-center py-12">
                  <Award className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">Aucun cours terminé</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Continuez vos cours en cours pour obtenir votre certificat.
                  </p>
                </div>
              )}
          </TabsContent>
          
          <TabsContent value="bookmarked">
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">Aucun cours sauvegardé</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Ajoutez des cours à vos favoris pour les retrouver facilement.
              </p>
              <Button className="mt-4" variant="outline" onClick={() => window.location.href = "/courses"}>
                Explorer les cours
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
