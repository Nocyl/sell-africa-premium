
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  PlusCircle, 
  Gift, 
  Tag, 
  Calendar, 
  Trash2,
  Clock,
  Users,
  LayoutGrid as LayoutGridIcon,
} from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed" | "free_shipping";
  value: number;
  startDate: string;
  endDate: string;
  status: "active" | "scheduled" | "expired" | "inactive";
  description?: string;
  minPurchase?: number;
  usageLimit?: number;
  usageCount: number;
  customerType: "all" | "new" | "returning";
  maxUsesPerCustomer?: number;
}

const mockCoupons: Coupon[] = [
  {
    id: "coupon1",
    code: "BIENVENUE20",
    type: "percentage",
    value: 20,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "active",
    description: "20% de réduction pour les nouveaux clients",
    minPurchase: 50,
    usageLimit: 1000,
    usageCount: 143,
    customerType: "new",
    maxUsesPerCustomer: 1
  },
  {
    id: "coupon2",
    code: "ETE2023",
    type: "fixed",
    value: 15,
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    status: "scheduled",
    description: "15€ de réduction pour l'été",
    minPurchase: 75,
    usageLimit: 500,
    usageCount: 0,
    customerType: "all"
  },
  {
    id: "coupon3",
    code: "FREESHIP",
    type: "free_shipping",
    value: 0,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "active",
    description: "Livraison gratuite sans minimum d'achat",
    usageLimit: 2000,
    usageCount: 876,
    customerType: "all"
  },
  {
    id: "coupon4",
    code: "NOEL2024",
    type: "percentage",
    value: 25,
    startDate: "2024-12-01",
    endDate: "2024-12-25",
    status: "expired",
    description: "25% de réduction pour Noël",
    minPurchase: 100,
    usageLimit: 1000,
    usageCount: 932,
    customerType: "all"
  }
];

