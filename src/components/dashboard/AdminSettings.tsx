
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [siteName, setSiteName] = useState("WorldSell");
  const [siteDescription, setSiteDescription] = useState("Plateforme de vente en ligne");
  const [siteLogo, setSiteLogo] = useState("");

  // Settings states
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  const [emailVerification, setEmailVerification] = useState(true);
  const [sellerApproval, setSellerApproval] = useState(true);
  const [productApproval, setProductApproval] = useState(true);
  const [courseApproval, setCourseApproval] = useState(true);
  const [commissionRate, setCommissionRate] = useState(10);
  const [currencySymbol, setCurrencySymbol] = useState("FCFA");

  const handleSaveGeneral = () => {
    toast.success("Paramètres généraux enregistrés avec succès");
  };

  const handleSavePayments = () => {
    toast.success("Paramètres de paiement enregistrés avec succès");
  };

  const handleSaveEmail = () => {
    toast.success("Paramètres d'email enregistrés avec succès");
  };

  const handleSaveAppearance = () => {
    toast.success("Paramètres d'apparence enregistrés avec succès");
  };

  const handleToggleMaintenance = () => {
    const newMode = !maintenanceMode;
    setMaintenanceMode(newMode);
    if (newMode) {
      toast.warning("Mode maintenance activé. Le site n'est accessible qu'aux administrateurs.");
    } else {
      toast.success("Mode maintenance désactivé. Le site est accessible à tous.");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Paramètres du système</CardTitle>
        <CardDescription>
          Configurez les paramètres de la plateforme WorldSell
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="appearance">Apparence</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6 space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Nom du site</Label>
                <Input
                  id="site-name"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site-description">Description du site</Label>
                <Input
                  id="site-description"
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                />
              </div>

              <Separator className="my-4" />
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label className="text-base">Mode maintenance</Label>
                  <p className="text-sm text-muted-foreground">
                    Activez ce mode pour rendre le site inaccessible aux utilisateurs.
                  </p>
                </div>
                <Switch 
                  checked={maintenanceMode}
                  onCheckedChange={handleToggleMaintenance}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label className="text-base">Inscription des utilisateurs</Label>
                  <p className="text-sm text-muted-foreground">
                    Autoriser les nouvelles inscriptions sur la plateforme.
                  </p>
                </div>
                <Switch 
                  checked={registrationEnabled}
                  onCheckedChange={setRegistrationEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label className="text-base">Vérification par email</Label>
                  <p className="text-sm text-muted-foreground">
                    Exiger une vérification par email lors de l'inscription.
                  </p>
                </div>
                <Switch 
                  checked={emailVerification}
                  onCheckedChange={setEmailVerification}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label className="text-base">Approbation des vendeurs</Label>
                  <p className="text-sm text-muted-foreground">
                    Approuver manuellement les nouveaux comptes vendeurs.
                  </p>
                </div>
                <Switch 
                  checked={sellerApproval}
                  onCheckedChange={setSellerApproval}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label className="text-base">Approbation des produits</Label>
                  <p className="text-sm text-muted-foreground">
                    Approuver manuellement les nouveaux produits.
                  </p>
                </div>
                <Switch 
                  checked={productApproval}
                  onCheckedChange={setProductApproval}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label className="text-base">Approbation des cours</Label>
                  <p className="text-sm text-muted-foreground">
                    Approuver manuellement les nouveaux cours.
                  </p>
                </div>
                <Switch 
                  checked={courseApproval}
                  onCheckedChange={setCourseApproval}
                />
              </div>
            </div>
            
            <Button className="mt-4" onClick={handleSaveGeneral}>
              Enregistrer les paramètres
            </Button>
          </TabsContent>
          
          <TabsContent value="payments" className="mt-6 space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="commission-rate">Taux de commission (%)</Label>
                <Input
                  id="commission-rate"
                  type="number"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  min={0}
                  max={100}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency-symbol">Symbole monétaire</Label>
                <Input
                  id="currency-symbol"
                  value={currencySymbol}
                  onChange={(e) => setCurrencySymbol(e.target.value)}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <Label className="text-base">Méthodes de paiement</Label>
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="paypal" defaultChecked />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="stripe" defaultChecked />
                    <Label htmlFor="stripe">Stripe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="orange-money" defaultChecked />
                    <Label htmlFor="orange-money">Orange Money</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="mtn-money" defaultChecked />
                    <Label htmlFor="mtn-money">MTN Money</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="bank-transfer" />
                    <Label htmlFor="bank-transfer">Virement bancaire</Label>
                  </div>
                </div>
              </div>
            </div>
            
            <Button className="mt-4" onClick={handleSavePayments}>
              Enregistrer les paramètres
            </Button>
          </TabsContent>
          
          <TabsContent value="email" className="mt-6 space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">Serveur SMTP</Label>
                <Input id="smtp-host" placeholder="smtp.example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtp-port">Port SMTP</Label>
                <Input id="smtp-port" placeholder="587" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtp-user">Nom d'utilisateur SMTP</Label>
                <Input id="smtp-user" type="email" placeholder="user@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtp-password">Mot de passe SMTP</Label>
                <Input id="smtp-password" type="password" placeholder="••••••••" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="from-email">Email expéditeur</Label>
                <Input id="from-email" type="email" placeholder="noreply@worldsell.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="from-name">Nom expéditeur</Label>
                <Input id="from-name" placeholder="WorldSell" />
              </div>
            </div>
            
            <Button className="mt-4" onClick={handleSaveEmail}>
              Enregistrer les paramètres
            </Button>
          </TabsContent>
          
          <TabsContent value="appearance" className="mt-6 space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="site-logo">Logo du site</Label>
                <Input
                  id="site-logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSiteLogo(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
                {siteLogo && (
                  <div className="mt-2">
                    <img src={siteLogo} alt="Logo preview" className="h-20 object-contain" />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="primary-color">Couleur principale</Label>
                <div className="flex gap-2">
                  <Input id="primary-color" type="color" defaultValue="#8884d8" className="w-16 h-10" />
                  <Input defaultValue="#8884d8" className="flex-1" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondary-color">Couleur secondaire</Label>
                <div className="flex gap-2">
                  <Input id="secondary-color" type="color" defaultValue="#82ca9d" className="w-16 h-10" />
                  <Input defaultValue="#82ca9d" className="flex-1" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-base">Thème</Label>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">Clair</Button>
                  <Button variant="outline" className="flex-1">Sombre</Button>
                  <Button variant="default" className="flex-1">Système</Button>
                </div>
              </div>
            </div>
            
            <Button className="mt-4" onClick={handleSaveAppearance}>
              Enregistrer les paramètres
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Annuler</Button>
        <Button>Enregistrer tous les paramètres</Button>
      </CardFooter>
    </Card>
  );
};
