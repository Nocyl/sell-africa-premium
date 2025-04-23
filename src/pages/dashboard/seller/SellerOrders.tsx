
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  PackageCheck, 
  Truck, 
  AlertCircle, 
  CheckCircle2
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types pour les commandes
type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: OrderStatus;
  paymentStatus: "paid" | "pending" | "failed";
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    type: "product" | "course";
  }[];
}

// Mock data
const mockOrders: Order[] = Array.from({ length: 25 }, (_, i) => {
  const statuses: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"];
  const paymentStatuses = ["paid", "pending", "failed"];
  const productTypes = ["product", "course"];
  
  const status = statuses[Math.floor(Math.random() * statuses.length)] as OrderStatus;
  const paymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)] as "paid" | "pending" | "failed";
  
  return {
    id: `order-${i + 1}`,
    orderNumber: `#${(Math.floor(Math.random() * 90000) + 10000).toString()}`,
    customerName: `Client ${i + 1}`,
    customerEmail: `client${i + 1}@example.com`,
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString("fr-FR"),
    total: Math.floor(Math.random() * 400) + 20,
    status,
    paymentStatus,
    items: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => {
      const type = productTypes[Math.floor(Math.random() * productTypes.length)] as "product" | "course";
      return {
        id: `item-${j + 1}`,
        name: type === "product" ? `Produit ${j + 1}` : `Cours ${j + 1}`,
        quantity: Math.floor(Math.random() * 3) + 1,
        price: Math.floor(Math.random() * 100) + 10,
        type
      };
    })
  };
});

