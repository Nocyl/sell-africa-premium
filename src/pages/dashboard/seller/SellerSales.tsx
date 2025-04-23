
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  Package, 
  ArrowUpRight,
  ArrowDownRight,
  BookOpen,
  Calendar
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Types
interface SaleData {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
}

interface ProductSale {
  id: string;
  name: string;
  type: "product" | "course";
  price: number;
  sales: number;
  revenue: number;
  change: number;
}

// Mock data pour les ventes
const mockSalesData: SaleData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  
  return {
    date: date.toISOString().split('T')[0],
    revenue: Math.floor(Math.random() * 1500) + 500,
    orders: Math.floor(Math.random() * 30) + 5,
    customers: Math.floor(Math.random() * 20) + 3,
  };
});

// Données mensuelles
const mockMonthlyData = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() - (11 - i));
  
  return {
    name: date.toLocaleDateString('fr-FR', { month: 'short' }),
    revenue: Math.floor(Math.random() * 15000) + 5000,
    orders: Math.floor(Math.random() * 300) + 50,
  };
});

// Top produits vendus
const mockProductSales: ProductSale[] = [
  {
    id: "p1",
    name: "Template Site Web Premium",
    type: "product",
    price: 49.99,
    sales: 32,
    revenue: 1599.68,
    change: 12.5
  },
  {
    id: "c1",
    name: "Formation Complète WordPress",
    type: "course",
    price: 129.99,
    sales: 18,
    revenue: 2339.82,
    change: 23.7
  },
  {
    id: "p2",
    name: "Logo Design Pack",
    type: "product",
    price: 29.99,
    sales: 45,
    revenue: 1349.55,
    change: -5.2
  },
  {
    id: "c2",
    name: "Marketing Digital Masterclass",
    type: "course",
    price: 199.99,
    sales: 10,
    revenue: 1999.90,
    change: 18.3
  },
  {
    id: "p3",
    name: "Icons Pack Pro",
    type: "product",
    price: 19.99,
    sales: 67,
    revenue: 1339.33,
    change: 32.1
  },
  {
    id: "p4",
    name: "UI Kit Premium",
    type: "product",
    price: 59.99,
    sales: 21,
    revenue: 1259.79,
    change: -8.4
  },
  {
    id: "c3",
    name: "Photoshop pour débutants",
    type: "course",
    price: 89.99,
    sales: 15,
    revenue: 1349.85,
    change: 7.6
  }
];

// Données des catégories de produits
const categoryData = [
  { name: "Design", value: 35 },
  { name: "Dev", value: 25 },
  { name: "Marketing", value: 20 },
  { name: "Business", value: 15 },
  { name: "Photo/Vidéo", value: 5 }
];

// Couleurs pour les graphiques
const COLORS = ['#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#6366f1'];

