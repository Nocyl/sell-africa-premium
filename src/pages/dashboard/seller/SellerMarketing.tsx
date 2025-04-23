
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  PlusCircle, 
  Tag, 
  Search,
  PercentSquare, 
  Globe, 
  Calendar, 
  Users, 
  Gift, 
  BarChart, 
  Mail, 
  MessageSquare,
  Megaphone, 
  Trash2,
  AlertTriangle,
  Link as LinkIcon,
  Clock,
  ArrowRight,
  LayoutGrid as LayoutGridIcon,
} from "lucide-react";
import EmptyState from "@/components/dashboard/seller/EmptyState";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import MediaUploader from "@/components/dashboard/seller/MediaUploader";

interface Promotion {
  id: string;
  name: string;
  type: "percentage" | "fixed" | "buy_get" | "free_shipping";
  value: number;
  code?: string;
  startDate: string;
  endDate: string;
  status: "active" | "scheduled" | "expired" | "draft";
  description?: string;
  products: string[];
  minPurchase?: number;
  usageLimit?: number;
  usageCount: number;
  customerType: "all" | "new" | "returning";
  image?: string;
}

const mockPromotions: Promotion[] = [
  {
    id: "promo1",
    name: "Soldes d'été",
    type: "percentage",
    value: 20,
    code: "SUMMER20",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    status: "scheduled",
    description: "20% de réduction sur tous les produits",
    products: ["all"],
    minPurchase: 50,
    usageLimit: 100,
    usageCount: 0,
    customerType: "all",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=promo1"
  },
  {
    id: "promo2",
    name: "Bienvenue",
    type: "fixed",
    value: 10,
    code: "WELCOME10",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "active",
    description: "10€ de réduction pour les nouveaux clients",
    products: ["all"],
    minPurchase: 30,
    usageLimit: 1000,
    usageCount: 156,
    customerType: "new",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=promo2"
  },
  {
    id: "promo3",
    name: "Livraison gratuite",
    type: "free_shipping",
    value: 0,
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    status: "active",
    description: "Livraison gratuite pour toutes les commandes",
    products: ["all"],
    minPurchase: 75,
    usageLimit: 500,
    usageCount: 89,
    customerType: "all",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=promo3"
  },
  {
    id: "promo4",
    name: "Acheter 1, Obtenir 1",
    type: "buy_get",
    value: 1,
    code: "BOGO",
    startDate: "2025-03-15",
    endDate: "2025-03-30",
    status: "expired",
    description: "Achetez un produit, obtenez-en un gratuitement",
    products: ["product1", "product2"],
    usageLimit: 200,
    usageCount: 184,
    customerType: "all",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=promo4"
  }
];