export default function SellerOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("all");
  
  const itemsPerPage = 10;
  
  // Filtrer les commandes en fonction des critères
  const filteredOrders = orders.filter(order => {
    // Filtre de recherche
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtre par statut
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    // Filtre par onglet
    let matchesTab = true;
    if (selectedTab === "digital") {
      matchesTab = order.items.some(item => item.type === "course");
    } else if (selectedTab === "physical") {
      matchesTab = order.items.some(item => item.type === "product");
    }
    
    return matchesSearch && matchesStatus && matchesTab;
  });
  
  // Pagination
  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);
  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Status badge color
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En attente</Badge>;
      case "processing":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">En traitement</Badge>;
      case "shipped":
        return <Badge variant="outline" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Expédié</Badge>;
      case "delivered":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Livré</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Annulé</Badge>;
      case "refunded":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Remboursé</Badge>;
    }
  };
  
  // Payment status badge
  const getPaymentBadge = (status: "paid" | "pending" | "failed") => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Payé</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En attente</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Échoué</Badge>;
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Commandes</h1>
            <p className="text-muted-foreground">
              Gérez et suivez toutes vos commandes
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => console.log("Export")}>
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">Toutes les commandes</TabsTrigger>
            <TabsTrigger value="digital">Produits digitaux</TabsTrigger>
            <TabsTrigger value="physical">Produits physiques</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Liste des commandes</CardTitle>
            <CardDescription>
              {filteredOrders.length} commande{filteredOrders.length > 1 ? "s" : ""} au total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative w-full sm:w-64 flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              
              <Select 
                value={statusFilter} 
                onValueChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filtrer par statut" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="processing">En traitement</SelectItem>
                  <SelectItem value="shipped">Expédié</SelectItem>
                  <SelectItem value="delivered">Livré</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                  <SelectItem value="refunded">Remboursé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Commande</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Paiement</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedOrders.length > 0 ? (
                    displayedOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.orderNumber}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.customerName}</div>
                            <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>{getPaymentBadge(order.paymentStatus)}</TableCell>
                        <TableCell className="text-right">{order.total.toFixed(2)} €</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => console.log(`View order ${order.id}`)}>
                                Voir les détails
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => console.log(`Update status ${order.id}`)}>
                                Mettre à jour le statut
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => console.log(`Send email ${order.id}`)}>
                                Envoyer un email
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center py-8">
                          <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                          <h3 className="font-medium text-lg mb-1">Aucune commande trouvée</h3>
                          <p className="text-muted-foreground text-sm">
                            Essayez d'ajuster vos filtres ou votre recherche.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {pageCount > 1 && (
              <div className="mt-4 flex justify-end">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <PaginationPrevious />
                      </Button>
                    </PaginationItem>
                    
                    {Array.from({ length: pageCount }, (_, i) => i + 1)
                      .filter(page => (
                        page === 1 ||
                        page === pageCount ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ))
                      .map((page, i, array) => {
                        // Ajouter des ellipses si nécessaire
                        if (i > 0 && page - array[i - 1] > 1) {
                          return (
                            <React.Fragment key={`ellipsis-${page}`}>
                              <PaginationItem>
                                <span className="px-4 py-2">...</span>
                              </PaginationItem>
                              <PaginationItem>
                                <PaginationLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(page);
                                  }}
                                  isActive={page === currentPage}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            </React.Fragment>
                          );
                        }
                        
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(page);
                              }}
                              isActive={page === currentPage}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                    
                    <PaginationItem>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                        disabled={currentPage === pageCount}
                      >
                        <PaginationNext />
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Commandes récentes</CardTitle>
              <CardDescription>Dernières commandes reçues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-start space-x-3 border-b pb-3 last:border-0">
                    <div className={`p-2 rounded-full ${
                      order.status === "delivered" ? "bg-green-100" :
                      order.status === "shipped" ? "bg-blue-100" : 
                      order.status === "processing" ? "bg-indigo-100" : 
                      "bg-yellow-100"
                    }`}>
                      {order.status === "delivered" ? <CheckCircle2 className="h-4 w-4 text-green-700" /> :
                       order.status === "shipped" ? <Truck className="h-4 w-4 text-blue-700" /> :
                       <PackageCheck className="h-4 w-4 text-yellow-700" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{order.orderNumber}</p>
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                        </div>
                        <p className="font-medium">{order.total.toFixed(2)} €</p>
                      </div>
                      <p className="text-sm mt-1">{order.customerName}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => navigate("/seller/orders")}>
                Voir toutes les commandes
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Statut des commandes</CardTitle>
              <CardDescription>Répartition par statut</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["pending", "processing", "shipped", "delivered", "cancelled"].map((status) => {
                  const count = orders.filter(order => order.status === status).length;
                  const percentage = Math.round((count / orders.length) * 100) || 0;
                  
                  return (
                    <div key={status} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{status === "pending" ? "En attente" :
                              status === "processing" ? "En traitement" :
                              status === "shipped" ? "Expédié" :
                              status === "delivered" ? "Livré" :
                              "Annulé"}</span>
                        <span>{count} ({percentage}%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            status === "delivered" ? "bg-green-500" :
                            status === "shipped" ? "bg-blue-500" :
                            status === "processing" ? "bg-indigo-500" :
                            status === "cancelled" ? "bg-red-500" :
                            "bg-yellow-500"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Gérez vos commandes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" onClick={() => console.log("Pending orders")}>
                <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                Commandes en attente ({orders.filter(o => o.status === "pending").length})
              </Button>
              
              <Button variant="outline" className="w-full justify-start" onClick={() => console.log("Processing orders")}>
                <PackageCheck className="mr-2 h-4 w-4 text-indigo-500" />
                Commandes en traitement ({orders.filter(o => o.status === "processing").length})
              </Button>
              
              <Button variant="outline" className="w-full justify-start" onClick={() => console.log("Shipped orders")}>
                <Truck className="mr-2 h-4 w-4 text-blue-500" />
                Commandes expédiées ({orders.filter(o => o.status === "shipped").length})
              </Button>
              
              <Button variant="outline" className="w-full justify-start" onClick={() => console.log("Payment pending")}>
                <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                Paiements en attente ({orders.filter(o => o.paymentStatus === "pending").length})
              </Button>
              
              <Button className="w-full mt-2" onClick={() => console.log("Create order")}>
                Créer une commande manuelle
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
