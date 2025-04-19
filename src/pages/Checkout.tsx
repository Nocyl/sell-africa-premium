
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { 
  CreditCard, Banknote, Landmark, ShoppingCart, 
  ChevronRight, Truck, ShieldCheck, PackageCheck,
  Check, ArrowRight, Loader2 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { countries, getAvailableProviders, getPrimaryProvider, PaymentProvider, PaymentType } from "@/utils/paymentOptions";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart, hasPhysicalItems, hasDigitalItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>("mobile");
  const [country, setCountry] = useState("SN");
  const [availableProviders, setAvailableProviders] = useState<PaymentProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const orderIdRef = useRef<string>("WS" + Math.floor(100000 + Math.random() * 900000));

  // Effet pour mettre à jour les fournisseurs de paiement disponibles
  useEffect(() => {
    if (country && paymentMethod) {
      const providers = getAvailableProviders(country, paymentMethod);
      setAvailableProviders(providers);
      
      // Utiliser le fournisseur principal pour ce pays et cette méthode
      const primaryProvider = getPrimaryProvider(country, paymentMethod);
      if (primaryProvider) {
        setSelectedProvider(primaryProvider.id);
      } else if (providers.length > 0) {
        setSelectedProvider(providers[0].id);
      } else {
        setSelectedProvider(null);
      }
    }
  }, [country, paymentMethod]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProvider) {
      toast.error("Veuillez sélectionner un moyen de paiement");
      return;
    }
    
    setIsLoading(true);
    setShowConfirmation(true);
    
    // Simuler un délai de traitement de paiement
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleConfirmPayment = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      toast.success("Paiement effectué avec succès!");
      clearCart();
      navigate("/payment-success", { 
        state: { orderId: orderIdRef.current }
      });
    }, 1500);
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
              {hasPhysicalItems && (
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CardTitle>Adresse de livraison</CardTitle>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-100">
                        Produits physiques
                      </Badge>
                    </div>
                    <CardDescription>
                      Où souhaitez-vous recevoir vos produits physiques?
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

              {/* Information pour produits numériques */}
              {hasDigitalItems && !hasPhysicalItems && (
                <Card className="mb-6 border-primary/20 bg-primary/5">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CardTitle>Produits numériques</CardTitle>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                        Livraison instantanée
                      </Badge>
                    </div>
                    <CardDescription>
                      Vos produits numériques seront disponibles immédiatement après le paiement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-md text-sm text-blue-700">
                      <Check className="h-5 w-5 text-blue-500" />
                      <p>
                        Vous recevrez un email avec vos accès dès que le paiement sera validé
                      </p>
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
                  <Tabs defaultValue="mobile" onValueChange={(val) => setPaymentMethod(val as PaymentType)}>
                    <TabsList className="grid grid-cols-4 mb-6">
                      <TabsTrigger value="mobile">
                        <Banknote className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Mobile Money</span>
                      </TabsTrigger>
                      <TabsTrigger value="card">
                        <CreditCard className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Carte</span>
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

                    <div className="space-y-4">
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
                      
                      <TabsContent value="mobile" className="space-y-4 mt-2">
                        <div className="space-y-2">
                          <Label>Fournisseur Mobile Money</Label>
                          {availableProviders.length > 0 ? (
                            <RadioGroup 
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
                                  <Label htmlFor={provider.id} className="flex flex-1 items-center cursor-pointer">
                                    <img 
                                      src={provider.logo} 
                                      alt={provider.name} 
                                      className="w-8 h-8 mr-2 object-contain"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                      }}
                                    />
                                    {provider.name}
                                    {provider.primary && (
                                      <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">
                                        Recommandé
                                      </Badge>
                                    )}
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
                            <Input id="mobileNumber" placeholder="Votre numéro Mobile Money" required />
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="card" className="space-y-4 mt-2">
                        <div className="space-y-2">
                          <Label>Services de paiement par carte</Label>
                          {availableProviders.length > 0 ? (
                            <RadioGroup 
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
                                  <RadioGroupItem value={provider.id} id={`card-${provider.id}`} />
                                  <Label htmlFor={`card-${provider.id}`} className="flex flex-1 items-center cursor-pointer">
                                    <img 
                                      src={provider.logo} 
                                      alt={provider.name} 
                                      className="w-8 h-8 mr-2 object-contain"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                      }}
                                    />
                                    {provider.name}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          ) : (
                            <div className="p-4 bg-muted/50 rounded-md text-center">
                              <p className="text-sm text-muted-foreground">
                                Aucun service de paiement par carte disponible pour ce pays.
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {selectedProvider && selectedProvider !== "paypal" && (
                          <div className="space-y-4">
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
                          </div>
                        )}
                        
                        {selectedProvider && selectedProvider === "paypal" && (
                          <div className="p-4 bg-blue-50 rounded-md">
                            <p className="text-sm text-blue-700">
                              Vous serez redirigé vers PayPal pour finaliser votre paiement.
                            </p>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="bank" className="space-y-4 mt-2">
                        <div className="space-y-2">
                          <Label>Services bancaires disponibles</Label>
                          {availableProviders.length > 0 ? (
                            <RadioGroup 
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
                                  <Label htmlFor={`bank-${provider.id}`} className="flex flex-1 items-center cursor-pointer">
                                    <img 
                                      src={provider.logo} 
                                      alt={provider.name} 
                                      className="w-8 h-8 mr-2 object-contain"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                      }}
                                    />
                                    {provider.name}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          ) : (
                            <div className="p-4 bg-muted/50 rounded-md text-center">
                              <p className="text-sm text-muted-foreground">
                                Aucun service bancaire disponible pour ce pays.
                              </p>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="transfer" className="space-y-4 mt-2">
                        <div className="space-y-2">
                          <Label>Services de transfert disponibles</Label>
                          {availableProviders.length > 0 ? (
                            <RadioGroup 
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
                                  <Label htmlFor={`transfer-${provider.id}`} className="flex flex-1 items-center cursor-pointer">
                                    <img 
                                      src={provider.logo} 
                                      alt={provider.name} 
                                      className="w-8 h-8 mr-2 object-contain"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                      }}
                                    />
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

                        {selectedProvider && (selectedProvider === "western_union" || selectedProvider === "moneygram") && (
                          <div className="p-4 bg-muted rounded-md">
                            <p className="text-sm">
                              Après validation de votre commande, vous recevrez les instructions pour effectuer votre transfert.
                            </p>
                          </div>
                        )}
                      </TabsContent>
                    </div>
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
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      Valider la commande
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
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline">
                              {item.category}
                            </Badge>
                            {item.type === "physical" ? (
                              <Badge variant="outline" className="bg-orange-50 text-orange-600 hover:bg-orange-100">
                                Physique
                              </Badge>
                            ) : item.type === "digital" ? (
                              <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-100">
                                Numérique
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                                Cours
                              </Badge>
                            )}
                          </div>
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

                  {hasPhysicalItems && (
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
                      <p className="text-sm font-medium">
                        {hasPhysicalItems 
                          ? "Livraison rapide" 
                          : "Accès immédiat"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {hasPhysicalItems 
                          ? "3-5 jours ouvrables pour les produits physiques"
                          : "Accès immédiat aux produits numériques après paiement"}
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

      {/* Dialog de confirmation de paiement */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              Confirmer votre paiement
            </DialogTitle>
            <DialogDescription>
              Vérifiez les détails de votre commande avant de procéder au paiement
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Total à payer:</span>
                <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Méthode:</span>
                <span className="font-medium">
                  {selectedProvider && availableProviders.find(p => p.id === selectedProvider)?.name}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              En cliquant sur "Confirmer", vous acceptez de payer le montant indiqué ci-dessus.
            </p>
            
            <div className="flex justify-end gap-3 mt-5">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmation(false)}
                disabled={isLoading}
              >
                Annuler
              </Button>
              <Button
                onClick={handleConfirmPayment}
                className="bg-worldsell-blue-500 hover:bg-worldsell-blue-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Traitement...
                  </>
                ) : (
                  <>
                    Confirmer le paiement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;
