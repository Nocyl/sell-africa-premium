
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { 
  CreditCard, Banknote, Landmark, ShoppingCart, 
  ChevronRight, Truck, ShieldCheck, PackageCheck,
  Check 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { countries, getAvailableProviders, PaymentProvider, PaymentType } from "@/utils/paymentOptions";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>("card");
  const [country, setCountry] = useState("SN");
  const [availableProviders, setAvailableProviders] = useState<PaymentProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Effet pour mettre à jour les fournisseurs de paiement disponibles
  useEffect(() => {
    if (country && paymentMethod) {
      const providers = getAvailableProviders(country, paymentMethod);
      setAvailableProviders(providers);
      
      // Sélectionner le premier fournisseur par défaut s'il en existe
      if (providers.length > 0 && !providers.some(p => p.id === selectedProvider)) {
        setSelectedProvider(providers[0].id);
      } else if (providers.length === 0) {
        setSelectedProvider(null);
      }
    }
  }, [country, paymentMethod]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      toast.success("Paiement effectué avec succès!");
      clearCart();
      navigate("/payment-success");
    }, 2000);
  };

  // Vérifier si le panier est vide
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12 container">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6 p-6 rounded-full bg-gray-100 inline-block">
              <ShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Votre panier est vide</h1>
            <p className="text-muted-foreground mb-6">
              Vous n'avez pas encore ajouté d'articles à votre panier.
            </p>
            <Button onClick={() => navigate("/products")}>
              Découvrir nos produits
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 container">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Finaliser votre commande</h1>
          <p className="text-muted-foreground">
            Complétez les informations ci-dessous pour passer votre commande.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Vos informations de contact pour cette commande
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" placeholder="Votre prénom" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" placeholder="Votre nom" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="votre@email.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" placeholder="Votre numéro de téléphone" required />
                  </div>
                </CardContent>
              </Card>

              {/* Adresse de livraison (seulement si des produits physiques sont dans le panier) */}
              {cartItems.some(item => item.type === "physical") && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Adresse de livraison</CardTitle>
                    <CardDescription>
                      Où souhaitez-vous recevoir votre commande?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input id="address" placeholder="Numéro et nom de rue" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input id="city" placeholder="Votre ville" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Code postal</Label>
                        <Input id="postalCode" placeholder="Code postal" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Pays</Label>
                      <Select defaultValue={country} onValueChange={setCountry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre pays" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instructions">Instructions de livraison (optionnel)</Label>
                      <Textarea 
                        id="instructions" 
                        placeholder="Instructions spéciales pour la livraison"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Méthode de paiement */}
              <Card>
                <CardHeader>
                  <CardTitle>Méthode de paiement</CardTitle>
                  <CardDescription>
                    Choisissez votre mode de paiement préféré
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="card" onValueChange={(val) => setPaymentMethod(val as PaymentType)}>
                    <TabsList className="grid grid-cols-4 mb-6">
                      <TabsTrigger value="card">
                        <CreditCard className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Carte</span>
                      </TabsTrigger>
                      <TabsTrigger value="mobile">
                        <Banknote className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Mobile Money</span>
                      </TabsTrigger>
                      <TabsTrigger value="bank">
                        <Landmark className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Banque</span>
                      </TabsTrigger>
                      <TabsTrigger value="transfer">
                        <Truck className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Transfert</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="card" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Numéro de carte</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Date d'expiration</Label>
                          <Input id="expiry" placeholder="MM/AA" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="mobile" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="paymentCountry">Pays</Label>
                        <Select defaultValue={country} onValueChange={setCountry}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez votre pays" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Fournisseurs disponibles</Label>
                        {availableProviders.length > 0 ? (
                          <RadioGroup 
                            defaultValue={availableProviders[0]?.id} 
                            value={selectedProvider || undefined}
                            onValueChange={setSelectedProvider}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                          >
                            {availableProviders.map((provider) => (
                              <div 
                                key={provider.id} 
                                className={`flex items-center space-x-2 border rounded-md p-3 ${
                                  selectedProvider === provider.id ? 'border-primary bg-primary/5' : ''
                                }`}
                              >
                                <RadioGroupItem value={provider.id} id={provider.id} />
                                <Label htmlFor={provider.id} className="flex flex-1 cursor-pointer">
                                  {provider.name}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        ) : (
                          <div className="p-4 bg-muted/50 rounded-md text-center">
                            <p className="text-sm text-muted-foreground">
                              Aucun fournisseur Mobile Money disponible pour ce pays.
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {selectedProvider && (
                        <div className="space-y-2">
                          <Label htmlFor="mobileNumber">Numéro de téléphone</Label>
                          <Input id="mobileNumber" placeholder="Votre numéro Mobile Money" />
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="bank" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bankCountry">Pays</Label>
                        <Select defaultValue={country} onValueChange={setCountry}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez votre pays" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Banques disponibles</Label>
                        {availableProviders.length > 0 ? (
                          <RadioGroup 
                            defaultValue={availableProviders[0]?.id}
                            value={selectedProvider || undefined}
                            onValueChange={setSelectedProvider}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                          >
                            {availableProviders.map((provider) => (
                              <div 
                                key={provider.id} 
                                className={`flex items-center space-x-2 border rounded-md p-3 ${
                                  selectedProvider === provider.id ? 'border-primary bg-primary/5' : ''
                                }`}
                              >
                                <RadioGroupItem value={provider.id} id={`bank-${provider.id}`} />
                                <Label htmlFor={`bank-${provider.id}`} className="flex flex-1 cursor-pointer">
                                  {provider.name}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        ) : (
                          <div className="p-4 bg-muted/50 rounded-md text-center">
                            <p className="text-sm text-muted-foreground">
                              Aucune banque disponible pour ce pays.
                            </p>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="transfer" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="transferCountry">Pays</Label>
                        <Select defaultValue={country} onValueChange={setCountry}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez votre pays" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Services de transfert disponibles</Label>
                        {availableProviders.length > 0 ? (
                          <RadioGroup 
                            defaultValue={availableProviders[0]?.id}
                            value={selectedProvider || undefined}
                            onValueChange={setSelectedProvider}
                            className="grid grid-cols-1 gap-2"
                          >
                            {availableProviders.map((provider) => (
                              <div 
                                key={provider.id} 
                                className={`flex items-center space-x-2 border rounded-md p-3 ${
                                  selectedProvider === provider.id ? 'border-primary bg-primary/5' : ''
                                }`}
                              >
                                <RadioGroupItem value={provider.id} id={`transfer-${provider.id}`} />
                                <Label htmlFor={`transfer-${provider.id}`} className="flex flex-1 cursor-pointer">
                                  {provider.name}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        ) : (
                          <div className="p-4 bg-muted/50 rounded-md text-center">
                            <p className="text-sm text-muted-foreground">
                              Aucun service de transfert disponible pour ce pays.
                            </p>
                          </div>
                        )}
                      </div>

                      {selectedProvider && selectedProvider === "western_union" && (
                        <div className="p-4 bg-muted rounded-md">
                          <p className="text-sm">
                            Après validation de votre commande, vous recevrez les instructions pour effectuer votre transfert Western Union.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="text-green-500 h-5 w-5 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Toutes les transactions sont sécurisées et chiffrées
                    </p>
                  </div>
                </CardFooter>
              </Card>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full md:w-auto bg-worldsell-blue-500 hover:bg-worldsell-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>Traitement en cours...</>
                  ) : (
                    <>
                      Payer maintenant
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Résumé de la commande */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Résumé de votre commande</CardTitle>
                <CardDescription>
                  {cartItems.length} article{cartItems.length > 1 ? 's' : ''} dans votre panier
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between py-2">
                      <div className="flex gap-3">
                        <div className="text-muted-foreground">
                          {item.quantity}x
                        </div>
                        <div>
                          <p className="font-medium line-clamp-1">{item.name}</p>
                          <Badge variant="outline" className="mt-1">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>

                  {cartItems.some(item => item.type === "physical") && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Livraison</span>
                      <span className="text-green-600">Gratuite</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes</span>
                    <span>$0.00</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <PackageCheck className="text-worldsell-blue-500 h-5 w-5 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Livraison rapide</p>
                      <p className="text-xs text-muted-foreground">
                        {cartItems.some(item => item.type === "physical") 
                          ? "3-5 jours ouvrables pour les produits physiques"
                          : "Accès immédiat aux produits numériques"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Check className="text-worldsell-blue-500 h-5 w-5 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Garantie satisfait ou remboursé</p>
                      <p className="text-xs text-muted-foreground">
                        30 jours pour changer d'avis
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
