
import { useState } from "react";
import { Bar, Pie } from "recharts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  GraduationCap 
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const data = [
  { name: "Jan", total: 1200 },
  { name: "Fév", total: 2400 },
  { name: "Mar", total: 1800 },
  { name: "Avr", total: 2800 },
  { name: "Mai", total: 2000 },
  { name: "Juin", total: 3600 },
  { name: "Juil", total: 4000 },
];

const productDistribution = [
  { name: "Produits Physiques", value: 60 },
  { name: "Produits Numériques", value: 25 },
  { name: "Cours", value: 15 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Administration</h1>
          <p className="text-muted-foreground">
            Tableau de bord administrateur
          </p>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 h-auto mb-6">
            <TabsTrigger value="overview" className="py-2">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="sales" className="py-2">Ventes</TabsTrigger>
            <TabsTrigger value="users" className="py-2">Utilisateurs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Revenu Total
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,345,000 FCFA</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% depuis le mois dernier
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Utilisateurs
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,350</div>
                  <p className="text-xs text-muted-foreground">
                    +180 nouveaux utilisateurs
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Commandes
                  </CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5,720</div>
                  <p className="text-xs text-muted-foreground">
                    +435 depuis le mois dernier
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Cours Vendus
                  </CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">432</div>
                  <p className="text-xs text-muted-foreground">
                    +22 ce mois-ci
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Vue d'ensemble des ventes</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[240px] bg-gray-100 rounded-md flex items-center justify-center">
                    <BarChart className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Graphique des ventes</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Distribution des produits</CardTitle>
                  <CardDescription>
                    Répartition des ventes par type de produit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[240px] bg-gray-100 rounded-md flex items-center justify-center">
                    <div className="h-8 w-8 text-muted-foreground rounded-full border-4 border-muted-foreground border-r-transparent" />
                    <span className="ml-2 text-muted-foreground">Graphique circulaire</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rapport des ventes</CardTitle>
                <CardDescription>
                  Analyse détaillée des ventes pour les 6 derniers mois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Données des ventes</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des utilisateurs</CardTitle>
                <CardDescription>
                  Administration des comptes utilisateurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-md p-6 text-center">
                  <Users className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">Statistiques utilisateurs</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
