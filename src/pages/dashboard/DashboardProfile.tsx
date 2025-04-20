
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Shield, Bell, CreditCard, Key, Upload } from "lucide-react";

export default function DashboardProfile() {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    // Simuler un délai de sauvegarde
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Mon profil</h1>
          <p className="text-muted-foreground">
            Gérez vos informations personnelles et vos préférences
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <Card className="md:max-w-xs w-full">
            <CardHeader>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt="Photo de profil" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold">Amadou Diallo</h3>
                  <p className="text-sm text-muted-foreground">amadou.diallo@example.com</p>
                  <Badge variant="outline" className="mt-2">Client Premium</Badge>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Compte créé le 15 Janvier 2025</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">amadou.diallo@example.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">+221 77 000 00 00</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Dakar, Sénégal</span>
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="p-6">
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Changer ma photo
              </Button>
            </CardFooter>
          </Card>

          <div className="flex-1">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="account">Compte</TabsTrigger>
                <TabsTrigger value="security">Sécurité</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="payment">Paiement</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations du compte</CardTitle>
                    <CardDescription>
                      Mettez à jour vos informations personnelles
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input id="firstName" defaultValue="Amadou" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input id="lastName" defaultValue="Diallo" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Adresse email</Label>
                      <Input id="email" type="email" defaultValue="amadou.diallo@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Numéro de téléphone</Label>
                      <Input id="phone" defaultValue="+221 77 000 00 00" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input id="address" defaultValue="123 Rue Principale" />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input id="city" defaultValue="Dakar" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="region">Région</Label>
                        <Input id="region" defaultValue="Dakar" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Pays</Label>
                        <Input id="country" defaultValue="Sénégal" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} disabled={loading}>
                      {loading ? "Enregistrement..." : "Enregistrer les modifications"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Sécurité</CardTitle>
                    <CardDescription>
                      Gérez la sécurité de votre compte
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Mot de passe actuel</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nouveau mot de passe</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">Authentification à deux facteurs</h4>
                        <p className="text-sm text-muted-foreground">
                          Ajoutez une couche de sécurité supplémentaire à votre compte
                        </p>
                      </div>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Configurer
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} disabled={loading}>
                      {loading ? "Enregistrement..." : "Mettre à jour le mot de passe"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Configurez vos préférences de notification
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Mises à jour de commande</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications sur l'état de vos commandes
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Activées</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Promotions et offres</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications sur les offres spéciales et réductions
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Activées</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Cours et formations</Label>
                          <p className="text-sm text-muted-foreground">
                            Mises à jour sur vos formations et nouveaux cours
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Activées</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} disabled={loading}>
                      {loading ? "Enregistrement..." : "Enregistrer les préférences"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <CardTitle>Méthodes de paiement</CardTitle>
                    <CardDescription>
                      Gérez vos méthodes de paiement préférées
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 p-2 rounded-md">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Mobile Money</p>
                            <p className="text-sm text-muted-foreground">
                              +221 77 *** ** 00
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">Par défaut</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="bg-orange-100 p-2 rounded-md">
                            <CreditCard className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium">Carte bancaire</p>
                            <p className="text-sm text-muted-foreground">
                              **** **** **** 4587
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Définir par défaut
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      Gérer les méthodes de paiement
                    </Button>
                    
                    <Button className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Ajouter une méthode
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
