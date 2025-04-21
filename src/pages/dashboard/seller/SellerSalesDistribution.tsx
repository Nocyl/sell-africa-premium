
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";

const pieData = [
  { name: "Formations", value: 65 },
  { name: "Produits digitaux", value: 25 },
  { name: "Produits physiques", value: 10 },
];

const COLORS = ['#8884d8', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function SellerSalesDistribution() {
  const navigate = useNavigate();
  return (
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
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Pourcentage"]} wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
