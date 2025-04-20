
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  BarChart3, 
  Users, 
  ShoppingCart,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend,
  LineChart,
  Line,
  BarChart,
  Bar
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Données simulées pour les graphiques
const revenueData = [
  { name: "Jan", physique: 150000, digital: 90000, cours: 280000 },
  { name: "Fév", physique: 180000, digital: 120000, cours: 310000 },
  { name: "Mar", physique: 220000, digital: 170000, cours: 350000 },
  { name: "Avr", physique: 210000, digital: 200000, cours: 370000 },
  { name: "Mai", physique: 250000, digital: 230000, cours: 420000 },
  { name: "Jun", physique: 270000, digital: 250000, cours: 450000 },
  { name: "Jul", physique: 300000, digital: 300000, cours: 480000 },
];

const usersData = [
  { name: "Jan", users: 1200 },
  { name: "Fév", users: 1900 },
  { name: "Mar", users: 2400 },
  { name: "Avr", users: 2800 },
  { name: "Mai", users: 3300 },
  { name: "Jun", users: 3800 },
  { name: "Jul", users: 4200 },
];

const categoriesData = [
  { name: "Dev Web", value: 3500 },
  { name: "Design", value: 2800 },
  { name: "Marketing", value: 2200 },
  { name: "Business", value: 1900 },
  { name: "Mobile", value: 1500 },
];

export default function AdminDashboard() {
  const [period, setPeriod] = useState("month");
  
  const stats = [
    {
      title: "Ventes du mois",
      value: "1.520.000 FCFA",
      change: "+15.3%",
      trend: "up",
      icon: BarChart3,
      color: "text-blue-600",
    },
    {
      title: "Utilisateurs",
      value: "4.248",
      change: "+10.8%",
      trend: "up",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Commandes",
      value: "834",
      change: "+18.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-yellow-600",
    },
    {
      title: "Produits",
      value: "348",
      change: "+7.5%",
      trend: "up",
      icon: Package,
      color: "text-rose-600",
    }
  ];

  const recentActivityItems = [
    {
      user: "Thomas Dubois",
      action: "a ajouté un nouveau produit",
      time: "Il y a 15 minutes",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas"
    },
    {
      user: "Sophie Martin",
      action: "a signalé un problème sur la commande #WS78956",
      time: "Il y a 45 minutes",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie"
    },
    {
      user: "Jean Dupont",
      action: "a créé un compte vendeur",
      time: "Il y a 1 heure",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jean"
    },
    {
      user: "Marie Durant",
      action: "a lancé une nouvelle formation",
      time: "Il y a 2 heures",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie"
    },
    {
      user: "Lucas Bertrand",
      action: "a modifié ses paramètres de paiement",
      time: "Il y a 3 heures",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas"
    }
  ];

  const alertItems = [
    {
      title: "Stock faible",
      description: "5 produits sont presque en rupture de stock",
      severity: "warning"
    },
    {
      title: "Problème de paiement",
      description: "3 transactions ont échoué au cours des dernières 24 heures",
      severity: "error"
    },
    {
      title: "Pic de trafic",
      description: "Le serveur connaît une charge inhabituelle",
      severity: "warning"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Administration</h1>
            <p className="text-muted-foreground">
              Tableau de bord administrateur WorldSell
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button>Exporter les données</Button>
            <Button variant="outline">Paramètres</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={cn(
                  "flex items-center text-xs mt-1",
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                )}>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  <span>{stat.change} depuis le mois dernier</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Revenus par type de produit</CardTitle>
                <Tabs value={period} onValueChange={setPeriod} className="w-[230px]">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="week">Semaine</TabsTrigger>
                    <TabsTrigger value="month">Mois</TabsTrigger>
                    <TabsTrigger value="year">Année</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorCours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorDigital" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPhysique" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis 
                      tickFormatter={(value) => 
                        new Intl.NumberFormat('fr-FR', {
                          notation: 'compact',
                          compactDisplay: 'short',
                        }).format(value)
                      }
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip 
                      formatter={(value) => 
                        new Intl.NumberFormat('fr-FR', {
                          style: 'currency',
                          currency: 'XOF',
                          maximumFractionDigits: 0,
                        }).format(Number(value))
                      }
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="cours" 
                      name="Formations"
                      stroke="#8884d8" 
                      fillOpacity={1} 
                      fill="url(#colorCours)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="digital" 
                      name="Produits digitaux"
                      stroke="#82ca9d" 
                      fillOpacity={1} 
                      fill="url(#colorDigital)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="physique" 
                      name="Produits physiques"
                      stroke="#ffc658" 
                      fillOpacity={1} 
                      fill="url(#colorPhysique)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Croissance utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={usersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      name="Utilisateurs"
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top des catégories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="value" 
                      name="Ventes"
                      fill="#8884d8" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Alertes récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertItems.map((alert, index) => (
                  <div key={index} className={cn(
                    "p-4 rounded-lg border flex items-start gap-3",
                    alert.severity === "error" ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"
                  )}>
                    <div className={cn(
                      "rounded-full p-1.5",
                      alert.severity === "error" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                    )}>
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivityItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="relative">
                      <img 
                        src={item.avatar} 
                        alt={item.user} 
                        className="w-9 h-9 rounded-full"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{item.user}</span>{" "}
                        {item.action}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
