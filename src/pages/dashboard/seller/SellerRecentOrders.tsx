
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const recentOrders = [
  { id: "WS87654", customer: "Marie Durand", date: "20 Avr 2025", status: "completed", total: "25.000 FCFA" },
  { id: "WS87655", customer: "Thomas Dupont", date: "19 Avr 2025", status: "processing", total: "15.000 FCFA" },
  { id: "WS87656", customer: "Sophie Martin", date: "18 Avr 2025", status: "completed", total: "8.000 FCFA" },
  { id: "WS87657", customer: "Lucas Bertrand", date: "17 Avr 2025", status: "completed", total: "12.000 FCFA" },
  { id: "WS87658", customer: "Camille Dubois", date: "16 Avr 2025", status: "processing", total: "7.000 FCFA" },
];

export default function SellerRecentOrders() {
  const navigate = useNavigate();
  return (
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
  );
}