export default function SellerMarketing() {
  const [activeTab, setActiveTab] = useState("promotions");
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid");
  const [showNewPromotion, setShowNewPromotion] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  
  // State pour le formulaire de nouvelle promotion
  const [newPromotion, setNewPromotion] = useState<Partial<Promotion>>({
    type: "percentage",
    value: 10,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: "draft",
    customerType: "all",
    usageCount: 0,
    products: ["all"]
  });
  
  const [whatsappSettings, setWhatsappSettings] = useState({
    enabled: false,
    phoneNumber: "",
    welcomeMessage: "Bonjour! Merci de nous contacter. Comment puis-je vous aider aujourd'hui?",
    autoResponses: true
  });
  
  const handleCreatePromotion = () => {
    if (!newPromotion.name) {
      toast.error("Veuillez entrer un nom pour la promotion");
      return;
    }
    
    const promotion: Promotion = {
      id: `promo${promotions.length + 1}`,
      name: newPromotion.name || "Nouvelle promotion",
      type: newPromotion.type as "percentage" | "fixed" | "buy_get" | "free_shipping",
      value: newPromotion.value || 0,
      code: newPromotion.code,
      startDate: newPromotion.startDate || new Date().toISOString().split('T')[0],
      endDate: newPromotion.endDate || new Date().toISOString().split('T')[0],
      status: newPromotion.status as "active" | "scheduled" | "expired" | "draft",
      description: newPromotion.description,
      products: newPromotion.products || ["all"],
      minPurchase: newPromotion.minPurchase,
      usageLimit: newPromotion.usageLimit,
      usageCount: 0,
      customerType: newPromotion.customerType as "all" | "new" | "returning",
      image: newPromotion.image || `https://api.dicebear.com/7.x/shapes/svg?seed=promo${Date.now()}`
    };
    
    setPromotions([...promotions, promotion]);
    setShowNewPromotion(false);
    setNewPromotion({
      type: "percentage",
      value: 10,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "draft",
      customerType: "all",
      usageCount: 0,
      products: ["all"]
    });
    
    toast.success("Promotion créée avec succès!");
  };
  
  const deletePromotion = (id: string) => {
    setPromotions(promotions.filter(p => p.id !== id));
    toast.success("Promotion supprimée avec succès");
  };
  
  const saveWhatsAppSettings = () => {
    // Enregistrement des paramètres WhatsApp
    toast.success("Paramètres WhatsApp enregistrés avec succès");
  };
  
  const getStatusBadge = (status: "active" | "scheduled" | "expired" | "draft") => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Programmée</Badge>;
      case "expired":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Expirée</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Brouillon</Badge>;
    }
  };
  
  const getPromotionTypeLabel = (type: string) => {
    switch (type) {
      case "percentage":
        return "Pourcentage";
      case "fixed":
        return "Montant fixe";
      case "buy_get":
        return "Achetez X, obtenez Y";
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
            <h1 className="text-2xl font-bold">Marketing</h1>
            <p className="text-muted-foreground">
              Créez et gérez vos campagnes marketing
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                setShowNewPromotion(true);
                setSelectedPromotion(null);
              }}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Nouvelle promotion
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="promotions">
              <Tag className="h-4 w-4 mr-2" />
              Promotions
            </TabsTrigger>
            <TabsTrigger value="coupons">
              <Gift className="h-4 w-4 mr-2" />
              Codes promo
            </TabsTrigger>
            <TabsTrigger value="whatsapp">
              <MessageSquare className="h-4 w-4 mr-2" />
              WhatsApp
              <Badge className="ml-2 bg-purple-100 text-purple-800 hover:bg-purple-100">Pro</Badge>
            </TabsTrigger>
            <TabsTrigger value="stats">
              <BarChart className="h-4 w-4 mr-2" />
              Statistiques
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="promotions">
            {showNewPromotion ? (
              <Card>
                <CardHeader>
                  <CardTitle>Créer une nouvelle promotion</CardTitle>
                  <CardDescription>
                    Configurez les détails de votre promotion pour attirer plus de clients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-6 pr-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Nom de la promotion</Label>
                            <Input 
                              id="name" 
                              placeholder="ex: Soldes d'été" 
                              value={newPromotion.name || ""}
                              onChange={(e) => setNewPromotion({...newPromotion, name: e.target.value})}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="type">Type de promotion</Label>
                            <Select 
                              value={newPromotion.type} 
                              onValueChange={(value: "percentage" | "fixed" | "buy_get" | "free_shipping") => setNewPromotion({...newPromotion, type: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="percentage">
                                  <div className="flex items-center">
                                    <PercentSquare className="h-4 w-4 mr-2" />
                                    <span>Pourcentage de réduction</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="fixed">
                                  <div className="flex items-center">
                                    <Tag className="h-4 w-4 mr-2" />
                                    <span>Montant fixe</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="buy_get">
                                  <div className="flex items-center">
                                    <Gift className="h-4 w-4 mr-2" />
                                    <span>Achetez X, obtenez Y</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="free_shipping">
                                  <div className="flex items-center">
                                    <Megaphone className="h-4 w-4 mr-2" />
                                    <span>Livraison gratuite</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="value">
                              {newPromotion.type === "percentage" ? "Pourcentage de réduction" :
                               newPromotion.type === "fixed" ? "Montant de réduction (€)" :
                               newPromotion.type === "buy_get" ? "Nombre d'articles offerts" :
                               "Condition"}
                            </Label>
                            {newPromotion.type !== "free_shipping" && (
                              <Input 
                                id="value" 
                                type="number" 
                                placeholder="ex: 20" 
                                value={newPromotion.value || ""}
                                onChange={(e) => setNewPromotion({...newPromotion, value: parseFloat(e.target.value)})}
                              />
                            )}
                            {newPromotion.type === "free_shipping" && (
                              <p className="text-sm text-muted-foreground mt-1">
                                La livraison sera gratuite pour les commandes éligibles.
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <Label htmlFor="code">Code promo (facultatif)</Label>
                            <Input 
                              id="code" 
                              placeholder="ex: SUMMER20" 
                              value={newPromotion.code || ""}
                              onChange={(e) => setNewPromotion({...newPromotion, code: e.target.value.toUpperCase()})}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Laissez vide pour appliquer automatiquement la promotion.
                            </p>
                          </div>
                          
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                              id="description" 
                              placeholder="Décrivez votre promotion" 
                              rows={3}
                              value={newPromotion.description || ""}
                              onChange={(e) => setNewPromotion({...newPromotion, description: e.target.value})}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="startDate">Date de début</Label>
                              <Input 
                                id="startDate" 
                                type="date" 
                                value={newPromotion.startDate}
                                onChange={(e) => setNewPromotion({...newPromotion, startDate: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="endDate">Date de fin</Label>
                              <Input 
                                id="endDate" 
                                type="date" 
                                value={newPromotion.endDate}
                                onChange={(e) => setNewPromotion({...newPromotion, endDate: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <Label>Image de la promotion</Label>
                            <MediaUploader 
                              maxFiles={1} 
                              onUploadComplete={(urls) => setNewPromotion({...newPromotion, image: urls[0]})}
                              existingMedia={newPromotion.image ? [newPromotion.image] : []}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="customerType">Type de client</Label>
                            <Select 
                              value={newPromotion.customerType} 
                              onValueChange={(value: "all" | "new" | "returning") => setNewPromotion({...newPromotion, customerType: value})}
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
                              value={newPromotion.minPurchase || ""}
                              onChange={(e) => setNewPromotion({...newPromotion, minPurchase: parseFloat(e.target.value)})}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Laissez vide s'il n'y a pas de minimum d'achat.
                            </p>
                          </div>
                          
                          <div>
                            <Label htmlFor="usageLimit">Limite d'utilisation</Label>
                            <Input 
                              id="usageLimit" 
                              type="number" 
                              placeholder="ex: 100" 
                              value={newPromotion.usageLimit || ""}
                              onChange={(e) => setNewPromotion({...newPromotion, usageLimit: parseFloat(e.target.value)})}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Laissez vide pour une utilisation illimitée.
                            </p>
                          </div>
                          
                          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <Label className="text-base">Activer immédiatement</Label>
                              <p className="text-sm text-muted-foreground">
                                La promotion sera active dès sa création
                              </p>
                            </div>
                            <Switch
                              checked={newPromotion.status === "active"}
                              onCheckedChange={(checked) => 
                                setNewPromotion({...newPromotion, status: checked ? "active" : "draft"})
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setShowNewPromotion(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleCreatePromotion}>
                    Créer la promotion
                  </Button>
                </CardFooter>
              </Card>
            ) : selectedPromotion ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedPromotion.name}</CardTitle>
                      <CardDescription>
                        {selectedPromotion.description || "Aucune description"}
                      </CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => setSelectedPromotion(null)}>
                      Retour
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img 
                        src={selectedPromotion.image} 
                        alt={selectedPromotion.name}
                        className="w-full aspect-video rounded-md object-cover mb-4"
                      />
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Type</p>
                            <p>{getPromotionTypeLabel(selectedPromotion.type)}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Valeur</p>
                            <p>
                              {selectedPromotion.type === "percentage" 
                                ? `${selectedPromotion.value}%` 
                                : selectedPromotion.type === "fixed" 
                                  ? `${selectedPromotion.value}€`
                                  : selectedPromotion.type === "buy_get"
                                    ? `${selectedPromotion.value} offert${selectedPromotion.value > 1 ? 's' : ''}`
                                    : "Livraison gratuite"
                              }
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Code</p>
                            <p>{selectedPromotion.code || "Automatique"}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Statut</p>
                            <p>{getStatusBadge(selectedPromotion.status)}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Date de début</p>
                            <p>{new Date(selectedPromotion.startDate).toLocaleDateString()}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Date de fin</p>
                            <p>{new Date(selectedPromotion.endDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Client cible</p>
                            <p>
                              {selectedPromotion.customerType === "all" ? "Tous" : 
                               selectedPromotion.customerType === "new" ? "Nouveaux clients" : 
                               "Clients fidèles"}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Achat minimum</p>
                            <p>{selectedPromotion.minPurchase ? `${selectedPromotion.minPurchase}€` : "Aucun"}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Limite d'utilisation</p>
                            <p>{selectedPromotion.usageLimit || "Illimité"}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Utilisations</p>
                            <p>{selectedPromotion.usageCount}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Statistiques</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1 text-center p-4 bg-gray-50 rounded-md">
                              <p className="text-sm text-muted-foreground">Utilisations</p>
                              <p className="text-2xl font-bold">
                                {selectedPromotion.usageCount}
                                {selectedPromotion.usageLimit && (
                                  <span className="text-sm text-muted-foreground font-normal">
                                    /{selectedPromotion.usageLimit}
                                  </span>
                                )}
                              </p>
                            </div>
                            <div className="space-y-1 text-center p-4 bg-gray-50 rounded-md">
                              <p className="text-sm text-muted-foreground">Conversion</p>
                              <p className="text-2xl font-bold">
                                {Math.floor(Math.random() * 80) + 20}%
                              </p>
                            </div>
                            <div className="space-y-1 text-center p-4 bg-gray-50 rounded-md">
                              <p className="text-sm text-muted-foreground">Ventes générées</p>
                              <p className="text-2xl font-bold">
                                {(Math.floor(Math.random() * 2000) + 500).toLocaleString()}€
                              </p>
                            </div>
                            <div className="space-y-1 text-center p-4 bg-gray-50 rounded-md">
                              <p className="text-sm text-muted-foreground">ROI</p>
                              <p className="text-2xl font-bold">
                                {Math.floor(Math.random() * 300) + 100}%
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Lien de promotion</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center">
                            <Input 
                              readOnly 
                              value={`https://votre-site.com/promo/${selectedPromotion.code || selectedPromotion.id}`}
                            />
                            <Button className="ml-2" onClick={() => {
                              toast.success("Lien copié dans le presse-papier");
                            }}>
                              Copier
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Partagez ce lien pour appliquer automatiquement la promotion.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <div className="space-y-4">
                        <Button className="w-full" onClick={() => {
                          toast.success("Promotion activée");
                          const updatedPromotions = promotions.map(p => 
                            p.id === selectedPromotion.id ? { ...p, status: "active" as const } : p
                          );
                          setPromotions(updatedPromotions);
                          setSelectedPromotion({ ...selectedPromotion, status: "active" });
                        }} disabled={selectedPromotion.status === "active"}>
                          {selectedPromotion.status === "active" ? "Promotion active" : "Activer la promotion"}
                        </Button>
                        
                        <Button variant="outline" className="w-full" onClick={() => {
                          toast.info("Promotion désactivée");
                          const updatedPromotions = promotions.map(p => 
                            p.id === selectedPromotion.id ? { ...p, status: "draft" as const } : p
                          );
                          setPromotions(updatedPromotions);
                          setSelectedPromotion({ ...selectedPromotion, status: "draft" });
                        }} disabled={selectedPromotion.status === "draft"}>
                          Désactiver
                        </Button>
                        
                        <Button variant="destructive" className="w-full" onClick={() => {
                          deletePromotion(selectedPromotion.id);
                          setSelectedPromotion(null);
                        }}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-muted-foreground">
                    {promotions.length} promotion{promotions.length > 1 ? "s" : ""}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDisplayMode("grid")}
                      className={displayMode === "grid" ? "bg-muted" : ""}
                    >
                      <LayoutGridIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDisplayMode("list")}
                      className={displayMode === "list" ? "bg-muted" : ""}
                    >
                      <Tag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {displayMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {promotions.map(promotion => (
                      <Card 
                        key={promotion.id} 
                        className="overflow-hidden cursor-pointer transition-all hover:shadow-md"
                        onClick={() => setSelectedPromotion(promotion)}
                      >
                        <div className="aspect-video bg-gray-100 relative">
                          {promotion.image && (
                            <img 
                              src={promotion.image} 
                              alt={promotion.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <div className="absolute top-2 right-2">
                            {getStatusBadge(promotion.status)}
                          </div>
                        </div>
                        <CardContent className="pt-4">
                          <h3 className="font-semibold text-lg mb-1">{promotion.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {promotion.description || "Aucune description"}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>
                                {new Date(promotion.startDate).toLocaleDateString("fr-FR", { month: "short", day: "numeric" })}
                                {" - "}
                                {new Date(promotion.endDate).toLocaleDateString("fr-FR", { month: "short", day: "numeric" })}
                              </span>
                            </div>
                            <div className="font-medium">
                              {promotion.type === "percentage" 
                                ? `${promotion.value}%` 
                                : promotion.type === "fixed" 
                                  ? `${promotion.value}€`
                                  : promotion.type === "buy_get"
                                    ? `${promotion.value} offert${promotion.value > 1 ? 's' : ''}`
                                    : "Livraison gratuite"
                              }
                            </div>
                          </div>
                          
                          {promotion.code && (
                            <div className="mt-2 pt-2 border-t flex items-center justify-between">
                              <div className="text-sm font-medium">Code:</div>
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                {promotion.code}
                              </code>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-0">
                      <div className="rounded-md border overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="text-left p-3 font-medium">Nom</th>
                              <th className="text-left p-3 font-medium">Type</th>
                              <th className="text-left p-3 font-medium">Valeur</th>
                              <th className="text-left p-3 font-medium">Code</th>
                              <th className="text-left p-3 font-medium">Dates</th>
                              <th className="text-left p-3 font-medium">Statut</th>
                              <th className="text-right p-3 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {promotions.map(promotion => (
                              <tr 
                                key={promotion.id} 
                                className="border-t transition-colors hover:bg-muted/50 cursor-pointer"
                                onClick={() => setSelectedPromotion(promotion)}
                              >
                                <td className="p-3">
                                  <div className="font-medium">{promotion.name}</div>
                                </td>
                                <td className="p-3">{getPromotionTypeLabel(promotion.type)}</td>
                                <td className="p-3">
                                  {promotion.type === "percentage" 
                                    ? `${promotion.value}%` 
                                    : promotion.type === "fixed" 
                                      ? `${promotion.value}€`
                                      : promotion.type === "buy_get"
                                        ? `${promotion.value} offert${promotion.value > 1 ? 's' : ''}`
                                        : "Livraison gratuite"
                                  }
                                </td>
                                <td className="p-3">
                                  {promotion.code ? (
                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                      {promotion.code}
                                    </code>
                                  ) : (
                                    <span className="text-muted-foreground">Auto</span>
                                  )}
                                </td>
                                <td className="p-3">
                                  <div className="flex items-center">
                                    <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                    <span className="text-sm">
                                      {new Date(promotion.startDate).toLocaleDateString("fr-FR", { month: "short", day: "numeric" })}
                                      <ArrowRight className="h-3 w-3 inline mx-1" />
                                      {new Date(promotion.endDate).toLocaleDateString("fr-FR", { month: "short", day: "numeric" })}
                                    </span>
                                  </div>
                                </td>
                                <td className="p-3">
                                  {getStatusBadge(promotion.status)}
                                </td>
                                <td className="p-3 text-right">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deletePromotion(promotion.id);
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
              </>
            )}
          </TabsContent>
          
          <TabsContent value="coupons">
            <EmptyState
              title="Codes promo"
              description="Créez et gérez vos codes promo pour offrir des réductions à vos clients."
              icon={<Gift className="h-6 w-6" />}
              actionLabel="Créer un code promo"
              actionLink="/seller/marketing/coupons/new"
              actionOnClick={() => {
                toast.info("Cette fonctionnalité sera disponible prochainement");
              }}
            />
          </TabsContent>
          
          <TabsContent value="whatsapp">
            <Card>
              <CardHeader>
                <CardTitle>Intégration WhatsApp Business</CardTitle>
                <CardDescription>
                  Connectez votre compte WhatsApp Business pour communiquer avec vos clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label className="text-base">Activer WhatsApp</Label>
                      <p className="text-sm text-muted-foreground">
                        Permettre aux clients de vous contacter via WhatsApp
                      </p>
                    </div>
                    <Switch
                      checked={whatsappSettings.enabled}
                      onCheckedChange={(checked) => 
                        setWhatsappSettings({...whatsappSettings, enabled: checked})
                      }
                    />
                  </div>
                  
                  {whatsappSettings.enabled && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
                        <Input 
                          id="phoneNumber" 
                          placeholder="+33 6 12 34 56 78" 
                          value={whatsappSettings.phoneNumber}
                          onChange={(e) => setWhatsappSettings({...whatsappSettings, phoneNumber: e.target.value})}
                        />
                        <p className="text-xs text-muted-foreground">
                          Entrez votre numéro de téléphone professionnel avec l'indicatif du pays
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="welcomeMessage">Message d'accueil</Label>
                        <Textarea 
                          id="welcomeMessage" 
                          placeholder="Bonjour ! Comment puis-je vous aider ?" 
                          rows={3}
                          value={whatsappSettings.welcomeMessage}
                          onChange={(e) => setWhatsappSettings({...whatsappSettings, welcomeMessage: e.target.value})}
                        />
                      </div>
                      
                      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base">Réponses automatiques</Label>
                          <p className="text-sm text-muted-foreground">
                            Activer les réponses automatiques en dehors des heures de bureau
                          </p>
                        </div>
                        <Switch
                          checked={whatsappSettings.autoResponses}
                          onCheckedChange={(checked) => 
                            setWhatsappSettings({...whatsappSettings, autoResponses: checked})
                          }
                        />
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-md flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800">Vérification requise</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            Pour utiliser l'API WhatsApp Business, vous devez vérifier votre compte 
                            professionnel. <a href="#" className="underline font-medium">En savoir plus</a>
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={saveWhatsAppSettings}
                  disabled={!whatsappSettings.enabled || !whatsappSettings.phoneNumber}
                >
                  Enregistrer les paramètres
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats">
            <EmptyState
              title="Statistiques marketing"
              description="Suivez l'efficacité de vos campagnes marketing et mesurez leur impact sur vos ventes."
              icon={<BarChart className="h-6 w-6" />}
              actionLabel="Voir les stats"
              actionLink="/seller/marketing/stats"
              actionOnClick={() => {
                toast.info("Cette fonctionnalité sera disponible prochainement");
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
