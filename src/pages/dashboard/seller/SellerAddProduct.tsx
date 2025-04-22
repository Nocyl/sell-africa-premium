
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, Package, PackageOpen, Disc, FileText, Link, DollarSign, PercentSquare, Globe, LayoutGrid, Check, ArrowLeft, ImageIcon, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import EmptyState from "@/components/dashboard/seller/EmptyState";

const productSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  slug: z.string().min(3, "Le slug doit contenir au moins 3 caractères"),
  price: z.string().min(1, "Le prix est requis"),
  salePrice: z.string().optional(),
  type: z.enum(["digital", "physical"]),
  category: z.string().min(1, "La catégorie est requise"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  shortDescription: z.string().min(10, "La description courte doit contenir au moins 10 caractères"),
  available: z.boolean(),
  featured: z.boolean(),
  taxable: z.boolean(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function SellerAddProduct() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"info" | "media" | "pricing" | "shipping" | "seo" | "preview">("info");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      price: "",
      salePrice: "",
      type: "digital",
      category: "",
      description: "",
      shortDescription: "",
      available: true,
      featured: false,
      taxable: true,
    },
  });
  
  const handleAddImage = () => {
    // In a real app this would upload an image
    const mockImages = [
      "https://api.dicebear.com/7.x/shapes/svg?seed=product1",
      "https://api.dicebear.com/7.x/shapes/svg?seed=product2",
      "https://api.dicebear.com/7.x/shapes/svg?seed=product3",
      "https://api.dicebear.com/7.x/shapes/svg?seed=product4",
    ];
    
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    setImages([...images, randomImage]);
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const onSubmit = (data: ProductFormValues) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form data:", data);
      console.log("Images:", images);
      
      toast.success("Produit créé avec succès!");
      setLoading(false);
      navigate("/seller/products");
    }, 1500);
  };
  
  const getStepTitle = () => {
    switch (step) {
      case "info":
        return "Informations générales";
      case "media":
        return "Médias";
      case "pricing":
        return "Prix et inventaire";
      case "shipping":
        return "Expédition";
      case "seo":
        return "SEO";
      case "preview":
        return "Aperçu";
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="mb-2"
              onClick={() => navigate("/seller/products")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux produits
            </Button>
            <h1 className="text-2xl font-bold">Ajouter un produit</h1>
            <p className="text-muted-foreground">
              {getStepTitle()}
            </p>
          </div>
          
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button 
              variant="outline" 
              onClick={() => navigate("/seller/products")}
            >
              Annuler
            </Button>
            <Button 
              disabled={loading}
              onClick={form.handleSubmit(onSubmit)}
            >
              {loading ? "Création..." : "Créer le produit"}
            </Button>
          </div>
        </div>
        
        <Tabs value={step} onValueChange={(value) => setStep(value as any)}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
            <TabsTrigger value="info">Général</TabsTrigger>
            <TabsTrigger value="media">Médias</TabsTrigger>
            <TabsTrigger value="pricing">Prix</TabsTrigger>
            <TabsTrigger value="shipping">Expédition</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="preview">Aperçu</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[calc(100vh-240px)]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-10">
                <TabsContent value="info" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informations du produit</CardTitle>
                      <CardDescription>
                        Les informations de base sur votre produit.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom du produit</FormLabel>
                            <FormControl>
                              <Input placeholder="ex: Cours de Marketing Digital" {...field} />
                            </FormControl>
                            <FormDescription>
                              Le nom sera visible par les clients.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                              <Input placeholder="ex: cours-marketing-digital" {...field} />
                            </FormControl>
                            <FormDescription>
                              L'URL de votre produit (sans espaces ni caractères spéciaux).
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type de produit</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner un type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="digital">
                                  <div className="flex items-center gap-2">
                                    <Disc className="h-4 w-4" />
                                    <span>Produit numérique</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="physical">
                                  <div className="flex items-center gap-2">
                                    <Package className="h-4 w-4" />
                                    <span>Produit physique</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Le type détermine comment le produit sera livré.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Catégorie</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner une catégorie" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="technology">Technologie</SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                                <SelectItem value="other">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Catégoriser votre produit aide les clients à le trouver.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="shortDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description courte</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Une brève description du produit..." 
                                rows={3}
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Résumé concis qui apparaîtra dans les listes de produits.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description complète</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Description détaillée du produit..." 
                                rows={6}
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Description détaillée qui apparaîtra sur la page du produit.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => navigate("/seller/products")}>
                        Annuler
                      </Button>
                      <Button type="button" onClick={() => setStep("media")}>
                        Continuer
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="media" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Images et médias</CardTitle>
                      <CardDescription>
                        Ajoutez des images et des fichiers à votre produit.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label className="mb-2 block">Images du produit</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          {images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={image} 
                                alt={`Product ${index}`}
                                className="w-full aspect-square object-cover rounded-md border"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleRemoveImage(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full aspect-square flex flex-col items-center justify-center gap-2 border-dashed"
                            onClick={handleAddImage}
                          >
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Ajouter une image</span>
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Ajoutez jusqu'à 10 images. La première image sera utilisée comme miniature.
                        </p>
                      </div>
                      
                      {form.watch("type") === "digital" && (
                        <div>
                          <Label className="mb-2 block">Fichier du produit (pour les produits numériques)</Label>
                          <div className="border border-dashed rounded-md p-6 text-center">
                            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                            <h3 className="text-lg font-medium mb-1">Déposez votre fichier ici</h3>
                            <p className="text-sm text-muted-foreground mb-4">ou cliquez pour parcourir vos fichiers</p>
                            <Button variant="outline" type="button">
                              Parcourir les fichiers
                            </Button>
                            <p className="text-xs text-muted-foreground mt-4">
                              Formats acceptés: PDF, DOC, MP4, ZIP (max 2GB)
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setStep("info")}>
                        Retour
                      </Button>
                      <Button type="button" onClick={() => setStep("pricing")}>
                        Continuer
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="pricing" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Prix et options</CardTitle>
                      <CardDescription>
                        Configurez les prix et la disponibilité.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prix régulier</FormLabel>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    className="pl-10" 
                                    placeholder="0.00" 
                                    {...field} 
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="salePrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prix promo (optionnel)</FormLabel>
                              <div className="relative">
                                <PercentSquare className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    className="pl-10" 
                                    placeholder="0.00" 
                                    {...field} 
                                  />
                                </FormControl>
                              </div>
                              <FormDescription>
                                Laissez vide si vous n'avez pas de promotion.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        <FormField
                          control={form.control}
                          name="available"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Disponible</FormLabel>
                                <FormDescription>
                                  Rendre ce produit disponible à l'achat
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="featured"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Mis en avant</FormLabel>
                                <FormDescription>
                                  Mettre en avant sur la page d'accueil
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="taxable"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Taxable</FormLabel>
                                <FormDescription>
                                  Appliquer les taxes à ce produit
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setStep("media")}>
                        Retour
                      </Button>
                      <Button type="button" onClick={() => setStep("shipping")}>
                        Continuer
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="shipping" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Expédition et livraison</CardTitle>
                      <CardDescription>
                        Configurez les options d'expédition pour votre produit.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {form.watch("type") === "physical" ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="weight">Poids (kg)</Label>
                              <Input id="weight" type="number" placeholder="0.00" />
                            </div>
                            <div>
                              <Label htmlFor="width">Largeur (cm)</Label>
                              <Input id="width" type="number" placeholder="0" />
                            </div>
                            <div>
                              <Label htmlFor="height">Hauteur (cm)</Label>
                              <Input id="height" type="number" placeholder="0" />
                            </div>
                          </div>
                          
                          <div>
                            <Label>Options d'expédition</Label>
                            <div className="space-y-2 mt-2">
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="shipping-standard" className="rounded" />
                                <label htmlFor="shipping-standard">Livraison standard</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="shipping-express" className="rounded" />
                                <label htmlFor="shipping-express">Livraison express</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="shipping-international" className="rounded" />
                                <label htmlFor="shipping-international">Livraison internationale</label>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="inventory">Gestion des stocks</Label>
                            <Select defaultValue="unlimited">
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="unlimited">Stock illimité</SelectItem>
                                <SelectItem value="track">Suivre les stocks</SelectItem>
                                <SelectItem value="preorder">Précommande</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="stock">Quantité en stock</Label>
                            <Input id="stock" type="number" placeholder="0" defaultValue="100" />
                          </div>
                        </div>
                      ) : (
                        <EmptyState
                          title="Produit numérique"
                          description="Les produits numériques sont livrés automatiquement par email ou téléchargement."
                          icon={<Disc className="h-10 w-10" />}
                          actionLabel="Configurer la livraison numérique"
                          actionLink="#"
                        />
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setStep("pricing")}>
                        Retour
                      </Button>
                      <Button type="button" onClick={() => setStep("seo")}>
                        Continuer
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="seo" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>SEO et visibilité</CardTitle>
                      <CardDescription>
                        Optimisez la visibilité de votre produit sur les moteurs de recherche.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="meta-title">Titre Meta</Label>
                        <Input id="meta-title" placeholder="Titre pour les moteurs de recherche" />
                        <p className="text-sm text-muted-foreground mt-1">
                          Recommandé: 50-60 caractères
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="meta-description">Description Meta</Label>
                        <Textarea 
                          id="meta-description" 
                          placeholder="Description pour les moteurs de recherche"
                          rows={3}
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Recommandé: 150-160 caractères
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="tags">Tags</Label>
                        <Input id="tags" placeholder="Entrez des tags séparés par des virgules" />
                        <p className="text-sm text-muted-foreground mt-1">
                          Ex: marketing, digital, ebook
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <div>
                          <Label>Prévisualisation Google</Label>
                          <div className="mt-2 border rounded-md p-4 bg-white">
                            <p className="text-blue-600 text-lg truncate">
                              {form.watch("name") || "Titre du produit"}
                            </p>
                            <p className="text-green-700 text-sm truncate">
                              worldsell.com/product/{form.watch("slug") || "url-du-produit"}
                            </p>
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {form.watch("shortDescription") || "Description courte du produit qui apparaîtra dans les résultats de recherche Google."}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <Label>Partage sur les réseaux sociaux</Label>
                          <div className="mt-2 border rounded-md p-4 bg-gray-100">
                            <div className="flex items-start gap-2">
                              {images.length > 0 ? (
                                <img 
                                  src={images[0]} 
                                  alt="Product thumbnail" 
                                  className="w-12 h-12 rounded"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                                  <Package className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                              <div>
                                <p className="font-medium text-sm">
                                  {form.watch("name") || "Titre du produit"}
                                </p>
                                <p className="text-xs text-gray-600 line-clamp-2">
                                  {form.watch("shortDescription") || "Description du produit."}
                                </p>
                                <p className="text-xs text-blue-500 mt-1">
                                  worldsell.com
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setStep("shipping")}>
                        Retour
                      </Button>
                      <Button type="button" onClick={() => setStep("preview")}>
                        Continuer
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="preview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Résumé du produit</CardTitle>
                      <CardDescription>
                        Vérifiez les informations du produit avant de le créer.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <div className="aspect-video bg-gray-100 rounded-md overflow-hidden mb-4">
                            {images.length > 0 ? (
                              <img 
                                src={images[0]} 
                                alt="Product preview" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="h-16 w-16 text-gray-300" />
                              </div>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-4 gap-2">
                            {images.slice(1, 5).map((image, index) => (
                              <div key={index} className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                                <img 
                                  src={image} 
                                  alt={`Product ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h2 className="text-2xl font-bold">{form.watch("name") || "Titre du produit"}</h2>
                          
                          <div className="flex items-center gap-2">
                            <Badge>
                              {form.watch("type") === "digital" ? "Produit numérique" : "Produit physique"}
                            </Badge>
                            <Badge variant="outline">
                              {form.watch("category") || "Sans catégorie"}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <p className="text-2xl font-bold">
                              {form.watch("price") ? `$${form.watch("price")}` : "$0.00"}
                            </p>
                            {form.watch("salePrice") && (
                              <p className="text-lg text-muted-foreground line-through">
                                ${form.watch("salePrice")}
                              </p>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground">
                            {form.watch("shortDescription") || "Description courte du produit."}
                          </p>
                          
                          <div className="pt-2">
                            <h3 className="font-medium mb-2">Description</h3>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">
                              {form.watch("description") || "Description complète du produit."}
                            </p>
                          </div>
                          
                          <div className="pt-2">
                            <h3 className="font-medium mb-2">Statut et options</h3>
                            <ul className="space-y-1">
                              <li className="flex items-center gap-2 text-sm">
                                <Check className="h-4 w-4 text-green-500" />
                                {form.watch("available") ? "Disponible à l'achat" : "Non disponible"}
                              </li>
                              <li className="flex items-center gap-2 text-sm">
                                <Check className="h-4 w-4 text-green-500" />
                                {form.watch("featured") ? "Mis en avant" : "Non mis en avant"}
                              </li>
                              <li className="flex items-center gap-2 text-sm">
                                <Check className="h-4 w-4 text-green-500" />
                                {form.watch("taxable") ? "Taxable" : "Non taxable"}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setStep("seo")}>
                        Retour
                      </Button>
                      <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
                        {loading ? "Création..." : "Créer le produit"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </form>
            </Form>
          </ScrollArea>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
