
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function DashboardOrders() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Mes commandes</h1>
          <p className="text-muted-foreground">
            Historique de vos commandes
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° Commande</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>WS123456</TableCell>
              <TableCell>20 Avril 2025</TableCell>
              <TableCell>
                <Badge variant="success">Livré</Badge>
              </TableCell>
              <TableCell>25.000 FCFA</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}
