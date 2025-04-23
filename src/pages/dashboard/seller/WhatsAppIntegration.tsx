
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
  MessageSquare,
  Phone,
  WhatsappLogo,
  ArrowRight,
  Clock,
  Copy,
  CheckCircle2,
  Settings,
  Users,
  ShoppingCart,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WhatsAppButtonStyle {
  position: "bottom-right" | "bottom-left" | "middle-right" | "middle-left";
  size: "small" | "medium" | "large";
  showText: boolean;
  text: string;
  showOnPages: string[];
}

interface WhatsAppMessage {
  id: string;
  trigger: "welcome" | "abandoned_cart" | "order_confirmed" | "order_shipped" | "custom";
  content: string;
  variables: string[];
  active: boolean;
}

export default function WhatsAppIntegration() {
  const [activeTab, setActiveTab] = useState("button");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState("Bonjour! Merci de nous contacter. Comment puis-je vous aider aujourd'hui?");
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [automationEnabled, setAutomationEnabled] = useState(false);
  const [proFeatureModal, setProFeatureModal] = useState(false);
  
  const [buttonStyle, setButtonStyle] = useState<WhatsAppButtonStyle>({
    position: "bottom-right",
    size: "medium",
    showText: true,
    text: "Besoin d'aide? Discutons sur WhatsApp",
    showOnPages: ["product", "course", "home"]
  });
  
  const [autoMessages, setAutoMessages] = useState<WhatsAppMessage[]>([
    {
      id: "msg1",
      trigger: "welcome",
      content: "Bonjour {{customer_name}}, merci de visiter notre boutique! N'hésitez pas à nous contacter si vous avez des questions.",
      variables: ["customer_name"],
      active: true
    },
    {
      id: "msg2",
      trigger: "abandoned_cart",
      content: "Bonjour {{customer_name}}, vous avez des articles dans votre panier! Souhaitez-vous finaliser votre achat? Nous sommes là pour vous aider.",
      variables: ["customer_name", "cart_items", "cart_value"],
      active: true
    },
    {
      id: "msg3",
      trigger: "order_confirmed",
      content: "Merci pour votre commande #{{order_number}}! Nous vous informerons dès qu'elle sera expédiée.",
      variables: ["customer_name", "order_number", "order_items"],
      active: true
    }
  ]);
  
  const handleWhatsAppNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWhatsappNumber(value);
    
    // Simple validation - should be more robust in production
    const validFormat = /^\+[0-9]{10,15}$/.test(value);
    setIsValidNumber(validFormat);
  };
  
  const saveButtonSettings = () => {
    if (!isValidNumber || !whatsappNumber) {
      toast.error("Veuillez entrer un numéro WhatsApp valide");
      return;
    }
    
    toast.success("Paramètres du bouton WhatsApp enregistrés");
    setButtonEnabled(true);
  };
  
  const saveAutomationSettings = () => {
    if (!isValidNumber || !whatsappNumber) {
      toast.error("Veuillez entrer un numéro WhatsApp valide");
      return;
    }
    
    toast.success("Paramètres d'automatisation WhatsApp enregistrés");
    setAutomationEnabled(true);
  };
  
  const copyButtonCode = () => {
    const code = `<div class="whatsapp-button ${buttonStyle.position} ${buttonStyle.size}">
  <a href="https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent(welcomeMessage)}">
    <img src="whatsapp-icon.svg" alt="WhatsApp" />
    ${buttonStyle.showText ? `<span>${buttonStyle.text}</span>` : ''}
  </a>
</div>`;
    
    navigator.clipboard.writeText(code);
    toast.success("Code copié dans le presse-papier");
  };
  
  const toggleAutoMessage = (id: string, active: boolean) => {
    setAutoMessages(autoMessages.map(msg => 
      msg.id === id ? { ...msg, active } : msg
    ));
  };
  
  const getTriggerLabel = (trigger: string) => {
    switch (trigger) {
      case "welcome": return "Message de bienvenue";
      case "abandoned_cart": return "Panier abandonné";
      case "order_confirmed": return "Commande confirmée";
      case "order_shipped": return "Commande expédiée";
      case "custom": return "Déclencheur personnalisé";
      default: return trigger;
    }
  };
  
  const getPositionLabel = (position: string) => {
    switch (position) {
      case "bottom-right": return "Bas à droite";
      case "bottom-left": return "Bas à gauche";
      case "middle-right": return "Milieu à droite";
      case "middle-left": return "Milieu à gauche";
      default: return position;
    }
  };
  
  const getSizeLabel = (size: string) => {
    switch (size) {
      case "small": return "Petit";
      case "medium": return "Moyen";
      case "large": return "Grand";
      default: return size;
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Intégration WhatsApp</h1>
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Pro</Badge>
            </div>
            <p className="text-muted-foreground">
              Connectez WhatsApp à votre boutique pour communiquer avec vos clients
            </p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="button">
              <MessageSquare className="h-4 w-4 mr-2" />
              Bouton WhatsApp
            </TabsTrigger>
            <TabsTrigger value="automation">
              <Settings className="h-4 w-4 mr-2" />
              Automatisation WhatsApp
              <Badge className="ml-2 bg-purple-100 text-purple-800 hover:bg-purple-100">Pro</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="button">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuration du bouton WhatsApp</CardTitle>
                  <CardDescription>
                    Ajoutez un bouton WhatsApp sur votre site pour permettre aux clients de vous contacter facilement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="whatsapp-number">Numéro WhatsApp Business</Label>
                      <Input 
                        id="whatsapp-number" 
                        placeholder="+33612345678" 
                        value={whatsappNumber}
                        onChange={handleWhatsAppNumberChange}
                        className={!isValidNumber && whatsappNumber ? "border-red-500" : ""}
                      />
                      {!isValidNumber && whatsappNumber && (
                        <p className="text-xs text-red-500 mt-1">
                          Veuillez entrer un numéro valide au format international (ex: +33612345678)
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Entrez votre numéro au format international avec le code pays (ex: +33612345678)
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="welcome-message">Message d'accueil initial</Label>
                      <Textarea 
                        id="welcome-message" 
                        placeholder="Bonjour! Comment puis-je vous aider?" 
                        value={welcomeMessage}
                        onChange={(e) => setWelcomeMessage(e.target.value)}
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Ce message sera pré-rempli lorsque les clients cliquent sur le bouton WhatsApp
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Apparence du bouton</Label>
                      
                      <div>
                        <Label htmlFor="button-position" className="text-sm">Position</Label>
                        <Select 
                          value={buttonStyle.position} 
                          onValueChange={(value: "bottom-right" | "bottom-left" | "middle-right" | "middle-left") => 
                            setButtonStyle({...buttonStyle, position: value})
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir une position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bottom-right">Bas à droite</SelectItem>
                            <SelectItem value="bottom-left">Bas à gauche</SelectItem>
                            <SelectItem value="middle-right">Milieu à droite</SelectItem>
                            <SelectItem value="middle-left">Milieu à gauche</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="button-size" className="text-sm">Taille</Label>
                        <Select 
                          value={buttonStyle.size} 
                          onValueChange={(value: "small" | "medium" | "large") => 
                            setButtonStyle({...buttonStyle, size: value})
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir une taille" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Petit</SelectItem>
                            <SelectItem value="medium">Moyen</SelectItem>
                            <SelectItem value="large">Grand</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <Label className="text-sm">Afficher le texte</Label>
                        </div>
                        <Switch
                          checked={buttonStyle.showText}
                          onCheckedChange={(checked) => 
                            setButtonStyle({...buttonStyle, showText: checked})
                          }
                        />
                      </div>
                      
                      {buttonStyle.showText && (
                        <div>
                          <Label htmlFor="button-text" className="text-sm">Texte du bouton</Label>
                          <Input 
                            id="button-text" 
                            value={buttonStyle.text}
                            onChange={(e) => setButtonStyle({...buttonStyle, text: e.target.value})}
                          />
                        </div>
                      )}
                      
                      <div>
                        <Label className="text-sm">Pages d'affichage</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <Button
                            variant={buttonStyle.showOnPages.includes("home") ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              const newPages = buttonStyle.showOnPages.includes("home")
                                ? buttonStyle.showOnPages.filter(p => p !== "home")
                                : [...buttonStyle.showOnPages, "home"];
                              setButtonStyle({...buttonStyle, showOnPages: newPages});
                            }}
                          >
                            Accueil
                          </Button>
                          <Button
                            variant={buttonStyle.showOnPages.includes("product") ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              const newPages = buttonStyle.showOnPages.includes("product")
                                ? buttonStyle.showOnPages.filter(p => p !== "product")
                                : [...buttonStyle.showOnPages, "product"];
                              setButtonStyle({...buttonStyle, showOnPages: newPages});
                            }}
                          >
                            Pages produits
                          </Button>
                          <Button
                            variant={buttonStyle.showOnPages.includes("course") ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              const newPages = buttonStyle.showOnPages.includes("course")
                                ? buttonStyle.showOnPages.filter(p => p !== "course")
                                : [...buttonStyle.showOnPages, "course"];
                              setButtonStyle({...buttonStyle, showOnPages: newPages});
                            }}
                          >
                            Pages cours
                          </Button>
                          <Button
                            variant={buttonStyle.showOnPages.includes("checkout") ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              const newPages = buttonStyle.showOnPages.includes("checkout")
                                ? buttonStyle.showOnPages.filter(p => p !== "checkout")
                                : [...buttonStyle.showOnPages, "checkout"];
                              setButtonStyle({...buttonStyle, showOnPages: newPages});
                            }}
                          >
                            Paiement
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={saveButtonSettings}
                    disabled={!isValidNumber || !whatsappNumber}
                  >
                    Enregistrer les paramètres
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Aperçu</CardTitle>
                    <CardDescription>
                      Visualisez l'apparence de votre bouton WhatsApp
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative min-h-[300px] border rounded-md bg-gray-50 flex items-center justify-center">
                      {buttonEnabled ? (
                        <div className={`absolute ${buttonStyle.position === "bottom-right" ? "bottom-4 right-4" : 
                                                  buttonStyle.position === "bottom-left" ? "bottom-4 left-4" : 
                                                  buttonStyle.position === "middle-right" ? "right-4 top-1/2 -translate-y-1/2" : 
                                                  "left-4 top-1/2 -translate-y-1/2"}`}>
                          <div className={`flex items-center gap-2 bg-green-500 text-white rounded-full 
                                         ${buttonStyle.size === "small" ? "p-2 text-xs" : 
                                          buttonStyle.size === "medium" ? "p-3 text-sm" : 
                                          "p-4 text-base"} 
                                         hover:bg-green-600 transition-colors cursor-pointer shadow-lg`}>
                            <MessageSquare className={`${buttonStyle.size === "small" ? "h-4 w-4" : 
                                                       buttonStyle.size === "medium" ? "h-5 w-5" : 
                                                       "h-6 w-6"}`} />
                            {buttonStyle.showText && (
                              <span>{buttonStyle.text}</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-6 text-muted-foreground">
                          <MessageSquare className="h-10 w-10 mx-auto mb-2 text-muted" />
                          <p>Configurez et enregistrez vos paramètres pour voir l'aperçu</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {buttonEnabled && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Code d'intégration</CardTitle>
                      <CardDescription>
                        Copiez ce code pour intégrer manuellement le bouton WhatsApp à votre site
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <div className="bg-gray-50 p-4 rounded-md border font-mono text-sm overflow-x-auto">
                          <pre className="whitespace-pre-wrap">
{`<div class="whatsapp-button ${buttonStyle.position} ${buttonStyle.size}">
  <a href="https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent(welcomeMessage)}">
    <img src="whatsapp-icon.svg" alt="WhatsApp" />
    ${buttonStyle.showText ? `<span>${buttonStyle.text}</span>` : ''}
  </a>
</div>`}
                          </pre>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="absolute top-2 right-2"
                          onClick={copyButtonCode}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Note: Le bouton sera automatiquement ajouté aux pages sélectionnées ci-dessus.
                        Utilisez ce code uniquement si vous souhaitez l'intégrer à un emplacement personnalisé.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="automation">
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>Automatisation WhatsApp</CardTitle>
                  <CardDescription>
                    Envoyez automatiquement des messages WhatsApp à vos clients
                  </CardDescription>
                </div>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Pro</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-md">
                    <Sparkles className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-800">Fonctionnalité Pro</h4>
                      <p className="text-sm text-purple-700 mt-1">
                        L'automatisation WhatsApp est une fonctionnalité premium qui vous permet d'envoyer 
                        automatiquement des messages WhatsApp à vos clients en fonction de leurs actions.
                        <Button 
                          variant="link" 
                          className="text-purple-800 p-0 h-auto font-medium" 
                          onClick={() => setProFeatureModal(true)}
                        >
                          En savoir plus
                        </Button>
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="whatsapp-number-auto">Numéro WhatsApp Business</Label>
                    <Input 
                      id="whatsapp-number-auto" 
                      placeholder="+33612345678" 
                      value={whatsappNumber}
                      onChange={handleWhatsAppNumberChange}
                      className={!isValidNumber && whatsappNumber ? "border-red-500" : ""}
                    />
                    {!isValidNumber && whatsappNumber && (
                      <p className="text-xs text-red-500 mt-1">
                        Veuillez entrer un numéro valide au format international (ex: +33612345678)
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Messages automatiques</Label>
                      <Button variant="outline" size="sm">
                        Ajouter un message
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {autoMessages.map(message => (
                        <Card key={message.id}>
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {message.trigger === "welcome" && <Users className="h-4 w-4 text-blue-500" />}
                                {message.trigger === "abandoned_cart" && <ShoppingCart className="h-4 w-4 text-orange-500" />}
                                {message.trigger === "order_confirmed" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                                <span className="font-medium">{getTriggerLabel(message.trigger)}</span>
                              </div>
                              <Switch
                                checked={message.active}
                                onCheckedChange={(checked) => toggleAutoMessage(message.id, checked)}
                              />
                            </div>
                            
                            <div className="rounded bg-gray-50 p-3 text-sm">
                              {message.content}
                            </div>
                            
                            {message.variables.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {message.variables.map(variable => (
                                  <Badge key={variable} variant="outline" className="text-xs">
                                    {`{{${variable}}}`}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-md flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Connexion API requise</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Pour utiliser l'automatisation WhatsApp, vous devez disposer d'un compte WhatsApp Business 
                        et vérifier votre numéro de téléphone. 
                        <Button variant="link" className="text-yellow-800 p-0 h-auto font-medium">
                          Voir les instructions
                        </Button>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={saveAutomationSettings}
                  disabled={!isValidNumber || !whatsappNumber}
                >
                  Activer l'automatisation
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
