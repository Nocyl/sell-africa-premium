
import { ShoppingCart, FileText, CreditCard, BarChart3, MessageSquare, Rocket } from "lucide-react";

const features = [
  {
    icon: <ShoppingCart className="h-10 w-10 text-worldsell-orange-400" />,
    title: "Vendez n'importe où en Afrique",
    description: "Accédez à des millions de clients à travers 54 pays africains grâce à notre plateforme multilingue."
  },
  {
    icon: <FileText className="h-10 w-10 text-worldsell-blue-500" />,
    title: "Produits physiques et digitaux",
    description: "Vendez des produits physiques avec livraison ou des produits numériques à téléchargement instantané."
  },
  {
    icon: <CreditCard className="h-10 w-10 text-worldsell-orange-400" />,
    title: "Paiements locaux",
    description: "Acceptez les paiements via Mobile Money, transferts bancaires et autres méthodes locales."
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-worldsell-blue-500" />,
    title: "Tableau de bord détaillé",
    description: "Suivez vos ventes, revenus et performances avec des analyses en temps réel."
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-worldsell-orange-400" />,
    title: "Support WhatsApp intégré",
    description: "Communiquez avec vos clients via WhatsApp directement depuis la plateforme."
  },
  {
    icon: <Rocket className="h-10 w-10 text-worldsell-blue-500" />,
    title: "Marketing et promotion",
    description: "Utilisez nos outils marketing intégrés pour développer votre business."
  }
];

const SellerFeatures = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Pourquoi vendre sur WorldSell</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            WorldSell vous offre tous les outils nécessaires pour réussir votre business en ligne en Afrique.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SellerFeatures;
