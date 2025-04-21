
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Banknote,
  ShoppingBag,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

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
  },
];

export default function SellerStatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={cn("h-4 w-4", stat.color)} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div
              className={cn(
                "flex items-center text-xs mt-1",
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              )}
            >
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
  );
}
