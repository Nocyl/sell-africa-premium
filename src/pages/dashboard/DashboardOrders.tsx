
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Search, Filter, Download, Eye, FileText } from "lucide-react";

// Données simulées pour les commandes
const orders = [
  {
    id: "WS123456",
    date: "20 Avr 2025",
    product: "Formation React Développeur Front End",
    type: "course",
    status: "completed",
    total: "25.000 FCFA",
    payment: "Carte bancaire"
  },
  {
    id: "WS123457",
    date: "15 Avr 2025",
    product: "T-shirt WorldSell",
    type: "physical",
    status: "shipped",
    total: "8.000 FCFA",
    payment: "Mobile Money"
  },
  {
    id: "WS123458",
    date: "10 Avr 2025",
    product: "UI/UX Design Kit",
    type: "digital",
    status: "completed",
    total: "15.000 FCFA",
    payment: "PayPal"
  },
  {
    id: "WS123459",
    date: "5 Avr 2025",
    product: "Guide marketing digital",
    type: "digital",
    status: "completed",
    total: "12.000 FCFA",
    payment: "Carte bancaire"
  },
  {
    id: "WS123460",
    date: "1 Avr 2025",
    product: "Casquette WorldSell",
    type: "physical",
    status: "processing",
    total: "5.000 FCFA",
    payment: "Mobile Money"
  },
  {
    id: "WS123461",
    date: "28 Mar 2025",
    product: "Formation WordPress Avancé",
    type: "course",
    status: "completed",
    total: "18.000 FCFA",
    payment: "Carte bancaire"
  },
  {
    id: "WS123462",
    date: "25 Mar 2025",
    product: "Template Portfolio Pro",
    type: "digital",
    status: "completed",
    total: "10.000 FCFA",
    payment: "PayPal"
  },
];

// Carte d'aperçu pour afficher les détails d'une commande spécifique
const OrderDetails = ({ order }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{order.product}</h3>
          <p className="text-sm text-muted-foreground">Commande #{order.id}</p>
        </div>
        <Badge
          className={
            order.status === "completed"
              ? "bg-green-100 text-green-800"
              : order.status === "shipped"
              ? "bg-blue-100 text-blue-800"
              : "bg-yellow-100 text-yellow-800"
          }
        >
          {order.status === "completed"
            ? "Terminé"
            : order.status === "shipped"
            ? "Expédié"
            : "En traitement"}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
          <p>{order.date}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Montant</h4>
          <p className="font-medium">{order.total}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Méthode de paiement</h4>
          <p>{order.payment}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
          <p>{order.type === "physical" ? "Produit physique" : order.type === "digital" ? "Produit digital" : "Formation"}</p>
        </div>
      </div>

      {order.type === "physical" && (
        <div className="border rounded-lg p-4 space-y-3">
          <h4 className="font-medium">Informations de livraison</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Adresse</p>
              <p>123 Rue Exemple</p>
            </div>
            <div>
              <p className="text-muted-foreground">Ville</p>
              <p>Dakar</p>
            </div>
            <div>
              <p className="text-muted-foreground">Pays</p>
              <p>Sénégal</p>
            </div>
            <div>
              <p className="text-muted-foreground">Code postal</p>
              <p>12345</p>
            </div>
          </div>
          {order.status === "shipped" && (
            <div className="pt-2">
              <p className="text-muted-foreground">Numéro de suivi</p>
              <code className="text-xs bg-muted p-1 rounded">WS-TRACK-{order.id.slice(-6)}</code>
            </div>
          )}
        </div>
      )}

      {(order.type === "digital" || order.type === "course") && (
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3">Téléchargement/Accès</h4>
          <Button className="w-full">
            {order.type === "digital" ? "Télécharger" : "Accéder au cours"}
          </Button>
        </div>
      )}

      <div>
        <h4 className="font-medium mb-2">Actions</h4>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Facture
          </Button>
          <Button variant="outline" size="sm">
            Contacter le support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function DashboardOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // 'list' ou 'grid'

  // Filtrer les commandes en fonction des critères
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" &&
        (order.status === "processing" || order.status === "shipped")) ||
      order.status === filterStatus;

    const matchesType = filterType === "all" || order.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Fonction pour voir les détails d'une commande
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Mes commandes</h1>
          <p className="text-muted-foreground">
            Historique et suivi de vos commandes
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-8 w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4 mr-1" />
                  Filtres
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtrer les commandes</SheetTitle>
                  <SheetDescription>
                    Ajustez les filtres pour trouver vos commandes
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="completed">Terminé</SelectItem>
                        <SelectItem value="shipped">Expédié</SelectItem>
                        <SelectItem value="processing">En traitement</SelectItem>
                        <SelectItem value="active">Actifs (En traitement & Expédié)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type de produit</Label>
                    <Select
                      value={filterType}
                      onValueChange={setFilterType}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les types</SelectItem>
                        <SelectItem value="physical">Produits physiques</SelectItem>
                        <SelectItem value="digital">Produits digitaux</SelectItem>
                        <SelectItem value="course">Formations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Appliquer les filtres</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-2">
            <Tabs
              value={viewMode}
              onValueChange={setViewMode}
              className="w-[180px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">Liste</TabsTrigger>
                <TabsTrigger value="grid">Grille</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          {viewMode === "list" ? (
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>N° Commande</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="hidden md:table-cell">Produit</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="hidden sm:table-cell">Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                              {order.product}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  order.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "shipped"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {order.status === "completed"
                                  ? "Terminé"
                                  : order.status === "shipped"
                                  ? "Expédié"
                                  : "En traitement"}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {order.total}
                            </TableCell>
                            <TableCell className="text-right">
                              <Sheet>
                                <SheetTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => viewOrderDetails(order)}
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    <span className="hidden sm:inline">Détails</span>
                                  </Button>
                                </SheetTrigger>
                                <SheetContent>
                                  <SheetHeader>
                                    <SheetTitle>Détails de la commande</SheetTitle>
                                  </SheetHeader>
                                  <div className="py-4">
                                    <OrderDetails order={order} />
                                  </div>
                                </SheetContent>
                              </Sheet>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="h-24 text-center"
                          >
                            Aucune commande trouvée.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{order.id}</CardTitle>
                          <CardDescription>{order.date}</CardDescription>
                        </div>
                        <Badge
                          className={
                            order.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {order.status === "completed"
                            ? "Terminé"
                            : order.status === "shipped"
                            ? "Expédié"
                            : "En traitement"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 font-medium line-clamp-1">{order.product}</p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">
                          {order.type === "physical"
                            ? "Produit physique"
                            : order.type === "digital"
                            ? "Produit digital"
                            : "Formation"}
                        </Badge>
                        <span className="font-bold">{order.total}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            className="w-full"
                            onClick={() => viewOrderDetails(order)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Voir les détails
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Détails de la commande</SheetTitle>
                          </SheetHeader>
                          <div className="py-4">
                            <OrderDetails order={order} />
                          </div>
                        </SheetContent>
                      </Sheet>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full py-10 text-center">
                  <p className="text-muted-foreground">Aucune commande trouvée.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
