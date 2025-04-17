
import { Button } from "@/components/ui/button";
import { Laptop, Smartphone, Check } from "lucide-react";

const SellerRegisterCTA = () => {
  return (
    <section className="py-16" id="register">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Prêt à commencer votre aventure e-commerce ?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Créez votre boutique en ligne en quelques minutes et commencez à vendre immédiatement. Pas besoin de compétences techniques.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-worldsell-blue-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="h-4 w-4 text-worldsell-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Inscription gratuite et rapide</h4>
                    <p className="text-muted-foreground text-sm">
                      Créez votre compte en moins de 2 minutes avec seulement un email.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-worldsell-orange-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="h-4 w-4 text-worldsell-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Configurez votre boutique</h4>
                    <p className="text-muted-foreground text-sm">
                      Personnalisez votre boutique, ajoutez vos produits et connectez vos méthodes de paiement.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-worldsell-earth-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="h-4 w-4 text-worldsell-earth-300" />
                  </div>
                  <div>
                    <h4 className="font-medium">Commencez à vendre</h4>
                    <p className="text-muted-foreground text-sm">
                      Partagez votre boutique et recevez vos premiers paiements instantanément.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-worldsell-blue-500 hover:bg-worldsell-blue-600" size="lg">
                  Créer un compte gratuit
                </Button>
                <Button variant="outline" size="lg">
                  Découvrir la démo
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 bg-white p-1 rounded-xl shadow-xl border overflow-hidden">
                <img 
                  src="https://img.freepik.com/free-vector/ecommerce-dashboard-application-mobile-template_23-2148614994.jpg" 
                  alt="Dashboard WorldSell" 
                  className="rounded-lg w-full"
                />
              </div>
              
              <div className="absolute -z-10 -bottom-4 -right-4 w-64 h-64 bg-worldsell-blue-100 rounded-full"></div>
              <div className="absolute -z-10 -top-4 -left-4 w-32 h-32 bg-worldsell-orange-100 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-6">Disponible sur toutes les plateformes</h3>
          <div className="flex flex-wrap gap-8 justify-center">
            <div className="flex items-center gap-2">
              <Laptop className="h-6 w-6 text-worldsell-blue-500" />
              <span>Web</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="h-6 w-6 text-worldsell-orange-400" />
              <span>iOS</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="h-6 w-6 text-worldsell-blue-500" />
              <span>Android</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerRegisterCTA;
