
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  BarChart3, 
  ShoppingBag, 
  Banknote,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  Package,
  BookOpen,
  EyeIcon,
  PlusIcon
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
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

// Données simulées pour le tableau de bord vendeur
const areaData = [
  { name: "Jan", sales: 120000 },
  { name: "Fév", sales: 150000 },
  { name: "Mar", sales: 180000 },
  { name: "Avr", sales: 220000 },
  { name: "Mai", sales: 250000 },
  { name: "Jun", sales: 280000 },
  { name: "Jul", sales: 300000 },
  { name: "Aoû", sales: 350000 },
  { name: "Sep", sales: 370000 },
  { name: "Oct", sales: 400000 },
  { name: "Nov", sales: 450000 },
  { name: "Déc", sales: 520000 },
];

const barData = [
  { name: "Formation React", value: 25000 },
  { name: "T-shirt WorldSell", value: 8000 },
  { name: "UI/UX Design Kit", value: 15000 },
  { name: "Pack Tools", value: 12000 },
  { name: "Guide Marketing", value: 7000 },
];

const pieData = [
  { name: "Formations", value: 65 },
  { name: "Produits digitaux", value: 25 },
  { name: "Produits physiques", value: 10 },
];

const COLORS = ['#8884d8', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function SellerDashboard() {
  const [period, setPeriod] = useState("month");
  const navigate = useNavigate();
  
  const stats = [
    {
      title: "Ventes du mois",
      value: "520.000 FCFA",
      change: "+12.5%",
      trend: "up",
      icon: Banknote,
      color: "text-blue-600",
    },
    {
      title: "Commandes",
      value: "120",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingBag,
      color: "text-green-600",
    },
    {
      title: "Taux de conversion",
      value: "3.8%",
      change: "-0.5%",
      trend: "down",
      icon: TrendingUp,
      color: "text-amber-600",
    },
    {
      title: "Clients",
      value: "85",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-rose-600",
    }
  ];

  const recentOrders = [
    { id: "WS87654", customer: "Marie Durand", date: "20 Avr 2025", status: "completed", total: "25.000 FCFA" },
    { id: "WS87655", customer: "Thomas Dupont", date: "19 Avr 2025", status: "processing", total: "15.000 FCFA" },
    { id: "WS87656", customer: "Sophie Martin", date: "18 Avr 2025", status: "completed", total: "8.000 FCFA" },
    { id: "WS87657", customer: "Lucas Bertrand", date: "17 Avr 2025", status: "completed", total: "12.000 FCFA" },
    { id: "WS87658", customer: "Camille Dubois", date: "16 Avr 2025", status: "processing", total: "7.000 FCFA" },
  ];

  const recentMessages = [
    { id: 1, from: "Marie Durand", content: "Question sur le cours React", time: "Il y a 15 min", read: false },
    { id: 2, from: "Thomas Dupont", content: "Problème avec le téléchargement", time: "Il y a 1 heure", read: false },
    { id: 3, from: "Support WorldSell", content: "Mise à jour des conditions", time: "Il y a 3 heures", read: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="hidden md:block">
            {/* Le titre est maintenant affiché dans le DashboardLayout */}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => navigate("/seller/products/new")}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Ajouter un produit
            </Button>
            <Button onClick={() => navigate("/seller/courses/new")}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Ajouter un cours
            </Button>
            <Button variant="outline" onClick={() => navigate("/seller/settings")}>
              Voir la boutique
            </Button>
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

        <Card className="col-span-4">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Aperçu des ventes</CardTitle>
              <Tabs value={period} onValueChange={setPeriod} className="w-full sm:w-[230px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="week">Semaine</TabsTrigger>
                  <TabsTrigger value="month">Mois</TabsTrigger>
                  <TabsTrigger value="year">Année</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis 
                    tickFormatter={(value) => 
                      new Intl.NumberFormat('fr-FR', {
                        notation: 'compact',
                        compactDisplay: 'short',
                      }).format(value)
                    }
                    tick={{ fontSize: 12 }}
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
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Produits les plus vendus</CardTitle>
              <Button variant="outline" size="sm" onClick={() => navigate("/seller/products")}>
                <EyeIcon className="h-4 w-4 mr-2" />
                Tous les produits
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      formatter={(value) => [`${value} FCFA`, "Prix"]} 
                      wrapperStyle={{ fontSize: '12px' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {barData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Répartition des ventes</CardTitle>
              <Button variant="outline" size="sm" onClick={() => navigate("/seller/sales")}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Voir les détails
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex flex-col md:flex-row items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Pourcentage"]} wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Messages récents</CardTitle>
              <Button variant="outline" size="sm" onClick={() => navigate("/seller/messages")}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Tous les messages
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={cn(
                      "p-4 rounded-lg border flex flex-col",
                      !message.read && "bg-muted/30 border-primary/20"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{message.from}</span>
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                    </div>
                    <p className="text-sm mt-1">{message.content}</p>
                    {!message.read && (
                      <div className="mt-2 flex justify-end">
                        <Button variant="outline" size="sm">Répondre</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Commandes récentes</CardTitle>
              <Button variant="outline" size="sm" onClick={() => navigate("/seller/orders")}>
                <ShoppingBag className="h-4 w-4 mr-2" />
                Toutes les commandes
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">Client</th>
                      <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Statut</th>
                      <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Total</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 text-sm">{order.id}</td>
                        <td className="py-3 px-4 text-sm">{order.customer}</td>
                        <td className="py-3 px-4 text-sm hidden md:table-cell">{order.date}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className={cn(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                            order.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          )}>
                            {order.status === "completed" ? "Complété" : "En cours"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm hidden md:table-cell">{order.total}</td>
                        <td className="py-3 px-4 text-sm">
                          <Button variant="ghost" size="sm">Voir</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Formations et produits</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate("/seller/products")}>
                  <Package className="h-4 w-4 mr-2" />
                  Mes produits
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate("/seller/courses")}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Mes cours
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border-2 border-dashed border-muted hover:border-primary/50 transition-colors text-center">
                  <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center h-full">
                    <PlusIcon className="h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium mb-1">Ajouter un produit</h3>
                    <p className="text-sm text-muted-foreground mb-4">Créez et vendez un nouveau produit</p>
                    <Button onClick={() => navigate("/seller/products/new")}>Commencer</Button>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-dashed border-muted hover:border-primary/50 transition-colors text-center">
                  <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center h-full">
                    <PlusIcon className="h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium mb-1">Créer une formation</h3>
                    <p className="text-sm text-muted-foreground mb-4">Partagez vos connaissances</p>
                    <Button onClick={() => navigate("/seller/courses/new")}>Commencer</Button>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-primary/10 bg-primary/5 text-center">
                  <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center h-full">
                    <BarChart3 className="h-8 w-8 text-primary mb-2" />
                    <h3 className="text-lg font-medium mb-1">Outils marketing Pro</h3>
                    <p className="text-sm text-muted-foreground mb-4">Boostez vos ventes avec nos outils</p>
                    <Button variant="outline" onClick={() => navigate("/seller/marketing")}>Explorer</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
