
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useState } from "react";

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

export default function SellerSalesOverview() {
  const [period, setPeriod] = useState("month");
  return (
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
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis
                tickFormatter={(value) =>
                  new Intl.NumberFormat("fr-FR", {
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(value)
                }
                tick={{ fontSize: 12 }}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip
                formatter={(value) =>
                  new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "XOF",
                    maximumFractionDigits: 0,
                  }).format(Number(value))
                }
                wrapperStyle={{ fontSize: "12px" }}
              />
              <Area type="monotone" dataKey="sales" stroke="#8884d8" fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