export default function SellerSales() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "year" | "all">("30d");
  const [comparisonRange, setComparisonRange] = useState<"previous" | "year">("previous");
  
  // Calculer les totaux pour les statistiques
  const totalRevenue = mockSalesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = mockSalesData.reduce((sum, item) => sum + item.orders, 0);
  const totalCustomers = mockSalesData.reduce((sum, item) => sum + item.customers, 0);
  
  // Pourcentages d'évolution (simulés)
  const revenueChange = 12.8;
  const ordersChange = 8.3;
  const customersChange = 15.2;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Ventes & Revenus</h1>
            <p className="text-muted-foreground">
              Analyse complète de vos ventes et revenus
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 derniers jours</SelectItem>
                <SelectItem value="30d">30 derniers jours</SelectItem>
                <SelectItem value="90d">90 derniers jours</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
                <SelectItem value="all">Toutes les données</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>
        
        {/* Cartes de statistiques principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Revenus totaux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold">{totalRevenue.toLocaleString('fr-FR')} €</div>
                  <div className={`flex items-center text-sm ${revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {revenueChange >= 0 ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(revenueChange)}% depuis {comparisonRange === "previous" ? "la période précédente" : "l'année dernière"}
                  </div>
                </div>
                <div className="p-2 bg-primary/10 rounded">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Commandes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold">{totalOrders}</div>
                  <div className={`flex items-center text-sm ${ordersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {ordersChange >= 0 ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(ordersChange)}% depuis {comparisonRange === "previous" ? "la période précédente" : "l'année dernière"}
                  </div>
                </div>
                <div className="p-2 bg-primary/10 rounded">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Nouveaux clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold">{totalCustomers}</div>
                  <div className={`flex items-center text-sm ${customersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {customersChange >= 0 ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(customersChange)}% depuis {comparisonRange === "previous" ? "la période précédente" : "l'année dernière"}
                  </div>
                </div>
                <div className="p-2 bg-primary/10 rounded">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Graphique principal */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <CardTitle>Aperçu des revenus</CardTitle>
                <CardDescription>
                  Revenus et commandes pour les {timeRange === "7d" ? "7 derniers jours" : 
                    timeRange === "30d" ? "30 derniers jours" : 
                    timeRange === "90d" ? "90 derniers jours" : 
                    timeRange === "year" ? "12 derniers mois" : "toutes les données"}
                </CardDescription>
              </div>
              
              <div className="flex items-center">
                <Tabs defaultValue="revenue">
                  <TabsList>
                    <TabsTrigger value="revenue">Revenus</TabsTrigger>
                    <TabsTrigger value="orders">Commandes</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timeRange === "year" ? mockMonthlyData : mockSalesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey={timeRange === "year" ? "name" : "date"} 
                    tickFormatter={(value) => {
                      if (timeRange === "year") return value;
                      const date = new Date(value);
                      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
                    }}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toLocaleString('fr-FR')} €`, 'Revenus']}
                    labelFormatter={(label) => {
                      if (timeRange === "year") return label;
                      const date = new Date(label);
                      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    name="Revenus (€)" 
                    stroke="#8b5cf6" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="orders" name="Commandes" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Produits populaires et graphiques supplémentaires */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Produits les plus vendus</CardTitle>
              <CardDescription>
                Performance de vos produits au cours de la période
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Prix</TableHead>
                    <TableHead className="text-right">Ventes</TableHead>
                    <TableHead className="text-right">Revenus</TableHead>
                    <TableHead className="text-right">Évolution</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockProductSales.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        {product.type === "product" ? (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                            <Package className="h-3 w-3 mr-1" />
                            Produit
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
                            <BookOpen className="h-3 w-3 mr-1" />
                            Cours
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">{product.price.toFixed(2)} €</TableCell>
                      <TableCell className="text-right">{product.sales}</TableCell>
                      <TableCell className="text-right">{product.revenue.toFixed(2)} €</TableCell>
                      <TableCell className="text-right">
                        <span className={`flex items-center justify-end ${product.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          {Math.abs(product.change)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Répartition des ventes</CardTitle>
              <CardDescription>
                Par catégorie de produits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Pourcentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 space-y-3">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <span className="text-sm font-medium">{category.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Graphiques supplémentaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tendance mensuelle</CardTitle>
              <CardDescription>
                Évolution des revenus sur les 12 derniers mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockMonthlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`${value.toLocaleString('fr-FR')} €`, 'Revenus']} />
                    <Legend />
                    <Bar 
                      dataKey="revenue" 
                      name="Revenus (€)" 
                      fill="#8b5cf6" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Calendrier des ventes</CardTitle>
              <CardDescription>
                Aperçu des revenus journaliers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-md bg-muted/50">
                <div className="mb-4 flex items-center justify-between">
                  <div className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Avril 2025</span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, i) => (
                    <div key={i} className="text-muted-foreground p-1">{day}</div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 30 }, (_, i) => {
                    const day = i + 1;
                    const revenue = Math.floor(Math.random() * 1000) + 100;
                    const intensity = Math.min(Math.floor(revenue / 150), 5);
                    const today = day === 23;
                    
                    return (
                      <div
                        key={i}
                        className={`
                          aspect-square flex flex-col justify-center items-center rounded-md text-xs p-1
                          ${today ? 'ring-2 ring-primary ring-offset-1' : ''}
                          ${intensity > 0 ? `bg-primary/10 hover:bg-primary/20` : 'hover:bg-muted'}
                          ${intensity > 1 ? `bg-primary/20` : ''}
                          ${intensity > 2 ? `bg-primary/30` : ''}
                          ${intensity > 3 ? `bg-primary/40` : ''}
                          ${intensity > 4 ? `bg-primary/50 text-white` : ''}
                          cursor-pointer transition-colors
                        `}
                        title={`${revenue}€ de revenus`}
                      >
                        <span className={today ? 'font-bold' : ''}>{day}</span>
                        {intensity > 0 && (
                          <span className="text-[10px] font-medium mt-0.5">
                            {revenue}€
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-sm bg-primary/10 mr-1" />
                      <span>&lt; 150€</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-sm bg-primary/30 mr-1" />
                      <span>300-450€</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-sm bg-primary/50 mr-1" />
                      <span>&gt; 600€</span>
                    </div>
                  </div>
                  <div className="text-muted-foreground">Total: 12,450€</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Composants auxiliaires pour les icônes de date
function ChevronLeft(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
