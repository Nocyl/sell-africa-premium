
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Globe, 
  CreditCard, 
  BellRing, 
  Shield, 
  PaintBucket, 
  Users, 
  Mail,
  FileText,
  UserCog,
  Store
} from "lucide-react";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  
  // États pour les paramètres généraux
  const [siteName, setSiteName] = useState("WorldSell");
  const [siteDescription, setSiteDescription] = useState("Plateforme de vente de produits physiques, digitaux et formations en ligne");
  const [logoUrl, setLogoUrl] = useState("/logo.png");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [siteLanguage, setSiteLanguage] = useState("fr");
  
  // États pour les paramètres de paiement
  const [platformFee, setPlatformFee] = useState("5");
  const [minWithdrawal, setMinWithdrawal] = useState("10000");
  const [paymentMethods, setPaymentMethods] = useState({
    card: true,
    mobileMoney: true,
    paypal: false,
    bankTransfer: false
  });
  
  // États pour les paramètres de notification
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [productApprovalAlerts, setProductApprovalAlerts] = useState(true);
  
  // États pour les paramètres de sécurité
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [passwordPolicy, setPasswordPolicy] = useState("medium");
  const [sessionTimeout, setSessionTimeout] = useState("30");
  
  // États pour les paramètres d'affichage
  const [primaryColor, setPrimaryColor] = useState("#8884d8");
  const [darkMode, setDarkMode] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  
  // Fonction de sauvegarde des paramètres
  const saveSettings = () => {
    toast.success("Paramètres enregistrés avec succès");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Paramètres d'administration</h2>
          <p className="text-muted-foreground">
            Gérez les paramètres de la plateforme WorldSell
          </p>
        </div>
        <Button onClick={saveSettings}>Enregistrer les modifications</Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Général</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden md:inline">Paiement</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <BellRing className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <PaintBucket className="h-4 w-4" />
            <span className="hidden md:inline">Apparence</span>
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Permissions</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Paramètres généraux */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Nom du site</Label>
                  <Input 
                    id="site-name"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-language">Langue par défaut</Label>
                  <Select value={siteLanguage} onValueChange={setSiteLanguage}>
                    <SelectTrigger id="site-language">
                      <SelectValue placeholder="Sélectionner une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">Anglais</SelectItem>
                      <SelectItem value="es">Espagnol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="site-description">Description du site</Label>
                  <Textarea 
                    id="site-description"
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo-url">URL du logo</Label>
                  <Input 
                    id="logo-url"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="maintenance-mode">Mode maintenance</Label>
                  <Switch 
                    id="maintenance-mode" 
                    checked={maintenanceMode} 
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Intégrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Google Analytics</h4>
                      <p className="text-sm text-muted-foreground">Analysez le trafic sur votre site</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toast.info("Configuration de Google Analytics")}>
                      Configurer
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Meta Pixel</h4>
                      <p className="text-sm text-muted-foreground">Intégration avec Facebook</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toast.info("Configuration de Meta Pixel")}>
                      Configurer
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Service de mail</h4>
                      <p className="text-sm text-muted-foreground">Gérez vos emails transactionnels</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toast.info("Configuration du service mail")}>
                      Configurer
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">CDN</h4>
                      <p className="text-sm text-muted-foreground">Configuration du réseau de distribution</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toast.info("Configuration du CDN")}>
                      Configurer
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Paramètres de paiement */}
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres des frais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-fee">Frais de la plateforme (%)</Label>
                  <Input 
                    id="platform-fee"
                    type="number"
                    value={platformFee}
                    onChange={(e) => setPlatformFee(e.target.value)}
                    min="0"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-withdrawal">Montant minimum de retrait (FCFA)</Label>
                  <Input 
                    id="min-withdrawal"
                    type="number"
                    value={minWithdrawal}
                    onChange={(e) => setMinWithdrawal(e.target.value)}
                    min="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Méthodes de paiement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="payment-card">Cartes bancaires</Label>
                  <Switch 
                    id="payment-card" 
                    checked={paymentMethods.card} 
                    onCheckedChange={(checked) => setPaymentMethods({...paymentMethods, card: checked})}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="payment-mobile">Mobile Money</Label>
                  <Switch 
                    id="payment-mobile" 
                    checked={paymentMethods.mobileMoney} 
                    onCheckedChange={(checked) => setPaymentMethods({...paymentMethods, mobileMoney: checked})}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="payment-paypal">PayPal</Label>
                  <Switch 
                    id="payment-paypal" 
                    checked={paymentMethods.paypal} 
                    onCheckedChange={(checked) => setPaymentMethods({...paymentMethods, paypal: checked})}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="payment-bank">Virement bancaire</Label>
                  <Switch 
                    id="payment-bank" 
                    checked={paymentMethods.bankTransfer} 
                    onCheckedChange={(checked) => setPaymentMethods({...paymentMethods, bankTransfer: checked})}
                  />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <Button 
                  variant="outline" 
                  onClick={() => toast.info("Configuration des prestataires de paiement")}
                  className="w-full md:w-auto"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Configurer les prestataires de paiement
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Paramètres de notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications système</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-notifications">Notifications par email</Label>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="push-notifications">Notifications push</Label>
                  <Switch 
                    id="push-notifications" 
                    checked={pushNotifications} 
                    onCheckedChange={setPushNotifications}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="order-alerts">Alertes de commandes</Label>
                  <Switch 
                    id="order-alerts" 
                    checked={orderAlerts} 
                    onCheckedChange={setOrderAlerts}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="product-approval-alerts">Alertes d'approbation de produits</Label>
                  <Switch 
                    id="product-approval-alerts" 
                    checked={productApprovalAlerts} 
                    onCheckedChange={setProductApprovalAlerts}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Modèles d'emails</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => toast.info("Édition du modèle d'email de bienvenue")}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email de bienvenue
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => toast.info("Édition du modèle d'email de confirmation de commande")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Confirmation de commande
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => toast.info("Édition du modèle d'email d'approbation de vendeur")}
                >
                  <UserCog className="h-4 w-4 mr-2" />
                  Approbation vendeur
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => toast.info("Édition du modèle d'email de réinitialisation de mot de passe")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Réinitialisation mot de passe
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => toast.info("Édition du modèle d'email d'inscription à la newsletter")}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Newsletter
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => toast.info("Édition du modèle d'email de nouvelle commande vendeur")}
                >
                  <Store className="h-4 w-4 mr-2" />
                  Nouvelle commande vendeur
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Paramètres de sécurité */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="two-factor-auth">Authentification à deux facteurs</Label>
                    <p className="text-sm text-muted-foreground">Exiger l'authentification à deux facteurs pour les administrateurs</p>
                  </div>
                  <Switch 
                    id="two-factor-auth" 
                    checked={twoFactorAuth} 
                    onCheckedChange={setTwoFactorAuth}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-policy">Politique de mot de passe</Label>
                  <Select value={passwordPolicy} onValueChange={setPasswordPolicy}>
                    <SelectTrigger id="password-policy">
                      <SelectValue placeholder="Sélectionner une politique" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Basique (8 caractères minimum)</SelectItem>
                      <SelectItem value="medium">Moyenne (8 caractères, 1 majuscule, 1 chiffre)</SelectItem>
                      <SelectItem value="high">Forte (12 caractères, majuscules, chiffres, symboles)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Expiration de session (minutes)</Label>
                  <Input 
                    id="session-timeout"
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    min="5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Sécurité avancée</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="ip-restriction">Restriction d'IP</Label>
                    <p className="text-sm text-muted-foreground">Limiter l'accès à certaines adresses IP</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toast.info("Configuration des restrictions d'IP")}
                  >
                    Configurer
                  </Button>
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="activity-logs">Journaux d'activité</Label>
                    <p className="text-sm text-muted-foreground">Consulter les activités des utilisateurs</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toast.info("Consultation des journaux d'activité")}
                  >
                    Consulter
                  </Button>
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="backup">Sauvegarde des données</Label>
                    <p className="text-sm text-muted-foreground">Programmer des sauvegardes régulières</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toast.info("Configuration des sauvegardes")}
                  >
                    Configurer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Paramètres d'apparence */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thème et couleurs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Couleur principale</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="primary-color"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input 
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="dark-mode">Mode sombre</Label>
                  <Switch 
                    id="dark-mode" 
                    checked={darkMode} 
                    onCheckedChange={setDarkMode}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="show-footer">Afficher le pied de page</Label>
                  <Switch 
                    id="show-footer" 
                    checked={showFooter} 
                    onCheckedChange={setShowFooter}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Personnalisation avancée</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => toast.info("Accès à l'éditeur de thème")}
                >
                  <PaintBucket className="h-4 w-4 mr-2" />
                  Éditeur de thème avancé
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => toast.info("Accès à l'éditeur CSS personnalisé")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  CSS personnalisé
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Paramètres de permissions */}
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rôles et permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Administrateurs</h4>
                    <p className="text-sm text-muted-foreground">Utilisateurs ayant un accès complet au système</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toast.info("Gestion des administrateurs")}
                  >
                    Gérer
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Modérateurs</h4>
                    <p className="text-sm text-muted-foreground">Utilisateurs pouvant approuver le contenu</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toast.info("Gestion des modérateurs")}
                  >
                    Gérer
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Vendeurs Pro</h4>
                    <p className="text-sm text-muted-foreground">Vendeurs avec des fonctionnalités avancées</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toast.info("Gestion des vendeurs pro")}
                  >
                    Gérer
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Vendeurs standards</h4>
                    <p className="text-sm text-muted-foreground">Vendeurs avec des fonctionnalités basiques</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toast.info("Gestion des vendeurs standards")}
                  >
                    Gérer
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Clients</h4>
                    <p className="text-sm text-muted-foreground">Utilisateurs pouvant acheter des produits</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toast.info("Gestion des clients")}
                  >
                    Gérer
                  </Button>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <Button 
                  onClick={() => toast.info("Création d'un nouveau rôle personnalisé")}
                  className="w-full md:w-auto"
                >
                  <UserCog className="h-4 w-4 mr-2" />
                  Créer un nouveau rôle
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Paramètres d'approbation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label>Approbation des vendeurs</Label>
                    <p className="text-sm text-muted-foreground">Exiger une approbation manuelle des nouveaux vendeurs</p>
                  </div>
                  <Switch id="approve-sellers" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label>Approbation des produits</Label>
                    <p className="text-sm text-muted-foreground">Exiger une approbation manuelle pour les nouveaux produits</p>
                  </div>
                  <Switch id="approve-products" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label>Approbation des cours</Label>
                    <p className="text-sm text-muted-foreground">Exiger une approbation manuelle pour les nouveaux cours</p>
                  </div>
                  <Switch id="approve-courses" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label>Approbation des avis</Label>
                    <p className="text-sm text-muted-foreground">Modérer les avis avant publication</p>
                  </div>
                  <Switch id="approve-reviews" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
