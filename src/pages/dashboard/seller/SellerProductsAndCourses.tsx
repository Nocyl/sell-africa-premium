
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, BookOpen, BarChart3, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SellerProductsAndCourses() {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Formations et produits</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/seller/products")}>
            <Package className="h-4 w-4 mr-2" />
            Mes produits
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate("/seller/courses")}>
            <BookOpen className="h-4 w-4 mr-2" />
            Mes cours
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-2 border-dashed border-muted hover:border-primary/50 transition-colors text-center">
            <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center h-full">
              <PlusIcon className="h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium mb-1">Ajouter un produit</h3>
              <p className="text-sm text-muted-foreground mb-4">Créez et vendez un nouveau produit</p>
              <Button onClick={() => navigate("/seller/products/new")}>Commencer</Button>
            </CardContent>
          </Card>
          <Card className="border-2 border-dashed border-muted hover:border-primary/50 transition-colors text-center">
            <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center h-full">
              <PlusIcon className="h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium mb-1">Créer une formation</h3>
              <p className="text-sm text-muted-foreground mb-4">Partagez vos connaissances</p>
              <Button onClick={() => navigate("/seller/courses/new")}>Commencer</Button>
            </CardContent>
          </Card>
          <Card className="border-2 border-primary/10 bg-primary/5 text-center">
            <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center h-full">
              <BarChart3 className="h-8 w-8 text-primary mb-2" />
              <h3 className="text-lg font-medium mb-1">Outils marketing Pro</h3>
              <p className="text-sm text-muted-foreground mb-4">Boostez vos ventes avec nos outils</p>
              <Button variant="outline" onClick={() => navigate("/seller/marketing")}>Explorer</Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
