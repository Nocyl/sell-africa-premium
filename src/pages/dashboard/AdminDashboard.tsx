
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  BarChart3, 
  Users, 
  ShoppingCart,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Ventes du mois",
      value: "520.000 FCFA",
      icon: BarChart3,
      color: "text-blue-600",
    },
    {
      title: "Utilisateurs",
      value: "324",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Commandes",
      value: "120",
      icon: ShoppingCart,
      color: "text-yellow-600",
    },
    {
      title: "Produits",
      value: "89",
      icon: Package,
      color: "text-rose-600",
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Administration</h1>
          <p className="text-muted-foreground">
            Tableau de bord administrateur WorldSell
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Ventes récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Chargement des données...
              </p>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Nouveaux utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Chargement des données...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
