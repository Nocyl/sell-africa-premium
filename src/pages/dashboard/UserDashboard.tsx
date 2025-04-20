
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingBag,
  GraduationCap,
  Star,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function UserDashboard() {
  const navigate = useNavigate();

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
      color: "text-yellow-600",
      href: "/dashboard/profile"
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

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title} className="relative overflow-hidden">
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

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Derniers cours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Placeholder for courses list */}
              <p className="text-muted-foreground text-sm">
                Vous n'avez pas encore de cours.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate("/courses")}
              >
                Découvrir les cours
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dernières commandes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Placeholder for orders list */}
              <p className="text-muted-foreground text-sm">
                Vous n'avez pas encore de commandes.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate("/products")}
              >
                Découvrir les produits
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
