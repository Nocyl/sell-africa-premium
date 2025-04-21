
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Eye,
  Link,
  ExternalLink,
  Copy,
  CheckCircle,
  XCircle,
  AlertCircle,
  Check,
  Smartphone
} from "lucide-react";

export default function SellerSettings() {
  const [activeTab, setActiveTab] = useState("boutique");
  const [storeName, setStoreName] = useState("Ma Boutique");
  const [storeDescription, setStoreDescription] = useState("Vente de produits et formations de qualité");
  const [storeLogo, setStoreLogo] = useState("");
  const [storeBanner, setStoreBanner] = useState("");
  const [storeUrl, setStoreUrl] = useState("ma-boutique");
  const [storeActive, setStoreActive] = useState(true);
  const [vacationMode, setVacationMode] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#8B5CF6");
  const [secondaryColor, setSecondaryColor] = useState("#D946EF");
  const [isUrlAvailable, setIsUrlAvailable] = useState(true);
  const [isCheckingUrl, setIsCheckingUrl] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  // Settings states
  const [whatsappIntegration, setWhatsappIntegration] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [automaticEmails, setAutomaticEmails] = useState(true);
  
  // Simuler la vérification de disponibilité d'URL
  useEffect(() => {
    if (storeUrl) {
      setIsCheckingUrl(true);
      const timer = setTimeout(() => {
        // Simuler une vérification - en réalité, cela serait une requête API
        setIsUrlAvailable(storeUrl !== "worldsell" && storeUrl !== "admin");
        setIsCheckingUrl(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [storeUrl]);

  // Simuler la copie du lien boutique
  const copyStoreUrl = () => {
    navigator.clipboard.writeText(`https://worldsell.com/${storeUrl}`);
    toast.success("Lien copié dans le presse-papier");
  };

  const handleSaveBoutique = () => {
    if (!isUrlAvailable) {
      toast.error("L'URL de boutique n'est pas disponible. Veuillez en choisir une autre.");
      return;
    }
    toast.success("Paramètres de la boutique enregistrés avec succès");
  };

  const handleSavePaiement = () => {
    toast.success("Paramètres de paiement enregistrés avec succès");
  };

  const handleSaveNotifications = () => {
    toast.success("Paramètres de notifications enregistrés avec succès");
  };

  const handleSaveMarketing = () => {
    if (!whatsappIntegration) {
      toast.info("Passez au forfait Pro pour accéder aux outils marketing avancés");
    } else {
      toast.success("Paramètres marketing enregistrés avec succès");
    }
  };

  const getStoreUrlStatusIcon = () => {
    if (isCheckingUrl) return <AlertCircle className="h-4 w-4 text-muted-foreground animate-pulse" />;
    if (isUrlAvailable) return <CheckCircle className="h-4 w-4 text-green-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  return (
    <DashboardLayout>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Paramètres du vendeur</CardTitle>
          <CardDescription>
            Configurez votre boutique et vos préférences de vente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="boutique">Boutique</TabsTrigger>
              <TabsTrigger value="paiement">Paiement</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
            </TabsList>

            <TabsContent value="boutique" className="mt-6 space-y-4">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="store-name">Nom de la boutique</Label>
                      <Input
                        id="store-name"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="store-description">Description</Label>
                      <Textarea
                        id="store-description"
                        value={storeDescription}
                        onChange={(e) => setStoreDescription(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="store-logo">Logo de la boutique</Label>
                        <Input
                          id="store-logo"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setStoreLogo(URL.createObjectURL(e.target.files[0]));
                            }
                          }}
                        />
                        {storeLogo && (
                          <div className="mt-2">
                            <img src={storeLogo} alt="Logo preview" className="h-20 object-contain" />
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="store-banner">Bannière</Label>
                        <Input
                          id="store-banner"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setStoreBanner(URL.createObjectURL(e.target.files[0]));
                            }
                          }}
                        />
                        {storeBanner && (
                          <div className="mt-2">
                            <img src={storeBanner} alt="Banner preview" className="h-20 w-full object-cover rounded" />
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="store-url">URL de la boutique</Label>
                        <div className="flex items-center gap-2">
                          {getStoreUrlStatusIcon()}
                          <span className="text-xs">
                            {isCheckingUrl ? "Vérification..." : 
                             isUrlAvailable ? "Disponible" : "Non disponible"}
                          </span>
                        </div>
                      </div>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                          worldsell.com/
                        </span>
                        <Input 
                          id="store-url" 
                          className="rounded-l-none" 
                          value={storeUrl}
                          onChange={(e) => setStoreUrl(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Votre boutique sera accessible à <strong>worldsell.com/{storeUrl}</strong></p>
                        <Button variant="outline" size="sm" onClick={copyStoreUrl} className="flex items-center gap-1 text-xs">
                          <Copy className="h-3 w-3" />
                          Copier
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primary-color">Couleur principale</Label>
                        <div className="flex gap-2">
                          <div 
                            className="w-10 h-10 rounded border" 
                            style={{ backgroundColor: primaryColor }}
                          />
                          <Input
                            id="primary-color"
                            type="color"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="secondary-color">Couleur secondaire</Label>
                        <div className="flex gap-2">
                          <div 
                            className="w-10 h-10 rounded border" 
                            style={{ backgroundColor: secondaryColor }}
                          />
                          <Input
                            id="secondary-color"
                            type="color"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label className="text-base">Boutique active</Label>
                        <p className="text-sm text-muted-foreground">
                          Vos produits sont visibles et disponibles à l'achat.
                        </p>
                      </div>
                      <Switch 
                        checked={storeActive}
                        onCheckedChange={setStoreActive}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label className="text-base">Mode vacances</Label>
                        <p className="text-sm text-muted-foreground">
                          Suspendre temporairement les ventes et nouvelles commandes.
                        </p>
                      </div>
                      <Switch 
                        checked={vacationMode}
                        onCheckedChange={setVacationMode}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="lg:max-w-md w-full">
                  <Card className="border border-dashed">
                    <CardHeader className="pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-sm font-medium">Aperçu de la boutique</CardTitle>
                        <div className="flex items-center gap-1 border rounded-md">
                          <Button 
                            variant={previewMode === "desktop" ? "default" : "ghost"} 
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => setPreviewMode("desktop")}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                              <line x1="8" y1="21" x2="16" y2="21"></line>
                              <line x1="12" y1="17" x2="12" y2="21"></line>
                            </svg>
                          </Button>
                          <Button 
                            variant={previewMode === "mobile" ? "default" : "ghost"} 
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => setPreviewMode("mobile")}
                          >
                            <Smartphone className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className={`overflow-hidden mx-auto ${previewMode === "mobile" ? "max-w-[320px]" : "w-full"} transition-all duration-300`}
                      >
                        <div 
                          className="bg-white rounded-md shadow-sm overflow-hidden"
                          style={{ 
                            borderTopColor: primaryColor, 
                            borderTopWidth: "4px" 
                          }}
                        >
                          {storeBanner ? (
                            <div className="w-full h-32 overflow-hidden">
                              <img 
                                src={storeBanner} 
                                alt="Bannière boutique" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div 
                              className="w-full h-32 flex items-center justify-center"
                              style={{ backgroundColor: primaryColor + "20" }}
                            >
                              <span className="text-sm text-muted-foreground">Bannière de la boutique</span>
                            </div>
                          )}
                          
                          <div className="p-4">
                            <div className="flex items-center gap-3 mb-4">
                              {storeLogo ? (
                                <div className="w-12 h-12 rounded-full overflow-hidden border">
                                  <img 
                                    src={storeLogo} 
                                    alt="Logo boutique" 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div 
                                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                                  style={{ backgroundColor: primaryColor }}
                                >
                                  {storeName.substring(0, 1).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <h3 className="font-bold">{storeName || "Ma Boutique"}</h3>
                                <div className="flex items-center gap-1 text-xs">
                                  <Link className="h-3 w-3" />
                                  <span>worldsell.com/{storeUrl}</span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-4">
                              {storeDescription || "Description de la boutique..."}
                            </p>
                            
                            <div className="space-y-2">
                              <div 
                                className="h-4 rounded bg-gray-100 w-full"
                              ></div>
                              <div 
                                className="h-4 rounded bg-gray-100 w-3/4"
                              ></div>
                              <div 
                                className="h-4 rounded bg-gray-100 w-5/6"
                              ></div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mt-4">
                              <div 
                                className="aspect-square rounded-md bg-gray-100 flex items-center justify-center"
                              >
                                <span className="text-xs text-muted-foreground">Produit</span>
                              </div>
                              <div 
                                className="aspect-square rounded-md bg-gray-100 flex items-center justify-center"
                              >
                                <span className="text-xs text-muted-foreground">Produit</span>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex justify-between">
                              <div className="h-8 w-24 rounded" style={{ backgroundColor: primaryColor }}></div>
                              <div className="h-8 w-24 rounded" style={{ backgroundColor: secondaryColor }}></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 bg-muted rounded p-3 text-center text-sm">
                          <div className="flex items-center justify-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            <span>
                              {storeActive ? 
                                <span className="flex items-center gap-1 text-green-600"><Check className="h-3 w-3" /> Boutique en ligne</span> : 
                                <span className="text-red-500">Boutique hors ligne</span>
                              }
                            </span>
                          </div>
                          {vacationMode && (
                            <span className="text-orange-500 text-xs block mt-1">Mode vacances activé</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Button className="mt-4" onClick={handleSaveBoutique}>
                Enregistrer les paramètres
              </Button>
            </TabsContent>
            
            <TabsContent value="paiement" className="mt-6 space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payout-email">Email pour les paiements</Label>
                  <Input id="payout-email" type="email" defaultValue="contact@example.com" />
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Label className="text-base">Méthodes de paiement acceptées</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="paypal" defaultChecked />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="stripe" defaultChecked />
                      <Label htmlFor="stripe">Carte bancaire (Stripe)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="orange-money" defaultChecked />
                      <Label htmlFor="orange-money">Orange Money</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="mtn-money" defaultChecked />
                      <Label htmlFor="mtn-money">MTN Money</Label>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Label className="text-base">Frais et commissions</Label>
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Commission sur les produits physiques:</span>
                          <span className="font-medium">10%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Commission sur les produits digitaux:</span>
                          <span className="font-medium">8%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Commission sur les formations:</span>
                          <span className="font-medium">15%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Button className="mt-4" onClick={handleSavePaiement}>
                Enregistrer les paramètres
              </Button>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-6 space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notifications par email</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des emails pour les nouvelles commandes et messages.
                    </p>
                  </div>
                  <Switch 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">Emails automatiques aux clients</Label>
                    <p className="text-sm text-muted-foreground">
                      Envoyer des emails de confirmation de commande et de livraison.
                    </p>
                  </div>
                  <Switch 
                    checked={automaticEmails}
                    onCheckedChange={setAutomaticEmails}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notifications instantanées</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications sur le tableau de bord en temps réel.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Label htmlFor="notification-frequency">Fréquence des rapports</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="daily-report" />
                      <Label htmlFor="daily-report">Rapport quotidien</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="weekly-report" defaultChecked />
                      <Label htmlFor="weekly-report">Rapport hebdomadaire</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="monthly-report" defaultChecked />
                      <Label htmlFor="monthly-report">Rapport mensuel</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="mt-4" onClick={handleSaveNotifications}>
                Enregistrer les paramètres
              </Button>
            </TabsContent>
            
            <TabsContent value="marketing" className="mt-6 space-y-4">
              <Card className="bg-muted/30 border-primary/20 mb-6">
                <CardHeader>
                  <CardTitle className="text-base">Passez à WorldSell Pro</CardTitle>
                  <CardDescription>
                    Accédez à des outils marketing avancés et augmentez vos ventes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Intégration WhatsApp pour chatter avec vos clients</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Campagnes email marketing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Création illimitée de cours et produits</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Rapports détaillés et analyses avancées</span>
                    </li>
                  </ul>
                  <Button className="w-full">Passer à Pro</Button>
                </CardContent>
              </Card>
              
              <div className="grid gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center gap-2">
                      Intégration WhatsApp
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">Pro</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Connectez votre WhatsApp Business pour communiquer avec vos clients.
                    </p>
                  </div>
                  <Switch 
                    checked={whatsappIntegration}
                    onCheckedChange={setWhatsappIntegration}
                    disabled={!whatsappIntegration}
                  />
                </div>
                
                <div className="space-y-2 opacity-50">
                  <Label htmlFor="whatsapp-number">Numéro WhatsApp</Label>
                  <Input id="whatsapp-number" type="tel" placeholder="+123456789" disabled={!whatsappIntegration} />
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Label className="text-base">Codes promotionnels</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="welcome-code" defaultChecked />
                      <Label htmlFor="welcome-code">Code de bienvenue (-10%)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="special-offer" />
                      <Label htmlFor="special-offer">Offre spéciale (-15%)</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                className="mt-4" 
                onClick={handleSaveMarketing}
                variant={whatsappIntegration ? "default" : "outline"}
              >
                {whatsappIntegration ? "Enregistrer les paramètres" : "Passer à Pro pour débloquer"}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Annuler</Button>
          <Button>Enregistrer tous les paramètres</Button>
        </CardFooter>
      </Card>
    </DashboardLayout>
  );
}
