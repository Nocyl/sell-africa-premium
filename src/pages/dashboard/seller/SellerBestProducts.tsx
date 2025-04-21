
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Cell } from "recharts";
import { useNavigate } from "react-router-dom";

const barData = [
  { name: "Formation React", value: 25000 },
  { name: "T-shirt WorldSell", value: 8000 },
  { name: "UI/UX Design Kit", value: 15000 },
  { name: "Pack Tools", value: 12000 },
  { name: "Guide Marketing", value: 7000 },
];

const COLORS = ['#8884d8', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function SellerBestProducts() {
  const navigate = useNavigate();
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Produits les plus vendus</CardTitle>
        <Button variant="outline" size="sm" onClick={() => navigate("/seller/products")}>
          <EyeIcon className="h-4 w-4 mr-2" />
          Tous les produits
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={barData}
              margin={{ top: 5, right: 10, left: 10, bottom: 50 }}
            >
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                width={60}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip 
                formatter={(value) => [`${Number(value).toLocaleString()} FCFA`, "Prix"]} 
                wrapperStyle={{ fontSize: '12px' }}
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              >
                {barData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
