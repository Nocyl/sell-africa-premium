
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingBag,
  GraduationCap,
  Star,
  ArrowRight,
  Calendar,
  Clock,
  BarChart,
  Download,
  Gift,
  Award,
  TrendingUp,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';

const learningProgressData = [
  { name: "Lun", progress: 30 },
  { name: "Mar", progress: 45 },
  { name: "Mer", progress: 60 },
  { name: "Jeu", progress: 35 },
  { name: "Ven", progress: 70 },
  { name: "Sam", progress: 85 },
  { name: "Dim", progress: 95 },
];

export default function UserDashboard() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState("overview");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      title: "Commandes totales",
      value: "12",
      icon: ShoppingBag,
      color: "text-blue-600",
      href: "/dashboard/orders"
    },
    {
      title: "Cours suivis",
      value: "4",
      icon: GraduationCap,
      color: "text-green-600",
      href: "/dashboard/courses"
    },
    {
      title: "Points fidélité",
      value: "350",
      icon: Star,
      color: "text-amber-500",
      href: "/dashboard/profile"
    }
  ];

  const recentOrders = [
    { id: "WS12345", date: "20 Avr 2025", product: "Formation React", status: "completed", price: "25.000 FCFA" },
    { id: "WS12346", date: "15 Avr 2025", product: "T-shirt WorldSell", status: "shipped", price: "8.000 FCFA" }
  ];

  const activeCourses = [
    { 
      id: 1, 
      title: "Formation React Développeur", 
      instructor: "TechEdu Pro", 
      progress: 66, 
      lastAccessed: "Hier", 
      image: "/images/products/react-course.webp",
      nextLesson: "Composants avancés en React",
      duration: "45 min"
    },
    { 
      id: 2, 
      title: "UI/UX Design Masterclass", 
      instructor: "DesignMasters", 
      progress: 32, 
      lastAccessed: "Il y a 3 jours", 
      image: "/images/products/ui-ux-kit.webp",
      nextLesson: "Wireframes et prototypes",
      duration: "30 min"
    }
  ];

  const achievements = [
    { name: "Premier achat", description: "Vous avez effectué votre premier achat", completed: true, icon: ShoppingBag },
    { name: "Première formation", description: "Vous avez suivi votre première formation", completed: true, icon: GraduationCap },
    { name: "Apprenant assidu", description: "Connectez-vous 7 jours de suite", completed: false, progress: 5, total: 7, icon: Calendar },
  ];

  const upcomingEvents = [
    { 
      title: "Webinaire: Tendances UX 2025", 
      date: "25 Avr 2025", 
      time: "14:00",
      category: "Design"
    },
    { 
      title: "Lancement nouveau cours React Native", 
      date: "30 Avr 2025", 
      time: "10:00",
      category: "Development"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Bienvenue sur votre espace personnel WorldSell
          </p>
        </div>

        <Tabs defaultValue="overview" value={tabValue} onValueChange={setTabValue} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="learning">Apprentissage</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="rewards">Récompenses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {stats.map((stat) => (
                <Card key={stat.title} className="relative overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={cn("h-4 w-4", stat.color)} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <Button
                      variant="ghost"
                      className="absolute bottom-0 right-0 p-2"
                      onClick={() => navigate(stat.href)}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Progression d'apprentissage</CardTitle>
                  <CardDescription>Votre temps d'apprentissage ces 7 derniers jours</CardDescription>
                </CardHeader>
                <CardContent className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={learningProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis unit="min" />
                      <Tooltip formatter={(value) => [`${value} min`, 'Temps d\'apprentissage']} />
                      <Line
                        type="monotone"
                        dataKey="progress"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setTabValue("learning")}>
                    Voir le détail de vos cours
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Événements à venir</CardTitle>
                  <CardDescription>Ne manquez pas ces événements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium line-clamp-1">{event.title}</h4>
                          <div className="flex items-center text-xs text-muted-foreground space-x-2 mt-1">
                            <span>{event.date}</span>
                            <span>•</span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {event.time}
                            </span>
                          </div>
                          <Badge variant="secondary" className="mt-2 text-xs">{event.category}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Voir tous les événements
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cours actifs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {activeCourses.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{course.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            Par {course.instructor}
                          </p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs">{course.progress}%</span>
                            <Progress value={course.progress} className="h-2 flex-1 mx-2" />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs pl-14">
                        <span className="text-muted-foreground">
                          Dernière activité: {course.lastAccessed}
                        </span>
                        <Button variant="link" size="sm" className="h-auto p-0">
                          Continuer
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/dashboard/courses")} className="w-full">
                    Voir tous mes cours
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Dernières commandes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex justify-between">
                        <div>
                          <div className="font-medium">{order.product}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.date} • N° {order.id}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{order.price}</div>
                          <Badge variant={order.status === "completed" ? "success" : "secondary"} className="mt-1">
                            {order.status === "completed" ? "Terminé" : "Expédié"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/dashboard/orders")} variant="outline" className="w-full">
                    Historique des commandes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="learning" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vos cours en cours</CardTitle>
                <CardDescription>
                  Continuez votre apprentissage là où vous vous êtes arrêté
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {activeCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">Par {course.instructor}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progression</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>
                    
                    <div className="p-3 bg-muted rounded-md">
                      <h4 className="text-sm font-medium">Prochaine leçon</h4>
                      <p className="text-sm mt-1">{course.nextLesson}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Télécharger
                      </Button>
                      <Button size="sm">
                        Continuer
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historique des commandes</CardTitle>
                <CardDescription>
                  Consultez vos achats précédents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Commande #{order.id}</span>
                          <Badge variant={order.status === "completed" ? "success" : "secondary"}>
                            {order.status === "completed" ? "Terminé" : "Expédié"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                        <p className="font-medium">{order.product}</p>
                      </div>
                      <div className="mt-3 sm:mt-0 flex items-center space-x-3">
                        <span className="font-bold">{order.price}</span>
                        <Button variant="outline" size="sm">Détails</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Télécharger l'historique</Button>
                <Button>Voir toutes les commandes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="rewards" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-amber-500" />
                    <span>Programme de fidélité</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-lg font-bold">350 points</div>
                      <p className="text-sm text-muted-foreground">Niveau Silver</p>
                    </div>
                    <div className="bg-gradient-to-r from-slate-800 to-slate-950 p-3 rounded-lg text-white">
                      <div className="text-xs uppercase tracking-wide">WorldSell</div>
                      <div className="text-xs mt-1">Silver Member</div>
                      <div className="text-lg font-bold mt-3">Thomas D.</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Niveau suivant: Gold (500 points)</span>
                      <span>350/500</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  
                  <div className="bg-muted p-3 rounded-md space-y-2">
                    <h4 className="text-sm font-medium">Avantages actuels</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>Livraison gratuite sur les produits physiques</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>5% de réduction sur les formations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>Accès prioritaire au support client</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Gift className="h-4 w-4 mr-2" />
                    Échanger mes points
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-amber-500" />
                    <span>Réalisations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                        achievement.completed 
                          ? "bg-green-100 text-green-600" 
                          : "bg-muted text-muted-foreground"
                      )}>
                        <achievement.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{achievement.name}</h4>
                          {achievement.completed && (
                            <Badge variant="outline" className="bg-green-50">Complété</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {!achievement.completed && achievement.progress !== undefined && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progression</span>
                              <span>{achievement.progress}/{achievement.total}</span>
                            </div>
                            <Progress value={(achievement.progress / achievement.total) * 100} className="h-1" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Voir toutes les réalisations
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
