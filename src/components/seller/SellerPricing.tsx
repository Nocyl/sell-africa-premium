
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    price: "0",
    description: "Parfait pour démarrer",
    features: [
      "5 produits",
      "Paiements Mobile Money",
      "Support par email",
      "Analyses de base",
      "Application mobile",
    ],
    popular: false,
    buttonText: "Commencer gratuitement"
  },
  {
    name: "Pro",
    price: "29",
    description: "Pour les entrepreneurs sérieux",
    features: [
      "100 produits",
      "Tous les moyens de paiement",
      "Support prioritaire",
      "Analyses avancées",
      "Marketing WhatsApp",
      "Domaine personnalisé",
      "0% commission sur les 3 premiers mois"
    ],
    popular: true,
    buttonText: "Essayer Pro"
  },
  {
    name: "Business",
    price: "99",
    description: "Pour les entreprises établies",
    features: [
      "Produits illimités",
      "Tous les moyens de paiement",
      "Support dédié 24/7",
      "Analyses avancées",
      "Marketing WhatsApp Pro",
      "Domaine personnalisé",
      "API complète",
      "0% commission sur les 6 premiers mois"
    ],
    popular: false,
    buttonText: "Contacter les ventes"
  }
];

const SellerPricing = () => {
  return (
    <section className="py-16" id="pricing">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Plans tarifaires simples</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choisissez le plan qui correspond à vos besoins. Pas de frais cachés, payez seulement quand vous vendez.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`bg-white rounded-xl border ${
                plan.popular ? 'border-worldsell-orange-400 shadow-lg' : 'border-gray-200'
              } overflow-hidden`}
            >
              {plan.popular && (
                <div className="bg-worldsell-orange-400 text-white py-1.5 text-center text-sm font-medium">
                  Le plus populaire
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground ml-2">/mois</span>
                </div>
                
                <Button 
                  className={`w-full mb-6 ${
                    plan.popular 
                      ? 'bg-worldsell-orange-400 hover:bg-worldsell-orange-500' 
                      : 'bg-worldsell-blue-500 hover:bg-worldsell-blue-600'
                  }`}
                >
                  {plan.buttonText}
                </Button>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 text-sm text-muted-foreground">
          Tous les plans incluent les frais de transaction standard de 3,9% + $0.30 par vente.
          <br />
          Consultez notre <a href="#" className="text-worldsell-blue-500 hover:underline">documentation complète</a> pour plus de détails.
        </div>
      </div>
    </section>
  );
};

export default SellerPricing;
