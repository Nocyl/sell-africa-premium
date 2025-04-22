
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Bell,
  CreditCard,
  Globe,
  Lock,
  Mail,
  MessageSquare,
  Shield,
  User,
} from "lucide-react";

export default function DashboardSettings() {
  const [activeTab, setActiveTab] = useState("account");
  const [formData, setFormData] = useState({
    fullName: "Thomas Dubois",
    email: "thomas.dubois@example.com",
    phone: "+225 07 08 09 10 11",
    bio: "Passionné de technologie et d'innovation, j'aime découvrir de nouveaux produits et partager mes connaissances.",
    country: "Côte d'Ivoire",
    city: "Abidjan",
    address: "Cocody, Rue des Jardins 15",
    zipCode: "01 BP 1234",
    notifyNewsletter: true,
    notifyPromotions: true,
    notifyAccount: true,
    notifyOrders: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profil mis à jour avec succès!");
  };
  
  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Préférences de notification mises à jour!");
  };
  
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Adresse mise à jour avec succès!");
  };
  
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mot de passe modifié avec succès!");
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Paramètres</h1>
      
      <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="address" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden md:inline">Adresse</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden md:inline">Sécurité</span>
          </TabsTrigger>
        </TabsList>
        
        <ScrollArea className="h-full w-full" orientation="vertical">
          <div className="space-y-6 pb-8">
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Profil</CardTitle>
                  <CardDescription>
                    Gérez vos informations personnelles et comment elles sont affichées
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center space-y-3">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas" />
                          <AvatarFallback>TD</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm">Changer l'image</Button>
                      </div>
                      
                      <div className="space-y-4 flex-1">
                        <div className="grid gap-2">
                          <Label htmlFor="fullName">Nom complet</Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="email">Adresse email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="bio">Biographie</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            rows={4}
                            value={formData.bio}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveProfile}>Enregistrer les modifications</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Configurez comment vous souhaitez être notifié
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveNotifications} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notifyNewsletter">Newsletter</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir les dernières nouvelles et mises à jour
                          </p>
                        </div>
                        <Switch
                          id="notifyNewsletter"
                          checked={formData.notifyNewsletter}
                          onCheckedChange={(checked) => handleSwitchChange("notifyNewsletter", checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notifyPromotions">Promotions</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir des offres spéciales et des promotions
                          </p>
                        </div>
                        <Switch
                          id="notifyPromotions"
                          checked={formData.notifyPromotions}
                          onCheckedChange={(checked) => handleSwitchChange("notifyPromotions", checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notifyAccount">Compte</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir des alertes sur l'activité du compte
                          </p>
                        </div>
                        <Switch
                          id="notifyAccount"
                          checked={formData.notifyAccount}
                          onCheckedChange={(checked) => handleSwitchChange("notifyAccount", checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notifyOrders">Commandes</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir des notifications de suivi des commandes
                          </p>
                        </div>
                        <Switch
                          id="notifyOrders"
                          checked={formData.notifyOrders}
                          onCheckedChange={(checked) => handleSwitchChange("notifyOrders", checked)}
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveNotifications}>Enregistrer les préférences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>Adresse</CardTitle>
                  <CardDescription>
                    Gérez votre adresse de livraison
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveAddress} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="country">Pays</Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="zipCode">Code postal</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveAddress}>Mettre à jour l'adresse</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Sécurité</CardTitle>
                  <CardDescription>
                    Gérez votre mot de passe et la sécurité de votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSavePassword} className="space-y-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Activer l'authentification à 2 facteurs
                  </Button>
                  <Button onClick={handleSavePassword}>Changer le mot de passe</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </DashboardLayout>
  );
}