export default function SellerCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("list");
  const [showNewCoupon, setShowNewCoupon] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  
  // State pour le formulaire de nouveau coupon
  const [newCoupon, setNewCoupon] = useState<Partial<Coupon>>({
    type: "percentage",
    value: 10,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: "inactive",
    customerType: "all",
    usageCount: 0
  });
  
  const handleCreateCoupon = () => {
    if (!newCoupon.code) {
      toast.error("Veuillez entrer un code pour le coupon");
      return;
    }
    
    // Vérification que le code n'existe pas déjà
    if (coupons.some(c => c.code === newCoupon.code)) {
      toast.error("Ce code existe déjà. Veuillez en choisir un autre.");
      return;
    }
    
    const coupon: Coupon = {
      id: `coupon${coupons.length + 1}`,
      code: newCoupon.code || "NEWCODE",
      type: newCoupon.type as "percentage" | "fixed" | "free_shipping",
      value: newCoupon.value || 0,
      startDate: newCoupon.startDate || new Date().toISOString().split('T')[0],
      endDate: newCoupon.endDate || new Date().toISOString().split('T')[0],
      status: newCoupon.status as "active" | "scheduled" | "expired" | "inactive",
      description: newCoupon.description,
      minPurchase: newCoupon.minPurchase,
      usageLimit: newCoupon.usageLimit,
      usageCount: 0,
      customerType: newCoupon.customerType as "all" | "new" | "returning",
      maxUsesPerCustomer: newCoupon.maxUsesPerCustomer
    };
    
    setCoupons([...coupons, coupon]);
    setShowNewCoupon(false);
    setNewCoupon({
      type: "percentage",
      value: 10,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "inactive",
      customerType: "all",
      usageCount: 0
    });
    
    toast.success("Coupon créé avec succès!");
  };
  
  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter(c => c.id !== id));
    toast.success("Coupon supprimé avec succès");
  };
  
  const getStatusBadge = (status: "active" | "scheduled" | "expired" | "inactive") => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Programmé</Badge>;
      case "expired":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Expiré</Badge>;
      case "inactive":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Inactif</Badge>;
    }
  };
  
  const getCouponTypeLabel = (type: string) => {
    switch (type) {
      case "percentage":
        return "Pourcentage";
      case "fixed":
        return "Montant fixe";
      case "free_shipping":
        return "Livraison gratuite";
      default:
        return type;
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Codes Promo</h1>
            <p className="text-muted-foreground">
              Créez et gérez vos codes promo pour fidéliser vos clients
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                setShowNewCoupon(true);
                setSelectedCoupon(null);
              }}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Nouveau code promo
            </Button>
          </div>
        </div>
        
        {showNewCoupon ? (
          <Card>
            <CardHeader>
              <CardTitle>Créer un nouveau code promo</CardTitle>
              <CardDescription>
                Configurez les détails de votre code promo pour vos clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-6 pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="code">Code promo</Label>
                        <Input 
                          id="code" 
                          placeholder="ex: BIENVENUE20" 
                          value={newCoupon.code || ""}
                          onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Utilisez un code mémorable et facile à partager
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="type">Type de réduction</Label>
                        <Select 
                          value={newCoupon.type} 
                          onValueChange={(value: "percentage" | "fixed" | "free_shipping") => setNewCoupon({...newCoupon, type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">Pourcentage de réduction</SelectItem>
                            <SelectItem value="fixed">Montant fixe</SelectItem>
                            <SelectItem value="free_shipping">Livraison gratuite</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {newCoupon.type !== "free_shipping" && (
                        <div>
                          <Label htmlFor="value">
                            {newCoupon.type === "percentage" ? "Pourcentage de réduction" : "Montant de réduction (€)"}
                          </Label>
                          <Input 
                            id="value" 
                            type="number" 
                            placeholder="ex: 20" 
                            value={newCoupon.value || ""}
                            onChange={(e) => setNewCoupon({...newCoupon, value: parseFloat(e.target.value)})}
                          />
                        </div>
                      )}
                      
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description" 
                          placeholder="Décrivez votre code promo" 
                          rows={3}
                          value={newCoupon.description || ""}
                          onChange={(e) => setNewCoupon({...newCoupon, description: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startDate">Date de début</Label>
                          <Input 
                            id="startDate" 
                            type="date" 
                            value={newCoupon.startDate}
                            onChange={(e) => setNewCoupon({...newCoupon, startDate: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="endDate">Date de fin</Label>
                          <Input 
                            id="endDate" 
                            type="date" 
                            value={newCoupon.endDate}
                            onChange={(e) => setNewCoupon({...newCoupon, endDate: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="customerType">Type de client</Label>
                        <Select 
                          value={newCoupon.customerType} 
                          onValueChange={(value: "all" | "new" | "returning") => setNewCoupon({...newCoupon, customerType: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous les clients</SelectItem>
                            <SelectItem value="new">Nouveaux clients uniquement</SelectItem>
                            <SelectItem value="returning">Clients fidèles uniquement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="minPurchase">Montant d'achat minimum (€)</Label>
                        <Input 
                          id="minPurchase" 
                          type="number" 
                          placeholder="ex: 50" 
                          value={newCoupon.minPurchase || ""}
                          onChange={(e) => setNewCoupon({...newCoupon, minPurchase: parseFloat(e.target.value)})}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Laissez vide s'il n'y a pas de minimum d'achat.
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="usageLimit">Nombre d'utilisations max</Label>
                        <Input 
                          id="usageLimit" 
                          type="number" 
                          placeholder="ex: 100" 
                          value={newCoupon.usageLimit || ""}
                          onChange={(e) => setNewCoupon({...newCoupon, usageLimit: parseFloat(e.target.value)})}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Laissez vide pour une utilisation illimitée.
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="maxUsesPerCustomer">Utilisations max par client</Label>
                        <Input 
                          id="maxUsesPerCustomer" 
                          type="number" 
                          placeholder="ex: 1" 
                          value={newCoupon.maxUsesPerCustomer || ""}
                          onChange={(e) => setNewCoupon({...newCoupon, maxUsesPerCustomer: parseFloat(e.target.value)})}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Laissez vide pour une utilisation illimitée par client.
                        </p>
                      </div>
                      
                      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base">Activer immédiatement</Label>
                          <p className="text-sm text-muted-foreground">
                            Le code promo sera actif dès sa création
                          </p>
                        </div>
                        <Switch
                          checked={newCoupon.status === "active"}
                          onCheckedChange={(checked) => 
                            setNewCoupon({...newCoupon, status: checked ? "active" : "inactive"})
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowNewCoupon(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateCoupon}>
                Créer le code promo
              </Button>
            </CardFooter>
          </Card>
        ) : selectedCoupon ? (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedCoupon.code}</CardTitle>
                  <CardDescription>
                    {selectedCoupon.description || "Aucune description"}
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => setSelectedCoupon(null)}>
                  Retour
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Coupon details would go here */}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 font-medium">Code</th>
                      <th className="text-left p-3 font-medium">Type</th>
                      <th className="text-left p-3 font-medium">Valeur</th>
                      <th className="text-left p-3 font-medium">Période</th>
                      <th className="text-left p-3 font-medium">Utilisations</th>
                      <th className="text-left p-3 font-medium">Statut</th>
                      <th className="text-right p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map(coupon => (
                      <tr 
                        key={coupon.id} 
                        className="border-t transition-colors hover:bg-muted/50 cursor-pointer"
                        onClick={() => setSelectedCoupon(coupon)}
                      >
                        <td className="p-3">
                          <div className="font-mono bg-gray-100 px-2 py-1 rounded text-sm inline-block">
                            {coupon.code}
                          </div>
                        </td>
                        <td className="p-3">{getCouponTypeLabel(coupon.type)}</td>
                        <td className="p-3">
                          {coupon.type === "percentage" 
                            ? `${coupon.value}%` 
                            : coupon.type === "fixed" 
                              ? `${coupon.value}€`
                              : "Gratuite"
                          }
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span className="text-sm">
                              {new Date(coupon.startDate).toLocaleDateString("fr-FR", { month: "short", day: "numeric" })}
                              {" — "}
                              {new Date(coupon.endDate).toLocaleDateString("fr-FR", { month: "short", day: "numeric" })}
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="text-sm">
                            {coupon.usageCount}
                            {coupon.usageLimit && 
                              <span className="text-muted-foreground">/{coupon.usageLimit}</span>
                            }
                          </span>
                        </td>
                        <td className="p-3">
                          {getStatusBadge(coupon.status)}
                        </td>
                        <td className="p-3 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteCoupon(coupon.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
