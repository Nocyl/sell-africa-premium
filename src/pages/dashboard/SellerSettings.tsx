
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function SellerSettings() {
  const [storeName, setStoreName] = useState("WorldSell");
  const [category, setCategory] = useState("E-commerce");
  const [country, setCountry] = useState("Côte d'Ivoire");
  const [description, setDescription] = useState(
    "Bienvenue sur WorldSell, votre destination en ligne pour des produits de qualité et un service exceptionnel."
  );
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [hasFreeShipping, setHasFreeShipping] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("Paramètres de la boutique mis à jour avec succès!");
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Paramètres de la boutique</CardTitle>
          <CardDescription>
            Gérez les informations de votre boutique en ligne.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="storeName">Nom de la boutique</Label>
              <Input
                id="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Formation en ligne">
                    Formation en ligne
                  </SelectItem>
                  <SelectItem value="Services">Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Pays</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un pays" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Côte d'Ivoire">Côte d'Ivoire</SelectItem>
                  <SelectItem value="France">France</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isStoreOpen" className="mr-2">
                Boutique ouverte
              </Label>
              <Switch
                id="isStoreOpen"
                checked={isStoreOpen}
                onCheckedChange={setIsStoreOpen}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="hasFreeShipping" className="mr-2">
                Livraison gratuite
              </Label>
              <Switch
                id="hasFreeShipping"
                checked={hasFreeShipping}
                onCheckedChange={setHasFreeShipping}
              />
            </div>
            <Button type="submit">Mettre à jour les paramètres</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
